import { Locale } from '../../types';
import { HOURS, MINUTES } from './constants';
import { getLocaleConfig } from './locales';

function getCommonKeys(locale: Locale, time: string) {
  const { getLocaleWordKeys, hourMark = 35 } = getLocaleConfig(locale);
  const keys = [];

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map((t) => parseInt(t));

  if (minutes >= hourMark) {
    hours = (hours + 1) % 12 || 12;
  }

  keys.push(...(getLocaleWordKeys?.(hours, minutes) || []));
  keys.push(HOURS[hours % 12]);

  if (minutes >= 5) {
    keys.push(MINUTES[Math.floor(minutes / 5) - 1]);
  }

  return keys;
}

export function getCoords(locale: Locale, time: string) {
  const { clockWords, getCustomWordKeys } = getLocaleConfig(locale);
  let wordCoords: number[][] = [];
  const keys = getCustomWordKeys?.(time) || getCommonKeys(locale, time);

  keys
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
