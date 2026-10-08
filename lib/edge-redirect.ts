/**
 * 两个 Pages Function 共用的 302。去向随请求头变，回应一律 no-store，Vary 列出决定去向的
 * 请求头。Pages 的 _headers 规则管不到 Function 的回应，响应头只能在这里写。
 *
 * 只用 Web 标准 API：Function 由 wrangler 单独打包，scripts/platform.test.mjs 由 Node 直接剥类型运行。
 */
export function edgeRedirect(location: string, vary: string): Response {
  return new Response(null, {
    status: 302,
    headers: { Location: location, "Cache-Control": "no-store", Vary: vary },
  });
}
