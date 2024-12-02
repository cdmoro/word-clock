import { store } from '../../../store';
import { ClockType } from '../../../types';
import { getTime } from '../../../utils';
import { generateFlexFuzzyClockTime } from '../../fuzzy';
import { getLocaleConfig } from '../locales';
import { getCoords } from '../utils';

export function highlightFlex(time: string = getTime()) {
  store.set('clock_type', ClockType.flex);
  document.body?.classList.add('loading');
  const locale = store.get('locale');
  const config = getLocaleConfig(locale);

  if (config.type !== ClockType.flex) {
    throw new Error(`Locale config type is not flex: ${config.type}`);
  }

  const { secondaryWords } = config;

  const wordCoords: number[][] = getCoords(locale, time);

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

    wordCoords.forEach(([rowIdx, wordIdx], index) => {
      const word = document.querySelector<HTMLDivElement>(
        `#flex-clock .row:nth-child(${rowIdx + 1}) div:nth-child(${wordIdx + 1})`,
      )!;
      word.classList.add('active');
      word.dataset.word = index.toString();
    });

    const fuzzyTime = generateFlexFuzzyClockTime(locale);

    document.querySelector('#flex-clock')?.setAttribute('aria-label', time);
    document.querySelector('#flex-clock')?.setAttribute('aria-description', fuzzyTime);
  }, 500);
}

export function drawFlex() {
  store.set('clock_type', ClockType.flex);
  const flexClock = document.querySelector<HTMLDivElement>('#flex-clock');
  const config = getLocaleConfig(store.get('locale'));

  if (config.type !== ClockType.flex) {
    throw new Error(`Locale config type is not flex: ${config.type}`);
  }

  const { grid } = config;

  flexClock!.innerHTML = '';

  let index = 0;

  grid?.forEach((row, i) => {
    const div = document.createElement('div');
    div.classList.add('row');
    div.dataset.row = i.toString();

    row.forEach((word, j) => {
      const wordEl = document.createElement('div');
      wordEl.classList.add('word');
      wordEl.classList.toggle('first', j === 0);
      wordEl.classList.toggle('last', row.length - 1 === j);
      wordEl.dataset.index = index.toString();
      wordEl.innerText = word;

      div.appendChild(wordEl);
      index++;
    });

    flexClock?.appendChild(div);
  });
}

window.highlightFlexGrid = highlightFlex;
