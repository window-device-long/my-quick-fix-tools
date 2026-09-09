import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/get-dictionary';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const blogDict = dict['blog_page'] || {};

  return {
<<<<<<< HEAD
    title: blogDict.meta_title || 'Blog | Quick-Fix Tools',
=======
    title: blogDict.meta_title || 'Blog | JSNify',
>>>>>>> 922e231 (Commit)
    description: blogDict.meta_desc || 'Technical blog posts and web guides.',
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const blogDict = dict['blog_page'];

  if (!blogDict) {
    return (
      <div className="mx-auto max-w-5xl py-12 text-center text-slate-500">
        Blog dictionary not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-10 px-4 sm:px-6">
      
      {/* Blog Title & Subtitle */}
      <div className="space-y-4 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 bg-clip-text text-transparent">
          {blogDict.h1}
        </h1>
        <p className="max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
          {blogDict.subtitle}
        </p>
      </div>

      <hr className="border-slate-200" />

      {/* Structured Blog Card List */}
      <div className="space-y-8">
        {blogDict.posts.map((post: { slug: string; category: string; date: string; readTime: string; title: string; summary: string }) => (
          <article 
            key={post.slug} 
            className="group relative flex flex-col justify-between p-6 sm:p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
          >
            {/* Post Metadata Header */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
              <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                {post.category}
              </span>
              <span className="text-slate-300 select-none">•</span>
              <time dateTime={post.date}>{post.date}</time>
              <span className="text-slate-300 select-none">•</span>
              <span>
                {blogDict.read_time_prefix}
                {post.readTime}
                {blogDict.read_time_suffix}
              </span>
            </div>

            {/* Post Content */}
            <div className="mt-4 space-y-3">
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 leading-snug">
                <Link href={`/${lang}/blog/${post.slug}`} className="focus:outline-none">
                  {/* Sử dụng absolute overlay để mở rộng vùng click chuột ra toàn bộ thẻ */}
                  <span className="absolute inset-0 rounded-3xl" aria-hidden="true" />
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm leading-7 text-slate-600 line-clamp-3">
                {post.summary}
              </p>
            </div>

            {/* Micro Interaction Indicator */}
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:gap-2.5 transition-all duration-200">
              <span>{blogDict.read_article}</span>
              <span className="text-sm">&rarr;</span>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}