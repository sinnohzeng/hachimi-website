import { edgeRedirect } from "../lib/edge-redirect.ts";
import { getDestination } from "../lib/platform.ts";

/**
 * hachimi.ai/get：两端分享卡与站外链接的统一下载入口，按平台 302 分流。
 * Pages Functions 的路由不计尾斜杠，/get 与 /get/ 都落到这里。
 */
export function onRequest({ request }: { request: Request }): Response {
  const location = getDestination(
    request.headers.get("User-Agent") ?? "",
    request.headers.get("Accept-Language")
  );
  return edgeRedirect(location, "User-Agent, Accept-Language");
}
