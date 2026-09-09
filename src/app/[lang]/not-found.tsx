import Link from 'next/link';

const translations: Record<string, { title: string; desc: string; btn: string }> = {
  en: { title: '404 - Page Not Found', desc: "The tool or page you're looking for does not exist.", btn: 'Back to Home' },
  vi: { title: '404 - Không Tìm Thấy Trang', desc: 'Công cụ hoặc trang bạn tìm kiếm không tồn tại.', btn: 'Quay lại Trang Chủ' },
  es: { title: '404 - Página No Encontrada', desc: 'La herramienta o página que buscas no existe.', btn: 'Volver al Inicio' },
  ja: { title: '404 - ページが見つかりません', desc: 'お探しのツールまたはページは存在しません。', btn: 'ホームへ戻る' },
  fr: { title: '404 - Page introuvable', desc: "L’outil ou la page que vous recherchez n’existe pas.", btn: "Retour à l'accueil" },
  de: { title: '404 - Seite nicht gefunden', desc: 'Das gesuchte Tool oder die Seite existiert nicht.', btn: 'Zur Startseite' },
};

export default async function NotFound() {
  // Next.js not-found files do not receive route params reliably across all rendering paths.
  // Keep the fallback copy in English; localized explicit /[lang]/404 remains available and noindexed.
  const t = translations.en;
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="space-y-5">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-4xl text-red-500">⚠️</div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">{t.title}</h1>
        <p className="mx-auto max-w-md text-base text-slate-500 sm:text-lg">{t.desc}</p>
        <div className="pt-2">
          <Link href="/en" className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700">
            {t.btn}
          </Link>
        </div>
      </div>
    </div>
  );
}
