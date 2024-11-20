import { store } from '../store';

interface WordData {
  word: string;
  isSecondary: boolean;
}

const CAPITALIZE_WORDS = ["UHR"];

export function initFuzzy() {
  checkMini();
  document.getElementById('fuzzy')?.addEventListener('click', () => {
    checkMini();
    store.toggle('fuzzy');
  });
}

function checkMini() {
  if (store.get('mini')) {
    store.set('mini', false);
  }
}

export function generateFuzzyClockTime() {
  document.querySelector('#fuzzy-clock')!.textContent = '';

  const words: Record<string, WordData> = {};
  const activeChars = document.querySelectorAll<HTMLDivElement>('.char.active');

  activeChars.forEach((char) => {
    const wordIndex = char.getAttribute('data-word');
    if (wordIndex === null) return;

    const isSecondary = char.classList.contains('secondary');
    const isApostrophe = char.classList.contains('apostrophe');

    if (!words[wordIndex]) {
      words[wordIndex] = { word: '', isSecondary: true };
    }

    words[wordIndex].word += char.textContent || '';
    if (isApostrophe) {
      words[wordIndex].word += '’';
    }

    if (!isSecondary) {
      words[wordIndex].isSecondary = false;
    }
  });

  const content: string[] = [];

  Object.values(words).forEach(({ word, isSecondary }, index) => {
    word = index === 0 || CAPITALIZE_WORDS.includes(word) ? word.charAt(0) + word.slice(1).toLowerCase() : word.toLowerCase();
    content.push(isSecondary ? `<span class="secondary">${word}</span>` : word);
    }
  );

  document.querySelector('#fuzzy-clock')!.innerHTML = `<div class="fuzzy-wrapper">${content.join(' ')}</div>`;
}
