'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AppId } from '../../../lib/constants';
import { PixelAdaptiveIcon } from './PixelAdaptiveIcon';
import { usePrefsStore } from '../../../store/prefs';

interface AppScaffoldProps {
  appId: AppId;
  title: string;
  onBack: () => void;
  hideHeader?: boolean;
  originRect?: DOMRect | null;
  gestureTransform?: { x: number; y: number; scale: number; radius: number } | null;
  children: React.ReactNode;
}

export const AppScaffold: React.FC<AppScaffoldProps> = ({
  appId,
  title,
  onBack,
  hideHeader = false,
  originRect,
  gestureTransform,
  children,
}) => {
  const themedIcons = usePrefsStore((s) => s.themedIcons);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  // FLIP Expand Animation on Mount
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !originRect) return;

    const parent = el.parentElement?.getBoundingClientRect();
    if (!parent) return;

    const dx = originRect.left - parent.left;
    const dy = originRect.top - parent.top;
    const sx = Math.max(0.1, originRect.width / parent.width);
    const sy = Math.max(0.1, originRect.height / parent.height);

    el.style.transition = 'none';
    el.style.transformOrigin = '0 0';
    el.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`;
    el.style.borderRadius = '40px';
    el.style.opacity = '0.2';

    // Force reflow
    void el.getBoundingClientRect();

    el.style.transition = 'transform 0.38s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.38s, opacity 0.25s';
    el.style.transform = 'none';
    el.style.borderRadius = '0px';
    el.style.opacity = '1';
  }, [originRect]);

  const handleBack = () => {
    if (isClosing) return;
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }

    const el = containerRef.current;
    if (!el) {
      onBack();
      return;
    }

    setIsClosing(true);
    el.style.transition = 'transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.32s, opacity 0.25s';
    el.style.transformOrigin = '50% 50%';
    el.style.transform = 'translateY(70px) scale(0.9)';
    el.style.borderRadius = '36px';
    el.style.opacity = '0';

    setTimeout(() => {
      onBack();
    }, 300);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `Rado Situmorang — ${title}`,
        url: window.location.href,
      }).catch(() => { });
    } else if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  // Compute live gesture transform styles if dragging
  const gestureStyle: React.CSSProperties = gestureTransform
    ? {
      transform: `translate(${gestureTransform.x}px, ${gestureTransform.y}px) scale(${gestureTransform.scale})`,
      borderRadius: `${gestureTransform.radius}px`,
      transition: 'none',
    }
    : {};

  return (
    <div
      ref={containerRef}
      style={gestureStyle}
      className="absolute inset-0 z-30 flex flex-col bg-[var(--m3-bg)] text-[var(--m3-on-surface)] select-text font-sans overflow-hidden will-change-transform"
    >
      {/* Top App Bar */}
      {!hideHeader && (
        <header className="h-16 px-4 flex items-center justify-between shrink-0 bg-[var(--m3-bg)]/90 backdrop-blur-md select-none border-b border-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] active:scale-90 flex items-center justify-center text-[var(--m3-on-surface)] transition-all shrink-0 cursor-pointer"
              aria-label="Back"
            >
              <span className="material-symbols-rounded text-[22px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <PixelAdaptiveIcon id={appId} themed={themedIcons} size={28} />
              <h1 className="text-base font-bold tracking-tight text-[var(--m3-on-surface)] truncate">
                {title}
              </h1>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] active:scale-90 flex items-center justify-center text-[var(--m3-on-surface)] transition-all shrink-0 cursor-pointer"
            aria-label="Share"
          >
            <span className="material-symbols-rounded text-[20px]">share</span>
          </button>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-h-0 overflow-y-auto bg-[var(--m3-bg)] scrollbar-thin flex flex-col">
        {children}
      </main>

      {/* Android Gesture Navigation Bar */}
      <footer
        className={`h-6 flex items-center justify-center shrink-0 cursor-pointer select-none touch-manipulation z-30 ${
          appId === 'androidstudio' ? 'bg-[var(--m3-surface-container,#1e1f20)]' : 'bg-[var(--m3-bg)]'
        }`}
        onClick={handleBack}
        title="Swipe or Tap to Go Home"
      >
        <div className="w-28 h-1 rounded-full bg-[var(--m3-on-surface)]/40 hover:bg-[var(--m3-on-surface)]/70 active:bg-[var(--m3-on-surface)] transition-colors pointer-events-none" />
      </footer>
    </div>
  );
};
