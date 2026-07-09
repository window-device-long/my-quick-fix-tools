import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import HashGeneratorClient from './HashGeneratorClient';
import SeoToolLanding from '@/components/SeoToolLanding';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params; const dict = await getDictionary(lang);
  return { title: dict['hash_generator']?.meta_title || 'hash-generator', description: dict['hash_generator']?.meta_desc || 'hash-generator tool' };
}

export default async function ToolPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const dict = await getDictionary(lang);
  const toolDict = dict['hash_generator'] || { h1: 'hash-generator Utility', meta_desc: 'Online web tool utility', placeholder: 'Enter inputs...', btn_format: 'Execute' };

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6">
      <div className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">{toolDict.h1}</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">{toolDict.meta_desc}</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <HashGeneratorClient dict={toolDict} />
      </div>

      <SeoToolLanding
        lang={lang}
        badge={lang === 'vi' ? 'SEO Landing Page' : 'SEO Landing Page'}
        title={lang === 'vi' ? 'Công cụ tạo hash trực tuyến' : 'Hash Generator Online'}
        intro={lang === 'vi' ? 'Công cụ tạo hash giúp bạn sinh các giá trị băm như MD5, SHA-1, SHA-256 và SHA-512 để dùng cho xác minh, lưu trữ và kiểm tra dữ liệu.' : 'This hash generator lets you create MD5, SHA-1, SHA-256, and SHA-512 values for verification, storage, and data integrity checks.'}
        keywords={lang === 'vi' ? ['hash generator online', 'tạo hash', 'md5 generator', 'sha256 generator', 'checksum generator'] : ['hash generator online', 'create hash', 'md5 generator', 'sha256 generator', 'checksum generator']}
        useCases={lang === 'vi' ? ['Xác minh nội dung hoặc tệp dữ liệu', 'Tạo checksum cho hệ thống và lưu trữ', 'So sánh giá trị băm trước và sau khi xử lý'] : ['Verify content or data files', 'Create checksums for systems and storage', 'Compare hashes before and after processing']}
        steps={lang === 'vi' ? ['Nhập văn bản cần băm', 'Chọn thuật toán phù hợp', 'Sao chép kết quả hash'] : ['Enter the text you want to hash', 'Choose the appropriate algorithm', 'Copy the generated hash output']}
        faqs={lang === 'vi' ? [
          { q: 'Có an toàn để dùng không?', a: 'Có. Công cụ chạy trên trình duyệt và không gửi dữ liệu đi đâu.' },
          { q: 'Thuật toán nào nên dùng?', a: 'SHA-256 thường phù hợp cho hầu hết mục đích kiểm tra và xác thực.' },
          { q: 'Có thể dùng cho password không?', a: 'Hash không nên dùng thay thế cho thuật toán mật khẩu chuyên dụng, nhưng phù hợp cho kiểm tra giá trị.' },
        ] : [
          { q: 'Is it safe to use?', a: 'Yes. The tool runs in your browser and does not send your input elsewhere.' },
          { q: 'Which algorithm should I choose?', a: 'SHA-256 is a strong default for general verification and integrity checks.' },
          { q: 'Can it be used for passwords?', a: 'Hashing is useful for verification, but password storage should use a dedicated password hashing method.' },
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
