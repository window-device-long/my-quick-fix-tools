import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

const toolCatalog = [
  {
    path: 'sql-formatter',
    title: 'SQL Formatter & Minifier',
    description: 'Beautify, compress, and validate SQL statements for cleaner database workflows.',
    keyword: 'sql formatter online',
    category: 'Database Utilities',
  },
  {
    path: 'json-validator',
    title: 'JSON Validator & Beautifier',
    description: 'Validate syntax, format structure, and debug JSON payloads instantly in the browser.',
    keyword: 'json validator online',
    category: 'Data Utilities',
  },
  {
    path: 'csv-to-json',
    title: 'CSV to JSON Converter',
    description: 'Turn spreadsheet exports into JSON objects for APIs, apps, and automation.',
    keyword: 'csv to json',
    category: 'Data Utilities',
  },
  {
    path: 'css-minify',
    title: 'CSS Minifier',
    description: 'Compress CSS and remove unnecessary whitespace to improve performance.',
    keyword: 'css minifier',
    category: 'Optimization',
  },
  {
    path: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256 and other hashes for verification and storage.',
    keyword: 'hash generator online',
    category: 'Security',
  },
  {
    path: 'url-encoder-decoder',
    title: 'URL Encoder / Decoder',
    description: 'Encode and decode URL strings so links and query parameters stay valid.',
    keyword: 'url encoder decoder',
    category: 'Optimization',
  },
];

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === 'vi';

  return {
    title: isVi ? 'Công cụ trực tuyến SEO-friendly | Quick-Fix Tools' : 'SEO-friendly web tools hub | Quick-Fix Tools',
    description: isVi
      ? 'Khám phá bộ công cụ trực tuyến giúp định dạng SQL, kiểm tra JSON, chuyển CSV sang JSON, tối ưu CSS và tạo hash nhanh chóng.'
      : 'Explore a complete toolkit for formatting SQL, validating JSON, converting CSV to JSON, minifying CSS, and generating hashes online.',
    alternates: { canonical: `https://jsnify.online/${lang}/tools` },
  };
}

export default async function ToolsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isVi = lang === 'vi';

  const content = isVi
    ? {
        title: 'Bộ công cụ trực tuyến cho developers và marketer',
        intro:
          'Quick-Fix Tools là trung tâm công cụ hữu ích cho những người làm phát triển, kiểm thử dữ liệu, tối ưu website và xử lý nội dung nhanh. Mỗi công cụ được thiết kế để hoạt động trực tiếp trên trình duyệt, giữ dữ liệu an toàn và mang lại kết quả tức thì.',
        overviewTitle: 'Tổng quan hệ sinh thái công cụ',
        overviewText:
          'Thay vì chỉ là một bảng công cụ rời rạc, website này được tổ chức như một hệ thống nội dung SEO chuyên sâu. Mỗi công cụ đều giải quyết một mục tiêu tìm kiếm riêng biệt, tối ưu hóa liên kết nội bộ (internal links) và phục vụ nhu cầu thực tế của cả lập trình viên lẫn người quản trị trang web.',
        useCasesTitle: 'Khi nào nên dùng bộ công cụ này',
        useCases: [
          'Khi cần chuẩn bị dữ liệu cho API, database hoặc frontend.',
          'Khi tối ưu CSS và cấu trúc nội dung để tăng tốc độ tải trang.',
          'Khi kiểm tra đầu ra và tạo chuỗi băm cho hệ thống bảo mật.',
        ],
        stepsTitle: 'Cách dùng nhanh',
        steps: [
          'Chọn công cụ phù hợp với mục tiêu của bạn.',
          'Dán dữ liệu đầu vào hoặc nhập nội dung cần xử lý.',
          'Nhận kết quả ngay lập tức và sao chép vào dự án của mình.',
        ],
        faqTitle: 'Câu hỏi thường gặp',
        faqs: [
          { q: 'Các công cụ có cần đăng nhập không?', a: 'Không. Hầu hết đều hoạt động ngay trên trình duyệt và không yêu cầu tài khoản.' },
          { q: 'Dữ liệu có được lưu lại không?', a: 'Không. Tất cả xử lý diễn ra cục bộ tại client-side nhằm đảm bảo tính riêng tư tuyệt đối cho dữ liệu của bạn.' },
          { q: 'Có thể dùng cho công việc SEO không?', a: 'Có. Các công cụ hỗ trợ tối ưu dữ liệu, nén tệp, chuẩn hóa URL phục vụ cực tốt cho quy trình SEO kỹ thuật.' },
          { q: 'Có hỗ trợ nhiều ngôn ngữ không?', a: 'Có. Website hiện hỗ trợ tiếng Anh, tiếng Việt và tiếng Tây Ban Nha.' },
        ],
      }
    : {
        title: 'A practical toolkit for developers and SEO teams',
        intro:
          'Quick-Fix Tools is a focused utility hub for developers, QA teams, marketers, and website operators. Each tool runs directly in the browser, keeps your data private, and delivers instant results.',
        overviewTitle: 'A structured toolkit ecosystem',
        overviewText:
          'Rather than a collection of isolated utilities, this website is designed as an SEO-ready content system where each feature serves a distinct search intent, linked contextually to enhance performance and usability.',
        useCasesTitle: 'Best use cases',
        useCases: [
          'Preparing data for APIs, databases, and frontend projects.',
          'Optimizing CSS and content structure to improve page performance.',
          'Verifying output and generating hashes for security workflows.',
        ],
        stepsTitle: 'How it works',
        steps: [
          'Pick the tool that matches your task.',
          'Paste your input and let the tool process it instantly.',
          'Copy the result into your app, workflow, or content pipeline.',
        ],
        faqTitle: 'Frequently asked questions',
        faqs: [
          { q: 'Do I need to sign in?', a: 'No. Most tools work instantly in the browser without requiring any account.' },
          { q: 'Is my data stored?', a: 'No. Processing is handled entirely client-side locally to preserve maximum privacy.' },
          { q: 'Can this help with SEO work?', a: 'Yes. The tools support technical SEO tasks such as URL handling, CSS minification, and data structure cleaning.' },
          { q: 'Is multilingual support available?', a: 'Yes. The site currently supports English, Vietnamese, and Spanish.' },
        ],
      };

  const breadcrumb = [
    { label: isVi ? 'Trang chủ' : 'Home', href: `/${lang}` },
    { label: isVi ? 'Công cụ' : 'Tools', href: `/${lang}/tools` },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: content.title,
    description: content.intro,
    url: `https://jsnify.online/${lang}/tools`,
    hasPart: toolCatalog.map((tool) => ({
      '@type': 'SoftwareApplication',
      name: tool.title,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: `https://jsnify.online/${lang}/${tool.path}`,
    })),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `https://jsnify.online${item.href}`,
      })),
    },
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 py-8 px-4 sm:px-6">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumb.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span className="text-slate-300">/</span>}
              {index === breadcrumb.length - 1 ? (
                <span className="font-semibold text-slate-800">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Hero Header Section */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            {isVi ? 'Hệ sinh thái công cụ' : 'Utility Hub'}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl !leading-tight">
            {content.title}
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">{content.intro}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link 
              href={`/${lang}/json-validator`} 
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all shadow-sm hover:bg-blue-700 hover:shadow"
            >
              {isVi ? 'Dùng JSON Validator' : 'Try JSON Validator'}
            </Link>
            <Link 
              href={`/${lang}/css-minify`} 
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-blue-500 hover:text-blue-600 hover:shadow-sm"
            >
              {isVi ? 'Tối ưu CSS' : 'Minify CSS'}
            </Link>
          </div>
        </div>
      </section>

      {/* Overview & Use Cases Layout */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-900">{content.overviewTitle}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{content.overviewText}</p>
        </article>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">{content.useCasesTitle}</h2>
          <ul className="mt-5 space-y-3.5 text-sm leading-relaxed text-slate-600">
            {content.useCases.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Tools Catalog Directory Grid */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        <div className="border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-bold text-slate-900">{isVi ? 'Danh sách công cụ' : 'Featured tools'}</h2>
          <p className="mt-2 text-sm text-slate-500">
            {isVi 
              ? 'Mỗi công cụ được tối ưu cho một nhu cầu tìm kiếm cụ thể và hoạt động tối đa hiệu năng.' 
              : 'Each utility targets a distinct search intent and delivers highly efficient browser performance.'}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {toolCatalog.map((tool) => (
            <Link 
              key={tool.path} 
              href={`/${lang}/${tool.path}`} 
              className="group rounded-2xl border border-slate-200 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg flex flex-col justify-between bg-white"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                    {tool.category}
                  </span>
                  <span className="text-xs font-semibold text-blue-500 bg-blue-50/50 px-2.5 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    #{tool.keyword}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {tool.description}
                </p>
              </div>
              <div className="mt-5 flex items-center text-xs font-bold text-blue-600 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{isVi ? 'Trải nghiệm ngay' : 'Try it now'}</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Instructions & FAQs Section */}
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">{content.stepsTitle}</h2>
          <ol className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600">
            {content.steps.map((step, index) => (
              <li key={step} className="flex gap-4 items-start">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">{content.faqTitle}</h2>
          <div className="mt-6 space-y-4">
            {content.faqs.map((item) => (
              <div key={item.q} className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                <p className="font-bold text-slate-900 text-base">{item.q}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{item.a}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}