import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import HashGeneratorClient from './HashGeneratorClient';
import SeoToolLanding from '@/components/SeoToolLanding';
import { languageAlternates } from '@/lib/site';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const hashDict = dict['hash_generator'] || {};
  
  return { 
    title: hashDict.meta_title || 'Cryptographic Hash Generator', 
    description: hashDict.meta_desc || 'Generate secure MD5, SHA-1, SHA-256, and SHA-512 hashes locally.',
    alternates: { canonical: `/${lang}/hash-generator`, languages: languageAlternates('hash-generator') },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  const toolDict = dict['hash_generator'] || {
    h1: 'Hash Generator Utility',
    meta_desc: 'Online cryptographic hash generator',
    placeholder: 'Enter inputs...',
    btn_format: 'Execute',
    seo_landing: {
      badge: 'Security Tool',
      title: 'Hash Generator Online',
      intro: 'Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic checksums locally.',
      keywords: ['hash generator', 'md5', 'sha256'],
      use_cases: ['Verify files', 'Integrity checks'],
      steps: ['Enter text', 'Choose algorithm', 'Copy hash'],
      faqs: [
        { q: 'Is it safe?', a: 'Yes, it runs locally in your browser.' }
      ],
      related_labels: {
        url_tool: 'URL Encoder/Decoder',
        all_tools: 'All tools'
      }
    }
  };

  const seo = toolDict.seo_landing;

  // Xây dựng danh sách các công cụ liên quan động dựa trên tham số 'lang'
  const relatedTools = [
    { href: `/${lang}/url-encoder-decoder`, label: seo.related_labels?.url_tool || 'URL Encoder/Decoder' },
    { href: `/${lang}/tools`, label: seo.related_labels?.all_tools || 'All tools' },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-10 py-6 px-4 sm:px-6">
      
      {/* Header Section */}
      <div className="space-y-2 text-center">
        <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
          {toolDict.h1}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 sm:text-base">
          {toolDict.meta_desc}
        </p>
      </div>

      {/* Main Feature Component Client-Side */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <HashGeneratorClient dict={toolDict} />
      </div>

      {/* SEO Landing Page Component */}
      <SeoToolLanding
        toolPath="hash-generator"
        lang={lang}
        badge={seo.badge}
        title={seo.title}
        intro={seo.intro}
        keywords={seo.keywords}
        useCases={seo.use_cases}
        steps={seo.steps}
        faqs={seo.faqs}
        relatedTools={relatedTools}
      />

    </div>
  );
}