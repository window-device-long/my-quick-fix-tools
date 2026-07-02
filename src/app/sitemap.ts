import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com'; // Thay bằng domain thật khi deploy
  const locales = ['en', 'es', 'vi'];
  
  // DANH SÁCH PATH CÔNG CỤ (Makefile sẽ tự động chèn thêm vào dưới dòng này)
  const tools = ['404', 'url-encoder-decoder', 'hash-generator', 'css-minify', 'csv-to-json', 'about', 'terms-of-service', 'privacy-policy', 'json-validator', '', 'sql-formatter'];

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
  });

  return routes;
}