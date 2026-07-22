# Demo Walkthrough — GitHub + Docusaurus + CMS (Option D)

This is the companion guide for showing this demo in the manager meeting. It covers
what was actually built, how quick it was to set up, and — most importantly — what
this approach does **not** solve out of the box.

> **How to demo it live:** run `npm install` then `npm run demo`, open
> `http://localhost:3000/minnovation-docs-demo/`, then open `/admin/` to show the
> CMS editing a page live. That live interaction is a stronger demo than screenshots,
> so this guide is deliberately screenshot-free — walk through the running site instead.

---

## 1. What was built

A real, working Docusaurus site with:

| Piece | What it shows |
|---|---|
| `/docs/` | Public docs — a stand-in for the AlphaX manual, Conduit API reference, and XVision install guide currently in GitBook/HubSpot |
| `/internal-docs/` | Internal-only docs — architecture notes and a deployment runbook, in a **separate** content instance with its own sidebar and URL path |
| `/admin/` | Decap CMS — a free, open-source, git-based CMS so non-developers can edit pages through a form instead of writing Markdown or using git directly |

All content lives as Markdown files in a git repo. There's no database and no
backend server to run — the whole site is static files.

## 2. How quick this was to set up

| Step | Time |
|---|---|
| Scaffold a new Docusaurus site (`create-docusaurus`) | ~2 min |
| Add a second "internal" content instance | ~10 min |
| Write placeholder public + internal content | ~15 min |
| Wire up Decap CMS (admin UI + config) | ~15 min |
| Confirm the production build works | ~2 min |

Roughly **45 minutes** end-to-end for someone already comfortable with
Docusaurus, most of it spent on content and config rather than plumbing. That's the
main pitch for Option D: it's fast to stand up and the whole result is disposable —
if it doesn't work out, it's just files in a repo, nothing to unwind.

## 3. The important caveat: this does not gate access on its own

This is the same principle that came up testing GitBook and Confluence: **access
control is a site/hosting-level decision, not a per-page checkbox.** Docusaurus and
GitHub Pages don't change that — if anything, they start from a more basic place,
because a plain GitHub Pages site has **no built-in access control at all.**

In this demo, `/internal-docs/` is visually separate but sits on the same public
site as `/docs/`. Anyone with the URL can see both. The demo banner at the top of
the site says this explicitly so it's never mistaken for "done."

### Making it actually private — the real options

| Approach | How it works | Cost |
|---|---|---|
| **Two repos** | Public repo → GitHub Pages (free, public). Internal repo → kept private, deployed via a host that supports password/SSO protection (e.g. Cloudflare Access in front of a custom domain, or a hosting provider's built-in deployment protection). | Free hosting for the public side; the private side usually needs a paid protection feature. |
| **GitHub Enterprise private Pages** | If Minnovation is on GitHub Enterprise Cloud, a private repo's Pages site can be restricted to org members only, no extra infrastructure needed. | Depends on existing GitHub plan — worth checking before ruling this in or out. |
| **Skip the website for internal docs** | Keep internal notes as a private repo's README/wiki instead of a deployed site. Plainer UI, but genuinely private with zero extra setup. Mirrors the earlier GitHub finding that wikis need a paid plan on private repos, so README-based docs are the free fallback. | Free. |

None of these are configured in this demo — they're infrastructure decisions that
depend on Minnovation's existing GitHub plan and hosting budget, which is worth a
quick confirmation before committing to this option.

## 4. The CMS layer (Decap CMS)

Decap CMS is a separate concern from hosting/access control — it's just the editing
experience. It renders a form UI (defined in `static/admin/config.yml`) and commits
the resulting Markdown straight to git.

- **In this demo:** it runs against a local proxy (`npm run cms`), so edits write to
  files on disk with no external accounts needed — good for a live demo, not for
  production.
- **In a real deployment:** it needs either a small GitHub OAuth app (free, ~5 minutes
  to set up) or a Netlify account using Netlify Identity + Git Gateway (also free at
  this scale). Either lets writers log in and edit without touching git.

## 5. How this compares to the other three options

Full detail is in the main report; the short version for the room:

- **Option A (GitBook)** — least migration effort, but Visitor Authentication (the
  feature that would gate internal content) is a paid-tier feature.
- **Option B (Confluence/SharePoint/Google Sites)** — strong access control if
  Minnovation already pays for one of these; access is blocked at the site level
  before space permissions even apply.
- **Option C (Notion)** — flexible and stack-agnostic, page-level sharing controls
  are more granular than GitBook's.
- **Option D (this demo)** — fastest and cheapest to stand up, developer-friendly,
  but access control is entirely bring-your-own — nothing is gated by default.

## 6. Suggested talking points for the meeting

1. Show the live site running locally — public docs, internal docs, and the CMS
   editing a page in real time.
2. Point out the demo banner and explain the access-control caveat up front, before
   anyone assumes `/internal-docs/` is actually private.
3. Ask whether Minnovation's existing GitHub plan supports private Pages — that
   single fact changes which of the three "making it private" options is cheapest.
4. Frame Option D as the right fit **if** engineering wants to own docs like code
   (PRs, review, versioning) — and a weaker fit if the goal is handing editing over
   to non-technical staff without any GitHub/OAuth setup at all.
