import React from 'react';
import { getDictionary } from '@/dictionaries/get-dictionary';
import SqlClientTool from './SqlClientTool';
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const dict = await getDictionary(lang); return { title: dict.sql.meta_title, description: dict.sql.meta_desc };
}
export default async function ToolPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params; const dict = await getDictionary(lang);
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="text-center"><h1 className="text-3xl font-bold">{dict.sql.h1}</h1></div>
      <SqlClientTool dict={dict.sql} />

      {/* Thêm vào cuối file src/app/[lang]/sql-formatter/page.tsx */}
      <hr className="border-slate-200 my-12" />

      <article className="prose prose-slate max-w-none text-slate-700 space-y-8 pb-16">
        {/* SECTION 1: GIÁ TRỊ CỦA CÔNG CỤ */}
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-800">
            {lang === 'vi' ? 'Visual SQL Formatter là gì?' : 'What is Visual SQL Formatter & Minifier?'}
          </h2>
          <p className="leading-relaxed">
            {lang === 'vi'
              ? 'Visual SQL Formatter là một công cụ trực tuyến miễn phí giúp các nhà phát triển phần mềm, chuyên viên phân tích dữ liệu (DA) và quản trị viên cơ sở dữ liệu (DBA) định dạng lại các câu lệnh SQL thô phức tạp thành cấu trúc phân cấp rõ ràng, dễ đọc.'
              : 'Visual SQL Formatter is a free client-side online tool designed for software engineers, data analysts, and DBAs to transform messy, unformatted SQL scripts into perfectly structured, highly readable database queries.'}
          </p>
        </section>

        {/* SECTION 2: CÁC TÍNH NĂNG CHÍNH (ĐỂ BOT QUÉT ĐƯỢC TỪ KHÓA) */}
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-800">
            {lang === 'vi' ? 'Các tính năng cốt lõi' : 'Key Technical Capabilities'}
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Beautify SQL:</strong> {lang === 'vi' ? 'Tự động viết hoa từ khóa (SELECT, FROM, WHERE) và thụt lề chuẩn.' : 'Auto-capitalize SQL dialects keywords and enforce consistent code indentation.'}</li>
            <li><strong>Minify SQL:</strong> {lang === 'vi' ? 'Xóa bỏ khoảng trắng và xuống dòng thừa để tối ưu hóa dung lượng truyền tải câu lệnh.' : 'Strip unnecessary whitespace and line breaks to compress queries for production execution.'}</li>
            <li><strong>100% Client-Side Privacy:</strong> {lang === 'vi' ? 'Dữ liệu được xử lý hoàn toàn trên trình duyệt của bạn, không gửi về server, bảo mật tuyệt đối.' : 'Your database schemas and queries never touch our servers. Execution happens entirely inside your browser.'}</li>
          </ul>
        </section>

        {/* SECTION 3: CÁC BIẾN THỂ SQL HỖ TRỢ */}
        <section className="space-y-3">
          <h3 className="text-xl font-bold text-slate-800">
            {lang === 'vi' ? 'Hỗ trợ đa dạng hệ quản trị cơ sở dữ liệu' : 'Supported SQL Dialects & Databases'}
          </h3>
          <p>
            {lang === 'vi'
              ? 'Công cụ phân tách cú pháp tương thích hoàn hảo với các hệ cơ sở dữ liệu phổ biến hiện nay bao gồm: PostgreSQL, MySQL, Microsoft SQL Server (T-SQL), Oracle, SQLite, và Google BigQuery.'
              : 'Our underlying syntax engine aligns seamlessly with enterprise database platforms including PostgreSQL, MySQL, Microsoft SQL Server (T-SQL), Oracle Database, SQLite, and Google BigQuery.'}
          </p>
        </section>

        {/* SECTION 4: HƯỚNG DẪN SỬ DỤNG (TĂNG TIME-ON-SITE CỦA USER) */}
        <section className="space-y-3 bg-slate-100 p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800">
            {lang === 'vi' ? 'Cách sử dụng bộ định dạng SQL trực tuyến' : 'How to Format Your SQL Code Online'}
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>{lang === 'vi' ? 'Sao chép (Copy) đoạn mã nguồn SQL thô hoặc bị vỡ cấu trúc của bạn.' : 'Copy your raw, obfuscated, or poorly indented SQL string from your IDE.'}</li>
            <li>{lang === 'vi' ? 'Dán (Paste) đoạn mã đó vào ô nhập liệu (Input Area) ở phía trên.' : 'Paste the query directly into the standard input text area component above.'}</li>
            <li>{lang === 'vi' ? 'Nhấp chọn nút "Format SQL" để làm đẹp hoặc "Minify SQL" để nén tối ưu.' : 'Click "Format SQL" to beautify structures, or select "Minify SQL" to compress.'}</li>
            <li>{lang === 'vi' ? 'Nhấp "Copy" tại ô kết quả để sao chép mã nguồn đã xử lý về khay nhớ tạm.' : 'Click the clipboard "Copy" button on the output terminal to extract your clean code.'}</li>
          </ol>
        </section>
      </article>
    </div>


  );
}
