'use client';

import React from 'react';
import { Play, Pause, Music, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useNotchStore } from './notchStore';

export const NotchMediaTab: React.FC = () => {
  const isPlaying = useNotchStore((s) => s.isPlaying);
  const togglePlayback = useNotchStore((s) => s.togglePlayback);

  return (
    <div className="w-full flex flex-col gap-2.5 px-4 py-2">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg ${isPlaying ? 'animate-pulse' : ''}`}>
          <Music size={18} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">Lofi Coding Vibes</p>
          <p className="text-[11px] text-white/60 truncate">RadoOS Radio • Ambient Focus</p>
        </div>
        <div className="flex items-center gap-1">
          <Volume2 size={14} className="text-white/60" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-1">
        <button className="nx-btn p-1.5 rounded-full text-white/70 hover:text-white" aria-label="Previous">
          <SkipBack size={14} />
        </button>
        <button
          onClick={togglePlayback}
          className="nx-btn p-2 rounded-full bg-white text-black hover:bg-white/90"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <button className="nx-btn p-1.5 rounded-full text-white/70 hover:text-white" aria-label="Next">
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  );
};
