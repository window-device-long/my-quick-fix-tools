import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === 'vi';
  return {
    title: isVi ? 'Hướng dẫn công cụ trực tuyến | Quick-Fix Tools' : 'Online tool guides | Quick-Fix Tools',
    description: isVi
      ? 'Hướng dẫn cách dùng các công cụ định dạng SQL, kiểm tra JSON, chuyển CSV sang JSON và tối ưu CSS hiệu quả.'
      : 'Learn how to use SQL, JSON, CSV, CSS, and URL tools effectively with practical step-by-step guides.',
  };
}

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isVi = lang === 'vi';

  const guides = isVi
    ? [
        { title: 'Cách định dạng SQL trực tuyến', href: `/${lang}/sql-formatter`, summary: 'Làm sạch và sắp xếp câu lệnh SQL để dễ đọc, debug và chia sẻ.' },
        { title: 'Cách kiểm tra JSON nhanh', href: `/${lang}/json-validator`, summary: 'Phát hiện lỗi cú pháp và làm đẹp JSON cho API và frontend.' },
        { title: 'Cách chuyển CSV sang JSON', href: `/${lang}/csv-to-json`, summary: 'Chuyển dữ liệu bảng tính thành JSON để dùng cho ứng dụng và API.' },
        { title: 'Cách nén CSS cho website', href: `/${lang}/css-minify`, summary: 'Giảm kích thước file CSS để tăng tốc độ tải trang.' },
      ]
    : [
        { title: 'How to format SQL online', href: `/${lang}/sql-formatter`, summary: 'Clean up and structure SQL queries for debugging, sharing, and review.' },
        { title: 'How to validate JSON quickly', href: `/${lang}/json-validator`, summary: 'Catch syntax errors and format JSON payloads for APIs and frontends.' },
        { title: 'How to convert CSV to JSON', href: `/${lang}/csv-to-json`, summary: 'Turn spreadsheet exports into JSON for apps, automation, and integrations.' },
        { title: 'How to minify CSS for the web', href: `/${lang}/css-minify`, summary: 'Reduce stylesheet size and improve page speed with cleaner output.' },
      ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{isVi ? 'Hướng dẫn sử dụng công cụ' : 'Practical guides for everyday web tasks'}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{isVi ? 'Những bài hướng dẫn ngắn giúp bạn dùng các công cụ của Quick-Fix Tools đúng mục đích và hiệu quả hơn.' : 'Short, practical guides to help you use Quick-Fix Tools effectively for common development and SEO tasks.'}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.href} href={guide.href} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500">
            <h2 className="text-xl font-semibold text-slate-800">{guide.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{guide.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
