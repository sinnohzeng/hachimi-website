# AGENTS.md：hachimi-website

> agent 在本仓的入口：读序、去处、命令与边界。六仓共用的约定在 hachimi-ios，这里只给链接。

## 这是什么

中英双语官网 `hachimi.ai`，Next.js App Router 静态导出，Cloudflare Pages 托管，推 `main` 即构建上线。本机准备（hachimi-ios 放在同一个父目录下）、页面、脚本与目录见 [README.md](README.md)。

## 开工前按序读

1. hachimi-ios 的[工作约定](../hachimi-ios/docs/working-agreement.md)：owner 定的流程、授权与节奏，六仓共用，与本文件冲突时以它为准。
2. 正在做的那份规约 `specs/<编号>-<名>/`；多文件改动先写 `spec.md` 再写 `plan.md`。

一件事该写在哪份文档，见 hachimi-ios 的 [docs/README.md](../hachimi-ios/docs/README.md)。

## 按任务再读

HTTP API 写在 hachimi-backend `README.md` 的“HTTP API”一节；本站运行时只有 `functions/` 下按语言与平台分流的两个 Pages Function。

- 写规约、查规约状态：[specs/README.md](specs/README.md)
- 改文案：[规约 007](specs/007-copy-system/spec.md)；hachimi-ios 的 `docs/product-thesis.md`、`docs/copy-principles.md`、`docs/copy-canon.md`，共用句先改定稿句表再跑 `npm run check:canon`
- 改隐私政策或使用条款：真源在 hachimi-ios `docs/legal/`，本仓不改字，流程见 README 的“Legal pages”一节；删除数据页与支持页的文字在 `lib/i18n/`
- 部署、缓存与安全头、改路径：[部署 runbook](deploy/cloudflare-pages.md)，两端 App 依赖的网址表在里面
- 动道长圆球：[品牌资产](design/brand/README.md)、[规约 003](specs/003-orb-on-rive/spec.md)、hachimi-orb 的 `hosts/README.md`
- 动首屏性能、字体或截图：[规约 009](specs/009-mobile-perf/spec.md)、[性能教训](docs/lessons/web-performance.md)
- 动 Next 或 Pages 配置：[Cloudflare Pages 与 Next 的坑](docs/lessons/cloudflare-pages-and-next.md)
- 动读兄弟仓的门：[跨仓门的坑](docs/lessons/cross-repo-gates.md)
- 写新组件：`frontend-component-priority` 技能的取件顺序；`components.json` 只接了 React Bits 的三个 registry

## 命令

脚本表与 pre-push 钩子的开法在 [README.md](README.md) 的“Scripts”与“Quality gate”两节。`npm run check` 是唯一的门，推送前跑全，不拿分项代替。

## 边界

- 商店链接、站点信息与支持页、删除数据页的日期只写在 `lib/config.ts`，隐私与条款的日期从法律件 Markdown 读；语言表只写在 `lib/locale.ts`，UA 判断只写在 `lib/platform.ts`。
- 新坑写进 `docs/lessons/` 对应那一份。
