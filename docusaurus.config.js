// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Same audience flag scripts/prepare-build.mjs uses to filter docs/ — reused
// here purely for cosmetic differences (title, banner) so it's obvious which
// build you're looking at. Defaults to "internal" (the superset), matching
// the content filter's default.
const audience =
  (process.env.SITE_AUDIENCE || 'internal').trim().toLowerCase() === 'public'
    ? 'public'
    : 'internal';

const audienceLabel = audience === 'public' ? 'Public' : 'Internal';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `Minnovation Docs (${audienceLabel} — Demo)`,
  tagline: 'GitHub + Docusaurus + CMS proof of concept',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Placeholder — replace with the real GitHub Pages URL once a repo exists.
  url: 'https://minnovation-technologies.github.io',
  // GitHub Pages serves this under a subpath; Cloudflare Workers and Netlify
  // serve it at the root of their own subdomain. Set DOCS_BASE_URL=/ in that
  // platform's build environment variables to override this default there.
  baseUrl: process.env.DOCS_BASE_URL || '/minnovation-docs-demo/',

  // GitHub pages deployment config — replace with the real org/repo.
  organizationName: 'minnovation-technologies',
  projectName: 'minnovation-docs-demo',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/minnovation-technologies/minnovation-docs-demo/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        language: 'en',
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar:
        audience === 'public'
          ? {
              id: 'demo-notice-public',
              content:
                '\u26A0\uFE0F This is the <b>public</b> build of a demo evaluating GitHub + Docusaurus + CMS. Only pages tagged "Public" appear here.',
              backgroundColor: '#d1fae5',
              textColor: '#065f46',
              isCloseable: true,
            }
          : {
              id: 'demo-notice-internal',
              content:
                '\u26A0\uFE0F This is the <b>internal</b> build of a demo evaluating GitHub + Docusaurus + CMS. It includes Public pages plus Internal-only pages that are excluded from the public build.',
              backgroundColor: '#fef3c7',
              textColor: '#78350f',
              isCloseable: true,
            },
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: `Minnovation Docs (${audienceLabel})`,
        logo: {
          alt: 'Minnovation Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            href: 'pathname:///admin/',
            label: 'Edit in CMS',
            position: 'right',
          },
          {
            href: 'https://github.com/minnovation-technologies/minnovation-docs-demo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [{label: 'Docs', to: '/docs/'}],
          },
          {
            title: 'This demo',
            items: [
              {label: 'Edit in CMS', href: 'pathname:///admin/'},
              {
                label: 'GitHub repo',
                href: 'https://github.com/minnovation-technologies/minnovation-docs-demo',
              },
            ],
          },
        ],
        copyright: `Demo built for internal evaluation — ${new Date().getFullYear()} Minnovation Technologies. (${audienceLabel} build)`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
