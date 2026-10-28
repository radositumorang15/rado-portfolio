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
  Search,
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
  { id: 'about', label: 'About', icon: User, color: 'bg-blue-600/25 text-blue-300 border-blue-500/30' },
  { id: 'experience', label: 'Experience', icon: Briefcase, color: 'bg-amber-600/25 text-amber-300 border-amber-500/30' },
  { id: 'projects', label: 'Projects', icon: LayoutGrid, color: 'bg-emerald-600/25 text-emerald-300 border-emerald-500/30' },
  { id: 'skills', label: 'Skills', icon: Cpu, color: 'bg-purple-600/25 text-purple-300 border-purple-500/30' },
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'bg-teal-600/25 text-teal-300 border-teal-500/30' },
  { id: 'resume', label: 'Resume', icon: FileText, color: 'bg-rose-600/25 text-rose-300 border-rose-500/30' },
  { id: 'contact', label: 'Contact', icon: Mail, color: 'bg-cyan-600/25 text-cyan-300 border-cyan-500/30' },
  { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-zinc-600/25 text-zinc-300 border-zinc-500/30' },
];

const FAVORITES: AppId[] = ['about', 'projects', 'resume', 'contact'];

export const Home: React.FC<HomeProps> = ({ onOpenApp, onOpenSearch, onOpenRecents }) => {
  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-white overflow-y-auto">
      {/* Top: At-a-glance & Profile Widget */}
      <div className="flex flex-col gap-4">
        {/* At-a-glance */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5 text-xs font-medium text-white/70">
              <span>Wednesday, 28 Oct</span>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-300">
                <CloudSun size={13} />
                <span>29°C</span>
              </div>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white/95">Halo, saya Rado</h1>
          </div>
        </div>

        {/* Profile Widget (M3 Expressive) */}
        <div className="p-4 rounded-[28px] bg-gradient-to-br from-blue-700/40 via-blue-900/30 to-neutral-900/50 border border-blue-500/20 backdrop-blur-md shadow-lg flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-xl font-bold text-white shadow-md">
              RN
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold truncate">{profileData.name}</h2>
              <p className="text-xs text-blue-300 truncate">{profileData.tagline.en}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span className="text-[11px] text-emerald-400 font-medium">Open to work</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => onOpenApp('contact')}
              className="py-2 px-3 rounded-full bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-xs transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => onOpenApp('resume')}
              className="py-2 px-3 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Resume
            </button>
          </div>
        </div>

        {/* App Grid (4 Columns) with M3 Continuous Shapes */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-2 pt-2">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform group"
              >
                <div className={`w-14 h-14 rounded-[22px] border flex items-center justify-center shadow-md transition-all group-hover:scale-105 ${app.color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-[11px] font-medium text-white/90 truncate max-w-[68px]">
                  {app.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom: Search Pill, 4-App Dock, Gesture Pill */}
      <div className="flex flex-col gap-4 mt-6">
        {/* Android 17 Pill Search Bar (Pixel style) */}
        <button
          onClick={onOpenSearch}
          className="flex items-center justify-between px-4 h-13 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-white/70 transition-all shadow-md active:scale-98"
        >
          <div className="flex items-center gap-2.5">
            <Search size={18} className="text-blue-400" />
            <span className="text-white/60">Search apps & projects...</span>
          </div>
          <div className="flex items-center gap-3 text-white/50">
            <Mic size={16} className="text-blue-400 hover:text-white transition-colors" />
            <Camera size={16} className="text-amber-400 hover:text-white transition-colors" />
          </div>
        </button>

        {/* 4-App Favorite Dock */}
        <div className="flex items-center justify-around px-2 pt-1">
          {FAVORITES.map((id) => {
            const app = APPS.find((a) => a.id === id);
            if (!app) return null;
            const Icon = app.icon;
            return (
              <button
                key={id}
                onClick={() => onOpenApp(id)}
                className={`w-14 h-14 rounded-[22px] active:scale-95 border flex items-center justify-center shadow-lg transition-transform ${app.color}`}
                aria-label={app.label}
              >
                <Icon size={26} />
              </button>
            );
          })}
        </div>

        {/* Gesture Pill */}
        <div
          className="flex justify-center pt-2 cursor-pointer"
          onClick={onOpenRecents}
        >
          <div className="w-28 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
        </div>
      </div>
    </div>
  );
};
