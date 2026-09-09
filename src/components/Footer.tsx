import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/get-dictionary';

interface FooterProps {
  lang: string;
}

export default async function Footer({ lang }: FooterProps) {
  const dict = await getDictionary(lang);
  const footerDict = dict.footer;

  return (
    <footer className="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-8 text-slate-300 shadow-sm sm:px-8 max-w-5xl mx-auto my-6">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.8fr_0.8fr]">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
<<<<<<< HEAD
              <img src="/favicon-32x32.png" alt="QuickFix Studio" className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">QuickFix Studio</div>
=======
              <img src="/favicon-32x32.png" alt="JSNify" className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white">JSNify</div>
>>>>>>> 922e231 (Commit)
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                Fast, private, production-ready
              </div>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            {footerDict.description}
          </p>
        </div>

        {/* Featured Tools Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {footerDict.featured_tools}
          </h4>
          <div className="space-y-2 text-sm text-slate-400">
            <Link href={`/${lang}/sql-formatter`} className="block transition hover:text-white">SQL Formatter</Link>
            <Link href={`/${lang}/json-validator`} className="block transition hover:text-white">JSON Validator</Link>
            <Link href={`/${lang}/css-minify`} className="block transition hover:text-white">CSS Minifier</Link>
            <Link href={`/${lang}/hash-generator`} className="block transition hover:text-white">Hash Generator</Link>
          </div>
        </div>

        {/* Company & Policy Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            {footerDict.company_policy}
          </h4>
          <div className="space-y-2 text-sm text-slate-400">
            <Link href={`/${lang}/about`} className="block transition hover:text-white">
              {footerDict.about}
            </Link>
            <Link href={`/${lang}/privacy-policy`} className="block transition hover:text-white">
              {footerDict.privacy}
            </Link>
            <Link href={`/${lang}/terms-of-service`} className="block transition hover:text-white">
              {footerDict.terms}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
<<<<<<< HEAD
        <div>&copy; {new Date().getFullYear()} QuickFix Studio. Designed for modern web workflows.</div>
=======
        <div>&copy; {new Date().getFullYear()} JSNify. Designed for modern web workflows.</div>
>>>>>>> 922e231 (Commit)
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {footerDict.operational}
          </span>
        </div>
      </div>
    </footer>
  );
}