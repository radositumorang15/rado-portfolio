'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useNotchStore, NotchState } from './notchStore';
import { NotchSlot } from './NotchSlot';
import './notch.css';

interface NotchHostProps {
  platform: 'windows' | 'android';
}

export const NotchHost: React.FC<NotchHostProps> = ({ platform }) => {
  const state = useNotchStore((s) => s.state);
  const currentEvent = useNotchStore((s) => s.currentEvent);
  const setState = useNotchStore((s) => s.setState);
  const dismiss = useNotchStore((s) => s.dismiss);

  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isHovered || state === 'expanded' || state === 'idle') return;

    if (state === 'active') {
      const duration = currentEvent?.duration || 4000;
      timerRef.current = setTimeout(() => setState('peek'), duration);
    } else if (state === 'peek') {
      timerRef.current = setTimeout(() => dismiss(), 2500);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state, isHovered, currentEvent, setState, dismiss]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && state === 'expanded') {
        setState('idle');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, setState]);

  const getBounds = () => {
    const isMobile = platform === 'android';
    if (isMobile) {
      switch (state) {
        case 'idle': return { w: 40, h: 32, r: 9999 };
        case 'peek': return { w: 160, h: 36, r: 9999 };
        case 'active': return { w: 340, h: 72, r: 24 };
        case 'expanded': return { w: 360, h: 180, r: 28 };
      }
    } else {
      switch (state) {
        case 'idle': return { w: 168, h: 34, r: 18 };
        case 'peek': return { w: 260, h: 40, r: 20 };
        case 'active': return { w: 420, h: 88, r: 24 };
        case 'expanded': return { w: 540, h: 200, r: 26 };
      }
    }
  };

  const bounds = getBounds();

  const handleClick = () => {
    if (state === 'idle') setState('expanded');
    else if (state === 'peek') setState('expanded');
    else if (state === 'active') setState('expanded');
    else if (state === 'expanded') setState('idle');
  };

  return (
    <div className="nx-root" role="status" aria-live="polite">
      <div
        className={`nx-island ${state === 'expanded' ? 'expanded' : ''}`}
        style={{
          width: bounds.w,
          height: bounds.h,
          borderRadius: `0 0 ${bounds.r}px ${bounds.r}px`,
        }}
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          if (state === 'idle') setState('peek');
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (state === 'peek') setState('idle');
        }}
        tabIndex={0}
      >
        <NotchSlot
          state={state}
          platform={platform}
          event={currentEvent}
          onRequestState={setState}
        />
      </div>
    </div>
  );
};
