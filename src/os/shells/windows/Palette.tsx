'use client';

import React, { useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, Monitor, Sun, Moon, Download, ExternalLink, Code2 } from 'lucide-react';
import { useWindowsStore } from '../../../store/windows';
import { usePrefsStore } from '../../../store/prefs';
import { projectsData } from '../../../data/projects';
import { skillsData } from '../../../data/skills';
import { AppId } from '../../../lib/constants';

interface PaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Palette: React.FC<PaletteProps> = ({ isOpen, onClose }) => {
  const openWindow = useWindowsStore((s) => s.openWindow);
  const setTheme = usePrefsStore((s) => s.setTheme);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectApp = (id: AppId) => {
    openWindow(id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex justify-center items-start pt-[12vh] bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-flyout w-[560px] max-w-[92vw] overflow-hidden text-white shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full flex flex-col">
          <div className="flex items-center gap-2.5 px-4 h-12 border-b border-white/10">
            <Search size={16} className="text-white/50" />
            <Command.Input
              autoFocus
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-white/40"
            />
          </div>

          <Command.List className="max-h-[360px] overflow-y-auto p-2 flex flex-col gap-1 text-xs">
            <Command.Empty className="p-4 text-center text-white/50">No results found.</Command.Empty>

            <Command.Group heading="Applications" className="px-2 py-1 text-[11px] font-semibold text-white/40">
              <Command.Item
                onSelect={() => handleSelectApp('about')}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <span>About Me</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelectApp('projects')}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <span>Projects Showcase</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelectApp('experience')}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <span>Work Experience</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelectApp('skills')}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <span>Technical Skills</span>
              </Command.Item>
              <Command.Item
                onSelect={() => handleSelectApp('terminal')}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <span>RadoOS Terminal</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Projects" className="px-2 py-1 text-[11px] font-semibold text-white/40 mt-1">
              {projectsData.map((p) => (
                <Command.Item
                  key={p.slug}
                  onSelect={() => {
                    openWindow('projects');
                    onClose();
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  <span>{p.title}</span>
                  <span className="text-[10px] text-white/40">{p.stack[0]}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Quick Actions" className="px-2 py-1 text-[11px] font-semibold text-white/40 mt-1">
              <Command.Item
                onSelect={() => {
                  openWindow('resume');
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Download size={13} />
                <span>Download Resume (CV PDF)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme('light');
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Sun size={13} />
                <span>Toggle Light Theme</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme('dark');
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Moon size={13} />
                <span>Toggle Dark Theme</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  window.location.href = '/classic';
                }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
              >
                <Monitor size={13} />
                <span>Switch to Classic View</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
