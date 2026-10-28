'use client';

import React from 'react';
import { Download, Mail, ExternalLink, MapPin } from 'lucide-react';
import { useWindowsStore } from '../../store/windows';

interface NotchStatusTabProps {
  onDismiss: () => void;
}

export const NotchStatusTab: React.FC<NotchStatusTabProps> = ({ onDismiss }) => {
  const openWindow = useWindowsStore((s) => s.openWindow);

  return (
    <div className="w-full flex flex-col gap-3 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-xs font-semibold text-white tracking-wide">Available for Work</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-white/60">
          <MapPin size={12} />
          <span>Surakarta, ID</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-1">
        <button
          onClick={() => {
            openWindow('resume');
            onDismiss();
          }}
          className="nx-btn flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg"
        >
          <Download size={13} />
          <span>Download CV</span>
        </button>

        <button
          onClick={() => {
            openWindow('contact');
            onDismiss();
          }}
          className="nx-btn flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
        >
          <Mail size={13} />
          <span>Contact Me</span>
        </button>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] text-white/60">
        <span>Now building: <strong className="text-white/90">CV Mariban Website</strong></span>
        <button
          onClick={() => {
            openWindow('projects');
            onDismiss();
          }}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <span>View</span>
          <ExternalLink size={10} />
        </button>
      </div>
    </div>
  );
};

