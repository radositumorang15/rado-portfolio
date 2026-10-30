'use client';

import React from 'react';
import { Search, Sparkles, ExternalLink } from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { AppId } from '../../../lib/constants';
import { profileData } from '../../../data/profile';
import { notch } from '../../notch';
import { playWindowsSound } from '../../../lib/audio';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const openWindow = useWindowsStore((s) => s.openWindow);
  const focusWindow = useWindowsStore((s) => s.focusWindow);
  const windows = useWindowsStore((s) => s.windows);

  if (!isOpen) return null;

  const handleOpenLink = (url: string, title: string) => {
    playWindowsSound('click');
    notch.show({
      title: `Opening ${title}`,
      subtitle: url,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleAntigravityClick = () => {
    playWindowsSound('click');
    notch.show({
      title: 'Antigravity IDE 2.0',
      subtitle: 'Google Deepmind Agentic Workspace Active',
    });
    if (!windows.terminal.isOpen) {
      openWindow('terminal');
    } else {
      focusWindow('terminal');
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex justify-center items-end pb-14 select-none"
      onClick={onClose}
    >
      <div
        className="glass-flyout w-[620px] max-h-[88vh] max-w-[95vw] p-6 text-white flex flex-col justify-between gap-5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 overflow-y-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. SEARCH HEADER */}
        <div className="flex flex-col gap-4">
          <div
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="flex items-center gap-2.5 px-4 h-9 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 cursor-pointer text-xs text-white/60 transition-colors shadow-xs"
          >
            <Search size={14} className="text-white/60" />
            <span>Search apps, projects, tools... (Ctrl+K)</span>
          </div>

          {/* 2. PINNED APPS (ALL TRUE 3D ICONS) */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-white/80 px-1">
              <span>Pinned</span>
              <span className="text-[11px] text-blue-400 font-normal">All apps ›</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 py-1">
              {/* Projects / File Explorer */}
              <button
                onClick={() => { openWindow('projects'); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/explorer.png" alt="Projects" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Projects</span>
              </button>

              {/* Figma (True 3D) */}
              <button
                onClick={() => handleOpenLink('https://www.figma.com', 'Figma Design')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/figma.png" alt="Figma" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Figma</span>
              </button>

              {/* Google Chrome (True 3D Sphere) */}
              <button
                onClick={() => handleOpenLink('https://www.google.com', 'Google Chrome')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/chrome.png" alt="Chrome" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Chrome</span>
              </button>

              {/* Antigravity IDE (True 3D Official) */}
              <button
                onClick={handleAntigravityClick}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/antigravity.png" alt="Antigravity" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Antigravity</span>
              </button>

              {/* Android Studio (True 3D Official) */}
              <button
                onClick={() => { openWindow('androidstudio'); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/androidstudio.png" alt="Android Studio" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Android Studio</span>
              </button>

              {/* GitHub Desktop (True 3D) */}
              <button
                onClick={() => handleOpenLink(profileData.github, 'GitHub')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/github.png" alt="GitHub" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">GitHub</span>
              </button>

              {/* This PC */}
              <button
                onClick={() => { openWindow('about'); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/thispc.png" alt="About" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">This PC</span>
              </button>

              {/* Terminal */}
              <button
                onClick={() => { openWindow('terminal'); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/terminal.png" alt="Terminal" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Terminal</span>
              </button>

              {/* Skills */}
              <button
                onClick={() => { openWindow('skills'); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/skills.svg" alt="Skills" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Skills</span>
              </button>

              {/* Experience */}
              <button
                onClick={() => { openWindow('experience'); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/folder.png" alt="Experience" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Experience</span>
              </button>

              {/* Contact / Mail */}
              <button
                onClick={() => { openWindow('contact'); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/mail.png" alt="Contact" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Contact</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => { openWindow('settings'); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/10 transition-transform active:scale-95 group"
              >
                <img src="/icons/win11/settings.png" alt="Settings" className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                <span className="text-xs text-white/80 group-hover:text-white truncate max-w-[90px]">Settings</span>
              </button>
            </div>
          </div>

          {/* 3. RECOMMENDED SECTION (DEVELOPER WORKSPACE) */}
          <div className="flex flex-col gap-2 mt-1">
            <span className="text-xs font-semibold text-white/80 px-1">Recommended</span>
            <div className="grid grid-cols-2 gap-2 text-left">
              <div
                onClick={() => handleOpenLink('https://github.dev/radositumorang15/rado-portfolio', 'VS Code Web')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 transition-colors group"
              >
                <img src="/icons/win11/vscode.png" alt="VS Code" className="w-8 h-8 object-contain shrink-0 drop-shadow-sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">Visual Studio Code</p>
                  <p className="text-[11px] text-white/50 truncate">Interactive Web Workspace</p>
                </div>
                <ExternalLink size={12} className="text-white/40 group-hover:text-white shrink-0 mr-1" />
              </div>

              <div
                onClick={() => handleOpenLink(profileData.github, 'GitHub')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 transition-colors group"
              >
                <img src="/icons/win11/github.png" alt="GitHub" className="w-8 h-8 object-contain shrink-0 drop-shadow-sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">GitHub / radositumorang15</p>
                  <p className="text-[11px] text-white/50 truncate">Source Repositories</p>
                </div>
                <ExternalLink size={12} className="text-white/40 group-hover:text-white shrink-0 mr-1" />
              </div>

              <div
                onClick={() => handleOpenLink('https://www.figma.com', 'Figma Design')}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 transition-colors group"
              >
                <img src="/icons/win11/figma.png" alt="Figma" className="w-8 h-8 object-contain shrink-0 drop-shadow-sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">Figma UI Systems</p>
                  <p className="text-[11px] text-white/50 truncate">Design Components & Flows</p>
                </div>
                <ExternalLink size={12} className="text-white/40 group-hover:text-white shrink-0 mr-1" />
              </div>

              <div
                onClick={handleAntigravityClick}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer border border-white/5 transition-colors group"
              >
                <img src="/icons/win11/antigravity.png" alt="Antigravity" className="w-8 h-8 object-contain shrink-0 drop-shadow-sm" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">Antigravity IDE 2.0</p>
                  <p className="text-[11px] text-white/50 truncate">Deepmind Agentic Assistant</p>
                </div>
                <ExternalLink size={12} className="text-white/40 group-hover:text-white shrink-0 mr-1" />
              </div>
            </div>
          </div>
        </div>

        {/* 4. FOOTER USER PROFILE */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2.5">
            <img
              src="/profile.jpeg"
              alt={profileData.name}
              className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-md shrink-0"
            />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">{profileData.name}</p>
              <p className="text-[10px] text-white/60">Mobile Developer</p>
            </div>
          </div>

          <button
            onClick={() => {
              openWindow('contact');
              onClose();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors shadow-xs cursor-pointer"
          >
            <Sparkles size={13} />
            <span>Contact Me</span>
          </button>
        </div>
      </div>
    </div>
  );
};
