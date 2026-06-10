/** Shared locale list for Docus i18n and General Translation. */
export const defaultLocale = 'en'

/** Popular locales (GT + Docus UI strings). Source: English only in content/en/. */
export const targetLocales = [
  'es', // Spanish
  'fr', // French
  'de', // German
  'ja', // Japanese
  'ko', // Korean
  'zh-CN', // Chinese (Simplified)
  'pt-BR', // Portuguese (Brazil)
  'ru', // Russian
  'hi', // Hindi
] as const

export const localeLabels: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  ko: '한국어',
  'zh-CN': '简体中文',
  'pt-BR': 'Português',
  ru: 'Русский',
  hi: 'हिन्दी',
}

export const docusLocales = [
  { code: defaultLocale, name: localeLabels[defaultLocale] },
  ...targetLocales.map(code => ({ code, name: localeLabels[code] ?? code })),
]
