'use client';

import React, { useState } from 'react';
import { INSTALLED_SKILLS, INSTALLING_SKILLS } from './data';
import { SkillsInstalledTab } from './SkillsInstalledTab';
import { SkillsConnectionsTab } from './SkillsConnectionsTab';
import { SkillsQueueTab } from './SkillsQueueTab';
import { Layers, Network, DownloadCloud } from 'lucide-react';
import { Skill } from '../../data/types';

interface SkillsViewProps {
  skills?: Skill[];
  onOpenProject?: (url: string, name: string) => void;
}

type TabType = 'installed' | 'connections' | 'queue';

export const SkillsView: React.FC<SkillsViewProps> = ({ onOpenProject }) => {
  const [activeTab, setActiveTab] = useState<TabType>('installed');

  return (
    <div className="flex flex-col h-full w-full select-none text-white font-sans bg-[#1f2227]/95">
      {/* 1. Header (Windows 11 Settings > Apps > Installed apps style) */}
      <div className="px-6 pt-5 pb-0 border-b border-white/10 shrink-0 bg-[#262930]/80 backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white m-0">
              Skills: Installed Apps
            </h1>
            <p className="text-xs text-white/60 mt-1 m-0">
              What I&apos;ve actually shipped with on GitHub, and what&apos;s still installing.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono">{INSTALLED_SKILLS.length} Installed</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setActiveTab('installed')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all relative cursor-pointer ${
              activeTab === 'installed'
                ? 'text-white bg-white/10 border-t-2 border-t-blue-500'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers size={14} className={activeTab === 'installed' ? 'text-blue-400' : ''} />
            <span>Installed</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] font-mono">
              {INSTALLED_SKILLS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('connections')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all relative cursor-pointer ${
              activeTab === 'connections'
                ? 'text-white bg-white/10 border-t-2 border-t-blue-500'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Network size={14} className={activeTab === 'connections' ? 'text-blue-400' : ''} />
            <span>Connections</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-semibold transition-all relative cursor-pointer ${
              activeTab === 'queue'
                ? 'text-white bg-white/10 border-t-2 border-t-blue-500'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <DownloadCloud size={14} className={activeTab === 'queue' ? 'text-blue-400' : ''} />
            <span>Installing</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono">
              {INSTALLING_SKILLS.length}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Scrollable Tab Pane */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        {activeTab === 'installed' && (
          <SkillsInstalledTab onOpenProject={onOpenProject} />
        )}
        {activeTab === 'connections' && <SkillsConnectionsTab />}
        {activeTab === 'queue' && <SkillsQueueTab />}
      </div>
    </div>
  );
};
