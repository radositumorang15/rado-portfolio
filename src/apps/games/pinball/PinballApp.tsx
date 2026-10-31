'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { usePinballEngine } from './usePinballEngine';
import { PinballTable } from './PinballTable';
import { PinballHUD } from './PinballHUD';
import { PinballMobileControls } from './PinballMobileControls';
import { useWindowsStore } from '../../../store/windows';
import { isMuted, setMuted } from '../../../lib/gameAudio';

export const PinballApp: React.FC = () => {
  const activeId = useWindowsStore((s) => s.activeId);
  const isFocused = activeId === 'pinball';
  const [muted, setMutedState] = useState(isMuted());

  const {
    ball, leftFlipper, rightFlipper, bumpers, targets,
    score, highScore, ballsLeft, multiplier, isGameOver, isTilted,
    plungerCharge, shake, setLeftFlipper, setRightFlipper,
    startPlunger, releasePlunger, nudge, restartGame,
  } = usePinballEngine(isFocused);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 select-none bg-[#0a0f18] text-white font-sans overflow-y-auto">
      {/* 1. TOP MOBILE COMPACT BAR */}
      <div className="flex md:hidden items-center justify-between px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/50 uppercase font-mono">Score:</span>
          <span className="font-mono font-bold text-[#00F0FF]">{score}</span>
          <span className="text-white/20">|</span>
          <span className="text-[10px] text-white/50 uppercase font-mono">Hi:</span>
          <span className="font-mono font-bold text-[#FFB800]">{highScore}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3].map((b) => (
              <span
                key={b}
                className={`w-2 h-2 rounded-full ${b <= ballsLeft ? 'bg-[#00F0FF]' : 'bg-white/20'}`}
              />
            ))}
          </div>
          {multiplier > 1 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FFB800] text-black">
              {multiplier}X
            </span>
          )}
          <button
            onClick={toggleSound}
            className="p-1 rounded-md bg-white/10 text-white/70"
            title="Mute/Unmute"
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>
      </div>

      {/* 2. MAIN PLAY AREA (2-Column on Desktop) */}
      <div className="relative flex-1 flex flex-col md:flex-row items-center justify-center gap-3">
        <PinballTable
          ball={ball}
          leftFlipper={leftFlipper}
          rightFlipper={rightFlipper}
          bumpers={bumpers}
          targets={targets}
          plungerCharge={plungerCharge}
          isTilted={isTilted}
          shake={shake}
        />

        {/* Desktop Sidebar HUD */}
        <div className="hidden md:flex h-full flex-col justify-between">
          <PinballHUD
            score={score}
            highScore={highScore}
            ballsLeft={ballsLeft}
            multiplier={multiplier}
            targets={targets}
          />
          <div className="flex justify-end pt-2">
            <button
              onClick={toggleSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white/80 transition-colors"
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{muted ? 'Muted' : 'Sound ON'}</span>
            </button>
          </div>
        </div>

        {/* GAME OVER MODAL */}
        {isGameOver && (
          <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-200">
            <h2 className="text-xl font-bold text-[#FF007F] tracking-wider mb-1">BALL OUT // GAME OVER</h2>
            <p className="text-xs text-white/70 mb-3 font-mono">
              Final Score: <span className="text-[#00F0FF] font-bold text-sm">{score}</span>
            </p>
            <button
              onClick={restartGame}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0078D4] hover:bg-[#0086F8] text-white font-semibold text-xs active:scale-95 transition-transform shadow-lg cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Launch Again</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. MOBILE CONTROLS (Small screens) */}
      <div className="block md:hidden">
        <PinballMobileControls
          onLeftFlipper={setLeftFlipper}
          onRightFlipper={setRightFlipper}
          onStartPlunger={startPlunger}
          onReleasePlunger={releasePlunger}
          onNudge={nudge}
          plungerCharge={plungerCharge}
        />
      </div>
    </div>
  );
};
