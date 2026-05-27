# Rirekisho — Japanese Resume Builder

A web app that generates **authentic JIS-style 履歴書 (rirekisho)** for foreigners applying to jobs in Japan.

- Fill the form in **English, Nepali, or Japanese**.
- One click translates everything to natural business Japanese (Anthropic Claude).
- Download a 2-page A4 **PDF** that matches the layout Japanese employers expect.
- No login, no tracking — all data lives in your browser.

## Stack

| Layer            | Choice                                            |
| ---------------- | ------------------------------------------------- |
| Framework        | Next.js 15 (App Router) + React 19 + TypeScript   |
| UI               | Tailwind CSS · shadcn/ui patterns · Framer Motion |
| Forms            | React Hook Form-friendly (controlled inputs)      |
| Translation      | Google Translate free endpoint (no API key)       |
| PDF              | Puppeteer (headless Chromium) prints `/preview`   |
| LaTeX export     | XeLaTeX `.tex` source (xeCJK + Noto Sans JP)      |

## Run locally

```bash
npm install
npm run dev
```

No environment variables needed — translation uses Google Translate's free
public endpoint. If you want higher-quality, context-aware business Japanese
later (e.g. Claude, GPT-4o, DeepL), swap the implementation in
[`src/app/api/translate/route.ts`](src/app/api/translate/route.ts).

Open http://localhost:3000.

## Architecture

```
src/
├── app/
│   ├── page.tsx                Landing page
│   ├── editor/page.tsx         /editor route
│   ├── preview/                Print-ready single-page route used by Puppeteer
│   ├── api/translate/route.ts  POST resume → JA-translated resume (Claude)
│   ├── api/pdf/route.ts        POST resume → application/pdf
│   └── api/tex/route.ts        POST resume → XeLaTeX .tex source
├── components/
│   ├── rirekisho/              The faithful HTML/CSS recreation of the JIS template
│   │   ├── RirekishoSheet.tsx  Component (driven by Resume schema)
│   │   ├── sheet.css           On-screen + print layout (mm-based)
│   │   └── print.css           @page A4 + margin overrides for Puppeteer
│   ├── editor/                 3-pane editor: nav + form + live preview
│   ├── landing/                Hero, feature grid, preview mock
│   └── ui/                     shadcn primitives (Button, Input, Select, ...)
└── lib/
    ├── schema.ts               Zod schema = the resume data model
    ├── storage.ts              localStorage autosave hook
    ├── tex.ts                  Renders a Resume to a XeLaTeX document
    ├── translate-client.ts     Browser → /api/translate
    └── utils.ts                Date / postal / class helpers
```

## How the PDF is rendered

1. Editor calls `POST /api/pdf` with the resume JSON.
2. The route base64-encodes the JSON and opens `/preview?data=<…>` in headless Chromium.
3. `PrintPreviewClient` decodes the payload, mounts `<RirekishoSheet>` at real size (210mm),
   and sets `window.__rirekishoReady = true` once Noto Sans JP has loaded.
4. Puppeteer waits for that flag, then calls `page.pdf({ format: "A4" })` with zero margin
   (the sheet supplies its own A4 page boxes).

The browser instance is kept warm across requests via a module-level global.

## XeLaTeX export

`POST /api/tex` returns a `.tex` file you can compile yourself:

```bash
xelatex rirekisho.tex
```

Requires a TeX Live install with `xeCJK`, `fontspec`, `tabularx`, plus a Noto Sans JP
system install. If you use a different CJK font, swap the `\setCJKmainfont` line at
the top of the generated file.

## Customising the template

The on-screen preview and the printed PDF render the **same** React component
(`<RirekishoSheet>`), so any edit to that component or `sheet.css` updates both
simultaneously. The template uses millimetre units throughout so layout stays
identical regardless of device pixel ratio.

## What's intentionally not included

- **No resume upload / parsing.** The first pass focuses on a faithful form →
  preview → PDF loop. Add a file-upload + LLM-extract step in a phase 2.
- **No accounts.** Everything autosaves to `localStorage` under the key
  `rirekisho-data-v1`. Use the JSON export to back up.
