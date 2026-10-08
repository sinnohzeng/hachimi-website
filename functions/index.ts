import { edgeRedirect } from "../lib/edge-redirect.ts";
import { localeOf } from "../lib/platform.ts";

/**
 * hachimi.ai/：按 Accept-Language 302 到 /zh 或 /en，与 /get 落地页同一个 localeOf。
 * 只接根路径，其余网址照常走静态产物。
 */
export function onRequest({ request }: { request: Request }): Response {
  return edgeRedirect(
    `/${localeOf(request.headers.get("Accept-Language"))}`,
    "Accept-Language"
  );
}
