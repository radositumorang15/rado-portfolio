'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PlayApp } from './types';
import { AppIcon, T } from './playUi';
import { PlayStoreDetailHeader } from './PlayStoreDetailHeader';
import { PlayStoreDetailSections } from './PlayStoreDetailSections';
import { ArrowLeft, MoreVertical, Search } from 'lucide-react';

interface PlayStoreDetailViewProps {
  app: PlayApp;
  apps: PlayApp[];
  lang: 'en' | 'id';
  installed: boolean;
  onInstall: (app: PlayApp) => void;
  onUninstall: (app: PlayApp) => void;
  onBack: () => void;
  onSelectApp: (app: PlayApp) => void;
  onOpenApp: (app: PlayApp) => void;
  onLaunchLink: (url: string, title: string) => void;
}

export const PlayStoreDetailView: React.FC<PlayStoreDetailViewProps> = ({
  app,
  apps,
  lang,
  installed,
  onInstall,
  onUninstall,
  onBack,
  onSelectApp,
  onOpenApp,
  onLaunchLink,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [wish, setWish] = useState(false);
  const timer = useRef<number | null>(null);

  const stopTimer = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(() => stopTimer, []);

  // Selesai mengunduh -> tandai terpasang
  useEffect(() => {
    if (progress !== null && progress >= 100) {
      stopTimer();
      setProgress(null);
      onInstall(app);
    }
  }, [progress, app, onInstall]);

  const startInstall = () => {
    setProgress(0);
    timer.current = window.setInterval(
      () => setProgress((p) => Math.min(100, (p ?? 0) + 4 + Math.random() * 9)),
      160,
    );
  };

  const cancelInstall = () => {
    stopTimer();
    setProgress(null);
  };

  const share = async () => {
    const data = { title: app.name, text: app.tagline.en, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
    } catch {}
  };

  return (
    <div
      className={`flex-1 min-h-0 overflow-y-auto pb-16 font-sans scrollbar-none animate-in fade-in duration-200 ${T.text}`}
      onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 70)}
    >
      {/* Top app bar */}
      <div
        className={`sticky top-0 z-20 flex items-center h-14 px-1 transition-colors ${
          scrolled ? `${T.card} border-b ${T.line}` : 'bg-transparent'
        }`}
      >
        <button
          onClick={onBack}
          aria-label="Back"
          className="w-12 h-12 rounded-full flex items-center justify-center active:bg-white/10 cursor-pointer"
        >
          <ArrowLeft size={22} />
        </button>
        <div
          className={`flex-1 flex items-center gap-2 min-w-0 transition-opacity ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <AppIcon app={app} size={28} />
          <span className="text-[16px] font-medium truncate">{app.name}</span>
        </div>
        <button
          aria-label="Search"
          className={`w-12 h-12 rounded-full flex items-center justify-center ${T.sub}`}
        >
          <Search size={21} />
        </button>
        <button
          aria-label="More"
          className={`w-12 h-12 rounded-full flex items-center justify-center ${T.sub}`}
        >
          <MoreVertical size={21} />
        </button>
      </div>

      {/* Main Header & Install Button Area */}
      <PlayStoreDetailHeader
        app={app}
        installed={installed}
        progress={progress}
        wish={wish}
        onStartInstall={startInstall}
        onCancelInstall={cancelInstall}
        onUninstall={() => onUninstall(app)}
        onOpenApp={() => onOpenApp(app)}
        onToggleWish={() => setWish((v) => !v)}
        onShare={share}
      />

      {/* Detail Content Sections */}
      <PlayStoreDetailSections
        app={app}
        apps={apps}
        lang={lang}
        onOpenApp={onOpenApp}
        onSelectApp={onSelectApp}
        onLaunchLink={onLaunchLink}
      />
    </div>
  );
};
