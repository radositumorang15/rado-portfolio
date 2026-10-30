'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, RotateCw, Search } from 'lucide-react';
import { Project } from '../../data/types';

interface ProjectsToolbarProps {
  viewMode: 'grid' | 'detail';
  currentProject?: Project;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBackToGrid: () => void;
  onRefresh: () => void;
}

export const ProjectsToolbar: React.FC<ProjectsToolbarProps> = ({
  viewMode,
  currentProject,
  searchQuery,
  onSearchChange,
  onBackToGrid,
  onRefresh,
}) => {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/[0.08] bg-[#232730]/90 text-xs text-white/80 shrink-0">
      <div className="flex items-center gap-0.5">
        <button
          onClick={onBackToGrid}
          disabled={viewMode === 'grid'}
          className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
          title="Back to Projects Grid"
        >
          <ArrowLeft size={14} />
        </button>
        <button disabled className="p-1 rounded text-white/30 cursor-default" title="Forward">
          <ArrowRight size={14} />
        </button>
        <button
          onClick={onBackToGrid}
          className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Up to Projects Root"
        >
          <ArrowUp size={14} />
        </button>
        <button
          onClick={onRefresh}
          className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Refresh"
        >
          <RotateCw size={13} />
        </button>
      </div>

      {/* Address Breadcrumb Bar */}
      <div className="flex items-center gap-1.5 flex-1 h-7 px-2.5 rounded-[4px] bg-[#171a21] border border-white/[0.08] text-white/90 overflow-hidden text-ellipsis whitespace-nowrap">
        <img src="/icons/win11/folder.png" alt="Folder" className="w-3.5 h-3.5 object-contain" />
        <span className="text-white/60">This PC</span>
        <span className="text-white/40">&gt;</span>
        <button
          onClick={onBackToGrid}
          className={`hover:underline cursor-pointer ${
            viewMode === 'grid' ? 'font-semibold text-white' : 'text-white/80'
          }`}
        >
          Projects
        </button>
        {viewMode === 'detail' && currentProject && (
          <>
            <span className="text-white/40">&gt;</span>
            <span className="font-semibold text-white truncate max-w-[200px]">
              {currentProject.title}
            </span>
          </>
        )}
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-1.5 w-40 sm:w-48 h-7 px-2 rounded-[4px] bg-[#171a21] border border-white/[0.08] text-white/60">
        <Search size={12} className="shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="w-full bg-transparent text-[11px] text-white placeholder-white/40 focus:outline-none"
        />
      </div>
    </div>
  );
};

