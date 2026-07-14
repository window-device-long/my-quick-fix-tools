import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import SqlClientTool from './SqlClientTool';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.sql.meta_title,
    description: dict.sql.meta_desc,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const sqlDict = dict.sql;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">{sqlDict.h1}</h1>
      </div>

      {/* Giao diện chính của Tool */}
      <SqlClientTool dict={sqlDict} />

      <hr className="border-slate-200 my-12" />

      {/* SEO & Rich Content Area */}
      <article className="prose prose-slate max-w-none text-slate-700 space-y-12 pb-16">
        
        {/* SECTION 1: Giới thiệu */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">{sqlDict.intro_title}</h2>
          <p className="leading-relaxed text-base">{sqlDict.intro_desc}</p>
        </section>

        {/* SECTION 2: Lý do nên định dạng (3 lý do lớn giúp tăng độ dài và giá trị) */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">{sqlDict.why_title}</h2>
          <div className="grid md:grid-cols-3 gap-6 !mt-4">
            {sqlDict.why_reasons.map((reason: { title: string; desc: string }, index: number) => (
              <div key={index} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-2">
                <h4 className="text-lg font-bold text-slate-800 !mt-0">{reason.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed !mb-0">{reason.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Tính năng cốt lõi */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">{sqlDict.features_title}</h3>
          <ul className="list-disc pl-5 space-y-3 text-base">
            {sqlDict.features_list.map((feature: { bold: string; text: string }, index: number) => (
              <li key={index} className="leading-relaxed">
                <strong className="text-slate-800">{feature.bold}</strong> {feature.text}
              </li>
            ))}
          </ul>
        </section>

        {/* SECTION 4: Hướng dẫn sử dụng & Mẹo nhỏ */}
        <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 !mt-0">{sqlDict.guide_title}</h3>
          <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-600">
            {sqlDict.guide_steps.map((step: string, index: number) => (
              <li key={index} className="leading-relaxed">{step}</li>
            ))}
          </ol>
          <div className="border-t border-slate-200/60 pt-4 mt-4">
            <p className="text-xs italic text-slate-500 !mb-0">{sqlDict.pro_tip}</p>
          </div>
        </section>

      </article>
    </div>
  );
}