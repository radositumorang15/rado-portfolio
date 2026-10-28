'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Volume2, ChevronUp } from 'lucide-react';
import { playWindowsSound } from '../../../lib/audio';

interface WindowsLockScreenProps {
  onUnlock: () => void;
}

export const WindowsLockScreen: React.FC<WindowsLockScreenProps> = ({ onUnlock }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isSlidingUp, setIsSlidingUp] = useState<boolean>(false);

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
          weekday: 'long',
          day: 'numeric',
          month: 'long',
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
    playWindowsSound('open');
    setTimeout(() => {
      onUnlock();
    }, 450);
  };

  useEffect(() => {
    const handleKeyDown = () => {
      handleUnlock();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div
      onClick={handleUnlock}
      className={`fixed inset-0 z-[1900] select-none cursor-pointer flex flex-col justify-between p-12 text-white bg-cover bg-center transition-transform duration-500 ease-[cubic-bezier(0.1,0.9,0.2,1)] ${
        isSlidingUp ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
      style={{
        backgroundImage: "url('/icons/win11/windows_bloom_dark.png')",
        backgroundColor: '#0c0f17',
      }}
    >
      {/* Dark Ambient Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Top / Center Clock & Date */}
      <div className="relative z-10 flex flex-col items-center mt-12 animate-in fade-in duration-700">
        <h1 className="text-7xl font-light tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          {timeStr || '17:34'}
        </h1>
        <p className="text-lg font-medium text-neutral-200 mt-2 drop-shadow-md">
          {dateStr || 'Rabu, 28 Oktober'}
        </p>
      </div>

      {/* User Avatar & Unlock Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-18 h-18 rounded-full border-2 border-white/20 bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-xl font-bold shadow-[0_0_24px_rgba(37,99,235,0.4)]">
          RN
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide">Rado Nelson Dela Sadrak S.</p>
          <p className="text-xs text-neutral-300 mt-0.5">Frontend & Android Developer</p>
        </div>

        <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-300/80 animate-bounce">
          <ChevronUp size={16} />
          <span>Klik atau tekan tombol apa saja untuk masuk</span>
        </div>
      </div>

      {/* Bottom Right System Indicators */}
      <div className="relative z-10 flex items-center justify-end gap-3 text-neutral-300">
        <Wifi size={16} />
        <Volume2 size={16} />
        <div className="flex items-center gap-1">
          <Battery size={16} />
          <span className="text-xs font-medium">88%</span>
        </div>
      </div>
    </div>
  );
};
