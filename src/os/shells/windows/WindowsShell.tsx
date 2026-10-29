'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  User, Briefcase, LayoutGrid, Cpu, Terminal as TermIcon, FileText, Mail,
  Settings as SettingsIcon, Activity, Smartphone
} from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { Window } from './Window';
import { Dock } from './Dock';
import { StartMenu } from './StartMenu';
import { WidgetBoard } from './WidgetBoard';
import { Palette } from './Palette';
import { ContextMenu } from './ContextMenu';
import { WindowsWallpaper } from './WindowsWallpaper';
import { NotificationToast } from './NotificationToast';
import { NotchHost } from '../../notch/NotchHost';
import { AppId } from '../../../lib/constants';
import { playWindowsSound } from '../../../lib/audio';

import { AboutApp } from '../../../apps/about';
import { ExperienceApp } from '../../../apps/experience';
import { ProjectsApp } from '../../../apps/projects';
import { SkillsApp } from '../../../apps/skills';
import { TerminalApp } from '../../../apps/terminal';
import { ResumeApp } from '../../../apps/resume';
import { ContactApp } from '../../../apps/contact';
import { SettingsApp } from '../../../apps/settings';
import { TaskManagerApp } from '../../../apps/taskmanager';
import { AndroidStudioApp } from '../../../apps/androidstudio';
import '../../../apps/projects/folder3d.css';

const DESKTOP_ICONS: { id: AppId | 'recycle'; label: string; iconSrc: string }[] = [
  { id: 'about', label: 'This PC', iconSrc: '/icons/win11/thispc.png' },
  { id: 'projects', label: 'Projects', iconSrc: '/icons/win11/explorer.png' },
  { id: 'experience', label: 'Experience', iconSrc: '/icons/win11/folder.png' },
  { id: 'skills', label: 'Skills', iconSrc: '/icons/win11/skills.svg' },
  { id: 'terminal', label: 'Terminal', iconSrc: '/icons/win11/terminal.png' },
  { id: 'resume', label: 'Resume.pdf', iconSrc: '/icons/win11/notepad.png' },
  { id: 'contact', label: 'Contact', iconSrc: '/icons/win11/mail.png' },
  { id: 'recycle', label: 'Recycle Bin', iconSrc: '/icons/win11/bin0.png' },
];

export const WindowsShell: React.FC = () => {
  const windows = useWindowsStore((s) => s.windows);
  const openWindow = useWindowsStore((s) => s.openWindow);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean }>({ x: 0, y: 0, isOpen: false });

  const [marquee, setMarquee] = useState({ x1: 0, y1: 0, x2: 0, y2: 0, active: false });
  const isDraggingMarquee = useRef(false);

  // Ctrl + Shift + Esc -> Task Manager
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'Escape' || e.code === 'Escape')) {
        e.preventDefault();
        openWindow('taskmanager');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openWindow]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('.desktop-icon') || (e.target as HTMLElement).closest('footer') || (e.target as HTMLElement).closest('.window-frame') || (e.target as HTMLElement).closest('.react-draggable') || (e.target as HTMLElement).closest('[role="dialog"]')) return;
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

  const handleIconClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIcon(id);
    playWindowsSound('click');
    if (e.detail === 2 && id !== 'recycle') {
      playWindowsSound('open');
      openWindow(id as AppId);
    }
  };

  return (
    <div
      onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.clientX, y: e.clientY, isOpen: true }); }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative w-screen h-screen overflow-hidden select-none text-white font-sans"
    >
      <WindowsWallpaper />
      <NotchHost platform="windows" />

      {marquee.active && (
        <div
          className="fixed pointer-events-none z-30 border border-[#0078D4] bg-[#0078D4]/25"
          style={{
            left: Math.min(marquee.x1, marquee.x2),
            top: Math.min(marquee.y1, marquee.y2),
            width: Math.abs(marquee.x2 - marquee.x1),
            height: Math.abs(marquee.y2 - marquee.y1),
          }}
        />
      )}

      {/* Windows 11 Desktop Icons (76px x 86px) */}
      <div className="absolute top-12 left-3 z-10 flex flex-col gap-1">
        {DESKTOP_ICONS.map((item) => (
          <div
            key={item.id}
            onClick={(e) => handleIconClick(item.id, e)}
            className={`desktop-icon flex flex-col items-center justify-center w-[76px] h-[86px] p-1 rounded-[4px] cursor-pointer transition-colors ${
              selectedIcon === item.id ? 'bg-white/[0.12] border border-white/[0.15]' : 'border border-transparent hover:bg-white/[0.06] active:bg-white/[0.10]'
            }`}
          >
            {item.id === 'projects' ? (
              <div className="folder-3d-wrap my-0.5" style={{ '--h': 45 } as React.CSSProperties}>
                <div className="folder-3d scale-[0.42] -my-4 origin-center">
                  <i className="fb" />
                  <i className="fp p1" />
                  <i className="fp p2" />
                  <i className="ff" />
                </div>
              </div>
            ) : (
              <img src={item.iconSrc} alt={item.label} className="w-11 h-11 object-contain pointer-events-none drop-shadow-md" />
            )}
            <span className="text-[11px] font-normal text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate max-w-[72px] text-center mt-1">
              {item.label}
            </span>
          </div>
        ))}
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
        <Window win={windows.taskmanager} icon={Activity}><TaskManagerApp /></Window>
        <Window win={windows.androidstudio} icon={Smartphone}><AndroidStudioApp /></Window>
      </div>

      <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} onOpenSearch={() => setIsSearchOpen(true)} />
      <Palette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <WidgetBoard isOpen={isWidgetsOpen} onClose={() => setIsWidgetsOpen(false)} />
      <Dock
        onToggleStart={() => setIsStartOpen((p) => !p)}
        onToggleSearch={() => setIsSearchOpen((p) => !p)}
        onToggleWidgets={() => setIsWidgetsOpen((p) => !p)}
        onCloseFlyouts={() => {
          setIsStartOpen(false);
          setIsSearchOpen(false);
          setIsWidgetsOpen(false);
        }}
      />
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.isOpen}
        onClose={() => setContextMenu((p) => ({ ...p, isOpen: false }))}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      <NotificationToast />
    </div>
  );
};
