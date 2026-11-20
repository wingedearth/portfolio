'use client';

import { useSyncExternalStore } from 'react';
import {
  THEME_STORAGE_KEY,
  applyThemeChoice,
  persistThemeChoice,
  readThemeChoice,
  themeChoiceAfter,
  themeChoiceLabel,
  type ThemeChoice,
} from '@/lib/theme';

const listeners = new Set<() => void>();

function emitThemeChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function ThemeIcon({ choice }: { choice: ThemeChoice }) {
  if (choice === 'light') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    );
  }

  if (choice === 'dark') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 14.5A7.5 7.5 0 0 1 9.5 4 6.5 6.5 0 1 0 20 14.5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThemeToggle() {
  const choice = useSyncExternalStore(subscribe, readThemeChoice, () => 'system' as const);

  const onClick = () => {
    const next = themeChoiceAfter(choice);
    applyThemeChoice(next);
    persistThemeChoice(next);
    emitThemeChange();
  };

  return (
    <button
      type="button"
      className="md-icon-button md-state"
      aria-label={themeChoiceLabel[choice]}
      title={themeChoiceLabel[choice]}
      onClick={onClick}
    >
      <ThemeIcon choice={choice} />
    </button>
  );
}
