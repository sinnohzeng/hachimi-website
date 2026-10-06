# specs：官网功能规约

规约目录只放在途的。一份规约一个目录，`spec.md` 写造什么，`plan.md` 写怎么造；先 spec 后 plan 的流程见 hachimi-ios [宪法](../../hachimi-ios/docs/constitution.md)第五节。

官网推 `main` 即上线，规约在落地上线的那一批提交里整个目录退场：

1. 仍然成立的现状写进 README、`docs/` 或 `design/`，没做完的事挪进 hachimi-ios 的[路线图](../../hachimi-ios/docs/roadmap.md)。
2. 入链改成永久链接 `https://github.com/sinnohzeng/hachimi-website/blob/<标签或提交>/<路径>`：标签 `archive-docs-20261006` 里有那份文件就用标签，没有就用删除之前的那个提交号。
3. `git rm` 整个目录；规约引的调研没有别处再引，同批删。

规矩与理由在 hachimi-ios 的 ADR-0070。

| 编号                       | 功能                               | 状态   |
| -------------------------- | ---------------------------------- | ------ |
| [008](008-feedback-first/) | 收费延后与“写给道长”在官网上的落点 | 进行中 |
