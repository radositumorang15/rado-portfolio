'use client';

import React from 'react';
import {
  User,
  Briefcase,
  LayoutGrid,
  Cpu,
  Terminal,
  FileText,
  Mail,
  Settings,
  Mic,
  Camera,
  CloudSun,
  LucideIcon,
} from 'lucide-react';
import { profileData } from '../../../data/profile';
import { AppId } from '../../../lib/constants';

interface HomeProps {
  onOpenApp: (id: AppId) => void;
  onOpenSearch: () => void;
  onOpenRecents?: () => void;
}

const APPS: { id: AppId; label: string; icon: LucideIcon; color: string }[] = [
  { id: 'about', label: 'About', icon: User, color: 'bg-blue-600/30 text-blue-300 border-blue-500/40' },
  { id: 'projects', label: 'Projects', icon: LayoutGrid, color: 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40' },
  { id: 'experience', label: 'Experience', icon: Briefcase, color: 'bg-amber-600/30 text-amber-300 border-amber-500/40' },
  { id: 'skills', label: 'Skills', icon: Cpu, color: 'bg-purple-600/30 text-purple-300 border-purple-500/40' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'bg-teal-600/30 text-teal-300 border-teal-500/40' },
  { id: 'resume', label: 'Resume', icon: FileText, color: 'bg-rose-600/30 text-rose-300 border-rose-500/40' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'bg-cyan-600/30 text-cyan-300 border-cyan-500/40' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-zinc-600/30 text-zinc-300 border-zinc-500/40' },
];

const HOTSEAT: AppId[] = ['contact', 'projects', 'terminal', 'settings'];

export const Home: React.FC<HomeProps> = ({ onOpenApp, onOpenSearch, onOpenRecents }) => {
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
  };

  const handleAppLaunch = (id: AppId) => {
    triggerHaptic();
    onOpenApp(id);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 pt-2 pb-3 text-white overflow-y-auto select-none">
      {/* Top: At-a-glance & Material 3 Profile Card */}
      <div className="flex flex-col gap-3">
        {/* At-a-glance (Pixel Style) */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-2 text-xs font-medium text-white/80">
            <span>Wed, Oct 28</span>
            <span>•</span>
            <div className="flex items-center gap-1 text-amber-300">
              <CloudSun size={14} />
              <span>29°C</span>
            </div>
          </div>
        </div>

        {/* Profile Card (Material 3 Expressive Tonal Surface) */}
        <div className="p-4 rounded-[28px] bg-gradient-to-br from-blue-700/30 via-indigo-950/40 to-neutral-900/60 border border-blue-500/30 backdrop-blur-xl shadow-lg flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {/* Scallop / Cookie M3 Shape Avatar */}
            <div className="m3-shape-cookie w-14 h-14 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-md shrink-0">
              RN
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold truncate text-white">{profileData.name}</h2>
              <p className="text-xs text-blue-300 truncate">{profileData.tagline.en}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span className="text-[11px] text-emerald-300 font-medium">Open to work</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-0.5">
            <button
              onClick={() => handleAppLaunch('contact')}
              className="py-2 px-3 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-xs font-semibold text-white shadow-xs transition-all"
            >
              Contact Me
            </button>
            <button
              onClick={() => handleAppLaunch('resume')}
              className="py-2 px-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-xs font-semibold text-white transition-all"
            >
              View CV
            </button>
          </div>
        </div>

        {/* Material 3 App Grid (4 Columns) with Squircles */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 pt-2">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleAppLaunch(app.id)}
                className="flex flex-col items-center gap-1 active:scale-90 transition-transform group"
              >
                <div className={`w-13 h-13 rounded-[20px] border flex items-center justify-center shadow-md transition-transform group-hover:scale-105 ${app.color}`}>
                  <Icon size={22} />
                </div>
                <span className="text-[11px] font-normal text-white/90 truncate max-w-[64px]">
                  {app.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Launcher Area: Search Pill, Hotseat Dock, Gesture Handle */}
      <div className="flex flex-col gap-3 mt-4">
        {/* Pixel Google Search Pill */}
        <button
          onClick={() => {
            triggerHaptic();
            onOpenSearch();
          }}
          className="flex items-center justify-between px-3.5 h-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-white/70 transition-all shadow-md active:scale-98"
        >
          <div className="flex items-center gap-2">
            {/* Multi-colored Google G */}
            <svg width="15" height="15" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="text-white/60">Search apps & projects...</span>
          </div>
          <div className="flex items-center gap-2.5 text-white/60">
            <Mic size={15} className="text-blue-400" />
            <Camera size={15} className="text-amber-400" />
          </div>
        </button>

        {/* 4-App Hotseat Dock */}
        <div className="flex items-center justify-around px-2 pt-1 border-t border-white/5">
          {HOTSEAT.map((id) => {
            const app = APPS.find((a) => a.id === id);
            if (!app) return null;
            const Icon = app.icon;
            return (
              <button
                key={id}
                onClick={() => handleAppLaunch(id)}
                className={`w-12 h-12 rounded-[18px] active:scale-90 border flex items-center justify-center shadow-lg transition-transform ${app.color}`}
                aria-label={app.label}
              >
                <Icon size={22} />
              </button>
            );
          })}
        </div>

        {/* Gesture Navigation Pill */}
        <div
          className="flex justify-center pt-1 pb-1 cursor-pointer"
          onClick={() => {
            triggerHaptic();
            onOpenRecents?.();
          }}
          title="Recents App Switcher"
        >
          <div className="w-28 h-1 rounded-full bg-white/50 hover:bg-white/80 active:scale-95 transition-all" />
        </div>
      </div>
    </div>
  );
};
