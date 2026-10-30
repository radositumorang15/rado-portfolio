'use client';

import React, { useState } from 'react';
import { ChromeTab } from './types';
import { ChromeWebPage } from './ChromeWebPage';

interface ChromeSheetProps {
  sheetRef: React.Ref<HTMLDivElement>;
  tab: ChromeTab;
  tabCount: number;
  onClosePage: () => void;
  onSelectTile: (id: string) => void;
  onToast: (msg: string) => void;
}

export const ChromeSheet: React.FC<ChromeSheetProps> = ({
  sheetRef,
  tab,
  tabCount,
  onClosePage,
  onSelectTile,
  onToast,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleShare = async () => {
    setIsMenuOpen(false);
    const url = tab.liveUrl || tab.githubUrl || window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: tab.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        onToast('Copied link to clipboard');
      }
    } catch {
      // ignore
    }
  };

  const handleVisit = () => {
    setIsMenuOpen(false);
    const url = tab.liveUrl || tab.githubUrl;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      onToast('Sample concept website');
    }
  };

  const handleGithub = () => {
    setIsMenuOpen(false);
    if (tab.githubUrl) {
      window.open(tab.githubUrl, '_blank', 'noopener,noreferrer');
    } else {
      onToast('GitHub repository not linked');
    }
  };

  return (
    <div ref={sheetRef} className="chrome-sheet">
      <div className="chrome-tbar">
        <div className="chrome-url">
          <span aria-hidden="true" style={{ fontSize: 14 }}>
            {tab.ntp ? '🔍' : '🔒'}
          </span>
          <span>{tab.url}</span>
        </div>

        <button
          type="button"
          className="chrome-ib"
          aria-label="Tabs"
          title="Back to Tabs"
          onClick={onClosePage}
        >
          <span className="chrome-cnt">{tabCount}</span>
        </button>

        <button
          type="button"
          className="chrome-ib"
          aria-label="Menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          ⋮
        </button>
      </div>

      {isMenuOpen && (
        <div className="chrome-menu">
          <button type="button" onClick={handleVisit}>
            Visit site ↗
          </button>
          <button type="button" onClick={handleShare}>
            Share
          </button>
          <button type="button" onClick={handleGithub}>
            View source on GitHub
          </button>
        </div>
      )}

      <div className="chrome-pgs">
        <ChromeWebPage
          tab={tab}
          onSelectTile={onSelectTile}
          onCtaClick={handleVisit}
        />
      </div>
    </div>
  );
};
