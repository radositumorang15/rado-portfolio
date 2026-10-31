'use client';

import { useEffect, useRef, useState } from 'react';

interface UsePixelGesturesOptions {
  containerRef: React.RefObject<HTMLDivElement | null>;
  hasActiveApp: boolean;
  isShadeOpen: boolean;
  onGoHome: () => void;
  onOpenRecents: () => void;
  onOpenShade: () => void;
  onCloseShade: () => void;
}

export interface GestureTransform {
  x: number;
  y: number;
  scale: number;
  radius: number;
}

export function usePixelGestures({
  containerRef,
  hasActiveApp,
  isShadeOpen,
  onGoHome,
  onOpenRecents,
  onOpenShade,
  onCloseShade,
}: UsePixelGesturesOptions) {
  const [gestureTransform, setGestureTransform] = useState<GestureTransform | null>(null);
  const [shadeProgress, setShadeProgress] = useState<number | null>(null);

  // Material 3 Touch Ripple Effect
  useEffect(() => {
    const dev = containerRef.current;
    if (!dev) return;

    const handlePointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'button, .pixel-icon-target, .m3-expressive-tile, [data-ripple]'
      ) as HTMLElement | null;
      if (!target || target.hasAttribute('data-no-ripple')) return;

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');
      ripple.className = 'pixel-ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      if (getComputedStyle(target).position === 'static') {
        target.style.position = 'relative';
      }
      target.style.overflow = 'hidden';
      target.appendChild(ripple);

      setTimeout(() => ripple.remove(), 560);
    };

    dev.addEventListener('pointerdown', handlePointerDown);
    return () => dev.removeEventListener('pointerdown', handlePointerDown);
  }, [containerRef]);

  // Gestures for Nav, Back, and Shade
  useEffect(() => {
    const dev = containerRef.current;
    if (!dev) return;

    let gestureType: 'nav' | 'back' | 'openShade' | 'closeShade' | null = null;
    let startX = 0;
    let startY = 0;
    let devHeight = 0;

    const onPointerDown = (e: PointerEvent) => {
      const r = dev.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      devHeight = r.height;

      const isButton = (e.target as HTMLElement).closest('button, input');

      if (y > devHeight - 40) {
        gestureType = 'nav';
      } else if (y < 46 && !isShadeOpen) {
        gestureType = 'openShade';
      } else if (isShadeOpen && (e.target as HTMLElement).closest('[data-shade-handle]')) {
        gestureType = 'closeShade';
      } else if (x < 24 && hasActiveApp && !isShadeOpen && !isButton) {
        gestureType = 'back';
      } else {
        gestureType = null;
        return;
      }

      startX = e.clientX;
      startY = e.clientY;

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp, { once: true });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!gestureType) return;
      const dx = e.clientX - startX;
      const dy = startY - e.clientY; // positive = dragging up

      if (gestureType === 'nav' && hasActiveApp) {
        const d = Math.max(0, dy);
        setGestureTransform({
          x: 0,
          y: -d * 0.35,
          scale: Math.max(0.65, 1 - d / 650),
          radius: 32,
        });
      } else if (gestureType === 'back' && hasActiveApp && dx > 0) {
        setGestureTransform({
          x: dx * 0.38,
          y: 0,
          scale: Math.max(0.9, 1 - dx / 1100),
          radius: 28,
        });
      } else if (gestureType === 'openShade') {
        const pullDown = Math.max(0, -dy);
        setShadeProgress(Math.min(1, pullDown / (devHeight * 0.4)));
      } else if (gestureType === 'closeShade') {
        const pushUp = Math.max(0, dy);
        setShadeProgress(Math.max(0, 1 - pushUp / (devHeight * 0.3)));
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      window.removeEventListener('pointermove', onPointerMove);
      if (!gestureType) return;

      const dx = e.clientX - startX;
      const dy = startY - e.clientY;
      const type = gestureType;
      gestureType = null;

      setGestureTransform(null);
      setShadeProgress(null);

      if (type === 'nav') {
        if (dy > 150) {
          onOpenRecents();
        } else if (dy > 42) {
          onGoHome();
        }
      } else if (type === 'back') {
        if (dx > 75) {
          onGoHome();
        }
      } else if (type === 'openShade') {
        if (-dy > devHeight * 0.12 || -dy > 50) {
          onOpenShade();
        }
      } else if (type === 'closeShade') {
        if (dy > devHeight * 0.08 || dy > 40) {
          onCloseShade();
        }
      }
    };

    dev.addEventListener('pointerdown', onPointerDown);
    return () => dev.removeEventListener('pointerdown', onPointerDown);
  }, [containerRef, hasActiveApp, isShadeOpen, onGoHome, onOpenRecents, onOpenShade, onCloseShade]);

  return { gestureTransform, shadeProgress };
}
