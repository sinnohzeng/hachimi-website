#!/usr/bin/env python3
"""commit message 行文门：整条 message 按 `prose_rules.py` 的前五条判，与入库文件那道门同一份判据。

整条 message 都是给人读的字，故整条算行文，只剥行内反引号片段。叙事词、术语与句长不判：
message 讲的就是变更。git 自己加的井号注释行不判。不读 `prose.json`，没接配置的仓也能用。

用法：commit-msg 钩子调用，也可以直接 `python3 <本文件> <commit message 文件>` 手动跑。
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import prose_rules  # noqa: E402


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print("用法：commit-msg-style-gate.py <commit message 文件>", file=sys.stderr)
        return 2
    with open(argv[1], encoding="utf-8") as handle:
        text = "\n".join(line for line in handle.read().splitlines() if not line.startswith("#"))
    hits = prose_rules.check_message(text)
    if not hits:
        return 0
    print("❌ commit message 行文门未过：", file=sys.stderr)
    for hit in hits:
        print(f"  第 {hit.line} 行{hit.detail}", file=sys.stderr)
    print(f"\n   {prose_rules.ADVICE}", file=sys.stderr)
    print("   改完重新 commit。确需绕过用 --no-verify，绕过的理由写进 message。", file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
