'use client';

import React from 'react';
import { Moon, Sun, Globe, Monitor, Zap, Wifi, Bluetooth, Flashlight } from 'lucide-react';

interface QuickShadeTilesProps {
  isWifi: boolean;
  onToggleWifi: () => void;
  isBt: boolean;
  onToggleBt: () => void;
  isTorch: boolean;
  onToggleTorch: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  language: string;
  onToggleLanguage: () => void;
  isSaver: boolean;
  onToggleSaver: () => void;
  onSwitchShell: () => void;
}

export const QuickShadeTiles: React.FC<QuickShadeTilesProps> = ({
  isWifi,
  onToggleWifi,
  isBt,
  onToggleBt,
  isTorch,
  onToggleTorch,
  isDark,
  onToggleDark,
  language,
  onToggleLanguage,
  isSaver,
  onToggleSaver,
  onSwitchShell,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {/* 1. Internet / Wi-Fi */}
      <button
        data-active={isWifi}
        onClick={onToggleWifi}
        className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer transition-all active:scale-96"
      >
        <Wifi size={18} />
        <div className="leading-tight">
          <p className="text-xs font-semibold">Internet</p>
          <p className="text-[10px] opacity-75">{isWifi ? 'Rado-WiFi (5G)' : 'Off'}</p>
        </div>
      </button>

      {/* 2. Bluetooth */}
      <button
        data-active={isBt}
        onClick={onToggleBt}
        className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer transition-all active:scale-96"
      >
        <Bluetooth size={18} />
        <div className="leading-tight">
          <p className="text-xs font-semibold">Bluetooth</p>
          <p className="text-[10px] opacity-75">{isBt ? 'Pixel Buds' : 'Off'}</p>
        </div>
      </button>

      {/* 3. Dark Theme */}
      <button
        data-active={isDark}
        onClick={onToggleDark}
        className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer transition-all active:scale-96"
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
        <div className="leading-tight">
          <p className="text-xs font-semibold">{language === 'id' ? 'Tema Gelap' : 'Dark Theme'}</p>
          <p className="text-[10px] opacity-75">{isDark ? 'Active' : 'Off'}</p>
        </div>
      </button>

      {/* 4. Flashlight / Torch */}
      <button
        data-active={isTorch}
        onClick={onToggleTorch}
        className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer transition-all active:scale-96"
      >
        <Flashlight size={18} />
        <div className="leading-tight">
          <p className="text-xs font-semibold">{language === 'id' ? 'Senter' : 'Flashlight'}</p>
          <p className="text-[10px] opacity-75">{isTorch ? 'On' : 'Off'}</p>
        </div>
      </button>

      {/* 5. Language */}
      <button
        data-active={language === 'id'}
        onClick={onToggleLanguage}
        className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer transition-all active:scale-96"
      >
        <Globe size={18} />
        <div className="leading-tight">
          <p className="text-xs font-semibold">{language === 'id' ? 'Bahasa' : 'Language'}</p>
          <p className="text-[10px] opacity-75">{language === 'id' ? 'INDONESIA' : 'ENGLISH'}</p>
        </div>
      </button>

      {/* 6. Battery Saver */}
      <button
        data-active={isSaver}
        onClick={onToggleSaver}
        className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer transition-all active:scale-96"
      >
        <Zap size={18} />
        <div className="leading-tight">
          <p className="text-xs font-semibold">{language === 'id' ? 'Hemat Baterai' : 'Battery Saver'}</p>
          <p className="text-[10px] opacity-75">{isSaver ? 'Active' : 'Off'}</p>
        </div>
      </button>

      {/* 7. Switch to Windows 11 */}
      <button
        data-active={false}
        onClick={onSwitchShell}
        className="m3-expressive-tile flex items-center gap-3 p-3.5 border border-white/10 text-left cursor-pointer col-span-2 transition-all active:scale-96"
      >
        <Monitor size={18} />
        <div className="leading-tight">
          <p className="text-xs font-semibold">Switch to Windows 11 Desktop</p>
          <p className="text-[10px] opacity-75">Switch Shell Experience</p>
        </div>
      </button>
    </div>
  );
};
