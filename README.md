# Hachimi.ai · 哈基米道长 marketing site

The bilingual (zh / en) one-page site for **Hachimi.ai (哈基米道长)**, a charting app for fate readers and enthusiasts: Zi Wei, Ba Zi and Mei Hua Yi Shu for many people, with each person's casts tracked under their name. Next.js App Router, statically exported (`output: "export"`) and served by **Cloudflare Pages** (project `hachimi-app-website`, domain `hachimi.ai`); the deploy runbook is [`deploy/cloudflare-pages.md`](deploy/cloudflare-pages.md).

The home page has seven sections: hero, who it's for (`#what`), a case walkthrough (`#case`), four tools (`#tools`), the academy marquee (`#academy`), FAQ (`#faq`) and the download close (`#download`). Specs: [`005`](specs/005-site-v4-tools/spec.md) for the sections, [`006`](specs/006-one-page/spec.md) for the one-page layout and audience, [`007`](specs/007-copy-system/spec.md) for the copy. The copy sources are hachimi-ios `docs/product-thesis.md`, `docs/copy-principles.md` and `docs/copy-canon.md`. The other pages under `app/[locale]/` are the ones the apps and store listings link to: `privacy`, `terms`, `data-deletion`, `support` and `get`.

## Getting started

hachimi-ios must sit next to this repo: the legal mirror, the copy gates and the icon masters read from it.

```bash
npm install
npm run dev      # then open http://localhost:3000/zh or /en
```

## Scripts

| Command                  | Description                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Development server                                                                                                                      |
| `npm run build`          | Static export to `out/`                                                                                                                 |
| `npm run lint`           | ESLint, zero warnings allowed                                                                                                           |
| `npm run format`         | Format with Prettier (`format:check` only checks)                                                                                       |
| `npm run typecheck`      | Regenerate route types with `next typegen`, then run TypeScript                                                                         |
| `npm run test:orb`       | Orb asset gate: `.riv` and still hashes, contract numbers against hachimi-orb `current-release.json`, runtime version, self-hosted wasm |
| `npm run test:platform`  | `/` and `/get` routing against `functions/`, and the inline platform script                                                             |
| `npm run legal:sync`     | Copy the privacy policy and terms from `../hachimi-ios/docs/legal/` into `content/legal/`, then regenerate the llms files               |
| `npm run legal:check`    | Fail if `content/legal/` differs from `../hachimi-ios/docs/legal/` by a single byte                                                     |
| `npm run llms:build`     | Generate `public/llms.txt` and `public/llms-full.txt` from `lib/i18n/`, `lib/config.ts` and `content/legal/`                            |
| `npm run llms:check`     | Regenerate both llms files and fail if either differs from the committed copy                                                           |
| `npm run test:dates`     | Fail if the zh and en copies of a legal document carry different “last updated” dates                                                   |
| `npm run check:mentions` | No reference or competitor names in site copy; the word list is read from hachimi-ios `scripts/no-reference-mentions.py`                |
| `npm run check:copy`     | Word-count caps per section                                                                                                             |
| `npm run og:font`        | Fetch the share-card font subset for the current headlines into `assets/og/` (`og:check` verifies it offline)                           |
| `npm run check:canon`    | Shared lines from hachimi-ios `docs/copy-canon.md` appear word for word in `lib/i18n/`                                                  |
| `npm run test:site`      | After a build: the 404 document, FAQ answers and tool details in static HTML, PNG share cards, theme colour                             |
| `npm run check`          | The single quality gate: every check above, then build, then `test:site`                                                                |

## Quality gate

`npm run check` is the one gate for this repo. Run it before pushing instead of picking individual checks. It runs locally through a pre-push hook on `main`; enable the hook once per machine:

```bash
git config core.hooksPath .githooks
```

## Legal pages

The privacy policy and terms are owned by hachimi-ios (`docs/legal/`). `content/legal/` mirrors those four Markdown files byte for byte, and `lib/legal.ts` renders them at build time with `marked`; the page dates, the sitemap and the structured data read the “last updated” line from the Markdown. To publish a new version, change it in hachimi-ios, run `npm run legal:sync`, then `npm run check`.

## Orb

The hero and the close play the same signed Rive file as the apps (`public/brand/hachimi-orb.riv`, from the hachimi-orb repo) through `@rive-app/webgl2`, with the wasm self-hosted under `/rive/`. The host only writes the contract inputs, reads the outputs and plays; every motion lives in the file. See [brand assets](design/brand/README.md) and [spec 003](specs/003-orb-on-rive/spec.md).

## Icons

`design/brand/gen-web-icons.py` renders the favicon, app icons, manifest icons and the share-card logo from the masters; see [brand assets](design/brand/README.md).

## Project structure

```
├── app/
│   ├── [locale]/              # zh / en routes: <html lang>, fonts, providers, inline platform script
│   │   ├── page.tsx           # Home page (seven sections)
│   │   ├── opengraph-image.tsx # Share card per language, rendered at build time
│   │   ├── get/               # Download landing page: badges, desktop-only QR, WeChat hint
│   │   └── ...                # privacy, terms, data-deletion, support
│   ├── global-not-found.tsx   # The 404 document
│   ├── manifest.ts            # Web app manifest from lib/config.ts
│   ├── sitemap.ts
│   └── globals.css            # Colour tokens, base styles, legal prose, dialogs
├── assets/og/                 # Share-card font subset (Noto Serif SC, OFL)
├── components/                # Sections, legal page bodies, store badges, Orb, shaders
├── content/legal/             # Byte-for-byte mirror of hachimi-ios docs/legal/
├── functions/
│   ├── index.ts               # Pages Function: / by Accept-Language
│   └── get.ts                 # Pages Function: /get by platform
├── lib/
│   ├── config.ts              # Site facts, store links, page dates
│   ├── locale.ts              # The locale table: html lang, og locale, switch label
│   ├── platform.ts            # User-agent and language rules shared by the Functions and the inline script
│   ├── i18n/                  # zh / en copy
│   ├── metadata.ts            # Page metadata built from config.ts and i18n
│   └── orb/                   # Orb contract, placement table and the Rive host
├── scripts/                   # Gates, legal sync, llms and screenshot builders
└── public/
    ├── _headers               # Cache and security headers for static assets
    ├── _redirects             # Bare legal paths
    ├── badges/                # Official store badges, per locale
    ├── brand/                 # Signed hachimi-orb.riv, its stills, source manifest, logo
    ├── rive/                  # Runtime wasm, copied from node_modules at build time (ignored)
    ├── screenshots/zh/        # The five app shots (scripts/build-shots.mjs)
    ├── robots.txt
    └── llms.txt               # Generated with llms-full.txt by scripts/build-llms.mjs
```

## License

[LICENSE](LICENSE) is the React Bits Pro commercial license that the site's starter code and the Device component come under.
