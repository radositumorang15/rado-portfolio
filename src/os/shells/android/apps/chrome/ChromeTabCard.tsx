'use client';

import React from 'react';
import { ChromeTab } from './types';
import { X, Globe } from 'lucide-react';

interface ChromeTabCardProps {
  tab: ChromeTab;
  isActive: boolean;
  onSelect: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose: () => void;
}

export const ChromeTabCard: React.FC<ChromeTabCardProps> = ({
  tab,
  isActive,
  onSelect,
  onClose,
}) => {
  return (
    <div
      data-tab-card={tab.id}
      onClick={onSelect}
      className={`rounded-[22px] overflow-hidden border bg-[#1e2025] hover:bg-[#252830] shadow-xl transition-all cursor-pointer active:scale-97 flex flex-col group relative select-none ${
        isActive
          ? 'border-blue-500 ring-2 ring-blue-500/50'
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* 1. Chrome Tab Card Header */}
      <div className="h-8 px-2.5 flex items-center justify-between gap-1.5 bg-[#17191d] border-b border-white/5 shrink-0 z-10">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <div
            style={{
              background: `linear-gradient(135deg, ${tab.gradient[0]}, ${tab.gradient[1]})`,
            }}
            className="w-4 h-4 rounded-[6px] flex items-center justify-center text-[9px] font-bold text-white shadow-xs shrink-0"
          >
            {tab.mono}
          </div>
          <span className="text-[11px] font-semibold text-white/90 truncate">
            {tab.name}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="w-5 h-5 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Close tab"
        >
          <X size={12} />
        </button>
      </div>

      {/* 2. Authentic App Preview Body (inspired by Pixel_ Mobile Portfolio.html) */}
      <div className="h-36 sm:h-40 relative overflow-hidden bg-[#111215] flex flex-col justify-between p-2.5">
        {/* Gradient Hero Stripe */}
        <div
          style={{
            background: `linear-gradient(135deg, ${tab.gradient[0]}, ${tab.gradient[1]})`,
          }}
          className="p-2.5 rounded-xl text-white shadow-md flex items-center justify-between"
        >
          <div className="min-w-0">
            <span className="text-[9px] uppercase tracking-wider opacity-80 block truncate">
              {tab.category.split('&')[0]}
            </span>
            <p className="text-xs font-bold leading-tight truncate m-0">{tab.name}</p>
          </div>
          <span className="w-6 h-6 rounded-lg bg-black/25 flex items-center justify-center text-[10px] font-bold shrink-0">
            {tab.mono}
          </span>
        </div>

        {/* Mini Simulated Cards */}
        <div className="flex flex-col gap-1.5 my-auto py-1">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-[10px]">
            <span className="text-white/70 truncate">{tab.primaryLang}</span>
            <span className="font-mono text-white/50">{tab.year}</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-[10px]">
            <span className="text-white/60 truncate">{tab.displayUrl}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-[8px]">
              {tab.role}
            </span>
          </div>
        </div>

        {/* Bottom Domain Pill */}
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-mono text-white/70 self-start">
          <Globe size={9} className="text-blue-400 shrink-0" />
          <span className="truncate max-w-[120px]">{tab.displayUrl}</span>
        </div>
      </div>
    </div>
  );
};
