'use client';

import React from 'react';
import { PlayApp } from './types';
import { PlayStoreFeaturedHero } from './PlayStoreFeaturedHero';
import { AppRow, AppTile, SectionHeader, T } from './playUi';
import { ArrowRight } from 'lucide-react';

interface PlayStoreForYouTabProps {
  featured?: PlayApp;
  apps: PlayApp[];
  langs: string[];
  language: 'en' | 'id';
  installed: Record<string, boolean>;
  onSelectApp: (app: PlayApp) => void;
  onOpenCharts: () => void;
  onFilterLang: (lang: 'Kotlin' | 'Flutter') => void;
}

const chunk = <U,>(arr: U[], n: number): U[][] =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));

export const PlayStoreForYouTab: React.FC<PlayStoreForYouTabProps> = ({
  featured,
  apps,
  langs,
  language,
  installed,
  onSelectApp,
  onOpenCharts,
  onFilterLang,
}) => {
  return (
    <div className="flex flex-col gap-6 py-4 animate-in fade-in duration-200">
      {featured && (
        <PlayStoreFeaturedHero
          app={featured}
          language={language}
          installed={Boolean(installed[featured.id])}
          onSelect={() => onSelectApp(featured)}
        />
      )}

      {/* Suggested for you */}
      <section>
        <SectionHeader
          title="Suggested for you"
          icon={<ArrowRight size={20} />}
          onClick={onOpenCharts}
        />
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 scrollbar-none">
          {chunk(apps, 3).map((col, i) => (
            <div key={i} className="snap-start shrink-0 w-[86%] flex flex-col gap-4">
              {col.map((app) => (
                <AppRow
                  key={app.id}
                  app={app}
                  installed={installed[app.id]}
                  onClick={() => onSelectApp(app)}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Per language sections */}
      {langs.map((l) => (
        <section key={l}>
          <SectionHeader
            title={`${l} apps`}
            icon={<ArrowRight size={20} />}
            onClick={() => onFilterLang(l as 'Kotlin' | 'Flutter')}
          />
          <div className="flex gap-3.5 overflow-x-auto snap-x px-4 scrollbar-none">
            {apps
              .filter((a) => a.lang === l)
              .map((app) => (
                <AppTile key={app.id} app={app} onClick={() => onSelectApp(app)} />
              ))}
          </div>
        </section>
      ))}

      <p className={`text-[11px] text-center m-0 ${T.sub}`}>
        Portfolio projects · Verified by Play Protect
      </p>
    </div>
  );
};

