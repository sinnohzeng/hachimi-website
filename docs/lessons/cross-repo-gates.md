# 跨仓的门

本仓有几道门直接读兄弟仓 hachimi-ios 的脚本或文件。那边一改写法，这边的门先红。

## 按路径加载 iOS 的门脚本，要把它的目录放进模块路径（2026-10-05）

症状：`npm run check:mentions` 报 `ModuleNotFoundError: No module named 'gatekit'`，本仓一行没改。
原因：`check-copy-mentions.mjs` 用 `importlib` 按文件路径加载 iOS 的 `no-reference-mentions.py` 取词表；iOS 把各道门的公共部分收进同目录的 `gatekit.py` 之后，那份脚本开头 `import gatekit`，而按路径加载不会把脚本所在目录放进 `sys.path`。
规则：按路径加载兄弟仓的 Python 脚本时，先 `sys.path.insert(0, 脚本目录)` 再 `exec_module`；兄弟仓的门改了公共模块，推送前在本仓跑一次 `npm run check`。
