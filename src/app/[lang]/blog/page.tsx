import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isVi = lang === 'vi';
  return {
    title: isVi ? 'Blog công cụ và SEO | Quick-Fix Tools' : 'Blog for tools and SEO | Quick-Fix Tools',
    description: isVi
      ? 'Bài viết về định dạng SQL, kiểm tra JSON, tối ưu CSS và các quy trình SEO kỹ thuật hữu ích cho developers.'
      : 'Articles about SQL formatting, JSON validation, CSS optimization, and useful technical SEO workflows.',
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isVi = lang === 'vi';

  const posts = isVi
    ? [
        { title: 'Tại sao nên định dạng SQL trước khi chia sẻ?', summary: 'Định dạng SQL giúp câu lệnh dễ đọc, giảm lỗi và cải thiện chất lượng review.' },
        { title: 'JSON là gì và vì sao cần kiểm tra trước khi dùng?', summary: 'JSON là định dạng dữ liệu phổ biến cho API và frontend; kiểm tra đúng cấu trúc giúp tránh lỗi runtime.' },
        { title: 'CSS minify có thực sự giúp tăng tốc website?', summary: 'Việc giảm khoảng trắng và ký tự thừa có thể giúp file nhẹ hơn và tải nhanh hơn.' },
      ]
    : [
        { title: 'Why formatting SQL before sharing matters', summary: 'Clean SQL is easier to review, debug, and hand off across teams.' },
        { title: 'Why you should validate JSON before using it', summary: 'Valid JSON prevents runtime issues in APIs, apps, and integrations.' },
        { title: 'Does CSS minification actually improve performance?', summary: 'Removing unnecessary characters can reduce payload size and improve page speed.' },
      ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 py-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{isVi ? 'Blog và bài viết hữu ích' : 'Useful blog posts and practical insights'}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{isVi ? 'Những bài viết ngắn giúp bạn hiểu cách các công cụ này hỗ trợ phát triển, kiểm thử và tối ưu website.' : 'Short articles showing how these tools support development, testing, and website optimization.'}</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-800">{post.title}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
