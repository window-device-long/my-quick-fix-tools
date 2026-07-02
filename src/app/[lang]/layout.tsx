import React from 'react';
import '../globals.css';
import Header from '@/components/Header';

export function generateStaticParams() { 
  return [{ lang: 'en' }, { lang: 'es' }, { lang: 'vi' }]; 
}

export default async function LangLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode; 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;

  // Khai báo tập trung danh mục công cụ để cấp cho cả Header và Dashboard
  const toolsData = [
    { path: 'sql-formatter', title: lang === 'vi' ? 'SQL Formatter' : 'SQL Formatter & Minifier', category: lang === 'vi' ? 'Database' : 'Database Utilities' },
    { path: 'json-validator', title: 'JSON Validator', category: lang === 'vi' ? 'Database' : 'Database Utilities' },
    { path: 'csv-to-json', title: 'CSV to JSON Converter', category: lang === 'vi' ? 'Database' : 'Database Utilities' },
    { path: 'css-minify', title: 'CSS Code Minifier', category: lang === 'vi' ? 'Tối ưu hóa' : 'Optimization' },
    { path: 'hash-generator', title: 'Crypto Hash Generator', category: lang === 'vi' ? 'Tối ưu hóa' : 'Optimization' },
    { path: 'url-encoder-decoder', title: 'URL Encoder / Decoder', category: lang === 'vi' ? 'Tối ưu hóa' : 'Optimization' },
  ];

  return (
    <html lang={lang}>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col">
        {/* Tích hợp Header toàn cục */}
        <Header lang={lang} tools={toolsData} />
        
        <main className="flex-grow container mx-auto px-4 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}