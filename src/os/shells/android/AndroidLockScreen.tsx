'use client';

import React, { useState, useEffect } from 'react';
import { playAndroidTapSound } from '../../../lib/audio';

interface AndroidLockScreenProps {
  onUnlock: () => void;
}

export const AndroidLockScreen: React.FC<AndroidLockScreenProps> = ({ onUnlock }) => {
  const [hourStr, setHourStr] = useState<string>('17');
  const [minStr, setMinStr] = useState<string>('34');
  const [dateStr, setDateStr] = useState<string>('');
  const [isSlidingUp, setIsSlidingUp] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setHourStr(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          hour12: false,
        })
      );
      setMinStr(
        now.toLocaleTimeString('id-ID', {
          timeZone: 'Asia/Jakarta',
          minute: '2-digit',
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString('id-ID', {
          timeZone: 'Asia/Jakarta',
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    if (isSlidingUp) return;
    setIsSlidingUp(true);
    playAndroidTapSound();
    setTimeout(() => {
      onUnlock();
    }, 400);
  };

  return (
    <div
      onClick={handleUnlock}
      className={`fixed inset-0 z-[1900] select-none cursor-pointer flex flex-col justify-between items-center py-10 px-6 bg-cover bg-center text-[#E2E2E6] font-sans transition-transform duration-400 ease-[cubic-bezier(0.1,0.9,0.2,1)] ${
        isSlidingUp ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
      style={{
        backgroundImage: "url('/pixel.jpg')",
        backgroundColor: '#0c0f17',
      }}
    >
      {/* Dark Ambient Layer for Readability */}
      <div className="absolute inset-0 bg-black/45 pointer-events-none" />

      {/* Top Punch Hole & Status */}
      <div className="relative z-10 w-full flex items-center justify-between px-2 text-xs text-neutral-300">
        <span className="text-[11px] font-medium text-neutral-200">Telkomsel</span>
        <div className="w-[11px] h-[11px] rounded-full bg-black ring-[1px] ring-white/10 shadow-inner flex items-center justify-center">
          <div className="w-[3px] h-[3px] rounded-full bg-[#111827]/80" />
        </div>
        <div className="flex items-center gap-1.5 text-neutral-200">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.4 20.6L19.4 3.6C20.1 2.9 21.3 3.4 21.3 4.4V20.5C21.3 21.3 20.7 22 19.9 22H3.8C2.8 22 2.3 20.8 2.4 20.6Z" />
          </svg>
          <svg width="14" height="11" viewBox="0 0 24 19" fill="currentColor">
            <path d="M12 3.5C7.5 3.5 3.39 5.3 0.29 8.24C-0.1 8.62 -0.1 9.25 0.29 9.63L11.29 20.63C11.68 21.02 12.31 21.02 12.7 20.63L23.7 9.63C24.1 9.25 24.1 8.62 23.71 8.24C20.61 5.3 16.5 3.5 12 3.5Z" />
          </svg>
          <svg width="20" height="10" viewBox="0 0 22 11" fill="none">
            <rect x="0.6" y="0.6" width="18" height="9.8" rx="2.4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M20.2 3.8C20.8 4.1 20.8 6.9 20.2 7.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <rect x="2.2" y="2.2" width="13.5" height="6.6" rx="1.2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Center Pixel Stacked Digital Clock */}
      <div className="relative z-10 flex flex-col items-center select-none my-auto">
        <div className="flex flex-col items-center leading-[0.85] font-semibold tracking-tighter text-[#A8C7FA] select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
          <span className="text-[110px]">{hourStr}</span>
          <span className="text-[110px]">{minStr}</span>
        </div>

        {/* Date & Weather Subtitle */}
        <div className="flex items-center gap-2 mt-4 text-sm font-medium text-neutral-200 drop-shadow-md">
          <span>{dateStr || 'Rab, 28 Okt'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-rounded text-amber-300 text-base">partly_cloudy_day</span>
            <span>29°C</span>
          </span>
        </div>
      </div>

      {/* Bottom Unlock Pill & Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs flex items-center justify-center text-white/80 animate-pulse">
          <span className="material-symbols-rounded text-2xl">lock_open</span>
        </div>
        <p className="text-xs text-neutral-300 tracking-wide drop-shadow-sm">
          Ketuk atau geser ke atas untuk membuka
        </p>
        <div className="w-28 h-1 rounded-full bg-white/40 mt-2" />
      </div>
    </div>
  );
};
