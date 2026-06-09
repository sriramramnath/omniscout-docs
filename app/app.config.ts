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

  assistant: {
    floatingInput: false,
    explainWithAi: false,
    shortcuts: {
      focusInput: '',
    },
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
    pageHero: {
      slots: {
        root: 'relative isolate overflow-hidden',
        container: 'flex flex-col py-16 sm:py-20 lg:py-24 gap-10',
        title: 'text-4xl sm:text-6xl text-pretty tracking-tight font-bold text-highlighted max-w-4xl',
        description: 'text-lg sm:text-xl text-muted max-w-2xl',
      },
    },
  },
})
