'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { usePrefsStore } from '../../../store/prefs';
import { AppId } from '../../../lib/constants';
import { DockItem } from './DockItem';
import { StartLogo } from './StartLogo';

interface DockProps {
  onToggleStart: () => void;
  onToggleSearch: () => void;
}

export const Dock: React.FC<DockProps> = ({ onToggleStart, onToggleSearch }) => {
  const windows = useWindowsStore((s) => s.windows);
  const activeId = useWindowsStore((s) => s.activeId);
  const openWindow = useWindowsStore((s) => s.openWindow);
  const focusWindow = useWindowsStore((s) => s.focusWindow);
  const minimizeWindow = useWindowsStore((s) => s.minimizeWindow);
  const dockAutoHide = usePrefsStore((s) => s.dockAutoHide);

  const [isNearBottom, setIsNearBottom] = useState(false);
  const hasMaximized = Object.values(windows).some((w) => w.isOpen && !w.isMinimized && w.isMaximized);
  const shouldHide = dockAutoHide && hasMaximized && !isNearBottom;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerHeight - e.clientY < 32) {
        setIsNearBottom(true);
      } else if (window.innerHeight - e.clientY > 90) {
        setIsNearBottom(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-[900] transition-transform duration-300 ease-out ${
        shouldHide ? 'translate-y-[120%]' : 'translate-y-0'
      }`}
    >
      <div className="glass-dock flex items-center gap-1 px-3 py-1.5 h-16 max-w-[92vw]">
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

        <div className="w-[1px] h-7 bg-white/10 mx-1" />

        {/* Content Apps */}
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

        <div className="w-[1px] h-7 bg-white/10 mx-1" />

        {/* Action Apps */}
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

        <div className="w-[1px] h-7 bg-white/10 mx-1" />

        {/* Settings */}
        <DockItem
          id="settings"
          label="Settings"
          icon={Settings}
          isOpen={windows.settings.isOpen}
          isActive={activeId === 'settings' && !windows.settings.isMinimized}
          onClick={() => handleAppClick('settings')}
        />
      </div>
    </div>
  );
};
