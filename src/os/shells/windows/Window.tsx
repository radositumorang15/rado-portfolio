'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import { LucideIcon } from 'lucide-react';
import { useWindowsStore, WindowState } from '../../../store/windows';
import { playWindowsSound } from '../../../lib/audio';

interface WindowProps {
  win: WindowState;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ win, icon: Icon, children }) => {
  const activeId = useWindowsStore((s) => s.activeId);
  const focusWindow = useWindowsStore((s) => s.focusWindow);
  const closeWindow = useWindowsStore((s) => s.closeWindow);
  const minimizeWindow = useWindowsStore((s) => s.minimizeWindow);
  const toggleMaximizeWindow = useWindowsStore((s) => s.toggleMaximizeWindow);
  const updatePosition = useWindowsStore((s) => s.updatePosition);

  if (!win.isOpen || win.isMinimized) return null;

  const isActive = activeId === win.id;

  const renderTitleBar = () => (
    <header
      className="window-titlebar h-9 flex items-center justify-between pl-3.5 pr-0 select-none shrink-0 cursor-grab active:cursor-grabbing border-b border-[var(--win-card-stroke-default)]"
      onDoubleClick={() => toggleMaximizeWindow(win.id)}
    >
      <div className="flex items-center gap-2.5 pointer-events-none">
        <Icon
          size={14}
          className={isActive ? 'text-[var(--win-accent-default)]' : 'text-[var(--win-text-tertiary)]'}
        />
        <span
          className={`text-xs tracking-normal ${
            isActive
              ? 'font-semibold text-[var(--win-text-primary)]'
              : 'font-normal text-[var(--win-text-secondary)]'
          }`}
        >
          {win.title}
        </span>
      </div>

      {/* Windows 11 Official Caption Controls */}
      <div className="flex items-center h-full">
        <button
          onClick={() => {
            playWindowsSound('minimize');
            minimizeWindow(win.id);
          }}
          className="w-[46px] h-full flex items-center justify-center hover:bg-white/10 active:bg-white/5 text-[var(--win-text-primary)] transition-colors"
          aria-label="Minimize"
          title="Minimize"
        >
          <svg width="10" height="1" viewBox="0 0 10 1" fill="currentColor">
            <rect width="10" height="1" />
          </svg>
        </button>
        <button
          onClick={() => {
            playWindowsSound('click');
            toggleMaximizeWindow(win.id);
          }}
          className="w-[46px] h-full flex items-center justify-center hover:bg-white/10 active:bg-white/5 text-[var(--win-text-primary)] transition-colors"
          aria-label={win.isMaximized ? 'Restore' : 'Maximize'}
          title={win.isMaximized ? 'Restore' : 'Maximize'}
        >
          {win.isMaximized ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="2.5" y="0.5" width="7" height="7" />
              <polyline points="0.5,2.5 0.5,9.5 7.5,9.5 7.5,7.5" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="0.5" y="0.5" width="9" height="9" />
            </svg>
          )}
        </button>
        <button
          onClick={() => {
            playWindowsSound('click');
            closeWindow(win.id);
          }}
          className="w-[46px] h-full flex items-center justify-center hover:bg-[#C42B1C] hover:text-white text-[var(--win-text-primary)] transition-colors"
          aria-label="Close"
          title="Close"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
            <line x1="0" y1="0" x2="10" y2="10" />
            <line x1="10" y1="0" x2="0" y2="10" />
          </svg>
        </button>
      </div>
    </header>
  );

  // Maximized State: 0px Radius Rule
  if (win.isMaximized) {
    return (
      <div
        className="fixed top-0 left-0 right-0 bottom-12 z-[500] flex flex-col rounded-none border-none overflow-hidden select-text shadow-none"
        style={{
          backgroundColor: isActive ? 'var(--win-mica-active-bg)' : 'var(--win-mica-inactive-bg)',
          backdropFilter: isActive ? 'blur(60px)' : 'none',
        }}
        onClick={() => focusWindow(win.id)}
        role="dialog"
        aria-label={win.title}
      >
        {/* Base Layer: Title Bar */}
        {renderTitleBar()}

        {/* Content Layer: Primary Workspace */}
        <div className="flex-1 overflow-auto bg-[var(--win-layer-bg)] rounded-none text-[var(--win-text-primary)]">
          {children}
        </div>
      </div>
    );
  }

  // Floating Restored State: 8px Radius & Two-Layer System
  return (
    <Rnd
      size={{ width: win.w, height: win.h }}
      position={{ x: win.x, y: win.y }}
      onDragStop={(e, d) => updatePosition(win.id, d.x, d.y, win.w, win.h)}
      onResizeStop={(e, direction, ref, delta, position) => {
        updatePosition(win.id, position.x, position.y, ref.offsetWidth, ref.offsetHeight);
      }}
      minWidth={380}
      minHeight={290}
      bounds="window"
      dragHandleClassName="window-titlebar"
      style={{ zIndex: win.z }}
      onMouseDown={() => focusWindow(win.id)}
      className="flex flex-col"
    >
      <div
        className="flex-1 flex flex-col rounded-[8px] border border-[var(--win-surface-stroke-default)] overflow-hidden select-text transition-all duration-150"
        style={{
          boxShadow: isActive ? 'var(--win-shadow-window-active)' : 'var(--win-shadow-window-inactive)',
          backgroundColor: isActive ? 'var(--win-mica-active-bg)' : 'var(--win-mica-inactive-bg)',
          backdropFilter: isActive ? 'blur(60px)' : 'none',
        }}
        role="dialog"
        aria-label={win.title}
      >
        {/* Base Layer: Foundation (Title Bar) */}
        {renderTitleBar()}

        {/* Content Layer: Primary Workspace with 8px top-left radius */}
        <div className="flex-1 overflow-auto bg-[var(--win-layer-bg)] rounded-tl-[8px] border-t border-l border-[var(--win-card-stroke-default)] text-[var(--win-text-primary)]">
          {children}
        </div>
      </div>
    </Rnd>
  );
};
