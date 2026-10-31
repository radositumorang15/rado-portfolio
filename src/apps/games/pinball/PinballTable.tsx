import React, { useRef, useEffect } from 'react';
import { Ball, Bumper, DropTarget, Flipper, TABLE_WIDTH, TABLE_HEIGHT } from './types';

interface PinballTableProps {
  ball: Ball;
  leftFlipper: Flipper;
  rightFlipper: Flipper;
  bumpers: Bumper[];
  targets: DropTarget[];
  plungerCharge: number;
  isTilted: boolean;
  shake: { x: number; y: number };
  onLeftFlipper?: (up: boolean) => void;
  onRightFlipper?: (up: boolean) => void;
  onLaunch?: () => void;
}

export const PinballTable: React.FC<PinballTableProps> = ({
  ball, leftFlipper, rightFlipper, bumpers, targets, plungerCharge, isTilted, shake,
  onLeftFlipper, onRightFlipper, onLaunch,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const laneX = TABLE_WIDTH - 32;

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = TABLE_WIDTH / rect.width;
    const clickX = (e.clientX - rect.left) * scaleX;

    if (clickX >= laneX) {
      onLaunch?.();
    } else if (clickX < TABLE_WIDTH * 0.45) {
      onLeftFlipper?.(true);
    } else {
      onRightFlipper?.(true);
    }
  };

  const handlePointerUp = () => {
    onLeftFlipper?.(false);
    onRightFlipper?.(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.translate(shake.x, shake.y);

    ctx.fillStyle = '#0F141C';
    ctx.fillRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);

    ctx.strokeStyle = '#182232';
    ctx.lineWidth = 1;
    for (let x = 30; x < TABLE_WIDTH - 30; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x, TABLE_HEIGHT - 60); ctx.stroke();
    }

    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(12, 12, TABLE_WIDTH - 24, TABLE_HEIGHT - 24);

    ctx.strokeStyle = '#2A364B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(laneX, 100);
    ctx.lineTo(laneX, TABLE_HEIGHT - 12);
    ctx.stroke();

    if (plungerCharge > 0) {
      ctx.fillStyle = '#FF007F';
      const pHeight = 40 * plungerCharge;
      ctx.fillRect(laneX + 4, TABLE_HEIGHT - 20 - pHeight, 16, pHeight);
    }

    targets.forEach((t) => {
      ctx.fillStyle = t.hit ? '#1A2230' : '#00F0FF';
      ctx.strokeStyle = t.hit ? '#2A364B' : '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(t.x, t.y, t.width, t.height, 3);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = t.hit ? '#4A5568' : '#0F141C';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(t.char, t.x + t.width / 2, t.y + t.height / 2);
    });

    bumpers.forEach((bmp) => {
      const isShock = bmp.shockwaveTimer > 0;
      const r = bmp.radius * (isShock ? 1.25 : 1);

      if (isShock) {
        ctx.strokeStyle = '#FF007F';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(bmp.x, bmp.y, r + 10, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.shadowColor = bmp.hits >= 10 ? '#FF007F' : '#00F0FF';
      ctx.shadowBlur = isShock ? 16 : 8;
      ctx.fillStyle = bmp.hits >= 10 ? '#FF007F' : '#1A2230';
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(bmp.x, bmp.y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(bmp.hits >= 10 ? '250' : '100', bmp.x, bmp.y);
    });

    [leftFlipper, rightFlipper].forEach((f) => {
      const fx2 = f.x + Math.cos(f.angle) * f.length;
      const fy2 = f.y + Math.sin(f.angle) * f.length;

      ctx.strokeStyle = isTilted ? '#FF3B30' : '#FF007F';
      ctx.lineWidth = 9;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(f.x, f.y);
      ctx.lineTo(fx2, fy2);
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(f.x, f.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    if (ball.active) {
      ball.trail.forEach((pt, idx) => {
        const alpha = Math.max(0, 0.4 - idx * 0.05);
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, ball.radius * (1 - idx * 0.08), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#E2E8F0';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = '#A0AEC0';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (isTilted) {
      ctx.fillStyle = 'rgba(255, 59, 48, 0.85)';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TILT!', TABLE_WIDTH / 2, TABLE_HEIGHT / 2);
    }

    ctx.restore();
  }, [ball, leftFlipper, rightFlipper, bumpers, targets, plungerCharge, isTilted, shake, laneX]);

  return (
    <div className="relative flex items-center justify-center p-2 rounded-2xl bg-black/50 border border-white/10 shadow-2xl select-none">
      <canvas
        ref={canvasRef}
        width={TABLE_WIDTH}
        height={TABLE_HEIGHT}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="w-full max-w-[320px] md:max-w-[360px] aspect-[360/540] rounded-xl object-contain touch-none cursor-pointer"
      />
    </div>
  );
};
