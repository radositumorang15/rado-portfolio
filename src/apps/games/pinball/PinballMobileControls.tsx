import React from 'react';
import { Rocket, Vibrate } from 'lucide-react';

interface PinballMobileControlsProps {
  onLeftFlipper: (up: boolean) => void;
  onRightFlipper: (up: boolean) => void;
  onStartPlunger: () => void;
  onReleasePlunger: () => void;
  onLaunch: () => void;
  onNudge: () => void;
  plungerCharge: number;
}

export const PinballMobileControls: React.FC<PinballMobileControlsProps> = ({
  onLeftFlipper, onRightFlipper, onStartPlunger, onReleasePlunger, onLaunch, onNudge, plungerCharge,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full pt-1 select-none">
      <div className="grid grid-cols-4 gap-2">
        <button
          onPointerDown={() => onLeftFlipper(true)}
          onPointerUp={() => onLeftFlipper(false)}
          onPointerLeave={() => onLeftFlipper(false)}
          className="col-span-2 h-14 rounded-2xl bg-[#00F0FF]/20 active:bg-[#00F0FF]/50 border border-[#00F0FF]/40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center active:scale-95 transition-transform cursor-pointer shadow-md"
        >
          ◀ Left Flip
        </button>

        <button
          onPointerDown={() => onRightFlipper(true)}
          onPointerUp={() => onRightFlipper(false)}
          onPointerLeave={() => onRightFlipper(false)}
          className="col-span-2 h-14 rounded-2xl bg-[#FF007F]/20 active:bg-[#FF007F]/50 border border-[#FF007F]/40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center active:scale-95 transition-transform cursor-pointer shadow-md"
        >
          Right Flip ▶
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onNudge}
          className="h-11 rounded-xl bg-white/10 active:bg-white/20 border border-white/15 text-white/90 text-xs font-semibold flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
        >
          <Vibrate size={14} />
          <span>Nudge</span>
        </button>

        <button
          onClick={onLaunch}
          onPointerDown={onStartPlunger}
          onPointerUp={onReleasePlunger}
          className="col-span-2 h-11 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#00F0FF] active:brightness-125 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-lg cursor-pointer"
        >
          <Rocket size={15} />
          <span>{plungerCharge > 0 ? `Charging ${(plungerCharge * 100).toFixed(0)}%` : '🚀 LAUNCH BALL'}</span>
        </button>
      </div>
    </div>
  );
};
