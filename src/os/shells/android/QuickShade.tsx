'use client';

import React from 'react';
import { Sun, Power, X } from 'lucide-react';
import { usePrefsStore } from '../../../store/prefs';
import { QuickShadeTiles } from './QuickShadeTiles';
import { QuickShadeNotifications } from './QuickShadeNotifications';
import { AppId } from '../../../lib/constants';

interface QuickShadeProps {
  isOpen: boolean;
  onClose: () => void;
  onLockDevice?: () => void;
  brightness: number;
  onBrightnessChange: (v: number) => void;
  isWifi: boolean;
  onToggleWifi: () => void;
  isBt: boolean;
  onToggleBt: () => void;
  isTorch: boolean;
  onToggleTorch: () => void;
  onOpenApp?: (appId: AppId) => void;
}

export const QuickShade: React.FC<QuickShadeProps> = ({
  isOpen,
  onClose,
  onLockDevice,
  brightness,
  onBrightnessChange,
  isWifi,
  onToggleWifi,
  isBt,
  onToggleBt,
  isTorch,
  onToggleTorch,
  onOpenApp,
}) => {
  const resolvedTheme = usePrefsStore((s) => s.resolvedTheme);
  const setTheme = usePrefsStore((s) => s.setTheme);
  const language = usePrefsStore((s) => s.language);
  const setLanguage = usePrefsStore((s) => s.setLanguage);
  const reduceMotion = usePrefsStore((s) => s.reduceMotion);
  const setReduceMotion = usePrefsStore((s) => s.setReduceMotion);
  const setShell = usePrefsStore((s) => s.setShell);

  if (!isOpen) return null;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateStr = now.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  return (
    <div
      className="fixed inset-0 z-[1500] bg-[#10131a]/95 backdrop-blur-[24px] flex flex-col p-5 text-white animate-in slide-in-from-top-6 duration-200 select-none overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md mx-auto flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header: Clock, Date, and Lock/Power Button */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div>
            <span className="text-xl font-normal tracking-tight text-white">{timeStr}</span>
            <span className="block text-xs text-white/60">{dateStr}</span>
          </div>

          <div className="flex items-center gap-2">
            {onLockDevice && (
              <button
                onClick={() => {
                  onClose();
                  onLockDevice();
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
                title="Lock Device"
                aria-label="Lock Device"
              >
                <Power size={17} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
              title="Close Quick Settings"
              aria-label="Close"
            >
              <X size={17} />
            </button>
          </div>
        </div>

        {/* Quick Settings Tiles Grid */}
        <QuickShadeTiles
          isWifi={isWifi}
          onToggleWifi={onToggleWifi}
          isBt={isBt}
          onToggleBt={onToggleBt}
          isTorch={isTorch}
          onToggleTorch={onToggleTorch}
          isDark={resolvedTheme === 'dark'}
          onToggleDark={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          language={language}
          onToggleLanguage={() => setLanguage(language === 'en' ? 'id' : 'en')}
          isSaver={reduceMotion}
          onToggleSaver={() => setReduceMotion(!reduceMotion)}
          onSwitchShell={() => {
            setShell('windows');
            onClose();
          }}
        />

        {/* Brightness Slider */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/5 border border-white/5">
          <Sun size={17} className="text-white/70 shrink-0" />
          <input
            type="range"
            min="0.35"
            max="1"
            step="0.01"
            value={brightness}
            onChange={(e) => onBrightnessChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#A9C4FF]"
            aria-label="Brightness"
          />
          <span className="text-[11px] font-mono text-white/60 min-w-[32px] text-right">
            {Math.round(brightness * 100)}%
          </span>
        </div>

        {/* Notifications Stack */}
        <QuickShadeNotifications
          language={language}
          onOpenApp={(id) => {
            onClose();
            onOpenApp?.(id);
          }}
        />

        {/* Bottom Grab Handle for Gesture Pull-Up */}
        <div
          data-shade-handle
          onClick={onClose}
          className="flex justify-center py-2 cursor-grab active:cursor-grabbing"
          title="Swipe up or tap to close"
        >
          <div className="w-10 h-1.5 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
        </div>
      </div>
    </div>
  );
};
