import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'vi', 'ja', 'fr', 'de'];
const defaultLocale = 'en';
const publicAssetExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.ico', '.webp', '.gif', '.avif', '.txt', '.xml', '.json', '.map'];

const isPublicAsset = (pathname: string) => {
  const basename = pathname.split('/').filter(Boolean).pop() || '';
  if (basename.startsWith('favicon') || basename === 'robots.txt' || basename === 'sitemap.xml') return true;
  return publicAssetExtensions.some((extension) => pathname.toLowerCase().endsWith(extension));
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  // URLs that already start with a supported locale continue normally.
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return NextResponse.next();

  // Detect a preferred locale for URLs that do not include one.
  const acceptLanguage = request.headers.get('accept-language') || '';
  const detected = locales.find(locale => acceptLanguage.includes(locale)) || defaultLocale;
  
  request.nextUrl.pathname = `/${detected}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = { 
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'] 
};