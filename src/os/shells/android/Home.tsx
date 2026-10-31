'use client';

import React from 'react';
import { AppId } from '../../../lib/constants';
import { PixelAdaptiveIcon } from './PixelAdaptiveIcon';
import { usePrefsStore } from '../../../store/prefs';

interface HomeProps {
  onOpenApp: (id: AppId, originRect?: DOMRect) => void;
  onOpenSearch: () => void;
  onOpenRecents?: () => void;
}

interface AppItem {
  id: AppId;
  label: string;
}

const MAIN_APPS: AppItem[] = [
  { id: 'about', label: 'About' },
  { id: 'androidstudio', label: 'Play Store' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Chrome' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
  { id: 'settings', label: 'Settings' },
];

const DOCK_APPS: AppItem[] = [
  { id: 'contact', label: 'Contact' },
  { id: 'androidstudio', label: 'Play Store' },
  { id: 'projects', label: 'Chrome' },
  { id: 'settings', label: 'Settings' },
];

export const Home: React.FC<HomeProps> = ({ onOpenApp, onOpenSearch, onOpenRecents }) => {
  const themedIcons = usePrefsStore((s) => s.themedIcons);
  const language = usePrefsStore((s) => s.language);

  const handleLaunch = (id: AppId, e?: React.MouseEvent) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(8);
    }
    const rect = e?.currentTarget?.getBoundingClientRect();
    onOpenApp(id, rect);
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className="relative z-10 flex-1 flex flex-col justify-between w-full px-5 pt-1 pb-2 select-none overflow-y-auto text-[var(--m3-on-surface)] font-sans">
      {/* 1. At a Glance & M3 Profile Widget */}
      <div className="flex flex-col gap-3.5 mt-1">
        <div className="px-1">
          <p className="text-[23px] font-medium tracking-tight leading-snug">
            {dateStr}
          </p>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--m3-on-surface-variant)]">
            <span className="material-symbols-rounded text-[17px] text-[#FDD663]">partly_cloudy_day</span>
            <span>29°C · Surakarta</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-[#81C995] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#81C995] animate-pulse" />
              {language === 'id' ? 'Tersedia bekerja' : 'Open to work'}
            </span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="p-4 rounded-[26px] bg-[var(--m3-surface-container)]/90 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-[var(--m3-primary-container)]">
                <path d="M50 0 C62 0 70 10 80 14 C90 18 100 26 100 38 C100 50 92 60 92 70 C92 82 82 92 70 92 C60 92 50 100 38 100 C26 100 18 90 14 80 C10 70 0 62 0 50 C0 38 10 30 14 20 C18 10 26 0 38 0 Z" />
              </svg>
              <span className="absolute text-sm font-bold text-[var(--m3-on-primary-container)]">RN</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold truncate leading-tight text-[var(--m3-on-surface)]">
                Rado Nelson Dela Sadrak S.
              </h1>
              <p className="text-xs text-[var(--m3-primary)] font-medium mt-0.5 truncate">Mobile Developer</p>
              <p className="text-[11px] text-[var(--m3-on-surface-variant)] mt-0.5 truncate">Informatics — UNS</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3.5">
            <button
              onClick={(e) => handleLaunch('contact', e)}
              className="flex items-center justify-center gap-2 h-9 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-semibold active:scale-95 transition-transform"
            >
              <span className="material-symbols-rounded text-[17px]">send</span>
              {language === 'id' ? 'Hubungi Saya' : 'Contact Me'}
            </button>
            <button
              onClick={(e) => handleLaunch('resume', e)}
              className="flex items-center justify-center gap-2 h-9 rounded-full bg-[var(--m3-surface-container-high)] text-[var(--m3-on-surface)] text-xs font-semibold active:scale-95 transition-transform"
            >
              <span className="material-symbols-rounded text-[17px]">description</span>
              {language === 'id' ? 'Lihat CV' : 'View CV'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. App Icons Grid + Dock + Search */}
      <div className="flex flex-col gap-3.5 mt-auto pt-2">
        <div className="grid grid-cols-4 gap-y-3 gap-x-2 justify-items-center">
          {MAIN_APPS.map((app, idx) => (
            <button
              key={app.id}
              onClick={(e) => handleLaunch(app.id, e)}
              className="pixel-app-item group flex flex-col items-center gap-1 focus:outline-none cursor-pointer"
              style={{ '--i': idx } as React.CSSProperties}
            >
              <div className="pixel-icon-target transition-transform duration-150">
                <PixelAdaptiveIcon id={app.id} themed={themedIcons} size={54} />
              </div>
              <span className="text-[11px] font-medium text-[var(--m3-on-surface)] tracking-tight truncate max-w-[68px]">
                {app.label}
              </span>
            </button>
          ))}
        </div>

        {/* Dock Apps */}
        <div className="grid grid-cols-4 gap-2 justify-items-center pt-1">
          {DOCK_APPS.map((app, idx) => (
            <button
              key={`dock-${app.id}`}
              onClick={(e) => handleLaunch(app.id, e)}
              className="pixel-app-item group focus:outline-none cursor-pointer"
              style={{ '--i': idx + 8 } as React.CSSProperties}
              aria-label={app.label}
            >
              <div className="pixel-icon-target transition-transform duration-150">
                <PixelAdaptiveIcon id={app.id} themed={themedIcons} size={54} />
              </div>
            </button>
          ))}
        </div>

        {/* Pixel Bottom Search Bar */}
        <div
          onClick={onOpenSearch}
          className="flex items-center justify-between h-[48px] px-4 rounded-full bg-[var(--m3-surface-container-high)]/95 backdrop-blur-md shadow-sm cursor-pointer active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-2.5 flex-1">
            <span className="text-base font-bold text-[var(--m3-on-secondary-container)]">G</span>
            <span className="text-xs text-[var(--m3-on-surface-variant)] truncate">
              {language === 'id' ? 'Cari aplikasi & project...' : 'Search apps & projects...'}
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-[var(--m3-on-secondary-container)]">
            <span className="material-symbols-rounded text-[20px]">mic</span>
            <span className="material-symbols-rounded text-[20px]">photo_camera</span>
          </div>
        </div>

        {/* Bottom Gesture Pill */}
        <div
          className="flex justify-center pb-0.5 cursor-pointer"
          onClick={onOpenRecents}
          title="Recents App Switcher"
        >
          <div className="w-28 h-1 rounded-full bg-[var(--m3-on-surface)]/50 hover:bg-[var(--m3-on-surface)]/80 transition-colors" />
        </div>
      </div>
    </div>
  );
};
