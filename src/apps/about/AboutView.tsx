'use client';

import React from 'react';
import { ExternalLink, Smartphone, Layers, Code2 } from 'lucide-react';
import { Profile } from '../../data/types';

interface AboutViewProps {
  profile: Profile;
  lang?: 'en' | 'id';
  onCopySpecs?: () => void;
  onOpenSocial?: (url: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  profile,
  lang = 'en',
  onOpenSocial,
}) => {
  return (
    <div className="flex h-full w-full select-none text-[var(--win-text-primary)] font-sans">
      {/* 1. WINUI 3 LEFT NAVIGATION PANE */}
      <aside className="w-56 p-3 flex flex-col gap-1 shrink-0 bg-[var(--win-mica-active-bg)] border-r border-[var(--win-card-stroke-default)] hidden sm:flex">
        {/* User Account Mini Banner */}
        <div className="flex items-center gap-2.5 p-2 mb-2 rounded-[6px] hover:bg-white/[0.06] cursor-pointer transition-colors">
          <img
            src="/profile.jpeg"
            alt={profile.name}
            className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-md shrink-0"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate leading-tight">{profile.name}</p>
            <p className="text-[11px] text-white/50 truncate">radositumorang15@gmail.com</p>
          </div>
        </div>

        {/* WinUI 3 Search Box */}
        <div className="relative mb-2 px-1">
          <input
            type="text"
            placeholder="Find a setting"
            className="w-full h-8 px-2.5 rounded-[4px] bg-[#2B2B2B] border border-white/[0.08] border-b-2 border-b-[#60CDFF] text-xs text-white placeholder-white/50 focus:outline-none"
          />
        </div>

        {/* Active System (About) Navigation Item */}
        <button
          className="relative flex items-center gap-2.5 h-9 px-3 rounded-[5px] text-xs bg-white/[0.08] font-medium text-white text-left"
        >
          <span className="absolute left-0 w-[3px] h-4 rounded-full bg-[#60CDFF]" />
          <span className="text-sm">💻</span>
          <span className="truncate">System (About)</span>
        </button>
      </aside>

      {/* 2. RIGHT INSET CONTENT CONTAINER */}
      <main className="flex-1 bg-[#272727]/95 rounded-tl-[8px] border-t border-l border-white/[0.06] p-6 overflow-y-auto">
        <h1 className="text-xl font-semibold tracking-tight mb-4">
          System &gt; About
        </h1>

        {/* Hero Header Windows 11 Profile Style */}
        <div className="flex items-center justify-between p-4 mb-4 rounded-[6px] bg-[#323232]/80 border border-white/[0.05]">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src="/profile.jpeg"
              alt={profile.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-white/20 shadow-md ring-2 ring-white/10 shrink-0"
            />
            <div className="min-w-0">
              <h2 className="text-base font-semibold truncate">{profile.name}</h2>
              <p className="text-xs text-[#60CDFF] font-semibold">{profile.tagline[lang]}</p>
              <p className="text-xs text-white/60 mt-0.5 truncate">
                {profile.education.institution} • GPA {profile.education.gpa}
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenSocial?.(profile.linkedin)}
            className="px-3.5 py-1.5 rounded-[4px] bg-[#3B3B3B] hover:bg-[#444444] border border-white/[0.08] text-xs font-medium text-white transition-colors shrink-0 hidden sm:block cursor-pointer"
          >
            LinkedIn Profile
          </button>
        </div>

        {/* Bio Summary / About Me Card */}
        <div className="p-4 rounded-[6px] bg-[#323232]/80 border border-white/[0.05] text-xs leading-relaxed text-white/90 mb-4 shadow-xs">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#60CDFF] mb-2 flex items-center gap-1.5">
            <Smartphone size={13} />
            Professional Overview
          </p>
          <p className="leading-relaxed text-justify sm:text-left">{profile.about[lang]}</p>
        </div>

        {/* Core Expertise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="p-3.5 rounded-[6px] bg-[#2E2E2E]/90 border border-white/[0.05] flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-[#60CDFF]/15 text-[#60CDFF] flex items-center justify-center shrink-0">
              <Smartphone size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Native Android &amp; Cross-Platform</p>
              <p className="text-[11px] text-white/60 mt-0.5">
                Kotlin, Jetpack Compose, Flutter, Dart, MVVM &amp; Clean Architecture
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-[6px] bg-[#2E2E2E]/90 border border-white/[0.05] flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-emerald-400/15 text-emerald-400 flex items-center justify-center shrink-0">
              <Layers size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Modern Frontend Architecture</p>
              <p className="text-[11px] text-white/60 mt-0.5">
                React, Next.js, TypeScript, Tailwind CSS, Responsive &amp; Accessible UI
              </p>
            </div>
          </div>
        </div>

        {/* Official Links */}
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => onOpenSocial?.(profile.linkedin)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[#0078D4] hover:bg-[#006cc1] text-xs font-medium text-white transition-colors cursor-pointer"
          >
            <ExternalLink size={12} />
            <span>LinkedIn Profile</span>
          </button>
          <button
            onClick={() => onOpenSocial?.(profile.github)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[#3B3B3B] hover:bg-[#444444] border border-white/[0.08] text-xs font-medium text-white transition-colors cursor-pointer"
          >
            <ExternalLink size={12} />
            <span>GitHub Repositories</span>
          </button>
        </div>
      </main>
    </div>
  );
};
