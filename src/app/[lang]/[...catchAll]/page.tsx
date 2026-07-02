import { redirect } from 'next/navigation';

export default async function CatchAllPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}/404`);
}
