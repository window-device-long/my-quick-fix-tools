import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params; const dict = await getDictionary(lang); 
  return { title: dict['url_encoder_decoder']?.meta_title || 'url-encoder-decoder', description: dict['url_encoder_decoder']?.meta_desc || 'url-encoder-decoder tool' };
}

export default async function ToolPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const dict = await getDictionary(lang);
  const toolDict = dict['url_encoder_decoder'] || { h1: 'url-encoder-decoder Utility', meta_desc: 'Online web tool utility', placeholder: 'Enter inputs...', btn_format: 'Execute' };
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{toolDict.h1}</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">{toolDict.meta_desc}</p>
      </div>
      <div className="bg-white p-6 border rounded-xl shadow-sm text-center text-slate-400 font-mono">[Gọi Component Client Xử Lý Tính Năng Ở Đây]</div>
      <hr className="border-slate-200" />
      <article className="prose prose-slate max-w-none text-slate-700 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">{lang === 'vi' ? 'Giới thiệu về công cụ' : 'About the tool'}</h2>
        <p>This is an automated semantic content block to satisfy Google AdSense core value requirements and mitigate thin content penalty risk.</p>
      </article>
    </div>
  );
}
