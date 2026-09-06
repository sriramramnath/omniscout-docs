import { docusLocales, defaultLocale } from './i18n/locales.config'

export default defineNuxtConfig({
  extends: ['docus'],

  modules: ['@nuxtjs/i18n', './modules/i18n-strategy'],

  i18n: {
    defaultLocale,
    locales: docusLocales,
  },

  site: {
    url: 'https://docs.omniscout.xyz',
    name: 'OmniScout Docs',
  },

  compatibilityDate: '2025-06-09',

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
      ],
    },
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'omniscout-color-mode',
  },

  mcp: {
    enabled: false,
  },

  runtimeConfig: {
    public: {
      // Exposed for DocsPageHeaderLinks — keep in sync with mcp.enabled above.
      mcp: {
        enabled: false,
      },
    },
  },

  llms: {
    domain: 'https://docs.omniscout.xyz',
  },

  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
})
