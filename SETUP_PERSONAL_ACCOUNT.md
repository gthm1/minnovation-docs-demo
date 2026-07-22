# Setting This Up As a Personal Demo

This walks through getting all four demo pieces live under your own accounts:

1. **Public site** — GitHub Pages (free)
2. **Private site** — the same content, but with a real login wall on `/internal-docs/`, via Cloudflare Pages + Cloudflare Access (free)
3. **Hierarchy** — visible in both, since it's the same nav/sidebar structure
4. **Adding content through the CMS** — Decap CMS, running locally against your repo

Total cost: **$0**. You only need a GitHub account (you have one) and a free Cloudflare account (no credit card required).

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

Then update the placeholder org/repo name in the config to match your account:

```bash
sed -i '' \
  -e "s/minnovation-technologies/<YOUR_GITHUB_USERNAME>/g" \
  docusaurus.config.js
```

(Drop the `''` after `-i` if you're on Linux rather than macOS.)

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

## 3. Turn on the private site (Cloudflare Pages + Access)

This deploys the same repo a second time, then puts a real login wall in front of
just the `/internal-docs/*` path — a genuine demo of "private," not just a visually
separate section.

### 3a. Deploy to Cloudflare Pages

1. Sign up free at **dash.cloudflare.com**.
2. Go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorize Cloudflare's GitHub App and select the `minnovation-docs-demo` repo.
4. Build settings:
   - Framework preset: **Docusaurus** (or manually: build command `npm run build`,
     output directory `build`)
5. Click **Save and Deploy**. First deploy takes a couple of minutes.
6. Note the resulting URL — something like `https://minnovation-docs-demo.pages.dev`.

This alone is just a second copy of the same public site. The next step is what
makes it "private."

### 3b. Gate `/internal-docs/*` with Cloudflare Access

1. Still in the Cloudflare dashboard, go to **Zero Trust** (left sidebar). First
   time here, it'll ask you to pick the **Free** plan (up to 50 users, no card
   needed) and choose a team name.
2. Go to **Access → Applications → Add an application → Self-hosted**.
3. Configure:
   - **Application domain:** your `.pages.dev` domain from step 3a
   - **Path:** `internal-docs/*`
   - (Leave the root path unset — Access only intercepts requests matching this
     specific path, so `/docs/` and the homepage stay open)
4. Add a policy: name it "Allow me," action **Allow**, rule: **Emails** →
   your own email address.
5. Save. That's it.

Now:
- `https://<your-project>.pages.dev/docs/` — opens with no login, same as GitHub Pages
- `https://<your-project>.pages.dev/internal-docs/` — shows a Cloudflare login
  screen first (one-time PIN emailed to you); only after logging in as an allowed
  user do you see the content

That's the live "public vs. private" contrast for the demo — same repo, same
build, two different hosting setups, one of them actually gated by path.

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
   Both GitHub Pages and Cloudflare Pages will pick up the push automatically and
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
2. Open the Cloudflare Pages URL — show `/docs/` opens fine, then click into
   `/internal-docs/` and hit the login wall. Log in with your email to show it
   through once authenticated.
3. Point out the identical nav/sidebar structure on both — same hierarchy, two
   different access postures.
4. Switch to your terminal, run `npm run demo`, open `/admin/`, edit a page live,
   show the file change, push it, and refresh a live URL to show it propagate.
