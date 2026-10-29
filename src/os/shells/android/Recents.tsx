'use client';

import React from 'react';
import { X, Layers } from 'lucide-react';
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

  if (!isOpen) return null;

  const openApps = APP_IDS.filter((id) => windows[id].isOpen);

  return (
    <div
      className="fixed inset-0 z-[1400] bg-neutral-950/80 backdrop-blur-md flex flex-col justify-center items-center p-6 text-white select-none animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div className="w-full max-w-sm flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-blue-400" />
          <span className="text-xs font-semibold tracking-wider uppercase">Open Applications</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      {openApps.length === 0 ? (
        <div className="flex flex-col items-center gap-2 text-white/50 py-12">
          <p className="text-xs">No recent applications open</p>
        </div>
      ) : (
        <div className="w-full max-w-sm flex gap-4 overflow-x-auto py-4 px-2 snap-x snap-mandatory">
          {openApps.map((id) => {
            const win = windows[id];
            return (
              <div
                key={id}
                onClick={(e) => {
                  e.stopPropagation();
                  openWindow(id);
                  onClose();
                }}
                className="w-56 h-80 rounded-3xl bg-[var(--m3-surface-container)] border border-white/10 shadow-2xl flex flex-col overflow-hidden shrink-0 snap-center cursor-pointer hover:border-blue-500/50 transition-all group"
              >
                <div className="h-12 px-4 flex items-center justify-between bg-[var(--m3-surface-container-high)] border-b border-white/5">
                  <div className="flex items-center gap-2 min-w-0">
                    <PixelAdaptiveIcon id={id} themed={themedIcons} size={24} />
                    <span className="text-xs font-semibold capitalize text-white truncate">
                      {win.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(id);
                    }}
                    className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="flex-1 p-4 flex flex-col items-center justify-center gap-3 bg-[var(--m3-bg)]">
                  <PixelAdaptiveIcon id={id} themed={themedIcons} size={64} />
                  <span className="text-xs font-medium text-white/70 capitalize">Tap to resume</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Gesture Pill to dismiss */}
      <div className="mt-8 flex justify-center cursor-pointer" onClick={onClose}>
        <div className="w-28 h-1 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
      </div>
    </div>
  );
};
