import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import JsonValidatorClient from './JsonValidatorClient';
import SeoToolLanding from '@/components/SeoToolLanding';
import { languageAlternates } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params; const dict = await getDictionary(lang);
  return { title: dict['json_validator']?.meta_title || 'json-validator', description: dict['json_validator']?.meta_desc || 'json-validator tool', alternates: { canonical: `/${lang}/json-validator`, languages: languageAlternates('json-validator') } };
}

export default async function ToolPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const dict = await getDictionary(lang);
  const toolDict = dict['json_validator'] || { h1: 'json-validator Utility', meta_desc: 'Online web tool utility', placeholder: 'Enter inputs...', btn_format: 'Execute' };

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      <div className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">{toolDict.h1}</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">{toolDict.meta_desc}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <JsonValidatorClient lang={lang} dict={toolDict} />
      </div>

      <SeoToolLanding
        toolPath="json-validator"
        lang={lang}
        badge={lang === 'vi' ? 'SEO Landing Page' : 'SEO Landing Page'}
        title={lang === 'vi' ? 'Công cụ kiểm tra JSON trực tuyến' : 'JSON Validator Online'}
        intro={lang === 'vi' ? 'Công cụ kiểm tra JSON giúp bạn xác minh cú pháp, làm đẹp cấu trúc dữ liệu và kiểm tra payload API trong vài giây. Đây là một giải pháp hữu ích cho developer, QA và marketer làm việc với dữ liệu.' : 'This JSON validator helps you verify syntax, beautify data structure, and inspect API payloads in seconds. It is a practical tool for developers, QA teams, and marketers working with data.'}
        keywords={lang === 'vi' ? ['json validator online', 'kiểm tra json', 'json formatter', 'parse json', 'validate json syntax'] : ['json validator online', 'validate json syntax', 'json formatter', 'parse json', 'check json structure']}
        useCases={lang === 'vi' ? ['Kiểm tra API response trước khi dùng trong frontend', 'Debug cấu trúc dữ liệu bị lỗi', 'Làm đẹp JSON để đọc và chia sẻ'] : ['Check API responses before using them in the frontend', 'Debug malformed data structures', 'Beautify JSON for easier sharing and review']}
        steps={lang === 'vi' ? ['Dán dữ liệu JSON vào ô nhập', 'Nhấn xử lý để kiểm tra và định dạng', 'Sao chép kết quả để dùng ngay'] : ['Paste your JSON into the input box', 'Run the validator to check and format it', 'Copy the output for immediate use']}
        faqs={lang === 'vi' ? [
          { q: 'Có thể kiểm tra JSON lỗi không?', a: 'Có. Công cụ sẽ báo lỗi cú pháp và giúp bạn thấy cấu trúc bị sai ở đâu.' },
          { q: 'Dữ liệu có được gửi đi không?', a: 'Không. Tất cả xử lý đều diễn ra trên trình duyệt của bạn.' },
          { q: 'Có phù hợp cho API không?', a: 'Có. Đây là công cụ hữu ích khi kiểm tra response và payload API.' },
        ] : [
          { q: 'Can it check invalid JSON?', a: 'Yes. The tool reports syntax issues and helps you identify malformed structure quickly.' },
          { q: 'Is data sent to a server?', a: 'No. Everything is processed locally in your browser.' },
          { q: 'Is it useful for APIs?', a: 'Yes. It is especially helpful for validating API responses and payloads.' },
        ]}
        relatedTools={lang === 'vi' ? [
          { href: `/${lang}/csv-to-json`, label: 'CSV sang JSON' },
          { href: `/${lang}/tools`, label: 'Tất cả công cụ' },
        ] : [
          { href: `/${lang}/csv-to-json`, label: 'CSV to JSON Converter' },
          { href: `/${lang}/tools`, label: 'All tools' },
        ]}
      />
    </div>
  );
}
