export interface GameSettings {
  audioMuted: boolean;
  snaxiaTheme: 'cyber_dark' | 'nokia_lcd';
  snaxiaWallMode: 'box' | 'wrap';
  androidControlType: 'dpad';
}

export interface PinballStats {
  highScore: number;
  gamesPlayed: number;
  unlockedBadges: string[];
}

export interface SnaxiaStats {
  highScore: number;
  maxLength: number;
  collectedTechIcons: string[];
}

export interface GameData {
  settings: GameSettings;
  pinball: PinballStats;
  snaxia: SnaxiaStats;
}

const STORAGE_KEY = 'rado_os_games_data';

const DEFAULT_GAME_DATA: GameData = {
  settings: {
    audioMuted: false,
    snaxiaTheme: 'cyber_dark',
    snaxiaWallMode: 'wrap',
    androidControlType: 'dpad',
  },
  pinball: {
    highScore: 12500,
    gamesPlayed: 0,
    unlockedBadges: ['cadet_recruit'],
  },
  snaxia: {
    highScore: 420,
    maxLength: 12,
    collectedTechIcons: ['kotlin', 'react'],
  },
};

export function getGameData(): GameData {
  if (typeof window === 'undefined') return DEFAULT_GAME_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_GAME_DATA;
    const parsed = JSON.parse(raw);
    return {
      settings: { ...DEFAULT_GAME_DATA.settings, ...(parsed.settings || {}) },
      pinball: { ...DEFAULT_GAME_DATA.pinball, ...(parsed.pinball || {}) },
      snaxia: { ...DEFAULT_GAME_DATA.snaxia, ...(parsed.snaxia || {}) },
    };
  } catch {
    return DEFAULT_GAME_DATA;
  }
}

export function saveGameData(updater: (prev: GameData) => GameData): GameData {
  const current = getGameData();
  const next = updater(current);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }
  return next;
}

export function updatePinballScore(score: number): { isNewHigh: boolean; highScore: number } {
  const cur = getGameData();
  const isNewHigh = score > cur.pinball.highScore;
  const newHighScore = Math.max(score, cur.pinball.highScore);
  saveGameData((d) => ({
    ...d,
    pinball: {
      ...d.pinball,
      highScore: newHighScore,
      gamesPlayed: d.pinball.gamesPlayed + 1,
    },
  }));
  return { isNewHigh, highScore: newHighScore };
}

export function updateSnaxiaScore(score: number, length: number): { isNewHigh: boolean; highScore: number } {
  const cur = getGameData();
  const isNewHigh = score > cur.snaxia.highScore;
  const newHighScore = Math.max(score, cur.snaxia.highScore);
  saveGameData((d) => ({
    ...d,
    snaxia: {
      ...d.snaxia,
      highScore: newHighScore,
      maxLength: Math.max(length, d.snaxia.maxLength),
    },
  }));
  return { isNewHigh, highScore: newHighScore };
}

export function unlockSnaxiaTech(tech: string): boolean {
  const cur = getGameData();
  if (cur.snaxia.collectedTechIcons.includes(tech)) return false;
  saveGameData((d) => ({
    ...d,
    snaxia: {
      ...d.snaxia,
      collectedTechIcons: [...d.snaxia.collectedTechIcons, tech],
    },
  }));
  return true;
}

