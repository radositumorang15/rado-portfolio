export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  active: boolean;
  trail: { x: number; y: number }[];
}

export interface Bumper {
  id: number;
  x: number;
  y: number;
  radius: number;
  hits: number;
  shockwaveTimer: number; // ms countdown
}

export interface DropTarget {
  id: string;
  char: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hit: boolean;
}

export interface Flipper {
  x: number;
  y: number;
  length: number;
  angle: number; // current angle in radians
  restAngle: number;
  upAngle: number;
  isUp: boolean;
}

export interface PinballState {
  score: number;
  highScore: number;
  ballsLeft: number;
  multiplier: number;
  multiplierTimer: number;
  isGameOver: boolean;
  isBallSaverActive: boolean;
  ballSaverTimer: number;
  isTilted: boolean;
  nudgeCount: number;
  shakeOffset: { x: number; y: number };
}

export const TABLE_WIDTH = 360;
export const TABLE_HEIGHT = 540;
export const GRAVITY = 0.28;
export const DAMPING = 0.985;
export const MAX_BALLS = 3;

