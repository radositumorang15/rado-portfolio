'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefsStore } from '../store/prefs';
import { useWindowsStore } from '../store/windows';
import { WindowsShell } from './shells/windows';
import { AndroidShell } from './shells/android';
import { WindowsLockScreen } from './shells/windows/WindowsLockScreen';
import { AndroidLockScreen } from './shells/android/AndroidLockScreen';
import { AppId, APP_IDS } from '../lib/constants';
import { notch } from './notch';

export const OSRoot: React.FC = () => {
  const resolvedShell = usePrefsStore((s) => s.resolvedShell);
  const syncFromDOM = usePrefsStore((s) => s.syncFromDOM);
  const updateResponsiveShell = usePrefsStore((s) => s.updateResponsiveShell);
  const openWindow = useWindowsStore((s) => s.openWindow);
  const closeWindow = useWindowsStore((s) => s.closeWindow);

  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const prevShellRef = useRef(resolvedShell);

  useEffect(() => {
    if (prevShellRef.current !== resolvedShell) {
      prevShellRef.current = resolvedShell;
      setIsTransitioning(true);
    }
  }, [resolvedShell]);

  // Debounced responsive shell auto-detection on resize
  useEffect(() => {
    syncFromDOM();
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => updateResponsiveShell(), 120);
    };
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleMedia = () => updateResponsiveShell();

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMedia);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleMedia);
    };
  }, [syncFromDOM, updateResponsiveShell]);

  // Session boot & lock state check
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('rn_booted');
    const hasUnlocked = sessionStorage.getItem('rn_unlocked');
    if (hasBooted) {
      setIsBooting(false);
      setIsLocked(!hasUnlocked);
    } else {
      const timer = setTimeout(() => {
        setIsBooting(false);
        setIsLocked(true);
        sessionStorage.setItem('rn_booted', 'true');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
    sessionStorage.setItem('rn_unlocked', 'true');
    notch.show({
      title: 'Welcome to RadoOS',
      subtitle: 'Double click icons or open Start Menu to explore',
      duration: 3500,
    });
  };

  // Handle Hash deep linking & browser back/forward
  useEffect(() => {
    let isInitialMount = true;
    const handleHash = () => {
      const raw = window.location.hash.replace('#', '');
      const [app, sub] = raw.split('/');
      if (app && APP_IDS.includes(app as AppId)) {
        openWindow(app as AppId, sub);
      } else if (!raw && !isInitialMount) {
        const cur = useWindowsStore.getState().activeId;
        if (cur) closeWindow(cur);
      }
      isInitialMount = false;
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [openWindow, closeWindow]);

  if (isBooting) {
    return (
      <div
        onClick={() => {
          setIsBooting(false);
          setIsLocked(false);
          sessionStorage.setItem('rn_booted', 'true');
          sessionStorage.setItem('rn_unlocked', 'true');
        }}
        className="fixed inset-0 z-[2000] bg-black flex flex-col items-center justify-center text-white cursor-pointer select-none font-sans"
      >
        {resolvedShell === 'windows' ? (
          <div className="flex flex-col items-center gap-12">
            <div className="grid grid-cols-2 gap-1.5 w-16 h-16">
              <div className="bg-[#0078D4] rounded-xs shadow-sm" />
              <div className="bg-[#0078D4] rounded-xs shadow-sm" />
              <div className="bg-[#0078D4] rounded-xs shadow-sm" />
              <div className="bg-[#0078D4] rounded-xs shadow-sm" />
            </div>
            <div className="relative w-9 h-9 animate-spin">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/50" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#EA4335] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-4 h-4 rounded-full bg-[#FBBC05] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-4 h-4 rounded-full bg-[#34A853] animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="w-4 h-4 rounded-full bg-[#4285F4] animate-bounce" style={{ animationDelay: '450ms' }} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xl font-medium tracking-tight text-white/90">Google Pixel</span>
              <span className="text-xs text-white/40 font-mono tracking-widest uppercase">Powered by Android</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isLocked) {
    return resolvedShell === 'windows' ? (
      <WindowsLockScreen onUnlock={handleUnlock} />
    ) : (
      <AndroidLockScreen onUnlock={handleUnlock} />
    );
  }

  const direction = resolvedShell === 'windows' ? 'to-windows' : 'to-android';

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black [perspective:1200px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedShell}
          initial={{
            opacity: 0,
            scale: 1.08,
            rotateY: direction === 'to-windows' ? -18 : 18,
            z: -100,
            filter: 'blur(4px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateY: 0,
            z: 0,
            filter: 'blur(0px)',
            transitionEnd: { transform: 'none', filter: 'none' },
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            rotateY: direction === 'to-windows' ? 18 : -18,
            z: -100,
            filter: 'blur(4px)',
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setIsTransitioning(false)}
          className={`w-full h-full ${isTransitioning ? '[transform-style:preserve-3d]' : ''}`}
        >
          {resolvedShell === 'windows' ? <WindowsShell /> : <AndroidShell />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};
