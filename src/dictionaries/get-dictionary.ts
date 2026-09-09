import 'server-only';

const importEnglishDictionary = () => import('./en.json').then((module) => module.default);
export type Dictionary = Awaited<ReturnType<typeof importEnglishDictionary>>;

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: importEnglishDictionary,
  vi: () => import('./vi.json').then((module) => module.default as unknown as Dictionary),
  es: () => import('./es.json').then((module) => module.default as unknown as Dictionary),
  fr: () => import('./fr.json').then((module) => module.default as unknown as Dictionary),
  de: () => import('./de.json').then((module) => module.default as unknown as Dictionary),
  ja: () => import('./ja.json').then((module) => module.default as unknown as Dictionary),
};

export const getDictionary = async (locale: string): Promise<Dictionary> =>
  dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
