'use client';

import React from 'react';
import { Moon, Sun, Monitor, Smartphone, Globe, EyeOff, Layout } from 'lucide-react';

interface SettingsViewProps {
  theme: 'system' | 'light' | 'dark';
  shell: 'auto' | 'windows' | 'android';
  language: 'en' | 'id';
  accent?: string;
  reduceMotion: boolean;
  dockAutoHide: boolean;
  onThemeChange?: (t: 'system' | 'light' | 'dark') => void;
  onShellChange?: (s: 'auto' | 'windows' | 'android') => void;
  onLanguageChange?: (l: 'en' | 'id') => void;
  onAccentChange?: (a: string) => void;
  onReduceMotionChange?: (rm: boolean) => void;
  onDockAutoHideChange?: (ah: boolean) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  theme,
  shell,
  language,
  accent = 'blue',
  reduceMotion,
  dockAutoHide,
  onThemeChange,
  onShellChange,
  onLanguageChange,
  onAccentChange,
  onReduceMotionChange,
  onDockAutoHideChange,
}) => {
  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6 text-[var(--rn-text)]">
      <div className="pb-4 border-b border-[var(--rn-border)]">
        <h1 className="text-xl font-bold">Settings & Personalization</h1>
        <p className="text-xs text-[var(--rn-text-muted)]">Configure RadoOS appearance, shell metaphors, and preferences</p>
      </div>

      {/* Theme */}
      <div className="p-4 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)]">Appearance Theme</h2>
        <div className="grid grid-cols-3 gap-3">
          {(['system', 'light', 'dark'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onThemeChange?.(t)}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-[var(--rn-radius-control)] text-xs capitalize border transition-all ${
                theme === t
                  ? 'bg-[var(--rn-accent)] text-[var(--rn-on-accent)] font-semibold border-[var(--rn-accent)] shadow-xs'
                  : 'bg-[var(--rn-surface)] text-[var(--rn-text)] border-[var(--rn-border)] hover:bg-[var(--rn-accent-soft)]'
              }`}
            >
              {t === 'light' ? <Sun size={14} /> : t === 'dark' ? <Moon size={14} /> : <Monitor size={14} />}
              <span>{t}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="p-4 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)]">Accent Color (Dynamic Tokens)</h2>
        <div className="flex flex-wrap gap-2.5">
          {[
            { id: 'blue', color: '#0B57D0', label: 'Blue' },
            { id: 'emerald', color: '#10B981', label: 'Emerald' },
            { id: 'purple', color: '#7C3AED', label: 'Violet' },
            { id: 'amber', color: '#D97706', label: 'Amber' },
            { id: 'rose', color: '#E11D48', label: 'Rose' },
            { id: 'cyan', color: '#0891B2', label: 'Cyan' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => onAccentChange?.(c.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                accent === c.id
                  ? 'border-white ring-2 ring-white/30 bg-white/10'
                  : 'border-white/10 hover:bg-white/5'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Shell Metaphor */}
      <div className="p-4 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)]">OS Shell Interface</h2>
        <div className="grid grid-cols-3 gap-3">
          {(['auto', 'windows', 'android'] as const).map((s) => (
            <button
              key={s}
              onClick={() => onShellChange?.(s)}
              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-[var(--rn-radius-control)] text-xs capitalize border transition-all ${
                shell === s
                  ? 'bg-[var(--rn-accent)] text-[var(--rn-on-accent)] font-semibold border-[var(--rn-accent)] shadow-xs'
                  : 'bg-[var(--rn-surface)] text-[var(--rn-text)] border-[var(--rn-border)] hover:bg-[var(--rn-accent-soft)]'
              }`}
            >
              {s === 'android' ? <Smartphone size={14} /> : <Layout size={14} />}
              <span>{s === 'auto' ? 'Auto (Device)' : s === 'windows' ? 'Windows 11' : 'Android 17'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="p-4 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)]">Display Language</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onLanguageChange?.('en')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-[var(--rn-radius-control)] text-xs border transition-all ${
              language === 'en'
                ? 'bg-[var(--rn-accent)] text-[var(--rn-on-accent)] font-semibold border-[var(--rn-accent)] shadow-xs'
                : 'bg-[var(--rn-surface)] text-[var(--rn-text)] border-[var(--rn-border)] hover:bg-[var(--rn-accent-soft)]'
            }`}
          >
            <Globe size={14} />
            <span>English (Default)</span>
          </button>
          <button
            onClick={() => onLanguageChange?.('id')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-[var(--rn-radius-control)] text-xs border transition-all ${
              language === 'id'
                ? 'bg-[var(--rn-accent)] text-[var(--rn-on-accent)] font-semibold border-[var(--rn-accent)] shadow-xs'
                : 'bg-[var(--rn-surface)] text-[var(--rn-text)] border-[var(--rn-border)] hover:bg-[var(--rn-accent-soft)]'
            }`}
          >
            <Globe size={14} />
            <span>Bahasa Indonesia</span>
          </button>
        </div>
      </div>

      {/* Toggles */}
      <div className="p-4 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold">Reduce Motion</h3>
            <p className="text-[11px] text-[var(--rn-text-muted)]">Disable spring animations for instant transitions</p>
          </div>
          <input
            type="checkbox"
            checked={reduceMotion}
            onChange={(e) => onReduceMotionChange?.(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-[var(--rn-accent)]"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[var(--rn-border)]">
          <div>
            <h3 className="text-xs font-semibold">Dock Auto-Hide</h3>
            <p className="text-[11px] text-[var(--rn-text-muted)]">Hide dock when a window is maximized</p>
          </div>
          <input
            type="checkbox"
            checked={dockAutoHide}
            onChange={(e) => onDockAutoHideChange?.(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-[var(--rn-accent)]"
          />
        </div>
      </div>

      {/* Classic View link */}
      <div className="p-4 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold">Prefer a Standard Portfolio?</h3>
          <p className="text-[11px] text-[var(--rn-text-muted)]">Access all CV information on a clean single-page layout</p>
        </div>
        <a
          href="/classic"
          className="px-4 py-2 rounded-[var(--rn-radius-control)] bg-[var(--rn-surface)] border border-[var(--rn-border)] text-xs font-medium hover:bg-[var(--rn-accent-soft)] transition-colors"
        >
          Open Classic View
        </a>
      </div>
    </div>
  );
};
