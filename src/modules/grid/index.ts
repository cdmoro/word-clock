import { store } from '../../store';
import { Locale } from '../../types';
import { FLEX_CLOCK_LOCALES, HOURS, MINUTES } from './constants';
import { getTime } from '../../utils';
import { getLocaleConfig } from './locales';
import { generateFlexFuzzyClockTime, generateFuzzyClockTime } from '../fuzzy';

function getCommonCharCoords(locale: Locale, time: string) {
  const { getLocaleWordKeys, hourMark = 35 } = getLocaleConfig(locale);
  const wordKeys = [];

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map((t) => parseInt(t));

  if (minutes >= hourMark) {
    hours = (hours + 1) % 12 || 12;
  }

  wordKeys.push(...(getLocaleWordKeys?.(hours, minutes) || []));
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

function setRandomChars() {
  document.querySelectorAll<HTMLDivElement>('#clock .char.random').forEach((char) => char.classList.remove('random'));

  const grid = document.querySelector<HTMLDivElement>('#clock')!;
  const eligibleChildren = Array.from(grid.children).filter((char) => !char.classList.contains('active'));
  const selectionCount = Math.floor(eligibleChildren.length * (7 / 100));
  const selectedIndices = [];
  const step = Math.floor(eligibleChildren.length / selectionCount);

  for (let i = 0; i < selectionCount; i++) {
    const index = (i * step + Math.floor((Math.random() * step) / 2)) % eligibleChildren.length;
    selectedIndices.push(index);
  }

  const shuffled = selectedIndices.map((index) => eligibleChildren[index]);
  const selected = shuffled.slice(0, selectionCount);

  selected.forEach((char) => char.classList.add('random'));
}

export function highlightFlexGrid(time: string = getTime()) {
  document.body?.classList.add('loading');
  const locale = store.get('locale');
  const { getLocaleWordKeys, clockWords, secondaryWords } = getLocaleConfig(locale);
  let wordCoords: number[][] = [];
  const [hours, minutes] = time.split(':').map((t) => parseInt(t));
  const wordKeys = [];

  wordKeys.push(HOURS[hours % 12]);
  wordKeys.push(...(getLocaleWordKeys?.(hours, minutes) || []));

  wordKeys
    .filter((word) => word.length > 0)
    .map((word) => clockWords[word as keyof typeof clockWords])
    .forEach((item) => {
      if (typeof item === 'function') {
        const [hours, minutes] = time.split(':').map((t) => parseInt(t));
        item = item(hours, minutes);
      }
      if (Array.isArray(item) && Array.isArray(item[0])) wordCoords = wordCoords.concat(item);
      else wordCoords.push(item as number[]);
    });

  wordCoords.sort((a, b) => a[0] - b[0]);

  const flexClockWords = document.querySelectorAll<HTMLDivElement>('#flex-clock .row div');
  flexClockWords.forEach((word) => {
    word.classList.remove('active', 'secondary');
  });

  setTimeout(() => {
    document.body?.classList.remove('loading');

    secondaryWords?.forEach(([row, word]) =>
      document
        .querySelector(`#flex-clock .row:nth-child(${row + 1}) div:nth-child(${word + 1})`)
        ?.classList.add('secondary'),
    );

    wordCoords.forEach(([rowIdx, wordIdx]) => {
      document
        .querySelector(`#flex-clock .row:nth-child(${rowIdx + 1}) div:nth-child(${wordIdx + 1})`)
        ?.classList.add('active');
    });

    const fuzzyTime = generateFlexFuzzyClockTime(locale);

    document.querySelector('#flex-clock')?.setAttribute('aria-label', time);
    document.querySelector('#flex-clock')?.setAttribute('aria-description', fuzzyTime);
  }, 500);
}

export function highlightGrid(time: string = getTime()) {
  document.body?.classList.add('loading');

  const locale = store.get('locale');
  const words = getCharCoords(locale, time);
  let longestWord = 0;

  const chars = document.querySelectorAll<HTMLDivElement>('#clock .char');
  chars.forEach((cell) => {
    cell.classList.toggle('idle', cell.classList.contains('active'));
    cell.classList.remove('active', 'first', 'last');
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

    document.querySelectorAll('.char.idle').forEach((c) => c.classList.remove('idle'));
    setRandomChars();

    const fuzzyTime = generateFuzzyClockTime(locale);

    document.querySelector('#clock')?.setAttribute('aria-label', time);
    document.querySelector('#clock')?.setAttribute('aria-description', fuzzyTime);
  }, 500);
}

export function drawGrid() {
  const clock = document.querySelector<HTMLDivElement>('#clock');
  const gridExists = !!document.querySelector<HTMLDivElement>('#clock .char');
  const { grid, charsWithApostrophe, secondaryChars } = getLocaleConfig(store.get('locale'));

  grid
    ?.join('')
    .split('')
    .forEach((char, index) => {
      const charEl =
        document.querySelector<HTMLDivElement>(`#clock .char:nth-child(${index + 1})`) || document.createElement('div');

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

export function drawFlexGrid() {
  const flexClock = document.querySelector<HTMLDivElement>('#flex-clock');
  const { flexGrid } = getLocaleConfig(store.get('locale'));

  flexClock!.innerHTML = '';

  flexGrid?.forEach((row, i) => {
    const div = document.createElement('div');
    div.classList.add('row');
    div.dataset.row = i.toString();

    row.forEach((word) => {
      const wordEl = document.createElement('div');
      wordEl.classList.add('word');
      wordEl.innerText = word;

      div.appendChild(wordEl);
    });

    flexClock?.appendChild(div);
  });
}

export function initGrid() {
  if (FLEX_CLOCK_LOCALES.includes(store.get('locale'))) {
    document.body.classList.add('flex-grid');
    drawFlexGrid();
  } else {
    document.body.classList.remove('flex-grid');
    drawGrid();
  }
}

window.highlightGrid = highlightGrid;
