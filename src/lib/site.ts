export const siteName = 'JSNify';
export const siteDescription = 'Fast, private browser-based developer tools for formatting, validating, converting, encoding, and debugging data.';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://jsnify.online').replace(/\/$/, '');

export const locales = ['en', 'es', 'vi', 'ja', 'fr', 'de'] as const;
export type SiteLocale = (typeof locales)[number];
export const defaultLocale: SiteLocale = 'en';

export const getCanonicalUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};

export const languageAlternates = (pathWithoutLocale = '') => {
  const suffix = pathWithoutLocale ? `/${pathWithoutLocale.replace(/^\//, '')}` : '';
  return Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}${suffix}`]));
};
