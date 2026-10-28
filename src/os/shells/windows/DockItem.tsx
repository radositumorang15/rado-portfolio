'use client';

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { AppId } from '../../../lib/constants';

interface DockItemProps {
  id: AppId | 'start' | 'search';
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

  return (
    <div
      className="dock-item flex flex-col items-center justify-center w-12 h-12 relative cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -top-10 px-2.5 py-1 text-xs font-medium text-white bg-neutral-900/90 backdrop-blur-md border border-white/10 rounded-md shadow-lg whitespace-nowrap pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150">
          {label}
        </div>
      )}

      {/* Icon Squircle */}
      <div className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-colors shadow-sm">
        <Icon size={20} />
      </div>

      {/* Active/Open Pill */}
      {isOpen && (
        <span
          className="dock-pill"
          style={{
            width: isActive ? 16 : 6,
            backgroundColor: isActive ? 'var(--rn-accent, #4C8DF6)' : 'rgba(255, 255, 255, 0.4)',
          }}
        />
      )}
    </div>
  );
};

