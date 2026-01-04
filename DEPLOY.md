# 部署指南 - 中国大陆访问优化

本文档提供了多种部署方案，确保中国大陆用户可以快速访问您的简历网站。

## 方案一：阿里云/腾讯云服务器部署（推荐）

### 1. 准备工作

#### 1.1 购买服务器
- **阿里云 ECS** 或 **腾讯云 CVM**
- 推荐配置：1核2G，1M带宽（约50-100元/月）
- 操作系统：Ubuntu 22.04 LTS 或 CentOS 7+

#### 1.2 域名备案（可选但推荐）
- 如果使用国内服务器，建议进行域名备案
- 备案后可以使用国内CDN加速

### 2. 服务器部署步骤

#### 2.1 连接服务器
```bash
ssh root@your-server-ip
```

#### 2.2 安装 Node.js 和 pnpm
```bash
# 安装 Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 安装 pnpm
npm install -g pnpm

# 验证安装
node -v
pnpm -v
```

#### 2.3 上传项目代码
```bash
# 方式1：使用 Git
git clone your-repo-url
cd zhaoning-resume

# 方式2：使用 scp 上传
# 在本地执行：
# scp -r . root@your-server-ip:/var/www/zhaoning-resume
```

#### 2.4 安装依赖并构建
```bash
cd /var/www/zhaoning-resume
pnpm install
pnpm build
```

#### 2.5 使用 PM2 管理进程
```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start dist/index.js --name resume

# 设置开机自启
pm2 startup
pm2 save
```

#### 2.6 配置 Nginx 反向代理（可选但推荐）
```bash
# 安装 Nginx
apt-get install nginx

# 创建配置文件
nano /etc/nginx/sites-available/resume
```

Nginx 配置内容：
```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为您的域名或IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# 启用配置
ln -s /etc/nginx/sites-available/resume /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 2.7 配置 HTTPS（推荐）
```bash
# 安装 Certbot
apt-get install certbot python3-certbot-nginx

# 申请证书（需要域名已解析）
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

### 3. 防火墙配置
```bash
# 开放端口
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw enable
```

---

## 方案二：Vercel/Netlify 部署（简单但可能较慢）

### Vercel 部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产环境部署
vercel --prod
```

**注意**：Vercel 在中国大陆访问可能较慢，建议配合国内CDN使用。

### Netlify 部署
1. 访问 [Netlify](https://www.netlify.com/)
2. 连接 GitHub 仓库
3. 构建命令：`pnpm build`
4. 发布目录：`dist/public`

---

## 方案三：静态托管 + CDN（最佳性能）

### 3.1 使用阿里云 OSS + CDN
```bash
# 构建项目
pnpm build

# 上传到 OSS（需要安装阿里云 CLI）
ossutil cp -r dist/public/ oss://your-bucket-name/
```

### 3.2 配置 CDN
1. 在阿里云 CDN 控制台添加域名
2. 源站设置为 OSS 域名
3. 开启 HTTPS
4. 配置缓存规则

### 3.3 使用腾讯云 COS + CDN
类似阿里云流程，使用腾讯云对象存储和CDN服务。

---

## 方案四：Docker 容器化部署

### 4.1 创建 Dockerfile
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建
RUN pnpm build

# 生产环境
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

### 4.2 构建和运行
```bash
# 构建镜像
docker build -t zhaoning-resume .

# 运行容器
docker run -d -p 3000:3000 --name resume zhaoning-resume
```

---

## 本地构建测试

在部署前，建议先在本地测试构建：

```bash
# 构建项目
pnpm build

# 预览生产版本
pnpm start
```

访问 http://localhost:3000 确认一切正常。

---

## 性能优化建议

### 1. 启用 Gzip 压缩
在 Nginx 配置中添加：
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. 使用 CDN 加速静态资源
- 图片、字体等静态资源使用 CDN
- 考虑使用国内 CDN 服务（如七牛云、又拍云）

### 3. 图片优化
- 使用 WebP 格式
- 压缩图片大小
- 使用懒加载

### 4. 代码分割
Vite 已自动进行代码分割，无需额外配置。

---

## 监控和维护

### 1. 日志查看
```bash
# PM2 日志
pm2 logs resume

# Nginx 日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### 2. 性能监控
- 使用阿里云/腾讯云监控服务
- 配置告警规则

### 3. 自动更新
```bash
# 创建更新脚本 update.sh
#!/bin/bash
cd /var/www/zhaoning-resume
git pull
pnpm install
pnpm build
pm2 restart resume
```

---

## 常见问题

### Q: 如何更新网站内容？
A: 修改代码后，在服务器上执行：
```bash
cd /var/www/zhaoning-resume
git pull
pnpm build
pm2 restart resume
```

### Q: 访问速度慢怎么办？
A: 
1. 使用国内服务器
2. 配置 CDN 加速
3. 优化图片和资源大小
4. 启用 Gzip 压缩

### Q: 如何备份？
A: 
```bash
# 备份代码
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/zhaoning-resume

# 定期自动备份（添加到 crontab）
0 2 * * * tar -czf /backup/resume-$(date +\%Y\%m\%d).tar.gz /var/www/zhaoning-resume
```

---

## 推荐方案总结

**最佳方案**：阿里云/腾讯云服务器 + Nginx + HTTPS + CDN
- ✅ 访问速度快
- ✅ 稳定性高
- ✅ 成本可控（约50-100元/月）
- ✅ 支持备案域名

**快速方案**：Vercel/Netlify + 国内CDN
- ✅ 部署简单
- ✅ 免费额度
- ⚠️ 需要配置CDN才能保证速度

**高性能方案**：OSS/COS + CDN（纯静态）
- ✅ 访问速度最快
- ✅ 成本最低
- ⚠️ 需要修改为纯静态部署（不使用 Express 服务器）

---

## 下一步

1. 选择适合的部署方案
2. 准备服务器或云服务账号
3. 按照对应方案执行部署步骤
4. 测试访问速度和功能
5. 配置监控和备份

如有问题，请参考各云服务商的官方文档。

