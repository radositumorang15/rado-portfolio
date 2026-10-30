'use client';

import React from 'react';
import { ChromeTab } from './types';
import { ExternalLink, Github, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ChromeWebPageProps {
  tab: ChromeTab;
  lang: 'en' | 'id';
  onBack: () => void;
  onLaunchLink: (url: string, title: string) => void;
}

export const ChromeWebPage: React.FC<ChromeWebPageProps> = ({
  tab,
  lang,
  onBack,
  onLaunchLink,
}) => {
  return (
    <div className="flex-1 overflow-y-auto pb-16 text-white font-sans bg-[#121316] select-text">
      {/* 1. Header Toolbar with Back Button */}
      <div className="h-12 px-2 flex items-center gap-2 border-b border-white/5 bg-[#121316]/95 backdrop-blur-md sticky top-0 z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 text-white/70 hover:text-white transition-all cursor-pointer"
          title="Back to Tabs"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-mono text-white/60 truncate flex-1">
          {tab.displayUrl}
        </span>
      </div>

      {/* 2. Listing Header (from Pixel_ Mobile Portfolio.html .hd) */}
      <div className="flex items-center gap-4 px-5 pt-3 pb-4">
        <div
          style={{
            background: `linear-gradient(135deg, ${tab.gradient[0]}, ${tab.gradient[1]})`,
            boxShadow: '0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
          className="w-[72px] h-[72px] rounded-[22px] flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-lg"
        >
          {tab.mono}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold leading-tight truncate m-0 text-white">
            {tab.name}
          </h1>
          <p className="text-xs font-semibold text-blue-400 mt-0.5 truncate m-0">
            Rado Situmorang
          </p>
          <span className="text-xs text-white/50 truncate block mt-0.5">
            {tab.category}
          </span>
        </div>
      </div>

      {/* 3. Stats Row (from Pixel_ Mobile Portfolio.html .st) */}
      <div className="flex border-y border-white/10 mx-4 py-2.5 my-1">
        <div className="flex-1 text-center border-r border-white/10 px-2">
          <b className="block text-sm font-semibold text-white truncate">{tab.primaryLang}</b>
          <small className="text-[11px] text-white/50">Language</small>
        </div>
        <div className="flex-1 text-center border-r border-white/10 px-2">
          <b className="block text-sm font-semibold text-white">{tab.year}</b>
          <small className="text-[11px] text-white/50">Year</small>
        </div>
        <div className="flex-1 text-center px-2">
          <b className="block text-sm font-semibold text-white">{tab.role}</b>
          <small className="text-[11px] text-white/50">Role</small>
        </div>
      </div>

      {/* 4. Action Buttons (from Pixel_ Mobile Portfolio.html .bs) */}
      <div className="flex gap-2.5 px-5 py-3">
        {tab.liveUrl && (
          <button
            onClick={() => onLaunchLink(tab.liveUrl!, tab.name)}
            className="flex-1 h-11 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <ExternalLink size={15} />
            <span>Open Website</span>
          </button>
        )}
        {tab.githubUrl && (
          <button
            onClick={() => onLaunchLink(tab.githubUrl!, 'GitHub')}
            className="flex-1 h-11 rounded-full bg-white/10 hover:bg-white/15 active:scale-98 text-white font-semibold text-xs border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Github size={15} />
            <span>GitHub</span>
          </button>
        )}
      </div>

      {/* 5. Screenshots / Visual Showcase (from Pixel_ Mobile Portfolio.html .shots) */}
      <div className="px-5 py-2">
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 pt-1 -mx-5 px-5">
          {tab.previewImage ? (
            <div className="flex-none w-56 h-36 rounded-2xl overflow-hidden border border-white/10 shadow-lg relative bg-neutral-900">
              <img src={tab.previewImage} alt={tab.name} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-3 px-2 py-0.5 rounded-full bg-black/70 text-[9px] font-mono text-white/90">
                {tab.displayUrl}
              </span>
            </div>
          ) : null}

          {/* Simulated App Card (from Pixel_ Mobile Portfolio.html .cardx) */}
          <div
            style={{
              background: `linear-gradient(135deg, ${tab.gradient[0]}33, #1c1d22)`,
            }}
            className="flex-none w-56 h-36 rounded-2xl p-3 border border-white/10 shadow-lg flex flex-col justify-between"
          >
            <div>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] font-bold text-white/80 uppercase">
                Interactive Preview
              </span>
              <p className="text-xs font-bold text-white mt-2 truncate">{tab.title}</p>
            </div>
            <div className="p-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/5">
              <p className="text-[10px] text-white/70 line-clamp-2 leading-snug m-0">
                {tab.tagline[lang]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Section About & What's Inside (from Pixel_ Mobile Portfolio.html .sec) */}
      <div className="px-5 pt-3 flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider text-blue-400">
            About this app
          </h3>
          <p className="text-xs text-white/75 leading-relaxed m-0 text-justify">
            {tab.description[lang]}
          </p>
        </div>

        {/* Key Features */}
        {tab.features && tab.features.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider text-blue-400">
              Key Capabilities
            </h3>
            <div className="flex flex-col gap-1.5">
              {tab.features.map((feat, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs text-white/80">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's Inside (Chips) */}
        <div>
          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider text-blue-400">
            What&apos;s inside
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tab.stack.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[11px] font-mono"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
