"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore, type ReactNode } from "react";

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

const BUTTON_CLASS =
  "bg-muted text-foreground/70 hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-colors hover:shadow-xl";

/**
 * 明暗切换。名称固定为“深色模式”，开没开由 aria-pressed 报，读屏念成“深色模式，已按下”。
 * 服务端不知道站点明暗，挂载前先占一个禁用的同尺寸按钮，水合后不跳。
 */
export function ThemeSwitch({ label }: { label: string }): ReactNode {
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {mounted ? (
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`${BUTTON_CLASS} cursor-pointer`}
          aria-label={label}
          aria-pressed={isDark}
        >
          {isDark ? (
            <Sun className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Moon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      ) : (
        <button
          type="button"
          className={BUTTON_CLASS}
          aria-label={label}
          disabled
        />
      )}
    </div>
  );
}
