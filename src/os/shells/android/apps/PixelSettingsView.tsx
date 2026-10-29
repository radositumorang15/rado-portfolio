'use client';

import React from 'react';
import { usePrefsStore, Theme, Language } from '../../../../store/prefs';
import { PixelAdaptiveIcon } from '../PixelAdaptiveIcon';
import { notch } from '../../../notch';

export const PixelSettingsView: React.FC = () => {
  const theme = usePrefsStore((s) => s.theme);
  const setTheme = usePrefsStore((s) => s.setTheme);
  const language = usePrefsStore((s) => s.language);
  const setLanguage = usePrefsStore((s) => s.setLanguage);
  const accent = usePrefsStore((s) => s.accent);
  const setAccent = usePrefsStore((s) => s.setAccent);
  const themedIcons = usePrefsStore((s) => s.themedIcons);
  const setThemedIcons = usePrefsStore((s) => s.setThemedIcons);
  const setShell = usePrefsStore((s) => s.setShell);

  const handleToggleThemedIcons = () => {
    const next = !themedIcons;
    setThemedIcons(next);
    notch.show({
      title: 'Wallpaper & Style',
      subtitle: next ? 'Themed Icons (Monochrome) enabled' : 'Default 2.5D Colorful Icons enabled',
    });
  };

  return (
    <div className="flex flex-col gap-5 p-4 pb-16 text-[var(--m3-on-surface)] font-sans">
      {/* 1. WALLPAPER & STYLE PREVIEW CARD */}
      <div className="p-4 rounded-[28px] bg-[var(--m3-surface-container)] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
            Wallpaper & Style
          </span>
          <span className="text-[11px] text-[var(--m3-on-surface-variant)]">Android 16 M3</span>
        </div>

        {/* Live Icon Style Preview */}
        <div className="p-3.5 rounded-[20px] bg-[var(--m3-surface-container-high)] flex items-center justify-around">
          <div className="flex flex-col items-center gap-1.5">
            <PixelAdaptiveIcon id="about" themed={themedIcons} size={42} />
            <span className="text-[10px] text-[var(--m3-on-surface-variant)]">About</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <PixelAdaptiveIcon id="projects" themed={themedIcons} size={42} />
            <span className="text-[10px] text-[var(--m3-on-surface-variant)]">Projects</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <PixelAdaptiveIcon id="skills" themed={themedIcons} size={42} />
            <span className="text-[10px] text-[var(--m3-on-surface-variant)]">Skills</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <PixelAdaptiveIcon id="contact" themed={themedIcons} size={42} />
            <span className="text-[10px] text-[var(--m3-on-surface-variant)]">Contact</span>
          </div>
        </div>

        {/* THEMED ICONS SWITCH ROW (ASYMMETRIC CARD) */}
        <div
          onClick={handleToggleThemedIcons}
          className="p-3.5 rounded-[18px] bg-[var(--m3-surface-container-high)] hover:bg-[var(--m3-surface-container-highest)] cursor-pointer transition-colors flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-rounded text-[22px] text-[var(--m3-primary)]">
              {themedIcons ? 'palette' : 'lens'}
            </span>
            <div>
              <p className="text-xs font-semibold">Themed Icons</p>
              <p className="text-[11px] text-[var(--m3-on-surface-variant)]">
                {themedIcons ? 'Monochrome dynamic color' : '2.5D Full color adaptive icons'}
              </p>
            </div>
          </div>

          {/* M3 Switch Component */}
          <div
            className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${
              themedIcons ? 'bg-[var(--m3-primary)] justify-end' : 'bg-white/20 justify-start'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full transition-all ${
                themedIcons ? 'bg-[var(--m3-on-primary)] shadow-sm' : 'bg-white/60'
              }`}
            />
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC COLOR PALETTE (MONET) */}
      <section className="flex flex-col gap-2">
        <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          Material You Dynamic Accent
        </h3>
        <div className="p-4 rounded-[24px] bg-[var(--m3-surface-container)] flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'blue', color: '#0B57D0', label: 'Bay Blue' },
              { id: 'emerald', color: '#10B981', label: 'Sage' },
              { id: 'purple', color: '#7C3AED', label: 'Orchid' },
              { id: 'amber', color: '#D97706', label: 'Amber' },
              { id: 'rose', color: '#E11D48', label: 'Coral' },
              { id: 'cyan', color: '#0891B2', label: 'Obsidian' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setAccent(c.id)}
                className={`flex items-center gap-2 p-2 rounded-full border text-xs font-medium transition-all ${
                  accent === c.id
                    ? 'border-[var(--m3-primary)] bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)]'
                    : 'border-transparent bg-[var(--m3-surface-container-high)] text-[var(--m3-on-surface-variant)] hover:bg-[var(--m3-surface-container-highest)]'
                }`}
              >
                <span className="w-4 h-4 rounded-full shrink-0 shadow-xs" style={{ backgroundColor: c.color }} />
                <span className="truncate">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SYSTEM APPEARANCE */}
      <section className="flex flex-col gap-2">
        <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          System Theme
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {(['system', 'light', 'dark'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs capitalize transition-all ${
                theme === t
                  ? 'bg-[var(--m3-primary)] text-[var(--m3-on-primary)] font-bold shadow-xs'
                  : 'bg-[var(--m3-surface-container)] text-[var(--m3-on-surface-variant)] hover:bg-[var(--m3-surface-container-high)]'
              }`}
            >
              <span className="material-symbols-rounded text-[16px]">
                {t === 'light' ? 'light_mode' : t === 'dark' ? 'dark_mode' : 'settings_brightness'}
              </span>
              <span>{t}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. LANGUAGE & OS SHELL */}
      <section className="flex flex-col gap-2">
        <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          System Operations
        </h3>
        <div className="flex flex-col gap-[3px]">
          <div className="p-3.5 rounded-t-[20px] rounded-b-[4px] bg-[var(--m3-surface-container)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-rounded text-[20px] text-[var(--m3-primary)]">translate</span>
              <span className="text-xs font-semibold">Language</span>
            </div>
            <div className="flex gap-1">
              {(['en', 'id'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase transition-all ${
                    language === l
                      ? 'bg-[var(--m3-primary)] text-[var(--m3-on-primary)]'
                      : 'bg-[var(--m3-surface-container-high)] text-[var(--m3-on-surface-variant)]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div
            onClick={() => setShell('windows')}
            className="p-3.5 rounded-t-[4px] rounded-b-[20px] bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] cursor-pointer transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-rounded text-[20px] text-blue-400">desktop_windows</span>
              <div>
                <p className="text-xs font-semibold">Switch to Windows 11</p>
                <p className="text-[11px] text-[var(--m3-on-surface-variant)]">Switch desktop shell to Fluent 2</p>
              </div>
            </div>
            <span className="material-symbols-rounded text-[18px] text-[var(--m3-on-surface-variant)]">chevron_right</span>
          </div>
        </div>
      </section>
    </div>
  );
};

