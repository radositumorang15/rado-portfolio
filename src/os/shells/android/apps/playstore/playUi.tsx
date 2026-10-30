'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { PlayApp } from './types';

/**
 * Token warna Material 3. Memakai variabel --m3-* milikmu, dengan fallback tema gelap Play Store
 * kalau variabelnya belum ada.
 */
export const T = {
  text: 'text-[var(--m3-on-surface,#e3e3e3)]',
  sub: 'text-[var(--m3-on-surface-variant,#c4c7c5)]',
  line: 'border-[var(--m3-outline-variant,#444746)]',
  card: 'bg-[var(--m3-surface-container,#1e1f20)]',
  cardHi: 'bg-[var(--m3-surface-container-high,#282a2c)]',
  primaryText: 'text-[var(--m3-primary,#6dd58c)]',
  primaryBtn: 'bg-[var(--m3-primary,#6dd58c)] text-[var(--m3-on-primary,#003919)]',
  outlineBtn: 'border border-[var(--m3-outline,#8e918f)] text-[var(--m3-primary,#6dd58c)]',
};

export const sizeMb = (s: string) => parseFloat(s) || 40;
export const ratingNum = (r: string | number) => Number(r) || 0;

/** Ikon aplikasi dengan sudut ~22% seperti adaptive icon Android. */
export const AppIcon: React.FC<{ app: PlayApp; size?: number; className?: string }> = ({
  app,
  size = 56,
  className = '',
}) => (
  <div
    className={`shrink-0 flex items-center justify-center font-bold text-white shadow-sm ${className}`}
    style={{
      width: size,
      height: size,
      borderRadius: '22%',
      fontSize: size * 0.32,
      background: `linear-gradient(135deg, ${app.gradient[0]}, ${app.gradient[1]})`,
    }}
  >
    {app.iconInitials}
  </div>
);

export const Rating: React.FC<{ value: string | number }> = ({ value }) => (
  <span className="inline-flex items-center gap-0.5">
    {value}
    <Star size={10} fill="currentColor" />
  </span>
);

/** Baris daftar 3 baris seperti di carousel "Suggested for you". */
export const AppRow: React.FC<{ app: PlayApp; installed?: boolean; onClick: () => void }> = ({
  app,
  installed,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3.5 text-left active:opacity-70 transition-opacity cursor-pointer"
  >
    <AppIcon app={app} size={56} />
    <div className="min-w-0 flex-1">
      <div className={`text-[14px] font-medium truncate ${T.text}`}>{app.name}</div>
      <div className={`text-[12px] truncate ${T.sub}`}>
        {app.category} · {app.size}
      </div>
      <div className={`text-[12px] flex items-center gap-1 ${T.sub}`}>
        <Rating value={app.rating} />
        {installed && <span>· Installed</span>}
      </div>
    </div>
  </button>
);

/** Tile vertikal untuk carousel "Popular apps". */
export const AppTile: React.FC<{ app: PlayApp; onClick: () => void }> = ({ app, onClick }) => (
  <button
    onClick={onClick}
    className="snap-start shrink-0 w-[92px] flex flex-col gap-2 text-left active:opacity-70 transition-opacity cursor-pointer"
  >
    <AppIcon app={app} size={92} />
    <div className="min-w-0">
      <div className={`text-[12.5px] font-medium leading-tight line-clamp-2 ${T.text}`}>{app.name}</div>
      <div className={`text-[11.5px] flex items-center gap-1 mt-0.5 ${T.sub}`}>
        <Rating value={app.rating} />
      </div>
    </div>
  </button>
);

/** Judul section dengan tombol panah bulat, seperti di Play Store. */
export const SectionHeader: React.FC<{
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}> = ({ title, onClick, icon }) => (
  <div className="flex items-center justify-between px-4 mb-3">
    <h3 className={`text-[18px] font-medium m-0 ${T.text}`}>{title}</h3>
    {icon && (
      <button
        onClick={onClick}
        className={`w-9 h-9 rounded-full flex items-center justify-center active:bg-white/10 cursor-pointer ${T.sub}`}
      >
        {icon}
      </button>
    )}
  </div>
);

