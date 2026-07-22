# Minnovation Docs Demo — GitHub + Docusaurus + CMS (Option D)

A working proof-of-concept for **Option D** in the internal documentation research
report: developer-first tooling (Docusaurus, hosted from a GitHub repo) as a way to
separate public, client-facing docs from internal-only docs.

This is a real, runnable Docusaurus site — not mockups. See `DEMO_WALKTHROUGH.md`
for the manager-meeting talking points and the access-control caveat.

## Quick start

```bash
npm install
npm run demo
```

`npm run demo` starts two things at once:

- Docusaurus dev server at **http://localhost:3000/minnovation-docs-demo/**
- The Decap CMS local proxy at **http://localhost:8081**, which lets the CMS
  admin UI write directly to the Markdown files in this repo

Then open the CMS at **http://localhost:3000/minnovation-docs-demo/admin/** to
edit content through a form-based UI instead of raw Markdown.

## What's in here

- `docs/` — public, client-facing documentation (its own Docusaurus content
  instance, served at `/docs/`)
- `internal-docs/` — internal-only documentation (a **separate** content
  instance, served at `/internal-docs/`)
- `static/admin/` — the Decap CMS configuration (`config.yml`) and entry page
- `docusaurus.config.js` — site config, including the two separate docs
  instances and navbar

## Deploying for real

```bash
npm run build     # builds the static site into /build
npm run deploy     # publishes to GitHub Pages (requires GitHub remote configured)
```

Before deploying, update the placeholder `organizationName`, `projectName`, and
`url` fields in `docusaurus.config.js` to match the real GitHub org/repo, and
see `DEMO_WALKTHROUGH.md` for what's needed to make the CMS work with a real
GitHub-hosted repo (an OAuth app, or Netlify Identity).
