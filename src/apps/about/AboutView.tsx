'use client';

import React, { useState } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
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
  onCopySpecs,
  onOpenSocial,
}) => {
  const [activeTab, setActiveTab] = useState<'system' | 'specs' | 'education'>('system');

  return (
    <div className="flex h-full w-full select-none text-[var(--win-text-primary)] font-sans">
      {/* 1. WINUI 3 LEFT NAVIGATION PANE */}
      <aside className="w-56 p-3 flex flex-col gap-1 shrink-0 bg-[var(--win-mica-active-bg)] border-r border-[var(--win-card-stroke-default)] hidden sm:flex">
        {/* User Account Mini Banner */}
        <div className="flex items-center gap-2.5 p-2 mb-2 rounded-[6px] hover:bg-white/[0.06] cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0078D4] to-[#004E8C] flex items-center justify-center text-xs font-bold text-white shadow-md shrink-0">
            RN
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate leading-tight">{profile.name}</p>
            <p className="text-[11px] text-white/50 truncate">radositumorang@gmail.com</p>
          </div>
        </div>

        {/* WinUI 3 Search Box with Blue Accent Border */}
        <div className="relative mb-2 px-1">
          <input
            type="text"
            placeholder="Find a setting"
            className="w-full h-8 px-2.5 rounded-[4px] bg-[#2B2B2B] border border-white/[0.08] border-b-2 border-b-[#60CDFF] text-xs text-white placeholder-white/50 focus:outline-none"
          />
        </div>

        {/* Categories with Vertical Blue Pill */}
        {[
          { id: 'system', label: 'System (About)', icon: '💻' },
          { id: 'specs', label: 'Device Specifications', icon: '⚡' },
          { id: 'education', label: 'Education & Honors', icon: '🎓' },
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`relative flex items-center gap-2.5 h-9 px-3 rounded-[5px] text-xs transition-colors text-left ${
                isActive ? 'bg-white/[0.08] font-medium text-white' : 'text-white/80 hover:bg-white/[0.04]'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 w-[3px] h-4 rounded-full bg-[#60CDFF]" />
              )}
              <span className="text-sm">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </aside>

      {/* 2. RIGHT INSET CONTENT CONTAINER */}
      <main className="flex-1 bg-[#272727]/95 rounded-tl-[8px] border-t border-l border-white/[0.06] p-6 overflow-y-auto">
        <h1 className="text-xl font-semibold tracking-tight mb-4">
          {activeTab === 'system' && 'System > About'}
          {activeTab === 'specs' && 'System > Device Specifications'}
          {activeTab === 'education' && 'System > Education'}
        </h1>

        {/* Hero Header Windows 11 Device Rename Style */}
        <div className="flex items-center justify-between p-4 mb-4 rounded-[6px] bg-[#323232]/80 border border-white/[0.05]">
          <div className="flex items-center gap-3.5">
            <img
              src="/icons/win11/thispc.png"
              alt="This PC"
              className="w-12 h-12 object-contain drop-shadow-md"
            />
            <div>
              <h2 className="text-base font-semibold">{profile.deviceSpecs.deviceName}</h2>
              <p className="text-xs text-[#60CDFF] font-medium">{profile.tagline[lang]}</p>
              <p className="text-xs text-white/60 mt-0.5">{profile.education.institution} • GPA {profile.education.gpa}</p>
            </div>
          </div>
          <button
            onClick={() => onOpenSocial?.(profile.linkedin)}
            className="px-3.5 py-1.5 rounded-[4px] bg-[#3B3B3B] hover:bg-[#444444] border border-white/[0.08] text-xs font-medium text-white transition-colors"
          >
            LinkedIn Profile
          </button>
        </div>

        {/* WinUI 3 Expander Rows: Device Specifications */}
        <div className="flex flex-col gap-[3px] mb-4">
          <div className="flex items-center justify-between p-3.5 rounded-t-[6px] bg-[#323232]/90 border border-white/[0.05]">
            <div>
              <p className="text-xs font-semibold text-white">Device Specifications (Rado OS)</p>
              <p className="text-[11px] text-white/60">{profile.deviceSpecs.languages}</p>
            </div>
            {onCopySpecs && (
              <button
                onClick={onCopySpecs}
                className="flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#3B3B3B] hover:bg-[#444444] border border-white/[0.08] text-xs text-white"
              >
                <Copy size={12} />
                <span>Copy</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-y-2.5 p-3.5 rounded-b-[6px] bg-[#2D2D2D]/90 border-x border-b border-white/[0.05] text-xs">
            <span className="text-white/60">Processor</span>
            <span className="font-mono text-white/90">{profile.deviceSpecs.processor}</span>
            <span className="text-white/60">Cumulative GPA</span>
            <span className="font-mono text-emerald-400 font-semibold">{profile.deviceSpecs.gpa} / 4.00</span>
            <span className="text-white/60">System type</span>
            <span className="text-white/90">64-bit Frontend & Android OS</span>
            <span className="text-white/60">Windows edition</span>
            <span className="text-white/90">RadoOS 11 Pro (Build 24H2)</span>
          </div>
        </div>

        {/* Bio summary */}
        <div className="p-4 rounded-[6px] bg-[#323232]/80 border border-white/[0.05] text-xs leading-relaxed text-white/85 mb-4">
          {profile.about[lang]}
        </div>

        {/* Social Links */}
        <div className="flex gap-2">
          <button
            onClick={() => onOpenSocial?.(profile.linkedin)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[#0078D4] hover:bg-[#006cc1] text-xs font-medium text-white transition-colors"
          >
            <ExternalLink size={12} />
            <span>LinkedIn Profile</span>
          </button>
          <button
            onClick={() => onOpenSocial?.(profile.github)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[#3B3B3B] hover:bg-[#444444] border border-white/[0.08] text-xs font-medium text-white transition-colors"
          >
            <ExternalLink size={12} />
            <span>GitHub Repositories</span>
          </button>
        </div>
      </main>
    </div>
  );
};
