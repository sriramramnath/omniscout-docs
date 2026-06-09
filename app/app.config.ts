export default defineAppConfig({
  docus: {
    locale: 'en',
  },

  seo: {
    titleTemplate: '%s · OmniScout Docs',
    title: 'OmniScout Docs',
    description:
      'Local-first browser control, semantic search, and research for AI agents. Install with pip install omniscout.',
  },

  header: {
    title: 'OmniScout Docs',
    logo: {
      light: '/logo.svg',
      dark: '/logo.svg',
      alt: 'OmniScout',
      favicon: '/favicon.svg',
      class: 'h-7',
    },
  },

  github: {
    url: 'https://github.com/sriramramnath/omniscout-docs',
    branch: 'master',
    rootDir: '.',
  },

  socials: {
    github: 'https://github.com/sriramramnath/omniscout',
  },

  toc: {
    title: 'On this page',
    bottom: {
      title: 'Links',
      links: [
        {
          icon: 'i-lucide-globe',
          label: 'Website',
          to: 'https://omniscout.xyz',
          target: '_blank',
        },
        {
          icon: 'i-lucide-file-text',
          label: 'llms.txt',
          to: 'https://docs.omniscout.xyz/llms.txt',
          target: '_blank',
        },
        {
          icon: 'i-simple-icons-pypi',
          label: 'PyPI',
          to: 'https://pypi.org/project/omniscout/',
          target: '_blank',
        },
      ],
    },
  },

  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate',
    },
  },
})
