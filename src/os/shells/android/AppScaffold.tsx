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
  return (
    <div className="absolute inset-0 z-30 flex flex-col bg-[var(--shell-bg,#131314)] text-[var(--shell-text,#E3E3E3)] animate-in slide-in-from-bottom-8 duration-250 select-text">
      {/* Top App Bar */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[var(--shell-border,rgba(255,255,255,0.08))] shrink-0 bg-[var(--shell-surface,#1E1F20)] select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-sm font-semibold tracking-wide">{title}</h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>

      {/* Bottom Gesture Navigation Pill */}
      <div
        className="h-8 flex items-center justify-center shrink-0 cursor-pointer select-none"
        onClick={onBack}
      >
        <div className="w-28 h-1 rounded-full bg-white/30 hover:bg-white/50 transition-colors" />
      </div>
    </div>
  );
};

