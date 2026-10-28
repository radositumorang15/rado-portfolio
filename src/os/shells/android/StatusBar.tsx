'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Monitor, Signal } from 'lucide-react';
import { NotchHost } from '../../notch/NotchHost';
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
      className="h-10 w-full px-5 flex items-center justify-between text-white text-xs select-none z-[1200] shrink-0 cursor-pointer"
      onClick={onPullDownShade}
    >
      {/* Time on Left */}
      <span className="font-medium tracking-tight text-[13px] text-white/90">
        {timeStr || '12:00'}
      </span>

      {/* Rado Notch at Center */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto">
        <NotchHost platform="android" />
      </div>

      {/* Status Icons on Right (Android 17 Material 3 style) */}
      <div className="flex items-center gap-2 text-white/85">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShell('windows');
          }}
          title="Switch to Windows 11 Shell"
          className="p-1 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <Monitor size={14} />
        </button>
        <Signal size={13} />
        <Wifi size={13} />
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-semibold text-white/80">88%</span>
          <Battery size={15} />
        </div>
      </div>
    </header>
  );
};
