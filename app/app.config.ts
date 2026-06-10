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
        container: 'flex flex-col items-center text-center py-20 sm:py-24 lg:py-28 gap-8',
        title: 'text-4xl sm:text-5xl lg:text-6xl text-balance tracking-tight font-bold text-highlighted max-w-4xl mx-auto',
        description: 'text-lg sm:text-xl text-muted text-balance max-w-2xl mx-auto leading-relaxed',
        links: 'flex flex-wrap items-center justify-center gap-3',
      },
    },
    pageSection: {
      slots: {
        root: 'py-14 sm:py-16',
        container: 'flex flex-col gap-8',
        title: 'text-3xl sm:text-4xl font-bold text-highlighted text-center text-balance',
        description: 'text-muted text-center text-balance max-w-3xl mx-auto leading-relaxed',
        body: 'mt-2',
      },
    },
  },
})
