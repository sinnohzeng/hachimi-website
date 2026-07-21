# hachimi-website 部署 runbook —— Cloudflare Pages（生产）

> 官网（营销站 + 中英法律件）跑在 **Cloudflare Pages**，自有域 **`https://hachimi.ai`**（+ `www.hachimi.ai`）。
> Next.js App Router 静态导出（`output: "export"` → `out/`）。
> **凭据零入库**：CF token 经环境注入，绝不入库 / 不回显。

## 当前生产实例

- **入口**：`https://hachimi.ai` / `https://www.hachimi.ai`（Cloudflare 自动 TLS + 全球边缘）。
- **Pages 项目**：`hachimi-app-website`，account `6e53…388a`，域 `hachimi-app-website.pages.dev` / `hachimi.ai` / `www.hachimi.ai`。
- **Git 集成**：连 `github.com/sinnohzeng/hachimi-website`，**push `main` 自动构建 + 部署**（CF 侧跑 `npm run build`，输出目录 `out`）。
- **构建产物**：`out/`（`.gitignore` 忽略，CF 侧或本地现构）。App 硬编码依赖的法律 URL：`/{zh,en}/privacy`、`/{zh,en}/terms`、`/{zh,en}/support`（iOS `AppConfig.privacyPolicyURL` / `termsURL`）。
- **边缘重定向**：`public/_redirects`（随构建拷入 `out/`）承载 `/ → /en 302`——CF redirects 恒先于静态资产生效，apex 白屏跳转页自此不再被渲染；`out/index.html` 仅剩本地 dev / 非 CF 环境兜底。Node 版本由仓内 `.node-version`（24）锁定 CF 构建镜像（本地开发机同版本对齐）。
- **部署后验证顺序**（2026-07-12 实测）：先 curl 部署专属预览域（`https://<deployment-id>.hachimi-app-website.pages.dev/`）确认新部署行为，再验 apex——自定义域切到新部署有约 1 分钟传播延迟，deploy stage 刚 success 时 apex 可能仍回旧版响应，勿误判为规则未生效。

## 部署 / 更新（两条路径）

**路径 A —— Git 自动部署（首选，日常改动走这条）**

```bash
# 改完源码，本地过门后推 main，CF Pages 自动构建 + 部署。
npm run check          # 唯一门：format:check + lint + typecheck + build（勿跑分项替代）
git push origin main   # 推 main 时 .githooks/pre-push 会再跑一遍门；CF 侧自动 npm run build → 上线
```

> 质量门只在本地：GitHub Actions 已于 2026-07-05 随全 workspace 下线（iOS macOS runner 10× 计费吞满免费额度），本仓残留的 `ci.yml` 于 2026-07-21 移除。钩子安装（每台新机一次）：`git config core.hooksPath .githooks`。

**路径 B —— wrangler 直传（无 Git 触发时的自主兜底，本机可立即上线）**

```bash
# 0. token 经环境注入（绝不入库）。本机放在 hachimi-ios/.env 的 HACHIMI_CLOUDFLARE_API_TOKEN（与后端 Workers 同一把）。
export CLOUDFLARE_API_TOKEN="$(grep -E '^HACHIMI_CLOUDFLARE_API_TOKEN=' ../hachimi-ios/.env | cut -d= -f2-)"
export CLOUDFLARE_ACCOUNT_ID="6e53b42ebce00f8701767e05fbce388a"

# 1. 本地静态导出
npm run build                                         # → out/

# 2. 直传生产（--branch main = 生产别名 hachimi.ai）
npx wrangler pages deploy out --project-name hachimi-app-website --branch main
```

> 路径 B 是“Direct Upload”部署，与 Git 集成并存；下一次 push `main` 会再触发 Git 构建覆盖回 Git 驱动态。二者不冲突。

## 验证（部署后必跑）

```bash
for u in https://hachimi.ai https://hachimi.ai/zh/privacy https://hachimi.ai/en/privacy \
         https://hachimi.ai/zh/terms https://hachimi.ai/en/terms https://hachimi.ai/zh/support; do
  echo "[$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$u")] $u"
done
# 期望：全 200。法律页文案核对：隐私页仍含“设备认证校验为计划中”诚实表述
# （设备证明 App Attest 上线时尚未强制，不得过度声称——见 lib/i18n/{zh,en}.ts）。
```

## 回滚

```bash
export CLOUDFLARE_API_TOKEN="$(grep -E '^HACHIMI_CLOUDFLARE_API_TOKEN=' ../hachimi-ios/.env | cut -d= -f2-)"
npx wrangler pages deployment list --project-name hachimi-app-website   # 取上一个正常部署 Id
# 在 CF Dash 的 Pages → hachimi-app-website → Deployments 里对目标部署点 “Rollback to this deployment”
# （wrangler 暂无一键 rollback 子命令，回滚走 Dash 或重跑路径 B 传上一版 out/）。
```

## 关键红线

- **法律文案与现实一致**（App Store 5.1.1）：隐私政策 / 条款描述的后端存储口径（“帮助改进解读”开启时按假名化最小集存储、原文 90 天自动删除，关闭则不存）、设备证明“计划中”、第三方 AI 服务的数据用途口径（用户可见文档只写“正规商业付费的第三方 AI 服务、已要求其不将你的内容用于训练”，不点名具体供应商）——均须与真实实现口径一致，改文案前先核对现状。设备证明真接入前，措辞保持“计划中 / 尚未强制”。当前供应商身份由代码 / 配置 / 各店 Review Notes 承载，换供应商时用户可见文档无需改，仅更新 Review Notes 与内部运营档、并确保新供应商同样正规商业付费且已就训练 opt-out。
- **凭据**：CF token 与后端 Workers 同一把，放 `hachimi-ios/.env`，绝不入库 / 不回显。
