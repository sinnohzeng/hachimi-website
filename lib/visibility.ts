/**
 * 把「元素在视口里」与「页面在前台」合成一个可见性信号。
 *
 * WebGL 宿主只该在这两条同时成立时跑 rAF：只看 IntersectionObserver，切到别的
 * 标签页后 shader 仍在烧 GPU；只看 visibilitychange，滚到页尾时首屏那张还在画。
 * 回调按合成结果去抖，只在真值翻转时触发一次。
 *
 * 环境不支持 IntersectionObserver（或在服务端被误调）时一律报 true，宁可多画也
 * 不要整块背景不出现。
 */
export function observeVisibility(
  element: Element,
  onChange: (active: boolean) => void,
  rootMargin = "200px"
): () => void {
  if (
    typeof IntersectionObserver === "undefined" ||
    typeof document === "undefined"
  ) {
    onChange(true);
    return () => {};
  }

  let inView = false;
  let pageVisible = !document.hidden;
  let last: boolean | null = null;

  const emit = (): void => {
    const active = inView && pageVisible;
    if (active === last) return;
    last = active;
    onChange(active);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[entries.length - 1];
      inView = entry ? entry.isIntersecting : false;
      emit();
    },
    { rootMargin }
  );
  observer.observe(element);

  const onVisibilityChange = (): void => {
    pageVisible = !document.hidden;
    emit();
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}
