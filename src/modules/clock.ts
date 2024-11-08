import { getTime, updateFavicon } from '../utils';
import { setDayParameters } from './dynamic';
import { store } from '../store';
import { highlightGrid } from './grid';

function getMillisecondsToNextMinute() {
  const now = new Date();
  return (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
}

function updateTime(forceUpdate?: boolean) {
  const time = store.get('time') || getTime();
  const minute = time.slice(-1);

  if (time.includes(':00') || time.includes(':30')) {
    updateFavicon(time);
  }

  if (store.get('theme')?.startsWith('dynamic')) {
    setDayParameters();
  }

  document.title = document.title.replace(/[0-9]{2}:[0-9]{2}/, time);

  const timeEl = document.getElementById('time-clock');
  if (timeEl) {
    timeEl.innerHTML = time;
  }

  if (forceUpdate || minute === '0' || minute === '5') {
    highlightGrid(time);
  }
}

export function initClock() {
  const isTest = !!store.get('time');
  const timeToNextMinute = getMillisecondsToNextMinute();

  updateTime(true);

  if (!isTest) {
    setTimeout(() => {
      updateTime(true);
      setInterval(updateTime, 60000);
    }, timeToNextMinute);
  }
}
