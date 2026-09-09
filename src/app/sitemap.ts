import type { MetadataRoute } from 'next';
import { languageAlternates, locales, siteUrl } from '@/lib/site';
import { getSeoLandings, isSeoLandingIndexable } from '@/lib/seo-landings';

const coreRoutes = [
  '',
  'tools',
  'sql-formatter',
  'json-validator',
  'csv-to-json',
  'css-minify',
  'hash-generator',
  'url-encoder-decoder',
  'guides',
  'faq',
  'blog',
  'about',
  'privacy-policy',
  'terms-of-service',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const route of coreRoutes) {
      const suffix = route ? `/${route}` : '';
      entries.push({
        url: `${siteUrl}/${lang}${suffix}`,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === 'tools' ? 0.9 : 0.8,
        alternates: { languages: languageAlternates(route) },
      });
    }
  }

  for (const lang of locales) {
    for (const { tool, intent } of getSeoLandings()) {
      if (!isSeoLandingIndexable(tool, intent.slug)) continue;
      const route = `tools/${tool}/${intent.slug}`;
      entries.push({
        url: `${siteUrl}/${lang}/${route}`,
        changeFrequency: 'monthly',
        priority: 0.65,
        alternates: { languages: languageAlternates(route) },
      });
    }
  }

  return entries;
}
