import Link from 'next/link';

interface FaqItem {
  q: string;
  a: string;
}

interface RelatedTool {
  href: string;
  label: string;
}

interface SeoToolLandingProps {
  lang: string;
  badge: string;
  title: string;
  intro: string;
  keywords: string[];
  useCases: string[];
  steps: string[];
  faqs: FaqItem[];
  relatedTools: RelatedTool[];
}

export default function SeoToolLanding({
  lang,
  badge,
  title,
  intro,
  keywords,
  useCases,
  steps,
  faqs,
  relatedTools,
}: SeoToolLandingProps) {
  const isVi = lang === 'vi';

  const breadcrumb = [
    { label: isVi ? 'Trang chủ' : 'Home', href: `/${lang}` },
    { label: isVi ? 'Công cụ' : 'Tools', href: `/${lang}/tools` },
    { label: title, href: '#' },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: intro,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    url: `https://yourdomain.com/${lang}${typeof window !== 'undefined' ? window.location.pathname : ''}`,
    potentialAction: {
      '@type': 'UseAction',
      target: `https://yourdomain.com/${lang}/tools`,
    },
    faq: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `https://yourdomain.com${item.href}`,
      })),
    },
  };

  return (
    <article className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm sm:p-8">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumb.map((item, index) => (
            <li key={item.label} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {index === breadcrumb.length - 1 ? (
                <span className="font-medium text-slate-700">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <section className="space-y-3">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">{badge}</span>
        <h2 className="text-2xl font-bold text-slate-800">{isVi ? 'Giới thiệu về công cụ' : 'About the tool'}</h2>
        <p className="text-base leading-8 text-slate-600">{intro}</p>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-800">{isVi ? 'Từ khóa SEO chính' : 'Primary SEO keywords'}</h3>
        <p className="text-sm leading-7 text-slate-600">{keywords.join(', ')}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl bg-slate-50 p-5">
          <h3 className="text-xl font-semibold text-slate-800">{isVi ? 'Khi nào nên dùng' : 'When to use it'}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
            {useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="text-xl font-semibold text-slate-800">{isVi ? 'Cách dùng nhanh' : 'Quick start'}</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-800">{isVi ? 'Câu hỏi thường gặp' : 'Frequently asked questions'}</h3>
        <div className="space-y-3">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl bg-slate-50 p-4">
              <p className="font-semibold text-slate-800">{item.q}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-800">{isVi ? 'Công cụ liên quan' : 'Related tools'}</h3>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600">
              {tool.label}
            </Link>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </article>
  );
}
