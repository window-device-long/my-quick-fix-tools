import React from 'react';
import Link from 'next/link';
import { getDictionary } from '@/dictionaries/get-dictionary';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// Tự động tối ưu hóa SEO Meta Tags cho từng bài viết cụ thể
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const posts = dict.blog_posts as Record<string, (typeof dict.blog_posts)[keyof typeof dict.blog_posts]>;
  const post = posts[slug];

  if (!post) {
    return {
      title: 'Article Not Found | JSNify',
    };
  }

  return {
    title: `${post.title} | JSNify`,
    description: post.meta_desc,
  };
}

// Bật chế độ Static Generation (SSG) cho toàn bộ các bài viết đa ngôn ngữ
export async function generateStaticParams() {
  const langs = ['vi', 'en'];
  const slugs = [
    'why-formatting-sql-matters',
    'validate-json-before-using',
    'css-minification-web-vitals'
  ];

  return langs.flatMap((lang) =>
    slugs.map((slug) => ({
      lang,
      slug,
    }))
  );
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const posts = dict.blog_posts as Record<string, (typeof dict.blog_posts)[keyof typeof dict.blog_posts]>;
  const post = posts[slug];
  const detailDict = dict.blog_detail;

  // Nếu bài viết không tồn tại trong file cấu hình dịch thuật, chuyển hướng về trang 404
  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10 py-10 px-4 sm:px-6">
      
      {/* Back to Blog Button */}
      <div>
        <Link 
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors duration-150"
        >
          {detailDict.back_to_blog}
        </Link>
      </div>

      {/* Post Metadata Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 text-xs font-bold text-indigo-600 uppercase tracking-wide">
          <span className="bg-indigo-50 px-2.5 py-1 rounded-lg">
            {post.category}
          </span>
          <span className="text-slate-300 select-none">•</span>
          <time className="text-slate-500 font-medium" dateTime={post.date}>{post.date}</time>
          <span className="text-slate-300 select-none">•</span>
          <span className="text-slate-500 font-medium">{post.readTime} min read</span>
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl !leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Main Content Body */}
      {/* Tailwind Typography 'prose' tự động style thẻ h2, h3, p, pre, list từ HTML của bạn */}
      <article 
        className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-8 prose-p:text-slate-600 prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-50 prose-blockquote:p-4 prose-blockquote:rounded-r-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <hr className="border-slate-200" />

      {/* Contextual Utility Tool CTA (Kêu gọi hành động liên quan trực tiếp đến bài viết) */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 text-center space-y-4 shadow-sm">
        <h3 className="text-lg font-bold">{detailDict.cta_title}</h3>
        <p className="text-slate-300 max-w-md mx-auto text-xs leading-relaxed">
          {detailDict.cta_desc}
        </p>
        <div className="pt-2">
          <Link
            href={`/${lang}/${post.related_tool_path}`}
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold rounded-xl text-slate-900 bg-white hover:bg-slate-50 shadow-sm transition-all duration-200"
          >
            {post.related_tool_label} &rarr;
          </Link>
        </div>
      </section>

    </div>
  );
}