'use client';

import React, { useEffect, useRef } from 'react';
import './pixelAnimate.css';

interface PixelWallpaperProps {
  reducedMotion?: boolean;
}

export const PixelWallpaper: React.FC<PixelWallpaperProps> = ({ reducedMotion = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    let targetPx = 0;
    let currentPx = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        targetPx = (e.clientX / window.innerWidth - 0.5) * 2;
      }
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.gamma !== undefined) {
        targetPx = Math.max(-1, Math.min(1, e.gamma / 25));
      }
    };

    const loop = () => {
      // Smooth interpolation for silky 60/120fps gyro and mouse parallax
      currentPx += (targetPx - currentPx) * 0.08;
      if (containerRef.current) {
        containerRef.current.style.setProperty('--px', currentPx.toFixed(3));
      }
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${
        reducedMotion ? 'pixel-saver' : ''
      }`}
    >
      {/* 1. Iconic Dynamic SVG Emerald Live Waves */}
      <div className="pixel-wall">
        <svg viewBox="0 0 400 860" preserveAspectRatio="none">
          <path d="M0 190C120 120 220 300 400 210V860H0Z" fill="#2c6a4e" />
        </svg>
        <svg viewBox="0 0 400 860" preserveAspectRatio="none">
          <path d="M0 430C150 340 230 540 400 430V860H0Z" fill="#3f8a68" opacity="0.92" />
        </svg>
        <svg viewBox="0 0 400 860" preserveAspectRatio="none">
          <path d="M0 650C120 590 270 730 400 610V860H0Z" fill="#57ab84" opacity="0.88" />
        </svg>
      </div>

      {/* 2. Ambient Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/65 pointer-events-none" />
    </div>
  );
};
