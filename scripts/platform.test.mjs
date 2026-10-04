/**
 * 分流与页面平台脚本的门：四种 UA 打到 functions/get.ts，看去向与响应头；根路径的
 * functions/index.ts 按 Accept-Language 分流；
 * 同一组 UA 在沙箱里跑 lib/platform.ts 生成的内联脚本，看 html 上标的平台。
 *
 * 直接 import 源码 .ts，Node 剥类型运行，与线上是同一份判断。
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import vm from "node:vm";

const { onRequest } = await import("../functions/get.ts");
const { onRequest: onRoot } = await import("../functions/index.ts");
const { siteConfig } = await import("../lib/config.ts");
const { localeOf, platformScript, iPadOSStoreScript } =
  await import("../lib/platform.ts");

const UA = {
  ios: "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1",
  android:
    "Mozilla/5.0 (Linux; Android 16; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36",
  wechat:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.60(0x18003c2f) NetType/WIFI Language/zh_CN",
  desktop:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
};

const WECHAT_ANDROID =
  "Mozilla/5.0 (Linux; Android 16; V2405A) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/130.0.6723.103 Mobile Safari/537.36 XWEB/1300333 MMWEBSDK/20250201 MMWEBID/1234 MicroMessenger/8.0.60.2860(0x28003C3B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64";

function get(userAgent, acceptLanguage) {
  const headers = { "User-Agent": userAgent };
  if (acceptLanguage) headers["Accept-Language"] = acceptLanguage;
  return onRequest({
    request: new Request("https://hachimi.ai/get", { headers }),
  });
}

function assertNoStore(response) {
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.match(response.headers.get("Vary") ?? "", /User-Agent/);
}

test("iPhone 去 App Store", () => {
  const response = get(UA.ios, "zh-CN,zh;q=0.9");
  assertNoStore(response);
  assert.equal(response.headers.get("Location"), siteConfig.appStore);
});

test("Android 去 Google Play", () => {
  const response = get(UA.android, "en-US,en;q=0.9");
  assertNoStore(response);
  assert.equal(response.headers.get("Location"), siteConfig.googlePlay);
});

test("微信里不分平台，一律去落地页，语言跟 Accept-Language", () => {
  for (const ua of [UA.wechat, WECHAT_ANDROID]) {
    const zh = get(ua, "zh-CN,zh;q=0.9,en;q=0.8");
    assertNoStore(zh);
    assert.equal(zh.headers.get("Location"), "/zh/get");
    assert.equal(get(ua, "en-GB,en;q=0.9").headers.get("Location"), "/en/get");
  }
});

test("桌面去落地页，没有 Accept-Language 时是英文", () => {
  const response = get(UA.desktop);
  assertNoStore(response);
  assert.equal(response.headers.get("Location"), "/en/get");
  assert.equal(get(UA.desktop, "zh-TW").headers.get("Location"), "/zh/get");
});

test("Accept-Language 按权重取最高的一项", () => {
  assert.equal(localeOf("en;q=0.5,zh-CN;q=0.9"), "zh");
  assert.equal(localeOf("zh;q=0.1,en"), "en");
  assert.equal(localeOf("zh-Hant-HK"), "zh");
  assert.equal(localeOf("ja,en;q=0.8"), "en");
  assert.equal(localeOf(""), "en");
  assert.equal(localeOf(null), "en");
});

function root(acceptLanguage) {
  const headers = acceptLanguage ? { "Accept-Language": acceptLanguage } : {};
  return onRoot({ request: new Request("https://hachimi.ai/", { headers }) });
}

test("根路径按 Accept-Language 分流，与 /get 同一个 localeOf", () => {
  for (const [acceptLanguage, locale] of [
    ["zh-CN,zh;q=0.9,en;q=0.8", "zh"],
    ["en-GB,en;q=0.9", "en"],
    ["en;q=0.5,zh-TW;q=0.9", "zh"],
    [undefined, "en"],
  ]) {
    const response = root(acceptLanguage);
    assert.equal(response.status, 302);
    assert.equal(response.headers.get("Location"), `/${locale}`);
    assert.equal(
      response.headers.get("Location"),
      `/${localeOf(acceptLanguage ?? null)}`
    );
    assert.equal(response.headers.get("Cache-Control"), "private, no-store");
    assert.equal(response.headers.get("Vary"), "Accept-Language");
  }
});

/** 在沙箱里跑内联脚本，返回 html 上的 dataset 与 location.replace 的去向。 */
function runInPage(script, { userAgent, platform = "", maxTouchPoints = 0 }) {
  const dataset = {};
  const classes = new Set(["no-js"]);
  const replaced = [];
  vm.runInNewContext(script, {
    navigator: { userAgent, platform, maxTouchPoints },
    document: {
      documentElement: {
        dataset,
        classList: { remove: (name) => classes.delete(name) },
      },
    },
    location: { replace: (url) => replaced.push(url) },
  });
  return { dataset, noJs: classes.has("no-js"), replaced };
}

test("页面脚本与 Function 用同一组正则", () => {
  const script = platformScript();
  const cases = [
    [UA.ios, "ios", false],
    [UA.android, "android", false],
    [UA.wechat, "ios", true],
    [WECHAT_ANDROID, "android", true],
    [UA.desktop, "other", false],
  ];
  for (const [userAgent, platform, wechat] of cases) {
    const page = runInPage(script, { userAgent });
    assert.equal(page.dataset.platform, platform, userAgent);
    assert.equal("wechat" in page.dataset, wechat, userAgent);
    assert.equal(page.noJs, false);
  }
  const iPad = runInPage(script, {
    userAgent: UA.desktop,
    platform: "MacIntel",
    maxTouchPoints: 5,
  });
  assert.equal(iPad.dataset.platform, "ios");
});

test("落地页只把不在微信里的 iPadOS 换到 App Store", () => {
  const script = iPadOSStoreScript();
  const iPad = { platform: "MacIntel", maxTouchPoints: 5 };
  assert.deepEqual(
    runInPage(script, { userAgent: UA.desktop, ...iPad }).replaced,
    [siteConfig.appStore]
  );
  assert.deepEqual(
    runInPage(script, {
      userAgent: `${UA.desktop} MicroMessenger/8.0.60`,
      ...iPad,
    }).replaced,
    []
  );
  assert.deepEqual(
    runInPage(script, { userAgent: UA.desktop, platform: "MacIntel" }).replaced,
    []
  );
});
