'use client';

import React from 'react';
import { PlayApp } from './types';
import { AppRow, T } from './playUi';

interface PlayStoreTopChartsTabProps {
  charts: PlayApp[];
  installed: Record<string, boolean>;
  onSelectApp: (app: PlayApp) => void;
}

export const PlayStoreTopChartsTab: React.FC<PlayStoreTopChartsTabProps> = ({
  charts,
  installed,
  onSelectApp,
}) => {
  return (
    <div className="px-4 py-4 flex flex-col gap-4 animate-in fade-in duration-200">
      <div className="flex gap-2">
        {['Top free', 'Trending'].map((c, i) => (
          <span
            key={c}
            className={`px-3.5 h-8 inline-flex items-center rounded-lg text-[13px] font-medium ${
              i === 0 ? T.cardHi : `${T.sub} border ${T.line}`
            }`}
          >
            {c}
          </span>
        ))}
      </div>
      {charts.map((app, i) => (
        <div key={app.id} className="flex items-center gap-3">
          <span className={`w-5 text-[14px] text-center shrink-0 ${T.sub}`}>{i + 1}</span>
          <div className="flex-1 min-w-0">
            <AppRow
              app={app}
              installed={installed[app.id]}
              onClick={() => onSelectApp(app)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

