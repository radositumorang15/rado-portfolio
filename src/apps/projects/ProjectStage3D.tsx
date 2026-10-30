'use client';

import React from 'react';
import { VirtualFile } from './ProjectInspector';
import { playWindowsSound } from '../../lib/audio';

interface ProjectStage3DProps {
  files: VirtualFile[];
  activeIndex: number;
  stageOpen: boolean;
  onSelectFile: (index: number) => void;
}

export const ProjectStage3D: React.FC<ProjectStage3DProps> = ({
  files,
  activeIndex,
  stageOpen,
  onSelectFile,
}) => {
  return (
    <div className="stage-3d flex flex-col justify-between p-4 min-h-[300px]">
      <p className="text-center text-xs text-white/50 tracking-wide z-10 m-0">
        Click file card or press{' '}
        <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-[10px]">←</kbd>{' '}
        <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono text-[10px]">→</kbd> to browse
      </p>

      {/* 3D Pocket Back Plate */}
      <i className="sback-3d" />

      {/* 3D Card Fan Carousel */}
      <div className="cards-3d">
        {files.map((file, i) => {
          const offset = i - activeIndex;
          const zIndex = 10 - Math.abs(offset);
          const isSelected = offset === 0;

          const transform = stageOpen
            ? `translate3d(${offset * 116}px, ${isSelected ? -56 : -20}px, ${
                -Math.abs(offset) * 80
              }px) rotateY(${offset * -34}deg) scale(${isSelected ? 1.1 : 0.98})`
            : 'translate3d(0, 100px, -60px) scale(0.7)';

          const opacity = stageOpen ? 1 : 0;

          return (
            <button
              key={file.name}
              onClick={() => {
                playWindowsSound('click');
                onSelectFile(i);
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
  );
};
