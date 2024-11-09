import { store } from '../store';

export function initFuzzy() {
  document.getElementById('fuzzy')?.addEventListener('click', () => store.toggle('fuzzy'));
}
