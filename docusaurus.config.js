// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Minnovation Docs (Demo)',
  tagline: 'GitHub + Docusaurus + CMS proof of concept',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Placeholder — replace with the real GitHub Pages URL once a repo exists.
  url: 'https://minnovation-technologies.github.io',
  baseUrl: '/minnovation-docs-demo/',

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
          id: 'public',
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

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'internal',
        path: 'internal-docs',
        routeBasePath: 'internal-docs',
        sidebarPath: './sidebarsInternal.js',
        editUrl:
          'https://github.com/minnovation-technologies/minnovation-docs-demo/tree/main/',
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: 'demo-notice',
        content:
          '&#9888;&#65039; This is a demo build for evaluating GitHub + Docusaurus + CMS. The "Internal Docs" section is <b>not actually access-restricted</b> here &mdash; see the walkthrough guide for how to make it private.',
        backgroundColor: '#fef3c7',
        textColor: '#78350f',
        isCloseable: true,
      },
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Minnovation Docs',
        logo: {
          alt: 'Minnovation Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'publicSidebar',
            docsPluginId: 'public',
            position: 'left',
            label: 'Public Docs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'internalSidebar',
            docsPluginId: 'internal',
            position: 'left',
            label: 'Internal Docs',
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
            items: [
              {label: 'Public Docs', to: '/docs/'},
              {label: 'Internal Docs', to: '/internal-docs/'},
            ],
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
        copyright: `Demo built for internal evaluation — ${new Date().getFullYear()} Minnovation Technologies.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
