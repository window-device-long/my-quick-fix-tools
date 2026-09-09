import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ClusterCtaButtons from '@/components/ClusterCtaButtons';
import { getSeoClusterPage } from '@/lib/seo-cluster-pages';

// Helper dịch thuật UI tĩnh theo từng locale
const getUiTranslation = (lang: string) => {
  const isVi = lang === 'vi';
  const isEs = lang === 'es';
  return {
    home: isVi ? 'Trang chủ' : isEs ? 'Inicio' : 'Home',
    tools: isVi ? 'Công cụ' : isEs ? 'Herramientas' : 'Tools',
    allTools: isVi ? 'Tất cả công cụ' : isEs ? 'Todas las herramientas' : 'All tools',
    overview: isVi ? 'Tổng quan' : isEs ? 'Visión general' : 'Overview',
    longForm: isVi ? 'Hướng dẫn chi tiết' : isEs ? 'Guía detallada' : 'Detailed Guide',
    whatIsIt: isVi ? 'Khái niệm là gì?' : isEs ? '¿Qué es esto?' : 'What is it?',
    howItWorks: isVi ? 'Cách thức hoạt động' : isEs ? 'Cómo funciona' : 'How it works',
    bestPractices: isVi ? 'Lời khuyên & Lưu ý' : isEs ? 'Buenas prácticas' : 'Best practices',
    benefits: isVi ? 'Lợi ích mang lại' : isEs ? 'Beneficios' : 'Benefits',
    whenToUse: isVi ? 'Khi nào nên dùng?' : isEs ? 'Cuándo usarlo' : 'When to use',
    quickSteps: isVi ? 'Các bước thực hiện nhanh' : isEs ? 'Pasos rápidos' : 'Quick steps',
    faq: isVi ? 'Câu hỏi thường gặp' : isEs ? 'Preguntas frecuentes' : 'FAQ',
    relatedTools: isVi ? 'Công cụ liên quan' : isEs ? 'Herramientas relacionadas' : 'Related tools',
    notFound: isVi ? 'Không tìm thấy nội dung' : isEs ? 'Página no encontrada' : 'Page not found',
    clusterTag: isVi ? 'Trang Chuyên Đề SEO' : isEs ? 'Página de Clúster SEO' : 'SEO Cluster Page',
  };
};

// Hàm an toàn để lấy văn bản đã dịch hoặc tự động fallback về tiếng Anh (en)
const getLocalizedField = (field: any, lang: string): string => {
  if (!field) return '';
  return field[lang] || field['en'] || '';
};

// Hàm an toàn để lấy mảng đã dịch hoặc tự động fallback về tiếng Anh (en)
const getLocalizedArray = (field: any, lang: string): string[] => {
  if (!field) return [];
  return field[lang] || field['en'] || [];
};

export async function generateStaticParams() {
  const { seoClusterPages } = await import('@/lib/seo-cluster-pages');
  const locales = ['en', 'es', 'vi'];
  return locales.flatMap((lang) => seoClusterPages.map((page) => ({ lang, slug: page.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = getSeoClusterPage(slug);
  if (!page) {
    return { title: 'Tool Page', description: 'Tool page' };
  }

  const title = getLocalizedField(page.title, lang);
  const description = getLocalizedField(page.description, lang);

  return {
<<<<<<< HEAD
    title: `${title} | Quick-Fix Tools`,
=======
    title: `${title} | JSNify`,
>>>>>>> 922e231 (Commit)
    description: description,
    keywords: [page.keyword?.en, page.keyword?.vi, page.tool].filter(Boolean) as string[],
    alternates: { canonical: `https://jsnify.online/${lang}/tools/${slug}` },
  };
}

export default async function ToolClusterPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const t = getUiTranslation(lang);
  const page = getSeoClusterPage(slug);

  if (!page) {
    return (
      <div className="mx-auto max-w-4xl py-16 px-4 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">{t.notFound}</h1>
        <p className="mt-4 text-slate-500">The requested content could not be found.</p>
        <Link href={`/${lang}/tools`} className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
          {t.tools}
        </Link>
      </div>
    );
  }

  // Phân giải dữ liệu đa ngôn ngữ an toàn
  const title = getLocalizedField(page.title, lang);
  const description = getLocalizedField(page.description, lang);
  const example = getLocalizedField(page.example, lang);
  const whatIsIt = getLocalizedField(page.whatIsIt, lang);
  const howItWorks = getLocalizedField(page.howItWorks, lang);
  
  const overviewList = getLocalizedArray(page.overview, lang);
  const longFormList = getLocalizedArray(page.longForm, lang);
  const bestPracticesList = getLocalizedArray(page.bestPractices, lang);
  const benefitsList = getLocalizedArray(page.benefits, lang);
  const useCasesList = getLocalizedArray(page.useCases, lang);
  const stepsList = getLocalizedArray(page.steps, lang);

  // Cấu hình các dữ liệu cấu trúc Schema.org cho SEO
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.home, item: `https://jsnify.online/${lang}` },
      { '@type': 'ListItem', position: 2, name: t.tools, item: `https://jsnify.online/${lang}/tools` },
      { '@type': 'ListItem', position: 3, name: title, item: `https://jsnify.online/${lang}/tools/${slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    keywords: [page.keyword?.en, page.keyword?.vi, page.tool].filter(Boolean),
    inLanguage: lang,
    mainEntityOfPage: `https://jsnify.online/${lang}/tools/${slug}`,
<<<<<<< HEAD
    author: { '@type': 'Organization', name: 'Quick-Fix Tools' },
    publisher: { '@type': 'Organization', name: 'Quick-Fix Tools' },
=======
    author: { '@type': 'Organization', name: 'JSNify' },
    publisher: { '@type': 'Organization', name: 'JSNify' },
>>>>>>> 922e231 (Commit)
    articleSection: lang === 'vi' ? 'Công cụ trực tuyến' : 'Online tools',
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    totalTime: 'PT5M',
    step: stepsList.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `${lang === 'vi' ? 'Bước' : 'Step'} ${index + 1}`,
      text: step,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq?.map((item) => ({
      '@type': 'Question',
      name: getLocalizedField(item.q, lang),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getLocalizedField(item.a, lang),
      },
    })) || [],
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-8 px-4 sm:px-6">
      {/* Khai báo Schema structured data phục vụ SEO của Google */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb điều hướng */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={`/${lang}`} className="hover:text-blue-600 transition-colors">
              {t.home}
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li>
            <Link href={`/${lang}/tools`} className="hover:text-blue-600 transition-colors">
              {t.tools}
            </Link>
          </li>
          <li className="text-slate-300">/</li>
          <li className="font-semibold text-slate-800 line-clamp-1">{title}</li>
        </ol>
      </nav>

      {/* Hero Box & Kêu gọi hành động (CTA) */}
      <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-12 -mt-12 h-32 w-32 rounded-full bg-blue-50/70 blur-2xl pointer-events-none" />
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            {t.clusterTag}
          </span>
          {page.icon && <span className="text-3xl filter drop-shadow-sm select-none">{page.icon}</span>}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl !leading-snug">
          {title}
        </h1>
        <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
          {description}
        </p>
        <div className="pt-2">
          <ClusterCtaButtons href={`/${lang}/${page.tool}`} example={example} lang={lang} />
        </div>
      </section>

      {/* Khối Tổng quan (Overview) */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
          {t.overview}
        </h2>
        <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
          {overviewList.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </section>

      {/* Khối Nội dung dài SEO (Long-form Content) */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">
          {t.longForm}
        </h2>
        <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
          {longFormList.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </section>

      {/* Khối khái niệm 3 cột (What / How / Best Practices) */}
      <section className="grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            {t.whatIsIt}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{whatIsIt}</p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {t.howItWorks}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">{howItWorks}</p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            {t.bestPractices}
          </h3>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
            {bestPracticesList.map((item, i) => (
              <li key={i} className="flex gap-2.5 items-start">
                <span className="text-amber-500 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Khối 2 cột: Lợi ích và Trường hợp sử dụng (Benefits & Use Cases) */}
      <section className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">{t.benefits}</h2>
          <ul className="mt-5 space-y-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
            {benefitsList.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">{t.whenToUse}</h2>
          <ul className="mt-5 space-y-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
            {useCasesList.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-xs">➔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Khối các bước thực hiện nhanh */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">{t.quickSteps}</h2>
        <ol className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-slate-600">
          {stepsList.map((step, index) => (
            <li key={step} className="flex gap-4 items-start">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Khối Câu hỏi thường gặp (FAQs) */}
      {page.faq && page.faq.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">{t.faq}</h2>
          <div className="mt-6 space-y-4">
            {page.faq.map((item, i) => {
              const question = getLocalizedField(item.q, lang);
              const answer = getLocalizedField(item.a, lang);
              return (
                <div key={i} className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
                  <p className="font-bold text-slate-900 text-base">{question}</p>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-500">{answer}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Khối các công cụ liên quan (Internal Linking) */}
      {page.relatedTools && page.relatedTools.length > 0 && (
        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">{t.relatedTools}</h2>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {page.relatedTools.map((tool) => (
              <Link 
                key={tool} 
                href={`/${lang}/${tool === 'tools' ? 'tools' : tool}`} 
                className="rounded-xl border border-slate-200 bg-white px-4.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600 hover:shadow-sm"
              >
                {tool === 'tools' ? t.allTools : tool}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}