'use client';

import React from 'react';
import { FileText, Download, Award, Github } from 'lucide-react';
import { useWindowsStore } from '../../store/windows';

interface NotchShelfTabProps {
  onDismiss: () => void;
}

export const NotchShelfTab: React.FC<NotchShelfTabProps> = ({ onDismiss }) => {
  const openWindow = useWindowsStore((s) => s.openWindow);

  const items = [
    { title: 'CV_Rado_Nelson.pdf', desc: 'Updated Resume', icon: FileText, action: () => openWindow('resume') },
    { title: 'Bangkit Certificate', desc: 'Mobile Cohort 2024', icon: Award, action: () => openWindow('experience') },
    { title: 'GitHub Portfolio Repo', desc: 'Source Code', icon: Github, action: () => window.open('https://github.com/radositumorang15/rado-portfolio', '_blank') },
  ];

  return (
    <div className="w-full flex flex-col gap-1.5 px-3 py-1">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            onClick={() => {
              item.action();
              onDismiss();
            }}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Icon size={14} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate font-medium">{item.title}</p>
              <p className="text-[10px] text-white/50 truncate">{item.desc}</p>
            </div>
            <Download size={12} className="text-white/40" />
          </div>
        );
      })}
    </div>
  );
};

