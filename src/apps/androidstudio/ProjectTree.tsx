'use client';

import React from 'react';
import { ProjectData, ProjectState } from './types';
import { playWindowsSound } from '../../lib/audio';

interface ProjectTreeProps {
  curProject: ProjectData;
  curState: ProjectState;
  onSelectFile: (fileKey: string) => void;
}

export const ProjectTree: React.FC<ProjectTreeProps> = ({
  curProject,
  curState,
  onSelectFile,
}) => {
  const getFileBadge = (filename: string) => {
    if (filename.endsWith('.kt')) {
      return <span className="text-[10px] font-bold text-[#7F52FF] bg-[#7F52FF]/15 px-1 rounded mr-1">KT</span>;
    }
    if (filename.endsWith('.dart')) {
      return <span className="text-[10px] font-bold text-[#02569B] bg-[#02569B]/15 px-1 rounded mr-1">DART</span>;
    }
    if (filename.endsWith('.kts') || filename.includes('gradle')) {
      return <span className="text-[10px] font-bold text-[#02303A] text-emerald-400 bg-emerald-950 px-1 rounded mr-1">GRADLE</span>;
    }
    if (filename.endsWith('.yaml') || filename.endsWith('.yml')) {
      return <span className="text-[10px] font-bold text-amber-400 bg-amber-950 px-1 rounded mr-1">YAML</span>;
    }
    if (filename.endsWith('.xml')) {
      return <span className="text-[10px] font-bold text-red-400 bg-red-950 px-1 rounded mr-1">XML</span>;
    }
    if (filename.endsWith('.md')) {
      return <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-1 rounded mr-1">MD</span>;
    }
    return <span className="text-[11px] mr-1">📄</span>;
  };

  return (
    <div className="as-tree">
      <div className="as-th flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider border-b border-[var(--as-line)]">
        <span>Project</span>
        <span className="text-[10px] font-mono lowercase text-neutral-500">
          {curProject.lang === 'Kotlin' ? 'kotlin/android' : 'flutter/dart'}
        </span>
      </div>

      <div className="as-tw py-1">
        {curProject.tree.map(([lvl, label, fileKey], idx) => {
          const isSelected = fileKey && curState.cur === fileKey;

          if (fileKey) {
            return (
              <button
                key={idx}
                onClick={() => {
                  playWindowsSound('click');
                  onSelectFile(fileKey);
                }}
                className={`t flex items-center w-full text-left py-1 text-xs hover:bg-white/5 transition-colors ${
                  isSelected ? 'on bg-[var(--as-sel)] text-white font-medium' : 'text-neutral-300'
                }`}
                style={{ paddingLeft: `${8 + lvl * 14}px` }}
              >
                {getFileBadge(label)}
                <span className="truncate">{label}</span>
              </button>
            );
          }

          return (
            <div
              key={idx}
              className="t flex items-center text-xs py-1 text-neutral-400 font-medium select-none"
              style={{ paddingLeft: `${8 + lvl * 14}px` }}
            >
              <span className="mr-1 text-[11px] text-neutral-500">▾ 📁</span>
              <span className="truncate">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

