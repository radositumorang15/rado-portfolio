'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, Battery } from 'lucide-react';
import { NotchHost } from '../../notch/NotchHost';

interface StatusBarProps {
  onPullDownShade?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({ onPullDownShade }) => {
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
    <div
      className="h-10 w-full px-5 flex items-center justify-between text-white text-xs select-none z-[1200] shrink-0 cursor-pointer"
      onClick={onPullDownShade}
    >
      {/* Time on Left */}
      <span className="font-semibold tracking-tight text-[13px]">{timeStr || '12:00'}</span>

      {/* Rado Notch at Center */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0">
        <NotchHost platform="android" />
      </div>

      {/* Status Icons on Right */}
      <div className="flex items-center gap-1.5 text-white/90">
        <Wifi size={14} />
        <Battery size={16} />
      </div>
    </div>
  );
};
