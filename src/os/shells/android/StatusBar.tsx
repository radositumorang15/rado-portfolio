'use client';

import React, { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';
import { usePrefsStore } from '../../../store/prefs';

interface StatusBarProps {
  onPullDownShade?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({ onPullDownShade }) => {
  const setShell = usePrefsStore((s) => s.setShell);
  const [timeStr, setTimeStr] = useState<string>('');

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
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="relative z-20 flex items-center justify-between px-5 h-8 shrink-0 text-xs font-medium tracking-wide text-[var(--m3-on-surface)] select-none cursor-pointer"
      onClick={onPullDownShade}
    >
      {/* Time on Left */}
      <span className="font-semibold text-[13px]">{timeStr || '17:34'}</span>

      {/* Pixel Center Punch-Hole Camera Cutout (Clean 14px Black Circle) */}
      <div className="w-3.5 h-3.5 rounded-full bg-black shadow-inner border border-white/5" />

      {/* Status Icons on Right */}
      <div className="flex items-center gap-1.5 text-[var(--m3-on-surface-variant)]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShell('windows');
          }}
          title="Switch to Windows 11 Desktop"
          className="p-1 rounded-full hover:bg-white/10 text-[var(--m3-primary)] hover:text-white transition-colors"
        >
          <Monitor size={14} />
        </button>

        {/* Material Symbols Icons for Network and Wifi */}
        <span className="material-symbols-rounded text-[16px]">signal_cellular_4_bar</span>
        <span className="material-symbols-rounded text-[16px]">wifi</span>

        {/* Android 16 Battery Pill */}
        <div className="flex items-center gap-0.5 bg-[var(--m3-surface-container-high)] px-1.5 py-0.5 rounded-full text-[10px] font-bold text-[var(--m3-on-surface)]">
          <span>88%</span>
        </div>
      </div>
    </header>
  );
};
