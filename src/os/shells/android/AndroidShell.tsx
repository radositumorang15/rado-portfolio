'use client';

import React, { useState } from 'react';
import { Monitor } from 'lucide-react';
import { StatusBar } from './StatusBar';
import { Home } from './Home';
import { AppScaffold } from './AppScaffold';
import { QuickShade } from './QuickShade';
import { Recents } from './Recents';
import { Palette } from '../windows/Palette';
import { useWindowsStore } from '../../../store/windows';
import { usePrefsStore } from '../../../store/prefs';
import { AppId } from '../../../lib/constants';

import { AboutApp } from '../../../apps/about';
import { ExperienceApp } from '../../../apps/experience';
import { ProjectsApp } from '../../../apps/projects';
import { SkillsApp } from '../../../apps/skills';
import { TerminalApp } from '../../../apps/terminal';
import { ResumeApp } from '../../../apps/resume';
import { ContactApp } from '../../../apps/contact';
import { SettingsApp } from '../../../apps/settings';

const APP_TITLES: Record<AppId, string> = {
  about: 'About Me',
  experience: 'Work Experience',
  projects: 'Projects Showcase',
  skills: 'Technical Skills',
  terminal: 'Terminal',
  resume: 'Curriculum Vitae',
  contact: 'Contact Rado',
  settings: 'Settings',
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
      case 'about': return <AboutApp />;
      case 'experience': return <ExperienceApp />;
      case 'projects': return <ProjectsApp />;
      case 'skills': return <SkillsApp />;
      case 'terminal': return <TerminalApp />;
      case 'resume': return <ResumeApp />;
      case 'contact': return <ContactApp />;
      case 'settings': return <SettingsApp />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0a0f] flex flex-col items-center justify-center select-none text-white">
      {/* Ambient Material You Wallpaper Backdrop */}
      <div className="absolute inset-0 bg-radial from-blue-900/30 via-neutral-950/80 to-black z-0 pointer-events-none" />

      {/* Top Banner on Large Desktop Screens */}
      <header className="hidden md:flex items-center justify-between w-full max-w-4xl px-6 py-2.5 z-10 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-white/90">Android 17 Material 3 Shell</span>
          <span className="text-white/40">| Mobile Emulation</span>
        </div>
        <button
          onClick={() => setShell('windows')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 font-medium transition-colors shadow-sm"
        >
          <Monitor size={14} />
          <span>Switch to Windows 11</span>
        </button>
      </header>

      {/* Phone Mockup Frame (Desktop) / Native Viewport (Mobile) */}
      <main className="relative z-10 w-full h-full md:w-[390px] md:h-[820px] md:max-h-[92vh] md:rounded-[46px] md:border-[7px] md:border-neutral-800 md:shadow-[0_25px_80px_rgba(0,0,0,0.9)] md:ring-1 md:ring-white/10 bg-neutral-950 flex flex-col overflow-hidden">
        {/* Android Status Bar */}
        <StatusBar onPullDownShade={() => setIsShadeOpen(true)} />

        {/* Main Android Home Launcher */}
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
