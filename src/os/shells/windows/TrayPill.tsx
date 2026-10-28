'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, Moon, Sun, Smartphone, Globe, ChevronUp } from 'lucide-react';
import { usePrefsStore } from '../../../store/prefs';

export const TrayPill: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const setLanguage = usePrefsStore((s) => s.setLanguage);
  const resolvedTheme = usePrefsStore((s) => s.resolvedTheme);
  const setTheme = usePrefsStore((s) => s.setTheme);
  const setShell = usePrefsStore((s) => s.setShell);

  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [showSettingsFlyout, setShowSettingsFlyout] = useState(false);
  const [showCalendarFlyout, setShowCalendarFlyout] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString('id-ID', {
          timeZone: 'Asia/Jakarta',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center h-full select-none">
      {/* Quick Settings Flyout */}
      {showSettingsFlyout && (
        <div
          className="absolute bottom-13 right-0 w-72 p-4 rounded-xl bg-[#202020]/95 backdrop-blur-2xl border border-white/10 text-white shadow-2xl z-[1100] animate-in fade-in slide-in-from-bottom-2 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10 text-xs font-semibold">
            <span>Quick Settings</span>
            <button
              onClick={() => setShowSettingsFlyout(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
              className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs text-left transition-colors ${
                resolvedTheme === 'dark' ? 'bg-blue-600/30 border-blue-500' : 'bg-white/10 border-white/10'
              }`}
            >
              {resolvedTheme === 'dark' ? <Moon size={14} className="text-blue-400" /> : <Sun size={14} className="text-amber-400" />}
              <span className="truncate">Theme: {resolvedTheme}</span>
            </button>

            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-white/10 bg-white/10 hover:bg-white/15 text-xs text-left transition-colors"
            >
              <Globe size={14} className="text-blue-400" />
              <span>Lang: {language.toUpperCase()}</span>
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col gap-1.5">
            <span className="text-[11px] text-white/60">Switch Operating System</span>
            <button
              onClick={() => {
                setShell('android');
                setShowSettingsFlyout(false);
              }}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium shadow-sm transition-all"
            >
              <Smartphone size={14} />
              <span>Switch to Android 17 Shell</span>
            </button>
          </div>
        </div>
      )}

      {/* Calendar Flyout */}
      {showCalendarFlyout && (
        <div
          className="absolute bottom-13 right-0 w-64 p-4 rounded-xl bg-[#202020]/95 backdrop-blur-2xl border border-white/10 text-white shadow-2xl z-[1100] animate-in fade-in slide-in-from-bottom-2 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-sm font-bold text-blue-400">{timeStr} WIB</span>
            <span className="text-xs text-white/60">{dateStr}</span>
          </div>
          <div className="py-3 text-xs text-center text-white/80">
            <p className="font-semibold text-white">Jakarta Time (UTC+7)</p>
            <p className="text-[11px] text-white/50 mt-1">Ready for collaborative engineering</p>
          </div>
        </div>
      )}

      {/* Tray Icons Bar */}
      <div className="flex items-center h-full gap-0.5">
        {/* Switch Shell Fast Pill */}
        <button
          onClick={() => setShell('android')}
          title="Switch to Android 17 Shell"
          className="flex items-center gap-1.5 px-2 py-1 h-8 rounded-md hover:bg-white/10 text-white/80 hover:text-white text-[11px] font-medium transition-colors"
        >
          <Smartphone size={13} className="text-emerald-400" />
          <span className="hidden xl:inline">Android 17</span>
        </button>

        {/* Chevron overflow */}
        <button
          className="w-6 h-8 flex items-center justify-center rounded-md hover:bg-white/10 text-white/60 hover:text-white"
          title="Hidden icons"
        >
          <ChevronUp size={14} />
        </button>

        {/* Status cluster (Wifi + Volume + Battery) */}
        <button
          onClick={() => {
            setShowSettingsFlyout((prev) => !prev);
            setShowCalendarFlyout(false);
          }}
          className="flex items-center gap-2 px-2 py-1 h-8 rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          title="Internet, Sound, Battery (Quick Settings)"
        >
          <Wifi size={14} />
          <Volume2 size={14} />
          <Battery size={15} />
        </button>

        {/* Clock & Date (2-line layout) */}
        <button
          onClick={() => {
            setShowCalendarFlyout((prev) => !prev);
            setShowSettingsFlyout(false);
          }}
          className="flex flex-col items-end justify-center px-2 py-1 h-8 rounded-md hover:bg-white/10 leading-tight transition-colors"
          title="Date and Time"
        >
          <span className="text-[11px] font-medium text-white/90">{timeStr || '12:00'}</span>
          <span className="text-[10px] text-white/60">{dateStr || '28/10/2026'}</span>
        </button>

        {/* Show Desktop Line (far right strip) */}
        <div
          onClick={() => {
            // Minimize all or focus
          }}
          title="Show Desktop"
          className="w-1.5 h-full hover:bg-white/20 border-l border-white/15 cursor-pointer ml-1"
        />
      </div>
    </div>
  );
};
