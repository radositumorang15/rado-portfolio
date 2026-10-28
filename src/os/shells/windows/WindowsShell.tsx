'use client';

import React, { useState, useRef } from 'react';
import {
  User,
  Briefcase,
  LayoutGrid,
  Cpu,
  Terminal as TermIcon,
  FileText,
  Mail,
  Settings as SettingsIcon,
  Trash2,
  LucideIcon,
} from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { Window } from './Window';
import { Dock } from './Dock';
import { StartMenu } from './StartMenu';
import { WidgetBoard } from './WidgetBoard';
import { Palette } from './Palette';
import { ContextMenu } from './ContextMenu';
import { WindowsWallpaper } from './WindowsWallpaper';
import { NotchHost } from '../../notch/NotchHost';
import { AppId } from '../../../lib/constants';

import { AboutApp } from '../../../apps/about';
import { ExperienceApp } from '../../../apps/experience';
import { ProjectsApp } from '../../../apps/projects';
import { SkillsApp } from '../../../apps/skills';
import { TerminalApp } from '../../../apps/terminal';
import { ResumeApp } from '../../../apps/resume';
import { ContactApp } from '../../../apps/contact';
import { SettingsApp } from '../../../apps/settings';

const DESKTOP_ICONS: { id: AppId | 'recycle'; label: string; icon: LucideIcon }[] = [
  { id: 'about', label: 'This PC', icon: User },
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'terminal', label: 'Terminal', icon: TermIcon },
  { id: 'resume', label: 'Resume.pdf', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'recycle', label: 'Recycle Bin', icon: Trash2 },
];

export const WindowsShell: React.FC = () => {
  const windows = useWindowsStore((s) => s.windows);
  const openWindow = useWindowsStore((s) => s.openWindow);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean }>({
    x: 0,
    y: 0,
    isOpen: false,
  });

  // Marquee selection rectangle
  const [marquee, setMarquee] = useState<{ x1: number; y1: number; x2: number; y2: number; active: boolean }>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    active: false,
  });
  const isDraggingMarquee = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('.desktop-icon') || (e.target as HTMLElement).closest('footer') || (e.target as HTMLElement).closest('.window-frame')) {
      return;
    }
    setSelectedIcon(null);
    setIsStartOpen(false);
    setIsWidgetsOpen(false);
    isDraggingMarquee.current = true;
    setMarquee({ x1: e.clientX, y1: e.clientY, x2: e.clientX, y2: e.clientY, active: true });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingMarquee.current) return;
    setMarquee((prev) => ({ ...prev, x2: e.clientX, y2: e.clientY }));
  };

  const handleMouseUp = () => {
    if (isDraggingMarquee.current) {
      isDraggingMarquee.current = false;
      setMarquee((prev) => ({ ...prev, active: false }));
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, isOpen: true });
  };

  const handleIconClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIcon(id);
    if (e.detail === 2) {
      if (id !== 'recycle') {
        openWindow(id as AppId);
      }
    }
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative w-screen h-screen overflow-hidden select-none text-white"
    >
      {/* Windows 11 Dark Bloom Wallpaper */}
      <WindowsWallpaper />

      {/* Rado Notch (Top Center) */}
      <NotchHost platform="windows" />

      {/* Selection Marquee Box */}
      {marquee.active && (
        <div
          className="fixed pointer-events-none z-30 border border-blue-400/80 bg-blue-500/20"
          style={{
            left: Math.min(marquee.x1, marquee.x2),
            top: Math.min(marquee.y1, marquee.y2),
            width: Math.abs(marquee.x2 - marquee.x1),
            height: Math.abs(marquee.y2 - marquee.y1),
          }}
        />
      )}

      {/* Windows 11 Desktop Icons */}
      <div className="absolute top-12 left-3 z-10 flex flex-col gap-1.5">
        {DESKTOP_ICONS.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedIcon === item.id;
          return (
            <div
              key={item.id}
              onClick={(e) => handleIconClick(item.id, e)}
              className={`desktop-icon flex flex-col items-center justify-center w-[76px] py-1.5 px-1 rounded-sm border cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-[#0078d4]/30 border-[#0078d4]/60'
                  : 'border-transparent hover:bg-white/10 active:bg-white/20'
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center text-blue-300 drop-shadow-md">
                <Icon size={28} />
              </div>
              <span className="text-[11px] font-normal text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate max-w-[72px] text-center mt-0.5">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Floating Windows Area */}
      <div className="absolute inset-0 z-20 pointer-events-none [&>*]:pointer-events-auto">
        <Window win={windows.about} icon={User}><AboutApp /></Window>
        <Window win={windows.experience} icon={Briefcase}><ExperienceApp /></Window>
        <Window win={windows.projects} icon={LayoutGrid}><ProjectsApp /></Window>
        <Window win={windows.skills} icon={Cpu}><SkillsApp /></Window>
        <Window win={windows.terminal} icon={TermIcon}><TerminalApp /></Window>
        <Window win={windows.resume} icon={FileText}><ResumeApp /></Window>
        <Window win={windows.contact} icon={Mail}><ContactApp /></Window>
        <Window win={windows.settings} icon={SettingsIcon}><SettingsApp /></Window>
      </div>

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Command Palette */}
      <Palette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Widget Board */}
      <WidgetBoard isOpen={isWidgetsOpen} onClose={() => setIsWidgetsOpen(false)} />

      {/* Windows 11 Full-width Taskbar */}
      <Dock
        onToggleStart={() => setIsStartOpen((prev) => !prev)}
        onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
        onToggleWidgets={() => setIsWidgetsOpen((prev) => !prev)}
      />

      {/* Context Menu */}
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.isOpen}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </div>
  );
};
