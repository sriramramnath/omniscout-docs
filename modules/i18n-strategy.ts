import { defineNuxtModule } from '@nuxt/kit'

/**
 * Docus forces i18n strategy `prefix`, which breaks existing `/cli/...` links.
 * Use `prefix_and_default` so English pages work at both `/cli/overview` and `/en/cli/overview`.
 */
export default defineNuxtModule({
  meta: { name: 'omniscout-i18n-strategy' },
  setup(_options, nuxt) {
    nuxt.hook('modules:done', () => {
      const i18n = nuxt.options.i18n
      if (!i18n || typeof i18n !== 'object') return

      i18n.strategy = 'prefix_and_default'
    })
  },
})
