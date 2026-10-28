import React from 'react';

export const PixelWallpaper: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[var(--m3-bg)]">
      {/* Ambient Pixel Blur Canvas */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-85"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1080 2400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="pixelAura1" cx="30%" cy="20%" r="50%">
            <stop offset="0%" stopColor="#3874CB" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#1E3E6E" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0E141B" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="pixelAura2" cx="75%" cy="75%" r="55%">
            <stop offset="0%" stopColor="#4F378B" stopOpacity="0.38" />
            <stop offset="60%" stopColor="#252A4A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0E141B" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="pixelWave" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E4976" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#0E2845" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0E141B" stopOpacity="0" />
          </linearGradient>

          <filter id="pixelGlassBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="70" />
          </filter>
        </defs>

        {/* Dynamic Glow Circles */}
        <circle cx="350" cy="500" r="480" fill="url(#pixelAura1)" filter="url(#pixelGlassBlur)" />
        <circle cx="750" cy="1700" r="550" fill="url(#pixelAura2)" filter="url(#pixelGlassBlur)" />

        {/* Ambient Organic Fluid Wave */}
        <path
          d="M 0 1200 C 300 1000 600 1400 1080 1150 L 1080 2400 L 0 2400 Z"
          fill="url(#pixelWave)"
          opacity="0.6"
        />
      </svg>

      {/* Subtle Grain Overlay for Organic Material Depth */}
      <div className="absolute inset-0 bg-radial from-transparent via-[var(--m3-bg)]/20 to-[var(--m3-bg)]/80 pointer-events-none" />
    </div>
  );
};
