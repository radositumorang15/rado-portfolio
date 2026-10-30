'use client';

import React from 'react';
import { ChromeTab } from './types';
import { ChromeWebPage } from './ChromeWebPage';

interface ChromeTabCardProps {
  tab: ChromeTab;
  scaleK: number;
  cardHeight: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClose: () => void;
}

export const ChromeTabCard: React.FC<ChromeTabCardProps> = ({
  tab,
  scaleK,
  cardHeight,
  onClick,
  onClose,
}) => {
  return (
    <div
      className="chrome-tc"
      data-tab-card={tab.id}
      tabIndex={0}
      onClick={onClick}
    >
      <div className="chrome-ch">
        <i
          className="chrome-fv"
          style={{ background: `hsl(${tab.hue} 65% 48%)` }}
        >
          {tab.l}
        </i>
        <b>{tab.title}</b>
        <button
          type="button"
          aria-label="Close tab"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ✕
        </button>
      </div>

      <div className="chrome-cb" style={{ height: cardHeight }}>
        <div
          className="chrome-th"
          style={{
            transform: `scale(${scaleK})`,
          }}
        >
          <ChromeWebPage tab={tab} isThumbnail={true} />
        </div>
      </div>
    </div>
  );
};
