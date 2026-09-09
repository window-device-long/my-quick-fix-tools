import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import UrlEncoderDecoderClient from './UrlEncoderDecoderClient';
import SeoToolLanding from '@/components/SeoToolLanding';
import { languageAlternates } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params; const dict = await getDictionary(lang);
  return { title: dict['url_encoder_decoder']?.meta_title || 'url-encoder-decoder', description: dict['url_encoder_decoder']?.meta_desc || 'url-encoder-decoder tool', alternates: { canonical: `/${lang}/url-encoder-decoder`, languages: languageAlternates('url-encoder-decoder') } };
}

export default async function ToolPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const dict = await getDictionary(lang);
  const toolDict = dict['url_encoder_decoder'] || { h1: 'url-encoder-decoder Utility', meta_desc: 'Online web tool utility', placeholder: 'Enter inputs...', btn_format: 'Execute' };

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      <div className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">{toolDict.h1}</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">{toolDict.meta_desc}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <UrlEncoderDecoderClient lang={lang} dict={toolDict} />
      </div>

      <SeoToolLanding
        toolPath="url-encoder-decoder"
        lang={lang}
        badge={lang === 'vi' ? 'SEO Landing Page' : 'SEO Landing Page'}
        title={lang === 'vi' ? 'Công cụ mã hóa / giải mã URL' : 'URL Encoder / Decoder'}
        intro={lang === 'vi' ? 'Công cụ này giúp bạn mã hóa hoặc giải mã URL để sử dụng đúng trong query string, API endpoint và liên kết web.' : 'This tool helps you encode and decode URLs so they work correctly in query strings, API endpoints, and browser links.'}
        keywords={lang === 'vi' ? ['url encoder decoder', 'mã hóa url', 'giải mã url', 'encode url online', 'decode url online'] : ['url encoder decoder', 'encode url online', 'decode url online', 'url percent encoding', 'url parser']}
        useCases={lang === 'vi' ? ['Xử lý query parameters và liên kết dài', 'Chuẩn bị URL cho API hoặc web app', 'Giải mã dữ liệu URL từ hệ thống khác'] : ['Handle query parameters and long links', 'Prepare URLs for APIs and web apps', 'Decode URL data from external systems']}
        steps={lang === 'vi' ? ['Dán URL hoặc chuỗi cần xử lý', 'Chọn hành động encode hoặc decode', 'Sao chép kết quả để dùng ngay'] : ['Paste the URL or string you want to transform', 'Choose encode or decode', 'Copy the result for immediate use']}
        faqs={lang === 'vi' ? [
          { q: 'Có thể dùng cho query string không?', a: 'Có. Đây là công cụ lý tưởng khi làm việc với tham số trên URL.' },
          { q: 'Có thể giải mã URL đã mã hóa không?', a: 'Có. Bạn có thể nhập chuỗi đã mã hóa để xem giá trị gốc.' },
          { q: 'Có phù hợp cho SEO không?', a: 'Có. Nó hữu ích khi làm việc với URL và cấu trúc liên kết.' },
        ] : [
          { q: 'Can it be used for query strings?', a: 'Yes. It is ideal for working with URL parameters and search strings.' },
          { q: 'Can it decode an encoded URL?', a: 'Yes. You can paste an encoded string and recover the original value.' },
          { q: 'Is it useful for SEO work?', a: 'Yes. It helps with URL structure and link preparation.' },
        ]}
        relatedTools={lang === 'vi' ? [
          { href: `/${lang}/css-minify`, label: 'CSS Minifier' },
          { href: `/${lang}/tools`, label: 'Tất cả công cụ' },
        ] : [
          { href: `/${lang}/css-minify`, label: 'CSS Minifier' },
          { href: `/${lang}/tools`, label: 'All tools' },
        ]}
      />
    </div>
  );
}
