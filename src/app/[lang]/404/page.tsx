// src/app/[lang]/404/page.tsx
import React from 'react';
import Link from 'next/link';

const translations: Record<string, { title: string; desc: string; btn: string }> = {
  en: { title: "404 - Page Not Found", desc: "Oops! The tool or page you are looking for doesn't exist.", btn: "Back to Home" },
  vi: { title: "404 - Không Tìm Thấy Trang", desc: "Rất tiếc! Công cụ hoặc trang bạn tìm kiếm không tồn tại.", btn: "Quay lại Trang Chủ" },
  es: { title: "404 - Página No Encontrada", desc: "¡Ups! La herramienta o página que buscas no existe.", btn: "Volver al Inicio" }
};

export default async function Page404({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = translations[lang] || translations.en;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-5">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 text-4xl">⚠️</div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{t.title}</h1>
        <p className="mx-auto max-w-md text-base text-slate-500 sm:text-lg">{t.desc}</p>
        <div className="pt-2">
          <Link href={`/${lang}`} className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition">
            {t.btn}
          </Link>
        </div>
      </div>
    </div>
  );
}