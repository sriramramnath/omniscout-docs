/** Shared locale list for Docus i18n. */
export const defaultLocale = 'en'

export const targetLocales = [] as const

export const localeLabels: Record<string, string> = {
  en: 'English',
}

export const docusLocales = [
  { code: defaultLocale, name: localeLabels[defaultLocale] },
]
