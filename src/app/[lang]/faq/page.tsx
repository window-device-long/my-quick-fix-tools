import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === 'vi';
  return {
    title: isVi ? 'FAQ về công cụ trực tuyến | Quick-Fix Tools' : 'FAQ for online tools | Quick-Fix Tools',
    description: isVi
      ? 'Câu hỏi thường gặp về cách dùng công cụ định dạng SQL, kiểm tra JSON, chuyển CSV sang JSON và nén CSS.'
      : 'Common questions about using SQL, JSON, CSV, CSS, and URL tools online.',
  };
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isVi = lang === 'vi';

  const faqs = isVi
    ? [
        { q: 'Các công cụ có cần đăng nhập không?', a: 'Không. Hầu hết công cụ hoạt động trực tiếp trong trình duyệt và không yêu cầu tài khoản.' },
        { q: 'Dữ liệu có được lưu lại không?', a: 'Không. Việc xử lý diễn ra cục bộ trên thiết bị của bạn để giữ riêng tư.' },
        { q: 'Có thể dùng cho SEO không?', a: 'Có. Các công cụ hỗ trợ làm sạch dữ liệu, tối ưu mã và xử lý URL phục vụ SEO kỹ thuật.' },
        { q: 'Có hỗ trợ nhiều ngôn ngữ không?', a: 'Có. Website hiện hỗ trợ tiếng Anh, tiếng Việt và tiếng Tây Ban Nha.' },
      ]
    : [
        { q: 'Do I need an account to use the tools?', a: 'No. Most tools work directly in your browser without signing in.' },
        { q: 'Is my data saved?', a: 'No. Processing is handled locally on your device to preserve privacy.' },
        { q: 'Can these tools help with SEO?', a: 'Yes. They support technical SEO tasks such as clean data handling, URL processing, and code optimization.' },
        { q: 'Is the site available in multiple languages?', a: 'Yes. The site currently supports English, Vietnamese, and Spanish.' },
      ];

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{isVi ? 'Câu hỏi thường gặp' : 'Frequently asked questions'}</h1>
        <p className="text-lg text-slate-600">{isVi ? 'Những câu hỏi phổ biến về cách dùng các công cụ và quyền riêng tư khi xử lý dữ liệu.' : 'Common questions about using the tools and keeping data private while you work.'}</p>
      </div>

      <div className="space-y-4">
        {faqs.map((item) => (
          <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">{item.q}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
