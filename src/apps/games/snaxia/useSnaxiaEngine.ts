import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Direction, Point, WallMode, ThemeMode, BugItem, TechItem,
  GRID_SIZE, INITIAL_TICK_MS, MIN_TICK_MS, TICK_ACCEL_MS, BUG_DURATION, TECH_LIST
} from './types';
import { getGameData, updateSnaxiaScore, unlockSnaxiaTech } from '../../../lib/gameStorage';
import { gameAudio } from '../../../lib/gameAudio';
import { gameHaptics } from '../../../lib/gameHaptics';
import { notch } from '../../../os/notch';

const OPPOSITE: Record<Direction, Direction> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' };

function getRandomPoint(occupied: Point[]): Point {
  let pt: Point;
  do {
    pt = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
  } while (occupied.some((o) => o.x === pt.x && o.y === pt.y));
  return pt;
}

export function useSnaxiaEngine(isFocused: boolean) {
  const saved = getGameData();
  const [theme, setTheme] = useState<ThemeMode>(saved.settings.snaxiaTheme);
  const [wallMode, setWallMode] = useState<WallMode>(saved.settings.snaxiaWallMode);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<Point>({ x: 15, y: 10 });
  const [bug, setBug] = useState<BugItem | null>(null);
  const [techItem, setTechItem] = useState<TechItem | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(saved.snaxia.highScore);
  const [unlockedTech, setUnlockedTech] = useState<string[]>(saved.snaxia.collectedTechIcons);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const inputQueue = useRef<Direction[]>([]);
  const currentDir = useRef<Direction>('RIGHT');
  const foodsEaten = useRef(0);
  const lastMilestone = useRef(0);
  const stateRef = useRef({ snake, food, bug, techItem, score, isGameOver, isPaused });
  stateRef.current = { snake, food, bug, techItem, score, isGameOver, isPaused };

  const tickMs = Math.max(MIN_TICK_MS, INITIAL_TICK_MS - Math.floor(foodsEaten.current / 5) * TICK_ACCEL_MS);
  const speedLevel = 1 + Math.floor((INITIAL_TICK_MS - tickMs) / TICK_ACCEL_MS);

  const enqueueDirection = useCallback((next: Direction) => {
    const last = inputQueue.current.length > 0 ? inputQueue.current[inputQueue.current.length - 1] : currentDir.current;
    if (next !== last && next !== OPPOSITE[last] && inputQueue.current.length < 2) {
      inputQueue.current.push(next);
    }
  }, []);

  const triggerDeath = useCallback((finalScore: number, len: number) => {
    setIsGameOver(true);
    gameAudio.gameOver();
    gameHaptics.gameOver();
    const { isNewHigh, highScore: nh } = updateSnaxiaScore(finalScore, len);
    setHighScore(nh);
    if (isNewHigh) {
      gameAudio.highScoreFanfare();
      notch.show({ title: 'New Snaxia High Score!', subtitle: `${finalScore} pts achieved!` });
    }
  }, []);

  const resetGame = useCallback(() => {
    const init = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    setSnake(init);
    setDirection('RIGHT');
    currentDir.current = 'RIGHT';
    inputQueue.current = [];
    foodsEaten.current = 0;
    lastMilestone.current = 0;
    setFood(getRandomPoint(init));
    setBug(null);
    setTechItem(null);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (isGameOver) return;
    const handleKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const c = e.code;
      let next: Direction | null = null;
      if (k === 'arrowup' || c === 'ArrowUp' || k === 'w' || c === 'KeyW') next = 'UP';
      else if (k === 'arrowdown' || c === 'ArrowDown' || k === 's' || c === 'KeyS') next = 'DOWN';
      else if (k === 'arrowleft' || c === 'ArrowLeft' || k === 'a' || c === 'KeyA') next = 'LEFT';
      else if (k === 'arrowright' || c === 'ArrowRight' || k === 'd' || c === 'KeyD') next = 'RIGHT';
      else if (k === ' ' || c === 'Space') { e.preventDefault(); setIsPaused((p) => !p); return; }
      if (next) { e.preventDefault(); enqueueDirection(next); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isGameOver, enqueueDirection]);

  useEffect(() => {
    if (isGameOver || isPaused) return;
    const timer = setInterval(() => {
      const s = stateRef.current;
      if (s.isGameOver || s.isPaused) return;

      const nextDir = inputQueue.current.shift() ?? currentDir.current;
      currentDir.current = nextDir;
      setDirection(nextDir);

      let nx = s.snake[0].x + (nextDir === 'RIGHT' ? 1 : nextDir === 'LEFT' ? -1 : 0);
      let ny = s.snake[0].y + (nextDir === 'DOWN' ? 1 : nextDir === 'UP' ? -1 : 0);

      if (wallMode === 'wrap') {
        nx = (nx + GRID_SIZE) % GRID_SIZE; ny = (ny + GRID_SIZE) % GRID_SIZE;
      } else if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE || s.snake.some((pt, i) => i > 0 && pt.x === nx && pt.y === ny)) {
        triggerDeath(s.score, s.snake.length); return;
      }

      const newSnake = [{ x: nx, y: ny }, ...s.snake];
      if (nx === s.food.x && ny === s.food.y) {
        gameAudio.snaxiaEat(); gameHaptics.snaxiaEat();
        foodsEaten.current += 1;
        const nextScore = s.score + (wallMode === 'box' ? 12 : 10);
        setScore(nextScore); setSnake(newSnake); setFood(getRandomPoint(newSnake));
        if (foodsEaten.current % 7 === 0 && !s.bug) {
          setBug({ ...getRandomPoint(newSnake), timer: BUG_DURATION, maxTimer: BUG_DURATION });
        }
        if (nextScore - lastMilestone.current >= 200) {
          lastMilestone.current = nextScore;
          const t = TECH_LIST.find((x) => !unlockedTech.includes(x)) || TECH_LIST[0];
          setTechItem({ ...getRandomPoint(newSnake), name: t });
        }
        return;
      }
      if (s.bug && nx === s.bug.x && ny === s.bug.y) {
        gameAudio.snaxiaBug(); gameHaptics.snaxiaEat();
        setScore((sc) => sc + 50); setBug(null); setSnake(newSnake); return;
      }
      if (s.techItem && nx === s.techItem.x && ny === s.techItem.y) {
        gameAudio.snaxiaBug(); gameHaptics.techUnlock();
        unlockSnaxiaTech(s.techItem.name);
        setUnlockedTech((p) => Array.from(new Set([...p, s.techItem!.name])));
        setScore((sc) => sc + 100);
        notch.show({ title: `Tech Unlocked: ${s.techItem.name}!`, subtitle: 'Easter Egg' });
        setTechItem(null); setSnake(newSnake); return;
      }
      newSnake.pop(); setSnake(newSnake);
    }, tickMs);
    return () => clearInterval(timer);
  }, [isGameOver, isPaused, tickMs, wallMode, triggerDeath, unlockedTech]);

  useEffect(() => {
    if (!bug || isGameOver || isPaused) return;
    const interval = setInterval(() => {
      setBug((b) => (b && b.timer > 0.1 ? { ...b, timer: b.timer - 0.1 } : null));
    }, 100);
    return () => clearInterval(interval);
  }, [bug, isGameOver, isPaused]);

  return {
    snake, direction, food, bug, techItem, score, highScore, speedLevel, tickMs,
    isGameOver, isPaused, wallMode, theme, unlockedTech,
    setTheme, setWallMode, setIsPaused, enqueueDirection, resetGame,
  };
}
