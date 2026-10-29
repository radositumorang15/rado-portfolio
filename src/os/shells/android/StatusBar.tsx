'use client';

import React, { useState, useEffect } from 'react';

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
    <header
      className="relative z-20 flex items-center justify-between px-5 h-7 shrink-0 text-xs text-[var(--m3-on-surface)] select-none cursor-pointer transition-colors hover:bg-white/[0.03]"
      onClick={onPullDownShade}
      title="Pull down for Quick Settings"
    >
      {/* 1. PIXEL TIME (Google Sans / Medium 500, Optical Alignment) */}
      <span className="font-medium text-[12px] tracking-tight text-[var(--m3-on-surface)]">
        {timeStr || '17:34'}
      </span>

      {/* 2. PIXEL CENTER PUNCH-HOLE CAMERA CUTOUT (Exact 11px with Lens Reflection) */}
      <div className="absolute left-1/2 -translate-x-1/2 w-[11px] h-[11px] rounded-full bg-black ring-[1px] ring-white/10 shadow-inner flex items-center justify-center pointer-events-none">
        <div className="w-[3px] h-[3px] rounded-full bg-[#111827]/80" />
      </div>

      {/* 3. OFFICIAL ANDROID SYSTEMUI STATUS ICONS (Precise 13-14px Optical Geometry) */}
      <div className="flex items-center gap-1.5 text-[var(--m3-on-surface)]">
        {/* Cellular Signal Icon (AOSP 4-bar ramp geometry) */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="shrink-0 opacity-90"
          aria-label="Cellular signal full"
        >
          <path d="M2.4 20.6L19.4 3.6C20.1 2.9 21.3 3.4 21.3 4.4V20.5C21.3 21.3 20.7 22 19.9 22H3.8C2.8 22 2.3 20.8 2.4 20.6Z" />
        </svg>

        {/* Wi-Fi Icon (Official Android SystemUI Solid Wedge Geometry) */}
        <svg
          width="14"
          height="11"
          viewBox="0 0 24 19"
          fill="currentColor"
          className="shrink-0 opacity-90"
          aria-label="Wi-Fi connected"
        >
          <path d="M12 3.5C7.5 3.5 3.39 5.3 0.29 8.24C-0.1 8.62 -0.1 9.25 0.29 9.63L11.29 20.63C11.68 21.02 12.31 21.02 12.7 20.63L23.7 9.63C24.1 9.25 24.1 8.62 23.71 8.24C20.61 5.3 16.5 3.5 12 3.5Z" />
        </svg>

        {/* Battery Container & Percentage (Android 15/16 Horizontal Capsule Spec) */}
        <div className="flex items-center gap-1 ml-0.5">
          <span className="text-[11px] font-medium leading-none tracking-tight text-[var(--m3-on-surface)]">
            88%
          </span>
          <svg
            width="20"
            height="10"
            viewBox="0 0 22 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 text-[var(--m3-on-surface)]"
            aria-label="Battery 88%"
          >
            {/* Outer Capsule Border */}
            <rect
              x="0.6"
              y="0.6"
              width="18"
              height="9.8"
              rx="2.4"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            {/* Cathode Terminal Cap */}
            <path
              d="M20.2 3.8C20.8 4.1 20.8 6.9 20.2 7.2"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Inner Charge Level (~88%) */}
            <rect
              x="2.2"
              y="2.2"
              width="13.5"
              height="6.6"
              rx="1.2"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};
