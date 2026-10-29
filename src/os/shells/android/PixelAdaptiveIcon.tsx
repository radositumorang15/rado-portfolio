import React from 'react';
import { AppId } from '../../../lib/constants';

export type PixelAppId = AppId;

interface PixelAdaptiveIconProps {
  id: PixelAppId;
  themed?: boolean; // false = 2.5D Full Color Pixel Icon, true = Monochrome Themed Icon
  size?: number;
}

export const PixelAdaptiveIcon: React.FC<PixelAdaptiveIconProps> = ({
  id,
  themed = false,
  size = 54,
}) => {
  // JIKA PENGGUNA MENGAKTIFKAN "THEMED ICONS" DI WALLPAPER & STYLE:
  if (themed) {
    const symbolMap: Record<PixelAppId, string> = {
      about: 'person',
      projects: 'folder_copy',
      experience: 'work',
      skills: 'auto_awesome',
      terminal: 'terminal',
      resume: 'description',
      contact: 'mail',
      settings: 'settings',
      taskmanager: 'monitoring',
    };
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] flex items-center justify-center shadow-xs group-active:scale-90 group-active:rounded-[18px] transition-all duration-300"
      >
        <span className="material-symbols-rounded text-[26px]">
          {symbolMap[id] || 'apps'}
        </span>
      </div>
    );
  }

  const filterId = `pixel25d_${id}`;

  // MODE DEFAULT PIXEL: 2.5D Multi-Layered Adaptive Icons (Full Color + Depth Shadow)
  return (
    <div
      style={{ width: size, height: size }}
      className="relative rounded-full overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.32),inset_0_1px_1px_rgba(255,255,255,0.4)] group-active:scale-90 group-active:rounded-[18px] transition-all duration-300 shrink-0"
    >
      <svg viewBox="0 0 108 108" className="w-full h-full select-none">
        <defs>
          {/* Efek Bayangan Lipatan Kertas 2.5D Khas Google Material */}
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* 1. ABOUT — Gaya Google Contacts 2.5D */}
        {id === 'about' && (
          <>
            <rect width="108" height="108" fill="#FFFFFF" />
            <g filter={`url(#${filterId})`}>
              <circle cx="54" cy="41" r="15" fill="#1A73E8" />
              <path d="M26 84 C26 67 40 60 54 60 C68 60 82 67 82 84 Z" fill="#4285F4" />
              <path d="M54 60 C68 60 82 67 82 84 L54 84 Z" fill="#1967D2" opacity="0.6" />
            </g>
          </>
        )}

        {/* 2. PROJECTS — Gaya Files by Google (4-Color Layered Folder) */}
        {id === 'projects' && (
          <>
            <rect width="108" height="108" fill="#FFFFFF" />
            <g filter={`url(#${filterId})`}>
              <path d="M24 36 C24 31.5 27.5 28 32 28 H48 L56 36 H76 C80.5 36 84 39.5 84 44 V74 C84 78.5 80.5 82 76 82 H32 C27.5 82 24 78.5 24 74 Z" fill="#FBBC04" />
              <rect x="30" y="42" width="48" height="28" rx="4" fill="#34A853" />
              <rect x="36" y="47" width="36" height="24" rx="4" fill="#EA4335" />
              <path d="M24 48 H84 V74 C84 78.5 80.5 82 76 82 H32 C27.5 82 24 78.5 24 74 Z" fill="#4285F4" />
            </g>
          </>
        )}

        {/* 3. EXPERIENCE — Gaya Google Jobs / Briefcase Layered */}
        {id === 'experience' && (
          <>
            <rect width="108" height="108" fill="#FFF8E1" />
            <g filter={`url(#${filterId})`}>
              <path d="M42 32 H66 V42 H42 Z" fill="#E37400" rx="4" />
              <rect x="24" y="38" width="60" height="44" rx="10" fill="#F9AB00" />
              <path d="M24 48 H84 V60 C84 62 68 66 54 66 C40 66 24 62 24 60 Z" fill="#FBBC04" />
              <rect x="48" y="54" width="12" height="8" rx="3" fill="#FFFFFF" />
            </g>
          </>
        )}

        {/* 4. SKILLS — Gaya Google Pixel AI Core / Gemini Sparkle 2.5D */}
        {id === 'skills' && (
          <>
            <rect width="108" height="108" fill="#F3E8FD" />
            <g filter={`url(#${filterId})`}>
              <path d="M54 20 C56 39 69 52 88 54 C69 56 56 69 54 88 C52 69 39 56 20 54 C39 52 52 39 54 20 Z" fill={`url(#geminiGrad_${id})`} />
              <defs>
                <linearGradient id={`geminiGrad_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4285F4" />
                  <stop offset="50%" stopColor="#9B72CB" />
                  <stop offset="100%" stopColor="#D96570" />
                </linearGradient>
              </defs>
            </g>
          </>
        )}

        {/* 5. TERMINAL — Gaya Android Crostini / Pixel Linux Terminal */}
        {id === 'terminal' && (
          <>
            <rect width="108" height="108" fill="#202124" />
            <g filter={`url(#${filterId})`}>
              <rect x="22" y="26" width="64" height="56" rx="10" fill="#303134" />
              <path d="M34 44 L46 54 L34 64" stroke="#34A853" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="52" y1="64" x2="68" y2="64" stroke="#8AB4F8" strokeWidth="5" strokeLinecap="round" />
            </g>
          </>
        )}

        {/* 6. RESUME — Gaya Google Docs 2.5D dengan Lipatan Kertas */}
        {id === 'resume' && (
          <>
            <rect width="108" height="108" fill="#FFFFFF" />
            <g filter={`url(#${filterId})`}>
              <path d="M32 22 H62 L78 38 V80 C78 83.3 75.3 86 72 86 H32 C28.7 86 26 83.3 26 80 V28 C26 24.7 28.7 22 32 22 Z" fill="#4285F4" />
              <path d="M62 22 L78 38 H66 C63.8 38 62 36.2 62 34 Z" fill="#A8C7FA" />
              <rect x="36" y="48" width="32" height="4" rx="2" fill="#FFFFFF" />
              <rect x="36" y="58" width="32" height="4" rx="2" fill="#FFFFFF" />
              <rect x="36" y="68" width="22" height="4" rx="2" fill="#FFFFFF" />
            </g>
          </>
        )}

        {/* 7. CONTACT — Gaya Gmail 4-Color Envelope 2.5D */}
        {id === 'contact' && (
          <>
            <rect width="108" height="108" fill="#FFFFFF" />
            <g filter={`url(#${filterId})`}>
              <path d="M22 38 V74 C22 77.3 24.7 80 28 80 H36 V48 L54 61 L72 48 V80 H80 C83.3 80 86 77.3 86 74 V38 C86 33 80 30 76 33 L54 49 L32 33 C28 30 22 33 22 38 Z" fill="#EA4335" />
              <path d="M22 38 V74 C22 77.3 24.7 80 28 80 H36 V48 Z" fill="#4285F4" />
              <path d="M86 38 V74 C86 77.3 83.3 80 80 80 H72 V48 Z" fill="#34A853" />
              <path d="M72 48 L86 38 C86 33 80 30 76 33 L54 49 V61 Z" fill="#FBBC04" />
            </g>
          </>
        )}

        {/* 8. SETTINGS — Gaya Android 16 Pixel Settings Gear */}
        {id === 'settings' && (
          <>
            <rect width="108" height="108" fill="#E8F0FE" />
            <g filter={`url(#${filterId})`}>
              <circle cx="54" cy="54" r="28" fill="#1A73E8" />
              <circle cx="54" cy="54" r="12" fill="#E8F0FE" />
            </g>
          </>
        )}

        {/* 9. TASK MANAGER — Gaya Android 16 System Health / Activity Monitor */}
        {id === 'taskmanager' && (
          <>
            <rect width="108" height="108" fill="#1E293B" />
            <g filter={`url(#${filterId})`}>
              <rect x="22" y="24" width="64" height="60" rx="12" fill="#334155" />
              <path d="M30 56 L42 56 L48 40 L56 68 L64 50 L70 56 L78 56" stroke="#38BDF8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="56" cy="68" r="3" fill="#818CF8" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};

