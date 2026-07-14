import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' },
    { lang: 'vi' },
    { lang: 'fr' },
    { lang: 'de' },
    { lang: 'ja' },
  ];
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const toolsData = [
    {
      path: 'sql-formatter',
      title: lang === 'vi' ? 'SQL Formatter' : 'SQL Formatter & Minifier',
      category: lang === 'vi' ? 'Database' : 'Database Utilities',
    },
    {
      path: 'json-validator',
      title: 'JSON Validator',
      category: lang === 'vi' ? 'Database' : 'Database Utilities',
    },
    {
      path: 'csv-to-json',
      title: 'CSV to JSON Converter',
      category: lang === 'vi' ? 'Database' : 'Database Utilities',
    },
    {
      path: 'css-minify',
      title: 'CSS Code Minifier',
      category: lang === 'vi' ? 'Tối ưu hóa' : 'Optimization',
    },
    {
      path: 'hash-generator',
      title: 'Crypto Hash Generator',
      category: lang === 'vi' ? 'Tối ưu hóa' : 'Optimization',
    },
    {
      path: 'url-encoder-decoder',
      title: 'URL Encoder / Decoder',
      category: lang === 'vi' ? 'Tối ưu hóa' : 'Optimization',
    },
  ];

  return (
    <>
      <Header lang={lang} tools={toolsData} />

      <main className="flex-grow container mx-auto px-4 py-10">
        {children}
      </main>

      <Footer lang={lang} />
    </>
  );
}