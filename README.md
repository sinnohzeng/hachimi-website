# Hachimi.ai · 哈基米道长 marketing site

The bilingual (zh / en) one-page marketing site for **Hachimi.ai (哈基米道长)**, a charting app for fate readers and enthusiasts: Zi Wei, Ba Zi and Mei Hua Yi Shu for many people, with each person's casts tracked under their name. Built with Next.js App Router, statically exported (`output: "export"`) and deployed to **Cloudflare Pages** (project `hachimi-app-website`, custom domain `hachimi.ai`; deploy runbook: [`deploy/cloudflare-pages.md`](deploy/cloudflare-pages.md)). Comprehensive SEO, accessibility, and performance optimizations.

## Features

- ✅ **Next.js 16** with App Router (static export to Cloudflare Pages)
- ✅ **TypeScript** (strict mode)
- ✅ **Tailwind CSS v4** with design tokens
- ✅ **Dark Mode** via next-themes
- ✅ **Motion** via motion/react with reduced-motion support
- ✅ **Smooth Scroll** via Lenis with feature flag
- ✅ **SEO Ready** - metadata, Open Graph, Twitter cards
- ✅ **Accessibility** - skip links, focus rings, ARIA labels
- ✅ **Edge Compatible** - no Node-only APIs

## Sections Included

Seven home-page sections, in this order (specs: [`005`](specs/005-site-v4-tools/spec.md) for the sections, [`006`](specs/006-one-page/spec.md) for the one-page layout and audience, [`007`](specs/007-copy-system/spec.md) for the copy; copy sources: hachimi-ios `docs/product-thesis.md`, `docs/copy-principles.md` and `docs/copy-canon.md`):

- **Hero** - the slogan and the bridge line, the Rive Orb, store badges, an ogl light-beam shader
- **One person, one case** (`#what`) - who it's for, the one line to remember, and three things they get
- **Case walkthrough** (`#case`) - a pinned phone cross-fading through a case
- **Four tools** (`#tools`) - Zi Wei, Ba Zi, the case library and Mei Hua casting, each card expands
- **Academy** (`#academy`) - marquee of the bundled classics
- **FAQ / Final CTA / Footer** - accordion, ink shader with the screenshot fan, links and the legal row

The navigation is all home-page anchors. The other pages under `app/[locale]/` are the ones store listings link to: `privacy` and `terms` (rendered from `content/legal/`), `data-deletion`, `support`, and `get` (the download landing page). The old `/methodology` URLs redirect to the FAQ.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command                  | Description                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Start development server                                                                                                                                                  |
| `npm run build`          | Static export to `out/`                                                                                                                                                   |
| `npm run lint`           | Run ESLint                                                                                                                                                                |
| `npm run lint:fix`       | Fix ESLint errors                                                                                                                                                         |
| `npm run format`         | Format code with Prettier                                                                                                                                                 |
| `npm run format:check`   | Check code formatting                                                                                                                                                     |
| `npm run typecheck`      | Regenerate `.next/types` with `next typegen`, then run TypeScript type checking                                                                                           |
| `npm run test:orb`       | Orb asset gate: signed `.riv` and still hashes, runtime version, self-hosted wasm                                                                                         |
| `npm run test:platform`  | `/get` routing: four user agents against `functions/get.ts`, and the inline platform script                                                                               |
| `npm run legal:sync`     | Copy the privacy policy and terms from `../hachimi-ios/docs/legal/` into `content/legal/`                                                                                 |
| `npm run legal:check`    | Fail if `content/legal/` differs from `../hachimi-ios/docs/legal/` by a single byte                                                                                       |
| `npm run llms:build`     | Generate `public/llms.txt` and `public/llms-full.txt` from `lib/i18n/`, `lib/config.ts` and `content/legal/`                                                              |
| `npm run llms:check`     | Regenerate both llms files and fail if either differs from the committed copy by a single byte                                                                            |
| `npm run test:dates`     | Fail if a `pageDates` entry in `lib/config.ts` differs from the page's visible “last updated” date                                                                        |
| `npm run check:mentions` | Copy gate: no reference or competitor names in site copy (same list as hachimi-ios)                                                                                       |
| `npm run check:copy`     | Word-count caps per section (spec 005)                                                                                                                                    |
| `npm run check:canon`    | Shared lines from hachimi-ios `docs/copy-canon.md` appear word for word in `lib/i18n/` (runs the hachimi-ios gate, web part only)                                         |
| `npm run check`          | The single quality gate: format:check, lint, typecheck, test:orb, test:platform, legal:check, llms:check, test:dates, check:mentions, check:copy, check:canon, then build |

## Quality gate

`npm run check` is the one gate for this repo. Run it before pushing instead of picking individual sub-checks. There is no CI; the gate runs locally via a pre-push hook on `main`. Enable it once per machine:

```bash
git config core.hooksPath .githooks
```

## Legal pages

The privacy policy and terms are owned by the iOS repo (`hachimi-ios/docs/legal/`), which must sit next to this repo. `content/legal/` mirrors those four Markdown files byte for byte, and `lib/legal.ts` renders them at build time with `marked`; data tables stack into cards on narrow screens. To publish a new version: change it in hachimi-ios, run `npm run legal:sync`, set the matching dates in `pageDates`, run `npm run llms:build`, then `npm run check`.

## Project Structure

```
├── app/
│   ├── [locale]/          # zh / en localized routes (html lang + shell here)
│   │   ├── layout.tsx     # Locale layout: <html lang>, fonts, providers, inline platform script
│   │   ├── page.tsx       # Home page (seven sections)
│   │   ├── get/           # Download landing page: badges, desktop-only QR, WeChat hint
│   │   └── ...            # privacy, terms, data-deletion, support
│   ├── globals.css        # Design tokens, base styles, legal prose and stacked tables
│   ├── layout.tsx         # Pass-through root layout (returns children)
│   ├── page.tsx           # Root "/" client redirect to /en
│   ├── opengraph-image.tsx # Build-time generated OG card (next/og)
│   ├── twitter-image.tsx  # Twitter card (reuses OG design)
│   └── sitemap.ts         # Sitemap, dates from pageDates
├── components/            # Sections, legal page bodies, store badges, Orb, shaders
├── content/legal/         # Byte-for-byte mirror of hachimi-ios docs/legal/ (do not edit here)
├── functions/
│   └── get.ts             # Cloudflare Pages Function: /get routes by platform
├── lib/
│   ├── config.ts          # Site config, store links, pageDates (single source of truth)
│   ├── platform.ts        # User-agent rules shared by the Function and the inline script
│   ├── legal.ts           # Build-time Markdown rendering for privacy and terms
│   ├── i18n/              # zh / en translations
│   ├── metadata.ts        # SEO metadata (built from config.ts)
│   └── orb/               # Orb contract names, placement table and the Rive host
├── scripts/               # Quality gates, legal sync, screenshot builder
└── public/
    ├── _redirects         # Edge redirects: apex, bare legal paths, old account page
    ├── badges/            # Official store badges (self-hosted, per locale)
    ├── brand/             # Signed hachimi-orb.riv, its still, source manifest, icons
    ├── rive/              # Runtime wasm, copied from node_modules at build time (ignored)
    ├── screenshots/zh/    # The five app shots (scripts/build-shots.mjs)
    ├── robots.txt         # Static robots.txt (Content-Signal, sitemap)
    ├── llms.txt           # Generated by scripts/build-llms.mjs (+ llms-full.txt); do not edit
    └── site.webmanifest   # PWA manifest
```

## Customization

### 1. Update Site Configuration

Edit `lib/config.ts` to update:

- Site name, tagline, and description
- Store listing URLs (`appStore` / `googlePlay`) and per-page content dates
- Feature flags

Navigation labels and section copy live in `lib/i18n/`.

Site name, description, keywords, authors and social handles all live in
`lib/config.ts` (single source of truth). `lib/metadata.ts` only shapes them
into the Next.js `Metadata` object; the Open Graph / Twitter card images are
generated at build time by `app/opengraph-image.tsx` (no static file to
maintain).

### 2. Feature Flags

Toggle features in `lib/config.ts`:

```typescript
export const features = {
  smoothScroll: true, // Lenis smooth scrolling
};
```

### 3. Replace Icons

Replace the following files with your brand assets:

- `app/favicon.ico` / `app/icon.png` - Favicon (48x48 / 32x32)
- `app/apple-icon.png` - Apple touch icon
- The Open Graph / Twitter card (1200x630) is generated by
  `app/opengraph-image.tsx` — edit that route, no static image needed

### 4. Customize Design Tokens

Edit `app/globals.css` to modify:

- Color palette (--accent for brand color)
- Background and foreground colors
- Border and muted colors

## Design System

### Colors

- `--background` / `--foreground` - Page background and text
- `--muted` / `--muted-foreground` - Subtle backgrounds and text
- `--accent` - Primary brand color (amber `#d97706`)
- `--border` / `--ring` - Borders and focus rings

### Typography

- Sans / mono: Geist Sans & Geist Mono (self-hosted `geist` package, loaded in `app/[locale]/layout.tsx` — woff2 bundled locally, zero build-time network fetch)
- Serif headings (`font-serif`): system serif stack defined in `app/globals.css`
  — Georgia/Cambria for Latin plus explicit CJK serif fallbacks ("Songti SC",
  "Source Han Serif SC", "Noto Serif CJK SC"). No web font is loaded.

## Accessibility

The template includes:

- Skip-to-content link
- Visible focus rings (keyboard navigation)
- ARIA labels on interactive elements
- Reduced motion support
- Proper heading hierarchy
- WCAG 2.1 AA contrast compliance

## Performance

- Optimized images with Next.js Image component
- Smooth scroll respects reduced-motion preferences
- Code splitting via dynamic imports
- Edge-compatible runtime

## License

This template is licensed for use in commercial projects. You may not resell or redistribute the template itself.

---

Built with ❤️ using Next.js, Tailwind CSS, and Motion

## Orb on Rive

The hero and footer play the same signed Rive file as the iOS app (`public/brand/hachimi-orb.riv`, from the `hachimi-orb` repo) through `@rive-app/webgl2`, with the wasm self-hosted under `/rive/`. The host only writes the contract inputs, reads the outputs and plays; every motion lives in the file. See [brand assets](design/brand/README.md) and [spec 003](specs/003-orb-on-rive/spec.md). `npm run check` includes the asset gate (`scripts/orb-asset.test.mjs`): file and still hashes, contract and runtime versions, wasm bytes, no CDN.

All five iPhone screenshots use the licensed React Bits Pro Device component through AppShot. Registry setup, responsive adaptations and update steps are documented in [brand generation](design/brand/README.md#react-bits-pro-device).
