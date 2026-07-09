export const siteName = 'QuickFix Studio';
export const siteDescription = 'A production-ready suite of fast, private web tools for developers, marketers, and creators.';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://quickfixstudio.com').replace(/\/$/, '');

export const getCanonicalUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
};
