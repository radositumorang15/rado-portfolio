'use client';

import React from 'react';
import { LucideIcon, Radio, FolderDown, Music, Activity } from 'lucide-react';
import { NotchState, NotchEvent, useNotchStore } from './notchStore';
import { NotchEyes } from './NotchEyes';
import { NotchStatusTab } from './NotchStatusTab';
import { NotchMediaTab } from './NotchMediaTab';
import { NotchShelfTab } from './NotchShelfTab';

interface NotchSlotProps {
  state: NotchState;
  platform: 'windows' | 'android';
  event?: NotchEvent | null;
  onRequestState: (state: NotchState) => void;
}

type TabId = 'status' | 'media' | 'shelf';

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'status', label: 'Status', icon: Radio },
  { id: 'media', label: 'Music', icon: Music },
  { id: 'shelf', label: 'Shelf', icon: FolderDown },
];

export const NotchSlot: React.FC<NotchSlotProps> = ({
  state,
  platform,
  event,
  onRequestState,
}) => {
  const activeTab = useNotchStore((s) => s.activeTab) as TabId;
  const setActiveTab = useNotchStore((s) => s.setActiveTab);
  const mood = useNotchStore((s) => s.mood);

  if (state === 'idle') {
    return (
      <div className="flex items-center justify-center gap-2.5 px-3 py-1.5 w-full h-full">
        <NotchEyes mood={mood} />
      </div>
    );
  }

  if (state === 'peek') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 w-full h-full nx-fade">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_#34d399]" />
        <span className="text-xs text-white/90 truncate font-medium">
          {event ? event.title : 'RadoOS • Open to work'}
        </span>
      </div>
    );
  }

  if (state === 'active' && event) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 w-full h-full nx-fade">
        <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0">
          <Activity size={18} className="text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white truncate">{event.title}</p>
          {event.subtitle && <p className="text-[11px] text-white/60 truncate">{event.subtitle}</p>}
        </div>
        {event.action && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              event.action?.onClick();
              onRequestState('idle');
            }}
            className="nx-btn text-xs px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium shrink-0"
          >
            {event.action.label}
          </button>
        )}
      </div>
    );
  }

  // Expanded View
  return (
    <div className="flex flex-col w-full h-full nx-fade select-none">
      <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                  isActive ? 'bg-white/20 text-white font-medium' : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={12} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <NotchEyes mood={mood} />
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex items-center">
        {activeTab === 'status' && <NotchStatusTab onDismiss={() => onRequestState('idle')} />}
        {activeTab === 'media' && <NotchMediaTab />}
        {activeTab === 'shelf' && <NotchShelfTab onDismiss={() => onRequestState('idle')} />}
      </div>
    </div>
  );
};

