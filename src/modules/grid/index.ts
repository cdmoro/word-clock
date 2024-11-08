import { store } from '../../store';
import { GridProps, Locale } from '../../types';
import en from './en';
import es from './es';
import fr from './fr';
import it from './it';
import pt from './pt';

const GRID_BY_LOCALE: Record<Locale, GridProps> = {
  'en-US': en,
  'es-ES': es,
  'it-IT': it,
  'fr-FR': fr,
  'pt-BR': pt,
};

export function highlightGrid(time: string) {
  const { getWordsToHighlight, words: wordObj } = GRID_BY_LOCALE[store.get('locale')];
  const [hours, minutes] = time.split(':').map((t) => parseInt(t));
  const words = getWordsToHighlight(hours, minutes).map((word) => wordObj[word as keyof typeof wordObj]);

  const chars = document.querySelectorAll('#clock .char');
  chars.forEach((cell) => cell.classList.remove('active'));

  words.forEach((word) =>
    word.forEach((index, pos) => {
      const char = chars[index];

      char.classList.add('active');
      char.classList.toggle('first-child', pos === 0);
      char.classList.toggle('last-child', pos === word.length - 1);
    }),
  );
}

export function drawGrid() {
  const clock = document.querySelector<HTMLDivElement>('#clock');
  const { grid, charsWithAphostrophe } = GRID_BY_LOCALE[store.get('locale')];

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
