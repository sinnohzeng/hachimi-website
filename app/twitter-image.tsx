// Twitter (summary_large_image) card reuses the same 1200x630 branded design
// as the Open Graph card, generated at build time via next/og.
export { default, size, contentType, alt } from "./opengraph-image";

// Required for image routes under `output: "export"`.
export const dynamic = "force-static";
