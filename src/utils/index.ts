import { store } from '../store';

export function getTime() {
  const testTime = store.get('time');
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return testTime || `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function loadFontIfNotExists(font: string) {
  const fontNameSanitized = font.replace(/ /g, '+');
  const fontExists = Array.from(document.querySelectorAll<HTMLAnchorElement>('link[rel=stylesheet][href*=fonts]')).some(
    (link) => link.href.includes(fontNameSanitized),
  );

  if (fontExists) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontNameSanitized}:wght@400&display=swap`;
  document.head.appendChild(link);
}

export function getFaviconFileName(time: string) {
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map(Number);

  if (hours >= 12) {
    hours -= 12;
  }

  return `${hours.toString().padStart(2, '0')}_${minutes >= 0 && minutes < 30 ? '00' : '30'}`;
}

export function updateFavicon(time: string = getTime()) {
  let link = document.querySelector<HTMLLinkElement>('link[rel~=icon]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = `/favicon/${getFaviconFileName(time)}.ico`;
}

export function contentLoaded() {
  updateFavicon();
  document.body.removeAttribute('data-loading');
}
