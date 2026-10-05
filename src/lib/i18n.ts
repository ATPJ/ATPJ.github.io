import { en } from '../content/i18n/en';
import { fa } from '../content/i18n/fa';

export type Lang = 'en' | 'fa';
export const strings = { en, fa };

/** Pick the right language from a { en, fa } value. */
export const pick = <T>(v: { en: T; fa: T }, lang: Lang): T => v[lang];

/** Join the configured base path with a relative path ("" -> site root). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}
