import en from './en.json';
import id from './id.json';

export type Language = 'en' | 'id';

const dictionaries = {
  en,
  id,
};

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;

export type TranslationKey = NestedKeyOf<typeof en>;

export function getTranslation(lang: Language, path: string): string {
  const dict = dictionaries[lang] || dictionaries.en;
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = dict;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path;
    }
  }

  return typeof current === 'string' ? current : path;
}

