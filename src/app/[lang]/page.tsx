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
          {dict.common?.title || 'Quick-Fix Web Tools'}
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

      {/* FOOTER ĐƯỢC CHUẨN HÓA SÂU ĐỂ CHỐNG THIN CONTENT VÀ ĐĂNG KÝ ADSENSE */}
      <footer className="pt-12 border-t border-slate-200 text-slate-600 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          {/* CỘT 1 & 2: LIỆT KÊ TOÀN BỘ TÍNH NĂNG ĐỂ PHỦ KEYWORD CHO BOT QUÉT */}
          <div className="space-y-3 md:col-span-2">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest">{lang === 'vi' ? 'Danh mục chức năng chính' : 'Core System Functions'}</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-500">
              <Link href={`/${lang}/sql-formatter`} className="hover:text-blue-600 transition">&bull; Beautify / Clean SQL Syntax</Link>
              <Link href={`/${lang}/json-validator`} className="hover:text-blue-600 transition">&bull; JSON Schema Validation</Link>
              <Link href={`/${lang}/csv-to-json`} className="hover:text-blue-600 transition">&bull; Excel CSV to JSON Array</Link>
              <Link href={`/${lang}/css-minify`} className="hover:text-blue-600 transition">&bull; CSS Stylesheet Minifier</Link>
              <Link href={`/${lang}/hash-generator`} className="hover:text-blue-600 transition">&bull; MD5 & SHA-256 Encryption</Link>
              <Link href={`/${lang}/url-encoder-decoder`} className="hover:text-blue-600 transition">&bull; HTTP URL string encoding</Link>
            </div>
          </div>

          {/* CỘT 3: CHỨNG CHỈ BẢO MẬT/THÔNG TIN MẠNG LƯỚI */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest">{lang === 'vi' ? 'Tiêu chuẩn vận hành' : 'Compliance & Security'}</h4>
            <ul className="text-xs text-slate-500 space-y-1.5 list-none">
              <li>🛡️ 100% GDPR Compliant</li>
              <li>🔒 Local Storage Encryption</li>
              <li>🚀 Next.js Static Edge Cached</li>
            </ul>
          </div>

          {/* CỘT 4: PHÁP LÝ BẮT BUỘC ĐỂ DUYỆT ADSENSE */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-widest">{lang === 'vi' ? 'Điều khoản & Quy định' : 'Legal & Company'}</h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-500 font-medium">
              <Link href={`/${lang}/about`} className="hover:text-blue-600 transition">About Our Platform</Link>
              <Link href={`/${lang}/privacy-policy`} className="hover:text-blue-600 transition">Privacy & Cookie Policy</Link>
              <Link href={`/${lang}/terms-of-service`} className="hover:text-blue-600 transition">Terms of Service Agreement</Link>
            </div>
          </div>
        </div>

        {/* BẢN QUYỀN VÀ THÔNG TIN BỔ SUNG */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
          <div>&copy; 2026 Quick-Fix Tools Network. Global analytics architecture deployment.</div>
          <div className="flex space-x-3">
            <span>Status: <span className="text-green-500 font-bold">● Operational</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}