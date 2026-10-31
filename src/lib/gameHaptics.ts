// Web Vibration API haptics helper with safe fallback
export const gameHaptics = {
  bumperHit: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(15);
    }
  },
  snaxiaEat: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(25);
    }
  },
  gameOver: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([50, 30, 80]);
    }
  },
  plungerLaunch: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(20);
    }
  },
  techUnlock: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([30, 40, 30]);
    }
  },
};

