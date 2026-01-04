# 快速部署指南

## 🚀 最快部署方案（5分钟）

### 方案A：使用 Docker（推荐）

```bash
# 1. 构建并运行
docker-compose up -d

# 2. 访问
# http://localhost:3000
```

### 方案B：直接部署到服务器

```bash
# 1. 在服务器上克隆项目
git clone your-repo-url
cd zhaoning-resume

# 2. 安装依赖
pnpm install

# 3. 构建
pnpm build

# 4. 启动（使用 PM2）
npm install -g pm2
pm2 start dist/index.js --name resume
pm2 save
```

---

## 📦 国内云服务部署（最佳体验）

### 阿里云 ECS 部署步骤

1. **购买服务器**
   - 登录阿里云控制台
   - 购买 ECS 实例（1核2G，约50元/月）
   - 选择 Ubuntu 22.04 系统

2. **连接服务器**
   ```bash
   ssh root@your-server-ip
   ```

3. **一键安装脚本**
   ```bash
   # 安装 Node.js 和 pnpm
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt-get install -y nodejs
   npm install -g pnpm pm2
   
   # 克隆项目
   git clone your-repo-url
   cd zhaoning-resume
   
   # 部署
   pnpm install
   pnpm build
   pm2 start dist/index.js --name resume
   pm2 save
   ```

4. **配置 Nginx（可选）**
   ```bash
   apt-get install nginx
   # 编辑 /etc/nginx/sites-available/default
   # 添加反向代理配置（见 DEPLOY.md）
   ```

5. **配置防火墙**
   ```bash
   ufw allow 3000
   ufw allow 80
   ufw allow 443
   ```

### 腾讯云 CVM 部署

步骤与阿里云相同，只需将服务器提供商改为腾讯云。

---

## 🌐 静态托管方案（最快访问速度）

如果您的项目是纯静态的，可以使用以下方案：

### 阿里云 OSS + CDN

```bash
# 1. 构建项目
pnpm build

# 2. 安装阿里云 CLI
pip install oss2

# 3. 上传到 OSS
ossutil cp -r dist/public/ oss://your-bucket-name/ --recursive

# 4. 在阿里云控制台配置 CDN
# - 添加域名
# - 源站设置为 OSS
# - 开启 HTTPS
```

### 腾讯云 COS + CDN

类似流程，使用腾讯云对象存储和CDN服务。

---

## 🔧 本地测试构建

在部署前，建议先本地测试：

```bash
# 构建
pnpm build

# 启动生产服务器
pnpm start

# 访问 http://localhost:3000
```

---

## 📝 环境变量配置

如果需要配置环境变量，创建 `.env` 文件：

```env
NODE_ENV=production
PORT=3000
```

---

## 🔄 更新部署

当代码更新后：

```bash
# 在服务器上执行
cd /path/to/zhaoning-resume
git pull
pnpm install
pnpm build
pm2 restart resume
```

---

## ❓ 常见问题

**Q: 访问速度慢？**
- 使用国内服务器（阿里云/腾讯云）
- 配置 CDN 加速
- 优化图片大小

**Q: 如何配置 HTTPS？**
- 使用 Let's Encrypt 免费证书
- 或使用云服务商提供的 SSL 证书

**Q: 如何备份？**
```bash
# 备份代码
tar -czf backup.tar.gz /path/to/zhaoning-resume
```

---

## 📚 详细文档

更多详细信息请查看 [DEPLOY.md](./DEPLOY.md)

