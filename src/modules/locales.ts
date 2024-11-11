import TRANSLATIONS from '../strings/translations.json';
import { Locale } from '../types';
import { getTime } from '../utils';
import { Translations } from '../types';
import { store } from '../store';
import { drawGrid, highlightGrid } from './grid';

export const DOMINANT_LOCALES: Record<string, Locale> = {
  en: 'en-US',
  es: 'es-ES',
  pt: 'pt-BR',
  fr: 'fr-FR',
  it: 'it-IT',
  de: 'de-DE',
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
  const locale = store.get('locale');
  const localeSelect = document.querySelector<HTMLSelectElement>('#locale-select');

  if (localeSelect) {
    localeSelect.value = locale;
  }

  translateStrings(locale);

  localeSelect?.addEventListener('change', (e) => {
    const locale = (e.target as HTMLInputElement).value as Locale;
    translateStrings(locale);
    store.set('locale', locale);
    drawGrid();
    highlightGrid(getTime());
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
