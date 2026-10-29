'use client';

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { AppId } from '../../../lib/constants';

interface DockItemProps {
  id: AppId | 'start' | 'search' | 'widgets' | 'github' | 'antigravity' | 'linkedin' | 'threads' | string;
  label: string;
  icon?: LucideIcon | React.ComponentType<{ size?: number; className?: string }>;
  iconSrc?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  isActive?: boolean;
  onClick: () => void;
}

export const DockItem: React.FC<DockItemProps> = ({
  id,
  label,
  icon: Icon,
  iconSrc,
  children,
  isOpen = false,
  isActive = false,
  onClick,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);
    setShowTooltip(false);
    setTimeout(() => setIsBouncing(false), 667);
    onClick();
  };

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 shrink-0 rounded-[var(--win-control-corner-radius)] transition-colors cursor-pointer select-none group pointer-events-auto ${
        isActive
          ? 'bg-white/15 shadow-inner'
          : 'hover:bg-white/10 active:bg-white/5'
      }`}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent);
        }
      }}
    >
      {/* Windows 11 Official Tooltip */}
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

      {/* App Icon: Custom Children, 3D Fluent Image, or Component */}
      <div
        className={`flex items-center justify-center transition-transform duration-150 group-active:scale-75 pointer-events-none ${
          isBouncing ? 'animate-taskbar-bounce' : ''
        }`}
      >
        {children ? (
          children
        ) : iconSrc ? (
          <img src={iconSrc} alt={label} className="w-7 h-7 object-contain pointer-events-none drop-shadow-md" />
        ) : Icon ? (
          <Icon size={20} className="text-white/90 group-hover:text-white pointer-events-none" />
        ) : null}
      </div>

      {/* Windows 11 Running/Active Indicator Pill */}
      {isOpen && (
        <span
          className={`absolute bottom-[2px] h-[3px] rounded-full transition-all duration-200 pointer-events-none ${
            isActive
              ? 'w-4 bg-[#60CDFF] shadow-[0_0_6px_rgba(96,205,255,0.8)]'
              : 'w-1.5 bg-white/50'
          }`}
        />
      )}
    </div>
  );
};
