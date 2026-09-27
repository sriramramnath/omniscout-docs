import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { languageCodes } from '@/lib/i18n';

const baseUrl = 'https://docs.omniscout.xyz';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();
  const now = new Date();

  const home: MetadataRoute.Sitemap = languageCodes.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: lang === 'en' ? 1 : 0.6,
  }));

  const docs: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: page.locale === 'en' ? 0.8 : 0.5,
  }));

  return [...home, ...docs];
}
