# AGENTS.md：哈基米道长官网

中英双语官网，Next.js App Router 静态导出，生产在 Cloudflare Pages（`hachimi.ai`）。产品定义、法律件真源与协作约定在兄弟仓 hachimi-ios，本仓与它放在同一个父目录下。

- **法律件**：隐私政策与使用条款的真源是 hachimi-ios `docs/legal/`，`content/legal/` 逐字镜像，不在本仓改字。那边改了跑 `npm run legal:sync`，`lib/config.ts` 的 `pageDates` 改成同一天，再跑 `npm run llms:build`。删除数据页与支持页的文字在 `lib/i18n/`。
- **门**：`npm run check` 是唯一的门，推送前跑全，不拿分项代替。分项见 README 的脚本表。
- **部署**：推 `main` 即构建上线。`functions/get.ts` 是 `/get` 按平台分流的 Pages Function，`public/_redirects` 管裸路径与旧网址。runbook 见 `deploy/cloudflare-pages.md`。
- **单一出处**：商店链接、站点信息与页面日期只写在 `lib/config.ts`，UA 判断只写在 `lib/platform.ts`。
- **组件**：写新组件前按 `frontend-component-priority` 技能的取件顺序找件；本仓 `components.json` 只接了 React Bits 的三个 registry。
- **规约**：多文件改动先写 `specs/<编号>-<名>/spec.md` 再写 `plan.md`，索引在 `specs/README.md`。文案口径见 `docs/copy-principles.md`。
- **协作约定**：见 hachimi-ios `docs/working-agreement.md`。
- **教训**：踩过的坑在 `docs/lessons/`，新坑写进对应那一份。
