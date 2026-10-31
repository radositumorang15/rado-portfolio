import { Ball, Bumper, DropTarget, TABLE_WIDTH } from './types';
import { gameAudio } from '../../../lib/gameAudio';
import { gameHaptics } from '../../../lib/gameHaptics';

export function updateBallPhysics(b: Ball, laneX: number): void {
  // Left/Right boundaries
  if (b.x - b.radius < 15) { b.x = 15 + b.radius; b.vx = Math.abs(b.vx) * 0.8; }
  if (b.y > 100 && b.x > laneX - b.radius && b.x < laneX + 10 && b.vx > 0) {
    b.x = laneX - b.radius; b.vx = -Math.abs(b.vx) * 0.7;
  }
  if (b.x + b.radius > TABLE_WIDTH - 12) { b.x = TABLE_WIDTH - 12 - b.radius; b.vx = -Math.abs(b.vx) * 0.8; }
  if (b.y - b.radius < 15) { b.y = 15 + b.radius; b.vy = Math.abs(b.vy) * 0.8; }
}

export function checkBumperCollisions(b: Ball, bumpers: Bumper[], multiplier: number): number {
  let scoreGain = 0;
  bumpers.forEach((bmp) => {
    if (bmp.shockwaveTimer > 0) bmp.shockwaveTimer -= 16;
    const dx = b.x - bmp.x; const dy = b.y - bmp.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < b.radius + bmp.radius) {
      const nx = dx / dist; const ny = dy / dist;
      b.vx = nx * 8; b.vy = ny * 8;
      bmp.hits += 1;
      bmp.shockwaveTimer = 80;
      scoreGain += (bmp.hits >= 10 ? 250 : 100) * multiplier;
      gameAudio.bumperHit();
      gameHaptics.bumperHit();
    }
  });
  return scoreGain;
}

export function checkTargetCollisions(
  b: Ball, targets: DropTarget[], multiplier: number, onAllHit: () => void
): number {
  let scoreGain = 0;
  targets.forEach((t) => {
    if (!t.hit && b.x > t.x && b.x < t.x + t.width && b.y > t.y && b.y < t.y + t.height) {
      t.hit = true;
      b.vy = Math.abs(b.vy) * 0.8;
      scoreGain += 150 * multiplier;
      gameAudio.dropTarget();
      if (targets.every((x) => x.hit)) onAllHit();
    }
  });
  return scoreGain;
}
