import React from 'react';
import { Direction } from './types';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface SnaxiaDPadProps {
  onDirection: (dir: Direction) => void;
}

export const SnaxiaDPad: React.FC<SnaxiaDPadProps> = ({ onDirection }) => {
  const handlePress = (dir: Direction, e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
    onDirection(dir);
  };

  return (
    <div className="flex flex-col items-center justify-center select-none py-2">
      {/* UP */}
      <button
        onTouchStart={(e) => handlePress('UP', e)}
        onMouseDown={(e) => handlePress('UP', e)}
        className="w-16 h-14 rounded-2xl bg-white/10 active:bg-[#00F0FF]/30 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all shadow-md"
        aria-label="Up"
      >
        <ArrowUp size={26} />
      </button>

      {/* MIDDLE ROW: LEFT, CENTER PAD, RIGHT */}
      <div className="flex items-center gap-3 my-1">
        <button
          onTouchStart={(e) => handlePress('LEFT', e)}
          onMouseDown={(e) => handlePress('LEFT', e)}
          className="w-16 h-14 rounded-2xl bg-white/10 active:bg-[#00F0FF]/30 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all shadow-md"
          aria-label="Left"
        >
          <ArrowLeft size={26} />
        </button>

        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/40 font-mono">
          PAD
        </div>

        <button
          onTouchStart={(e) => handlePress('RIGHT', e)}
          onMouseDown={(e) => handlePress('RIGHT', e)}
          className="w-16 h-14 rounded-2xl bg-white/10 active:bg-[#00F0FF]/30 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all shadow-md"
          aria-label="Right"
        >
          <ArrowRight size={26} />
        </button>
      </div>

      {/* DOWN */}
      <button
        onTouchStart={(e) => handlePress('DOWN', e)}
        onMouseDown={(e) => handlePress('DOWN', e)}
        className="w-16 h-14 rounded-2xl bg-white/10 active:bg-[#00F0FF]/30 border border-white/15 flex items-center justify-center text-white active:scale-90 transition-all shadow-md"
        aria-label="Down"
      >
        <ArrowDown size={26} />
      </button>
    </div>
  );
};
