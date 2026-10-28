'use client';

import React, { useState, useEffect } from 'react';
import { usePrefsStore } from '../store/prefs';
import { useWindowsStore } from '../store/windows';
import { WindowsShell } from './shells/windows';
import { AndroidShell } from './shells/android';
import { AppId, APP_IDS } from '../lib/constants';
import { notch } from './notch';

export const OSRoot: React.FC = () => {
  const resolvedShell = usePrefsStore((s) => s.resolvedShell);
  const syncFromDOM = usePrefsStore((s) => s.syncFromDOM);
  const updateResponsiveShell = usePrefsStore((s) => s.updateResponsiveShell);
  const openWindow = useWindowsStore((s) => s.openWindow);

  const [isBooting, setIsBooting] = useState<boolean>(true);

  // Responsive shell auto-detection on resize
  useEffect(() => {
    syncFromDOM();

    const handleResize = () => {
      updateResponsiveShell();
    };

    const mediaQuery = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
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

  // Check session boot status
  useEffect(() => {
    const hasBooted = sessionStorage.getItem('rn_booted');
    if (hasBooted) {
      setIsBooting(false);
    } else {
      const timer = setTimeout(() => {
        setIsBooting(false);
        sessionStorage.setItem('rn_booted', 'true');
        notch.show({
          title: 'Welcome to RadoOS',
          subtitle: 'Double click icons or open Start Menu to explore',
          duration: 3500,
        });
      }, 1100);
      return () => clearTimeout(timer);
    }
  }, []);

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
        onClick={() => setIsBooting(false)}
        className="fixed inset-0 z-[2000] bg-neutral-950 flex flex-col items-center justify-center text-white cursor-pointer select-none"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-2xl font-bold shadow-[0_0_30px_rgba(37,99,235,0.4)] animate-pulse">
          RN
        </div>
        <div className="mt-6 flex flex-col items-center gap-1.5">
          <h1 className="text-sm font-semibold tracking-wide">RadoOS</h1>
          <div className="w-24 h-1 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-indeterminate" />
          </div>
          <span className="text-[10px] text-white/40 mt-1">Starting user session... (click to skip)</span>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full h-full transition-opacity duration-200">
      {resolvedShell === 'windows' ? <WindowsShell /> : <AndroidShell />}
    </main>
  );
};
