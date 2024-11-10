import { store } from '../../store';
import { LocaleGridConfig, Locale } from '../../types';
import { HOURS, MINUTES } from './constants';
import en from './en';
import es from './es';
import fr from './fr';
import it from './it';
import pt from './pt';

const LOCALE_CONFIG: Record<Locale, LocaleGridConfig> = {
  'en-US': en,
  'es-ES': es,
  'it-IT': it,
  'fr-FR': fr,
  'pt-BR': pt,
};

function getLocaleConfig(locale: Locale) {
  return LOCALE_CONFIG[locale];
}

export function getWordsKeys(locale: Locale, time: string) {
  const { getLocaleWordKeys } = getLocaleConfig(locale);
  const wordKeys = [];

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map((t) => parseInt(t));
  if (minutes >= 35) {
    hours = (hours + 1) % 12 || 12;
  }

  wordKeys.push(HOURS[hours % 12]);
  if (minutes >= 5) {
    wordKeys.push(MINUTES[Math.floor(minutes / 5) - 1]);
  }

  return [...getLocaleWordKeys(hours, minutes), ...wordKeys];
}

export function highlightGrid(time: string) {
  const locale = store.get('locale');
  const { localeWords, commonWords } = getLocaleConfig(locale);
  let words: number[][] = [];

  const clockWords = {
    ...commonWords,
    ...localeWords,
  };

  getWordsKeys(locale, time)
    .map((word) => clockWords[word as keyof typeof clockWords])
    .forEach((item) => {
      if (typeof item === 'function') {
        const [hours, minutes] = time.split(':').map((t) => parseInt(t));
        item = item(hours, minutes);
      }
      if (Array.isArray(item[0])) words = words.concat(item);
      else words.push(item as number[]);
    });

  let longestWord = 0;
  document.documentElement.style.removeProperty('--longest-word');

  const chars = document.querySelectorAll<HTMLDivElement>('#clock .char');
  chars.forEach((cell) => cell.classList.remove('active'));

  setTimeout(() => {
    words.forEach((word, wordIdx) => {
      longestWord = Math.max(word.length, longestWord);

      word.forEach((index, pos) => {
        const char = chars[index];

        char.classList.add('active');
        char.classList.toggle('first', pos === 0);
        char.classList.toggle('last', pos === word.length - 1);

        char.dataset.word = wordIdx.toString();
      });

      if (longestWord > 0) {
        document.documentElement.style.setProperty('--longest-word', longestWord.toString());
      }
    });
  }, 500);
}

export function drawGrid() {
  const clock = document.querySelector<HTMLDivElement>('#clock');
  const { grid, charsWithAphostrophe, secondaryChars } = getLocaleConfig(store.get('locale'));

  while (clock?.firstChild) {
    clock.removeChild(clock.firstChild);
  }

  grid
    .join('')
    .split('')
    .forEach((char, index) => {
      const charEl = document.createElement('div');
      charEl.classList.add('char');
      charEl.dataset.index = index.toString();
      charEl.classList.toggle('aphostrophe', !!charsWithAphostrophe?.includes(index));
      charEl.classList.toggle('secondary', !!secondaryChars?.includes(index));

      charEl.textContent = char;

      clock?.appendChild(charEl);
    });
}

export function initGrid() {
  drawGrid();
}
