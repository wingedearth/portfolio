export const THEME_STORAGE_KEY = 'theme';

export type ThemeChoice = 'system' | 'light' | 'dark';

export function isThemeChoice(value: string | null): value is ThemeChoice {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function readThemeChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeChoice(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

export function applyThemeChoice(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === 'system') {
    root.removeAttribute('data-theme');
    return;
  }
  root.setAttribute('data-theme', choice);
}

export function persistThemeChoice(choice: ThemeChoice) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, choice);
  } catch {
    // Storage can be blocked. The in-page choice still applies.
  }
}

const nextChoice: Record<ThemeChoice, ThemeChoice> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
};

export function themeChoiceAfter(choice: ThemeChoice): ThemeChoice {
  return nextChoice[choice];
}

export const themeChoiceLabel: Record<ThemeChoice, string> = {
  system: 'Theme follows the system. Switch to the light theme.',
  light: 'Light theme. Switch to the dark theme.',
  dark: 'Dark theme. Switch to the system theme.',
};

/** Runs in the document head before paint. Keep in sync with applyThemeChoice. */
export const themeInitScript = `(function(){try{var path=location.pathname;if(path==="/studio"||path.indexOf("/studio/")===0){document.documentElement.setAttribute("data-theme","light");return;}var stored=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(stored==="light"||stored==="dark"){document.documentElement.setAttribute("data-theme",stored);return;}document.documentElement.removeAttribute("data-theme");}catch(e){}})();`;
