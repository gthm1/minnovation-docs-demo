# Setting This Up As a Personal Demo

The demo now works like this:

- **One tagged content source** (`content/docs/`) — every page has a
  `visibility: public` or `visibility: internal` field
- **Two Netlify sites**, built from the same GitHub repo, each running a
  build-time filter script that includes only the pages allowed for that site:
  - **Public site** — only `visibility: public` pages
  - **Internal site** — every page (public + internal), and requires a login
- **Same hierarchy on both** — the public site's sidebar is just a filtered
  subset of the internal site's, not a separately maintained structure
- **Decap CMS** — editing a page includes a Visibility dropdown, so tagging
  happens right where content gets written
- **Built-in search** on both sites, which can only ever surface pages that
  are actually in that build (so public search can't leak internal pages)

GitHub Pages and Cloudflare Workers, from the earlier version of this demo,
still work — they now build the **unfiltered internal superset** by default
(nothing is gated), left running as a "here's what zero access control looks
like" reference point. The two-Netlify-site setup below is the real demo.

Total cost: **$0**.

---

## 1. Push the project to your GitHub account

Unzip the project, then from inside the folder:

```bash
cd minnovation-docs-demo
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/minnovation-docs-demo.git
```

Create the repo first at **github.com/new** — name it `minnovation-docs-demo`,
keep it **Public**, and don't initialize it with a README (this project
already has one).

Update the placeholder org/repo name in the config to match your account.

**On Windows (PowerShell):**
```powershell
(Get-Content docusaurus.config.js) -replace 'minnovation-technologies', '<YOUR_GITHUB_USERNAME>' | Set-Content docusaurus.config.js
```

**On macOS:**
```bash
sed -i '' -e "s/minnovation-technologies/<YOUR_GITHUB_USERNAME>/g" docusaurus.config.js
```

**On Linux:**
```bash
sed -i -e "s/minnovation-technologies/<YOUR_GITHUB_USERNAME>/g" docusaurus.config.js
```

Or open `docusaurus.config.js` in an editor and find-and-replace every
occurrence of `minnovation-technologies` with your GitHub username by hand.

Commit and push:

```bash
git add -A
git commit -m "Point config at my GitHub account"
git branch -M main
git push -u origin main
```

## 2. (Optional/reference) Turn on GitHub Pages

Shows the unfiltered internal superset — no login, everything visible. Useful
as a "here's what happens with no access control" comparison point, not the
main demo.

1. Repo → **Settings → Pages → Build and deployment → Source** → **GitHub Actions**
2. **Actions** tab → wait for the included workflow to go green
3. Live at `https://<YOUR_GITHUB_USERNAME>.github.io/minnovation-docs-demo/`

## 3. (Optional/reference) Turn on Cloudflare Workers

Same unfiltered superset, on a second platform. Also optional now that the
Netlify setup below does the actual public/private split properly.

1. **dash.cloudflare.com** → **Compute (Workers) → Workers & Pages → Create application**
2. **Connect GitHub**, pick `minnovation-docs-demo`
3. Build command `npm run build`, deploy command default `npx wrangler deploy`
   (the repo's `wrangler.jsonc` handles the rest)
4. After first deploy, go to **Settings → Variables and Secrets** and add
   `DOCS_BASE_URL` = `/` (GitHub Pages needs a subpath baseUrl; Cloudflare
   needs root), then retry the deploy

## 4. The real demo: two Netlify sites

This is the actual public-vs-private, tagged-content demo.

### 4a. Deploy the public site

1. Sign up free at **app.netlify.com** (or log in with GitHub)
2. **Add new site → Import an existing project → Deploy with GitHub**, pick
   `minnovation-docs-demo`
3. Build settings: build command `npm run build`, publish directory `build`
4. Before the first deploy (or right after, then redeploy), go to
   **Site configuration → Environment variables** and add:
   - `SITE_AUDIENCE` = `public`
   - `DOCS_BASE_URL` = `/`
5. Deploy. Rename the site something recognizable — **Site configuration →
   General → Site details → Change site name** — e.g. `minnovation-docs-public`
6. Visit `https://minnovation-docs-public.netlify.app/docs/` — only the
   AlphaX/Conduit/XVision pages appear. No Architecture or Deployment section
   in the sidebar, because there's nothing public in it to show.

### 4b. Deploy the internal site

Repeat, connecting the **same repo** as a **second, separate** Netlify site:

1. **Add new site → Import an existing project → Deploy with GitHub** again,
   same repo
2. Same build settings (`npm run build`, publish directory `build`)
3. Environment variables this time:
   - `SITE_AUDIENCE` = `internal`
   - `DOCS_BASE_URL` = `/`
4. Deploy, rename it e.g. `minnovation-docs-internal`

Because `SITE_AUDIENCE=internal`, the build script also writes a `_headers`
file that Basic-Auth-protects the **entire site** (not just one path — since
it's now a fully separate deployment, whole-site protection is exactly what
you want, and it's free). Demo credentials are `demo` / `letmein`, set in
`scripts/prepare-build.mjs` — change them before showing this to anyone, and
remember the repo is public so anyone can read whatever you put there from
source.

Visit `https://minnovation-docs-internal.netlify.app/docs/` — you'll get a
browser username/password prompt first. After logging in: all six pages,
including Architecture and Deployment, with the same sidebar structure as the
public site plus the extra two entries.

**One honest caveat, unchanged from before:** this is Basic Auth, not SSO.
Real SAML SSO on Netlify is an **Enterprise-plan feature**, requiring
Organization/Team SSO to already be configured — not available on a personal
account. If this ever moves to a company Netlify Enterprise account, the
`_headers` Basic Auth step gets replaced by Project configuration → Visitor
access → Password Protection → SSO, applied to the internal site specifically
(keeping the public site as its own separate, unprotected deployment, same
two-site pattern used here).

## 5. Demo the hierarchy

Open `/docs/` on both sites side by side. Same sidebar categories, same page
titles, same ordering — the public one is just missing the two
internal-only entries. That's the "one source, filtered differently" story in
one screenshot.

## 6. Demo tagging content through the CMS

Run locally against your own clone:

```bash
npm install
npm run demo
```

This starts Docusaurus (`localhost:3000`, showing the internal/superset view
by default) and the Decap CMS local proxy together. Then:

1. Open `http://localhost:3000/minnovation-docs-demo/admin/`
2. Open **Docs**, pick any page — note the **Visibility** dropdown (Public /
   Internal only)
3. Create a **new page**: click **New Docs**, fill in a title and body, set
   Visibility to whichever you want to demo, save
4. Show the resulting file on disk, e.g.:
   ```bash
   cat content/docs/<wherever-you-put-it>.md
   ```
   Note the `visibility:` field in the frontmatter — that's the entire tagging
   mechanism.
5. Commit and push:
   ```bash
   git add -A
   git commit -m "Add a page via the CMS"
   git push
   ```
   Both Netlify sites rebuild automatically. If you tagged the new page
   Public, it'll show up on both. If Internal only, only the internal site
   will have it — refresh both live URLs after the rebuilds finish (~1–2 min)
   to show the difference live.

## 7. Demo search

Type into the search box (top right of either site) for a term that only
exists on an internal-only page (e.g. "runbook" or "escalation"). On the
public site, it returns nothing — not because search is filtered afterward,
but because that page was never part of the public build's search index in
the first place.

---

## Quick demo script

1. Open the public Netlify URL — browse `/docs/`, point out the sidebar:
   Getting Started, API Reference, Installation. No Architecture, no
   Deployment.
2. Open the internal Netlify URL — hit the Basic Auth prompt, log in, and show
   the same sidebar now includes Architecture and Deployment too.
3. Point out identical structure/ordering on the shared entries — one source,
   two filtered views.
4. Search for something internal-only on both — works on internal, empty on
   public.
5. Switch to your terminal: `npm run demo`, open `/admin/`, create or edit a
   page, set its Visibility, save, show the frontmatter field on disk, push,
   and refresh both live sites once they rebuild.
6. (Optional) Mention the GitHub Pages / Cloudflare copies as the "here's what
   zero access control looks like" baseline, if useful context for the room.
