import TRANSLATIONS from '../strings/translations.json';
import { Locale } from '../types';
import { getTime } from '../utils';
import { Translations } from '../types';
import { store } from '../store';
import { getClockMethods, setClockType } from './grid/types';

const RTL_LOCALES: Locale[] = ['he-IL', 'ar-AE'];

export const DOMINANT_LOCALES: Record<string, Locale> = {
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-PT',
  fr: 'fr-FR',
  it: 'it-IT',
  el: 'el-GR',
  de: 'de-DE',
  nl: 'nl-NL',
  sv: 'sv-SE',
  no: 'no-NO',
  cs: 'cs-CZ',
  tr: 'tr-TR',
  ro: 'ro-RO',
  ca: 'ca-ES',
  ru: 'ru-RU',
  he: 'he-IL',
  ar: 'ar-AE',
} as const;

export function resolveLocale(locale = navigator.language): Locale {
  if (locale.length === 2) {
    locale = DOMINANT_LOCALES[locale];
  }

  if (!TRANSLATIONS[locale as keyof typeof TRANSLATIONS]) {
    locale = DOMINANT_LOCALES[locale.substring(0, 2)];
  }

  if (!TRANSLATIONS[locale as keyof typeof TRANSLATIONS] || !locale) {
    locale = 'en-US';
  }

  return locale as Locale;
}

export function initLocale() {
  const localeSelect = document.querySelector<HTMLSelectElement>('#locale-select');
  const locale = store.get('locale');

  translateStrings(locale);
  localeSelect!.value = locale;
  document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  localeSelect?.addEventListener('change', (e) => {
    const locale = (e.target as HTMLInputElement).value as Locale;
    setClockType(locale);
    const { drawClock, highlightClock } = getClockMethods(locale);

    translateStrings(locale);
    store.set('locale', locale);
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
    // store.set('flex', FLEX_CLOCK_LOCALES.includes(locale));

    drawClock();

    document.body?.classList.add('no-transitions');

    highlightClock();
  });
}

export function getStrings(locale: Locale): Translations {
  const resolvedLocale = resolveLocale(locale);

  return TRANSLATIONS[resolvedLocale];
}

function translateStrings(locale: Locale) {
  const time = getTime();
  const strings = getStrings(locale);

  document.documentElement.lang = locale.substring(0, 2);
  document.title = `${time} - ${strings.document_title}`;

  document
    .querySelectorAll<HTMLElement>('[data-text]')
    .forEach((el) => (el.textContent = strings[el.dataset.text as keyof Translations]));

  document
    .querySelectorAll<HTMLOptionElement>('[data-label]')
    .forEach((el) => (el.label = strings[el.dataset.label as keyof Translations]));

  document
    .querySelectorAll<HTMLElement>('[data-title]')
    .forEach((el) => (el.title = strings[el.dataset.title as keyof Translations]));
}
