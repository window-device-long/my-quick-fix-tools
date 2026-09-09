import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const aboutDict = dict['about_page'] || {};
  
  return {
<<<<<<< HEAD
    title: aboutDict.meta_title || 'About Us - QuickFix Studio',
=======
    title: aboutDict.meta_title || 'About Us - JSNify',
>>>>>>> 922e231 (Commit)
    description: aboutDict.meta_desc || 'Learn more about our tools.',
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const aboutDict = dict['about_page'];

  if (!aboutDict) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-slate-500">
        About dictionary not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10 px-4 sm:px-6">
      
      {/* Header Title Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent pb-1">
          {aboutDict.h1}
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {aboutDict.subtitle}
        </p>
      </div>

      {/* Visual Infographic Grid (Thay cho component Client giả định cũ) */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
        {[
          { metric: '100%', label: lang === 'vi' ? 'Mã chạy Client' : 'Client-Side Execution' },
          { metric: '0', label: lang === 'vi' ? 'Lưu trữ máy chủ' : 'Server Logs Saved' },
          { metric: 'Free', label: lang === 'vi' ? 'Không phí ẩn' : 'No Paid Upgrades' },
          { metric: '<50ms', label: lang === 'vi' ? 'Tốc độ phản hồi' : 'Local Response Time' },
        ].map((item, index) => (
          <div key={index} className="text-center p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
            <div className="text-2xl font-black text-indigo-600">{item.metric}</div>
            <div className="text-xs font-semibold text-slate-400 mt-1">{item.label}</div>
          </div>
        ))}
      </section>

      <hr className="border-slate-200" />

      {/* Main Semantic Article Content */}
      <article className="prose prose-slate max-w-none text-slate-700 space-y-10">
        
        {/* Mission Segment */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {aboutDict.mission_title}
          </h2>
          <p className="text-sm sm:text-base leading-8 text-slate-600">
            {aboutDict.mission_desc}
          </p>
        </section>

        {/* Core Values Grid Segment */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {aboutDict.values_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            {aboutDict.values.map((val: { title: string; desc: string }, index: number) => (
              <div 
                key={index} 
                className="p-6 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-2 hover:bg-white hover:border-blue-400 hover:shadow-sm transition-all duration-200"
              >
                <h3 className="font-bold text-slate-900 text-sm">{val.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Architecture Segment */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {aboutDict.tech_title}
          </h2>
          <p className="text-sm sm:text-base leading-8 text-slate-600">
            {aboutDict.tech_desc}
          </p>
        </section>

      </article>

      {/* Contextual Action Banner */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-5 shadow-sm">
        <h3 className="text-xl font-bold">{aboutDict.cta_title}</h3>
        <p className="text-slate-400 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
          {aboutDict.cta_desc}
        </p>
        <div className="pt-2">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all duration-200"
          >
            {aboutDict.cta_btn}
          </Link>
        </div>
      </section>

    </div>
  );
}