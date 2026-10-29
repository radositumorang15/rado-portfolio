import React from 'react';

export const PixelWallpaper: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[var(--m3-bg)]">
      {/* Pixel Wallpaper Image */}
      <img
        src="/pixel.jpg"
        alt="Google Pixel Wallpaper"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Subtle Ambient Vignette for Optimal UI & Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
};
