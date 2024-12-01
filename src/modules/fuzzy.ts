import { store } from '../store';
import { Locale } from '../types';
import { getLocaleConfig } from './grid/locales';

interface WordData {
  word: string;
  isSecondary: boolean;
}

const NO_SPACE_LOCALES: Locale[] = ['zh-CN', 'zh-TW', 'ja-JP'];

export function initFuzzy() {
  checkMini();
  document.getElementById('fuzzy')?.addEventListener('click', () => {
    checkMini();
    store.toggle('fuzzy');
  });
}

function checkMini() {
  if (store.get('mini') && store.get('fuzzy')) {
    store.set('mini', false);
  }
}

export function generateFuzzyTime(time: string, locale: Locale) {
  const fuzzyTime = generateFlexFuzzyClockTime(locale);

  document.querySelector('#clock')?.setAttribute('aria-label', time);
  document.querySelector('#clock')?.setAttribute('aria-description', fuzzyTime);
}

export function generateFlexFuzzyClockTime(locale: Locale) {
  const { fuzzyCapitalWords, fuzzyDictionary } = getLocaleConfig(locale);
  const fuzzyClock = document.querySelector('#fuzzy-clock');
  fuzzyClock!.textContent = '';

  const words: WordData[] = [];
  const activeWords = document.querySelectorAll<HTMLDivElement>('#flex-clock .row .word.active');

  activeWords.forEach((word) => {
    const isSecondary = word.classList.contains('secondary');

    words.push({
      word: word.textContent || '',
      isSecondary,
    });
  });

  const fuzzyTime: string[] = [];
  const fuzzyTimeRaw: string[] = [];

  Object.values(words).forEach(({ word, isSecondary }, index) => {
    word =
      index === 0 || fuzzyCapitalWords?.includes(word)
        ? word.charAt(0) + word.slice(1).toLowerCase()
        : word.toLowerCase();

    fuzzyTimeRaw.push(word);
    fuzzyTime.push(isSecondary ? `<span class="secondary">${word}</span>` : word);
  });

  let fuzzyTimeStr = fuzzyTime.join(' ');
  let fuzzyTimeRawStr = fuzzyTimeRaw.join(' ');

  if (NO_SPACE_LOCALES.includes(locale)) {
    fuzzyTimeStr = fuzzyTime.join('');
    fuzzyTimeRawStr = fuzzyTimeRaw.join('');
  }

  Object.entries(fuzzyDictionary || {}).forEach(([key, value]) => (fuzzyTimeStr = fuzzyTimeStr.replace(key, value)));

  fuzzyClock!.innerHTML = `<div class="fuzzy-wrapper">${fuzzyTimeStr}</div>`;

  return fuzzyTimeRawStr;
}

export function generateFuzzyClockTime(locale: Locale) {
  const { fuzzyCapitalWords, fuzzyDictionary } = getLocaleConfig(locale);
  const fuzzyClock = document.querySelector('#fuzzy-clock');
  fuzzyClock!.textContent = '';

  const words: Record<string, WordData> = {};
  const activeChars = document.querySelectorAll<HTMLDivElement>('.char.active');

  activeChars.forEach((char) => {
    const wordIndex = char.getAttribute('data-word');
    if (wordIndex === null) return;

    const isSecondary = char.classList.contains('secondary');
    const isApostrophe = char.classList.contains('apostrophe');

    if (!words[wordIndex]) {
      words[wordIndex] = { word: '', isSecondary: true };
    }

    words[wordIndex].word += char.textContent || '';
    if (isApostrophe) {
      words[wordIndex].word += '’';
    }

    if (!isSecondary) {
      words[wordIndex].isSecondary = false;
    }
  });

  const fuzzyTime: string[] = [];
  const fuzzyTimeRaw: string[] = [];

  Object.values(words).forEach(({ word, isSecondary }, index) => {
    word =
      index === 0 || fuzzyCapitalWords?.includes(word)
        ? word.charAt(0) + word.slice(1).toLowerCase()
        : word.toLowerCase();

    fuzzyTimeRaw.push(word);
    fuzzyTime.push(isSecondary ? `<span class="secondary">${word}</span>` : word);
  });

  let fuzzyTimeStr = fuzzyTime.join(' ');
  let fuzzyTimeRawStr = fuzzyTimeRaw.join(' ');

  if (NO_SPACE_LOCALES.includes(locale)) {
    fuzzyTimeStr = fuzzyTime.join('');
    fuzzyTimeRawStr = fuzzyTimeRaw.join('');
  }

  Object.entries(fuzzyDictionary || {}).forEach(([key, value]) => (fuzzyTimeStr = fuzzyTimeStr.replace(key, value)));

  fuzzyClock!.innerHTML = `<div class="fuzzy-wrapper">${fuzzyTimeStr}</div>`;

  return fuzzyTimeRawStr;
}
