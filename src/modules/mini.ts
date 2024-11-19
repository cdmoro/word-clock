import { store } from '../store';

export function initMiniMode() {
  document.getElementById('mini')?.addEventListener('click', () => {
    if (store.get('fuzzy')) {
      store.set('fuzzy', false);
    }

    store.toggle('mini');
  });
}
