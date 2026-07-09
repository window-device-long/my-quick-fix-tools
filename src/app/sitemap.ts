import { MetadataRoute } from 'next';
import { seoClusterPages } from '@/lib/seo-cluster-pages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com'; // Thay bằng domain thật khi deploy
  const locales = ['en', 'es', 'vi'];

  const tools = ['404', 'tools', 'url-encoder-decoder', 'hash-generator', 'css-minify', 'csv-to-json', 'about', 'terms-of-service', 'privacy-policy', 'json-validator', '', 'sql-formatter'];
  const clusterRoutes = seoClusterPages.map((page) => `/tools/${page.slug}`);

  const routes: MetadataRoute.Sitemap = [];

  locales.forEach((lang) => {
    tools.forEach((tool) => {
      const path = tool ? `/${tool}` : '';
      routes.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: tool ? 0.8 : 1.0,
      });
    });

    clusterRoutes.forEach((path) => {
      routes.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.72,
      });
    });
  });

  return routes;
}