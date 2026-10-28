export const BREAKPOINTS = {
  PHONE_MAX: 599,
  TABLET_MAX: 1023,
  DESKTOP_MIN: 1024,
  WIDE_MIN: 1920,
} as const;

export const Z_INDEX = {
  WALLPAPER: 0,
  DESKTOP_ICONS: 10,
  WINDOWS_BASE: 100,
  WINDOWS_MAX: 899,
  DOCK: 900,
  FLYOUTS: 1000,
  CONTEXT_MENU: 1100,
  TOOLTIP: 1200,
  NOTCH: 1300,
  TOAST: 1350,
  BOOT_SCREEN: 2000,
} as const;

export const APP_IDS = [
  'about',
  'experience',
  'projects',
  'skills',
  'terminal',
  'resume',
  'contact',
  'settings',
] as const;

export type AppId = (typeof APP_IDS)[number];
