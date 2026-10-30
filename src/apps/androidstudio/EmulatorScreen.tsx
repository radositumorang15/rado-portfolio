'use client';

import React from 'react';
import { ProjectData, ProjectState } from './types';
import { playWindowsSound } from '../../lib/audio';

interface EmulatorScreenProps {
  curProject: ProjectData;
  curState: ProjectState;
  timeStr: string;
  phoneScale: number;
  fitContainerRef: React.Ref<HTMLDivElement>;
  onSelectScreen: (screenIdx: number) => void;
}

export const EmulatorScreen: React.FC<EmulatorScreenProps> = ({
  curProject,
  curState,
  timeStr,
  phoneScale,
  fitContainerRef,
  onSelectScreen,
}) => {
  const currentScreen = curProject.screens[curState.scr] || curProject.screens[0];

  const renderBody = () => {
    if (curState.st === 'off') {
      return (
        <div className="as-off">
          <p className="font-semibold text-white/90 mb-1">Android Studio Emulator</p>
          <span>Klik tombol &#9654; Run di atas untuk build dan jalankan aplikasi di Pixel 8.</span>
        </div>
      );
    }

    if (curState.st === 'boot') {
      return (
        <div className="as-boot">
          <span>android</span>
          <div className="as-ld" />
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative bg-black">
        {/* Real Mobile App Screenshot Viewer */}
        <div className="as-scr-shot flex-1 w-full h-full overflow-y-auto scrollbar-thin">
          <img
            src={currentScreen.image}
            alt={`${curProject.name} — ${currentScreen.label}`}
            className="w-full h-auto min-h-full object-cover object-top select-none pointer-events-none"
          />
        </div>

        {/* Feature Desc Badge Overlay */}
        {currentScreen.desc && (
          <div className="absolute top-7 left-2 right-2 z-10 pointer-events-none">
            <span className="inline-block px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] text-white/90 font-medium shadow-md border border-white/10 truncate max-w-full">
              {currentScreen.desc}
            </span>
          </div>
        )}

        {/* Bottom Navigation for Multi-Screen Projects */}
        {curProject.screens.length > 1 && (
          <div className="as-nv shrink-0 bg-[#141517] border-t border-white/10 z-20">
            {curProject.screens.map((screen, idx) => {
              const isActive = idx === curState.scr;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    playWindowsSound('click');
                    onSelectScreen(idx);
                  }}
                  className={`flex flex-col items-center justify-center py-1 transition-colors ${
                    isActive ? 'text-[var(--a1)] font-semibold on' : 'text-neutral-400 hover:text-white'
                  }`}
                  title={screen.desc || screen.label}
                >
                  <span className="text-[10px] truncate max-w-[85px] px-1">{screen.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="as-emu">
      <div className="as-eh">
        <span className="truncate">Pixel 8 API 34 · {curProject.name}</span>
        <span className="flex items-center gap-1.5 text-[10px] shrink-0">
          <span
            className={`w-2 h-2 rounded-full ${
              curState.st === 'on'
                ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                : curState.st === 'boot'
                ? 'bg-amber-400'
                : 'bg-neutral-600'
            }`}
          />
          {curState.st === 'on' ? 'Running' : curState.st === 'boot' ? 'Booting' : 'Not running'}
        </span>
      </div>

      <div ref={fitContainerRef} className="as-fit">
        <div className="as-ph" style={{ '--s': phoneScale } as React.CSSProperties}>
          <div className="as-scr">
            {/* Status Bar */}
            <div
              className="as-sb"
              style={{
                color: '#ffffff',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 30,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
              }}
            >
              <span>{timeStr}</span>
              <span className="flex items-center gap-1">5G ▮▮▮</span>
            </div>

            {/* Emulator Screen Body */}
            {renderBody()}

            {/* Toast Notification */}
            {curState.toast && <div className="as-tost">{curState.toast}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
