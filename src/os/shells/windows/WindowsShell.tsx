'use client';

import React, { useState } from 'react';
import {
  User,
  Briefcase,
  LayoutGrid,
  Cpu,
  Terminal as TermIcon,
  FileText,
  Mail,
  Settings as SettingsIcon,
  LucideIcon,
} from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { Window } from './Window';
import { Dock } from './Dock';
import { TrayPill } from './TrayPill';
import { StartMenu } from './StartMenu';
import { WidgetBoard } from './WidgetBoard';
import { Palette } from './Palette';
import { ContextMenu } from './ContextMenu';
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

const DESKTOP_ICONS: { id: AppId; label: string; icon: LucideIcon }[] = [
  { id: 'about', label: 'About Me', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export const WindowsShell: React.FC = () => {
  const windows = useWindowsStore((s) => s.windows);
  const openWindow = useWindowsStore((s) => s.openWindow);

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean }>({
    x: 0,
    y: 0,
    isOpen: false,
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, isOpen: true });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      className="relative w-screen h-screen overflow-hidden bg-[#18181b] select-none text-white"
    >
      {/* Dynamic Wallpaper background */}
      <div className="absolute inset-0 bg-radial from-blue-900/40 via-neutral-900/90 to-neutral-950 z-0 pointer-events-none" />

      {/* Rado Notch (Top Center) */}
      <NotchHost platform="windows" />

      {/* Desktop Icons */}
      <div className="absolute top-14 left-4 z-10 flex flex-col gap-4">
        {DESKTOP_ICONS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onDoubleClick={() => openWindow(item.id)}
              onClick={(e) => {
                // For touch or single click with timeout
                if (e.detail === 2) openWindow(item.id);
              }}
              className="flex flex-col items-center gap-1 w-20 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 border border-transparent hover:border-white/10 cursor-pointer text-center group transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shadow-sm group-hover:scale-105 transition-transform">
                <Icon size={24} />
              </div>
              <span className="text-[11px] font-medium text-white/90 drop-shadow-md truncate max-w-[76px]">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Floating Windows Area */}
      <div className="absolute inset-0 z-20 pointer-events-none [&>*]:pointer-events-auto">
        <Window win={windows.about} icon={User}>
          <AboutApp />
        </Window>

        <Window win={windows.experience} icon={Briefcase}>
          <ExperienceApp />
        </Window>

        <Window win={windows.projects} icon={LayoutGrid}>
          <ProjectsApp />
        </Window>

        <Window win={windows.skills} icon={Cpu}>
          <SkillsApp />
        </Window>

        <Window win={windows.terminal} icon={TermIcon}>
          <TerminalApp />
        </Window>

        <Window win={windows.resume} icon={FileText}>
          <ResumeApp />
        </Window>

        <Window win={windows.contact} icon={Mail}>
          <ContactApp />
        </Window>

        <Window win={windows.settings} icon={SettingsIcon}>
          <SettingsApp />
        </Window>
      </div>

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Command Palette */}
      <Palette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Widget Board */}
      <WidgetBoard
        isOpen={isWidgetsOpen}
        onClose={() => setIsWidgetsOpen(false)}
      />

      {/* Dock (Bottom Center) */}
      <Dock
        onToggleStart={() => setIsStartOpen((prev) => !prev)}
        onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
      />

      {/* Tray Pill (Bottom Right) */}
      <TrayPill />

      {/* Desktop Context Menu */}
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
