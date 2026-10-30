'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SwitcherMode } from './types';
import { CHROME_TABS_DATA, DEFAULT_TABS } from './data';
import { ChromeTabCard } from './ChromeTabCard';
import { ChromeSheet } from './ChromeSheet';
import { ChromeSwitcherHeader } from './ChromeSwitcherHeader';
import { ChromeUndoToast } from './ChromeUndoToast';
import './chromeTabs.css';

interface PixelChromeViewProps {
  onExit?: () => void;
}

export const PixelChromeView: React.FC<PixelChromeViewProps> = ({ onExit }) => {
  const [tabs, setTabs] = useState<string[]>(DEFAULT_TABS);
  const [mode, setMode] = useState<SwitcherMode>('grid');
  const [cur, setCur] = useState<string | null>(null);
  const [closed, setClosed] = useState<{ id: string; i: number; title: string } | null>(null);
  const [toastMsg, setToastMsg] = useState<{ text: string; undo?: boolean } | null>(null);
  const [px, setPx] = useState(0);
  const [scaleK, setScaleK] = useState(0.42);
  const [cardHeight, setCardHeight] = useState('190px');

  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const tcsRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const updateScale = useCallback(() => {
    const c = tcsRef.current;
    if (!c) return;
    const w = c.clientWidth - (mode === 'stack' ? 40 : 28);
    const cw = mode === 'stack' ? w : (w - 12) / 2;
    setScaleK(Math.max(0.3, Number((cw / 400).toFixed(3))));
    setCardHeight(mode === 'stack' ? '230px' : `${Math.round(cw * 0.95)}px`);
  }, [mode]);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  const showToast = (text: string, undo = false) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMsg({ text, undo });
    toastTimerRef.current = setTimeout(() => {
      setToastMsg(null);
      setClosed(null);
    }, 3500);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') {
      const ratio = ((e.clientX / window.innerWidth) - 0.5) * 2;
      setPx(Math.max(-1, Math.min(1, ratio)));
    }
  };

  const flipIn = (fromElement?: HTMLElement | null) => {
    const d = containerRef.current?.getBoundingClientRect();
    const sheet = sheetRef.current;
    if (!d || !sheet) return;
    const r = fromElement?.getBoundingClientRect();
    sheet.style.transition = 'none';
    if (r) {
      sheet.style.transformOrigin = '0 0';
      sheet.style.transform = `translate(${r.left - d.left}px, ${r.top - d.top}px) scale(${r.width / d.width}, ${r.height / d.height})`;
      sheet.style.borderRadius = '22px';
    }
    sheet.style.opacity = '0.3';
    void sheet.getBoundingClientRect();
    sheet.style.transition = 'transform 0.38s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.38s, opacity 0.25s';
    sheet.style.transform = 'none';
    sheet.style.borderRadius = '0px';
    sheet.style.opacity = '1';
  };

  const flipOut = (toElement?: HTMLElement | null, onDone?: () => void) => {
    const d = containerRef.current?.getBoundingClientRect();
    const sheet = sheetRef.current;
    if (!d || !sheet) { onDone?.(); return; }
    const r = toElement?.getBoundingClientRect();
    sheet.style.transformOrigin = '0 0';
    sheet.style.transition = 'transform 0.34s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.34s, opacity 0.25s';
    sheet.style.transform = r
      ? `translate(${r.left - d.left}px, ${r.top - d.top}px) scale(${r.width / d.width}, ${r.height / d.height})`
      : 'translateY(60px)';
    sheet.style.borderRadius = '22px';
    sheet.style.opacity = '0';
    setTimeout(() => onDone?.(), 340);
  };

  const openTab = (id: string, fromElement?: HTMLElement | null) => {
    setCur(id);
    setTimeout(() => flipIn(fromElement), 10);
  };

  const closePage = () => {
    if (!cur) return;
    const card = containerRef.current?.querySelector(`[data-tab-card="${cur}"]`) as HTMLElement;
    flipOut(card, () => setCur(null));
  };

  const handleCloseTab = (id: string) => {
    const i = tabs.indexOf(id);
    if (i === -1) return;
    const tabData = CHROME_TABS_DATA[id];
    setClosed({ id, i, title: tabData?.title || id });
    setTabs(tabs.filter((t) => t !== id));
    showToast(`Closed “${tabData?.title || id}”`, true);
  };

  const handleUndo = () => {
    if (!closed) return;
    setTabs((prev) => {
      const copy = [...prev];
      copy.splice(closed.i, 0, closed.id);
      return copy;
    });
    setClosed(null);
    setToastMsg(null);
  };

  const currentTab = cur ? CHROME_TABS_DATA[cur] : null;

  return (
    <div
      ref={containerRef}
      className="chrome-root"
      onPointerMove={handlePointerMove}
      style={{ ['--px' as any]: px } as React.CSSProperties}
    >
      <div className="chrome-sw">
        <ChromeSwitcherHeader
          tabCount={tabs.length}
          mode={mode}
          onToggleMode={() => setMode((m) => (m === 'grid' ? 'stack' : 'grid'))}
          onExit={onExit}
        />
        <div ref={tcsRef} className={`chrome-tcs ${mode === 'stack' ? 'stk' : ''}`}>
          {tabs.length > 0 ? (
            tabs.map((id) => {
              const tab = CHROME_TABS_DATA[id];
              if (!tab) return null;
              return (
                <ChromeTabCard
                  key={id}
                  tab={tab}
                  scaleK={scaleK}
                  cardHeight={cardHeight}
                  onClick={(e) => openTab(id, e.currentTarget)}
                  onClose={() => handleCloseTab(id)}
                />
              );
            })
          ) : (
            <div style={{ gridColumn: '1 / -1', margin: 'auto', marginTop: 80, textAlign: 'center', color: 'var(--mut)' }}>
              No tabs open.<br />Tap New tab to start.
            </div>
          )}
        </div>
      </div>

      {!cur && (
        <button
          type="button"
          className="chrome-fab"
          aria-label="New tab"
          onClick={() => {
            if (!tabs.includes('home')) setTabs((p) => ['home', ...p]);
            openTab('home', null);
          }}
        >
          <span style={{ fontSize: 20 }}>+</span>New tab
        </button>
      )}

      {currentTab && (
        <ChromeSheet
          sheetRef={sheetRef}
          tab={currentTab}
          tabCount={tabs.length}
          onClosePage={closePage}
          onSelectTile={(id) => {
            if (!tabs.includes(id)) setTabs((p) => [...p, id]);
            setCur(id);
          }}
          onToast={showToast}
        />
      )}

      {toastMsg && <ChromeUndoToast text={toastMsg.text} showUndo={toastMsg.undo} onUndo={handleUndo} />}
    </div>
  );
};
