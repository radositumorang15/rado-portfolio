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
  LucideIcon,
} from 'lucide-react';
import { profileData } from '../../../data/profile';
import { AppId } from '../../../lib/constants';

interface HomeProps {
  onOpenApp: (id: AppId) => void;
  onOpenSearch: () => void;
  onOpenRecents?: () => void;
}

const APPS: { id: AppId; label: string; icon: LucideIcon }[] = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const FAVORITES: AppId[] = ['about', 'projects', 'resume', 'contact'];

export const Home: React.FC<HomeProps> = ({ onOpenApp, onOpenSearch, onOpenRecents }) => {
  return (
    <div className="flex-1 flex flex-col justify-between px-5 pt-3 pb-6 text-white overflow-y-auto">
      {/* Top: At-a-glance & Profile Widget */}
      <div className="flex flex-col gap-4">
        {/* At-a-glance */}
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-medium text-white/70">Wednesday, 28 Oct</p>
          <h1 className="text-xl font-bold tracking-tight">Halo, saya Rado</h1>
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

        {/* App Grid (4 Columns) */}
        <div className="grid grid-cols-4 gap-y-5 gap-x-2 pt-2">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform group"
              >
                <div className="w-14 h-14 rounded-[20px] bg-white/10 group-hover:bg-white/15 border border-white/10 flex items-center justify-center text-white shadow-md transition-colors">
                  <Icon size={24} />
                </div>
                <span className="text-[11px] font-medium text-white/90 truncate max-w-[64px]">
                  {app.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom: Search Pill, 4-App Dock, Gesture Pill */}
      <div className="flex flex-col gap-4 mt-6">
        {/* Search Pill */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-3 px-5 h-12 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-white/60 transition-colors shadow-sm"
        >
          <Search size={16} className="text-white/60" />
          <span>Search apps, projects, skills...</span>
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
                className="w-14 h-14 rounded-[20px] bg-white/15 active:scale-95 border border-white/15 flex items-center justify-center text-white shadow-lg transition-transform"
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
