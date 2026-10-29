'use client';

import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
  parallaxX?: number;
  parallaxY?: number;
}

export interface ThemeConfig {
  id?: string;
  accent?: string;
  iconOverrides?: Record<string, string>;
}

/**
 * Standardized Squircle Tile Container (from rust-floatdock)
 * Provides 1px specular highlight, 8-10% inner depth gradient, and 0 4px 10px soft shadow.
 */
export const SquircleTile: React.FC<{
  size?: number;
  bgGradient: string;
  className?: string;
  parallaxX?: number;
  parallaxY?: number;
  children: React.ReactNode;
}> = ({
  size = 44,
  bgGradient,
  className = '',
  parallaxX = 0,
  parallaxY = 0,
  children,
}) => {
  const clampedX = Math.max(-2, Math.min(2, parallaxX));
  const clampedY = Math.max(-2, Math.min(2, parallaxY));

  return (
    <div
      className={`squircle-icon-tile ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: bgGradient,
      }}
    >
      <div
        className="icon-glyph-parallax"
        style={{
          transform: `translate3d(${clampedX}px, ${clampedY}px, 0)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

// ==========================================
// 1. BUILT-IN APPLICATION ICONS (Fluent Color / 3D)
// ==========================================

export const ExplorerIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #FCD34D 0%, #D97706 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
      <path d="M4 8C4 6.89543 4.89543 6 6 6H13.2C14.0485 6 14.8622 6.33714 15.4627 6.9377L17.0627 8.5377C17.6633 9.13826 18.477 9.4754 19.3255 9.4754H26C27.1046 9.4754 28 10.37 28 11.4754V21C28 22.1046 27.1046 23 26 23H6C4.89543 23 4 22.1046 4 21V8Z" fill="#B45309" fillOpacity="0.4" />
      <rect x="7" y="10" width="18" height="12" rx="1.5" fill="#E0F2FE" />
      <rect x="10" y="13" width="7" height="2" rx="1" fill="#0284C7" />
      <rect x="10" y="17" width="12" height="2" rx="1" fill="#BAE6FD" />
      <path d="M3 13.5C3 12.3954 3.89543 11.5 5 11.5H27C28.1046 11.5 29 12.3954 29 13.5V23C29 24.1046 28.1046 25 27 25H5C3.89543 25 3 24.1046 3 23V13.5Z" fill="url(#exp_front)" />
      <defs>
        <linearGradient id="exp_front" x1="16" y1="11.5" x2="16" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  </SquircleTile>
);

export const TerminalIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #1E222A 0%, #0F1216 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.68} height={size * 0.68} viewBox="0 0 32 32" fill="none">
      <rect x="5" y="6" width="22" height="20" rx="3" fill="#0C0E12" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <path d="M9 11L14 16L9 21" stroke="#38BDF8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="21" x2="22" y2="21" stroke="#F1F5F9" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  </SquircleTile>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #64748B 0%, #334155 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.68} height={size * 0.68} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="4.5" stroke="#FFFFFF" strokeWidth="2.5" />
      <path
        d="M16 4.5V7M16 25V27.5M4.5 16H7M25 16H27.5M7.87 7.87L9.64 9.64M22.36 22.36L24.13 24.13M7.87 24.13L9.64 22.36M22.36 9.64L24.13 7.87"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  </SquircleTile>
);

// ==========================================
// 2. THIRD-PARTY DEVELOPER APPS (FIGMA, CHROME, ANTIGRAVITY, VSCODE, GITHUB)
// ==========================================

export const ChromeIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #FFFFFF 0%, #F1F5F9 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
      <path d="M16 5C19.8 5 23.2 7 25 10.2L19.4 19.8C18.6 18.7 17.4 18 16 18H5.5C6.7 10.5 13.2 5 16 5Z" fill="#EA4335" />
      <path d="M26.8 13.5C27.6 15.2 28 17 28 19C28 24.5 24.3 29.1 19.3 30.5L13.8 21C14.5 21.6 15.4 22 16.5 22C18.2 22 19.7 20.9 20.3 19.3L26.8 13.5Z" fill="#FBBC05" />
      <path d="M5.5 18H16.8L11.2 27.6C6.8 25.8 4 21.3 4 16C4 14.3 4.4 12.6 5.1 11L10.6 20.5C10.8 21.6 11.7 22.5 12.8 22.8L5.5 18Z" fill="#34A853" />
      <circle cx="16" cy="16" r="6" fill="#FFFFFF" />
      <circle cx="16" cy="16" r="4.6" fill="#4285F4" />
    </svg>
  </SquircleTile>
);

export const GitHubIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #24292F 0%, #0F1419 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 32 32" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 5C9.9 5 5 9.9 5 16C5 20.9 8.2 25 12.6 26.5C13.2 26.6 13.4 26.2 13.4 25.9C13.4 25.6 13.4 24.8 13.4 23.8C10.3 24.5 9.7 22.3 9.7 22.3C9.2 21 8.5 20.7 8.5 20.7C7.5 20 8.6 20 8.6 20C9.7 20.1 10.3 21.2 10.3 21.2C11.3 22.9 12.9 22.4 13.5 22.1C13.6 21.4 13.9 20.9 14.2 20.6C11.7 20.3 9.1 19.3 9.1 15C9.1 13.8 9.5 12.8 10.2 12C10.1 11.7 9.7 10.6 10.3 9.1C10.3 9.1 11.2 8.8 13.3 10.2C14.2 10 15.1 9.9 16 9.9C16.9 9.9 17.8 10 18.7 10.2C20.8 8.8 21.7 9.1 21.7 9.1C22.3 10.6 21.9 11.7 21.8 12C22.5 12.8 22.9 13.8 22.9 15C22.9 19.3 20.3 20.3 17.8 20.6C18.2 21 18.6 21.7 18.6 22.8C18.6 24.4 18.6 25.6 18.6 25.9C18.6 26.2 18.8 26.6 19.4 26.5C23.8 25 27 20.9 27 16C27 9.9 22.1 5 16 5Z"
        fill="#FFFFFF"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
      />
    </svg>
  </SquircleTile>
);

export const AntigravityIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #1E1B4B 0%, #0F172A 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="agy_grad" x1="16" y1="5" x2="16" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.5" stopColor="#38BDF8" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <path d="M16 6L26 25H21.5L16 14L10.5 25H6L16 6Z" fill="url(#agy_grad)" filter="drop-shadow(0 0 6px rgba(56,189,248,0.5))" />
      <path d="M12.5 20.5H19.5L16 13.5L12.5 20.5Z" fill="#0F172A" />
      <circle cx="16" cy="18" r="1.8" fill="#38BDF8" />
    </svg>
  </SquircleTile>
);

export const VSCodeIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #0284C7 0%, #0369A1 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 32 32" fill="none">
      <path d="M23.5 4.5L16.2 11.2L9.8 6.2L6 8.2V23.8L9.8 25.8L16.2 20.8L23.5 27.5L27 25.5V6.5L23.5 4.5Z" fill="#38BDF8" fillOpacity="0.3" />
      <path d="M23.5 4.5L16.2 11.2L9.8 6.2L6 8.2V23.8L9.8 25.8L16.2 20.8L23.5 27.5L26 25.5V6.5L23.5 4.5Z" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.8 6.2L23.5 16L9.8 25.8" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </SquircleTile>
);

export const FigmaIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #18181B 0%, #09090B 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.68} height={size * 0.68} viewBox="0 0 32 32" fill="none">
      <rect x="9" y="5" width="7" height="7" rx="3.5" fill="#F24E1E" />
      <rect x="16" y="5" width="7" height="7" rx="3.5" fill="#FF7262" />
      <rect x="9" y="12" width="7" height="7" rx="3.5" fill="#A259FF" />
      <circle cx="19.5" cy="15.5" r="3.5" fill="#1ABCFE" />
      <path d="M9 19H12.5C14.433 19 16 20.567 16 22.5C16 24.433 14.433 26 12.5 26C10.567 26 9 24.433 9 22.5V19Z" fill="#0ACF83" />
    </svg>
  </SquircleTile>
);

export const NotesIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #FBBF24 0%, #D97706 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.68} height={size * 0.68} viewBox="0 0 32 32" fill="none">
      <rect x="6" y="5" width="20" height="23" rx="2.5" fill="#FFFFFF" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.2))" />
      <rect x="12" y="4" width="8" height="3" rx="1.5" fill="#D97706" />
      <rect x="10" y="11" width="12" height="2" rx="1" fill="#F59E0B" />
      <rect x="10" y="16" width="12" height="2" rx="1" fill="#FCD34D" />
      <rect x="10" y="21" width="8" height="2" rx="1" fill="#FDE68A" />
    </svg>
  </SquircleTile>
);

export const EmailIcon: React.FC<IconProps> = ({ size = 44, parallaxX = 0, parallaxY = 0 }) => (
  <SquircleTile size={size} bgGradient="linear-gradient(145deg, #3B82F6 0%, #1D4ED8 100%)" parallaxX={parallaxX} parallaxY={parallaxY}>
    <svg width={size * 0.68} height={size * 0.68} viewBox="0 0 32 32" fill="none">
      <rect x="5" y="8" width="22" height="16" rx="2.5" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
      <path d="M6 10L16 17.5L26 10" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </SquircleTile>
);

export const AppIconRenderer: React.FC<{
  iconName: string;
  size?: number;
  className?: string;
  theme?: ThemeConfig;
  parallaxX?: number;
  parallaxY?: number;
}> = ({
  iconName,
  size = 44,
  className = '',
  theme,
  parallaxX = 0,
  parallaxY = 0,
}) => {
  const effectiveName = theme?.iconOverrides?.[iconName] || iconName;

  switch (effectiveName.toLowerCase()) {
    case 'explorer':
      return <ExplorerIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'chrome':
      return <ChromeIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'github':
    case 'githubdesktop':
      return <GitHubIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'terminal':
    case 'cmd':
      return <TerminalIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'antigravity':
      return <AntigravityIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'vscode':
    case 'code':
      return <VSCodeIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'figma':
      return <FigmaIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'notes':
      return <NotesIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'email':
    case 'mail':
      return <EmailIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    case 'settings':
      return <SettingsIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
    default:
      return <ExplorerIcon size={size} className={className} parallaxX={parallaxX} parallaxY={parallaxY} />;
  }
};

