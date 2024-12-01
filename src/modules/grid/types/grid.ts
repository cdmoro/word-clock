import { store } from '../../../store';
import { ClockType } from '../../../types';
import { getTime } from '../../../utils';
import { generateFuzzyClockTime } from '../../fuzzy';
import { getLocaleConfig } from '../locales';
import { getCoords } from '../utils';

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

export function highlightGrid(time: string = getTime()) {
  store.set('clock_type', ClockType.grid);
  document.body?.classList.add('loading');

  const locale = store.get('locale');
  const words = getCoords(locale, time);
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
        document.querySelector<HTMLDivElement>('#clock')!.style.setProperty('--columns', longestWord.toString());
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
  store.set('clock_type', ClockType.grid);
  const clock = document.querySelector<HTMLDivElement>('#clock');
  const gridExists = !!document.querySelector<HTMLDivElement>('#clock .char');
  const config = getLocaleConfig(store.get('locale'));

  if (config.type !== ClockType.grid) {
    throw new Error(`Locale config type is not grid: ${config.type}`);
  }

  const { grid, charsWithApostrophe, secondaryChars } = config;

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

window.highlightGrid = highlightGrid;
