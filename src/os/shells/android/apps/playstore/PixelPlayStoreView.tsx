'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PLAY_APPS } from './data';
import { PlayApp } from './types';
import { PlayStoreDetailView } from './PlayStoreDetailView';
import { PlayStoreAppSimulator } from './PlayStoreAppSimulator';
import { PlayStoreForYouTab } from './PlayStoreForYouTab';
import { PlayStoreTopChartsTab } from './PlayStoreTopChartsTab';
import { PlayStoreCategoriesTab } from './PlayStoreCategoriesTab';
import { PlayStoreBottomNav } from './PlayStoreBottomNav';
import { PlayStoreSearchResults } from './PlayStoreSearchResults';
import { T, ratingNum } from './playUi';
import { usePrefsStore } from '@/src/store/prefs';
import { notch } from '@/src/os/notch';

type Tab = 'foryou' | 'charts' | 'cats';
type LangFilter = 'Kotlin' | 'Flutter' | null;

const TABS: { id: Tab; label: string }[] = [
  { id: 'foryou', label: 'For you' },
  { id: 'charts', label: 'Top charts' },
  { id: 'cats', label: 'Categories' },
];

const INSTALLED_KEY = 'play_installed_v1';
const OS_NAV_SPACE = '';

const PlayLogo: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
    <path fill="#4285F4" d="M3.6 2.3 C3.2 2.7 3 3.3 3 4.1 V19.9 C3 20.7 3.2 21.3 3.6 21.7 L13.3 12 Z" />
    <path fill="#34A853" d="M17.4 8.8 L13.3 12 L3.6 2.3 C4.1 2 4.9 2 5.8 2.5 Z" />
    <path fill="#FBBC04" d="M20.7 10.7 L17.4 8.8 L13.3 12 L17.4 15.2 L20.7 13.3 C21.8 12.6 21.8 11.4 20.7 10.7 Z" />
    <path fill="#EA4335" d="M3.6 21.7 L13.3 12 L17.4 15.2 L5.8 21.5 C4.9 22 4.1 22 3.6 21.7 Z" />
  </svg>
);

export const PixelPlayStoreView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const [selectedApp, setSelectedApp] = useState<PlayApp | null>(null);
  const [simulatingApp, setSimulatingApp] = useState<PlayApp | null>(null);
  const [tab, setTab] = useState<Tab>('foryou');
  const [filter, setFilter] = useState<LangFilter>(null);
  const [query, setQuery] = useState('');
  const [installed, setInstalled] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(INSTALLED_KEY);
      if (saved) setInstalled(JSON.parse(saved));
    } catch {}
  }, []);

  const setInstall = (id: string, value: boolean) =>
    setInstalled((prev) => {
      const next = { ...prev, [id]: value };
      try {
        localStorage.setItem(INSTALLED_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });

  const handleLaunchLink = (url: string, title: string) => {
    notch.show({ title: `Opening ${title}`, subtitle: url });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (simulatingApp) {
    return (
      <PlayStoreAppSimulator
        app={simulatingApp}
        onBack={() => setSimulatingApp(null)}
        onOpenLink={handleLaunchLink}
      />
    );
  }

  if (selectedApp) {
    return (
      <PlayStoreDetailView
        key={selectedApp.id}
        app={selectedApp}
        apps={PLAY_APPS}
        lang={language}
        installed={Boolean(installed[selectedApp.id])}
        onInstall={(a) => setInstall(a.id, true)}
        onUninstall={(a) => setInstall(a.id, false)}
        onBack={() => setSelectedApp(null)}
        onSelectApp={setSelectedApp}
        onOpenApp={setSimulatingApp}
        onLaunchLink={handleLaunchLink}
      />
    );
  }

  const q = query.trim().toLowerCase();
  const matches = (app: PlayApp) =>
    (!filter || app.lang === filter) &&
    (!q || app.name.toLowerCase().includes(q) || app.category.toLowerCase().includes(q) ||
      app.tagline[language].toLowerCase().includes(q) || app.stack.some((s) => s.toLowerCase().includes(q)));

  const showResults = Boolean(q) || filter !== null;
  const results = PLAY_APPS.filter(matches);
  const langs = Array.from(new Set(PLAY_APPS.map((a) => a.lang)));
  const charts = [...PLAY_APPS].sort((a, b) => ratingNum(b.rating) - ratingNum(a.rating));

  return (
    <div className={`flex-1 min-h-0 flex flex-col font-sans ${T.text} ${OS_NAV_SPACE}`}>
      <div className="flex-1 overflow-y-auto scrollbar-none pb-4">
        {/* Search bar */}
        <div className="px-4 pt-3 pb-2">
          <label className={`flex items-center gap-3 h-12 pl-4 pr-2 rounded-full ${T.cardHi} cursor-text`}>
            <PlayLogo />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search apps & games"
              className={`flex-1 min-w-0 bg-transparent text-[14px] focus:outline-none placeholder:text-[var(--m3-on-surface-variant,#c4c7c5)] ${T.text}`}
            />
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              RN
            </div>
          </label>
        </div>

        {showResults ? (
          <PlayStoreSearchResults
            query={query}
            filter={filter}
            langs={langs}
            results={results}
            installed={installed}
            onFilterChange={setFilter}
            onSelectApp={setSelectedApp}
          />
        ) : (
          <>
            <div className={`flex items-center overflow-x-auto scrollbar-none border-b ${T.line}`}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative px-4 h-12 text-[14px] font-medium shrink-0 cursor-pointer ${
                    tab === t.id ? T.primaryText : T.sub
                  }`}
                >
                  {t.label}
                  {tab === t.id && (
                    <span className="absolute left-3 right-3 bottom-0 h-[3px] rounded-t-full bg-[var(--m3-primary,#6dd58c)]" />
                  )}
                </button>
              ))}
            </div>

            {tab === 'foryou' && (
              <PlayStoreForYouTab
                featured={PLAY_APPS[0]}
                apps={PLAY_APPS}
                langs={langs}
                language={language}
                installed={installed}
                onSelectApp={setSelectedApp}
                onOpenCharts={() => setTab('charts')}
                onFilterLang={(l) => setFilter(l)}
              />
            )}
            {tab === 'charts' && (
              <PlayStoreTopChartsTab charts={charts} installed={installed} onSelectApp={setSelectedApp} />
            )}
            {tab === 'cats' && (
              <PlayStoreCategoriesTab apps={PLAY_APPS} langs={langs} onSelectLang={(l) => setFilter(l)} />
            )}
          </>
        )}
      </div>

      <PlayStoreBottomNav
        onSearchClick={() => inputRef.current?.focus()}
        onAppsClick={() => {
          setQuery('');
          setFilter(null);
          setTab('foryou');
        }}
      />
    </div>
  );
};
