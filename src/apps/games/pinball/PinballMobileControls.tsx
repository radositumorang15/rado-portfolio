import React from 'react';
import { Rocket, Vibrate } from 'lucide-react';

interface PinballMobileControlsProps {
  onLeftFlipper: (up: boolean) => void;
  onRightFlipper: (up: boolean) => void;
  onStartPlunger: () => void;
  onReleasePlunger: () => void;
  onNudge: () => void;
  plungerCharge: number;
}

export const PinballMobileControls: React.FC<PinballMobileControlsProps> = ({
  onLeftFlipper, onRightFlipper, onStartPlunger, onReleasePlunger, onNudge, plungerCharge,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full pt-1 select-none">
      <div className="grid grid-cols-4 gap-2">
        {/* Left Flipper Button */}
        <button
          onTouchStart={() => onLeftFlipper(true)}
          onTouchEnd={() => onLeftFlipper(false)}
          onMouseDown={() => onLeftFlipper(true)}
          onMouseUp={() => onLeftFlipper(false)}
          className="col-span-2 h-13 rounded-2xl bg-[#00F0FF]/15 active:bg-[#00F0FF]/40 border border-[#00F0FF]/30 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center active:scale-95 transition-transform"
        >
          Left Flipper
        </button>

        {/* Right Flipper Button */}
        <button
          onTouchStart={() => onRightFlipper(true)}
          onTouchEnd={() => onRightFlipper(false)}
          onMouseDown={() => onRightFlipper(true)}
          onMouseUp={() => onRightFlipper(false)}
          className="col-span-2 h-13 rounded-2xl bg-[#FF007F]/15 active:bg-[#FF007F]/40 border border-[#FF007F]/30 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center active:scale-95 transition-transform"
        >
          Right Flipper
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Nudge */}
        <button
          onClick={onNudge}
          className="h-10 rounded-xl bg-white/10 active:bg-white/20 border border-white/10 text-white/80 text-[11px] font-semibold flex items-center justify-center gap-1 active:scale-95"
        >
          <Vibrate size={14} />
          <span>Nudge</span>
        </button>

        {/* Plunger Launch (Hold & Release) */}
        <button
          onTouchStart={onStartPlunger}
          onTouchEnd={onReleasePlunger}
          onMouseDown={onStartPlunger}
          onMouseUp={onReleasePlunger}
          className="col-span-2 h-10 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#00F0FF] active:brightness-125 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 shadow-md"
        >
          <Rocket size={14} />
          <span>{plungerCharge > 0 ? `Launching ${(plungerCharge * 100).toFixed(0)}%` : 'Hold to Launch'}</span>
        </button>
      </div>
    </div>
  );
};
