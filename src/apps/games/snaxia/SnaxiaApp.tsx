'use client';

import React, { useState } from 'react';
import { Palette, Volume2, VolumeX, Play, RotateCcw, Pause } from 'lucide-react';
import { useSnaxiaEngine } from './useSnaxiaEngine';
import { SnaxiaBoard } from './SnaxiaBoard';
import { SnaxiaDPad } from './SnaxiaDPad';
import { useWindowsStore } from '../../../store/windows';
import { isMuted, setMuted } from '../../../lib/gameAudio';

export const SnaxiaApp: React.FC = () => {
  const activeId = useWindowsStore((s) => s.activeId);
  const isFocused = activeId === 'snaxia';
  const [muted, setMutedState] = useState(isMuted());

  const {
    snake, direction, food, bug, techItem, score, highScore, speedLevel,
    isGameOver, isPaused, wallMode, theme, unlockedTech,
    setTheme, setWallMode, setIsPaused, enqueueDirection, resetGame,
  } = useSnaxiaEngine(isFocused);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    setMutedState(next);
  };

  const toggleTheme = () => {
    setTheme(theme === 'cyber_dark' ? 'nokia_lcd' : 'cyber_dark');
  };

  const toggleWall = () => {
    setWallMode(wallMode === 'wrap' ? 'box' : 'wrap');
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-3 select-none bg-[#0a0f18] text-white font-sans overflow-y-auto">
      {/* 1. TOP HUD TOOLBAR */}
      <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50 font-mono uppercase">Score</span>
            <span className="text-sm font-bold font-mono text-[#00F0FF]">{String(score).padStart(4, '0')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-white/50 font-mono uppercase">High</span>
            <span className="text-sm font-bold font-mono text-[#FFB800]">{String(highScore).padStart(4, '0')}</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] text-white/50 font-mono uppercase">Speed</span>
            <span className="text-xs font-semibold text-white/80">LV.{speedLevel}</span>
          </div>
        </div>

        {/* CONTROLS & TOGGLES */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleWall}
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-mono text-white/80 active:scale-95"
            title="Toggle Wall Mode"
          >
            {wallMode === 'wrap' ? 'WRAP' : 'BOX (1.2x)'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 active:scale-95"
            title="Switch Theme"
          >
            <Palette size={14} />
          </button>
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 active:scale-95"
            title="Mute/Unmute"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 active:scale-95"
            title="Pause/Play"
          >
            {isPaused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        </div>
      </div>

      {/* 2. GAME BOARD */}
      <div className="relative flex-1 flex items-center justify-center my-2">
        <SnaxiaBoard
          snake={snake}
          direction={direction}
          food={food}
          bug={bug}
          techItem={techItem}
          theme={theme}
          wallMode={wallMode}
        />

        {/* GAME OVER OVERLAY */}
        {isGameOver && (
          <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-200">
            <h2 className="text-xl font-bold text-[#FF3B30] tracking-wider mb-1">GAME OVER</h2>
            <p className="text-xs text-white/70 mb-3 font-mono">
              Final Score: <span className="text-[#00F0FF] font-bold text-sm">{score}</span>
            </p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0078D4] hover:bg-[#0086F8] text-white font-semibold text-xs active:scale-95 transition-transform shadow-lg cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Play Again</span>
            </button>
          </div>
        )}

        {/* PAUSE OVERLAY */}
        {isPaused && !isGameOver && (
          <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center">
            <span className="text-lg font-bold tracking-widest text-[#00F0FF]">PAUSED</span>
            <span className="text-[11px] text-white/60 mt-1">Press Space or Tap Play to Resume</span>
          </div>
        )}
      </div>

      {/* 3. VIRTUAL TOUCH D-PAD (On Mobile / Small screen) */}
      <div className="block md:hidden">
        <SnaxiaDPad onDirection={enqueueDirection} />
      </div>

      {/* 4. FOOTER TECH BADGES */}
      <div className="flex items-center justify-between px-2 pt-1 border-t border-white/5 text-[11px] text-white/60">
        <span className="truncate">Tech Unlocked: {unlockedTech.length}/6</span>
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {unlockedTech.map((t) => (
            <span key={t} className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
