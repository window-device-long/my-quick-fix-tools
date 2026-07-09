import Link from 'next/link';
import type { Metadata } from 'next';
import ClusterCtaButtons from '@/components/ClusterCtaButtons';
import { getSeoClusterPage } from '@/lib/seo-cluster-pages';

export async function generateStaticParams() {
  const { seoClusterPages } = await import('@/lib/seo-cluster-pages');
  const locales = ['en', 'es', 'vi'];
  return locales.flatMap((lang) => seoClusterPages.map((page) => ({ lang, slug: page.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const isVi = lang === 'vi';
  const page = getSeoClusterPage(slug);
  if (!page) {
    return { title: 'Tool Page', description: 'Tool page' };
  }
  return {
    title: isVi ? page.title.vi : page.title.en,
    description: isVi ? page.description.vi : page.description.en,
    keywords: [page.keyword.en, page.keyword.vi, page.tool],
    alternates: { canonical: `https://jsnify.online/${lang}/tools/${slug}` },
  };
}

export default async function ToolClusterPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const isVi = lang === 'vi';
  const page = getSeoClusterPage(slug);

  if (!page) {
    return (
      <div className="mx-auto max-w-4xl py-10 text-slate-700">
        <h1 className="text-3xl font-bold">{isVi ? 'Không tìm thấy nội dung' : 'Page not found'}</h1>
      </div>
    );
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isVi ? 'Trang chủ' : 'Home', item: `https://jsnify.online/${lang}` },
      { '@type': 'ListItem', position: 2, name: isVi ? 'Công cụ' : 'Tools', item: `https://jsnify.online/${lang}/tools` },
      { '@type': 'ListItem', position: 3, name: isVi ? page.title.vi : page.title.en, item: `https://jsnify.online/${lang}/tools/${slug}` },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isVi ? page.title.vi : page.title.en,
    description: isVi ? page.description.vi : page.description.en,
    keywords: [page.keyword.en, page.keyword.vi, page.tool],
    inLanguage: lang,
    mainEntityOfPage: `https://jsnify.online/${lang}/tools/${slug}`,
    author: { '@type': 'Organization', name: 'Quick-Fix Tools' },
    publisher: { '@type': 'Organization', name: 'Quick-Fix Tools' },
    articleSection: isVi ? 'Công cụ trực tuyến' : 'Online tools',
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isVi ? page.title.vi : page.title.en,
    description: isVi ? page.description.vi : page.description.en,
    totalTime: 'PT5M',
    step: (isVi ? page.steps.vi : page.steps.en).map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `${isVi ? 'Bước' : 'Step'} ${index + 1}`,
      text: step,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: isVi ? item.q.vi : item.q.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isVi ? item.a.vi : item.a.en,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href={`/${lang}`} className="hover:text-blue-600">{isVi ? 'Trang chủ' : 'Home'}</Link></li>
          <li>/</li>
          <li><Link href={`/${lang}/tools`} className="hover:text-blue-600">{isVi ? 'Công cụ' : 'Tools'}</Link></li>
          <li>/</li>
          <li className="text-slate-500">{isVi ? page.title.vi : page.title.en}</li>
        </ol>
      </nav>

      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">SEO Cluster Page</span>
          <span className="text-3xl">{page.icon}</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{isVi ? page.title.vi : page.title.en}</h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-600">{isVi ? page.description.vi : page.description.en}</p>
        <ClusterCtaButtons href={`/${lang}/${page.tool}`} example={isVi ? page.example.vi : page.example.en} lang={lang} />
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">{isVi ? 'Tổng quan' : 'Overview'}</h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
          {(isVi ? page.overview.vi : page.overview.en).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </article>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">{isVi ? 'Nội dung dài hơn theo ý định tìm kiếm' : 'Long-form content for search intent'}</h2>
        <div className="mt-4 space-y-4 text-sm leading-8 text-slate-600">
          {(isVi ? page.longForm.vi : page.longForm.en).map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800">{isVi ? 'What is it' : 'What is it'}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{isVi ? page.whatIsIt.vi : page.whatIsIt.en}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800">{isVi ? 'How it works' : 'How it works'}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{isVi ? page.howItWorks.vi : page.howItWorks.en}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-800">{isVi ? 'Best practices' : 'Best practices'}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
            {(isVi ? page.bestPractices.vi : page.bestPractices.en).map((item) => (
              <li key={item} className="flex gap-2"><span className="text-blue-600">•</span><span>{item}</span></li>
            ))}
          </ul>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-800">{isVi ? 'Lợi ích' : 'Benefits'}</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            {(isVi ? page.benefits.vi : page.benefits.en).map((item) => (
              <li key={item} className="flex gap-2"><span className="text-blue-600">•</span><span>{item}</span></li>
            ))}
          </ul>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-800">{isVi ? 'Khi nào nên dùng' : 'When to use it'}</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
            {(isVi ? page.useCases.vi : page.useCases.en).map((item) => (
              <li key={item} className="flex gap-2"><span className="text-blue-600">•</span><span>{item}</span></li>
            ))}
          </ul>
        </article>
      </div>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">{isVi ? 'Cách dùng nhanh' : 'Quick steps'}</h2>
        <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
          {(isVi ? page.steps.vi : page.steps.en).map((step, index) => (
            <li key={step} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">{index + 1}</span><span>{step}</span></li>
          ))}
        </ol>
      </article>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-800">{isVi ? 'FAQ' : 'FAQ'}</h2>
        <div className="mt-4 space-y-4">
          {page.faq.map((item) => (
            <div key={item.q.en} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">{isVi ? item.q.vi : item.q.en}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{isVi ? item.a.vi : item.a.en}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800">{isVi ? 'Công cụ liên quan' : 'Related tools'}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {page.relatedTools.map((tool) => (
            <Link key={tool} href={`/${lang}/${tool === 'tools' ? 'tools' : tool}`} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600">
              {tool === 'tools' ? (isVi ? 'Tất cả công cụ' : 'All tools') : tool}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
