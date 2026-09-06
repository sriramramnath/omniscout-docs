import { defaultLocale } from '../../i18n/locales.config'

const SECTION_PATTERN = /^\/(cli|sdk|api)(\/|$)/

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path

  if (path === '/') {
    return navigateTo('/en/', { redirectCode: 301 })
  }

  // Redirect bare /en to /en/ so the index.vue page is matched
  if (path === `/${defaultLocale}`) {
    return navigateTo(`/${defaultLocale}/`, { redirectCode: 301 })
  }

  if (path.startsWith(`/${defaultLocale}/`)) {
    return
  }

  if (
    path.startsWith('/_')
    || path.startsWith('/__')
    || path.startsWith('/api/_')
    || path.startsWith('/raw/')
    || /\.\w+$/.test(path)
  ) {
    return
  }

  if (SECTION_PATTERN.test(path)) {
    return navigateTo(`/${defaultLocale}${path}`, { redirectCode: 301 })
  }
})
