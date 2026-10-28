import React from 'react';

export const WindowsWallpaper: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#060a14]">
      {/* Ambient background gradients */}
      <div className="absolute inset-0 bg-radial from-[#132042] via-[#080d1e] to-[#04060c] opacity-90" />

      {/* Windows 11 Dark Bloom 3D Ribbon Layers */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-85"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bloomGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#1e3a8a" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="85%" stopColor="#1e1b4b" />
          </linearGradient>

          <linearGradient id="petalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="petalGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="45%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="highlight1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>

          <filter id="bloomBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="35" />
          </filter>
        </defs>

        {/* Ambient Bloom Light Center */}
        <circle cx="960" cy="540" r="600" fill="url(#bloomGlow1)" filter="url(#bloomBlur)" />

        {/* Petal 1: Deep Back Wing */}
        <path
          d="M 680 620 C 740 400 920 320 1150 420 C 1320 490 1380 680 1260 820 C 1140 950 820 900 680 620 Z"
          fill="url(#petalGrad1)"
          opacity="0.6"
        />

        {/* Petal 2: Left Sweeping Fold */}
        <path
          d="M 720 720 C 650 560 740 380 940 360 C 1100 350 1180 500 1120 640 C 1040 810 820 860 720 720 Z"
          fill="url(#petalGrad2)"
          opacity="0.8"
        />

        {/* Petal 3: Front Vibrant Petal */}
        <path
          d="M 850 780 C 800 620 860 460 1020 430 C 1150 410 1260 520 1200 690 C 1120 860 920 880 850 780 Z"
          fill="url(#petalGrad3)"
          opacity="0.85"
        />

        {/* Sharp Ribbon Crest Highlights */}
        <path
          d="M 750 680 Q 920 370 1100 480"
          stroke="url(#highlight1)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M 860 720 Q 980 440 1180 550"
          stroke="url(#highlight1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* Subtle bottom vignette to ensure taskbar readability */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
};

