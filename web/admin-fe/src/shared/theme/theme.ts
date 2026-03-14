export type AdminTheme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'wjb-admin-theme';
const THEME_ATTRIBUTE = 'data-theme';
const THEME_TRANSITION_CLASS = 'theme-transitioning';
const THEME_TRANSITION_MS = 1000;

let transitionTimer: number | undefined;

function isTheme(value: string | null): value is AdminTheme {
  return value === 'light' || value === 'dark';
}

export function getStoredTheme(): AdminTheme {
  if (typeof window === 'undefined') return 'light';

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(stored) ? stored : 'light';
}

export function applyTheme(theme: AdminTheme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
}

export function setTheme(theme: AdminTheme) {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add(THEME_TRANSITION_CLASS);
    if (transitionTimer) window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      document.documentElement.classList.remove(THEME_TRANSITION_CLASS);
    }, THEME_TRANSITION_MS);
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
  applyTheme(theme);
}

export function initTheme() {
  const theme = getStoredTheme();
  applyTheme(theme);
  return theme;
}
