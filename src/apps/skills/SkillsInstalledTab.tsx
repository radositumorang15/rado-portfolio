'use client';

import React, { useState } from 'react';
import { GITHUB_PROJECTS, INSTALLED_SKILLS, CATEGORY_HUES, InstalledSkill } from './data';
import { ExternalLink } from 'lucide-react';

interface SkillsInstalledTabProps {
  onOpenProject?: (url: string, name: string) => void;
}

export const SkillsInstalledTab: React.FC<SkillsInstalledTabProps> = ({ onOpenProject }) => {
  const [filterProject, setFilterProject] = useState<string | null>(null);

  const filteredSkills = filterProject
    ? INSTALLED_SKILLS.filter((s) => s.projects.includes(filterProject))
    : INSTALLED_SKILLS;

  const getMonogram = (name: string) =>
    name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Filter Chips Row */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-white/60 pb-1">
        <span className="font-medium mr-1 text-white/50">Used in GitHub:</span>
        <button
          onClick={() => setFilterProject(null)}
          className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
            filterProject === null
              ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-xs'
              : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
          }`}
        >
          All projects ({INSTALLED_SKILLS.length})
        </button>
        {Object.entries(GITHUB_PROJECTS).map(([id, meta]) => {
          const isSelected = filterProject === id;
          return (
            <button
              key={id}
              onClick={() => setFilterProject(isSelected ? null : id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
                isSelected
                  ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-xs'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
              }`}
            >
              <span
                style={{ backgroundColor: meta.color }}
                className="w-2 h-2 rounded-full shrink-0"
              />
              <span>{meta.name}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Installed Skills List */}
      <div className="flex flex-col gap-2">
        {filteredSkills.map((skill, i) => {
          const hue = CATEGORY_HUES[skill.category];
          return (
            <div
              key={skill.name}
              className="group grid grid-cols-[44px_1fr_auto] sm:grid-cols-[44px_1fr_auto_60px] gap-3.5 items-center p-2.5 rounded-xl border border-white/5 hover:border-white/15 bg-white/[0.03] hover:bg-white/[0.07] transition-all"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              {/* 44x44 Monogram Icon */}
              <div
                style={{
                  background: `linear-gradient(135deg, hsl(${hue.h} 75% 50%), hsl(${hue.h + 35} 70% 35%))`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                }}
                className="w-11 h-11 rounded-[12px] flex items-center justify-center font-mono font-bold text-sm text-white shrink-0 shadow-md"
              >
                {getMonogram(skill.name)}
              </div>

              {/* Title & Info */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate m-0 leading-tight">
                  {skill.name}
                </p>
                <p className="text-xs text-white/50 truncate m-0 mt-0.5">
                  {skill.category} &bull; Shipped since {skill.since} &bull; {skill.projects.length}{' '}
                  {skill.projects.length > 1 ? 'repos' : 'repo'}
                </p>
              </div>

              {/* GitHub Projects Badges */}
              <div className="flex flex-wrap gap-1.5 justify-end">
                {skill.projects.map((projId) => {
                  const meta = GITHUB_PROJECTS[projId];
                  if (!meta) return null;
                  return (
                    <button
                      key={projId}
                      onClick={() => onOpenProject?.(meta.githubUrl, meta.name)}
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] bg-white/5 hover:bg-white/15 border border-white/10 text-white/90 transition-colors cursor-pointer"
                      title={`View ${meta.name} on GitHub`}
                    >
                      <span
                        style={{ backgroundColor: meta.color }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                      />
                      <span>{meta.name}</span>
                      <ExternalLink size={9} className="opacity-40 group-hover:opacity-80" />
                    </button>
                  );
                })}
              </div>

              {/* Dots Rating Indicator (Desktop) */}
              <div className="hidden sm:flex items-center justify-end gap-1" title={`${skill.projects.length} repositories`}>
                {[0, 1, 2, 3, 4].map((dotIndex) => (
                  <span
                    key={dotIndex}
                    className={`w-1.5 h-1.5 rounded-full ${
                      dotIndex < Math.min(skill.projects.length, 5)
                        ? 'bg-blue-400 shadow-xs'
                        : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

