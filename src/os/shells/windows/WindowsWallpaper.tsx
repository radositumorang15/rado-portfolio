import React from 'react';

export const WindowsWallpaper: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#060a14]">
      {/* Windows 11 Wallpaper */}
      <img
        src="/windowswall.png"
        alt="Windows Wallpaper"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Subtle bottom vignette to ensure taskbar readability */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
};
