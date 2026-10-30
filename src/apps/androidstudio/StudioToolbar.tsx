'use client';

import React, { useState } from 'react';
import { ProjectData, ProjectState } from './types';
import { PROJECTS } from './data';
import { playWindowsSound } from '../../lib/audio';

interface StudioToolbarProps {
  curProject: ProjectData;
  curState: ProjectState;
  projectStates: Record<string, ProjectState>;
  viewMode: 'code' | 'emu';
  onSelectProject: (id: string) => void;
  onRun: () => void;
  onStop: () => void;
  onToggleViewMode: (mode: 'code' | 'emu') => void;
}

export const StudioToolbar: React.FC<StudioToolbarProps> = ({
  curProject,
  curState,
  projectStates,
  viewMode,
  onSelectProject,
  onRun,
  onStop,
  onToggleViewMode,
}) => {
  const [isPopOpen, setIsPopOpen] = useState(false);

  return (
    <>
      {/* 1. Menu Bar */}
      <div className="as-mb">
        <span>File</span><span>Edit</span><span>View</span><span>Navigate</span>
        <span>Code</span><span>Build</span><span>Run</span><span>Tools</span><span>Help</span>
        <b>{curProject.name} – {curProject.f[curState.cur]?.[0] || 'Editor'}</b>
      </div>

      {/* 2. Top Toolbar */}
      <div className="as-tl relative">
        <button
          onClick={() => setIsPopOpen((prev) => !prev)}
          className={`as-pj ${isPopOpen ? 'on' : ''}`}
          title="Switch Project"
        >
          <span className="as-mi">{curProject.mono}</span>
          <span>{curProject.name}</span>
          <small>▾</small>
        </button>

        <span className="as-cfg">{curProject.lang === 'Kotlin' ? 'app' : 'lib'} ▾</span>
        <span className="as-dv">Pixel 8 API 34</span>

        <button
          onClick={onRun}
          className={`as-rb go ${curState.busy ? 'busy' : ''}`}
          title="Run 'app' (Shift+F10)"
        >
          ▶
        </button>
        <button onClick={onStop} className="as-rb" title="Stop 'app' (Ctrl+F2)">
          ■
        </button>

        {/* View Toggle on Smaller Viewports */}
        <div className="as-seg">
          <button
            onClick={() => onToggleViewMode('code')}
            className={viewMode === 'code' ? 'on' : ''}
          >
            Code
          </button>
          <button
            onClick={() => onToggleViewMode('emu')}
            className={viewMode === 'emu' ? 'on' : ''}
          >
            Emulator
          </button>
        </div>
      </div>

      {/* Project Switch Popup Dropdown */}
      {isPopOpen && (
        <div className="as-pop">
          <h6>Projects</h6>
          {PROJECTS.map((proj) => {
            const isRun = projectStates[proj.id]?.st === 'on';
            return (
              <button
                key={proj.id}
                onClick={() => {
                  playWindowsSound('click');
                  onSelectProject(proj.id);
                  setIsPopOpen(false);
                }}
                style={{ '--a1': proj.a[0], '--a2': proj.a[1] } as React.CSSProperties}
              >
                <span className="as-mi">{proj.mono}</span>
                <span>
                  <b>{proj.name}</b>
                  <small>{proj.lang}</small>
                </span>
                {isRun ? <span className="as-rd" title="Running" /> : <span />}
                <span>{proj.id === curProject.id ? '✓' : ''}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

