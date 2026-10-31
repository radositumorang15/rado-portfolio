import React from 'react';
import { Direction } from './types';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface SnaxiaDPadProps {
  onDirection: (dir: Direction) => void;
  className?: string;
}

export const SnaxiaDPad: React.FC<SnaxiaDPadProps> = ({ onDirection, className = '' }) => {
  const handlePress = (dir: Direction, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
    onDirection(dir);
  };

  return (
    <div className={`flex flex-col items-center justify-center select-none py-2 ${className}`}>
      {/* UP */}
      <button
        onPointerDown={(e) => handlePress('UP', e)}
        className="w-16 h-12 rounded-2xl bg-white/10 active:bg-[#00F0FF]/40 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all shadow-md cursor-pointer"
        aria-label="Navigate Up"
      >
        <ArrowUp size={24} className="pointer-events-none" />
      </button>

      {/* MIDDLE ROW: LEFT, CENTER PAD, RIGHT */}
      <div className="flex items-center gap-3 my-1">
        <button
          onPointerDown={(e) => handlePress('LEFT', e)}
          className="w-16 h-12 rounded-2xl bg-white/10 active:bg-[#00F0FF]/40 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all shadow-md cursor-pointer"
          aria-label="Navigate Left"
        >
          <ArrowLeft size={24} className="pointer-events-none" />
        </button>

        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] text-[#00F0FF]/70 font-mono tracking-wider">
          NAV
        </div>

        <button
          onPointerDown={(e) => handlePress('RIGHT', e)}
          className="w-16 h-12 rounded-2xl bg-white/10 active:bg-[#00F0FF]/40 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all shadow-md cursor-pointer"
          aria-label="Navigate Right"
        >
          <ArrowRight size={24} className="pointer-events-none" />
        </button>
      </div>

      {/* DOWN */}
      <button
        onPointerDown={(e) => handlePress('DOWN', e)}
        className="w-16 h-12 rounded-2xl bg-white/10 active:bg-[#00F0FF]/40 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all shadow-md cursor-pointer"
        aria-label="Navigate Down"
      >
        <ArrowDown size={24} className="pointer-events-none" />
      </button>
    </div>
  );
};
