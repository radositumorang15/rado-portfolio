'use client';

import React, { useState, useEffect, useRef } from 'react';
import { playAndroidTapSound } from '../../../lib/audio';
import { usePrefsStore } from '../../../store/prefs';

interface AndroidLockScreenProps {
  onUnlock: () => void;
}

export const AndroidLockScreen: React.FC<AndroidLockScreenProps> = ({ onUnlock }) => {
  const language = usePrefsStore((s) => s.language);
  const [timeStr, setTimeStr] = useState<string>('17:34');
  const [dateStr, setDateStr] = useState<string>('');
  const [isSlidingUp, setIsSlidingUp] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString(language === 'id' ? 'id-ID' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
      setDateStr(
        now.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  const handleUnlock = () => {
    if (isSlidingUp) return;
    setIsSlidingUp(true);
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(12);
    }
    playAndroidTapSound();
    setTimeout(() => {
      onUnlock();
    }, 350);
  };

  // Touch and pointer swipe up gesture
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startY = 0;
    let currentDy = 0;

    const onPointerDown = (e: PointerEvent) => {
      startY = e.clientY;
      currentDy = 0;
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp, { once: true });
    };

    const onPointerMove = (e: PointerEvent) => {
      const dy = startY - e.clientY; // positive = dragged up
      if (dy > 0) {
        currentDy = dy;
        setDragOffset(dy);
      }
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (currentDy > 90) {
        handleUnlock();
      } else {
        setDragOffset(0);
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    return () => el.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const dragStyle: React.CSSProperties = isSlidingUp
    ? { transform: 'translateY(-100%)', opacity: 0 }
    : dragOffset > 0
    ? {
        transform: `translateY(-${dragOffset}px)`,
        opacity: Math.max(0.2, 1 - dragOffset / 420),
        transition: 'none',
      }
    : {};

  return (
    <div
      ref={containerRef}
      onClick={handleUnlock}
      style={dragStyle}
      className="fixed inset-0 z-[1900] select-none cursor-pointer flex flex-col justify-between items-center py-10 px-6 bg-cover bg-center text-[#E2E2E6] font-sans transition-all duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
    >
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 pointer-events-none" />

      {/* Top Punch Hole & Status */}
      <div className="relative z-10 w-full flex items-center justify-between px-2 text-xs text-neutral-300">
        <span className="text-[11px] font-medium text-neutral-200">5G • Rado-Net</span>
        <div className="w-[11px] h-[11px] rounded-full bg-black ring-[1px] ring-white/10 shadow-inner flex items-center justify-center">
          <div className="w-[3px] h-[3px] rounded-full bg-[#111827]/80" />
        </div>
        <div className="flex items-center gap-1.5 text-neutral-200">
          <span className="text-[11px] font-semibold">88%</span>
        </div>
      </div>

      {/* Center Pixel Giant Clock & Subtitle */}
      <div className="relative z-10 flex flex-col items-center select-none my-auto">
        <h1 className="text-[88px] leading-none font-light tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          {timeStr}
        </h1>

        <div className="flex items-center gap-2 mt-2 text-sm font-medium text-neutral-200 drop-shadow-md">
          <span>{dateStr}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-amber-300">
            <span className="material-symbols-rounded text-base">partly_cloudy_day</span>
            <span>29°C</span>
          </span>
        </div>

        {/* Lockscreen Notification Pill */}
        <div className="mt-8 px-4 py-2.5 rounded-[20px] bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-3 max-w-xs shadow-lg">
          <div className="w-7 h-7 rounded-full bg-[#A9C4FF] text-[#0D2A63] font-bold text-xs flex items-center justify-center shrink-0">
            RN
          </div>
          <div className="text-left text-xs min-w-0">
            <p className="font-semibold text-white/95 truncate">Rado Situmorang</p>
            <p className="text-[11px] text-white/70 truncate">
              {language === 'id' ? 'Sentuh untuk membuka portofolio' : 'Tap to open portfolio'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Unlock Bob & Prompt */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-9 h-1 rounded-full bg-white pixel-bob" />
        <p className="text-xs text-neutral-300 tracking-wide drop-shadow-sm font-medium">
          {language === 'id' ? 'Geser ke atas untuk membuka' : 'Swipe up to unlock'}
        </p>
      </div>
    </div>
  );
};
