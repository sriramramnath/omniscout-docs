import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { defineNuxtModule, extendPages } from '@nuxt/kit'

const require = createRequire(import.meta.url)

/**
 * Docus forces i18n strategy `prefix`, which breaks existing `/cli/...` links.
 * Use `prefix_and_default` so English is canonical at `/en/...`.
 *
 * Docus also registers a `/:lang?` landing route that swallows every
 * single-segment path (`/en/cli`, `/en/api`, `/en/sdk`), so section landing
 * pages 404. Re-map those exact paths to the docs page component — static
 * routes outrank the dynamic landing route.
 */
export default defineNuxtModule({
  meta: { name: 'omniscout-i18n-strategy' },
  setup(_options, nuxt) {
    nuxt.hook('modules:done', () => {
      const i18n = nuxt.options.i18n
      if (!i18n || typeof i18n !== 'object') return

      i18n.strategy = 'prefix_and_default'
    })

    const docusRoot = dirname(require.resolve('docus/package.json'))
    const slugPage = join(docusRoot, 'app/pages/[[lang]]/[...slug].vue')

    extendPages((pages) => {
      // NOTE: push unprefixed paths — @nuxtjs/i18n prefixes them to
      // `/en/<section>` at runtime. Pushing `/en/<section>` here would end
      // up as `/en/en/<section>`.
      for (const section of ['cli', 'sdk', 'api']) {
        const path = `/${section}`
        if (pages.some(p => p.path === path)) continue
        pages.push({ name: `section-${section}`, path, file: slugPage })
      }
    })
  },
})
