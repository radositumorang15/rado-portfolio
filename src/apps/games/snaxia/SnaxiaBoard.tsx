import React, { useRef, useEffect } from 'react';
import { Point, Direction, BugItem, TechItem, ThemeMode, WallMode, GRID_SIZE } from './types';

interface SnaxiaBoardProps {
  snake: Point[];
  direction: Direction;
  food: Point;
  bug: BugItem | null;
  techItem: TechItem | null;
  theme: ThemeMode;
  wallMode: WallMode;
}

export const SnaxiaBoard: React.FC<SnaxiaBoardProps> = ({
  snake, direction, food, bug, techItem, theme, wallMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cell = width / GRID_SIZE;

    // Background
    if (theme === 'nokia_lcd') {
      ctx.fillStyle = '#879176';
      ctx.fillRect(0, 0, width, height);
      // Nokia pixel ghost grid
      ctx.strokeStyle = '#7E886D';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * cell); ctx.lineTo(width, i * cell); ctx.stroke();
      }
    } else {
      ctx.fillStyle = '#0F141C';
      ctx.fillRect(0, 0, width, height);
      // Subtle cyber grid
      ctx.strokeStyle = '#1A2230';
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath(); ctx.moveTo(i * cell, 0); ctx.lineTo(i * cell, height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * cell); ctx.lineTo(width, i * cell); ctx.stroke();
      }
      if (wallMode === 'box') {
        ctx.strokeStyle = '#FF3B30';
        ctx.lineWidth = 3;
        ctx.strokeRect(1, 1, width - 2, height - 2);
      }
    }

    // Draw Food
    const fx = food.x * cell;
    const fy = food.y * cell;
    if (theme === 'nokia_lcd') {
      ctx.fillStyle = '#1A2112';
      ctx.fillRect(fx + 2, fy + 2, cell - 4, cell - 4);
    } else {
      ctx.shadowColor = '#FFB800';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#FFB800';
      ctx.beginPath();
      ctx.arc(fx + cell / 2, fy + cell / 2, cell / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw Bug (+50 timer)
    if (bug) {
      const bx = bug.x * cell;
      const by = bug.y * cell;
      if (theme === 'nokia_lcd') {
        ctx.fillStyle = '#1A2112';
        ctx.fillRect(bx + 1, by + 1, cell - 2, cell - 2);
      } else {
        ctx.shadowColor = '#FF007F';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#FF007F';
        ctx.fillRect(bx + 2, by + 2, cell - 4, cell - 4);
        ctx.shadowBlur = 0;
        // Countdown mini bar
        const pct = Math.max(0, bug.timer / bug.maxTimer);
        ctx.fillStyle = '#FF007F';
        ctx.fillRect(bx + 1, by - 4, cell * pct, 3);
      }
    }

    // Draw Tech Item
    if (techItem) {
      const tx = techItem.x * cell;
      const ty = techItem.y * cell;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#0078D4';
      ctx.fillRect(tx + 2, ty + 2, cell - 4, cell - 4);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(techItem.name[0], tx + cell / 2, ty + cell / 2);
      ctx.shadowBlur = 0;
    }

    // Draw Snake
    const len = snake.length;
    snake.forEach((pt, i) => {
      const px = pt.x * cell;
      const py = pt.y * cell;

      if (theme === 'nokia_lcd') {
        ctx.fillStyle = '#1A2112';
        ctx.fillRect(px + 1, py + 1, cell - 2, cell - 2);
        return;
      }

      if (i === 0) {
        // Head
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#00F0FF';
        ctx.beginPath();
        ctx.roundRect(px + 1, py + 1, cell - 2, cell - 2, 6);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Eyes
        ctx.fillStyle = '#0F141C';
        let e1 = { x: px + 4, y: py + 4 };
        let e2 = { x: px + cell - 6, y: py + 4 };
        if (direction === 'DOWN') {
          e1 = { x: px + 4, y: py + cell - 6 };
          e2 = { x: px + cell - 6, y: py + cell - 6 };
        } else if (direction === 'LEFT') {
          e1 = { x: px + 4, y: py + 4 };
          e2 = { x: px + 4, y: py + cell - 6 };
        } else if (direction === 'RIGHT') {
          e1 = { x: px + cell - 6, y: py + 4 };
          e2 = { x: px + cell - 6, y: py + cell - 6 };
        }
        ctx.fillRect(e1.x, e1.y, 2.5, 2.5);
        ctx.fillRect(e2.x, e2.y, 2.5, 2.5);
      } else {
        // Body with gradient fade
        const progress = i / len;
        const scale = 1 - progress * 0.15;
        const offset = ((1 - scale) * cell) / 2;
        ctx.fillStyle = progress < 0.5 ? '#00E5FF' : '#0078D4';
        ctx.beginPath();
        ctx.roundRect(px + 1 + offset, py + 1 + offset, (cell - 2) * scale, (cell - 2) * scale, 4);
        ctx.fill();
      }
    });
  }, [snake, direction, food, bug, techItem, theme, wallMode]);

  return (
    <div className="relative flex items-center justify-center p-2 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full max-w-[380px] aspect-square rounded-xl object-contain touch-none"
      />
    </div>
  );
};
