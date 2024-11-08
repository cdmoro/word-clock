import { store } from '../../store';
import { LocaleGridConfig, Locale } from '../../types';
import en from './en';
import es from './es';
import fr from './fr';
import it from './it';
import pt from './pt';

const GRID_CONFIG_BY_LOCALE: Record<Locale, LocaleGridConfig> = {
  'en-US': en,
  'es-ES': es,
  'it-IT': it,
  'fr-FR': fr,
  'pt-BR': pt,
};

function getGridConfig(locale: Locale) {
  return GRID_CONFIG_BY_LOCALE[locale];
}

export function highlightGrid(time: string) {
  const { getWordsToHighlight, words: wordObj } = getGridConfig(store.get('locale'));
  const [hours, minutes] = time.split(':').map((t) => parseInt(t));
  const words = getWordsToHighlight(hours, minutes).map((word) => wordObj[word as keyof typeof wordObj]);

  const chars = document.querySelectorAll('#clock .char');
  chars.forEach((cell) => cell.classList.remove('active'));

  setTimeout(
    () => {
      words.forEach((word) =>
        word.forEach((index, pos) => {
          const char = chars[index];

          char.classList.add('active');
          char.classList.toggle('first-child', pos === 0);
          char.classList.toggle('last-child', pos === word.length - 1);
        }),
      );
    },
    store.get('fade') ? 500 : 0,
  );
}

export function drawGrid() {
  const clock = document.querySelector<HTMLDivElement>('#clock');
  const { grid, charsWithAphostrophe } = getGridConfig(store.get('locale'));

  while (clock?.firstChild) {
    clock.removeChild(clock.firstChild);
  }

  grid
    .join('')
    .split('')
    .forEach((char, index) => {
      const charEl = document.createElement('div');
      charEl.classList.add('char');
      charEl.dataset.index = index.toString();
      charEl.classList.toggle('aphostrophe', !!charsWithAphostrophe?.includes(index));

      charEl.textContent = char;

      clock?.appendChild(charEl);
    });
}

export function initGrid() {
  drawGrid();
}
