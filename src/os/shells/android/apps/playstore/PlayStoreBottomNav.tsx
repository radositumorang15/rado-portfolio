'use client';

import React from 'react';
import { BookOpen, Gamepad2, LayoutGrid, Search } from 'lucide-react';
import { T } from './playUi';
import { notch } from '@/src/os/notch';

interface PlayStoreBottomNavProps {
  onSearchClick: () => void;
  onAppsClick: () => void;
}

export const PlayStoreBottomNav: React.FC<PlayStoreBottomNavProps> = ({
  onSearchClick,
  onAppsClick,
}) => {
  return (
    <nav className={`shrink-0 flex items-start justify-around pt-3 pb-3 border-t ${T.line} ${T.card}`}>
      {[
        { id: 'games', label: 'Games', Icon: Gamepad2 },
        { id: 'apps', label: 'Apps', Icon: LayoutGrid },
        { id: 'search', label: 'Search', Icon: Search },
        { id: 'books', label: 'Books', Icon: BookOpen },
      ].map(({ id, label, Icon }) => {
        const active = id === 'apps';
        return (
          <button
            key={id}
            onClick={() => {
              if (id === 'search') onSearchClick();
              else if (id === 'apps') onAppsClick();
              else notch.show({ title: `${label} isn’t part of this portfolio`, subtitle: 'Coming soon' });
            }}
            className="flex flex-col items-center gap-1 w-16 cursor-pointer"
          >
            <span
              className={`h-8 w-14 rounded-full flex items-center justify-center transition-colors ${
                active ? 'bg-[var(--m3-secondary-container,#1f3b2a)]' : ''
              }`}
            >
              <Icon size={22} className={active ? T.text : T.sub} />
            </span>
            <span className={`text-[11.5px] ${active ? `font-semibold ${T.text}` : T.sub}`}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

