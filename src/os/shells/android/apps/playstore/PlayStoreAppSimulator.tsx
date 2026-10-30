'use client';

import React, { useState } from 'react';
import { PlayApp } from './types';
import { ArrowLeft, ExternalLink, Github, Smartphone } from 'lucide-react';

interface PlayStoreAppSimulatorProps {
  app: PlayApp;
  onBack: () => void;
  onOpenLink: (url: string, title: string) => void;
}

export const PlayStoreAppSimulator: React.FC<PlayStoreAppSimulatorProps> = ({
  app,
  onBack,
  onOpenLink,
}) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const currentScreen = app.screens[activeScreenIndex] || app.screens[0];

  return (
    <div className="flex flex-col h-full w-full bg-[#111318] text-white select-none animate-in fade-in duration-200">
      {/* Top Simulator Header */}
      <div className="h-12 px-3 flex items-center justify-between border-b border-white/10 bg-[#1e2025] shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-2 py-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Play Store</span>
        </button>

        <div className="flex items-center gap-2">
          <div
            style={{
              background: `linear-gradient(135deg, ${app.gradient[0]}, ${app.gradient[1]})`,
            }}
            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-xs"
          >
            {app.iconInitials}
          </div>
          <span className="text-xs font-semibold truncate max-w-[140px]">{app.name}</span>
        </div>

        <div className="flex items-center gap-1">
          {app.githubUrl && (
            <button
              onClick={() => onOpenLink(app.githubUrl!, 'GitHub Repository')}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
              title="View GitHub Source"
            >
              <Github size={15} />
            </button>
          )}
          {app.liveUrl && (
            <button
              onClick={() => onOpenLink(app.liveUrl!, app.name)}
              className="p-1.5 rounded-full hover:bg-white/10 text-blue-400"
              title="Open Live Demo"
            >
              <ExternalLink size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Main Screen Viewport (Simulated Phone Display) */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 relative overflow-hidden bg-radial from-[#1e2026] to-[#0f1013]">
        {currentScreen ? (
          <div className="relative w-full max-w-[280px] h-full max-h-[460px] rounded-[24px] overflow-hidden border-[5px] border-neutral-800 shadow-2xl bg-black flex flex-col">
            {/* Screen Screenshot */}
            <div className="relative flex-1 min-h-0 overflow-hidden bg-black flex items-center justify-center">
              <img
                src={currentScreen.image}
                alt={currentScreen.label}
                className="w-full h-full object-cover object-top animate-in fade-in duration-300"
              />
              <div className="absolute top-2 left-2 right-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white/90 flex items-center justify-between pointer-events-none">
                <span className="truncate">{currentScreen.label}</span>
                <span className="text-emerald-400 shrink-0 font-mono text-[9px] uppercase">
                  Live
                </span>
              </div>
            </div>

            {/* Feature Description Banner */}
            <div className="px-3 py-2 bg-neutral-900 border-t border-neutral-800 text-[11px] text-white/80 leading-tight">
              <p className="font-semibold text-[var(--m3-primary)] truncate m-0">
                {currentScreen.label}
              </p>
              <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5 m-0">
                {currentScreen.desc || currentScreen.label}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-xs text-white/40 flex flex-col items-center gap-2">
            <Smartphone size={32} />
            <span>Interactive emulator not available</span>
          </div>
        )}
      </div>

      {/* Bottom Nav Screen Switcher (Tabs) */}
      {app.screens.length > 1 && (
        <div className="h-14 px-2 border-t border-white/10 bg-[#16181d] flex items-center justify-around shrink-0">
          {app.screens.map((screen, idx) => {
            const isActive = idx === activeScreenIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveScreenIndex(idx)}
                className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center gap-0.5 transition-all active:scale-95 cursor-pointer ${
                  isActive
                    ? 'text-[var(--m3-primary)] font-bold'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <div
                  className={`w-8 h-1 rounded-full transition-all ${
                    isActive ? 'bg-[var(--m3-primary)] w-10' : 'bg-transparent'
                  }`}
                />
                <span className="text-[10px] truncate max-w-[75px] text-center">
                  {screen.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
