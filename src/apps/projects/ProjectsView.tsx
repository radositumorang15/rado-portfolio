'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Project } from '../../data/types';
import { playWindowsSound } from '../../lib/audio';
import { notch } from '../../os/notch';
import { ProjectsToolbar } from './ProjectsToolbar';
import { ProjectsGrid } from './ProjectsGrid';
import { ProjectStage3D } from './ProjectStage3D';
import { ProjectInspector, VirtualFile } from './ProjectInspector';
import './folder3d.css';

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
  const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stageOpen, setStageOpen] = useState<boolean>(false);

  const filteredProjects = projects.filter((p) => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const titleMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const stackMatch = p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && (titleMatch || stackMatch);
  });

  const currentProject = projects[activeProjectIndex] || projects[0];

  const getVirtualFiles = (p: Project): VirtualFile[] => [
    { name: 'README.md', kind: 'md' },
    { name: 'screenshots', kind: 'dir' },
    { name: 'stack.json', kind: 'json' },
    p.category === 'web'
      ? { name: 'Live Demo.url', kind: 'url' }
      : { name: 'app-release.apk', kind: 'apk' },
  ];

  const virtualFiles = currentProject ? getVirtualFiles(currentProject) : [];

  const handleOpenFolder = (index: number) => {
    playWindowsSound('open');
    setActiveProjectIndex(index);
    setActiveCardIndex(0);
    setViewMode('detail');
    setStageOpen(false);

    const proj = projects[index];
    if (proj) {
      notch.show({
        title: `Opened ${proj.title}`,
        subtitle: `${proj.category.toUpperCase()} Application Project`,
      });
      onOpenProject?.(proj);
    }
  };

  const handleBackToGrid = () => {
    playWindowsSound('click');
    setViewMode('grid');
  };

  useEffect(() => {
    if (viewMode === 'detail') {
      const timer = setTimeout(() => setStageOpen(true), 60);
      return () => clearTimeout(timer);
    }
  }, [viewMode, activeProjectIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (viewMode !== 'detail') return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        playWindowsSound('click');
        setActiveCardIndex((prev) => Math.min(virtualFiles.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        playWindowsSound('click');
        setActiveCardIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleBackToGrid();
      }
    },
    [viewMode, virtualFiles.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleLaunchLink = (url: string, title: string) => {
    playWindowsSound('click');
    notch.show({ title: `Launching ${title}`, subtitle: url });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full w-full select-none text-[var(--win-text-primary)] font-sans bg-[#1c1f26]/95">
      <ProjectsToolbar
        viewMode={viewMode}
        currentProject={currentProject}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onBackToGrid={handleBackToGrid}
        onRefresh={() => {
          playWindowsSound('click');
          setStageOpen(false);
          setTimeout(() => setStageOpen(true), 50);
        }}
      />

      {viewMode === 'grid' && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06] bg-[#20242c]/80 text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            {(['all', 'web', 'mobile'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => onFilterChange?.(cat)}
                className={`px-3 py-1 rounded-[5px] text-xs capitalize transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-blue-600/30 text-[#60CDFF] font-semibold border border-blue-500/40 shadow-xs'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                {cat === 'all' ? 'All Projects' : `${cat} Apps`}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-white/50">{filteredProjects.length} folders</span>
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {viewMode === 'grid' ? (
          <ProjectsGrid
            projects={filteredProjects}
            lang={lang}
            onOpenFolder={(filteredIdx) => {
              const originalIndex = projects.findIndex((p) => p.slug === filteredProjects[filteredIdx].slug);
              handleOpenFolder(originalIndex >= 0 ? originalIndex : 0);
            }}
          />
        ) : (
          <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1fr_340px] overflow-hidden">
            <ProjectStage3D
              files={virtualFiles}
              activeIndex={activeCardIndex}
              stageOpen={stageOpen}
              onSelectFile={(i) => setActiveCardIndex(i)}
            />
            <ProjectInspector
              project={currentProject}
              activeFile={virtualFiles[activeCardIndex] || virtualFiles[0]}
              activeFileIndex={activeCardIndex}
              totalFiles={virtualFiles.length}
              lang={lang}
              onBack={handleBackToGrid}
              onLaunchLink={handleLaunchLink}
            />
          </div>
        )}
      </div>

      <div className="h-6 flex items-center justify-between px-3 text-[11px] text-white/50 border-t border-white/[0.08] bg-[#1a1c22] shrink-0">
        <span>
          {viewMode === 'grid'
            ? `${filteredProjects.length} items`
            : `${virtualFiles.length} files inside folder`}
        </span>
        <span className="font-mono">Windows 11 File Explorer · 3D Portfolio OS</span>
      </div>
    </div>
  );
};
