import type { MetadataRoute } from 'next';
import { seoClusterPages } from '@/lib/seo-cluster-pages';
import { languageAlternates, locales, siteUrl } from '@/lib/site';

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

  // Cluster pages currently contain original localized copy only for EN and VI.
  // Do not expose fallback-English versions under ES/JA/FR/DE to the sitemap.
  for (const lang of ['en', 'vi'] as const) {
    for (const page of seoClusterPages) {
      entries.push({
        url: `${siteUrl}/${lang}/tools/${page.slug}`,
        changeFrequency: 'monthly',
        priority: 0.55,
        alternates: {
          languages: {
            en: `${siteUrl}/en/tools/${page.slug}`,
            vi: `${siteUrl}/vi/tools/${page.slug}`,
          },
        },
      });
    }
  }

  return entries;
}
