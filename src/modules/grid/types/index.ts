import { store } from '../../../store';
import { ClockType, Locale } from '../../../types';
import { getLocaleClockType } from '../locales';
import { drawFlex, highlightFlex } from './flex';
import { drawGrid, highlightGrid } from './grid';

interface GetClockMethods {
  drawClock: () => void;
  highlightClock: (time?: string) => void;
}

export function getClockType(locale?: Locale) {
  return getLocaleClockType(locale || store.get('locale'));
}

export function setClockType(locale?: Locale) {
  const clockType = getClockType(locale);
  document.documentElement.setAttribute('data-clock-type', clockType.toString());
  store.set('clock_type', clockType);
}

export function getClockMethods(locale?: Locale): GetClockMethods {
  const type = getClockType(locale);

  switch (type) {
    case ClockType.grid:
      return {
        drawClock: drawGrid,
        highlightClock: highlightGrid,
      };
    case ClockType.flex:
      return {
        drawClock: drawFlex,
        highlightClock: highlightFlex,
      };
    default:
      throw new Error(`Unsopported clock type: ${type}`);
  }
}
