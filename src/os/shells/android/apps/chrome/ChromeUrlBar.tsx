'use client';

import React from 'react';
import { Lock, RotateCw, MoreVertical, Plus, ArrowLeft } from 'lucide-react';

interface ChromeUrlBarProps {
  displayUrl: string;
  tabCount: number;
  isGridView: boolean;
  onToggleView: () => void;
  onRefresh: () => void;
  onNewTab?: () => void;
  onBackToGrid?: () => void;
  onExit?: () => void;
}

export const ChromeUrlBar: React.FC<ChromeUrlBarProps> = ({
  displayUrl,
  tabCount,
  isGridView,
  onToggleView,
  onRefresh,
  onNewTab,
  onBackToGrid,
  onExit,
}) => {
  return (
    <div className="h-14 px-3 flex items-center justify-between gap-2.5 bg-[#1f1f23] border-b border-white/10 shrink-0 text-white select-none z-20">
      {/* Back button: in page view goes to tabs, in grid view exits Chrome to home screen */}
      {!isGridView && onBackToGrid ? (
        <button
          onClick={onBackToGrid}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
          title="Back to Tabs"
        >
          <ArrowLeft size={18} />
        </button>
      ) : isGridView && onExit ? (
        <button
          onClick={onExit}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
          title="Back to Home"
        >
          <ArrowLeft size={18} />
        </button>
      ) : null}

      {/* URL Omnibox Pill */}
      <div className="flex-1 flex items-center gap-2 h-10 px-3.5 rounded-full bg-[#2b2b30] border border-white/5 text-xs text-white/90 overflow-hidden">
        <Lock size={12} className="text-emerald-400 shrink-0" />
        <span className="truncate font-sans tracking-tight text-white/80">
          {isGridView ? 'Search or type URL' : displayUrl}
        </span>
        {!isGridView && (
          <button
            onClick={onRefresh}
            className="ml-auto text-white/50 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Reload"
          >
            <RotateCw size={13} />
          </button>
        )}
      </div>

      {/* Right Action Icons: New Tab (in grid), Tab Count Pill, 3-Dots */}
      <div className="flex items-center gap-1.5 shrink-0">
        {isGridView && onNewTab && (
          <button
            onClick={onNewTab}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            title="New Tab"
          >
            <Plus size={18} />
          </button>
        )}

        {/* Tab Count Pill Button (e.g. [5]) */}
        <button
          onClick={onToggleView}
          className="w-7 h-7 rounded-[7px] border-2 border-white/70 hover:border-white flex items-center justify-center text-[11px] font-bold text-white transition-colors cursor-pointer active:scale-95"
          title={isGridView ? 'Return to Tab' : 'Switch Tabs'}
        >
          {tabCount}
        </button>

        <button
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Menu"
        >
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );
};
