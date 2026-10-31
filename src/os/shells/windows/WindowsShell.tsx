'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  User, Briefcase, LayoutGrid, Cpu, Terminal as TermIcon, FileText, Mail,
  Settings as SettingsIcon, Activity, Smartphone, Gamepad2
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
import { DesktopIcons } from './DesktopIcons';

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
import { PinballApp, SnaxiaApp } from '../../../apps/games';
import '../../../apps/projects/folder3d.css';

export const WindowsShell: React.FC = () => {
  const windows = useWindowsStore((s) => s.windows);
  const openWindow = useWindowsStore((s) => s.openWindow);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ x: 0, y: 0, isOpen: false });
  const [marquee, setMarquee] = useState({ x1: 0, y1: 0, x2: 0, y2: 0, active: false });
  const isDraggingMarquee = useRef(false);

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

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      const hasAny = Object.values(useWindowsStore.getState().windows).some((w) => w.isOpen);
      if (!hasAny) openWindow('about');
    }
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

      <DesktopIcons selectedIcon={selectedIcon} onIconClick={handleIconClick} />

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
        <Window win={windows.pinball} icon={Gamepad2}><PinballApp /></Window>
        <Window win={windows.snaxia} icon={Gamepad2}><SnaxiaApp /></Window>
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
