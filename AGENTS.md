# AGENTS.md：哈基米道长官网

中英双语官网，Next.js App Router 静态导出，生产在 Cloudflare Pages（`hachimi.ai`）。产品定义、法律件真源与协作约定在兄弟仓 hachimi-ios，本仓与它放在同一个父目录下。

- **法律件**：隐私政策与使用条款的真源是 hachimi-ios `docs/legal/`，`content/legal/` 逐字镜像，不在本仓改字。那边改了跑 `npm run legal:sync`。删除数据页与支持页的文字在 `lib/i18n/`。
- **门**：`npm run check` 是唯一的门，推送前跑全，不拿分项代替。分项见 README 的脚本表。
- **部署**：推 `main` 即构建上线。`functions/index.ts` 让 `/` 按语言分流，`functions/get.ts` 让 `/get` 按平台分流；`public/_redirects` 管裸法律路径，`public/_headers` 管静态资产的缓存与安全头。runbook 见 `deploy/cloudflare-pages.md`。
- **单一出处**：商店链接、站点信息与支持页、删除数据页的日期只写在 `lib/config.ts`，隐私与条款的日期从法律件 Markdown 读；语言表只写在 `lib/locale.ts`，UA 判断只写在 `lib/platform.ts`。
- **组件**：写新组件前按 `frontend-component-priority` 技能的取件顺序找件；本仓 `components.json` 只接了 React Bits 的三个 registry。
- **规约**：多文件改动先写 `specs/<编号>-<名>/spec.md` 再写 `plan.md`，索引在 `specs/README.md`。文案的理念、写法与跨面共用的句子分别在 hachimi-ios `docs/product-thesis.md`、`docs/copy-principles.md`、`docs/copy-canon.md`；共用句先改定稿句表，`npm run check:canon` 核对。
- **协作约定**：见 hachimi-ios `docs/working-agreement.md`。
- **教训**：踩过的坑在 `docs/lessons/`，新坑写进对应那一份。
