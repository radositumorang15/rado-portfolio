import React from 'react';

export const PixelPinballIconGraphic: React.FC<{ filterId: string }> = ({ filterId }) => (
  <>
    <defs>
      <linearGradient id="andPinballBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="100%" stopColor="#3B0764" />
      </linearGradient>
      <linearGradient id="andBallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#00F0FF" />
        <stop offset="100%" stopColor="#0078D4" />
      </linearGradient>
    </defs>
    <rect width="108" height="108" fill="url(#andPinballBg)" />
    <g filter={`url(#${filterId})`}>
      <circle cx="38" cy="38" r="10" fill="#1E1B4B" stroke="#00F0FF" strokeWidth="3" />
      <circle cx="70" cy="38" r="10" fill="#1E1B4B" stroke="#FF007F" strokeWidth="3" />
      <circle cx="54" cy="54" r="8" fill="#1E1B4B" stroke="#FFB800" strokeWidth="2.5" />
      <path d="M26 84 L48 76" stroke="#FF007F" strokeWidth="7" strokeLinecap="round" />
      <circle cx="26" cy="84" r="4" fill="#FFFFFF" />
      <path d="M82 84 L60 76" stroke="#FF007F" strokeWidth="7" strokeLinecap="round" />
      <circle cx="82" cy="84" r="4" fill="#FFFFFF" />
      <circle cx="54" cy="32" r="9" fill="url(#andBallGrad)" />
    </g>
  </>
);

export const PixelSnaxiaIconGraphic: React.FC<{ filterId: string }> = ({ filterId }) => (
  <>
    <defs>
      <linearGradient id="andSnaxiaBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#064E3B" />
        <stop offset="100%" stopColor="#022C22" />
      </linearGradient>
    </defs>
    <rect width="108" height="108" fill="url(#andSnaxiaBg)" />
    <g filter={`url(#${filterId})`}>
      <rect x="22" y="62" width="14" height="14" rx="4" fill="#059669" />
      <rect x="22" y="44" width="14" height="14" rx="4" fill="#10B981" />
      <rect x="40" y="44" width="14" height="14" rx="4" fill="#10B981" />
      <rect x="58" y="44" width="14" height="14" rx="4" fill="#34D399" />
      <rect x="76" y="44" width="14" height="14" rx="5" fill="#6EE7B7" />
      <circle cx="85" cy="48" r="2" fill="#022C22" />
      <circle cx="85" cy="54" r="2" fill="#022C22" />
      <circle cx="83" cy="72" r="5" fill="#FF3B30" />
    </g>
  </>
);

