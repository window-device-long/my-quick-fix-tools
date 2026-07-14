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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  // 1. Tách các phân đoạn của URL ra thành mảng để kiểm tra (Bỏ các khoảng trống)
  const segments = pathname.split('/').filter(Boolean);

  // 2. BẪY LỖI: Kiểm tra nếu URL có từ 2 phân đoạn trở lên VÀ cả 2 đều là locale hợp lệ (Ví dụ: /en/vi/abc hoặc /vi/es)
  if (segments.length >= 2 && locales.includes(segments[0]) && locales.includes(segments[1])) {
    const correctLang = segments[0]; // Giữ lại ngôn ngữ đầu tiên người dùng chọn
    
    // Ép hướng trình duyệt về trang 404 thực tế của ngôn ngữ đó
    request.nextUrl.pathname = `/${correctLang}/404`;
    return NextResponse.redirect(request.nextUrl);
  }

  // 3. Logic gốc của bạn: Kiểm tra xem URL đã có sẵn mã locale hợp lệ chưa
  const pathnameHasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (pathnameHasLocale) return NextResponse.next();

  // 4. Logic gốc của bạn: Tự động bắt ngôn ngữ từ trình duyệt nếu truy cập URL không có locale (Ví dụ: truy cập thẳng /)
  const acceptLanguage = request.headers.get('accept-language') || '';
  const detected = locales.find(locale => acceptLanguage.includes(locale)) || defaultLocale;
  
  request.nextUrl.pathname = `/${detected}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = { 
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'] 
};