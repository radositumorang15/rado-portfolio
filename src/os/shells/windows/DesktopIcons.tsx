import React from 'react';
import { AppId } from '../../../lib/constants';
import { PinballIcon, SnaxiaIcon } from '../../../apps/games/GameIcons';

export interface DesktopIconItem {
  id: AppId | 'recycle';
  label: string;
  iconSrc?: string;
  isGame?: 'pinball' | 'snaxia';
}

export const DESKTOP_ICON_LIST: DesktopIconItem[] = [
  { id: 'about', label: 'This PC', iconSrc: '/icons/win11/thispc.png' },
  { id: 'projects', label: 'Projects', iconSrc: '/icons/win11/explorer.png' },
  { id: 'experience', label: 'Experience', iconSrc: '/icons/win11/folder.png' },
  { id: 'skills', label: 'Skills', iconSrc: '/icons/win11/skills.svg' },
  { id: 'pinball', label: 'Cyber Pinball', isGame: 'pinball' },
  { id: 'snaxia', label: 'Snaxia', isGame: 'snaxia' },
  { id: 'terminal', label: 'Terminal', iconSrc: '/icons/win11/terminal.png' },
  { id: 'resume', label: 'Resume.pdf', iconSrc: '/icons/win11/notepad.png' },
  { id: 'contact', label: 'Contact', iconSrc: '/icons/win11/mail.png' },
  { id: 'recycle', label: 'Recycle Bin', iconSrc: '/icons/win11/bin0.png' },
];

interface DesktopIconsProps {
  selectedIcon: string | null;
  onIconClick: (id: string, e: React.MouseEvent) => void;
}

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ selectedIcon, onIconClick }) => {
  return (
    <div className="absolute top-10 left-3 z-10 flex flex-col gap-1">
      {DESKTOP_ICON_LIST.map((item) => (
        <div
          key={item.id}
          onClick={(e) => onIconClick(item.id, e)}
          className={`desktop-icon flex flex-col items-center justify-center w-[76px] h-[86px] p-1 rounded-[4px] cursor-pointer transition-colors ${
            selectedIcon === item.id
              ? 'bg-white/[0.12] border border-white/[0.15]'
              : 'border border-transparent hover:bg-white/[0.06] active:bg-white/[0.10]'
          }`}
        >
          {item.id === 'projects' ? (
            <div className="folder-3d-wrap my-0.5" style={{ '--h': 45 } as React.CSSProperties}>
              <div className="folder-3d scale-[0.42] -my-4 origin-center">
                <i className="fb" />
                <i className="fp p1" />
                <i className="fp p2" />
                <i className="ff" />
              </div>
            </div>
          ) : item.isGame === 'pinball' ? (
            <PinballIcon size={42} className="drop-shadow-md pointer-events-none" />
          ) : item.isGame === 'snaxia' ? (
            <SnaxiaIcon size={42} className="drop-shadow-md pointer-events-none" />
          ) : (
            <img src={item.iconSrc} alt={item.label} className="w-11 h-11 object-contain pointer-events-none drop-shadow-md" />
          )}
          <span className="text-[11px] font-normal text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] truncate max-w-[72px] text-center mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
