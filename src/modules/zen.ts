import { store } from '../store';

export function initZenMode() {
  document.getElementById('zen')?.addEventListener('click', () => store.toggle('zen'));
  document.getElementById('exit-zen')?.addEventListener('click', () => store.set('zen', false));
}
