import { defaultLocale, targetLocales } from '../../i18n/locales.config'

const localeCodes = new Set([defaultLocale, ...targetLocales])

/** Redirect legacy unprefixed doc links (e.g. /cli/overview) to the default locale route. */
export default defineNuxtRouteMiddleware((to) => {
  const first = to.path.split('/').filter(Boolean)[0]
  if (!first || localeCodes.has(first)) return

  if (to.path.startsWith('/cli') || to.path.startsWith('/sdk')) {
    return navigateTo(`/${defaultLocale}${to.fullPath}`)
  }
})
