'use client';

import React, { useState } from 'react';
import { X, Layers, Trash2 } from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { usePrefsStore } from '../../../store/prefs';
import { AppId, APP_IDS } from '../../../lib/constants';
import { PixelAdaptiveIcon } from './PixelAdaptiveIcon';

interface RecentsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Recents: React.FC<RecentsProps> = ({ isOpen, onClose }) => {
  const windows = useWindowsStore((s) => s.windows);
  const openWindow = useWindowsStore((s) => s.openWindow);
  const closeWindow = useWindowsStore((s) => s.closeWindow);
  const themedIcons = usePrefsStore((s) => s.themedIcons);
  const language = usePrefsStore((s) => s.language);

  const [dismissingId, setDismissingId] = useState<AppId | null>(null);

  if (!isOpen) return null;

  const openApps = APP_IDS.filter((id) => windows[id].isOpen);

  const handleDismissApp = (id: AppId, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
    setDismissingId(id);
    setTimeout(() => {
      closeWindow(id);
      setDismissingId(null);
    }, 250);
  };

  const handleClearAll = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(15);
    }
    openApps.forEach((id) => closeWindow(id));
  };

  return (
    <div
      className="fixed inset-0 z-[1400] bg-black/85 backdrop-blur-[20px] flex flex-col justify-between items-center py-6 px-4 text-white select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Header */}
      <div className="w-full max-w-sm flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-[#A9C4FF]" />
          <span className="text-xs font-semibold tracking-wider uppercase text-white/90">
            {language === 'id' ? 'Aplikasi Terbuka' : 'Recent Applications'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* Cards Carousel */}
      {openApps.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 text-white/50 my-auto">
          <Layers size={36} className="opacity-30" />
          <p className="text-xs">
            {language === 'id' ? 'Tidak ada aplikasi terbuka' : 'No recent applications open'}
          </p>
        </div>
      ) : (
        <div className="w-full max-w-sm flex gap-4 overflow-x-auto py-6 px-4 snap-x snap-mandatory scrollbar-none items-center my-auto">
          {openApps.map((id) => {
            const win = windows[id];
            const isDismissing = dismissingId === id;

            return (
              <div
                key={id}
                onClick={(e) => {
                  e.stopPropagation();
                  openWindow(id);
                  onClose();
                }}
                className={`w-60 h-[380px] rounded-[28px] bg-[var(--m3-surface-container)] border border-white/10 shadow-2xl flex flex-col overflow-hidden shrink-0 snap-center cursor-pointer transition-all duration-250 group ${
                  isDismissing
                    ? '-translate-y-full opacity-0 scale-90'
                    : 'hover:border-[#A9C4FF]/50 active:scale-98'
                }`}
              >
                {/* Card Header */}
                <div className="h-12 px-4 flex items-center justify-between bg-[var(--m3-surface-container-high)] border-b border-white/5">
                  <div className="flex items-center gap-2 min-w-0">
                    <PixelAdaptiveIcon id={id} themed={themedIcons} size={24} />
                    <span className="text-xs font-semibold capitalize text-white truncate">
                      {win.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDismissApp(id, e)}
                    className="p-1.5 rounded-full hover:bg-white/15 text-white/60 hover:text-white transition-colors cursor-pointer"
                    title="Dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Card Body & Live Preview */}
                <div className="flex-1 p-5 flex flex-col items-center justify-center gap-3 bg-[var(--m3-bg)] relative">
                  <PixelAdaptiveIcon id={id} themed={themedIcons} size={64} />
                  <span className="text-xs font-medium text-white/70 capitalize">
                    {language === 'id' ? 'Ketuk untuk melanjutkan' : 'Tap to resume'}
                  </span>
                  <span className="text-[10px] text-white/40">
                    {language === 'id' ? 'Geser ke atas untuk tutup' : 'Swipe up to close'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Actions & Pill */}
      <div className="flex flex-col items-center gap-4 w-full">
        {openApps.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/90 transition-all cursor-pointer active:scale-95"
          >
            <Trash2 size={13} />
            <span>{language === 'id' ? 'Hapus Semua' : 'Clear All'}</span>
          </button>
        )}

        <div className="cursor-pointer py-1" onClick={onClose} title="Go Home">
          <div className="w-28 h-1.5 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
        </div>
      </div>
    </div>
  );
};
