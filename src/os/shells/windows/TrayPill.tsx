'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Sliders, Moon, Sun, Monitor, Globe } from 'lucide-react';
import { usePrefsStore, Language } from '../../../store/prefs';

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
          day: 'numeric',
          month: 'short',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <div className="fixed bottom-3 right-3 z-[900]">
      {/* Quick Settings Flyout */}
      {showSettingsFlyout && (
        <div className="glass-flyout absolute bottom-12 right-0 w-64 p-3.5 mb-1 text-white flex flex-col gap-2.5 z-[1000] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-semibold">
            <span>Quick Settings</span>
            <button
              onClick={() => setShowSettingsFlyout(false)}
              className="text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] text-white/60">Theme</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs border border-white/10 ${
                  resolvedTheme === 'light' ? 'bg-white/20 font-medium' : 'hover:bg-white/10'
                }`}
              >
                <Sun size={13} />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs border border-white/10 ${
                  resolvedTheme === 'dark' ? 'bg-white/20 font-medium' : 'hover:bg-white/10'
                }`}
              >
                <Moon size={13} />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1 border-t border-white/10">
            <span className="text-[11px] text-white/60">Switch Shell</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setShell('windows')}
                className="py-1.5 px-2 rounded-lg text-xs border border-white/10 hover:bg-white/10"
              >
                Windows 11
              </button>
              <button
                onClick={() => setShell('android')}
                className="py-1.5 px-2 rounded-lg text-xs border border-white/10 hover:bg-white/10"
              >
                Android 17
              </button>
            </div>
          </div>

          <a
            href="/classic"
            className="flex items-center justify-center gap-1.5 py-2 mt-1 rounded-lg text-xs bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Monitor size={13} />
            <span>Open Classic View (CV)</span>
          </a>
        </div>
      )}

      {/* Main Tray Pill */}
      <div className="glass-dock flex items-center gap-2 px-3 h-10 text-white text-xs select-none shadow-md">
        {/* Language button */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 hover:text-blue-400 font-semibold px-1 py-0.5 rounded transition-colors"
          aria-label="Toggle language"
        >
          <Globe size={13} />
          <span>{language.toUpperCase()}</span>
        </button>

        <div className="w-[1px] h-4 bg-white/20" />

        {/* Decorative Icons & Quick settings */}
        <div className="flex items-center gap-1.5 text-white/80">
          <Wifi size={13} />
          <Battery size={14} />
          <button
            onClick={() => setShowSettingsFlyout((prev) => !prev)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Quick Settings"
          >
            <Sliders size={13} />
          </button>
        </div>

        <div className="w-[1px] h-4 bg-white/20" />

        {/* Clock & Date */}
        <div
          onClick={() => {
            setShowCalendarFlyout((prev) => !prev);
            setShowSettingsFlyout(false);
          }}
          className="flex flex-col items-end leading-none cursor-pointer hover:text-blue-400 transition-colors"
        >
          <span className="font-medium text-[11px] min-w-[34px] text-right">
            {timeStr || '12:00'}
          </span>
          <span className="text-[10px] text-white/60 min-w-[34px] text-right">
            {dateStr || 'WIB'}
          </span>
        </div>
      </div>

      {/* Calendar Flyout */}
      {showCalendarFlyout && (
        <div className="glass-flyout absolute bottom-12 right-0 w-72 p-4 text-white flex flex-col gap-3 z-[1000] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-semibold">
            <span>{new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
            <button
              onClick={() => setShowCalendarFlyout(false)}
              className="text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-white/50 font-medium">
            <span>Min</span>
            <span>Sen</span>
            <span>Sel</span>
            <span>Rab</span>
            <span>Kam</span>
            <span>Jum</span>
            <span>Sab</span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const isToday = day === 28;
              return (
                <div
                  key={day}
                  className={`h-7 flex items-center justify-center rounded-full text-xs ${
                    isToday
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'hover:bg-white/10 text-white/80'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

