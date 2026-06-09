export default defineNuxtConfig({
  extends: ['docus'],

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
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
    },
  },

  mcp: {
    enabled: false,
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
