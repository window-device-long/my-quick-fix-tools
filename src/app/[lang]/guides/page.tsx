import Link from 'next/link';
import type { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';

type GuideItem = { path: string; title: string; summary: string };


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.guides.title} | JSNify`,
    description: dictionary.guides.description,
  };
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const dictionary = await getDictionary(lang);

  const guides = dictionary.guides.items;

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {dictionary.guides.title}
        </h1>

        <p className="max-w-3xl text-lg text-slate-600">
          {dictionary.guides.description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(guides as GuideItem[]).map((guide) => (
          <Link
            key={guide.path}
            href={`/${lang}/${guide.path}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-500"
          >
            <h2 className="text-xl font-semibold text-slate-800">
              {guide.title}
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              {guide.summary}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}