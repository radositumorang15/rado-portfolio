'use client';

import React from 'react';
import {
  Search,
  User,
  Briefcase,
  LayoutGrid,
  Cpu,
  Terminal,
  FileText,
  Mail,
  Settings,
  CloudSun,
  Layers,
} from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { AppId } from '../../../lib/constants';
import { DockItem } from './DockItem';
import { StartLogo } from './StartLogo';
import { TrayPill } from './TrayPill';

interface DockProps {
  onToggleStart: () => void;
  onToggleSearch: () => void;
  onToggleWidgets?: () => void;
}

export const Dock: React.FC<DockProps> = ({
  onToggleStart,
  onToggleSearch,
  onToggleWidgets,
}) => {
  const windows = useWindowsStore((s) => s.windows);
  const activeId = useWindowsStore((s) => s.activeId);
  const openWindow = useWindowsStore((s) => s.openWindow);
  const focusWindow = useWindowsStore((s) => s.focusWindow);
  const minimizeWindow = useWindowsStore((s) => s.minimizeWindow);

  const handleAppClick = (id: AppId) => {
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      focusWindow(id);
    } else if (activeId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-[#1c1c1c]/85 backdrop-blur-2xl border-t border-white/10 z-[1000] flex items-center justify-between px-3 select-none text-white shadow-2xl">
      {/* Left: Weather Widget */}
      <div className="flex items-center min-w-[140px]">
        <button
          onClick={onToggleWidgets}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors group"
          title="Widgets & Weather"
        >
          <CloudSun size={18} className="text-amber-400 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col text-left leading-none">
            <span className="text-[11px] font-semibold text-white/95">29°C</span>
            <span className="text-[10px] text-white/60">Partly sunny</span>
          </div>
        </button>
      </div>

      {/* Center: Windows 11 Centered Taskbar Group */}
      <div className="flex items-center gap-1">
        {/* Start Button */}
        <DockItem
          id="start"
          label="Start Menu"
          icon={StartLogo}
          onClick={onToggleStart}
        />

        {/* Search */}
        <DockItem
          id="search"
          label="Search (Ctrl+K)"
          icon={Search}
          onClick={onToggleSearch}
        />

        {/* Task View */}
        <DockItem
          id="widgets"
          label="Task View / Widgets"
          icon={Layers}
          onClick={onToggleWidgets || onToggleSearch}
        />

        <div className="w-[1px] h-5 bg-white/15 mx-1" />

        {/* Pinned & Open Content Apps */}
        <DockItem
          id="about"
          label="About Me"
          icon={User}
          isOpen={windows.about.isOpen}
          isActive={activeId === 'about' && !windows.about.isMinimized}
          onClick={() => handleAppClick('about')}
        />
        <DockItem
          id="experience"
          label="Experience"
          icon={Briefcase}
          isOpen={windows.experience.isOpen}
          isActive={activeId === 'experience' && !windows.experience.isMinimized}
          onClick={() => handleAppClick('experience')}
        />
        <DockItem
          id="projects"
          label="Projects"
          icon={LayoutGrid}
          isOpen={windows.projects.isOpen}
          isActive={activeId === 'projects' && !windows.projects.isMinimized}
          onClick={() => handleAppClick('projects')}
        />
        <DockItem
          id="skills"
          label="Skills"
          icon={Cpu}
          isOpen={windows.skills.isOpen}
          isActive={activeId === 'skills' && !windows.skills.isMinimized}
          onClick={() => handleAppClick('skills')}
        />
        <DockItem
          id="terminal"
          label="Terminal"
          icon={Terminal}
          isOpen={windows.terminal.isOpen}
          isActive={activeId === 'terminal' && !windows.terminal.isMinimized}
          onClick={() => handleAppClick('terminal')}
        />

        <div className="w-[1px] h-5 bg-white/15 mx-1" />

        <DockItem
          id="resume"
          label="Resume (CV)"
          icon={FileText}
          isOpen={windows.resume.isOpen}
          isActive={activeId === 'resume' && !windows.resume.isMinimized}
          onClick={() => handleAppClick('resume')}
        />
        <DockItem
          id="contact"
          label="Contact"
          icon={Mail}
          isOpen={windows.contact.isOpen}
          isActive={activeId === 'contact' && !windows.contact.isMinimized}
          onClick={() => handleAppClick('contact')}
        />
        <DockItem
          id="settings"
          label="Settings"
          icon={Settings}
          isOpen={windows.settings.isOpen}
          isActive={activeId === 'settings' && !windows.settings.isMinimized}
          onClick={() => handleAppClick('settings')}
        />
      </div>

      {/* Right: Windows 11 System Tray */}
      <div className="flex items-center justify-end min-w-[140px] h-full">
        <TrayPill />
      </div>
    </footer>
  );
};
