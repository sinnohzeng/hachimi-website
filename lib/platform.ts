import { siteConfig } from "./config.ts";
import { defaultLocale, type Locale } from "./locale.ts";

/**
 * 平台判断的唯一出处。Pages Function（functions/get.ts）在边缘按请求头分流，
 * 页面里的内联脚本在首帧前给 <html> 标平台，两边的正则都从这里取。
 *
 * 只用 Web 标准 API，不引任何 Next 模块：Function 由 wrangler 单独打包，
 * scripts/platform.test.mjs 由 Node 直接剥类型运行。
 */
export const userAgentPattern = {
  // 企业微信的 UA 也含 MicroMessenger，一并算在微信里。
  wechat: /MicroMessenger/,
  ios: /iPhone|iPad|iPod/,
  android: /Android/,
} as const;

// iPadOS 13 起的 Safari 默认要桌面版网页，UA 与 navigator.platform 都自报 Mac，
// 服务端分不出来；只有浏览器里的触点数能认出它。
const iPadOSCheck =
  'navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1';

export type Platform = "ios" | "android" | "other";

export function platformOf(userAgent: string): Platform {
  if (userAgentPattern.ios.test(userAgent)) return "ios";
  if (userAgentPattern.android.test(userAgent)) return "android";
  return "other";
}

export function isWeChat(userAgent: string): boolean {
  return userAgentPattern.wechat.test(userAgent);
}

/** Accept-Language 里权重最高的那一项以 zh 开头就是中文，其余一律走缺省语言。 */
export function localeOf(acceptLanguage: string | null): Locale {
  let best = { tag: "", q: -1 };
  for (const part of (acceptLanguage ?? "").split(",")) {
    const [tag = "", ...params] = part.trim().toLowerCase().split(";");
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? Number(qParam.trim().slice(2)) : 1;
    if (tag && !Number.isNaN(q) && q > best.q) best = { tag, q };
  }
  return best.tag.startsWith("zh") ? "zh" : defaultLocale;
}

/**
 * /get 的去向：微信里一律去落地页（应用商店在微信里打不开），不在微信里时
 * iPhone、iPad、iPod 去 App Store，Android 去 Google Play，其余去落地页。
 */
export function getDestination(
  userAgent: string,
  acceptLanguage: string | null
): string {
  if (!isWeChat(userAgent)) {
    const platform = platformOf(userAgent);
    if (platform === "ios") return siteConfig.appStore;
    if (platform === "android") return siteConfig.googlePlay;
  }
  return `/${localeOf(acceptLanguage)}/get`;
}

/**
 * 每页 <body> 首位的内联脚本：首帧绘制前写 html[data-platform] 与
 * html[data-wechat]，再移除 no-js。CSS 据前者收敛下载徽章，据后者显示
 * 微信里的提示。
 */
export function platformScript(): string {
  const { ios, android, wechat } = userAgentPattern;
  return `(function(){try{var ua=navigator.userAgent,p="other",h=document.documentElement;if(${ios}.test(ua)||(${iPadOSCheck}))p="ios";else if(${android}.test(ua))p="android";h.dataset.platform=p;if(${wechat}.test(ua))h.dataset.wechat="";h.classList.remove("no-js")}catch(e){}})();`;
}

/**
 * 落地页的内联脚本：边缘把 iPadOS 当桌面送来了落地页，这里认出来直接换到
 * App Store；微信里不换，留在页上看提示。
 */
export function iPadOSStoreScript(): string {
  const { wechat } = userAgentPattern;
  return `(function(){try{if((${iPadOSCheck})&&!${wechat}.test(navigator.userAgent))location.replace(${JSON.stringify(siteConfig.appStore)})}catch(e){}})();`;
}
