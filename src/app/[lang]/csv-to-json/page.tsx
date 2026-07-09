import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CsvToJsonClient from './CsvToJsonClient';
import SeoToolLanding from '@/components/SeoToolLanding';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params; const dict = await getDictionary(lang);
  return { title: dict['csv_to_json']?.meta_title || 'csv-to-json', description: dict['csv_to_json']?.meta_desc || 'csv-to-json tool' };
}

export default async function ToolPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const dict = await getDictionary(lang);
  const toolDict = dict['csv_to_json'] || { h1: 'csv-to-json Utility', meta_desc: 'Online web tool utility', placeholder: 'Enter inputs...', btn_format: 'Execute' };

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      <div className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">{toolDict.h1}</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">{toolDict.meta_desc}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <CsvToJsonClient dict={toolDict} />
      </div>

      <SeoToolLanding
        lang={lang}
        badge={lang === 'vi' ? 'SEO Landing Page' : 'SEO Landing Page'}
        title={lang === 'vi' ? 'Công cụ chuyển CSV sang JSON' : 'CSV to JSON Converter'}
        intro={lang === 'vi' ? 'Công cụ này giúp chuyển dữ liệu bảng tính thành JSON một cách nhanh chóng để dùng trong API, ứng dụng web và quy trình tự động hóa.' : 'This tool helps convert spreadsheet data into JSON format quickly for APIs, web apps, and automation workflows.'}
        keywords={lang === 'vi' ? ['csv to json online', 'chuyển csv sang json', 'csv converter', 'excel sang json', 'convert csv to json'] : ['csv to json online', 'convert csv to json', 'csv converter', 'excel to json converter', 'transform csv data']}
        useCases={lang === 'vi' ? ['Chuyển dữ liệu export từ Excel sang JSON', 'Chuẩn hóa dữ liệu cho API hoặc hệ thống backend', 'Tạo cấu trúc dữ liệu cho frontend'] : ['Convert spreadsheet exports into JSON', 'Normalize data for APIs and backends', 'Create structured data for frontend use']}
        steps={lang === 'vi' ? ['Dán dữ liệu CSV vào ô nhập', 'Nhấn xử lý để chuyển sang JSON', 'Sao chép kết quả để dùng trong dự án'] : ['Paste CSV data into the input box', 'Run the conversion to generate JSON', 'Copy the output for your project']}
        faqs={lang === 'vi' ? [
          { q: 'Công cụ có hỗ trợ file Excel không?', a: 'Công cụ tập trung vào dữ liệu CSV và bảng tính cơ bản, phù hợp cho export và chuyển đổi nhanh.' },
          { q: 'Có thể dùng cho API không?', a: 'Có, kết quả JSON thường được dùng làm payload cho REST API hoặc web apps.' },
          { q: 'Kết quả có dễ chỉnh sửa không?', a: 'Có, output là JSON rõ ràng và có thể dùng ngay.' },
        ] : [
          { q: 'Does it support Excel-style data?', a: 'It works well with CSV and tabular data commonly exported from spreadsheets.' },
          { q: 'Can it be used for APIs?', a: 'Yes, the JSON output is suitable for APIs and web apps.' },
          { q: 'Is the output easy to edit?', a: 'Yes, the result is structured JSON that can be reused immediately.' },
        ]}
        relatedTools={lang === 'vi' ? [
          { href: `/${lang}/json-validator`, label: 'JSON Validator' },
          { href: `/${lang}/tools`, label: 'Tất cả công cụ' },
        ] : [
          { href: `/${lang}/json-validator`, label: 'JSON Validator' },
          { href: `/${lang}/tools`, label: 'All tools' },
        ]}
      />
    </div>
  );
}
