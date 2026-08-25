<<<<<<< HEAD
# 华仔效率工坊 · 网站源码

一个纯静态的前端工具站（新拟态/Neo-brutalism 风格），包含工作台、宠物精灵、首页碎片动画（掉落 / 黑洞 / 子弹 / 黑客帝国 / 至尊黑客帝国）、Excel/PDF 解析等功能。已内置第三方库（xlsx、pdf.js），**完全离线可用，无需任何后端**。

## 目录结构

```
.
├── index.html              入口页面
├── app.js                  主逻辑（约 2900 行）
├── defaults.js             默认配置
├── style.css               样式
├── pets_extra.js           宠物扩展数据
├── pets_meta.json          宠物元数据（备用）
├── serve.py                本地静态服务器（Python 标准库，零依赖）
├── landing-bg.jpg          首页背景图
├── landing-default-bg.jpg  默认首页背景图
├── vendor/                 第三方库（已本地化，离线可用）
│   ├── xlsx.full.min.js
│   ├── pdf.min.js
│   └── pdf.worker.min.js
├── pets/                   宠物精灵图（webp / png，运行时必需）
├── avatars/                用户头像
├── .nojekyll               告诉 GitHub Pages 不要跑 Jekyll
├── 启动.bat                Windows 本地启动（优先系统 Python）
└── 启动.sh                 macOS / Linux 本地启动
```

## 本地预览

任选其一：

1. **一键启动（推荐）**
   - Windows：双击 `启动.bat`
   - macOS / Linux：终端执行 `chmod +x 启动.sh && ./启动.sh`
   - 会自动起本地服务并打开 `http://localhost:9527`
2. **手动起服务**
   ```bash
   python3 serve.py        # 然后浏览器访问 http://localhost:9527
   ```
3. **直接打开**（仅 Firefox 完整可用）
   - 用 Firefox 双击 `index.html`；Chrome / Edge 因 `file://` 安全策略，宠物 Canvas 解析会受限，建议用本地服务。

> 站点通过 `http://` 提供时功能最完整（宠物解析依赖 Canvas 像素读取，需同源 http 环境）。

## 部署到 GitHub Pages（免域名）

本项目是纯静态站点，可直接托管到 GitHub Pages，**无需购买域名**：

1. 在 GitHub 新建一个仓库（如 `huazai-tool-studio`）。
2. 进入仓库 **Settings → Pages**，Source 选择 `Deploy from a branch`，分支选 `main`（或 `master`），目录选 `/ (root)`，保存。
3. 将本目录内容推送到该仓库：
   ```bash
   git init
   git add .
   git commit -m "init: 华仔效率工坊静态站"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```
4. 等待 1–2 分钟，访问 `https://<你的用户名>.github.io/<仓库名>/` 即可。

> 本仓库已包含 `.nojekyll`，可避免 GitHub 误把下划线文件当 Jekyll 处理。

## 关于资源体积（重要）

- `pets/` 目录约 160MB（92 个精灵图），属运行时必需资源。
- 整个仓库约 160MB+，可正常 `git push`（GitHub 单文件限制 100MB，本目录单文件均远低于此）。
- 若推送缓慢或想更规范，建议改用 **Git LFS** 管理 `pets/` 大图，或仅保留所需宠物以精简体积。

## 自定义域名（可选）

若想用自己的域名（如 `www.example.com`），在仓库 Settings → Pages → Custom domain 填写，并按提示添加 DNS 解析记录即可。不配置也能用 GitHub 提供的免费子域名访问。
=======
# huazai-tool-studio
小工具
>>>>>>> f8d2258c418af0941408c9d2362d590226c6487f
