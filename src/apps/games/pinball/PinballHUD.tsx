import React from 'react';
import { Rocket } from 'lucide-react';
import { DropTarget } from './types';

interface PinballHUDProps {
  score: number;
  highScore: number;
  ballsLeft: number;
  multiplier: number;
  targets: DropTarget[];
  onLaunch?: () => void;
  onLeftFlipper?: (up: boolean) => void;
  onRightFlipper?: (up: boolean) => void;
}

export const PinballHUD: React.FC<PinballHUDProps> = ({
  score, highScore, ballsLeft, multiplier, targets,
  onLaunch, onLeftFlipper, onRightFlipper,
}) => {
  const hitCount = targets.filter((t) => t.hit).length;
  const progressPct = Math.round((hitCount / targets.length) * 100);

  return (
    <div className="w-full md:w-64 flex flex-col justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white font-mono text-xs select-none">
      {/* 1. Header / Logo */}
      <div className="border-b border-white/10 pb-2">
        <span className="text-[10px] text-[#00F0FF] uppercase tracking-widest font-bold">RADAR // HUD</span>
        <h3 className="text-sm font-bold tracking-wider text-white">CYBER CADET</h3>
      </div>

      {/* 2. Scores */}
      <div className="flex flex-col gap-2.5 my-2">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/50 uppercase">Current Score</span>
          <span className="text-xl font-bold text-[#00F0FF] tracking-wider">
            {score.toLocaleString().padStart(9, '0')}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-white/50 uppercase">High Score</span>
          <span className="text-base font-bold text-[#FFB800] tracking-wider">
            {highScore.toLocaleString().padStart(9, '0')}
          </span>
        </div>

        {/* Balls & Multiplier */}
        <div className="flex items-center justify-between py-1.5 border-y border-white/10">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/50 uppercase">Balls Left</span>
            <div className="flex gap-1.5 mt-0.5">
              {[1, 2, 3].map((b) => (
                <span
                  key={b}
                  className={`w-3 h-3 rounded-full ${
                    b <= ballsLeft ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[9px] text-white/50 uppercase">Multiplier</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${multiplier > 1 ? 'bg-[#FFB800] text-black animate-pulse' : 'bg-white/10 text-white/70'}`}>
              {multiplier}X ACTIVE
            </span>
          </div>
        </div>

        {/* Mission Progress */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-[10px] text-white/60">
            <span>KOTLIN TARGETS</span>
            <span>{progressPct}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00F0FF] to-[#FF007F] transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Desktop Quick Interactive Controls */}
        <div className="flex flex-col gap-1.5 pt-1">
          <button
            onClick={onLaunch}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#00F0FF] hover:brightness-110 active:scale-95 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform shadow-lg cursor-pointer"
          >
            <Rocket size={14} />
            <span>Launch Ball</span>
          </button>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onPointerDown={() => onLeftFlipper?.(true)}
              onPointerUp={() => onLeftFlipper?.(false)}
              onPointerLeave={() => onLeftFlipper?.(false)}
              className="py-1.5 rounded-lg bg-[#00F0FF]/20 active:bg-[#00F0FF]/50 border border-[#00F0FF]/30 text-white text-[10px] font-bold uppercase active:scale-95 cursor-pointer"
            >
              ◀ Flip L
            </button>
            <button
              onPointerDown={() => onRightFlipper?.(true)}
              onPointerUp={() => onRightFlipper?.(false)}
              onPointerLeave={() => onRightFlipper?.(false)}
              className="py-1.5 rounded-lg bg-[#FF007F]/20 active:bg-[#FF007F]/50 border border-[#FF007F]/30 text-white text-[10px] font-bold uppercase active:scale-95 cursor-pointer"
            >
              Flip R ▶
            </button>
          </div>
        </div>
      </div>

      {/* 3. Controls Legend */}
      <div className="pt-2 border-t border-white/10 text-[10px] text-white/60 flex flex-col gap-1">
        <span className="text-[9px] text-white/40 uppercase font-semibold">Keyboard Controls</span>
        <div className="flex justify-between">
          <span className="text-white/80">[Z / A / ←]</span> <span>Left Flipper</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/80">[/ / D / →]</span> <span>Right Flipper</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/80">[SPACE / ENTER]</span> <span>Launch Ball</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/80">[X / N]</span> <span>Nudge Table</span>
        </div>
      </div>
    </div>
  );
};
