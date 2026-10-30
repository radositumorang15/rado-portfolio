'use client';

import React from 'react';
import { Project } from '../../data/types';

interface ProjectsGridProps {
  projects: Project[];
  lang: 'en' | 'id';
  onOpenFolder: (index: number) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  lang,
  onOpenFolder,
}) => {
  const getProjectHue = (p?: Project) => (p?.category === 'web' ? 205 : 150);

  return (
    <div className="flex-1 p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 content-start bg-[#16181f]/70">
      {projects.map((proj, idx) => {
        const hue = getProjectHue(proj);
        return (
          <button
            key={proj.slug}
            onClick={() => onOpenFolder(idx)}
            style={{ '--h': hue } as React.CSSProperties}
            className="item-3d folder-3d-wrap flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-white/[0.07] focus-visible:bg-white/[0.09] active:scale-95 transition-all text-center group cursor-pointer"
            title={`Open ${proj.title}`}
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

      {/* Ghost placeholder */}
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
  );
};

