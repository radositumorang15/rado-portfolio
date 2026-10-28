'use client';

import React from 'react';
import { Moon, Sun, Globe, Monitor, Zap, X } from 'lucide-react';
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1500] bg-neutral-950/95 backdrop-blur-md flex flex-col p-6 text-white animate-in slide-in-from-top-6 duration-200 select-none overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-auto flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <span className="text-sm font-semibold tracking-wide">Quick Settings</span>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
            <X size={18} />
          </button>
        </div>

        {/* Quick Settings Tiles Grid (Android 17 style) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Theme Tile */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-colors ${
              resolvedTheme === 'dark'
                ? 'bg-blue-600/30 border-blue-500 text-white'
                : 'bg-white/10 border-white/10 text-white/80'
            }`}
          >
            {resolvedTheme === 'dark' ? <Moon size={18} className="text-blue-400" /> : <Sun size={18} className="text-amber-400" />}
            <div className="leading-tight">
              <p className="text-xs font-semibold">Dark theme</p>
              <p className="text-[10px] text-white/60">{resolvedTheme === 'dark' ? 'On' : 'Off'}</p>
            </div>
          </button>

          {/* Language Tile */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 text-left transition-colors"
          >
            <Globe size={18} className="text-blue-400" />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Language</p>
              <p className="text-[10px] text-white/60">{language.toUpperCase()}</p>
            </div>
          </button>

          {/* Classic View Tile */}
          <a
            href="/classic"
            className="flex items-center gap-3 p-3.5 rounded-2xl border border-white/10 bg-white/10 hover:bg-white/15 text-left transition-colors"
          >
            <Monitor size={18} className="text-emerald-400" />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Classic View</p>
              <p className="text-[10px] text-white/60">Open CV</p>
            </div>
          </a>

          {/* Motion Tile */}
          <button
            onClick={() => setReduceMotion(!reduceMotion)}
            className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-colors ${
              reduceMotion ? 'bg-amber-600/30 border-amber-500' : 'bg-white/10 border-white/10'
            }`}
          >
            <Zap size={18} className={reduceMotion ? 'text-amber-400' : 'text-white/60'} />
            <div className="leading-tight">
              <p className="text-xs font-semibold">Animations</p>
              <p className="text-[10px] text-white/60">{reduceMotion ? 'Reduced' : 'Full'}</p>
            </div>
          </button>
        </div>

        {/* System Notifications / History */}
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-xs font-semibold text-white/70">Notifications</span>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400">RadoOS • Status</span>
              <span className="text-[10px] text-white/40">Now</span>
            </div>
            <p className="text-xs text-white/90">Available for Frontend & Android Developer opportunities.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
