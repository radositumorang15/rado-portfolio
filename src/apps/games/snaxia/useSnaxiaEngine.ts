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
  const lastScoreMilestone = useRef(0);
  const tickMs = Math.max(MIN_TICK_MS, INITIAL_TICK_MS - Math.floor(foodsEaten.current / 5) * TICK_ACCEL_MS);
  const speedLevel = 1 + Math.floor((INITIAL_TICK_MS - tickMs) / TICK_ACCEL_MS);

  const enqueueDirection = useCallback((next: Direction) => {
    const last = inputQueue.current.length > 0 ? inputQueue.current[inputQueue.current.length - 1] : currentDir.current;
    if (next !== last && next !== OPPOSITE[last] && inputQueue.current.length < 2) {
      inputQueue.current.push(next);
    }
  }, []);

  const resetGame = useCallback(() => {
    const init = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    setSnake(init);
    setDirection('RIGHT');
    currentDir.current = 'RIGHT';
    inputQueue.current = [];
    foodsEaten.current = 0;
    lastScoreMilestone.current = 0;
    setFood(getRandomPoint(init));
    setBug(null);
    setTechItem(null);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (!isFocused || isGameOver) return;
    const handleKey = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: 'UP', KeyW: 'UP', ArrowDown: 'DOWN', KeyS: 'DOWN',
        ArrowLeft: 'LEFT', KeyA: 'LEFT', ArrowRight: 'RIGHT', KeyD: 'RIGHT',
      };
      if (map[e.code]) {
        e.preventDefault();
        enqueueDirection(map[e.code]);
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFocused, isGameOver, enqueueDirection]);

  useEffect(() => {
    if (isGameOver || isPaused || !isFocused) return;
    const timer = setInterval(() => {
      setSnake((prev) => {
        const nextDir = inputQueue.current.shift() ?? currentDir.current;
        currentDir.current = nextDir;
        setDirection(nextDir);
        let nx = prev[0].x + (nextDir === 'RIGHT' ? 1 : nextDir === 'LEFT' ? -1 : 0);
        let ny = prev[0].y + (nextDir === 'DOWN' ? 1 : nextDir === 'UP' ? -1 : 0);

        if (wallMode === 'wrap') {
          nx = (nx + GRID_SIZE) % GRID_SIZE;
          ny = (ny + GRID_SIZE) % GRID_SIZE;
        } else if (nx < 0 || nx >= GRID_SIZE || ny < 0 || ny >= GRID_SIZE) {
          triggerDeath(score, prev.length);
          return prev;
        }

        if (prev.some((s, idx) => idx > 0 && s.x === nx && s.y === ny)) {
          triggerDeath(score, prev.length);
          return prev;
        }

        const newSnake = [{ x: nx, y: ny }, ...prev];
        if (nx === food.x && ny === food.y) {
          gameAudio.snaxiaEat();
          gameHaptics.snaxiaEat();
          foodsEaten.current += 1;
          const nextScore = score + (wallMode === 'box' ? 12 : 10);
          setScore(nextScore);
          setFood(getRandomPoint(newSnake));
          if (foodsEaten.current % 7 === 0 && !bug) {
            setBug({ ...getRandomPoint(newSnake), timer: BUG_DURATION, maxTimer: BUG_DURATION });
          }
          if (nextScore - lastScoreMilestone.current >= 200) {
            lastScoreMilestone.current = nextScore;
            const t = TECH_LIST.find((x) => !unlockedTech.includes(x)) || TECH_LIST[0];
            setTechItem({ ...getRandomPoint(newSnake), name: t });
          }
          return newSnake;
        }
        if (bug && nx === bug.x && ny === bug.y) {
          gameAudio.snaxiaBug();
          gameHaptics.snaxiaEat();
          setScore((s) => s + 50);
          setBug(null);
          return newSnake;
        }
        if (techItem && nx === techItem.x && ny === techItem.y) {
          gameAudio.snaxiaBug();
          gameHaptics.techUnlock();
          unlockSnaxiaTech(techItem.name);
          setUnlockedTech((p) => Array.from(new Set([...p, techItem.name])));
          setScore((s) => s + 100);
          notch.show({ title: `Tech Unlocked: ${techItem.name}!`, subtitle: 'Easter Egg' });
          setTechItem(null);
          return newSnake;
        }
        newSnake.pop();
        return newSnake;
      });
    }, tickMs);
    return () => clearInterval(timer);
  }, [isGameOver, isPaused, isFocused, tickMs, wallMode, food, bug, techItem, score, unlockedTech]);

  useEffect(() => {
    if (!bug || isGameOver || isPaused) return;
    const interval = setInterval(() => {
      setBug((b) => (b && b.timer > 0.1 ? { ...b, timer: b.timer - 0.1 } : null));
    }, 100);
    return () => clearInterval(interval);
  }, [bug, isGameOver, isPaused]);

  const triggerDeath = (finalScore: number, len: number) => {
    setIsGameOver(true);
    gameAudio.gameOver();
    gameHaptics.gameOver();
    const { isNewHigh, highScore: nh } = updateSnaxiaScore(finalScore, len);
    setHighScore(nh);
    if (isNewHigh) {
      gameAudio.highScoreFanfare();
      notch.show({ title: 'New Snaxia High Score!', subtitle: `${finalScore} pts achieved!` });
    }
  };

  return {
    snake, direction, food, bug, techItem, score, highScore, speedLevel, tickMs,
    isGameOver, isPaused, wallMode, theme, unlockedTech,
    setTheme, setWallMode, setIsPaused, enqueueDirection, resetGame,
  };
}
