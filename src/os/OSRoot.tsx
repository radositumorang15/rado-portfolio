'use client';

import React, { useState, useEffect } from 'react';
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

  const [isBooting, setIsBooting] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Responsive shell auto-detection on resize
  useEffect(() => {
    syncFromDOM();

    const handleResize = () => {
      updateResponsiveShell();
    };

    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleMedia = () => {
      updateResponsiveShell();
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleMedia);

    return () => {
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

  // Handle Hash deep linking
  useEffect(() => {
    const handleHash = () => {
      const raw = window.location.hash.replace('#', '');
      const [app, sub] = raw.split('/');
      if (app && APP_IDS.includes(app as AppId)) {
        openWindow(app as AppId, sub);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [openWindow]);

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
          // Windows 11 Signature Boot: 4-square blue logo + spinning ring dots
          <div className="flex flex-col items-center gap-12">
            <div className="grid grid-cols-2 gap-1.5 w-16 h-16">
              <div className="bg-[#0078D4] rounded-xs shadow-sm" />
              <div className="bg-[#0078D4] rounded-xs shadow-sm" />
              <div className="bg-[#0078D4] rounded-xs shadow-sm" />
              <div className="bg-[#0078D4] rounded-xs shadow-sm" />
            </div>
            {/* Windows 11 Spinning Ring Dots */}
            <div className="relative w-9 h-9 animate-spin">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/50" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
            </div>
          </div>
        ) : (
          // Android 16 Pixel Boot: Google G / RN + multi-color pulse
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#1F1F1F] border border-white/10 flex items-center justify-center text-2xl font-bold text-[#A8C7FA] shadow-lg animate-pulse">
              RN
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-bounce" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] animate-bounce [animation-delay:0.15s]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] animate-bounce [animation-delay:0.3s]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-bounce [animation-delay:0.45s]" />
            </div>
          </div>
        )}
        <span className="text-[11px] text-white/30 mt-8">Click anywhere to skip</span>
      </div>
    );
  }

  return (
    <main className="w-full h-full transition-opacity duration-200">
      {isLocked && (
        resolvedShell === 'windows' ? (
          <WindowsLockScreen onUnlock={handleUnlock} />
        ) : (
          <AndroidLockScreen onUnlock={handleUnlock} />
        )
      )}
      {resolvedShell === 'windows' ? <WindowsShell /> : <AndroidShell />}
    </main>
  );
};
