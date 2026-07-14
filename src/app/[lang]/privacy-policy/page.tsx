import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang); 
  const policyDict = dict['privacy_policy'] || {};
  
  return { 
    title: policyDict.meta_title || 'Privacy Policy', 
    description: policyDict.meta_desc || 'Privacy Policy and Terms' 
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const policyDict = dict['privacy_policy'];

  if (!policyDict) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-500">
        Privacy Policy dictionary not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-950">
          {policyDict.h1}
        </h1>
        <p className="text-sm text-slate-400 italic">
          {policyDict.last_updated}
        </p>
      </div>

      {/* Tóm tắt nhanh (Privacy Highlights - Thay thế cho Client Component Placeholder) */}
      <section className="bg-slate-50 p-6 sm:p-8 border border-slate-100 rounded-2xl shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {policyDict.highlights_title}
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {policyDict.highlights.map((item: { label: string; value: string }, index: number) => (
            <div key={index} className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </span>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-slate-200" />

      {/* Chi tiết điều khoản chuẩn SEO / AdSense */}
      <article className="prose prose-slate max-w-none text-slate-700 space-y-8 leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-800">{policyDict.intro_title}</h2>
          <p>{policyDict.intro_text}</p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-800">{policyDict.collection_title}</h2>
          <p>{policyDict.collection_text_1}</p>
          <p>{policyDict.collection_text_2}</p>
        </section>

        {/* Section 3 (Quan trọng nhất cho Google AdSense) */}
        <section className="space-y-3 p-5 bg-amber-50/50 rounded-xl border border-amber-100/50">
          <h2 className="text-2xl font-bold text-slate-800 !mt-0">{policyDict.adsense_title}</h2>
          <p>{policyDict.adsense_text_1}</p>
          <p>
            {policyDict.adsense_text_2}
            <a 
              href="https://adssettings.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800 font-medium transition-colors"
            >
              {policyDict.adsense_link_text}
            </a>.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-800">{policyDict.cookies_title}</h2>
          <p>{policyDict.cookies_text}</p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-800">{policyDict.rights_title}</h2>
          <p>{policyDict.rights_text}</p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-800">{policyDict.contact_title}</h2>
          <p>
            {policyDict.contact_text}
            <a 
              href={`mailto:${policyDict.contact_email}`} 
              className="text-blue-600 font-semibold hover:underline"
            >
              {policyDict.contact_email}
            </a>.
          </p>
        </section>

      </article>
    </div>
  );
}