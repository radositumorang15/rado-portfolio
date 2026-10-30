'use client';

import React from 'react';
import { PlayApp } from './types';
import { AppIcon, Rating, T } from './playUi';

interface PlayStoreFeaturedHeroProps {
  app: PlayApp;
  language: 'en' | 'id';
  installed: boolean;
  onSelect: () => void;
}

export const PlayStoreFeaturedHero: React.FC<PlayStoreFeaturedHeroProps> = ({
  app,
  language,
  installed,
  onSelect,
}) => {
  return (
    <div className="px-4">
      <button
        onClick={onSelect}
        className="relative w-full h-44 rounded-[28px] overflow-hidden text-left cursor-pointer active:scale-[0.99] transition-transform"
        style={{
          background: `linear-gradient(135deg, ${app.gradient[0]}, ${app.gradient[1]})`,
        }}
      >
        <div className="absolute -right-12 -top-12 w-52 h-52 rounded-full bg-white/10" />
        {app.screens[0] && (
          <img
            src={app.screens[0].image}
            alt=""
            className="absolute right-5 -bottom-12 w-[104px] h-48 rounded-[20px] border-4 border-black/40 rotate-6 shadow-2xl object-cover object-top"
          />
        )}
        <div className="relative p-5 max-w-[62%] text-white">
          <span className="inline-block px-2 py-0.5 rounded-full bg-black/30 text-[10px] font-semibold uppercase tracking-wider">
            Featured
          </span>
          <h2 className="text-[22px] font-bold leading-tight mt-2 mb-1">{app.name}</h2>
          <p className="text-[12px] text-white/85 line-clamp-3 m-0">{app.tagline[language]}</p>
        </div>
      </button>

      <div className="flex items-center gap-3 mt-3">
        <AppIcon app={app} size={44} />
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-medium truncate">{app.name}</div>
          <div className={`text-[12px] flex items-center gap-1 ${T.sub}`}>
            <Rating value={app.rating} /> · {app.category}
          </div>
        </div>
        <button
          onClick={onSelect}
          className={`px-5 h-9 rounded-full text-[13px] font-medium cursor-pointer ${T.outlineBtn}`}
        >
          {installed ? 'Open' : 'Install'}
        </button>
      </div>
    </div>
  );
};

