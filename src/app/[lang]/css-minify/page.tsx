import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CssMinifyClient from './CssMinifyClient';
import SeoToolLanding from '@/components/SeoToolLanding';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params; const dict = await getDictionary(lang);
  return { title: dict['css_minify']?.meta_title || 'css-minify', description: dict['css_minify']?.meta_desc || 'css-minify tool' };
}

export default async function ToolPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const dict = await getDictionary(lang);
  const toolDict = dict['css_minify'] || { h1: 'css-minify Utility', meta_desc: 'Online web tool utility', placeholder: 'Enter inputs...', btn_format: 'Execute' };

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      <div className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">{toolDict.h1}</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">{toolDict.meta_desc}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <CssMinifyClient dict={toolDict} />
      </div>

      <SeoToolLanding
        lang={lang}
        badge={lang === 'vi' ? 'SEO Landing Page' : 'SEO Landing Page'}
        title={lang === 'vi' ? 'Công cụ nén CSS trực tuyến' : 'CSS Minifier Online'}
        intro={lang === 'vi' ? 'Công cụ nén CSS giúp giảm dung lượng stylesheet bằng cách loại bỏ khoảng trắng và ký tự thừa, phục vụ tốt cho tối ưu hiệu suất và tốc độ tải trang.' : 'This CSS minifier reduces stylesheet size by removing unnecessary whitespace and redundant formatting, which helps improve performance and loading speed.'}
        keywords={lang === 'vi' ? ['css minifier online', 'nén css', 'minify css', 'compress css', 'tối ưu css'] : ['css minifier online', 'minify css', 'compress css', 'optimize css', 'css compressor']}
        useCases={lang === 'vi' ? ['Chuẩn bị CSS cho production', 'Tối ưu tốc độ tải website', 'Giảm dung lượng file stylesheet'] : ['Prepare CSS for production deployment', 'Optimize website speed and performance', 'Reduce stylesheet file size']}
        steps={lang === 'vi' ? ['Dán mã CSS vào ô nhập', 'Nhấn xử lý để nén CSS', 'Sao chép kết quả cho dự án'] : ['Paste your CSS into the input box', 'Run the minification process', 'Copy the output for your project']}
        faqs={lang === 'vi' ? [
          { q: 'Có ảnh hưởng đến mã CSS không?', a: 'Nó chủ yếu loại bỏ khoảng trắng và định dạng không cần thiết, không làm thay đổi ý nghĩa CSS.' },
          { q: 'Có phù hợp cho production không?', a: 'Có. Đây là cách phổ biến để giảm dung lượng file trước khi deploy.' },
          { q: 'Có cần đăng nhập không?', a: 'Không, công cụ hoạt động trực tiếp trên trình duyệt.' },
        ] : [
          { q: 'Does it affect CSS behavior?', a: 'It mainly removes whitespace and redundant formatting, so the CSS logic remains intact.' },
          { q: 'Is it suitable for production?', a: 'Yes. It is a common way to reduce file size before deployment.' },
          { q: 'Do I need to sign in?', a: 'No, the tool works directly in your browser.' },
        ]}
        relatedTools={lang === 'vi' ? [
          { href: `/${lang}/url-encoder-decoder`, label: 'URL Encoder/Decoder' },
          { href: `/${lang}/tools`, label: 'Tất cả công cụ' },
        ] : [
          { href: `/${lang}/url-encoder-decoder`, label: 'URL Encoder/Decoder' },
          { href: `/${lang}/tools`, label: 'All tools' },
        ]}
      />
    </div>
  );
}
