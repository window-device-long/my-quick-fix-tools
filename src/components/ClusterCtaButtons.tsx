'use client';

import Link from 'next/link';
import { useState } from 'react';

type Props = {
  href: string;
  example: string;
  lang: string;
};

export default function ClusterCtaButtons({ href, example, lang }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(example);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        href={href}
        className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        {lang === 'vi' ? 'Dùng ngay' : 'Try it now'}
      </Link>
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
      >
        {copied ? (lang === 'vi' ? 'Đã sao chép' : 'Copied') : (lang === 'vi' ? 'Sao chép ví dụ' : 'Copy example')}
      </button>
    </div>
  );
}
