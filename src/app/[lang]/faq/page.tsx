import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const faqDict = dict['faq_page'] || {};

  return {
<<<<<<< HEAD
    title: faqDict.meta_title || 'FAQ | Quick-Fix Tools',
=======
    title: faqDict.meta_title || 'FAQ | JSNify',
>>>>>>> 922e231 (Commit)
    description: faqDict.meta_desc || 'Common questions about online web tools.',
  };
}

export default async function FaqPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const faqDict = dict['faq_page'];

  if (!faqDict) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-slate-500">
        FAQ dictionary not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-12 py-8 px-4 sm:px-6">
      
      {/* Header Section */}
      <div className="space-y-4 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {faqDict.h1}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          {faqDict.subtitle}
        </p>
      </div>

      {/* Accordion/List Section */}
      <div className="space-y-5">
        {faqDict.faqs.map((item: { q: string; a: string }, index: number) => (
          <div 
            key={index} 
            className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:border-slate-300 transition-colors duration-200"
          >
            <h2 className="text-lg font-bold text-slate-900 flex gap-3 items-start">
              <span className="text-indigo-600 font-semibold select-none">Q:</span>
              <span>{item.q}</span>
            </h2>
            <div className="mt-3 pl-6 border-l-2 border-indigo-50/80 text-sm leading-7 text-slate-600 space-y-2">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 text-center space-y-4 shadow-md">
        <h3 className="text-xl font-bold">{faqDict.contact_box.title}</h3>
        <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed">
          {faqDict.contact_box.desc}
        </p>
        <div className="pt-2">
          <a
            href="mailto:support@findtoolpdf.online"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-slate-900 bg-white hover:bg-slate-50 shadow-sm transition-all duration-200"
          >
            {faqDict.contact_box.button}
          </a>
        </div>
      </div>

    </div>
  );
}