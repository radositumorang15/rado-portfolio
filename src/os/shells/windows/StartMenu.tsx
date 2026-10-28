'use client';

import React from 'react';
import {
  Search,
  User,
  Briefcase,
  LayoutGrid,
  Cpu,
  Terminal,
  FileText,
  Mail,
  Settings,
  Sparkles,
  LucideIcon,
} from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { AppId } from '../../../lib/constants';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

const PINNED_APPS: { id: AppId; label: string; icon: LucideIcon }[] = [
  { id: 'about', label: 'About Me', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const openWindow = useWindowsStore((s) => s.openWindow);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex justify-center items-end pb-24"
      onClick={onClose}
    >
      <div
        className="glass-flyout w-[580px] h-[640px] max-w-[95vw] p-6 text-white flex flex-col justify-between shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="flex items-center gap-2.5 px-4 h-9 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 cursor-pointer text-xs text-white/60 transition-colors shadow-xs"
          >
            <Search size={14} className="text-white/60" />
            <span>Search apps, projects, skills... (Ctrl+K)</span>
          </div>

          {/* Pinned Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-white/80 px-1">
              <span>Pinned</span>
              <span className="text-[11px] text-blue-400 font-normal">All apps ›</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 py-1">
              {PINNED_APPS.map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => {
                      openWindow(app.id);
                      onClose();
                    }}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:border-blue-400/50 shadow-sm transition-colors">
                      <Icon size={22} />
                    </div>
                    <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">
                      {app.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recommended Section */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-xs font-semibold text-white/80 px-1">Recommended</span>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div
                onClick={() => {
                  openWindow('projects');
                  onClose();
                }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-600/30 flex items-center justify-center shrink-0">
                  <LayoutGrid size={18} className="text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">siGizi App</p>
                  <p className="text-[11px] text-white/50 truncate">Featured Project</p>
                </div>
              </div>

              <div
                onClick={() => {
                  openWindow('resume');
                  onClose();
                }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-600/30 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">CV_Rado_Nelson.pdf</p>
                  <p className="text-[11px] text-white/50 truncate">PDF Resume</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
              R
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">Rado Situmorang</p>
              <p className="text-[10px] text-white/60">Final-Year PTIK UNS</p>
            </div>
          </div>

          <button
            onClick={() => {
              openWindow('contact');
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors"
          >
            <Sparkles size={13} />
            <span>Hire me</span>
          </button>
        </div>
      </div>
    </div>
  );
};
