'use client';

import React from 'react';
import { PlayApp } from './types';
import { AppIcon, T } from './playUi';
import { ChevronRight } from 'lucide-react';

interface PlayStoreCategoriesTabProps {
  apps: PlayApp[];
  langs: string[];
  onSelectLang: (lang: 'Kotlin' | 'Flutter') => void;
}

export const PlayStoreCategoriesTab: React.FC<PlayStoreCategoriesTabProps> = ({
  apps,
  langs,
  onSelectLang,
}) => {
  return (
    <div className="px-4 py-4 grid grid-cols-2 gap-3 animate-in fade-in duration-200">
      {langs.map((l) => {
        const list = apps.filter((a) => a.lang === l);
        return (
          <button
            key={l}
            onClick={() => onSelectLang(l as 'Kotlin' | 'Flutter')}
            className={`p-4 rounded-2xl text-left flex flex-col gap-3 active:scale-[0.98] transition-transform cursor-pointer ${T.card}`}
          >
            <div className="flex -space-x-2">
              {list.slice(0, 3).map((a) => (
                <AppIcon
                  key={a.id}
                  app={a}
                  size={32}
                  className="ring-2 ring-[var(--m3-surface-container,#1e1f20)]"
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[14px] font-medium">{l} apps</div>
                <div className={`text-[12px] ${T.sub}`}>
                  {list.length} {list.length > 1 ? 'apps' : 'app'}
                </div>
              </div>
              <ChevronRight size={18} className={T.sub} />
            </div>
          </button>
        );
      })}
    </div>
  );
};

