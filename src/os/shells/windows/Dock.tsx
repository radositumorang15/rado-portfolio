'use client';

import React from 'react';
import { CloudSun } from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { AppId } from '../../../lib/constants';
import { DockItem } from './DockItem';
import { TrayPill } from './TrayPill';
import { profileData } from '../../../data/profile';
import { notch } from '../../notch';
import { playWindowsSound } from '../../../lib/audio';

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

  const handleOpenLink = (url: string, title: string) => {
    playWindowsSound('click');
    notch.show({
      title: `Opening ${title}`,
      subtitle: url,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAntigravityClick = () => {
    playWindowsSound('click');
    notch.show({
      title: 'Antigravity IDE 2.0',
      subtitle: 'Google Deepmind Agentic Workspace Active',
    });
    if (!windows.terminal.isOpen) {
      openWindow('terminal');
    } else {
      focusWindow('terminal');
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-[#1c1c1c]/85 backdrop-blur-2xl border-t border-white/10 z-[1000] flex items-center justify-between px-3 select-none text-white shadow-2xl">
      {/* Left: Weather Widget */}
      <div className="flex items-center min-w-[140px]">
        <button
          onClick={onToggleWidgets}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-white/10 text-white/80 hover:text-white transition-colors group cursor-pointer"
          title="Widgets & Weather"
        >
          <CloudSun size={18} className="text-amber-400 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col text-left leading-none">
            <span className="text-[11px] font-semibold text-white/95">29°C</span>
            <span className="text-[10px] text-white/60">Partly sunny</span>
          </div>
        </button>
      </div>

      {/* Center: Windows 11 Taskbar Group (Arrangement and Real 3D Icons from floatdock) */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
        {/* 1. START & SEARCH */}
        <DockItem
          id="start"
          label="Start Menu"
          iconSrc="/icons/win11/home.png"
          onClick={onToggleStart}
        />

        <div
          onClick={onToggleSearch}
          className="flex items-center gap-2 h-8 px-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 cursor-pointer text-xs text-white/70 transition-all select-none group"
          title="Search (Ctrl+K)"
        >
          <img src="/icons/win11/search.png" alt="Search" className="w-4 h-4 object-contain" />
          <span className="hidden xl:inline text-[11px] text-white/60">Search</span>
        </div>

        <div className="w-[1px] h-5 bg-white/15 mx-0.5 shrink-0" />

        {/* 2. SYSTEM & PORTFOLIO APPS */}
        <DockItem
          id="projects"
          label="File Explorer (Projects)"
          iconSrc="/icons/win11/explorer.png"
          isOpen={windows.projects.isOpen}
          isActive={activeId === 'projects' && !windows.projects.isMinimized}
          onClick={() => handleAppClick('projects')}
        />

        <DockItem
          id="about"
          label="This PC (About)"
          iconSrc="/icons/win11/thispc.png"
          isOpen={windows.about.isOpen}
          isActive={activeId === 'about' && !windows.about.isMinimized}
          onClick={() => handleAppClick('about')}
        />

        <DockItem
          id="terminal"
          label="Windows Terminal"
          iconSrc="/icons/win11/terminal.png"
          isOpen={windows.terminal.isOpen}
          isActive={activeId === 'terminal' && !windows.terminal.isMinimized}
          onClick={() => handleAppClick('terminal')}
        />

        <DockItem
          id="skills"
          label="Skills & Stack"
          iconSrc="/icons/win11/skills.svg"
          isOpen={windows.skills.isOpen}
          isActive={activeId === 'skills' && !windows.skills.isMinimized}
          onClick={() => handleAppClick('skills')}
        />

        <div className="w-[1px] h-5 bg-white/15 mx-0.5 shrink-0" />

        {/* 3. DEVELOPER TOOLS: REAL 3D ICONS (FIGMA, CHROME, ANTIGRAVITY, VSCODE, GITHUB) */}
        <DockItem
          id="figma"
          label="Figma"
          iconSrc="/icons/win11/figma.png"
          onClick={() => handleOpenLink('https://www.figma.com', 'Figma Design')}
        />

        <DockItem
          id="chrome"
          label="Google Chrome"
          iconSrc="/icons/win11/chrome.png"
          onClick={() => handleOpenLink('https://www.google.com', 'Google Chrome')}
        />

        <DockItem
          id="antigravity"
          label="Antigravity IDE 2.0"
          iconSrc="/icons/win11/antigravity.png"
          onClick={handleAntigravityClick}
        />

        <DockItem
          id="vscode"
          label="Visual Studio Code"
          iconSrc="/icons/win11/vscode.png"
          onClick={() => handleOpenLink('https://github.dev/radositumorang15/rado-portfolio', 'VS Code Web')}
        />

        <DockItem
          id="github"
          label="GitHub / radositumorang15"
          iconSrc="/icons/win11/github.png"
          onClick={() => handleOpenLink(profileData.github, 'GitHub Desktop')}
        />

        <div className="w-[1px] h-5 bg-white/15 mx-0.5 shrink-0" />

        {/* 4. CONNECTIVITY & SETTINGS */}
        <DockItem
          id="experience"
          label="Experience & Career"
          iconSrc="/icons/win11/folder.png"
          isOpen={windows.experience.isOpen}
          isActive={activeId === 'experience' && !windows.experience.isMinimized}
          onClick={() => handleAppClick('experience')}
        />

        <DockItem
          id="linkedin"
          label="LinkedIn / radositumorang"
          iconSrc="/icons/win11/linkedin.svg"
          onClick={() => handleOpenLink(profileData.linkedin, 'LinkedIn')}
        />

        <DockItem
          id="contact"
          label="Mail / Contact"
          iconSrc="/icons/win11/mail.png"
          isOpen={windows.contact.isOpen}
          isActive={activeId === 'contact' && !windows.contact.isMinimized}
          onClick={() => handleAppClick('contact')}
        />

        <DockItem
          id="settings"
          label="Settings"
          iconSrc="/icons/win11/settings.png"
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
