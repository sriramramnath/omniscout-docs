import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'ja', 'ko', 'ru', 'zh-CN'],
});

export const languageCodes = ['en', 'ja', 'ko', 'ru', 'zh-CN'] as const;

export const languageLabels: Record<string, string> = {
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  ru: 'Русский',
  'zh-CN': '中文',
};
