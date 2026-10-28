'use client';

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { AppId } from '../../../lib/constants';

interface DockItemProps {
  id: AppId | 'start' | 'search' | 'widgets';
  label: string;
  icon: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
  isOpen?: boolean;
  isActive?: boolean;
  onClick: () => void;
}

export const DockItem: React.FC<DockItemProps> = ({
  id,
  label,
  icon: Icon,
  isOpen = false,
  isActive = false,
  onClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 667);
    onClick();
  };

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 rounded-[var(--win-control-corner-radius)] transition-all cursor-pointer select-none group ${
        isActive
          ? 'bg-white/15 shadow-xs'
          : 'hover:bg-white/10 active:bg-white/5'
      } ${isBouncing ? 'animate-taskbar-bounce' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Windows 11 Official Tooltip (4px radius rule exception) */}
      {showTooltip && (
        <div
          className="win-tooltip absolute -top-9 px-2.5 py-1 text-[11px] font-normal text-white pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-100 whitespace-nowrap"
          style={{
            borderRadius: 'var(--win-control-corner-radius)',
            backgroundColor: 'var(--win-acrylic-transient-bg)',
            border: '1px solid var(--win-surface-stroke-flyout)',
            boxShadow: 'var(--win-shadow-tooltip)',
          }}
        >
          {label}
        </div>
      )}

      {/* App Icon */}
      <div className="flex items-center justify-center text-white/90 group-hover:text-white transition-colors">
        <Icon size={20} />
      </div>

      {/* Windows 11 Running/Active Indicator Bar */}
      {isOpen && (
        <span
          className={`absolute bottom-0.5 transition-all duration-200 ${
            isActive
              ? 'w-4 h-[3px] bg-[var(--win-accent-default)] rounded-full shadow-[0_0_6px_rgba(96,205,255,0.8)]'
              : 'w-1.5 h-1.5 bg-white/60 rounded-full'
          }`}
        />
      )}
    </div>
  );
};
