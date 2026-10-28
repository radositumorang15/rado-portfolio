'use client';

import React, { useState } from 'react';
import { StatusBar } from './StatusBar';
import { Home } from './Home';
import { AppScaffold } from './AppScaffold';
import { QuickShade } from './QuickShade';
import { Palette } from '../windows/Palette';
import { useWindowsStore } from '../../../store/windows';
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

  const [isShadeOpen, setIsShadeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <div className="relative w-screen h-screen overflow-hidden bg-neutral-950 flex flex-col select-none">
      {/* Dynamic Wallpaper background */}
      <div className="absolute inset-0 bg-radial from-blue-950/50 via-neutral-900 to-neutral-950 z-0 pointer-events-none" />

      {/* Android Status Bar with Notch */}
      <StatusBar onPullDownShade={() => setIsShadeOpen(true)} />

      {/* Main Home Screen */}
      <Home
        onOpenApp={(id) => openWindow(id)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Active App View in Stack */}
      {activeId && (
        <AppScaffold
          appId={activeId}
          title={APP_TITLES[activeId]}
          onBack={() => closeWindow(activeId)}
        >
          {renderAppContent(activeId)}
        </AppScaffold>
      )}

      {/* Quick Settings Notification Shade */}
      <QuickShade
        isOpen={isShadeOpen}
        onClose={() => setIsShadeOpen(false)}
      />

      {/* Search Palette */}
      <Palette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
