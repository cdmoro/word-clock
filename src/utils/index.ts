import { startScreensaver } from '../modules/screensaver';
import { CITE_FACTOR, INITIAL_THEME_FONT_SIZE } from '../modules/font';
import { store } from '../store';

export function getTime() {
  const testTime = store.get('time');
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return testTime || `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export function doFitQuote() {
  const [theme] = store.get('theme').split('-');
  const quote = document.querySelector<HTMLElement>('blockquote p');
  const cite = document.querySelector<HTMLElement>('blockquote cite');
  let fontSize: number = INITIAL_THEME_FONT_SIZE[theme as keyof typeof INITIAL_THEME_FONT_SIZE] || 75;
  const citeFactor: number = CITE_FACTOR[theme as keyof typeof CITE_FACTOR] || 0.7;

  if (quote) {
    quote.style.fontSize = `${fontSize}px`;
    const safeClientHeight = quote.clientHeight - 10;

    while (quote.scrollHeight > safeClientHeight) {
      quote.style.fontSize = `${fontSize}px`;
      if (cite) {
        cite.style.fontSize = `${fontSize < 19 ? 10 : fontSize * citeFactor}px`;
      }
      fontSize -= 1;

      if (fontSize < 10) {
        quote.style.fontSize = '10px';
        break;
      }
    }
  }
}

export function fitQuote() {
  const interval = setInterval(doFitQuote, 1);
  setTimeout(() => {
    clearInterval(interval);

    if (store.get('screensaver')) {
      startScreensaver();
    }
  }, 500);
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
