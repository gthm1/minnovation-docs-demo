# Minnovation Docs Demo — GitHub + Docusaurus + CMS

A working proof-of-concept for separating public, client-facing docs from
internal-only docs, using **one tagged content source** and **two builds**.

Every page in `content/docs/` has a `visibility: public` or
`visibility: internal` frontmatter field. A build-time script
(`scripts/prepare-build.mjs`) filters that source into `docs/` (the folder
Docusaurus actually reads) based on a `SITE_AUDIENCE` environment variable:

- `SITE_AUDIENCE=public` → only `visibility: public` pages
- `SITE_AUDIENCE=internal` (default) → every page

Two Netlify sites, built from this same repo with different `SITE_AUDIENCE`
values, end up with different docs — same source, same hierarchy, no content
duplicated or manually kept in sync. See `SETUP_PERSONAL_ACCOUNT.md` for the
full deployment walkthrough (two Netlify sites, plus optional GitHub
Pages/Cloudflare Workers copies that show the unfiltered superset).

## Quick start

```bash
npm install
npm run demo
```

`npm run demo` starts two things at once:

- Docusaurus dev server at **http://localhost:3000/minnovation-docs-demo/**
  (shows everything — local dev defaults to the internal/superset view)
- The Decap CMS local proxy at **http://localhost:8081**, which lets the CMS
  admin UI write directly to the Markdown files in this repo

Open the CMS at **http://localhost:3000/minnovation-docs-demo/admin/** to
edit content through a form-based UI — including a **Visibility** dropdown
per page that decides which build(s) it appears in.

## What's in here

- `content/docs/` — the real, tracked documentation source, one page per file,
  each tagged `visibility: public` or `visibility: internal`
- `scripts/prepare-build.mjs` — filters `content/docs/` into `docs/` based on
  `SITE_AUDIENCE`, and generates/removes a Netlify `_headers` file that
  Basic-Auth-protects the whole site when building for `internal`
- `docs/` — **generated, gitignored.** Don't edit directly; edit
  `content/docs/` instead
- `static/admin/` — Decap CMS configuration and entry page
- `docusaurus.config.js` — site config, including local search and
  audience-aware title/banner text

## Building for each audience locally

```bash
npm run build                    # internal (superset) — same as no SITE_AUDIENCE set
SITE_AUDIENCE=public npm run build   # public only
```

## Deploying for real

See `SETUP_PERSONAL_ACCOUNT.md` for the full two-Netlify-site walkthrough,
including the environment variables each site needs
(`SITE_AUDIENCE`, `DOCS_BASE_URL`) and the Basic Auth caveat for the internal
site (real SSO requires a Netlify Enterprise plan).
