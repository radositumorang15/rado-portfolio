'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppId } from '../../../lib/constants';

interface AppScaffoldProps {
  appId: AppId;
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export const AppScaffold: React.FC<AppScaffoldProps> = ({
  title,
  onBack,
  children,
}) => {
  const handleBack = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
    onBack();
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[var(--m3-bg)] text-[var(--m3-on-surface)] animate-in slide-in-from-bottom-6 duration-200 select-text">
      {/* Top App Bar (Material 3 Style) */}
      <header className="h-16 px-4 flex items-center justify-between shrink-0 bg-[var(--m3-surface-container)] select-none shadow-xs border-b border-white/5">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-[var(--m3-surface-container-high)] hover:bg-[var(--m3-surface-container-highest)] active:scale-90 flex items-center justify-center text-[var(--m3-on-surface)] transition-all"
            aria-label="Back"
          >
            <ArrowLeft size={19} />
          </button>
          <h1 className="text-base font-semibold tracking-tight text-[var(--m3-on-surface)]">{title}</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[var(--m3-bg)]">
        {children}
      </main>

      {/* Android Gesture Navigation Bar Area */}
      <footer
        className="h-8 flex items-center justify-center shrink-0 cursor-pointer select-none bg-[var(--m3-bg)]"
        onClick={handleBack}
      >
        <div className="w-28 h-1 rounded-full bg-[var(--m3-on-surface)]/40 hover:bg-[var(--m3-on-surface)]/70 transition-colors" />
      </footer>
    </div>
  );
};
