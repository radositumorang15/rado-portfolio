'use client';

import React from 'react';
import { X, Sparkles, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { profileData } from '../../../data/profile';
import { projectsData } from '../../../data/projects';
import { useWindowsStore } from '../../../store/windows';

interface WidgetBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WidgetBoard: React.FC<WidgetBoardProps> = ({ isOpen, onClose }) => {
  const openWindow = useWindowsStore((s) => s.openWindow);

  if (!isOpen) return null;

  const latestProject = projectsData[0];

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-xs flex"
      onClick={onClose}
    >
      <div
        className="glass-flyout w-[440px] max-w-[90vw] h-full m-3 p-5 text-white flex flex-col gap-4 overflow-y-auto animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-blue-400" />
            <h2 className="text-sm font-semibold">RadoOS Widgets</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg text-white">
              RN
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold truncate">{profileData.name}</h3>
              <p className="text-xs text-blue-400 truncate">{profileData.tagline.en}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/70">
            <MapPin size={12} />
            <span>{profileData.location.en}</span>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="text-xs text-emerald-400 font-medium">Open to Fulltime & Freelance</span>
          </div>
        </div>

        {/* Latest Project Widget */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/70">Featured Project</span>
            <button
              onClick={() => {
                openWindow('projects');
                onClose();
              }}
              className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
            >
              <span>Explore</span>
              <ChevronRight size={12} />
            </button>
          </div>
          <h4 className="text-sm font-semibold text-white">{latestProject.title}</h4>
          <p className="text-xs text-white/60 line-clamp-2">{latestProject.summary.en}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {latestProject.stack.slice(0, 3).map((s) => (
              <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/80">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Experience Summary Widget */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/70">Active Roles</span>
            <button
              onClick={() => {
                openWindow('experience');
                onClose();
              }}
              className="text-xs text-blue-400 flex items-center gap-1 hover:underline"
            >
              <span>Timeline</span>
              <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={14} className="text-blue-400 shrink-0" />
            <div className="text-xs">
              <strong className="text-white">Programmer</strong> at CV Mariban Indonesia
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
