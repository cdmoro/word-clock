import { store } from '../store';

export function initSolid() {
  document.getElementById('solid')?.addEventListener('click', () => store.toggle('solid'));
}
