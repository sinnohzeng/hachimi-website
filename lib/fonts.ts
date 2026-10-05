import localFont from "next/font/local";

/*
 * Geist 两款字体的子集，文件由 scripts/build-web-fonts.mjs 按这里各自的 unicode-range 切出。
 * next/font 只认字面量，码位就写在这里，脚本从这份文件读。范围外的字落到 app/globals.css
 * 字体栈里的系统字体。family 名取自常量名，globals.css 按 GeistSans 与 GeistMono 直接引用，
 * 改常量名要一起改。
 */

// 正文：Google Fonts 的 latin 段，加上文案里用到的箭头。
export const GeistSans = localFont({
  src: "../assets/fonts/Geist-Variable-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2190-2199, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

// 等宽只排命例走查的步骤编号 01 到 05，只留数字；在首屏之下，不预载。
export const GeistMono = localFont({
  src: "../assets/fonts/GeistMono-Variable-digits.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    {
      prop: "unicode-range",
      value: "U+0030-0039",
    },
  ],
});
