import { localeOf } from "../lib/platform.ts";

/**
 * hachimi.ai/：按 Accept-Language 302 到 /zh 或 /en，与 /get 落地页同一个 localeOf。
 * 只接根路径，其余网址照常走静态产物。去向随请求头变，回应不进共享缓存。
 */
export function onRequest({ request }: { request: Request }): Response {
  return new Response(null, {
    status: 302,
    headers: {
      Location: `/${localeOf(request.headers.get("Accept-Language"))}`,
      "Cache-Control": "private, no-store",
      Vary: "Accept-Language",
    },
  });
}
