import { create } from 'zustand';

export type Theme = 'system' | 'light' | 'dark';
export type Shell = 'auto' | 'windows' | 'android';
export type Language = 'en' | 'id';

interface PrefsState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  shell: Shell;
  resolvedShell: 'windows' | 'android';
  language: Language;
  accent: string;
  reduceMotion: boolean;
  dockAutoHide: boolean;
  dynamicColor: boolean;
  setTheme: (theme: Theme) => void;
  setShell: (shell: Shell) => void;
  setLanguage: (lang: Language) => void;
  setAccent: (accent: string) => void;
  setReduceMotion: (reduce: boolean) => void;
  setDockAutoHide: (autoHide: boolean) => void;
  setDynamicColor: (dynamic: boolean) => void;
  updateResponsiveShell: () => void;
  syncFromDOM: () => void;
}

export const usePrefsStore = create<PrefsState>((set, get) => ({
  theme: 'system',
  resolvedTheme: 'dark',
  shell: 'auto',
  resolvedShell: 'windows',
  language: 'en',
  accent: 'blue',
  reduceMotion: false,
  dockAutoHide: true,
  dynamicColor: true,

  setTheme: (theme) => {
    let resolved: 'light' | 'dark' = 'dark';
    if (theme === 'system') {
      resolved = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } else {
      resolved = theme;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('rn_theme', theme);
      document.documentElement.setAttribute('data-theme', resolved);
    }
    set({ theme, resolvedTheme: resolved });
  },

  setShell: (shell) => {
    let resolved: 'windows' | 'android' = 'windows';
    if (shell === 'auto') {
      resolved = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 'windows' : 'android';
    } else {
      resolved = shell;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('rn_shell', shell);
      document.documentElement.setAttribute('data-shell', resolved);
    }
    set({ shell, resolvedShell: resolved });
  },

  setLanguage: (language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rn_lang', language);
      document.documentElement.setAttribute('lang', language);
    }
    set({ language });
  },

  setAccent: (accent) => {
    if (typeof window !== 'undefined') {
      import('../lib/colors').then(({ applyAccentColor }) => {
        applyAccentColor(accent);
      });
    }
    set({ accent });
  },

  setReduceMotion: (reduceMotion) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rn_motion', String(reduceMotion));
    }
    set({ reduceMotion });
  },

  setDockAutoHide: (dockAutoHide) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rn_autohide', String(dockAutoHide));
    }
    set({ dockAutoHide });
  },

  setDynamicColor: (dynamicColor) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rn_dynamic_color', String(dynamicColor));
    }
    set({ dynamicColor });
  },

  updateResponsiveShell: () => {
    if (typeof window === 'undefined') return;
    const isDesktop = window.innerWidth >= 1024;
    const nextResolved: 'windows' | 'android' = isDesktop ? 'windows' : 'android';
    const { resolvedShell, shell } = get();

    if (shell === 'auto' || (isDesktop && resolvedShell === 'android') || (!isDesktop && resolvedShell === 'windows')) {
      if (nextResolved !== resolvedShell) {
        document.documentElement.setAttribute('data-shell', nextResolved);
        set({ resolvedShell: nextResolved, shell: 'auto' });
      }
    }
  },

  syncFromDOM: () => {
    if (typeof window === 'undefined') return;
    const domTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | null;
    const isDesktop = window.innerWidth >= 1024;
    let savedShell = localStorage.getItem('rn_shell') as Shell | null;

    if (!savedShell || savedShell === 'auto' || (isDesktop && savedShell === 'android') || (!isDesktop && savedShell === 'windows')) {
      savedShell = 'auto';
      localStorage.setItem('rn_shell', 'auto');
    }

    const effectiveShell = savedShell === 'auto' ? (isDesktop ? 'windows' : 'android') : savedShell;
    document.documentElement.setAttribute('data-shell', effectiveShell);

    const savedLang = localStorage.getItem('rn_lang') as Language | null;
    const savedMotion = localStorage.getItem('rn_motion') === 'true';
    const savedAccent = localStorage.getItem('rn_accent');

    if (savedAccent) {
      import('../lib/colors').then(({ applyAccentColor }) => {
        applyAccentColor(savedAccent);
      });
    }

    set({
      shell: savedShell,
      resolvedTheme: domTheme || 'dark',
      resolvedShell: effectiveShell,
      language: savedLang || 'en',
      accent: savedAccent || 'blue',
      reduceMotion: savedMotion,
    });
  },
}));

