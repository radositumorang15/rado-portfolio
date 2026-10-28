'use client';

import React from 'react';
import { X, Layers } from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { AppId, APP_IDS } from '../../../lib/constants';

interface RecentsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Recents: React.FC<RecentsProps> = ({ isOpen, onClose }) => {
  const windows = useWindowsStore((s) => s.windows);
  const openWindow = useWindowsStore((s) => s.openWindow);
  const closeWindow = useWindowsStore((s) => s.closeWindow);

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
                className="w-56 h-80 rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl flex flex-col overflow-hidden shrink-0 snap-center cursor-pointer hover:border-blue-500/50 transition-all group"
              >
                <div className="h-10 px-4 flex items-center justify-between bg-neutral-800/80 border-b border-white/5">
                  <span className="text-xs font-semibold capitalize text-white truncate">
                    {win.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(id);
                    }}
                    className="p-1 rounded-full hover:bg-white/10 text-white/50 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="flex-1 p-4 flex flex-col items-center justify-center gap-2 bg-neutral-950/60">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Layers size={22} />
                  </div>
                  <span className="text-[11px] text-white/60 capitalize">Tap to switch</span>
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
