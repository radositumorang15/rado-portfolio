'use client';

import React from 'react';
import { Rnd } from 'react-rnd';
import { Minus, Square, Copy, X, LucideIcon } from 'lucide-react';
import { useWindowsStore, WindowState } from '../../../store/windows';

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

  if (win.isMaximized) {
    return (
      <div
        className="fixed inset-0 z-[500] flex flex-col bg-[var(--shell-bg)] border-none overflow-hidden select-text"
        onClick={() => focusWindow(win.id)}
        role="dialog"
        aria-label={win.title}
      >
        {/* Title bar */}
        <div
          className="h-8 flex items-center justify-between pl-3 pr-0 bg-[var(--shell-surface)] border-b border-[var(--shell-border)] select-none shrink-0"
          onDoubleClick={() => toggleMaximizeWindow(win.id)}
        >
          <div className="flex items-center gap-2">
            <Icon size={14} className={isActive ? 'text-[var(--rn-accent)]' : 'text-neutral-400'} />
            <span className={`text-xs font-medium ${isActive ? 'text-[var(--shell-text)]' : 'text-[var(--shell-text-muted)]'}`}>
              {win.title}
            </span>
          </div>

          <div className="flex items-center h-full">
            <button
              onClick={() => minimizeWindow(win.id)}
              className="w-[46px] h-full flex items-center justify-center hover:bg-neutral-500/20 text-[var(--shell-text)] transition-colors"
              aria-label="Minimize"
            >
              <Minus size={12} />
            </button>
            <button
              onClick={() => toggleMaximizeWindow(win.id)}
              className="w-[46px] h-full flex items-center justify-center hover:bg-neutral-500/20 text-[var(--shell-text)] transition-colors"
              aria-label="Restore"
            >
              <Copy size={11} />
            </button>
            <button
              onClick={() => closeWindow(win.id)}
              className="w-[46px] h-full flex items-center justify-center hover:bg-[#C42B1C] hover:text-white text-[var(--shell-text)] transition-colors"
              aria-label="Close"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-[var(--shell-bg)] text-[var(--shell-text)]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Rnd
      size={{ width: win.w, height: win.h }}
      position={{ x: win.x, y: win.y }}
      onDragStop={(e, d) => updatePosition(win.id, d.x, d.y, win.w, win.h)}
      onResizeStop={(e, direction, ref, delta, position) => {
        updatePosition(win.id, position.x, position.y, ref.offsetWidth, ref.offsetHeight);
      }}
      minWidth={360}
      minHeight={280}
      bounds="window"
      dragHandleClassName="window-titlebar"
      style={{ zIndex: win.z }}
      onMouseDown={() => focusWindow(win.id)}
      className="flex flex-col"
    >
      <div
        className={`flex-1 flex flex-col rounded-lg border overflow-hidden select-text transition-shadow duration-150 ${
          isActive
            ? 'border-[var(--shell-border-strong,#757575)] shadow-[0_16px_40px_rgba(0,0,0,0.35)]'
            : 'border-[var(--shell-border,rgba(255,255,255,0.08))] shadow-[0_8px_20px_rgba(0,0,0,0.2)]'
        } bg-[var(--shell-bg)]`}
        role="dialog"
        aria-label={win.title}
      >
        {/* Title bar */}
        <div
          className="window-titlebar h-8 flex items-center justify-between pl-3 pr-0 bg-[var(--shell-surface)] border-b border-[var(--shell-border)] cursor-grab active:cursor-grabbing select-none shrink-0"
          onDoubleClick={() => toggleMaximizeWindow(win.id)}
        >
          <div className="flex items-center gap-2 pointer-events-none">
            <Icon size={14} className={isActive ? 'text-[var(--rn-accent)]' : 'text-neutral-400'} />
            <span className={`text-xs font-medium ${isActive ? 'text-[var(--shell-text)]' : 'text-[var(--shell-text-muted)]'}`}>
              {win.title}
            </span>
          </div>

          <div className="flex items-center h-full">
            <button
              onClick={() => minimizeWindow(win.id)}
              className="w-[46px] h-full flex items-center justify-center hover:bg-neutral-500/20 text-[var(--shell-text)] transition-colors"
              aria-label="Minimize"
            >
              <Minus size={12} />
            </button>
            <button
              onClick={() => toggleMaximizeWindow(win.id)}
              className="w-[46px] h-full flex items-center justify-center hover:bg-neutral-500/20 text-[var(--shell-text)] transition-colors"
              aria-label="Maximize"
            >
              <Square size={11} />
            </button>
            <button
              onClick={() => closeWindow(win.id)}
              className="w-[46px] h-full flex items-center justify-center hover:bg-[#C42B1C] hover:text-white text-[var(--shell-text)] transition-colors"
              aria-label="Close"
            >
              <X size={13} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-auto bg-[var(--shell-bg)] text-[var(--shell-text)]">
          {children}
        </div>
      </div>
    </Rnd>
  );
};
