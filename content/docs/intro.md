---
sidebar_position: 1
slug: /
visibility: public
---

# Minnovation Documentation

Welcome to the Minnovation Technologies documentation.

This is a **demo build** for evaluating GitHub + Docusaurus + a git-based CMS as a
way to manage public, client-facing documentation and internal-only documentation
from a single source.

## How this works

Every page in this docs set is tagged **Public** or **Internal** through the CMS.
Two separate sites build from the exact same content:

- **Public site** — includes only pages tagged Public
- **Internal site** — includes everything: Public pages *and* Internal pages,
  behind a login

Both sites share the same folder structure and sidebar ordering — the public
site's tree is simply a filtered subset of the internal site's tree, not a
different structure to maintain separately.

Use search (top right) to find a page, or browse the sidebar.
