# Plan 008：收费延后与“写给道长”在官网上的落点怎么造

> 对应 [spec.md](spec.md)。状态：进行中｜创建：2026-10-03

主对话一人做。

- `lib/i18n/zh.ts` 与 `en.ts`：`faq.items` 删会员一条；`support.intro` 改写，`support.table.rows` 加 App 内一行。
- 隐私政策：hachimi-ios `docs/legal/` 改完后跑 `npm run legal:sync`；`lib/config.ts` 的 `pageDates.privacy` 与 `pageDates.support` 改成同一天；`npm run llms:build`。
- `specs/README.md` 索引加一行。
- 分两次推：常见问题与隐私政策一次；支持页与 `pageDates.support` 在 2.1.0 两端上架当天一次。第二次的改动在分支 `web/008-support-on-release`：开头一句讲两条渠道、联系表加 App 内一行、“解读出不来”那一条按 2.1 的许可流程改写；合入 main 时把 `pageDates.support` 改成那一天，再跑 `npm run check` 与部署。
- 验收：`npm run check`；推 main 后回读线上三页。

## 落地记录

- 常见问题删会员一条，`check:canon` 核四句（C1 至 C4）。
- 隐私政策随 hachimi-ios 同步，第二节多一条反馈和举报，`pageDates.privacy` 为 2026-10-03。
