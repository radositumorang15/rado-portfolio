'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { playWindowsSound } from '../../../lib/audio';

export const NotificationToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const openWindow = useWindowsStore((s) => s.openWindow);

  useEffect(() => {
    // Show toast 2.5s after desktop loads if not dismissed in this session
    const dismissed = sessionStorage.getItem('rn_toast_dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      playWindowsSound('notify');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('rn_toast_dismissed', 'true');
  };

  const handleOpenProjects = () => {
    handleDismiss();
    playWindowsSound('open');
    openWindow('projects');
  };

  if (!isVisible) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-14 right-4 z-[1350] w-84 p-3.5 rounded-xl bg-[#202020]/95 backdrop-blur-2xl border border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-right-8 duration-300 font-sans select-none"
    >
      {/* Toast Top Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-neutral-400">
        <div className="flex items-center gap-1.5 font-medium text-neutral-300">
          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] font-bold text-white">
            RN
          </div>
          <span>Rado Nelson Situmorang</span>
          <span>•</span>
          <span>Baru saja</span>
        </div>
        <button
          onClick={handleDismiss}
          className="p-1 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          title="Tutup notifikasi"
        >
          <X size={12} />
        </button>
      </div>

      {/* Toast Body */}
      <div className="mt-2.5 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shrink-0 shadow-sm text-white">
          <Sparkles size={18} />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-white leading-tight">
            Selamat Datang di Portofolio Saya!
          </h4>
          <p className="text-[11px] text-neutral-300 mt-1 leading-relaxed">
            Eksplorasi karya aplikasi web dan mobile saya melalui File Explorer & Terminal.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-end gap-2 text-xs">
        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 rounded-[4px] hover:bg-white/10 text-neutral-300 hover:text-white transition-colors font-medium text-[11px]"
        >
          Tutup
        </button>
        <button
          onClick={handleOpenProjects}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-blue-600 hover:bg-blue-500 text-white font-medium text-[11px] shadow-sm transition-colors active:scale-95"
        >
          <span>Buka Projects</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </aside>
  );
};
