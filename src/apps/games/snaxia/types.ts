export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Point {
  x: number;
  y: number;
}

export type WallMode = 'box' | 'wrap';
export type ThemeMode = 'cyber_dark' | 'nokia_lcd';

export interface BugItem extends Point {
  timer: number;
  maxTimer: number;
}

export interface TechItem extends Point {
  name: string;
}

export interface SnaxiaState {
  snake: Point[];
  direction: Direction;
  food: Point;
  bug: BugItem | null;
  techItem: TechItem | null;
  score: number;
  highScore: number;
  speedLevel: number;
  tickMs: number;
  isGameOver: boolean;
  isPaused: boolean;
  wallMode: WallMode;
  theme: ThemeMode;
  unlockedTech: string[];
}

export const GRID_SIZE = 20;
export const INITIAL_TICK_MS = 130;
export const MIN_TICK_MS = 60;
export const TICK_ACCEL_MS = 4;
export const BUG_DURATION = 6.0;

export const TECH_LIST = ['Kotlin', 'Flutter', 'React', 'TypeScript', 'Next.js', 'Rust'];

