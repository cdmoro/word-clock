import { store } from '../../store';
import { GridProps, Locale } from '../../types';
import en from './en';
import es from './es';

const GRID_BY_LOCALE: Record<Locale, GridProps> = {
  'en-US': en,
  'es-ES': es,
  'it-IT': en,
  'fr-FR': en,
};

export function highlightGrid(time: string) {
  const [hours, minutes] = time.split(':').map((t) => parseInt(t));
  const positions = GRID_BY_LOCALE[store.get('locale')].getPositionsToHighlight(hours, minutes);
  const chars = document.querySelectorAll('#clock .char');

  chars.forEach((cell) => cell.classList.remove('active'));

  positions.forEach((index) => {
    chars[index].classList.add('active');
  });
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

      if (charsWithAphostrophe) {
        charEl.classList.toggle('aphostrophe', charsWithAphostrophe.includes(index));
      }

      charEl.textContent = char;

      clock?.appendChild(charEl);
    });
}

export function initGrid() {
  drawGrid();
}
