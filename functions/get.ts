import { getDestination } from "../lib/platform.ts";

/**
 * hachimi.ai/get：两端分享卡与站外链接的统一下载入口，按平台 302 分流。
 * Pages Functions 的路由不计尾斜杠，/get 与 /get/ 都落到这里。
 *
 * 去向随请求头变，回应一律不缓存。Pages 的 _headers 规则管不到 Function 的
 * 回应，响应头只能在这里写。
 */
export function onRequest({ request }: { request: Request }): Response {
  const location = getDestination(
    request.headers.get("User-Agent") ?? "",
    request.headers.get("Accept-Language")
  );
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      Vary: "User-Agent, Accept-Language",
    },
  });
}
