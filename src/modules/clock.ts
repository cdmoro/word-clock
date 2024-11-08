import { getTime, updateFavicon } from '../utils';
import { setDayParameters } from './dynamic';
import { fadeOutQuote } from './fade';
import { store } from '../store';
import { highlightGrid } from './grid';

let lastTime: string;

function getMillisecondsToNextMinute() {
  const now = new Date();
  return (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
}

function updateTime() {
  const time = store.get('time') || getTime();

  if (store.get('fade')) {
    fadeOutQuote();
  }

  if (lastTime !== time) {
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

    highlightGrid(time);

    lastTime = time;
  }
}

export function initClock() {
  const testTime = store.get('time');
  const testQuote = store.get('quote');
  const isTest = !!(testTime || testQuote);
  const timeToNextMinute = getMillisecondsToNextMinute();

  updateTime();

  if (!isTest) {
    setTimeout(() => {
      updateTime();
      setInterval(updateTime, 60000);
    }, timeToNextMinute);
  }
}
