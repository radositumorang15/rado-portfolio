'use client';

import React from 'react';
import { PlayApp } from './types';
import { AppRow, T } from './playUi';
import { Check } from 'lucide-react';

interface PlayStoreSearchResultsProps {
  query: string;
  filter: 'Kotlin' | 'Flutter' | null;
  langs: string[];
  results: PlayApp[];
  installed: Record<string, boolean>;
  onFilterChange: (lang: 'Kotlin' | 'Flutter' | null) => void;
  onSelectApp: (app: PlayApp) => void;
}

export const PlayStoreSearchResults: React.FC<PlayStoreSearchResultsProps> = ({
  query,
  filter,
  langs,
  results,
  installed,
  onFilterChange,
  onSelectApp,
}) => {
  return (
    <div className="pb-6">
      <div className="flex items-center gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
        <span className={`px-3.5 h-8 inline-flex items-center rounded-lg text-[13px] font-medium shrink-0 ${T.cardHi}`}>
          Apps
        </span>
        {langs.map((l) => {
          const on = filter === l;
          return (
            <button
              key={l}
              onClick={() => onFilterChange(on ? null : (l as 'Kotlin' | 'Flutter'))}
              className={`pl-2.5 pr-3.5 h-8 inline-flex items-center gap-1.5 rounded-lg text-[13px] font-medium shrink-0 border cursor-pointer transition-colors ${
                on ? `${T.cardHi} border-transparent` : `${T.line} ${T.sub}`
              }`}
            >
              {on && <Check size={14} />}
              {l}
            </button>
          );
        })}
      </div>
      <div className="px-4 flex flex-col gap-4">
        {results.length === 0 ? (
          <p className={`text-[13px] text-center py-10 m-0 ${T.sub}`}>No results for “{query}”</p>
        ) : (
          results.map((app) => (
            <AppRow
              key={app.id}
              app={app}
              installed={installed[app.id]}
              onClick={() => onSelectApp(app)}
            />
          ))
        )}
      </div>
    </div>
  );
};

