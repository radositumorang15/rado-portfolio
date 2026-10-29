'use client';

import React from 'react';
import { Moon, Sun, Globe, Monitor, Zap, X, Bell, Palette } from 'lucide-react';
import { usePrefsStore } from '../../../store/prefs';

interface QuickShadeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickShade: React.FC<QuickShadeProps> = ({ isOpen, onClose }) => {
  const resolvedTheme = usePrefsStore((s) => s.resolvedTheme);
  const setTheme = usePrefsStore((s) => s.setTheme);
  const language = usePrefsStore((s) => s.language);
  const setLanguage = usePrefsStore((s) => s.setLanguage);
  const reduceMotion = usePrefsStore((s) => s.reduceMotion);
  const setReduceMotion = usePrefsStore((s) => s.setReduceMotion);
  const themedIcons = usePrefsStore((s) => s.themedIcons);
  const setThemedIcons = usePrefsStore((s) => s.setThemedIcons);
  const setShell = usePrefsStore((s) => s.setShell);

  if (!isOpen) return null;

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1500] bg-black/75 backdrop-blur-[28px] flex flex-col p-5 text-white animate-in slide-in-from-top-6 duration-200 select-none overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-auto flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="text-sm font-semibold tracking-wide text-[var(--m3-on-surface)]">
            Quick Settings
          </span>
          <button
            onClick={() => {
              triggerHaptic();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* M3 Expressive Morphing Tiles Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Dark Theme Tile */}
          <button
            data-active={resolvedTheme === 'dark'}
            onClick={() => {
              triggerHaptic();
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
            }}
            className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer"
          >
            {resolvedTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            <div className="leading-tight">
              <p className="text-xs font-semibold">Dark Theme</p>
              <p className="text-[10px] opacity-75">{resolvedTheme === 'dark' ? 'Active' : 'Off'}</p>
            </div>
          </button>

          {/* Themed Icons Tile */}
          <button
            data-active={themedIcons}
            onClick={() => {
              triggerHaptic();
              setThemedIcons(!themedIcons);
            }}
            className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer"
          >
            <Palette size={18} />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Themed Icons</p>
              <p className="text-[10px] opacity-75">{themedIcons ? 'Monochrome' : '2.5D Color'}</p>
            </div>
          </button>

          {/* Language Tile */}
          <button
            data-active={language === 'id'}
            onClick={() => {
              triggerHaptic();
              setLanguage(language === 'en' ? 'id' : 'en');
            }}
            className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer"
          >
            <Globe size={18} />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Language</p>
              <p className="text-[10px] opacity-75">{language.toUpperCase()}</p>
            </div>
          </button>

          {/* Switch to Windows 11 */}
          <button
            data-active={false}
            onClick={() => {
              triggerHaptic();
              setShell('windows');
              onClose();
            }}
            className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer"
          >
            <Monitor size={18} />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Windows 11</p>
              <p className="text-[10px] opacity-75">Switch Shell</p>
            </div>
          </button>

          {/* Animations / Reduced Motion */}
          <button
            data-active={!reduceMotion}
            onClick={() => {
              triggerHaptic();
              setReduceMotion(!reduceMotion);
            }}
            className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer col-span-2"
          >
            <Zap size={18} />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Animations & Physics</p>
              <p className="text-[10px] opacity-75">{reduceMotion ? 'Reduced Motion' : 'M3 Spatial Spring Motion'}</p>
            </div>
          </button>
        </div>

        {/* Grouped Notification Cards Stack (M3 Expressive) */}
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--m3-on-surface-variant)] px-1">
            <Bell size={13} />
            <span>Notifications</span>
          </div>

          <div className="flex flex-col gap-1">
            {/* Top Card */}
            <div className="m3-card-stack-top p-3.5 bg-[var(--m3-surface-container-high)] border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--m3-primary)]">Rado Situmorang • Status</span>
                <span className="text-[10px] text-white/40">Now</span>
              </div>
              <p className="text-xs text-[var(--m3-on-surface)]">Available for Frontend & Android Developer opportunities.</p>
            </div>

            {/* Bottom Card */}
            <div className="m3-card-stack-bottom p-3.5 bg-[var(--m3-surface-container-high)] border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--m3-tertiary)]">Interactive CV</span>
                <span className="text-[10px] text-white/40">10m ago</span>
              </div>
              <p className="text-xs text-[var(--m3-on-surface)]">UNS Informatics Education final-year student. Tap to inspect resume.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
