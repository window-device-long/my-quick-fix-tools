import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/get-dictionary';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const activeTools = [
    { path: 'sql-formatter', title: lang === 'vi' ? 'Định dạng & Nén SQL' : 'SQL Formatter & Minifier', desc: 'Beautify or compress database queries.', category: 'Database' },
    { path: 'json-validator', title: 'JSON Validator & Beautifier', desc: 'Verify, format, and parse JSON syntax.', category: 'Database' },
    { path: 'csv-to-json', title: 'CSV to JSON Converter', desc: 'Convert Excel/CSV data structure into JSON array.', category: 'Database' },
    { path: 'css-minify', title: 'CSS Code Minifier', desc: 'Strip spaces to optimize stylesheet size.', category: 'Optimization' },
    { path: 'hash-generator', title: 'Crypto Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256 string values.', category: 'Optimization' },
    { path: 'url-encoder-decoder', title: 'URL Encoder / Decoder', desc: 'Encode or decode string characters safely for HTTP.', category: 'Optimization' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-6">
      {/* HERO SECTION CHUẨN QUỐC TẾ */}
      <section className="text-center space-y-5 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
          ✨ Free & 100% Client-Side Privacy
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
          {dict.common?.title || 'QuickFix Studio'}
        </h1>
        <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
          {dict.common?.description || 'Instant utilities to format, validate, and optimize code structures without sending data to any servers.'}
        </p>
      </section>

      {/* DASHBOARD GRID */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span>🎯</span> {lang === 'vi' ? 'Bảng điều khiển công cụ' : 'Available Utilities'}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTools.map((tool) => (
            <Link 
              key={tool.path}
              href={`/${lang}/${tool.path}`}
              className="group relative flex flex-col justify-between p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">{tool.category}</span>
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition text-base mt-2">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <div className="text-xs font-bold text-blue-600 mt-5 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>{lang === 'vi' ? 'Khởi chạy' : 'Launch Tool'}</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-slate-300 shadow-sm sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                <img src="/favicon-32x32.png" alt="QuickFix Studio" className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">QuickFix Studio</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">Fast, private, production-ready</div>
              </div>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              {lang === 'vi'
                ? 'Bộ công cụ web nhanh, riêng tư và sẵn sàng cho phát triển, SEO và vận hành nội dung mà không cần cài đặt thêm.'
                : 'A fast, privacy-first suite of web tools built for developers, SEO teams, and content teams who need reliable results without extra setup.'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{lang === 'vi' ? 'Công cụ nổi bật' : 'Featured tools'}</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <Link href={`/${lang}/sql-formatter`} className="block transition hover:text-white">SQL Formatter</Link>
              <Link href={`/${lang}/json-validator`} className="block transition hover:text-white">JSON Validator</Link>
              <Link href={`/${lang}/css-minify`} className="block transition hover:text-white">CSS Minifier</Link>
              <Link href={`/${lang}/hash-generator`} className="block transition hover:text-white">Hash Generator</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{lang === 'vi' ? 'Thông tin & chính sách' : 'Company & policy'}</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <Link href={`/${lang}/about`} className="block transition hover:text-white">{lang === 'vi' ? 'Về QuickFix Studio' : 'About QuickFix Studio'}</Link>
              <Link href={`/${lang}/privacy-policy`} className="block transition hover:text-white">{lang === 'vi' ? 'Chính sách riêng tư' : 'Privacy Policy'}</Link>
              <Link href={`/${lang}/terms-of-service`} className="block transition hover:text-white">{lang === 'vi' ? 'Điều khoản dịch vụ' : 'Terms of Service'}</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>&copy; 2026 QuickFix Studio. Designed for modern web workflows.</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {lang === 'vi' ? 'Hoạt động ổn định' : 'Operational'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}