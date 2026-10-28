'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, ArrowLeft, ArrowRight, ArrowUp, RotateCw, Search, X } from 'lucide-react';
import { Project } from '../../data/types';

interface ProjectsViewProps {
  projects: Project[];
  filterCategory?: 'all' | 'web' | 'mobile';
  lang?: 'en' | 'id';
  onFilterChange?: (cat: 'all' | 'web' | 'mobile') => void;
  onOpenProject?: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  filterCategory = 'all',
  lang = 'en',
  onFilterChange,
  onOpenProject,
}) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filtered = filterCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === filterCategory);

  return (
    <div className="flex flex-col h-full w-full select-none text-[var(--win-text-primary)] font-sans bg-[#202020]/95">
      {/* 1. BREADCRUMB & NAVIGATION BAR */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/[0.08] bg-[#272727]/90 text-xs text-white/80 shrink-0">
        <div className="flex items-center gap-0.5">
          <button className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Back"><ArrowLeft size={13} /></button>
          <button className="p-1 rounded hover:bg-white/10 text-white/40" title="Forward"><ArrowRight size={13} /></button>
          <button className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Up"><ArrowUp size={13} /></button>
          <button className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white" title="Refresh"><RotateCw size={12} /></button>
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-1.5 flex-1 h-7 px-2.5 rounded-[4px] bg-[#1e1e1e] border border-white/[0.08] text-white/90">
          <img src="/icons/win11/folder.png" alt="Folder" className="w-3.5 h-3.5 object-contain" />
          <span>This PC</span>
          <span className="text-white/40">&gt;</span>
          <span className="font-semibold text-white">Projects</span>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-1.5 w-44 h-7 px-2 rounded-[4px] bg-[#1e1e1e] border border-white/[0.08] text-white/60">
          <Search size={12} />
          <input
            type="text"
            placeholder="Search Projects"
            className="w-full bg-transparent text-[11px] text-white placeholder-white/40 focus:outline-none"
          />
        </div>
      </div>

      {/* 2. FILTER COMMAND BAR */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-white/[0.06] bg-[#252525]/80 text-xs">
        <div className="flex items-center gap-1">
          {(['all', 'web', 'mobile'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange?.(cat)}
              className={`px-2.5 py-1 rounded-[4px] text-xs capitalize transition-colors ${
                filterCategory === cat
                  ? 'bg-white/15 text-white font-medium border border-white/10'
                  : 'text-white/70 hover:bg-white/10'
              }`}
            >
              {cat === 'all' ? 'All Projects' : `${cat} Apps`}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-white/50">{filtered.length} files</span>
      </div>

      {/* 3. FILE GRID VIEW */}
      <div className="flex-1 p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-[#1e1e1e]/60">
        {filtered.map((proj) => {
          const isSelected = selectedSlug === proj.slug;
          return (
            <div
              key={proj.slug}
              onClick={() => setSelectedSlug(proj.slug)}
              onDoubleClick={() => setActiveModalProject(proj)}
              className={`p-3 rounded-[6px] border flex flex-col justify-between gap-2.5 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-white/[0.12] border-white/20 shadow-sm'
                  : 'bg-[#2b2b2b]/60 border-white/[0.06] hover:bg-white/[0.08]'
              }`}
            >
              <div className="flex items-start gap-3">
                <img src="/icons/win11/explorer.png" alt="App" className="w-9 h-9 object-contain shrink-0 drop-shadow-sm mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-blue-600/20 text-[#60CDFF]">
                      {proj.category}
                    </span>
                    <span className="text-[10px] text-white/40">{proj.category.toUpperCase()}</span>
                  </div>
                  <h3 className="text-xs font-semibold text-white truncate mt-1">{proj.title}</h3>
                  <p className="text-[11px] text-white/60 line-clamp-2 mt-0.5 leading-relaxed">{proj.summary[lang]}</p>
                </div>
              </div>

              {/* Stack & Links */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                <div className="flex gap-1 overflow-hidden">
                  {proj.stack.slice(0, 3).map((s) => (
                    <span key={s} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-white/70">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {proj.links.live && (
                    <a
                      href={proj.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/10 text-[#60CDFF]"
                      title="Live Demo"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {proj.links.source && (
                    <a
                      href={proj.links.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-white/10 text-white/70"
                      title="Source Code"
                    >
                      <Github size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. STATUS BAR */}
      <div className="h-6 px-3 flex items-center justify-between border-t border-white/[0.06] bg-[#272727] text-[11px] text-white/60 shrink-0">
        <span>{filtered.length} items | {selectedSlug ? '1 item selected' : 'Ready'}</span>
        <span>Windows 11 File Explorer</span>
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="w-[520px] max-w-[95vw] p-5 rounded-[8px] bg-[#2B2B2B] border border-white/15 text-white shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src="/icons/win11/explorer.png" alt="App" className="w-5 h-5 object-contain" />
                <span className="text-sm font-semibold">{activeModalProject.title}</span>
              </div>
              <button onClick={() => setActiveModalProject(null)} className="p-1 hover:bg-white/10 rounded"><X size={16} /></button>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">{activeModalProject.description[lang]}</p>
            <div className="flex gap-2">
              {activeModalProject.links.live && (
                <a href={activeModalProject.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#0078D4] text-xs font-semibold text-white">
                  <ExternalLink size={13} />
                  <span>Launch Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
