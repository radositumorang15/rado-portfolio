'use client';

import React, { useEffect } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Terminal,
  Monitor,
  Search,
  Sparkles,
} from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { usePrefsStore } from '../../../store/prefs';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  isOpen,
  onClose,
  onOpenSearch,
}) => {
  const openWindow = useWindowsStore((s) => s.openWindow);
  const resolvedTheme = usePrefsStore((s) => s.resolvedTheme);
  const setTheme = usePrefsStore((s) => s.setTheme);

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = () => onClose();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Clamping to screen
  const posX = typeof window !== 'undefined' ? Math.min(x, window.innerWidth - 220) : x;
  const posY = typeof window !== 'undefined' ? Math.min(y, window.innerHeight - 260) : y;

  return (
    <div
      style={{ top: posY, left: posX }}
      className="fixed z-[1250] w-52 p-1.5 rounded-xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-2xl text-xs text-white flex flex-col gap-0.5 select-none animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          openWindow('terminal');
          onClose();
        }}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
      >
        <Terminal size={14} className="text-emerald-400" />
        <span>Open Terminal</span>
      </button>

      <button
        onClick={() => {
          onClose();
          onOpenSearch();
        }}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
      >
        <Search size={14} className="text-blue-400" />
        <span>Command Palette (Ctrl+K)</span>
      </button>

      <div className="w-full h-[1px] bg-white/10 my-1" />

      <button
        onClick={() => {
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          onClose();
        }}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
      >
        {resolvedTheme === 'dark' ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-blue-400" />}
        <span>Switch to {resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode</span>
      </button>

      <button
        onClick={() => {
          openWindow('settings');
          onClose();
        }}
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left"
      >
        <Settings size={14} className="text-purple-400" />
        <span>Personalize / Settings</span>
      </button>

      <div className="w-full h-[1px] bg-white/10 my-1" />

      <a
        href="/classic"
        className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-left text-white/90"
      >
        <Monitor size={14} className="text-blue-400" />
        <span>Open Classic CV View</span>
      </a>
    </div>
  );
};

