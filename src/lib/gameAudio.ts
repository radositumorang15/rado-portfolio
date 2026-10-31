// Procedural Web Audio API sound synthesizer (0 KB external files)
import { getGameData, saveGameData } from './gameStorage';

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtx) audioCtx = new AudioCtx();
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  return audioCtx;
}

export function isMuted(): boolean {
  return getGameData().settings.audioMuted;
}

export function setMuted(muted: boolean): void {
  saveGameData((d) => ({ ...d, settings: { ...d.settings, audioMuted: muted } }));
}

function playTone(freq: number, type: OscillatorType, dur: number, targetFreq?: number): void {
  if (isMuted()) return;
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (targetFreq) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(1, targetFreq), now + dur);
  }

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + dur);
}

export const gameAudio = {
  flipperUp: () => playTone(120, 'triangle', 0.06, 320),
  bumperHit: () => {
    playTone(520, 'sine', 0.09, 880);
    playTone(260, 'square', 0.07, 440);
  },
  dropTarget: () => {
    const tones = [440, 554, 659];
    tones.forEach((f, idx) => {
      setTimeout(() => playTone(f, 'square', 0.05), idx * 45);
    });
  },
  snaxiaEat: () => playTone(600, 'square', 0.07, 900),
  snaxiaBug: () => {
    const tones = [400, 800, 1200];
    tones.forEach((f, idx) => {
      setTimeout(() => playTone(f, 'sawtooth', 0.07), idx * 60);
    });
  },
  gameOver: () => {
    const steps = [300, 250, 180, 110];
    steps.forEach((f, idx) => {
      setTimeout(() => playTone(f, 'sawtooth', 0.12), idx * 100);
    });
  },
  highScoreFanfare: () => {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, idx) => {
      setTimeout(() => playTone(f, 'triangle', 0.14), idx * 120);
    });
  },
  plungerPull: (charge: number) => {
    const f = 100 + charge * 300;
    playTone(f, 'triangle', 0.04);
  },
  plungerRelease: () => playTone(180, 'sawtooth', 0.12, 500),
};
