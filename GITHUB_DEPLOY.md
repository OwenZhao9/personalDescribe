# GitHub 部署指南

本项目支持多种 GitHub 部署方案，适合不同需求。

## 方案一：GitHub Pages（免费静态托管）

GitHub Pages 是完全免费的静态网站托管服务，非常适合这个项目。

### 步骤 1：修改构建配置

需要修改 `vite.config.ts` 以支持 GitHub Pages：

```typescript
export default defineConfig({
  base: '/zhaoning-resume/', // 如果仓库名是 zhaoning-resume
  // 或者使用自定义域名时设置为 '/'
  // ... 其他配置
})
```

### 步骤 2：创建 GitHub Actions 工作流

创建 `.github/workflows/deploy.yml` 文件（我会为您创建）

### 步骤 3：在 GitHub 上配置

1. 将代码推送到 GitHub 仓库
2. 进入仓库 Settings → Pages
3. 选择 Source: GitHub Actions
4. 每次推送到 main 分支会自动部署

### 访问地址

- 如果仓库名是 `zhaoning-resume`：`https://your-username.github.io/zhaoning-resume/`
- 如果配置了自定义域名：`https://your-domain.com`

---

## 方案二：Vercel（推荐，自动部署）

Vercel 通过 GitHub 连接，可以自动部署，在中国大陆访问速度较快（配合CDN）。

### 步骤

1. 访问 [Vercel](https://vercel.com/)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择您的 GitHub 仓库
5. 配置：
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `pnpm install`
6. 点击 Deploy

### 优势

- ✅ 自动部署（每次 push 自动更新）
- ✅ 免费 HTTPS
- ✅ 全球 CDN 加速
- ✅ 支持自定义域名
- ✅ 自动处理 SPA 路由

### 访问地址

部署完成后会获得：`https://your-project.vercel.app`

---

## 方案三：Netlify（类似 Vercel）

### 步骤

1. 访问 [Netlify](https://www.netlify.com/)
2. 使用 GitHub 账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择 GitHub 仓库
5. 配置：
   - **Build command**: `pnpm build`
   - **Publish directory**: `dist/public`
6. 点击 Deploy

### 访问地址

部署完成后会获得：`https://your-project.netlify.app`

---

## 方案四：GitHub Actions 自动部署到服务器

如果您有自己的服务器，可以使用 GitHub Actions 自动部署。

### 步骤

1. 在 GitHub 仓库 Settings → Secrets 中添加：
   - `SERVER_HOST`: 服务器IP
   - `SERVER_USER`: SSH用户名
   - `SERVER_SSH_KEY`: SSH私钥

2. 创建 GitHub Actions 工作流（我会为您创建）

3. 每次 push 到 main 分支会自动部署到服务器

---

## 方案五：Cloudflare Pages（免费，速度快）

Cloudflare Pages 提供免费托管和全球 CDN，在中国大陆访问速度较好。

### 步骤

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 使用 GitHub 账号登录
3. 连接 GitHub 仓库
4. 配置：
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist/public`
5. 点击 Deploy

### 访问地址

部署完成后会获得：`https://your-project.pages.dev`

---

## 推荐方案对比

| 方案 | 免费 | 速度（国内） | 自动部署 | 自定义域名 | 推荐度 |
|------|------|------------|---------|----------|--------|
| GitHub Pages | ✅ | ⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐ |
| Vercel | ✅ | ⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| Netlify | ✅ | ⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐ |
| Cloudflare Pages | ✅ | ⭐⭐⭐⭐⭐ | ✅ | ✅ | ⭐⭐⭐⭐⭐ |

**最佳推荐**：Vercel 或 Cloudflare Pages（国内访问速度快）

---

## 注意事项

### 1. SPA 路由支持

如果使用 GitHub Pages，需要处理客户端路由。我会在 GitHub Actions 工作流中添加 404.html 重定向。

### 2. 环境变量

如果项目需要环境变量，在各平台的项目设置中添加：
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables
- Cloudflare Pages: Settings → Environment variables

### 3. 自定义域名

所有平台都支持自定义域名：
- 在平台设置中添加域名
- 配置 DNS 记录
- 等待 SSL 证书自动配置

---

## 快速开始

1. **选择方案**：推荐 Vercel 或 Cloudflare Pages
2. **推送代码到 GitHub**（如果还没有）
3. **按照对应方案的步骤操作**
4. **等待部署完成**

部署完成后，您的简历网站就可以通过互联网访问了！

