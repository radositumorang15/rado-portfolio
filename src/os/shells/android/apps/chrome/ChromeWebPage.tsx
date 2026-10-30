'use client';

import React, { useState } from 'react';
import { ChromeTab } from './types';
import { CHROME_TABS_DATA } from './data';

interface ChromeWebPageProps {
  tab: ChromeTab;
  onSelectTile?: (id: string) => void;
  onCtaClick?: (tab: ChromeTab) => void;
  isThumbnail?: boolean;
}

export const ChromeWebPage: React.FC<ChromeWebPageProps> = ({
  tab,
  onSelectTile,
  onCtaClick,
  isThumbnail = false,
}) => {
  const [query, setQuery] = useState('');

  if (tab.ntp) {
    const allProjects = Object.values(CHROME_TABS_DATA).filter((t) => !t.ntp);
    const q = query.trim().toLowerCase();
    const filtered = allProjects.filter((t) => !q || t.title.toLowerCase().includes(q));

    return (
      <div className="chrome-ntp">
        <h1>Projects</h1>
        <p>{allProjects.length} websites</p>
        {!isThumbnail && (
          <input
            className="chrome-nq"
            placeholder="Search projects"
            aria-label="Search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
        <div className="chrome-tiles">
          {filtered.length > 0 ? (
            filtered.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTile?.(t.id)}
              >
                <i
                  className="chrome-fv"
                  style={{ background: `hsl(${t.hue} 65% 48%)` }}
                >
                  {t.l}
                </i>
                <span>{t.title}</span>
              </button>
            ))
          ) : (
            <span style={{ gridColumn: '1 / -1', color: 'var(--mut)' }}>No matches</span>
          )}
        </div>
      </div>
    );
  }

  const hue = tab.hue;
  const gradientBg = `linear-gradient(160deg, hsl(${hue} 70% 44%), hsl(${hue + 40} 70% 28%))`;

  return (
    <div
      className="chrome-web"
      style={{
        fontFamily: tab.serif ? 'Georgia, serif' : 'system-ui, sans-serif',
      }}
    >
      <div className="chrome-wh" style={{ background: gradientBg }}>
        <small>{tab.url}</small>
        <h1>{tab.hero?.[0]}</h1>
        <p>{tab.hero?.[1]}</p>
        <button
          type="button"
          className="chrome-cta"
          style={{ color: `hsl(${hue} 70% 30%)` }}
          onClick={() => onCtaClick?.(tab)}
        >
          {tab.hero?.[2]}
        </button>
      </div>

      {tab.sec?.map(([secTitle, items], idx) => (
        <div key={idx} className="chrome-ws">
          <h2>{secTitle}</h2>
          {items.map(([itemTitle, itemDesc], i) =>
            itemDesc ? (
              <div
                key={i}
                className="chrome-wc"
                style={{ background: `hsl(${hue} 60% 96%)` }}
              >
                <b>{itemTitle}</b>
                <span>{itemDesc}</span>
              </div>
            ) : (
              <span
                key={i}
                className="chrome-wc t"
                style={{ background: `hsl(${hue} 60% 92%)` }}
              >
                {itemTitle}
              </span>
            )
          )}
        </div>
      ))}

      <div className="chrome-wf">© {tab.title}. Sample content for the concept.</div>
    </div>
  );
};
