'use client';

import React from 'react';
import { AppId } from '../../../lib/constants';
import { PixelAdaptiveIcon } from './PixelAdaptiveIcon';
import { usePrefsStore } from '../../../store/prefs';

interface AppScaffoldProps {
  appId: AppId;
  title: string;
  onBack: () => void;
  hideHeader?: boolean;
  children: React.ReactNode;
}

export const AppScaffold: React.FC<AppScaffoldProps> = ({
  appId,
  title,
  onBack,
  hideHeader = false,
  children,
}) => {
  const themedIcons = usePrefsStore((s) => s.themedIcons);

  const handleBack = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
    onBack();
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `Rado Situmorang — ${title}`,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[var(--m3-bg)] text-[var(--m3-on-surface)] animate-in slide-in-from-bottom-6 duration-200 select-text font-sans">
      {/* Top App Bar (Material 3 Expressive Style) */}
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

      {/* Android Gesture Navigation Bar Area */}
      <footer
        className="h-8 flex items-center justify-center shrink-0 cursor-pointer select-none bg-[var(--m3-bg)] touch-manipulation z-30"
        onClick={handleBack}
        title="Back to Home Screen"
      >
        <div className="w-28 h-1.5 rounded-full bg-[var(--m3-on-surface)]/40 hover:bg-[var(--m3-on-surface)]/70 active:bg-[var(--m3-on-surface)] transition-colors pointer-events-none" />
      </footer>
    </div>
  );
};
