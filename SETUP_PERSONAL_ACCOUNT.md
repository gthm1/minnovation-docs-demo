# Setting This Up As a Personal Demo

This walks through getting all four demo pieces live under your own accounts:

1. **Public site** — GitHub Pages (free)
2. **Private site** — the same content, but with a real login wall on `/internal-docs/`, via Cloudflare Workers + Cloudflare Access (free)
3. **Hierarchy** — visible in both, since it's the same nav/sidebar structure
4. **Adding content through the CMS** — Decap CMS, running locally against your repo
5. *(Optional)* **Netlify** as a second hosting platform, with a free path-scoped login gate on `/internal-docs/` — see step 3c for why real SSO specifically needs an Enterprise plan there

Total cost: **$0**. You only need a GitHub account (you have one) and a free Cloudflare account (no credit card required). Netlify is optional and also free at this scope.

---

## 1. Push the project to your GitHub account

Unzip the project, then from inside the folder:

```bash
cd minnovation-docs-demo
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/minnovation-docs-demo.git
```

Create the repo first at **github.com/new** — name it `minnovation-docs-demo`, keep it
**Public** (GitHub Pages on a free personal account only serves from public repos —
note that means the published site itself is public web either way), and don't
initialize it with a README (this project already has one).

Then update the placeholder org/repo name in the config to match your account.

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

Or simplest on any OS: open `docusaurus.config.js` in an editor and use
find-and-replace to swap every occurrence of `minnovation-technologies` (there
are six — in the `url`, `organizationName`, two `editUrl` fields, and two GitHub
navbar/footer links) with your GitHub username.

Commit and push:

```bash
git add -A
git commit -m "Point config at my GitHub account"
git branch -M main
git push -u origin main
```

## 2. Turn on the public site (GitHub Pages)

The repo already includes `.github/workflows/deploy.yml`, which builds and deploys
automatically on every push to `main`. You just need to point Pages at it:

1. On GitHub, go to your repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Go to the **Actions** tab — you should see the workflow running from your last
   push. Wait for it to go green (~1–2 minutes).
4. Your public site is now live at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/minnovation-docs-demo/`

This is the "public site" — anyone with the link can see both `/docs/` and
`/internal-docs/`, which is exactly the caveat from the walkthrough guide: GitHub
Pages has no built-in access control, so nothing here is actually gated yet.

## 3. Turn on the private site (Cloudflare Workers + Access)

Cloudflare has folded Pages into its unified Workers product, so the dashboard
flow looks a little different than older guides describe — you'll deploy this as
a Worker with static assets rather than a "Pages project," but the result is the
same: a second copy of the site, then a real login wall in front of just
`/internal-docs/*`.

### 3a. Deploy to Cloudflare Workers

1. Sign up free at **dash.cloudflare.com**.
2. In the left sidebar, go to **Compute (Workers) → Workers & Pages**, then click
   **Create application** top right.
3. On the "Create a Worker" screen, click **Connect GitHub**.
4. Authorize Cloudflare's GitHub App and select the `minnovation-docs-demo` repo.
5. Cloudflare should auto-detect Docusaurus and pre-fill sensible settings. If it
   asks you to confirm or fill them in manually:
   - **Build command:** `npm run build`
   - **Deploy command:** leave the default, `npx wrangler deploy`
   
   This repo already includes a `wrangler.jsonc` telling that deploy command to
   serve the `build/` folder as static assets, so you shouldn't need to configure
   anything else.
6. Click **Save and Deploy**. First deploy takes a couple of minutes.
7. Note the resulting URL — something like
   `https://minnovation-docs-demo.<your-subdomain>.workers.dev`.

This alone is just a second copy of the same public site. The next step is what
makes it "private."

### 3b. Gate `/internal-docs/*` with Cloudflare Access

1. Still in the Cloudflare dashboard, go to **Zero Trust** (left sidebar). First
   time here, it'll ask you to pick the **Free** plan (up to 50 users, no card
   needed) and choose a team name.
2. Go to **Access → Applications → Add an application → Self-hosted**.
3. Configure:
   - **Application domain:** your `.workers.dev` domain from step 3a
   - **Path:** `internal-docs/*`
   - (Leave the root path unset — Access only intercepts requests matching this
     specific path, so `/docs/` and the homepage stay open)
4. Add a policy: name it "Allow me," action **Allow**, rule: **Emails** →
   your own email address.
5. Save. That's it.

Now:
- `https://<your-project>.<subdomain>.workers.dev/docs/` — opens with no login,
  same as GitHub Pages
- `https://<your-project>.<subdomain>.workers.dev/internal-docs/` — shows a
  Cloudflare login screen first (one-time PIN emailed to you); only after logging
  in as an allowed user do you see the content

That's the live "public vs. private" contrast for the demo — same repo, same
build, two different hosting setups, one of them actually gated by path.

## 3c. Optional: also deploy to Netlify

One honest caveat first: **true SSO (SAML) on Netlify is an Enterprise-plan
feature** — it requires Organization/Team SSO to already be configured, which
isn't available on a free or personal-Pro account. So a personal demo can't use
real SSO on Netlify today. Here's what you get instead, from cheapest to closest
to "actual SSO":

| Option | Plan | What it looks like |
|---|---|---|
| Basic Auth via `_headers`, scoped to `/internal-docs/*` | **Free** | Browser's built-in username/password prompt, only on that path |
| Password Protection (shared password) | Pro (~$19/mo) | One shared password, but for the **whole site**, not just `/internal-docs/` |
| Team login / SSO protection | **Enterprise only** | Real login via Netlify team account or your company's SAML IdP, again whole-site |

**For a free personal demo, use the first option** — it's already set up in the
repo. There's a `static/_headers` file with:

```
/internal-docs/*
  Basic-Auth: demo:letmein
```

Docusaurus copies everything in `static/` straight into the build output, so this
ships automatically. Change the demo credentials before you deploy (and note that
since this repo is public, anyone can read whatever password you put here
straight from the source — fine for a demo, not for anything real).

To deploy:

1. Sign up free at **app.netlify.com** (or log in with GitHub).
2. **Add new site → Import an existing project → Deploy with GitHub**, authorize
   Netlify, and pick the `minnovation-docs-demo` repo.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Click **Deploy**. You'll get a URL like `https://<random-name>.netlify.app`.

Now:
- `https://<your-site>.netlify.app/docs/` — opens with no prompt
- `https://<your-site>.netlify.app/internal-docs/` — browser shows a
  username/password prompt (`demo` / `letmein` unless you changed it) before
  showing content

This is a real, working, path-scoped access gate, on the free tier — just not
SSO. It's a good second data point next to the Cloudflare Access setup: same
repo, same idea, different platform, different plan required to do it "for real."

**If this ever moves to a company Netlify account with Enterprise:** the path to
actual SSO is Project configuration → General → Visitor access → Password
Protection → set protection type to require SSO (after your org's SAML SSO is
configured under team settings). Because that protects the whole site rather than
just a path, the clean way to keep `/docs/` open in that setup is to deploy the
repo as **two separate Netlify sites** — one left public, one with SSO protection
turned on — the same pattern used for GitHub Pages + Cloudflare Workers above.

## 4. Demo the hierarchy

Both deployments show the same navbar (**Public Docs** / **Internal Docs**) and the
same sidebars within each. Walking between `/docs/getting-started/...` and
`/internal-docs/architecture/...` on either deployment shows the structure —
this part doesn't need any extra setup, it's just the site as built.

## 5. Demo adding content through the CMS

Run this locally against your own clone of the repo:

```bash
npm install
npm run demo
```

This starts Docusaurus (`localhost:3000`) and the Decap CMS local proxy
(`localhost:8081`) together. Then:

1. Open `http://localhost:3000/minnovation-docs-demo/admin/`
2. Pick a page (e.g. **Public Docs → AlphaX Cloud Overview**), edit some text,
   hit **Save** (or **Publish**, depending on the CMS UI wording).
3. Show the underlying file changed on disk, e.g.:
   ```bash
   cat docs/getting-started/alphax-overview.md
   ```
4. To make the edit actually show up on the live sites, commit and push it:
   ```bash
   git add -A
   git commit -m "Edit via CMS"
   git push
   ```
   Both GitHub Pages and Cloudflare Workers will pick up the push automatically and
   redeploy within a minute or two — refresh either live URL afterward to show the
   change went live.

This local-proxy setup needs zero extra accounts, which is what makes it fast to
demo. The tradeoff: it only works when you're running it on your own machine, not
for someone editing directly from the live site.

### Optional stretch goal: editing straight from the live site

If you want the CMS to work from the deployed site itself (not just locally), the
Decap CMS backend needs to switch from the local proxy to a real GitHub connection —
that means creating a small GitHub OAuth App (**Settings → Developer settings →
OAuth Apps**) and a lightweight OAuth proxy (a few lines, deployable as a free
Cloudflare Worker). This is a reasonable next step but not needed to demo the
concept — the local version already shows the full editing experience.

---

## Quick demo script

1. Open the GitHub Pages URL — show `/docs/` and `/internal-docs/`, point out both
   are visible with no login (the "everything is public by default" caveat).
2. Open the Cloudflare Workers URL — show `/docs/` opens fine, then click into
   `/internal-docs/` and hit the login wall. Log in with your email to show it
   through once authenticated.
3. (If you set it up) Open the Netlify URL and click into `/internal-docs/` to
   show the Basic Auth prompt — a second, simpler example of the same idea, and a
   natural segue into the SSO-is-Enterprise-only caveat.
4. Point out the identical nav/sidebar structure across all of them — same
   hierarchy, different access postures depending on platform and plan.
5. Switch to your terminal, run `npm run demo`, open `/admin/`, edit a page live,
   show the file change, push it, and refresh a live URL to show it propagate.
