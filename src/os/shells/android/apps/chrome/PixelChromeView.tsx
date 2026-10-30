'use client';

import React, { useState, useRef } from 'react';
import { CHROME_TABS } from './data';
import { ChromeTab } from './types';
import { ChromeUrlBar } from './ChromeUrlBar';
import { ChromeTabCard } from './ChromeTabCard';
import { ChromeWebPage } from './ChromeWebPage';
import { usePrefsStore } from '@/src/store/prefs';
import { notch } from '@/src/os/notch';
import { Plus, RotateCcw } from 'lucide-react';

interface PixelChromeViewProps {
  onExit?: () => void;
}

export const PixelChromeView: React.FC<PixelChromeViewProps> = ({ onExit }) => {
  const language = usePrefsStore((s) => s.language);
  const [tabs, setTabs] = useState<ChromeTab[]>(CHROME_TABS);
  const [activeTabId, setActiveTabId] = useState<string>(CHROME_TABS[0]?.id || '');
  const [viewMode, setViewMode] = useState<'grid' | 'page'>('grid');
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const animateFlipIn = (rect: DOMRect) => {
    const container = containerRef.current;
    const sheet = sheetRef.current;
    if (!container || !sheet) return;

    const d = container.getBoundingClientRect();
    sheet.style.transition = 'none';
    sheet.style.transformOrigin = '0 0';
    sheet.style.transform = `translate(${rect.left - d.left}px, ${rect.top - d.top}px) scale(${rect.width / d.width}, ${rect.height / d.height})`;
    sheet.style.borderRadius = '24px';
    sheet.style.opacity = '0.3';

    // Force reflow
    void sheet.getBoundingClientRect();

    requestAnimationFrame(() => {
      sheet.style.transition = 'transform 0.38s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.38s, opacity 0.25s';
      sheet.style.transform = 'none';
      sheet.style.borderRadius = '0px';
      sheet.style.opacity = '1';
    });
  };

  const animateFlipOut = (onComplete: () => void) => {
    const container = containerRef.current;
    const sheet = sheetRef.current;
    if (!container || !sheet) {
      onComplete();
      return;
    }

    const card = container.querySelector(`[data-tab-card="${activeTabId}"]`);
    const d = container.getBoundingClientRect();
    const r = card ? card.getBoundingClientRect() : null;

    setIsAnimating(true);
    sheet.style.transformOrigin = '0 0';
    sheet.style.transition = 'transform 0.34s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.34s, opacity 0.25s';
    sheet.style.transform = r
      ? `translate(${r.left - d.left}px, ${r.top - d.top}px) scale(${r.width / d.width}, ${r.height / d.height})`
      : 'translateY(60px)';
    sheet.style.borderRadius = '24px';
    sheet.style.opacity = '0';

    setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 340);
  };

  const handleSelectTab = (tab: ChromeTab, e: React.MouseEvent<HTMLDivElement>) => {
    setActiveTabId(tab.id);
    setViewMode('page');
    const rect = e.currentTarget.getBoundingClientRect();
    setTimeout(() => animateFlipIn(rect), 10);
  };

  const handleCloseTab = (id: string) => {
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id && remaining.length > 0) {
      setActiveTabId(remaining[0].id);
    }
  };

  const handleResetTabs = () => {
    setTabs(CHROME_TABS);
    setActiveTabId(CHROME_TABS[0]?.id || '');
    notch.show({
      title: 'Tabs Restored',
      subtitle: 'Restored default portfolio tabs',
      icon: 'public',
    });
  };

  const handleToggleView = () => {
    if (viewMode === 'page') {
      animateFlipOut(() => setViewMode('grid'));
    } else {
      if (tabs.length === 0) {
        handleResetTabs();
        return;
      }
      setViewMode('page');
    }
  };

  const handleLaunchLink = (url: string, title: string) => {
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
      notch.show({
        title,
        subtitle: language === 'id' ? 'Membuka tautan...' : 'Opening link...',
        icon: 'public',
      });
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col bg-[#121316] text-white overflow-hidden select-none"
    >
      {/* 1. Chrome Omnibox / Top Bar */}
      <ChromeUrlBar
        displayUrl={viewMode === 'page' && activeTab ? activeTab.displayUrl : 'chrome://tabs'}
        tabCount={tabs.length}
        isGridView={viewMode === 'grid'}
        onToggleView={handleToggleView}
        onRefresh={() => notch.show({ title: 'Chrome', subtitle: 'Reloaded page' })}
        onNewTab={tabs.length < CHROME_TABS.length ? handleResetTabs : undefined}
        onBackToGrid={() => handleToggleView()}
        onExit={onExit}
      />

      {/* 2. Tab Switcher Grid View (Always in DOM for background & FLIP origins) */}
      <div className="flex-1 overflow-y-auto p-3.5 pb-16">
        <div className="flex items-center justify-between pb-3 px-1">
          <span className="text-xs font-semibold text-white/60 tracking-wider uppercase">
            {language === 'id' ? 'Tab Terbuka' : 'Open Tabs'} ({tabs.length})
          </span>
          {tabs.length < CHROME_TABS.length && (
            <button
              onClick={handleResetTabs}
              className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>{language === 'id' ? 'Pulihkan Tab' : 'Restore Tabs'}</span>
            </button>
          )}
        </div>

        {tabs.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3 text-center p-6">
            <p className="text-sm text-white/60">No tabs open</p>
            <button
              onClick={handleResetTabs}
              className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 transition-all"
            >
              <Plus size={14} />
              <span>Restore Tabs</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {tabs.map((tab) => (
              <ChromeTabCard
                key={tab.id}
                tab={tab}
                isActive={tab.id === activeTabId}
                onSelect={(e) => handleSelectTab(tab, e)}
                onClose={() => handleCloseTab(tab.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3. FLIP Expanding / Collapsing Full Page Sheet */}
      {(viewMode === 'page' || isAnimating) && activeTab && (
        <div
          ref={sheetRef}
          className="absolute inset-0 top-14 z-30 flex flex-col bg-[#121316] overflow-hidden shadow-2xl"
        >
          <ChromeWebPage
            tab={activeTab}
            lang={language}
            onBack={() => handleToggleView()}
            onLaunchLink={handleLaunchLink}
          />
        </div>
      )}
    </div>
  );
};
