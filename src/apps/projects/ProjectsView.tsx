'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Layers, X, Info } from 'lucide-react';
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
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filtered = filterCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === filterCategory);

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6 text-[var(--rn-text)]">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--rn-border)]">
        <div>
          <h1 className="text-xl font-bold">Featured Projects</h1>
          <p className="text-xs text-[var(--rn-text-muted)]">Showcase of web applications & Android systems</p>
        </div>

        {onFilterChange && (
          <div className="flex items-center gap-1.5 p-1 rounded-[var(--rn-radius-control)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)]">
            {(['all', 'web', 'mobile'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => onFilterChange(cat)}
                className={`px-3 py-1 rounded-[var(--rn-radius-control)] text-xs capitalize transition-colors ${
                  filterCategory === cat
                    ? 'bg-[var(--rn-accent)] text-[var(--rn-on-accent)] font-medium shadow-xs'
                    : 'text-[var(--rn-text-muted)] hover:text-[var(--rn-text)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((proj) => (
          <div
            key={proj.slug}
            className="p-5 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col justify-between gap-4 hover:border-[var(--rn-accent)] transition-all shadow-xs"
          >
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[var(--rn-accent-soft)] text-[var(--rn-accent)]">
                  {proj.category}
                </span>
                {proj.role && (
                  <span className="text-[11px] text-[var(--rn-text-muted)]">{proj.role[lang]}</span>
                )}
              </div>

              <h3 className="text-sm font-bold text-[var(--rn-text)]">{proj.title}</h3>
              <p className="text-xs text-[var(--rn-text-muted)] leading-relaxed">
                {proj.summary[lang]}
              </p>

              <div className="flex flex-wrap gap-1 mt-1">
                {proj.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--rn-surface)] text-[var(--rn-text-muted)] border border-[var(--rn-border)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[var(--rn-border)]">
              <div className="flex items-center gap-2">
                {proj.links.live && (
                  <a
                    href={proj.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--rn-radius-control)] bg-[var(--rn-accent)] text-[var(--rn-on-accent)] text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink size={12} />
                    <span>Demo</span>
                  </a>
                )}
                {proj.links.source && (
                  <a
                    href={proj.links.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--rn-radius-control)] bg-[var(--rn-surface)] border border-[var(--rn-border)] text-xs font-medium hover:bg-[var(--rn-accent-soft)] transition-colors"
                  >
                    <Github size={12} />
                    <span>Source</span>
                  </a>
                )}
              </div>
              <button
                onClick={() => setActiveModalProject(proj)}
                className="p-1.5 rounded-[var(--rn-radius-control)] hover:bg-[var(--rn-accent-soft)] text-[var(--rn-text-muted)] hover:text-[var(--rn-text)] transition-colors"
                title="View Details"
              >
                <Info size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="w-full max-w-lg p-6 rounded-2xl bg-[var(--rn-surface)] border border-[var(--rn-border)] text-[var(--rn-text)] flex flex-col gap-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--rn-border)]">
              <span className="text-xs font-semibold uppercase text-[var(--rn-accent)]">
                {activeModalProject.category}
              </span>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1 rounded-full hover:bg-[var(--rn-surface-alt)]"
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <h2 className="text-lg font-bold">{activeModalProject.title}</h2>
              {activeModalProject.role && (
                <p className="text-xs text-[var(--rn-text-muted)] mt-0.5">{activeModalProject.role[lang]}</p>
              )}
            </div>

            <p className="text-xs leading-relaxed text-[var(--rn-text)]">
              {activeModalProject.description[lang]}
            </p>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[var(--rn-text-muted)]">Technologies Used:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--rn-surface-alt)] border border-[var(--rn-border)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[var(--rn-border)] mt-2">
              {activeModalProject.links.live && (
                <a
                  href={activeModalProject.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--rn-accent)] text-[var(--rn-on-accent)] text-xs font-semibold hover:opacity-90"
                >
                  <ExternalLink size={13} />
                  <span>Open Live Demo</span>
                </a>
              )}
              {activeModalProject.links.source && (
                <a
                  href={activeModalProject.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] text-xs font-semibold hover:bg-[var(--rn-accent-soft)]"
                >
                  <Github size={13} />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
