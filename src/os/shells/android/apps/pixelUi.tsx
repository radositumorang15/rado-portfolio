'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { notch } from '../../../../os/notch';
import { usePrefsStore } from '../../../../store/prefs';

const STR = {
  en: {
    installed: 'Installed',
    installing: 'Installing',
    skills: 'skills',
    competent: 'Competent / Production Ready',
    novice: 'Learning & Exploring',
    tools: 'Tools & Ecosystem',
    appliedIn: 'Applied in projects',
    shippedIn: 'Shipped in',
    project: 'project',
    projects: 'projects',
    learning: 'Learning',
    learningNote: 'Still in progress, practiced through exploratory prototypes.',
    done: 'Done',
    close: 'Close',
    present: 'Present',
    work: 'Professional & Internship Experience',
    other: 'Organizations & Activities',
    contributions: 'Key contributions & responsibilities',
  },
  id: {
    installed: 'Terpasang',
    installing: 'Sedang dipasang',
    skills: 'skill',
    competent: 'Kompeten / Siap Produksi',
    novice: 'Sedang Belajar & Eksplorasi',
    tools: 'Tools & Ekosistem',
    appliedIn: 'Dipakai di project',
    shippedIn: 'Dirilis di',
    project: 'project',
    projects: 'project',
    learning: 'Belajar',
    learningNote: 'Masih berjalan, dilatih lewat prototipe eksplorasi.',
    done: 'Selesai',
    close: 'Tutup',
    present: 'Sekarang',
    work: 'Pengalaman Profesional & Magang',
    other: 'Organisasi & Kegiatan',
    contributions: 'Kontribusi & tanggung jawab utama',
  },
} as const;

export type StrKey = keyof (typeof STR)['en'];

export function useT() {
  const language = usePrefsStore((s) => s.language);
  return useCallback((k: StrKey) => STR[language][k] ?? STR.en[k], [language]);
}

export const PixelPage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col gap-5 p-4 pb-12 text-[var(--m3-on-surface)] font-sans">{children}</div>
);

export const SectionTitle: React.FC<{ children: React.ReactNode; aside?: React.ReactNode }> = ({
  children,
  aside,
}) => (
  <div className="flex items-center justify-between px-2 mb-2">
    <h3 className="m-0 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">{children}</h3>
    {aside && <span className="text-[11px] text-[var(--m3-on-surface-variant)]">{aside}</span>}
  </div>
);

export const groupRadius = (i: number, n: number) =>
  n === 1 ? 'rounded-[24px]' : i === 0 ? 'rounded-t-[24px] rounded-b-[4px]' : i === n - 1 ? 'rounded-t-[4px] rounded-b-[24px]' : 'rounded-[4px]';

export const GroupedItem: React.FC<{
  index: number;
  count: number;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ index, count, onClick, children }) => {
  const cls = `w-full text-left p-4 bg-[var(--m3-surface-container)] ${groupRadius(index, count)} animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none`;
  const style = { animationDelay: `${Math.min(index, 8) * 45}ms`, animationFillMode: 'both' } as const;

  return onClick ? (
    <button
      onClick={onClick}
      style={style}
      className={`${cls} cursor-pointer transition-[background-color,transform] hover:bg-[var(--m3-surface-container-high)] active:scale-[0.985] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-[var(--m3-primary)]`}
    >
      {children}
    </button>
  ) : (
    <div style={style} className={cls}>{children}</div>
  );
};

export function useExternalLink() {
  return useCallback((url: string, title = 'Opening External Link') => {
    notch.show({ title, subtitle: url });
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);
}

export const BottomSheet: React.FC<{
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
}> = ({ open, onClose, label, children }) => {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startY = useRef<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      opener.current = document.activeElement as HTMLElement | null;
      setMounted(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => { setShown(true); panel.current?.focus(); }));
      return () => cancelAnimationFrame(id);
    }
    setShown(false);
    const t = window.setTimeout(() => { setMounted(false); opener.current?.focus?.(); }, 280);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  const host = (document.querySelector('[data-pixel-device]') as HTMLElement | null) ?? document.body;
  const pos = host === document.body ? 'fixed' : 'absolute';
  const dragging = startY.current !== null;

  return createPortal(
    <div
      className={`${pos} inset-0 z-40 flex flex-col justify-end p-3 bg-black/60 transition-opacity duration-300 motion-reduce:transition-none`}
      style={{ opacity: shown ? 1 - Math.min(dragY / 400, 0.6) : 0 }}
      onClick={onClose}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: shown ? `translateY(${dragY}px)` : 'translateY(100%)',
          transition: dragging ? 'none' : 'transform 280ms cubic-bezier(.2,.8,.2,1)',
        }}
        className="w-full max-w-md mx-auto max-h-[85%] overflow-y-auto p-5 pt-2 rounded-[28px] bg-[var(--m3-surface-container)] text-[var(--m3-on-surface)] shadow-2xl flex flex-col gap-4 outline-none"
      >
        <div
          className="py-2 cursor-grab touch-none"
          onPointerDown={(e) => { startY.current = e.clientY; e.currentTarget.setPointerCapture(e.pointerId); }}
          onPointerMove={(e) => startY.current !== null && setDragY(Math.max(0, e.clientY - startY.current))}
          onPointerUp={() => { const far = dragY > 100; startY.current = null; setDragY(0); if (far) onClose(); }}
        >
          <div className="w-10 h-1 rounded-full bg-[var(--m3-on-surface-variant)]/40 mx-auto" />
        </div>
        {children}
      </div>
    </div>,
    host
  );
};

export const SheetCloseButton: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="w-9 h-9 rounded-full bg-[var(--m3-surface-container-high)] flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
  >
    <X size={18} />
  </button>
);
