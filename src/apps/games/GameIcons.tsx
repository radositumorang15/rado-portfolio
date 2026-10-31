import React from 'react';

export const PinballIcon: React.FC<{ size?: number; className?: string }> = ({ size = 44, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 108 108"
    className={`select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="pinballBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#3B0764" />
      </linearGradient>
      <linearGradient id="ballGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#00F0FF" />
        <stop offset="100%" stopColor="#0078D4" />
      </linearGradient>
      <filter id="glowBall" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00F0FF" floodOpacity="0.8" />
      </filter>
    </defs>
    <rect width="108" height="108" rx="24" fill="url(#pinballBg)" />
    {/* Inner cyber frame */}
    <rect x="8" y="8" width="92" height="92" rx="18" stroke="#00F0FF" strokeWidth="2" strokeOpacity="0.3" />
    {/* Pop Bumpers */}
    <circle cx="38" cy="38" r="10" fill="#1E1B4B" stroke="#00F0FF" strokeWidth="2.5" />
    <circle cx="70" cy="38" r="10" fill="#1E1B4B" stroke="#FF007F" strokeWidth="2.5" />
    <circle cx="54" cy="54" r="8" fill="#1E1B4B" stroke="#FFB800" strokeWidth="2" />
    {/* Flippers */}
    <path d="M26 84 L48 76" stroke="#FF007F" strokeWidth="7" strokeLinecap="round" />
    <circle cx="26" cy="84" r="4" fill="#FFFFFF" />
    <path d="M82 84 L60 76" stroke="#FF007F" strokeWidth="7" strokeLinecap="round" />
    <circle cx="82" cy="84" r="4" fill="#FFFFFF" />
    {/* Ball */}
    <circle cx="54" cy="32" r="9" fill="url(#ballGrad)" filter="url(#glowBall)" />
  </svg>
);

export const SnaxiaIcon: React.FC<{ size?: number; className?: string }> = ({ size = 44, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 108 108"
    className={`select-none shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="snaxiaBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#022C22" />
      </linearGradient>
      <filter id="glowFood" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FF3B30" floodOpacity="0.9" />
      </filter>
    </defs>
    <rect width="108" height="108" rx="24" fill="url(#snaxiaBg)" />
    {/* Grid hints */}
    <rect x="8" y="8" width="92" height="92" rx="18" stroke="#10B981" strokeWidth="2" strokeOpacity="0.25" />
    {/* Snake Body segments */}
    <rect x="22" y="62" width="14" height="14" rx="4" fill="#059669" />
    <rect x="22" y="44" width="14" height="14" rx="4" fill="#10B981" />
    <rect x="40" y="44" width="14" height="14" rx="4" fill="#10B981" />
    <rect x="58" y="44" width="14" height="14" rx="4" fill="#34D399" />
    {/* Head with eyes */}
    <rect x="76" y="44" width="14" height="14" rx="5" fill="#6EE7B7" />
    <circle cx="85" cy="48" r="2" fill="#022C22" />
    <circle cx="85" cy="54" r="2" fill="#022C22" />
    {/* Target Food */}
    <circle cx="83" cy="72" r="5" fill="#FF3B30" filter="url(#glowFood)" />
  </svg>
);
