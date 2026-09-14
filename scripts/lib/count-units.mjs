/**
 * 字数口径的唯一真源。润色脚本与字数门都从这里取，两处各写一份必然会漂。
 *
 * 简体按「字」算，标点不计：一个汉字算一个字，连着的拉丁字母（App、AI）算一个，
 * 连着的数字（154、2408）算一个。这样「154 本古籍」是三个字，与人读时数出来的
 * 长度一致，也不会因为换个写法把预算算歪。
 *
 * 英文按词算，空白切分。上限取简体字数的 0.6 倍，出处是
 * specs/001-site-v3-concise/spec.md 的字数一节。
 */

/**
 * 汉字、连续拉丁串、连续数字各算一个单位；标点与空白不计。
 *
 * 字符类里那三段依次是 CJK 扩展 A（U+3400 到 U+4DBF）、基本区（U+4E00 到
 * U+9FFF）、兼容表意文字（U+F900 到 U+FAFF）。
 */
export function countZh(text) {
  const units = String(text).match(/[㐀-䶿一-鿿豈-﫿]|[A-Za-z]+|\d+/g);
  return units ? units.length : 0;
}

/** 英文按空白切词。连字符词（on-device）算一个。 */
export function countEn(text) {
  const words = String(text)
    .trim()
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w));
  return words.length;
}

/** 英文上限 = 简体字数上限 × 0.6，向上取整，至少 1。 */
export const EN_WORD_RATIO = 0.6;

export function enCapFor(zhLimit) {
  return Math.max(1, Math.ceil(zhLimit * EN_WORD_RATIO));
}

/** 按语种选计数器，省得调用方到处写三元表达式。 */
export function countFor(mode, text) {
  return mode === "zh" ? countZh(text) : countEn(text);
}
