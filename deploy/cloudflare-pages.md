# hachimi-website 部署 runbook：Cloudflare Pages（生产）

> 官网（营销站加中英法律页）跑在 **Cloudflare Pages**，自有域 **`https://hachimi.ai`** 与 `www.hachimi.ai`。
> Next.js App Router 静态导出（`output: "export"` → `out/`），外加 `functions/` 下一个 Pages Function。
> **凭据零入库**：CF token 经环境注入，不入库、不回显。

## 当前生产实例

- **入口**：`https://hachimi.ai` / `https://www.hachimi.ai`，Cloudflare 自动 TLS 与全球边缘。
- **Pages 项目**：`hachimi-app-website`，account `6e53…388a`，域 `hachimi-app-website.pages.dev` / `hachimi.ai` / `www.hachimi.ai`。
- **Git 集成**：连 `github.com/sinnohzeng/hachimi-website`，**推 `main` 即自动构建并部署**。CF 侧跑 `npm run build`，静态输出目录 `out`；仓根的 `functions/` 由 Pages CI 单独打包成 Function。
- **Node 版本**：仓内 `.node-version`（24）锁定 CF 构建镜像，本机开发同版本对齐。

## 两端 App 依赖的网址

下面这些网址写死在已发布的 App 里或登记在商店后台，改路径、删页面之前先确认两端都不再用：

| 网址                                                     | 谁在用                                                                                                          |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/{zh,en}/privacy`、`/{zh,en}/terms`、`/{zh,en}/support` | iOS `AppConfig.privacyPolicyURL` / `termsURL` / `supportURL`；Android `SiteLinks.privacy` / `terms` / `support` |
| `/data-deletion`（302 到 `/en/data-deletion`）           | Google Play 后台登记的数据删除网址                                                                              |
| `/get`                                                   | 两端分享卡与成图上的二维码（iOS `AppConfig.appLinkURL`，Android `SiteLinks.APP`）                               |

## `/get` 按平台分流（Pages Function）

`functions/get.ts` 接 `/get` 与 `/get/`（Pages 的文件路由对末尾斜杠一视同仁），判断写在 `lib/platform.ts`：

- UA 含 `MicroMessenger`（微信与企业微信）：302 到落地页 `/{zh,en}/get`，语言按 `Accept-Language` 权重最高的一项，zh 开头去 `/zh/get`，其余 `/en/get`。
- 不在微信里：iPhone、iPad、iPod 302 到 App Store，Android 302 到 Google Play，其余 302 到落地页。商店链接取 `lib/config.ts`。
- 回应头恒为 `Cache-Control: no-store` 与 `Vary: User-Agent, Accept-Language`。`_headers` 与 `_redirects` 不作用于 Function 的回应，头只能在 Function 里写。
- iPadOS 的 Safari 自报 Mac，边缘认不出，会落到落地页；落地页的内联脚本按触点数认出它，不在微信里时 `location.replace` 到 App Store。

`functions/` 存在时，Pages CI 与 wrangler 发布都会自动生成 `_routes.json`，只有 `/get` 走 Function，其余仍是不计 Function 调用的静态请求。

本机验证 Function：

```bash
npm run build
npx wrangler pages dev out --port 8788 --ip 127.0.0.1   # 仓根的 functions/ 自动带上
```

wrangler 只在启动时读 `out/_redirects`，改了重定向要重启它。

## 边缘重定向（`public/_redirects`，随构建拷入 `out/`）

- `/ → /en 302`：CF redirects 先于静态资产生效，`out/index.html` 只给本地 dev 与非 CF 环境兜底。
- 裸法律页 `/privacy`、`/terms`、`/support`、`/data-deletion` 302 到 `/en/...`。
- 旧账号页并进了删除数据页：`/account-deletion` 与 `/:locale/account-deletion` 301 到对应的 `/data-deletion`。带占位符的规则放在静态规则之后。
- 排盘的规矩一页并进了首页：`/methodology` 302 到 `/en#faq`，`/:locale/methodology` 与带斜杠的写法 301 到 `/:locale#faq`。

## 边缘安全规则（zone `hachimi.ai`）

- 自定义 WAF 规则一条，在 zone 的 `http_request_firewall_custom` 入口集里：host 是 `hachimi.ai` 或 `www.hachimi.ai` 时跳过浏览器完整性检查（`skip`，products `bic`），让商店后台的网址检查器取得到法律页与删除数据页。`api.hachimi.ai` 不在其内，照旧受检。
- Bot Fight Mode 开着，作用于整个 zone。`Python-urllib` 这一个 UA 在三个主机上都回 403 `error code: 1010`，跳过 BIC 之后照旧；curl、python-requests、Go、Java、okhttp 与 Googlebot 的 UA 都回 200。验证与冒烟一律用 curl。

## 部署 / 更新（两条路径）

**路径 A：Git 自动部署（首选，日常改动走这条）**

```bash
# 改完源码，本地过门后推 main，CF Pages 自动构建并部署。
npm run check          # 唯一的门，不拿分项代替，各项见 README 的脚本表
git push origin main   # .githooks/pre-push 会再跑一遍门；CF 侧 npm run build 后上线
```

> 质量门只在本地跑，本仓没有 CI。钩子每台新机装一次：`git config core.hooksPath .githooks`。

**路径 B：wrangler 直传（Git 触发不了时的兜底，本机可立即上线）**

```bash
# 0. token 经环境注入，不入库。本机放在 hachimi-ios/.env 的 HACHIMI_CLOUDFLARE_API_TOKEN（与后端 Workers 同一把）。
export CLOUDFLARE_API_TOKEN="$(grep -E '^HACHIMI_CLOUDFLARE_API_TOKEN=' ../hachimi-ios/.env | cut -d= -f2-)"
export CLOUDFLARE_ACCOUNT_ID="6e53b42ebce00f8701767e05fbce388a"

# 1. 本地静态导出
npm run build                                         # → out/

# 2. 在仓根直传生产（--branch main = 生产别名 hachimi.ai），仓根的 functions/ 一并上传
npx wrangler pages deploy out --project-name hachimi-app-website --branch main
```

> 路径 B 是 Direct Upload 部署，与 Git 集成并存；下一次推 `main` 会再触发 Git 构建，覆盖回 Git 驱动的版本。

## 验证（部署后必跑）

先 curl 部署专属预览域 `https://<deployment-id>.hachimi-app-website.pages.dev/` 确认新部署的行为，再验 apex。自定义域切到新部署有约 1 分钟传播延迟，部署刚显示成功时 apex 可能仍回旧版。

```bash
BASE=https://hachimi.ai
for p in /zh /en /zh/privacy /en/privacy /zh/terms /en/terms /zh/support /en/support \
         /zh/data-deletion /en/data-deletion /zh/get /en/get; do
  echo "[$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$BASE$p")] $p"
done
# 期望：全 200。

for p in /account-deletion /zh/account-deletion /en/account-deletion; do
  curl -s -o /dev/null -w "%{http_code} $p -> %{redirect_url}\n" "$BASE$p"
done
# 期望：301 到对应的 /data-deletion。

for p in /methodology /zh/methodology /en/methodology /en/methodology/; do
  curl -s -o /dev/null -w "%{http_code} $p -> %{redirect_url}\n" "$BASE$p"
done
# 期望：裸路径 302 到 /en#faq，其余 301 到对应语言的 /zh#faq 或 /en#faq。

ua() {
  case $1 in
    ios) echo 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1' ;;
    android) echo 'Mozilla/5.0 (Linux; Android 16; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36' ;;
    wechat) echo 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.60 NetType/WIFI Language/zh_CN' ;;
    desktop) echo 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' ;;
  esac
}
for k in ios android wechat desktop; do
  for p in /get /get/; do
    echo "== $k $p"
    curl -s -o /dev/null -D - -H "User-Agent: $(ua $k)" -H 'Accept-Language: zh-CN,zh;q=0.9' "$BASE$p" \
      | grep -iE '^(HTTP|location|cache-control)'
  done
done
# 期望：iOS 去 App Store，Android 去 Google Play，微信与桌面去 /zh/get；全是 302 加 no-store。
```

## 回滚

```bash
export CLOUDFLARE_API_TOKEN="$(grep -E '^HACHIMI_CLOUDFLARE_API_TOKEN=' ../hachimi-ios/.env | cut -d= -f2-)"
npx wrangler pages deployment list --project-name hachimi-app-website   # 取上一个正常部署的 Id
# 在 CF Dash 的 Pages → hachimi-app-website → Deployments 里对目标部署点 “Rollback to this deployment”；
# wrangler 没有一键回滚的子命令，也可以重跑路径 B 传上一版 out/。
```

Function 与静态文件同属一个部署，回滚部署时 `/get` 一起回到那一版。

## 关键红线

- **法律页与真源一致**：隐私政策与使用条款的真源是 hachimi-ios `docs/legal/`，本仓 `content/legal/` 逐字镜像，构建时渲染成 `/privacy` 与 `/terms`。那边改了先跑 `npm run legal:sync`，`lib/config.ts` 的 `pageDates` 改成同一天，`npm run check` 里的 `legal:check` 与 `test:dates` 都过了才推。删除数据页与支持页的文字在 `lib/i18n/`，与政策同一个口径。
- **凭据**：CF token 与后端 Workers 同一把，放 `hachimi-ios/.env`，不入库、不回显。

Orb 发布证据见 [spec 002 delivery](../specs/002-orb-ip-motion/delivery.md)。
