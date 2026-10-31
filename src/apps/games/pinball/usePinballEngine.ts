import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Ball, Bumper, DropTarget, Flipper, TABLE_WIDTH, TABLE_HEIGHT,
  GRAVITY, DAMPING, MAX_BALLS
} from './types';
import { updateBallPhysics, checkBumperCollisions, checkTargetCollisions } from './pinballPhysics';
import { getGameData, updatePinballScore } from '../../../lib/gameStorage';
import { gameAudio } from '../../../lib/gameAudio';
import { gameHaptics } from '../../../lib/gameHaptics';
import { notch } from '../../../os/notch';

const INITIAL_TARGETS: DropTarget[] = ['K', 'O', 'T', 'L', 'I', 'N'].map((c, i) => ({
  id: `tgt_${i}`, char: c, x: 75 + i * 36, y: 80, width: 28, height: 14, hit: false,
}));

export function usePinballEngine(isFocused: boolean) {
  const saved = getGameData();
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(saved.pinball.highScore);
  const [ballsLeft, setBallsLeft] = useState(MAX_BALLS);
  const [multiplier, setMultiplier] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isTilted, setIsTilted] = useState(false);
  const [plungerCharge, setPlungerCharge] = useState(0);
  const [shake, setShake] = useState({ x: 0, y: 0 });

  const ballRef = useRef<Ball>({
    x: TABLE_WIDTH - 20, y: TABLE_HEIGHT - 60, vx: 0, vy: 0, radius: 9, active: false, trail: [],
  });
  const leftFlipper = useRef<Flipper>({
    x: 95, y: 465, length: 55, angle: 0.5, restAngle: 0.5, upAngle: -0.5, isUp: false,
  });
  const rightFlipper = useRef<Flipper>({
    x: 235, y: 465, length: 55, angle: Math.PI - 0.5, restAngle: Math.PI - 0.5, upAngle: Math.PI + 0.5, isUp: false,
  });
  const bumpers = useRef<Bumper[]>([
    { id: 1, x: 120, y: 160, radius: 22, hits: 0, shockwaveTimer: 0 },
    { id: 2, x: 210, y: 160, radius: 22, hits: 0, shockwaveTimer: 0 },
    { id: 3, x: 165, y: 230, radius: 25, hits: 0, shockwaveTimer: 0 },
  ]);
  const targets = useRef<DropTarget[]>(INITIAL_TARGETS);
  const launchTime = useRef<number>(0);
  const nudgeTimes = useRef<number[]>([]);
  const multiplierTime = useRef<number>(0);
  const isCharging = useRef(false);

  const setLeftFlipper = useCallback((up: boolean) => {
    if (isTilted) return;
    if (up && !leftFlipper.current.isUp) gameAudio.flipperUp();
    leftFlipper.current.isUp = up;
  }, [isTilted]);

  const setRightFlipper = useCallback((up: boolean) => {
    if (isTilted) return;
    if (up && !rightFlipper.current.isUp) gameAudio.flipperUp();
    rightFlipper.current.isUp = up;
  }, [isTilted]);

  const launchBall = useCallback((force = 0.85) => {
    if (ballRef.current.active) return;
    isCharging.current = false;
    setPlungerCharge(0);
    gameAudio.plungerRelease();
    gameHaptics.plungerLaunch();
    ballRef.current.active = true;
    ballRef.current.vx = -1.5;
    ballRef.current.vy = -12 - force * 14;
    launchTime.current = Date.now();
  }, []);

  const startPlunger = useCallback(() => {
    if (!ballRef.current.active) isCharging.current = true;
  }, []);

  const releasePlunger = useCallback(() => {
    if (!ballRef.current.active) {
      const force = Math.max(0.4, plungerCharge || 0.85);
      launchBall(force);
    }
  }, [plungerCharge, launchBall]);

  const nudge = useCallback(() => {
    if (isTilted) return;
    const now = Date.now();
    nudgeTimes.current = nudgeTimes.current.filter((t) => now - t < 5000).concat(now);
    if (nudgeTimes.current.length > 3) {
      setIsTilted(true);
      leftFlipper.current.isUp = false;
      rightFlipper.current.isUp = false;
      notch.show({ title: 'TILT!', subtitle: 'Flippers locked!', priority: 'high' });
      return;
    }
    setShake({ x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 6 });
    setTimeout(() => setShake({ x: 0, y: 0 }), 120);
    if (ballRef.current.active) {
      ballRef.current.vx += (Math.random() - 0.5) * 3;
      ballRef.current.vy -= 1.5;
    }
  }, [isTilted]);

  useEffect(() => {
    if (isGameOver) return;
    const onDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase(); const c = e.code;
      if (c === 'KeyZ' || c === 'KeyA' || c === 'ArrowLeft' || k === 'z' || k === 'a' || k === 'arrowleft') setLeftFlipper(true);
      else if (c === 'Slash' || c === 'KeyD' || c === 'ArrowRight' || k === '/' || k === 'd' || k === 'arrowright') setRightFlipper(true);
      else if (c === 'Space' || c === 'Enter' || c === 'ArrowUp' || c === 'ArrowDown' || k === ' ' || k === 'enter') startPlunger();
      else if (c === 'KeyX' || c === 'KeyN' || k === 'x' || k === 'n') nudge();
    };
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase(); const c = e.code;
      if (c === 'KeyZ' || c === 'KeyA' || c === 'ArrowLeft' || k === 'z' || k === 'a' || k === 'arrowleft') setLeftFlipper(false);
      else if (c === 'Slash' || c === 'KeyD' || c === 'ArrowRight' || k === '/' || k === 'd' || k === 'arrowright') setRightFlipper(false);
      else if (c === 'Space' || c === 'Enter' || c === 'ArrowUp' || c === 'ArrowDown' || k === ' ' || k === 'enter') releasePlunger();
    };
    window.addEventListener('keydown', onDown); window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, [isGameOver, setLeftFlipper, setRightFlipper, startPlunger, releasePlunger, nudge]);

  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (isCharging.current) setPlungerCharge((p) => Math.min(1, p + 0.03));
      if (multiplierTime.current > 0 && Date.now() - multiplierTime.current > 30000) {
        multiplierTime.current = 0; setMultiplier(1);
      }
      [leftFlipper.current, rightFlipper.current].forEach((f) => {
        f.angle += ((f.isUp ? f.upAngle : f.restAngle) - f.angle) * 0.45;
      });

      const b = ballRef.current;
      if (b.active) {
        b.vy += GRAVITY; b.vx *= DAMPING; b.vy *= DAMPING; b.x += b.vx; b.y += b.vy;
        b.trail = [{ x: b.x, y: b.y }, ...b.trail.slice(0, 7)];
        updateBallPhysics(b, TABLE_WIDTH - 32);

        const bmpPts = checkBumperCollisions(b, bumpers.current, multiplier);
        if (bmpPts > 0) setScore((s) => s + bmpPts);

        const tgtPts = checkTargetCollisions(b, targets.current, multiplier, () => {
          setScore((s) => s + 2500 * multiplier); setMultiplier(2);
          multiplierTime.current = Date.now();
          notch.show({ title: '2x Multiplier Active!', subtitle: 'Targets cleared!' });
          setTimeout(() => targets.current.forEach((x) => (x.hit = false)), 800);
        });
        if (tgtPts > 0) setScore((s) => s + tgtPts);

        if (b.y > TABLE_HEIGHT + 20) {
          b.active = false;
          if (Date.now() - launchTime.current < 5000) {
            notch.show({ title: 'Ball Saved!', subtitle: 'Free return to plunger lane' });
            ballRef.current = { x: TABLE_WIDTH - 20, y: TABLE_HEIGHT - 60, vx: 0, vy: 0, radius: 9, active: false, trail: [] };
          } else {
            setIsTilted(false);
            setBallsLeft((bl) => {
              const next = bl - 1;
              if (next <= 0) {
                setIsGameOver(true); gameAudio.gameOver(); gameHaptics.gameOver();
                const { isNewHigh, highScore: nh } = updatePinballScore(score);
                setHighScore(nh);
                if (isNewHigh) {
                  gameAudio.highScoreFanfare();
                  notch.show({ title: 'New High Score!', subtitle: `${score} pts!` });
                }
              } else {
                ballRef.current = { x: TABLE_WIDTH - 20, y: TABLE_HEIGHT - 60, vx: 0, vy: 0, radius: 9, active: false, trail: [] };
              }
              return next;
            });
          }
        }
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [multiplier, score]);

  const restartGame = () => {
    setScore(0); setBallsLeft(MAX_BALLS); setMultiplier(1);
    setIsGameOver(false); setIsTilted(false);
    targets.current.forEach((t) => (t.hit = false));
    ballRef.current = { x: TABLE_WIDTH - 20, y: TABLE_HEIGHT - 60, vx: 0, vy: 0, radius: 9, active: false, trail: [] };
  };

  return {
    ball: ballRef.current, leftFlipper: leftFlipper.current, rightFlipper: rightFlipper.current,
    bumpers: bumpers.current, targets: targets.current, score, highScore, ballsLeft,
    multiplier, isGameOver, isTilted, plungerCharge, shake,
    setLeftFlipper, setRightFlipper, startPlunger, releasePlunger, launchBall, nudge, restartGame,
  };
}
