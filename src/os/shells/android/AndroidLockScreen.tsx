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
      className={`fixed inset-0 z-[1900] select-none cursor-pointer flex flex-col justify-between items-center py-12 px-6 bg-black text-[#E2E2E6] font-sans transition-transform duration-400 ease-[cubic-bezier(0.1,0.9,0.2,1)] ${
        isSlidingUp ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Top Punch Hole & Status */}
      <div className="w-full flex items-center justify-between px-2 text-xs text-neutral-400">
        <span>Telkomsel</span>
        <div className="w-3.5 h-3.5 rounded-full bg-[#111] border border-white/10" />
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-rounded text-sm">wifi</span>
          <span className="material-symbols-rounded text-sm">battery_full</span>
        </div>
      </div>

      {/* Center Pixel Stacked Digital Clock */}
      <div className="flex flex-col items-center select-none my-auto">
        <div className="flex flex-col items-center leading-[0.85] font-semibold tracking-tighter text-[#A8C7FA] select-none">
          <span className="text-[110px]">{hourStr}</span>
          <span className="text-[110px]">{minStr}</span>
        </div>

        {/* Date & Weather Subtitle */}
        <div className="flex items-center gap-2 mt-4 text-sm font-medium text-neutral-300">
          <span>{dateStr || 'Rab, 28 Okt'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-rounded text-amber-300 text-base">partly_cloudy_day</span>
            <span>29°C</span>
          </span>
        </div>
      </div>

      {/* Bottom Unlock Pill & Prompt */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/70 animate-pulse">
          <span className="material-symbols-rounded text-2xl">lock_open</span>
        </div>
        <p className="text-xs text-neutral-400 tracking-wide">
          Ketuk atau geser ke atas untuk membuka
        </p>
        <div className="w-28 h-1 rounded-full bg-white/30 mt-2" />
      </div>
    </div>
  );
};
