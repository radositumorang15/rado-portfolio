'use client';

import React from 'react';
import { PlayApp } from './types';
import { AppIcon, Rating, T, sizeMb } from './playUi';
import { Bookmark, BookmarkCheck, Share2, Smartphone, X } from 'lucide-react';

interface PlayStoreDetailHeaderProps {
  app: PlayApp;
  installed: boolean;
  progress: number | null;
  wish: boolean;
  onStartInstall: () => void;
  onCancelInstall: () => void;
  onUninstall: () => void;
  onOpenApp: () => void;
  onToggleWish: () => void;
  onShare: () => void;
}

export const PlayStoreDetailHeader: React.FC<PlayStoreDetailHeaderProps> = ({
  app,
  installed,
  progress,
  wish,
  onStartInstall,
  onCancelInstall,
  onUninstall,
  onOpenApp,
  onToggleWish,
  onShare,
}) => {
  const totalMb = sizeMb(app.size);

  return (
    <div className="flex flex-col">
      {/* Header (Icon + Title + Developer) */}
      <div className="flex gap-4 px-4 pt-1 pb-4">
        <AppIcon app={app} size={72} />
        <div className="min-w-0 flex-1">
          <h1 className="text-[22px] leading-7 font-medium m-0">{app.name}</h1>
          <p className={`text-[14px] font-medium mt-0.5 m-0 ${T.primaryText}`}>{app.developer}</p>
          <p className={`text-[12px] mt-1 m-0 ${T.sub}`}>Personal project · Contains no ads</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-stretch px-2 pb-4">
        {[
          { top: <Rating value={app.rating} />, bottom: `${app.reviewsCount} reviews` },
          { top: app.size, bottom: 'Size' },
          { top: <span className={`px-1.5 border rounded text-[12px] ${T.line}`}>3+</span>, bottom: 'Rated for 3+' },
          { top: app.downloads, bottom: 'Downloads' },
        ].map((s, i) => (
          <div key={i} className={`flex-1 min-w-0 px-1 text-center ${i > 0 ? `border-l ${T.line}` : ''}`}>
            <div className="text-[13.5px] font-medium h-6 flex items-center justify-center">{s.top}</div>
            <div className={`text-[11.5px] truncate ${T.sub}`}>{s.bottom}</div>
          </div>
        ))}
      </div>

      {/* Install Button & Progress Area */}
      <div className="px-4">
        {progress !== null ? (
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="h-1.5 rounded-full bg-[var(--m3-surface-container-highest,#333537)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--m3-primary,#6dd58c)] transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={`flex justify-between text-[12px] mt-1.5 ${T.sub}`}>
                <span>Installing…</span>
                <span>
                  {Math.round((totalMb * progress) / 100)} MB of {Math.round(totalMb)} MB
                </span>
              </div>
            </div>
            <button
              onClick={onCancelInstall}
              aria-label="Cancel"
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer active:bg-white/10 ${T.sub}`}
            >
              <X size={20} />
            </button>
          </div>
        ) : installed ? (
          <div className="flex gap-3">
            <button
              onClick={onUninstall}
              className={`flex-1 h-10 rounded-full text-[14px] font-medium cursor-pointer active:scale-[0.98] transition-transform ${T.outlineBtn}`}
            >
              Uninstall
            </button>
            <button
              onClick={onOpenApp}
              className={`flex-1 h-10 rounded-full text-[14px] font-medium cursor-pointer active:scale-[0.98] transition-transform ${T.primaryBtn}`}
            >
              Open
            </button>
          </div>
        ) : (
          <button
            onClick={onStartInstall}
            className={`w-full h-10 rounded-full text-[14px] font-medium cursor-pointer active:scale-[0.98] transition-transform ${T.primaryBtn}`}
          >
            Install
          </button>
        )}

        <div className="flex items-center gap-1 mt-3 -ml-3">
          <button
            onClick={onShare}
            className={`h-10 px-3 rounded-full flex items-center gap-2 text-[13px] font-medium cursor-pointer active:bg-white/10 ${T.primaryText}`}
          >
            <Share2 size={17} /> Share
          </button>
          <button
            onClick={onToggleWish}
            className={`h-10 px-3 rounded-full flex items-center gap-2 text-[13px] font-medium cursor-pointer active:bg-white/10 ${T.primaryText}`}
          >
            {wish ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
            {wish ? 'Added to wishlist' : 'Add to wishlist'}
          </button>
        </div>
        <div className={`flex items-center gap-2 text-[12px] mt-1 ${T.sub}`}>
          <Smartphone size={15} /> This app is available for your device
        </div>
      </div>
    </div>
  );
};

