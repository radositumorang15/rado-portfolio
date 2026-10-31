'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Monitor } from 'lucide-react';
import { StatusBar } from './StatusBar';
import { Home } from './Home';
import { AppScaffold } from './AppScaffold';
import { QuickShade } from './QuickShade';
import { Recents } from './Recents';
import { PixelWallpaper } from './PixelWallpaper';
import { AndroidLockScreen } from './AndroidLockScreen';
import { Palette } from '../windows/Palette';
import { useWindowsStore } from '../../../store/windows';
import { usePrefsStore } from '../../../store/prefs';
import { AppId } from '../../../lib/constants';
import { usePixelGestures } from './usePixelGestures';
import './pixelAnimate.css';

import {
  PixelAboutView,
  PixelSkillsView,
  PixelProjectsView,
  PixelExperienceView,
  PixelContactView,
  PixelResumeView,
  PixelSettingsView,
  PixelPlayStoreView,
  PixelChromeView,
} from './apps';
import { TerminalApp } from '../../../apps/terminal';
import { TaskManagerApp } from '../../../apps/taskmanager';

const APP_TITLES: Record<AppId, string> = {
  about: 'About Device',
  experience: 'Work Experience',
  projects: 'Chrome',
  skills: 'Skills & Tech',
  terminal: 'Linux Terminal',
  resume: 'Curriculum Vitae',
  contact: 'Contact & Messages',
  settings: 'Wallpaper & Style',
  taskmanager: 'System Activity',
  androidstudio: 'Google Play',
};

export const AndroidShell: React.FC = () => {
  const activeId = useWindowsStore((s) => s.activeId);
  const openWindow = useWindowsStore((s) => s.openWindow);
  const closeWindow = useWindowsStore((s) => s.closeWindow);
  const setShell = usePrefsStore((s) => s.setShell);
  const reduceMotion = usePrefsStore((s) => s.reduceMotion);
  const language = usePrefsStore((s) => s.language);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isShadeOpen, setIsShadeOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRecentsOpen, setIsRecentsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [isTorch, setIsTorch] = useState(false);
  const [isWifi, setIsWifi] = useState(true);
  const [isBt, setIsBt] = useState(true);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  // Pixel Navigation & Edge Gestures Hook
  const { gestureTransform } = usePixelGestures({
    containerRef,
    hasActiveApp: Boolean(activeId),
    isShadeOpen,
    onGoHome: () => {
      if (activeId) closeWindow(activeId);
    },
    onOpenRecents: () => setIsRecentsOpen(true),
    onOpenShade: () => setIsShadeOpen(true),
    onCloseShade: () => setIsShadeOpen(false),
  });

  const handleOpenApp = (id: AppId, rect?: DOMRect) => {
    setOriginRect(rect || null);
    openWindow(id);
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setShowCoach(true);
    setTimeout(() => setShowCoach(false), 4200);
  };

  // Di Pixel Launcher, jangan otomatis buka aplikasi saat pertama kali dibuka (cukup di Windows saja)
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      const cur = useWindowsStore.getState().activeId;
      if (cur) closeWindow(cur);
    }
  }, [closeWindow]);

  // Keyboard shortcut: Escape to close shade/recents/app
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isShadeOpen) setIsShadeOpen(false);
        else if (isRecentsOpen) setIsRecentsOpen(false);
        else if (activeId) closeWindow(activeId);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isShadeOpen, isRecentsOpen, activeId, closeWindow]);

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'about': return <PixelAboutView />;
      case 'experience': return <PixelExperienceView />;
      case 'projects': return <PixelChromeView onExit={() => closeWindow('projects')} />;
      case 'skills': return <PixelSkillsView />;
      case 'terminal': return <TerminalApp />;
      case 'resume': return <PixelResumeView />;
      case 'contact': return <PixelContactView />;
      case 'settings': return <PixelSettingsView />;
      case 'taskmanager': return <TaskManagerApp />;
      case 'androidstudio': return <PixelPlayStoreView />;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#070b10] flex flex-col items-center justify-center select-none text-[var(--m3-on-surface)]">
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

      {/* Phone Mockup Frame / Viewport */}
      <main
        ref={containerRef}
        data-pixel-device="true"
        style={{ filter: `brightness(${brightness})` }}
        className="relative z-10 w-full h-full md:w-[390px] md:h-[820px] md:max-h-[92vh] md:rounded-[46px] md:border-[7px] md:border-neutral-800 md:shadow-[0_25px_80px_rgba(0,0,0,0.9)] md:ring-1 md:ring-white/10 flex flex-col overflow-hidden bg-transparent"
      >
        <PixelWallpaper reducedMotion={reduceMotion} />
        <StatusBar onPullDownShade={() => setIsShadeOpen(true)} />

        <Home
          onOpenApp={handleOpenApp}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenRecents={() => setIsRecentsOpen(true)}
        />

        {activeId && (
          <AppScaffold
            appId={activeId}
            title={APP_TITLES[activeId]}
            hideHeader={activeId === 'projects'}
            originRect={originRect}
            gestureTransform={gestureTransform}
            onBack={() => closeWindow(activeId)}
          >
            {renderAppContent(activeId)}
          </AppScaffold>
        )}

        {isTorch && <div className="pixel-torch" />}

        {showCoach && (
          <div className="pixel-coach">
            {language === 'id'
              ? 'Geser ke atas dari bar untuk ke beranda. Tahan untuk Recents.'
              : 'Swipe up from the bar to go home. Hold longer for Recents.'}
          </div>
        )}

        {isLocked && <AndroidLockScreen onUnlock={handleUnlock} />}

        <Recents isOpen={isRecentsOpen} onClose={() => setIsRecentsOpen(false)} />

        <QuickShade
          isOpen={isShadeOpen}
          onClose={() => setIsShadeOpen(false)}
          onLockDevice={() => setIsLocked(true)}
          brightness={brightness}
          onBrightnessChange={setBrightness}
          isWifi={isWifi}
          onToggleWifi={() => setIsWifi(!isWifi)}
          isBt={isBt}
          onToggleBt={() => setIsBt(!isBt)}
          isTorch={isTorch}
          onToggleTorch={() => setIsTorch(!isTorch)}
          onOpenApp={(id) => openWindow(id)}
        />

        <Palette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </main>
    </div>
  );
};
