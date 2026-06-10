# OmniScout Docs

Documentation site for [OmniScout](https://omniscout.xyz), built with [Docus](https://docus.dev) (Nuxt + Nuxt Content).

## Languages

English is the source language (`content/en/`). Nine additional locales are configured via [General Translation](https://generaltranslation.com) (free API):

| Code | Language |
|------|----------|
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `ja` | Japanese |
| `ko` | Korean |
| `zh-CN` | Chinese (Simplified) |
| `pt-BR` | Portuguese (Brazil) |
| `ru` | Russian |
| `hi` | Hindi |

### Generate translations

1. Create a free project at [generaltranslation.com/dashboard](https://generaltranslation.com/dashboard).
2. Copy `.env.example` to `.env` and set `GT_API_KEY` and `GT_PROJECT_ID`.
3. Run:

```bash
npm run translate
```

This calls `gt translate`, which writes translated Markdown and navigation YAML into `content/{locale}/`. The language switcher in the header appears once those folders exist.

`npm run build` runs translation automatically when the env vars are set (e.g. on Vercel). Without credentials, the build serves English only.

## Develop

```bash
npm install
npm run dev
```

English docs are at `http://localhost:3000/en/`. Other locales use the same path prefix (`/es/cli/overview`, etc.) after translation.

## Build

```bash
npm run build
```

## Deploy

Hosted on Vercel at [docs.omniscout.xyz](https://docs.omniscout.xyz). The project uses the **Nuxt** framework preset (`vercel.json`).

Add `GT_API_KEY` and `GT_PROJECT_ID` in Vercel project settings to translate content on each production build.
