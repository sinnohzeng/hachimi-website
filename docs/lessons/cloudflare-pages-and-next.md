# Cloudflare Pages 与 Next 静态导出（工程教训）

每条先写怎么回事，再写做法。新坑写进这一份，标题带日期。

## Pages Function 的回应头只能在 Function 里写（2026-10-01）

要点：`_headers` 与 `_redirects` 只作用于静态资产的回应，请求一旦交给 Function，这两份文件都管不到。`/get` 原先是 `_redirects` 里的一条 302，回应头由 Pages 默认给；改成 `functions/get.ts` 之后，缓存与 `Vary` 若想照旧在 `_headers` 里配，不会生效。

做法：`Cache-Control: no-store` 与 `Vary` 直接写在 Function 的 `Response` 里，`scripts/platform.test.mjs` 断言这两个头；`_redirects` 里同一路径的旧规则删掉。

## `wrangler pages dev` 只在启动时读 `_redirects`（2026-10-01）

现象：改了 `public/_redirects`，重新构建进 `out/`，本机请求仍按旧规则跳。

根因：wrangler 在启动时解析一次 `_redirects`，之后不监听这个文件。

做法：改完重定向要重启 `wrangler pages dev`。启动日志会对规则顺序提出建议：带 `:placeholder` 的规则放在静态规则之后。

## iPadOS 的 Safari 在边缘认不出（2026-10-01）

现象：按 UA 分流时，iPad 被当成桌面送到落地页。

根因：iPadOS 13 起 Safari 默认要桌面版网页，UA 与 `navigator.platform` 都自报 Mac，请求头里没有能区分它的东西。

做法：边缘照常按 UA 分；落地页的内联脚本用 `navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1` 认出 iPadOS，不在微信里时 `location.replace` 到 App Store。两处的判断都从 `lib/platform.ts` 取。

## 删掉一个路由后 `tsc --noEmit` 报找不到那一页（2026-10-01）

现象：删了 `app/[locale]/account-deletion/page.tsx`，`npm run typecheck` 报 `Cannot find module '../../app/[locale]/account-deletion/page.js'`。

根因：`tsconfig.json` 把 `.next/types/**` 纳入编译，`next build` 生成的路由验证文件还留着上一次构建的路由表。

做法：跑一次 `npm run build` 重新生成即可，不要去改 `tsconfig.json`。`npm run check` 里 typecheck 排在 build 之前，删路由后的第一次检查先单独构建一次。

## ESLint 10 装得上、跑不起来，卡在 eslint-config-next 带的插件（2026-10-01）

现象：`npm install -D eslint@10` 只给三条 `ERESOLVE overriding peer dependency` 警告就装上了，`npx eslint .` 一跑即崩：`Error while loading rule 'react/display-name': contextOrFilename.getFilename is not a function`。

根因：ESLint 10 删掉了 `context.getFilename()`，eslint-config-next 16.3.8 依赖的 eslint-plugin-react 7.37.5 还在调它；同批的 eslint-plugin-import 2.32.0 与 eslint-plugin-jsx-a11y 6.10.2 的 peer 也只到 eslint 9。eslint-config-next 自己声明 `eslint >=9`，所以 npm 只警告不拦。

做法：eslint 留在 9 线最新，等 eslint-config-next 换上支持 10 的插件再升。判断能不能升，看 `npx eslint .` 能不能跑完，不看安装有没有报错；试装用 `npm install --no-save`，试完 `npm ci` 还原。
