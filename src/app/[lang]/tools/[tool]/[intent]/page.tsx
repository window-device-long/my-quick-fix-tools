import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SeoEmbeddedTool from '@/components/SeoEmbeddedTool';
import { getLandingCopy, getSeoIntent, getSeoTool, isSeoLandingIndexable, seoToolKeys, type SeoToolKey } from '@/lib/seo-landings';
import { languageAlternates, locales, siteName, siteUrl } from '@/lib/site';

export const revalidate = 86400;

type Props = { params: Promise<{ lang: string; tool: string; intent: string }> };

function resolve(params: { lang: string; tool: string; intent: string }) {
  if (!locales.includes(params.lang as (typeof locales)[number])) return null;
  if (!seoToolKeys.includes(params.tool as SeoToolKey)) return null;
  const tool = getSeoTool(params.tool);
  const intent = tool && getSeoIntent(tool.key, params.intent);
  if (!tool || !intent) return null;
  return { tool, intent, copy: getLandingCopy(params.lang, tool, intent) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const values = await params;
  const data = resolve(values);
  if (!data) return { robots: { index: false, follow: false } };

  const route = `tools/${data.tool.key}/${data.intent.slug}`;
  const indexable = isSeoLandingIndexable(data.tool.key, data.intent.slug);
  const canonical = `${siteUrl}/${values.lang}/${route}`;
  return {
    title: data.copy.title,
    description: data.copy.description,
    alternates: { canonical, languages: languageAlternates(route) },
    robots: { index: indexable, follow: true },
    openGraph: { title: data.copy.title, description: data.copy.description, url: canonical, siteName, type: 'website' },
    twitter: { card: 'summary', title: data.copy.title, description: data.copy.description },
  };
}

export default async function SeoIntentPage({ params }: Props) {
  const values = await params;
  const data = resolve(values);
  if (!data) notFound();

  const { tool, intent, copy } = data;
  const route = `tools/${tool.key}/${intent.slug}`;
  const pageUrl = `${siteUrl}/${values.lang}/${route}`;
  const related = tool.intents.filter((item) => item.slug !== intent.slug).slice(0, 6);
  const breadcrumb = [
    { name: values.lang === 'vi' ? 'Trang chủ' : 'Home', url: `${siteUrl}/${values.lang}` },
    { name: values.lang === 'vi' ? 'Công cụ' : 'Tools', url: `${siteUrl}/${values.lang}/tools` },
    { name: tool.name, url: `${siteUrl}/${values.lang}/${tool.mainPath}` },
    { name: intent.focus, url: pageUrl },
  ];
  const schemas = [
    {
      '@context': 'https://schema.org', '@type': 'WebApplication', name: copy.title, description: copy.description,
      applicationCategory: 'DeveloperApplication', operatingSystem: 'Web', url: pageUrl,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: copy.sections.faqs.map((faq) => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
    },
    {
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })),
    },
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumb.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {index === breadcrumb.length - 1 ? <span className="font-medium text-slate-700">{item.name}</span> : <Link href={item.url.replace(siteUrl, '')} className="hover:text-blue-600">{item.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>

      <header className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{copy.badge}</span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{copy.title}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{copy.description}</p>
      </header>

      <section aria-labelledby="interactive-tool" className="space-y-4">
        <div>
          <h2 id="interactive-tool" className="text-2xl font-bold text-slate-900">{copy.heading}</h2>
          <p className="mt-2 max-w-4xl leading-7 text-slate-600">{copy.intro}</p>
        </div>
        <SeoEmbeddedTool lang={values.lang} tool={tool.key} />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          [copy.sections.whyTitle, copy.sections.whyText],
          [copy.sections.useTitle, copy.sections.useText],
          [copy.sections.privacyTitle, copy.sections.privacyText],
        ].map(([title, text]) => (
          <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
        <h2 className="text-2xl font-bold text-slate-900">{copy.sections.howTitle}</h2>
        <ol className="mt-5 grid gap-4 md:grid-cols-2">
          {copy.sections.steps.map((step, index) => <li key={step} className="rounded-2xl bg-white p-4 text-sm leading-7 text-slate-600"><strong className="mr-2 text-blue-600">{index + 1}.</strong>{step}</li>)}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">{copy.sections.faqTitle}</h2>
        {copy.sections.faqs.map((faq) => <article key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-semibold text-slate-900">{faq.q}</h3><p className="mt-2 text-sm leading-7 text-slate-600">{faq.a}</p></article>)}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">{copy.sections.relatedTitle}</h2>
          <Link href={`/${values.lang}/${tool.mainPath}`} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">{copy.sections.openMain}</Link>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {related.map((item) => <Link key={item.slug} href={`/${values.lang}/tools/${tool.key}/${item.slug}`} className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-blue-500 hover:text-blue-600">{item.focus}</Link>)}
        </div>
      </section>

      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </main>
  );
}
