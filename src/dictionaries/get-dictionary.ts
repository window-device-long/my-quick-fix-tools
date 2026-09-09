import 'server-only';
import type en from './en.json';

type Dictionary = typeof en;
type DictionaryLoader = () => Promise<Dictionary>;

const dictionaries: Record<string, DictionaryLoader> = {
  en: () => import('./en.json').then((m) => m.default),
  vi: () => import('./vi.json').then((m) => m.default as Dictionary),
  es: () => import('./es.json').then((m) => m.default as Dictionary),
  fr: () => import('./fr.json').then((m) => m.default as Dictionary),
  de: () => import('./de.json').then((m) => m.default as Dictionary),
  ja: () => import('./ja.json').then((m) => m.default as Dictionary),
};

export const getDictionary = (locale: string): Promise<Dictionary> =>
  (dictionaries[locale] ?? dictionaries.en)();
