'use client';

import React from 'react';
import { SwitcherMode } from './types';

interface ChromeSwitcherHeaderProps {
  tabCount: number;
  mode: SwitcherMode;
  onToggleMode: () => void;
  onExit?: () => void;
}

export const ChromeSwitcherHeader: React.FC<ChromeSwitcherHeaderProps> = ({
  tabCount,
  mode,
  onToggleMode,
  onExit,
}) => {
  return (
    <div className="chrome-sh">
      <h1>
        Projects
        <small>{tabCount} tab{tabCount !== 1 ? 's' : ''}</small>
      </h1>
      {onExit && (
        <button
          type="button"
          className="chrome-ib"
          aria-label="Exit to Home"
          title="Exit to Home"
          onClick={onExit}
        >
          ⌂
        </button>
      )}
      <button
        type="button"
        className={`chrome-ib ${mode === 'stack' ? 'on' : ''}`}
        aria-label="Toggle 3D stack"
        title="Grid / 3D stack"
        onClick={onToggleMode}
      >
        {mode === 'grid' ? '⊞' : '☰'}
      </button>
    </div>
  );
};
