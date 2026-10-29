'use client';

import React, { useState } from 'react';
import { Monitor } from 'lucide-react';
import { StatusBar } from './StatusBar';
import { Home } from './Home';
import { AppScaffold } from './AppScaffold';
import { QuickShade } from './QuickShade';
import { Recents } from './Recents';
import { PixelWallpaper } from './PixelWallpaper';
import { Palette } from '../windows/Palette';
import { useWindowsStore } from '../../../store/windows';
import { usePrefsStore } from '../../../store/prefs';
import { AppId } from '../../../lib/constants';

import {
  PixelAboutView,
  PixelSkillsView,
  PixelProjectsView,
  PixelExperienceView,
  PixelContactView,
  PixelResumeView,
  PixelSettingsView,
} from './apps';
import { TerminalApp } from '../../../apps/terminal';
import { TaskManagerApp } from '../../../apps/taskmanager';

const APP_TITLES: Record<AppId, string> = {
  about: 'About Device',
  experience: 'Work Experience',
  projects: 'Files & Projects',
  skills: 'Skills & Tech',
  terminal: 'Linux Terminal',
  resume: 'Curriculum Vitae',
  contact: 'Contact & Messages',
  settings: 'Wallpaper & Style',
  taskmanager: 'System Activity',
};

export const AndroidShell: React.FC = () => {
  const activeId = useWindowsStore((s) => s.activeId);
  const openWindow = useWindowsStore((s) => s.openWindow);
  const closeWindow = useWindowsStore((s) => s.closeWindow);
  const setShell = usePrefsStore((s) => s.setShell);

  const [isShadeOpen, setIsShadeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRecentsOpen, setIsRecentsOpen] = useState(false);

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'about': return <PixelAboutView />;
      case 'experience': return <PixelExperienceView />;
      case 'projects': return <PixelProjectsView />;
      case 'skills': return <PixelSkillsView />;
      case 'terminal': return <TerminalApp />;
      case 'resume': return <PixelResumeView />;
      case 'contact': return <PixelContactView />;
      case 'settings': return <PixelSettingsView />;
      case 'taskmanager': return <TaskManagerApp />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070b10] flex flex-col items-center justify-center select-none text-[var(--m3-on-surface)]">
      {/* Outer Desktop Canvas Backdrop */}
      <div className="absolute inset-0 bg-radial from-[#132034]/40 via-[#070b10] to-[#040608] z-0 pointer-events-none" />

      {/* Top Banner on Large Desktop Screens */}
      <header className="hidden md:flex items-center justify-between w-full max-w-4xl px-6 py-2 z-10 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#81C995] animate-pulse" />
          <span className="font-semibold text-white/95">Google Pixel Launcher</span>
          <span className="text-white/40">| Android 16 Material 3 Expressive</span>
        </div>
        <button
          onClick={() => setShell('windows')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 font-medium transition-colors shadow-sm cursor-pointer"
        >
          <Monitor size={14} />
          <span>Switch to Windows 11</span>
        </button>
      </header>

      {/* Phone Mockup Frame (Desktop) / Native Viewport (Mobile) */}
      <main className="relative z-10 w-full h-full md:w-[390px] md:h-[820px] md:max-h-[92vh] md:rounded-[46px] md:border-[7px] md:border-neutral-800 md:shadow-[0_25px_80px_rgba(0,0,0,0.9)] md:ring-1 md:ring-white/10 flex flex-col overflow-hidden bg-transparent">
        {/* Pixel Fluid Dynamic Wallpaper */}
        <PixelWallpaper />

        {/* Pixel Punch-Hole Status Bar */}
        <StatusBar onPullDownShade={() => setIsShadeOpen(true)} />

        {/* Pixel Home Screen */}
        <Home
          onOpenApp={(id) => openWindow(id)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenRecents={() => setIsRecentsOpen(true)}
        />

        {/* Active App Full-Screen Scaffold */}
        {activeId && (
          <AppScaffold
            appId={activeId}
            title={APP_TITLES[activeId]}
            onBack={() => closeWindow(activeId)}
          >
            {renderAppContent(activeId)}
          </AppScaffold>
        )}

        {/* Recents App Switcher Carousel */}
        <Recents
          isOpen={isRecentsOpen}
          onClose={() => setIsRecentsOpen(false)}
        />

        {/* Quick Settings Pull-down Shade */}
        <QuickShade
          isOpen={isShadeOpen}
          onClose={() => setIsShadeOpen(false)}
        />

        {/* Search Palette */}
        <Palette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </main>
    </div>
  );
};
