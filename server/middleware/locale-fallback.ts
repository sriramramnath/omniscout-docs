import { defaultLocale, targetLocales } from '../../i18n/locales.config'

const localeCodes = new Set([defaultLocale, ...targetLocales])

/**
 * Redirect unprefixed doc paths to the default locale when i18n routing does not match.
 * Covers direct visits to legacy URLs like /cli/overview during dev/SSR edge cases.
 */
export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const path = url.pathname

  if (path === '/' || localeCodes.has(path.split('/').filter(Boolean)[0] ?? '')) {
    return
  }

  if (
    path.startsWith('/_')
    || path.startsWith('/api/')
    || path.startsWith('/raw/')
    || path.startsWith('/__')
    || /\.\w+$/.test(path)
  ) {
    return
  }

  if (path.startsWith('/cli') || path.startsWith('/sdk')) {
    return sendRedirect(event, `/${defaultLocale}${path}${url.search}`, 302)
  }
})
