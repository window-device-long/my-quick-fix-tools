import 'server-only';
const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import('./en.json').then((m) => m.default),
  es: () => import('./es.json').then((m) => m.default),
  vi: () => import('./vi.json').then((m) => m.default),
};
export const getDictionary = async (locale: string) => dictionaries[locale] ? dictionaries[locale]() : dictionaries['en']();
