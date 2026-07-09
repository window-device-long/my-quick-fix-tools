import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';

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
          'Thay vì chỉ là một bảng công cụ rời rạc, website này được tổ chức như một hệ thống nội dung SEO, nơi mỗi công cụ có mục đích tìm kiếm riêng, có liên kết nội bộ và có thể phục vụ các nhu cầu khác nhau từ developer đến người quản trị website.',
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
          { q: 'Dữ liệu có được lưu lại không?', a: 'Không. Tất cả xử lý diễn ra cục bộ để giữ quyền riêng tư cho người dùng.' },
          { q: 'Có thể dùng cho công việc SEO không?', a: 'Có. Các công cụ hỗ trợ tối ưu dữ liệu, URL và mã nguồn phục vụ cho quy trình SEO kỹ thuật.' },
          { q: 'Có hỗ trợ nhiều ngôn ngữ không?', a: 'Có. Website hiện hỗ trợ tiếng Anh, tiếng Việt và tiếng Tây Ban Nha.' },
        ],
      }
    : {
        title: 'A practical toolkit for developers and SEO teams',
        intro:
          'Quick-Fix Tools is a focused utility hub for developers, QA teams, marketers, and website operators. Each tool runs directly in the browser, keeps your data private, and delivers instant results.',
        overviewTitle: 'A structured toolkit ecosystem',
        overviewText:
          'Rather than a collection of isolated utilities, this website is designed as an SEO-ready content system where each feature serves a distinct search intent and links to related workflows and tools.',
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
          { q: 'Do I need to sign in?', a: 'No. Most tools work instantly in the browser without an account.' },
          { q: 'Is my data stored?', a: 'No. Processing is handled locally to preserve privacy.' },
          { q: 'Can this help with SEO work?', a: 'Yes. The tools support technical SEO tasks such as URL handling, content cleanup, and data preparation.' },
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
    <div className="mx-auto flex max-w-6xl flex-col gap-8 py-6">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumb.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {index === breadcrumb.length - 1 ? (
                <span className="font-medium text-slate-700">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
            {isVi ? 'Pillar Page SEO' : 'SEO Pillar Page'}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {content.title}
          </h1>
          <p className="text-lg leading-8 text-slate-600">{content.intro}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href={`/${lang}/json-validator`} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              {isVi ? 'Dùng JSON Validator' : 'Try JSON Validator'}
            </Link>
            <Link href={`/${lang}/css-minify`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600">
              {isVi ? 'Tối ưu CSS' : 'Minify CSS'}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">{content.overviewTitle}</h2>
          <p className="mt-3 text-base leading-8 text-slate-600">{content.overviewText}</p>
        </article>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">{content.useCasesTitle}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            {content.useCases.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-blue-600">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{isVi ? 'Danh sách công cụ' : 'Featured tools'}</h2>
            <p className="mt-2 text-sm text-slate-600">{isVi ? 'Mỗi mục đều có mục đích tìm kiếm riêng và có thể dùng như một cluster page.' : 'Each tool targets a distinct search intent and can serve as a cluster page for a specific workflow.'}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {toolCatalog.map((tool) => (
            <Link key={tool.path} href={`/${lang}/${tool.path}`} className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-md">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">{tool.category}</span>
                <span className="text-sm font-medium text-blue-600">{tool.keyword}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-800">{tool.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">{content.stepsTitle}</h2>
          <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            {content.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800">{content.faqTitle}</h2>
          <div className="mt-4 space-y-4">
            {content.faqs.map((item) => (
              <div key={item.q} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-800">{item.q}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
