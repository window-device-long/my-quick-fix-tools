import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/get-dictionary';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  const homeDict = dict.home_page;
  const commonDict = dict.common;

  // Dữ liệu danh sách công cụ đồng bộ hoàn toàn từ file JSON dịch thuật
  const activeTools = [
    { 
      path: 'sql-formatter', 
      title: homeDict.tools.sql_formatter.title, 
      desc: homeDict.tools.sql_formatter.desc, 
      category: 'Database' 
    },
    { 
      path: 'json-validator', 
      title: homeDict.tools.json_validator.title, 
      desc: homeDict.tools.json_validator.desc, 
      category: 'Database' 
    },
    { 
      path: 'csv-to-json', 
      title: homeDict.tools.csv_to_json.title, 
      desc: homeDict.tools.csv_to_json.desc, 
      category: 'Database' 
    },
    { 
      path: 'css-minify', 
      title: homeDict.tools.css_minify.title, 
      desc: homeDict.tools.css_minify.desc, 
      category: 'Optimization' 
    },
    { 
      path: 'hash-generator', 
      title: homeDict.tools.hash_generator.title, 
      desc: homeDict.tools.hash_generator.desc, 
      category: 'Optimization' 
    },
    { 
      path: 'url-encoder-decoder', 
      title: homeDict.tools.url_encoder_decoder.title, 
      desc: homeDict.tools.url_encoder_decoder.desc, 
      category: 'Optimization' 
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-6 px-4 sm:px-6">
      
      {/* HERO SECTION CHUẨN QUỐC TẾ */}
      <section className="text-center space-y-5 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 select-none">
          {homeDict.badge}
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent pb-1">
          {commonDict?.title || 'JSNify'}
        </h1>
        <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
          {commonDict?.description}
        </p>
      </section>

      {/* DASHBOARD GRID */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span>🎯</span> {homeDict.utilities_title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTools.map((tool) => (
            <Link 
              key={tool.path}
              href={`/${lang}/${tool.path}`}
              className="group relative flex flex-col justify-between p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                  {tool.category}
                </span>
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition text-base mt-2">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {tool.desc}
                </p>
              </div>
              <div className="text-xs font-bold text-blue-600 mt-5 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>{homeDict.launch_tool}</span>
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}