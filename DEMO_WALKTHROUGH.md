# Demo Walkthrough — Tagged Content, Two Sites, One Source

Companion guide for showing this in the manager meeting.

> **How to demo it live:** deploy the two Netlify sites (see
> `SETUP_PERSONAL_ACCOUNT.md`), open both URLs side by side, and walk the
> sidebar/search/CMS differences live. That's a stronger demo than
> screenshots, so this guide stays screenshot-free on purpose.

---

## 1. What was built

| Piece | What it shows |
|---|---|
| `content/docs/` | One tracked source. Every page tagged `visibility: public` or `visibility: internal` |
| `scripts/prepare-build.mjs` | Build-time filter — reads `SITE_AUDIENCE`, copies only the allowed pages into the folder Docusaurus builds from |
| Public Netlify site | `SITE_AUDIENCE=public` — only public-tagged pages, open to anyone |
| Internal Netlify site | `SITE_AUDIENCE=internal` — every page, whole site behind Basic Auth |
| `/admin/` (Decap CMS) | Form-based editing, including a Visibility dropdown right on each page |
| Search | Indexed per build — public search literally cannot return an internal-only page, because that page was never part of the public build |

## 2. Why "one source, two filtered builds" instead of two folders

The earlier version of this demo used two separate content folders
(`docs/` and `internal-docs/`) as two Docusaurus content instances on one
site. That worked, but it meant maintaining structure in two places and never
actually gated anything by itself.

This version tags content once, at the page level, and lets the *build*
decide what ships where. Practically:

- Adding a new public page never requires touching anything internal-specific
- Marking a page internal is a one-field change in the CMS, not a file move
- The public and internal sidebars can never drift out of sync in structure —
  the public one is mechanically a subset of the internal one

## 3. The access-control story, honestly

Because the internal site is now its **own separate Netlify deployment**
rather than a shared path on one site, gating it is simpler than the earlier
Cloudflare/path-scoping approach: whole-site Basic Auth, free, one generated
`_headers` file.

The caveat carried over from before: this is Basic Auth, not SSO. **Real SAML
SSO on Netlify requires an Enterprise plan** with Organization/Team SSO
already configured — not available on a free or personal account. If this
becomes a real company deployment on Netlify Enterprise, the swap is
straightforward: same two-site structure, just replace the generated
`_headers` step with Project configuration → Visitor access → Password
Protection → SSO on the internal site only.

## 4. Suggested talking points for the meeting

1. Show the public site's sidebar, then the internal site's — same
   categories, same order, internal has two extra entries. One source, not
   two things to keep in sync.
2. Open the CMS, open a page, point at the Visibility dropdown. That's the
   entire mechanism for deciding where a page ships.
3. Search for an internal-only term on both sites — works on internal, empty
   on public. Not filtered after the fact; never indexed on the public build.
4. Create a new page live, tag it, push, and show it appear (or not) on each
   site after the rebuild.
5. Be upfront about the Basic-Auth-vs-SSO distinction, and what changes if
   this moves to a paid company account later.
