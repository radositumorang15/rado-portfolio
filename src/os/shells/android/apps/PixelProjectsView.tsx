'use client';

import React, { useState } from 'react';
import { projectsData } from '../../../../data/projects';
import { Project } from '../../../../data/types';
import { usePrefsStore } from '../../../../store/prefs';
import { notch } from '../../../notch';

export const PixelProjectsView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const [filter, setFilter] = useState<'all' | 'mobile' | 'web'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projectsData.filter((p) => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleOpenLink = (url: string, label: string) => {
    notch.show({
      title: label,
      subtitle: url,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-20 text-[var(--m3-on-surface)] font-sans">
      {/* 1. M3 SEARCH BAR (Files by Google Style) */}
      <div className="flex items-center gap-2.5 h-11 px-3.5 rounded-full bg-[var(--m3-surface-container-high)] text-[var(--m3-on-surface)] shadow-xs">
        <span className="material-symbols-rounded text-[20px] text-[var(--m3-on-surface-variant)]">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search files & applications..."
          className="flex-1 bg-transparent text-xs text-[var(--m3-on-surface)] placeholder-[var(--m3-on-surface-variant)] focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[var(--m3-on-surface-variant)] hover:text-white"
          >
            <span className="material-symbols-rounded text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* 2. M3 FILTER CHIPS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 'mobile', 'web'] as const).map((cat) => {
          const isActive = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 ${
                isActive
                  ? 'bg-[var(--m3-primary)] text-[var(--m3-on-primary)] shadow-xs'
                  : 'bg-[var(--m3-surface-container)] text-[var(--m3-on-surface-variant)] hover:bg-[var(--m3-surface-container-high)]'
              }`}
            >
              <span className="material-symbols-rounded text-[16px]">
                {cat === 'all' ? 'apps' : cat === 'mobile' ? 'smartphone' : 'language'}
              </span>
              <span className="capitalize">{cat === 'all' ? 'All Files' : `${cat} Apps`}</span>
            </button>
          );
        })}
        <span className="ml-auto text-[11px] text-[var(--m3-on-surface-variant)] shrink-0 pl-2">
          {filtered.length} items
        </span>
      </div>

      {/* 3. ASYMMETRIC GROUPED PROJECT CARDS */}
      <div className="flex flex-col gap-[3px]">
        {filtered.map((proj, idx, arr) => {
          const radiusClass =
            arr.length === 1
              ? 'rounded-[24px]'
              : idx === 0
              ? 'rounded-t-[24px] rounded-b-[4px]'
              : idx === arr.length - 1
              ? 'rounded-t-[4px] rounded-b-[24px]'
              : 'rounded-[4px]';

          return (
            <div
              key={proj.slug}
              onClick={() => setSelectedProject(proj)}
              className={`p-3.5 bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] cursor-pointer transition-colors active:scale-99 flex flex-col gap-2.5 ${radiusClass}`}
            >
              <div className="flex items-start gap-3">
                {/* App / File Icon with Optical Roundness (Outer 12px) */}
                <div className="w-11 h-11 rounded-[12px] bg-[var(--m3-surface-container-highest)] text-[var(--m3-primary)] flex items-center justify-center shrink-0">
                  <span className="material-symbols-rounded text-[24px]">
                    {proj.category === 'mobile' ? 'android' : 'web'}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold truncate text-[var(--m3-on-surface)]">
                      {proj.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[9px] font-bold uppercase tracking-wider shrink-0">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--m3-on-surface-variant)] line-clamp-2 mt-0.5 leading-snug">
                    {proj.summary[language]}
                  </p>
                </div>
              </div>

              {/* Tech Stack Pills & Open Detail prompt */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {proj.stack.slice(0, 3).map((st) => (
                    <span
                      key={st}
                      className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-[var(--m3-on-surface-variant)] truncate"
                    >
                      {st}
                    </span>
                  ))}
                  {proj.stack.length > 3 && (
                    <span className="text-[10px] text-[var(--m3-on-surface-variant)]">
                      +{proj.stack.length - 3}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-semibold text-[var(--m3-primary)] shrink-0 flex items-center">
                  Details
                  <span className="material-symbols-rounded text-[14px]">chevron_right</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. M3 PROJECT DETAIL BOTTOM SHEET / MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex flex-col justify-end p-3 animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-md mx-auto max-h-[85vh] overflow-y-auto p-5 rounded-[28px] bg-[var(--m3-surface-container)] text-[var(--m3-on-surface)] shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1 rounded-full bg-[var(--m3-on-surface-variant)]/40 mx-auto" />

            {/* Header info */}
            <div className="flex items-start gap-3.5">
              <div className="w-14 h-14 rounded-[16px] bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)] flex items-center justify-center shrink-0">
                <span className="material-symbols-rounded text-[32px]">
                  {selectedProject.category === 'mobile' ? 'android' : 'terminal'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="px-2 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[10px] font-bold uppercase tracking-wider">
                  {selectedProject.category} app
                </span>
                <h3 className="text-base font-bold leading-tight mt-1 text-[var(--m3-on-surface)]">
                  {selectedProject.title}
                </h3>
                {selectedProject.role && (
                  <p className="text-xs text-[var(--m3-primary)] mt-0.5">
                    {selectedProject.role[language]}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-[var(--m3-surface-container-high)] flex items-center justify-center text-[var(--m3-on-surface)]"
              >
                <span className="material-symbols-rounded text-[18px]">close</span>
              </button>
            </div>

            {/* Description Segmented Group */}
            <div className="flex flex-col gap-[3px]">
              <div className="p-3.5 rounded-t-[20px] rounded-b-[4px] bg-[var(--m3-surface-container-high)]">
                <p className="text-xs font-semibold text-[var(--m3-primary)] mb-1 uppercase tracking-wider">
                  Description
                </p>
                <p className="text-xs leading-relaxed text-[var(--m3-on-surface)]">
                  {selectedProject.description[language]}
                </p>
              </div>

              <div className="p-3.5 rounded-t-[4px] rounded-b-[20px] bg-[var(--m3-surface-container-high)]">
                <p className="text-xs font-semibold text-[var(--m3-primary)] mb-1.5 uppercase tracking-wider">
                  Tech Stack & Libraries
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-full bg-[var(--m3-surface-container)] text-[var(--m3-on-surface)] text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons (Pill Buttons) */}
            <div className="flex flex-col gap-2 pt-1">
              {selectedProject.links.live && (
                <button
                  onClick={() => handleOpenLink(selectedProject.links.live!, 'Opening Live Demo')}
                  className="w-full h-11 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform"
                >
                  <span className="material-symbols-rounded text-[18px]">open_in_new</span>
                  <span>Launch Live Demo</span>
                </button>
              )}

              {selectedProject.links.source && (
                <button
                  onClick={() => handleOpenLink(selectedProject.links.source!, 'Opening GitHub Source')}
                  className="w-full h-11 rounded-full bg-[var(--m3-surface-container-high)] text-[var(--m3-on-surface)] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[var(--m3-surface-container-highest)] active:scale-98 transition-transform"
                >
                  <span className="material-symbols-rounded text-[18px]">code</span>
                  <span>View Source on GitHub</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

