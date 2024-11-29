import { store } from '../../../store';
import { ClockType, Locale } from '../../../types';
import { getTime } from '../../../utils';
import { generateFlexFuzzyClockTime } from '../../fuzzy';
import { HOURS, MINUTES } from '../constants';
import { getLocaleConfig } from '../locales';

function getCommonWordKeys(locale: Locale, time: string) {
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

export function getWordCoords(locale: Locale, time: string) {
  const { clockWords, getCustomWordKeys } = getLocaleConfig(locale);
  let wordCoords: number[][] = [];
  const wordKeys = getCustomWordKeys?.(time) || getCommonWordKeys(locale, time);

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

  return wordCoords.sort((a, b) => a[0] - b[0]);
}

export function highlightFlexGrid(time: string = getTime()) {
  store.set('flex', true);
  document.body?.classList.add('loading');
  const locale = store.get('locale');
  const config = getLocaleConfig(locale);

  if (config.type !== ClockType.flex) {
    throw new Error(`Locale config type is not flex: ${config.type}`);
  }

  const { secondaryWords } = config;

  const wordCoords: number[][] = getWordCoords(locale, time);

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

export function drawFlexGrid() {
  store.set('flex', true);
  const flexClock = document.querySelector<HTMLDivElement>('#flex-clock');
  const config = getLocaleConfig(store.get('locale'));

  if (config.type !== ClockType.flex) {
    return;
  }

  const { grid } = config;

  flexClock!.innerHTML = '';

  grid?.forEach((row, i) => {
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

window.highlightFlexGrid = highlightFlexGrid;
