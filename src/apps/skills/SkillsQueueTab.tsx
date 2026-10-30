'use client';

import React from 'react';
import { INSTALLING_SKILLS, CATEGORY_HUES } from './data';
import { DownloadCloud, Sparkles } from 'lucide-react';

export const SkillsQueueTab: React.FC = () => {
  const getMonogram = (name: string) =>
    name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {INSTALLING_SKILLS.map((item, i) => {
          const hue = CATEGORY_HUES[item.category];
          const isDownloading = item.done > 0;
          const progressPercent = Math.round((item.done / item.steps.length) * 100);

          return (
            <div
              key={item.name}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all grid grid-cols-[44px_1fr] gap-3.5 items-start"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* 44x44 Monogram Icon */}
              <div
                style={{
                  background: `linear-gradient(135deg, hsl(${hue.h} 75% 50%), hsl(${hue.h + 35} 70% 35%))`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                className="w-11 h-11 rounded-[12px] flex items-center justify-center font-mono font-bold text-sm text-white shrink-0 shadow-md"
              >
                {getMonogram(item.name)}
              </div>

              {/* Body */}
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate m-0">{item.name}</p>
                    <p className="text-xs text-white/50 m-0">{item.category} &bull; Pipeline In-Progress</p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 ${
                      isDownloading
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    <DownloadCloud size={12} className={isDownloading ? 'animate-bounce' : ''} />
                    <span>{isDownloading ? `Installing (${progressPercent}%)` : 'Pending'}</span>
                  </span>
                </div>

                {/* Animated Windows 11 Progress Bar */}
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden relative my-2.5">
                  <div
                    style={{ width: `${progressPercent}%` }}
                    className="h-full rounded-full bg-blue-500 transition-all duration-500 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                  </div>
                </div>

                {/* Milestones / Steps */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.steps.map((step, stepIndex) => {
                    const isCompleted = stepIndex < item.done;
                    return (
                      <span
                        key={step}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          isCompleted
                            ? 'border-blue-500/50 bg-blue-500/10 text-blue-200 font-medium'
                            : 'border-white/10 text-white/40 border-dashed'
                        }`}
                      >
                        {isCompleted ? '✓ ' : '○ '}
                        {step}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspirational Footer Caption */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-xs text-white/60">
        <Sparkles size={14} className="text-amber-400 shrink-0" />
        <span className="italic">
          &ldquo;Progress is measured in shipped milestones, not in how skilled I feel.&rdquo;
        </span>
      </div>
    </div>
  );
};

