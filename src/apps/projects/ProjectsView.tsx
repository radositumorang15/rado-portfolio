'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  RotateCw,
  Search,
  ExternalLink,
  Github,
  Folder as FolderIcon,
  FileText,
  Code,
  Image as ImageIcon,
  Download,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Project } from '../../data/types';
import { playWindowsSound } from '../../lib/audio';
import { notch } from '../../os/notch';
import './folder3d.css';

interface ProjectsViewProps {
  projects: Project[];
  filterCategory?: 'all' | 'web' | 'mobile';
  lang?: 'en' | 'id';
  onFilterChange?: (cat: 'all' | 'web' | 'mobile') => void;
  onOpenProject?: (project: Project) => void;
}

interface VirtualFile {
  name: string;
  kind: 'md' | 'dir' | 'json' | 'url' | 'apk';
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

  // Filter projects by category and search query
  const filteredProjects = projects.filter((p) => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const titleMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const stackMatch = p.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && (titleMatch || stackMatch);
  });

  const currentProject = projects[activeProjectIndex] || projects[0];

  // Hue based on project category (web: 205, mobile: 150)
  const getProjectHue = (p?: Project) => (p?.category === 'web' ? 205 : 150);

  // Generate virtual files inside the folder pocket
  const getVirtualFiles = (p: Project): VirtualFile[] => [
    { name: 'README.md', kind: 'md' },
    { name: 'screenshots', kind: 'dir' },
    { name: 'stack.json', kind: 'json' },
    p.category === 'web'
      ? { name: 'Live Demo.url', kind: 'url' }
      : { name: 'app-release.apk', kind: 'apk' },
  ];

  const virtualFiles = currentProject ? getVirtualFiles(currentProject) : [];

  // Navigate to Detail View
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

  // Return to Grid View
  const handleBackToGrid = () => {
    playWindowsSound('click');
    setViewMode('grid');
  };

  // Trigger stage open animation when entering detail view
  useEffect(() => {
    if (viewMode === 'detail') {
      const timer = setTimeout(() => setStageOpen(true), 60);
      return () => clearTimeout(timer);
    } else {
      setStageOpen(false);
    }
  }, [viewMode, activeProjectIndex]);

  // Keyboard navigation for 3D card carousel
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
    notch.show({
      title: `Launching ${title}`,
      subtitle: url,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full w-full select-none text-[var(--win-text-primary)] font-sans bg-[#1c1f26]/95">
      {/* 1. WINDOW TOOLBAR & BREADCRUMBS */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/[0.08] bg-[#232730]/90 text-xs text-white/80 shrink-0">
        <div className="flex items-center gap-0.5">
          <button
            onClick={handleBackToGrid}
            disabled={viewMode === 'grid'}
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Back to Projects Grid"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            disabled
            className="p-1 rounded text-white/30 cursor-default"
            title="Forward"
          >
            <ArrowRight size={14} />
          </button>
          <button
            onClick={handleBackToGrid}
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Up to Projects Root"
          >
            <ArrowUp size={14} />
          </button>
          <button
            onClick={() => {
              playWindowsSound('click');
              setStageOpen(false);
              setTimeout(() => setStageOpen(true), 50);
            }}
            className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
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
            onClick={handleBackToGrid}
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
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or stack..."
            className="w-full bg-transparent text-[11px] text-white placeholder-white/40 focus:outline-none"
          />
        </div>
      </div>

      {/* 2. COMMAND / FILTER BAR (GRID MODE) */}
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

      {/* 3. MAIN BODY VIEWPORT */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {viewMode === 'grid' ? (
          /* ==========================================
             GRID VIEW: 3D FOLDERS WITH REALISTIC POPUP
             ========================================== */
          <div className="flex-1 p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 content-start bg-[#16181f]/70">
            {filteredProjects.map((proj, idx) => {
              const hue = getProjectHue(proj);
              const originalIndex = projects.findIndex((p) => p.slug === proj.slug);
              return (
                <button
                  key={proj.slug}
                  onClick={() => handleOpenFolder(originalIndex)}
                  style={{ '--h': hue } as React.CSSProperties}
                  className="item-3d folder-3d-wrap flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-white/[0.07] focus-visible:bg-white/[0.09] active:scale-95 transition-all text-center group cursor-pointer"
                  title={`Double-click or click to open ${proj.title}`}
                >
                  {/* 3D Folder Geometry */}
                  <div className="folder-3d">
                    <i className="fb" />
                    <i className="fp p1" />
                    <i className="fp p2" />
                    <i className="ff" />
                  </div>

                  {/* Folder Labels */}
                  <div className="flex flex-col items-center text-center mt-2 w-full">
                    <b className="font-semibold text-xs text-white group-hover:text-[#60CDFF] transition-colors truncate max-w-[130px]">
                      {proj.title.split('—')[0].trim()}
                    </b>
                    <small className="text-[11px] text-white/60 line-clamp-1 max-w-[130px] mt-0.5">
                      {proj.summary[lang] || proj.summary.en}
                    </small>
                  </div>
                </button>
              );
            })}

            {/* Ghost folder placeholder: More coming soon... */}
            <div
              style={{ '--h': 45 } as React.CSSProperties}
              className="item-3d ghost folder-3d-wrap flex flex-col items-center gap-3 p-3 rounded-xl text-center"
            >
              <div className="folder-3d">
                <i className="fb" />
                <i className="fp p1" />
                <i className="fp p2" />
                <i className="ff" />
              </div>
              <div className="flex flex-col items-center text-center mt-2 w-full">
                <b className="font-semibold text-xs text-white/70">More coming soon…</b>
                <small className="text-[11px] text-white/40">Next project</small>
              </div>
            </div>
          </div>
        ) : (
          /* ==========================================
             DETAIL VIEW: 3D POCKET & COVERFLOW FILE FAN
             ========================================== */
          <div
            style={{ '--h': getProjectHue(currentProject) } as React.CSSProperties}
            className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-[1fr_310px] overflow-hidden"
          >
            {/* Left / Center: Interactive 3D Folder Pocket Stage */}
            <div className="stage-3d flex flex-col justify-between p-4 min-h-[300px]">
              {/* Top Hint */}
              <p className="text-center text-xs text-white/50 tracking-wide z-10 m-0">
                Click file card or press <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-[10px]">→</kbd> to browse
              </p>

              {/* 3D Pocket Back Plate */}
              <i className="sback-3d" />

              {/* 3D Card Fan Carousel */}
              <div className="cards-3d">
                {virtualFiles.map((file, i) => {
                  const offset = i - activeCardIndex;
                  const zIndex = 10 - Math.abs(offset);
                  const isSelected = offset === 0;

                  // 3D transformation calculation matching prototype
                  const transform = stageOpen
                    ? `translate3d(${offset * 116}px, ${
                        isSelected ? -56 : -20
                      }px, ${-Math.abs(offset) * 80}px) rotateY(${offset * -34}deg) scale(${
                        isSelected ? 1.1 : 0.98
                      })`
                    : 'translate3d(0, 100px, -60px) scale(0.7)';

                  const opacity = stageOpen ? 1 : 0;

                  return (
                    <button
                      key={file.name}
                      onClick={() => {
                        playWindowsSound('click');
                        setActiveCardIndex(i);
                      }}
                      style={{
                        zIndex,
                        opacity,
                        transform,
                        transitionDelay: `${i * 65}ms`,
                      }}
                      className={`card-3d ${isSelected ? 'on' : ''}`}
                    >
                      <span className="badge-3d font-mono font-bold text-xl">
                        {file.kind === 'dir' ? 'DIR' : `.${file.kind}`}
                      </span>
                      <b className="text-xs font-semibold text-white/95 truncate max-w-[105px]">
                        {file.name}
                      </b>
                      <span className="text-[10px] text-white/50 uppercase tracking-wider">
                        {file.kind === 'dir'
                          ? 'Directory'
                          : file.kind === 'md'
                          ? 'Documentation'
                          : file.kind === 'json'
                          ? 'Configuration'
                          : 'Deployment'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 3D Pocket Front Flap */}
              <i className="pocket-3d" />
            </div>

            {/* Right: Live Preview Inspector Sidebar */}
            <aside className="border-t md:border-t-0 md:border-l border-white/[0.08] p-5 overflow-y-auto bg-[#1a1c22]/90 flex flex-col justify-between">
              <div>
                {/* 1. README.md Preview */}
                {virtualFiles[activeCardIndex]?.kind === 'md' && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-blue-400" />
                      <h3 className="text-base font-bold text-white m-0 truncate">
                        {currentProject.title}
                      </h3>
                    </div>
                    <p className="text-xs font-medium text-[#60CDFF] m-0">
                      {currentProject.summary[lang] || currentProject.summary.en}
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed m-0">
                      {currentProject.description[lang] || currentProject.description.en}
                    </p>

                    <div className="mt-2">
                      <span className="text-[11px] font-semibold text-white/80 block mb-1.5">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.stack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/10 border border-white/10 text-white/90"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {currentProject.role && (
                      <div className="mt-2 p-2.5 rounded bg-white/5 border border-white/5 text-[11px] text-white/70">
                        <span className="font-semibold text-white/90 block">Role:</span>
                        {currentProject.role[lang] || currentProject.role.en}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Screenshots Directory Preview */}
                {virtualFiles[activeCardIndex]?.kind === 'dir' && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      <FolderIcon size={18} className="text-amber-400" />
                      <h3 className="text-base font-bold text-white m-0">screenshots</h3>
                    </div>
                    <p className="text-xs text-white/60 m-0">
                      {currentProject.images.length > 0
                        ? `${currentProject.images.length} preview images recorded`
                        : 'Preview showcase snapshots'}
                    </p>

                    <div className="flex flex-col gap-2 mt-1">
                      {currentProject.images.length > 0 ? (
                        currentProject.images.map((img, i) => (
                          <div
                            key={i}
                            className="rounded-lg overflow-hidden border border-white/10 bg-black/40 shadow-sm"
                          >
                            <img
                              src={img}
                              alt={`${currentProject.title} screenshot ${i + 1}`}
                              className="w-full h-24 object-cover hover:scale-105 transition-transform"
                            />
                          </div>
                        ))
                      ) : (
                        [0, 35, 70].map((shift, i) => {
                          const baseHue = getProjectHue(currentProject);
                          return (
                            <div
                              key={i}
                              style={{
                                background: `linear-gradient(135deg, hsl(${baseHue + shift} 65% 50%), hsl(${baseHue + shift + 40} 65% 30%))`,
                              }}
                              className="shot-preview"
                            />
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                {/* 3. stack.json Preview */}
                {virtualFiles[activeCardIndex]?.kind === 'json' && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      <Code size={18} className="text-emerald-400" />
                      <h3 className="text-base font-bold text-white m-0">stack.json</h3>
                    </div>
                    <pre className="p-3 rounded-lg bg-[#14161c] border border-white/10 font-mono text-[11px] leading-relaxed text-[#7CFFB2] overflow-x-auto m-0 shadow-inner">
                      {JSON.stringify(
                        {
                          name: currentProject.title.split('—')[0].trim(),
                          category: currentProject.category,
                          role: currentProject.role ? (currentProject.role[lang] || currentProject.role.en) : undefined,
                          stack: currentProject.stack,
                        },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                )}

                {/* 4. Live Demo.url / app-release.apk Preview */}
                {(virtualFiles[activeCardIndex]?.kind === 'url' ||
                  virtualFiles[activeCardIndex]?.kind === 'apk') && (
                  <div className="flex flex-col gap-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      {virtualFiles[activeCardIndex]?.kind === 'url' ? (
                        <ExternalLink size={18} className="text-sky-400" />
                      ) : (
                        <Download size={18} className="text-emerald-400" />
                      )}
                      <h3 className="text-base font-bold text-white m-0">
                        {virtualFiles[activeCardIndex]?.name}
                      </h3>
                    </div>
                    <p className="text-xs text-white/70 m-0">
                      {virtualFiles[activeCardIndex]?.kind === 'url'
                        ? 'Open the interactive web application in a new browser tab.'
                        : 'Explore or download the Android production build repository.'}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentProject.links.live && (
                        <button
                          onClick={() => handleLaunchLink(currentProject.links.live!, currentProject.title)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white shadow-xs transition-colors cursor-pointer"
                        >
                          <ExternalLink size={13} />
                          <span>Open Live Demo</span>
                        </button>
                      )}

                      {currentProject.links.source && (
                        <button
                          onClick={() => handleLaunchLink(currentProject.links.source!, 'GitHub Repository')}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 font-semibold text-xs text-white transition-colors cursor-pointer"
                        >
                          <Github size={13} />
                          <span>Source Code</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Return */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  onClick={handleBackToGrid}
                  className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>Back to all folders</span>
                </button>
                <span className="text-[10px] text-white/40 font-mono">
                  {activeCardIndex + 1} of {virtualFiles.length} files
                </span>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* 4. WINDOW STATUS BAR */}
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
