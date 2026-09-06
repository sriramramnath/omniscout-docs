export default defineAppConfig({
  docus: {
    locale: 'en',
    colorMode: 'light',
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
      light: '/omniscout.svg',
      dark: '/omniscout.svg',
      alt: 'OmniScout',
      favicon: '/favicon.svg',
      class: 'h-5',
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
      primary: 'neutral',
      neutral: 'neutral',
    },
    button: {
      slots: {
        base: 'font-[Inter,sans-serif] font-medium tracking-[-0.09px] rounded-[12px]',
      },
      variants: {
        size: {
          xl: 'px-[16px] py-[12px] text-[18px]',
        },
      },
    },
    pageHero: {
      slots: {
        root: 'hidden',
        container: 'flex flex-col items-center text-center px-16 py-[120px] gap-12',
        title: "font-[Sora,sans-serif] font-bold text-[40px] sm:text-[64px] tracking-[-1.28px] leading-[1.1] text-black text-balance max-w-[740px] mx-auto",
        description: "font-[Inter,sans-serif] font-medium text-[18px] sm:text-[24px] tracking-[-0.12px] leading-[1.45] text-[rgba(0,0,0,0.55)] text-balance max-w-2xl mx-auto",
        links: 'flex flex-wrap items-center justify-center gap-4',
      },
    },
    pageSection: {
      slots: {
        root: 'py-14 sm:py-16',
        container: 'flex flex-col gap-8',
        title: "font-[Inter,sans-serif] text-3xl sm:text-4xl font-bold text-black text-center text-balance tracking-[-0.72px]",
        description: "font-[Inter,sans-serif] font-medium text-[18px] tracking-[-0.09px] text-[rgba(0,0,0,0.55)] text-center text-balance max-w-3xl mx-auto leading-[1.45]",
        body: 'mt-2',
      },
    },
    pageCard: {
      slots: {
        root: 'bg-[rgba(0,0,0,0.05)] rounded-[16px] border-0',
        title: "font-[Inter,sans-serif] font-semibold text-[24px] tracking-[-0.48px] text-black",
        description: "font-[Inter,sans-serif] font-medium text-[18px] tracking-[-0.09px] leading-[1.45] text-[rgba(0,0,0,0.55)]",
      },
    },
  },
})
