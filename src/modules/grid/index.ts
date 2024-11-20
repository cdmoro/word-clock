import { store } from '../../store';
import { Locale } from '../../types';
import { HOURS, MINUTES } from './constants';
import { getTime } from '../../utils';
import { getLocaleConfig } from './locales';
import { generateFuzzyClockTime } from '../fuzzy';

function getCommonCharCoords(locale: Locale, time: string) {
  const { getLocaleWordKeys, hourMark = 35 } = getLocaleConfig(locale);
  const wordKeys = [];

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map((t) => parseInt(t));

  if (minutes >= hourMark) {
    hours = (hours + 1) % 12 || 12;
  }

  wordKeys.push(...getLocaleWordKeys?.(hours, minutes) || []);
  wordKeys.push(HOURS[hours % 12]);

  if (minutes >= 5) {
    wordKeys.push(MINUTES[Math.floor(minutes / 5) - 1]);
  }

  return wordKeys;
}

export function getCharCoords(locale: Locale, time: string) {
  const { clockWords, getCustomWordKeys } = getLocaleConfig(locale);
  let charCoords: number[][] = [];
  const wordKeys = getCustomWordKeys?.(time) || getCommonCharCoords(locale, time);

  wordKeys
    .filter((word) => word.length > 0)
    .map((word) => clockWords[word as keyof typeof clockWords])
    .forEach((item) => {
      if (typeof item === 'function') {
        const [hours, minutes] = time.split(':').map((t) => parseInt(t));
        item = item(hours, minutes);
      }
      if (Array.isArray(item) && Array.isArray(item[0])) charCoords = charCoords.concat(item);
      else charCoords.push(item as number[]);
    });

  return charCoords.sort((a, b) => a[0] - b[0]);
}

export function highlightGrid(time: string = getTime()) {
  if (store.get('solid') && store.get('fuzzy')) {
    document.body?.classList.add('loading');
  }

  const locale = store.get('locale');
  const words = getCharCoords(locale, time);
  let longestWord = 0;

  const chars = document.querySelectorAll<HTMLDivElement>('#clock .char');
  chars.forEach((cell) => {
    cell.classList.toggle('idle', cell.classList.contains('active'));
    cell.classList.remove('active');
    delete cell.dataset.word;
  });

  setTimeout(() => {
    document.body?.classList.remove('loading');
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

    document.querySelectorAll('.char.idle').forEach((charIdle) => charIdle.classList.remove('idle'));
    const ariaDescription = Array.from(document.querySelectorAll('#clock .char.active'))
      .map(
        (el) =>
          `${el.classList.contains('first') ? ' ' : ''}${el.textContent}${el.classList.contains('apostrophe') ? '’' : ''}`,
      )
      .join('')
      .trim();

    generateFuzzyClockTime();

    document.querySelector('#clock')?.setAttribute('aria-label', time);
    document.querySelector('#clock')?.setAttribute('aria-description', ariaDescription);
  }, 500);
}

export function drawGrid() {
  const clock = document.querySelector<HTMLDivElement>('#clock');
  const gridExists = !!document.querySelector<HTMLDivElement>('#clock .char');
  const { grid, charsWithApostrophe, secondaryChars } = getLocaleConfig(store.get('locale'));

  grid
    .join('')
    .split('')
    .forEach((char, index) => {
      let charEl = document.querySelector<HTMLDivElement>(`#clock .char:nth-child(${index + 1})`);

      if (!charEl) {
        charEl = document.createElement('div');
      }

      charEl.classList.add('char');
      charEl.dataset.index = index.toString();
      charEl.classList.toggle('apostrophe', !!charsWithApostrophe?.includes(index));
      charEl.classList.toggle('secondary', !!secondaryChars?.includes(index));
      charEl.textContent = char;

      if (!gridExists) {
        clock?.appendChild(charEl);
      }
    });
}

export function initGrid() {
  drawGrid();
}

window.highlightGrid = highlightGrid;
