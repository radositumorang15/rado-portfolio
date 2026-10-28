'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import { Mood } from './notchStore';

interface EyesProps {
  mood: Mood;
}

const EYE_SHAPE: Record<Mood, { w: number; h: number; r: string; glow: number; blink: number }> = {
  normal: { w: 8, h: 12, r: '6px', glow: 8, blink: 0.08 },
  happy: { w: 11, h: 7, r: '10px 10px 3px 3px', glow: 9, blink: 0.08 },
  sleepy: { w: 9, h: 3, r: '4px', glow: 5, blink: 0.2 },
  alert: { w: 9, h: 14, r: '6px', glow: 13, blink: 0.08 },
};

export const NotchEyes = memo(function NotchEyes({ mood }: EyesProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const x = (e.clientX - halfW) / halfW;
      const y = Math.min(1, Math.max(-1, (e.clientY - 60) / 300));
      cursorRef.current = { x, y };
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    let alive = true;
    const schedule = () => {
      const base = mood === 'sleepy' ? 4200 : mood === 'alert' ? 1800 : 2600;
      const timer = window.setTimeout(() => {
        if (!alive) return;
        setBlink(true);
        window.setTimeout(() => {
          if (!alive) return;
          setBlink(false);
          if (mood !== 'sleepy' && Math.random() < 0.3) {
            window.setTimeout(() => {
              if (!alive) return;
              setBlink(true);
              window.setTimeout(() => setBlink(false), 100);
            }, 120);
          }
          schedule();
        }, mood === 'sleepy' ? 260 : 120);
      }, base + Math.random() * 3000);
      return timer;
    };

    const id = schedule();
    return () => {
      alive = false;
      clearTimeout(id);
    };
  }, [mood]);

  useEffect(() => {
    const el = groupRef.current;
    if (!el) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const c = cursorRef.current;
      const k = 1 - Math.exp(-dt / 85);
      px += (c.x - px) * k;
      py += (c.y - py) * k;

      const amp = mood === 'sleepy' ? 0.5 : 1;
      el.style.transform = `translate3d(${(px * 6.5 * amp).toFixed(2)}px, ${(py * 3.5 * amp).toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [mood]);

  const s = EYE_SHAPE[mood];

  return (
    <div ref={groupRef} className="relative flex items-center gap-2">
      {[0, 1].map((i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: s.w,
            height: s.h,
            borderRadius: s.r,
            background: 'var(--rn-accent, #4C8DF6)',
            boxShadow: `0 0 ${s.glow}px var(--rn-accent, #4C8DF6)`,
            transform: blink ? `scaleY(${s.blink})` : 'scaleY(1)',
            transition: 'transform 100ms ease, width 260ms ease, height 260ms ease',
            animation: 'nx-breathe 4s ease-in-out infinite',
          }}
        />
      ))}
      {mood === 'sleepy' && <span className="nx-z">z</span>}
    </div>
  );
});
