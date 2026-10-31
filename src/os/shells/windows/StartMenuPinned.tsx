import React from 'react';
import { useWindowsStore } from '../../../store/windows';
import { PinballIcon, SnaxiaIcon } from '../../../apps/games/GameIcons';
import { profileData } from '../../../data/profile';

interface StartMenuPinnedProps {
  onClose: () => void;
  onOpenLink: (url: string, title: string) => void;
  onAntigravityClick: () => void;
}

export const StartMenuPinned: React.FC<StartMenuPinnedProps> = ({
  onClose, onOpenLink, onAntigravityClick,
}) => {
  const openWindow = useWindowsStore((s) => s.openWindow);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-semibold text-white/80 px-1">
        <span>Pinned</span>
        <span className="text-[11px] text-blue-400 font-normal">All apps ›</span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 py-1">
        <button
          onClick={() => { openWindow('projects'); onClose(); }}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/explorer.png" alt="Projects" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Projects</span>
        </button>

        <button
          onClick={() => { openWindow('pinball'); onClose(); }}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <PinballIcon size={38} className="drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Pinball</span>
        </button>

        <button
          onClick={() => { openWindow('snaxia'); onClose(); }}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <SnaxiaIcon size={38} className="drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Snaxia</span>
        </button>

        <button
          onClick={() => { openWindow('about'); onClose(); }}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/thispc.png" alt="About" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">This PC</span>
        </button>

        <button
          onClick={() => { openWindow('terminal'); onClose(); }}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/terminal.png" alt="Terminal" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Terminal</span>
        </button>

        <button
          onClick={() => { openWindow('skills'); onClose(); }}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/skills.svg" alt="Skills" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Skills</span>
        </button>

        <button
          onClick={() => { openWindow('androidstudio'); onClose(); }}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/androidstudio.png" alt="Android Studio" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Android</span>
        </button>

        <button
          onClick={() => { openWindow('experience'); onClose(); }}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/folder.png" alt="Experience" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Experience</span>
        </button>

        <button
          onClick={() => onOpenLink('https://www.figma.com', 'Figma Design')}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/figma.png" alt="Figma" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Figma</span>
        </button>

        <button
          onClick={() => onOpenLink('https://www.google.com', 'Google Chrome')}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/chrome.png" alt="Chrome" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Chrome</span>
        </button>

        <button
          onClick={onAntigravityClick}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/antigravity.png" alt="Antigravity" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">Antigravity</span>
        </button>

        <button
          onClick={() => onOpenLink(profileData.github, 'GitHub')}
          className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group cursor-pointer"
        >
          <img src="/icons/win11/github.png" alt="GitHub" className="w-9 h-9 object-contain drop-shadow-md group-hover:scale-105" />
          <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[80px]">GitHub</span>
        </button>
      </div>
    </div>
  );
};
