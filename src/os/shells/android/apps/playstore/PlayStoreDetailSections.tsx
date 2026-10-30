'use client';

import React, { useState } from 'react';
import { PlayApp } from './types';
import { AppTile, SectionHeader, T } from './playUi';
import { PlayStoreReviewsSection } from './PlayStoreReviewsSection';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Play,
  Video,
} from 'lucide-react';

interface PlayStoreDetailSectionsProps {
  app: PlayApp;
  apps: PlayApp[];
  lang: 'en' | 'id';
  onOpenApp: (app: PlayApp) => void;
  onSelectApp: (app: PlayApp) => void;
  onLaunchLink: (url: string, title: string) => void;
}

export const PlayStoreDetailSections: React.FC<PlayStoreDetailSectionsProps> = ({
  app,
  apps,
  lang,
  onOpenApp,
  onSelectApp,
  onLaunchLink,
}) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const others = apps.filter((a) => a.id !== app.id);
  const desc = app.description[lang] || app.description.en;
  const tagline = app.tagline[lang] || app.tagline.en;

  const supportRows = [
    app.githubUrl && { Icon: Github, label: 'Source code', sub: 'GitHub repository', url: app.githubUrl },
    app.liveUrl && { Icon: ExternalLink, label: 'Live demo', sub: app.liveUrl, url: app.liveUrl },
    app.videoUrl && { Icon: Video, label: 'Demo video', sub: app.videoUrl, url: app.videoUrl },
  ].filter(Boolean) as { Icon: typeof Github; label: string; sub: string; url: string }[];

  return (
    <div className="flex flex-col">
      {/* Screenshots */}
      {app.screens.length > 0 && (
        <div className="flex gap-2 overflow-x-auto snap-x px-4 mt-5 scrollbar-none">
          {app.videoUrl && (
            <button
              onClick={() => onLaunchLink(app.videoUrl!, 'Demo Video')}
              className="relative snap-start shrink-0 h-60 w-[135px] rounded-xl overflow-hidden cursor-pointer"
              aria-label="Play demo video"
            >
              <img src={app.screens[0].image} alt="" className="w-full h-full object-cover object-top brightness-50" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">
                  <Play size={20} fill="currentColor" />
                </span>
              </span>
            </button>
          )}
          {app.screens.map((screen, idx) => (
            <button
              key={idx}
              onClick={() => onOpenApp(app)}
              className={`snap-start shrink-0 h-60 w-[135px] rounded-xl overflow-hidden border cursor-pointer bg-black ${T.line}`}
              title={screen.label}
            >
              <img src={screen.image} alt={screen.label} className="w-full h-full object-cover object-top" />
            </button>
          ))}
        </div>
      )}

      {/* About this app */}
      <section className="mt-6">
        <SectionHeader
          title="About this app"
          icon={aboutOpen ? <ChevronUp size={20} /> : <ArrowRight size={20} />}
          onClick={() => setAboutOpen((v) => !v)}
        />
        <div className="px-4">
          <p className={`text-[13.5px] leading-[1.55] m-0 ${T.sub} ${aboutOpen ? '' : 'line-clamp-4'}`}>
            {tagline}. {desc}
          </p>
          {aboutOpen && app.features && app.features.length > 0 && (
            <ul className="list-none p-0 mt-3 mb-0 flex flex-col gap-1.5">
              {app.features.map((f, i) => (
                <li key={i} className={`flex items-start gap-2 text-[13px] ${T.sub}`}>
                  <CheckCircle2 size={14} className={`${T.primaryText} shrink-0 mt-0.5`} />
                  {f}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 mt-3">
            {[app.category, app.lang, ...(aboutOpen ? app.stack : [])].map((c) => (
              <span key={c} className={`px-3 h-8 inline-flex items-center rounded-lg text-[13px] border ${T.line}`}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Data safety + Ratings and reviews */}
      <PlayStoreReviewsSection ratingValue={app.rating} reviewsCount={app.reviewsCount} />

      {/* What's new */}
      {app.features && app.features.length > 0 && (
        <section className="mt-7">
          <SectionHeader title="What’s new" icon={<ArrowRight size={20} />} />
          <div className="px-4">
            <p className={`text-[12px] mt-0 mb-2 ${T.sub}`}>Version 1.0 · {app.year}</p>
            <ul className="list-none p-0 m-0 flex flex-col gap-1">
              {app.features.slice(0, 3).map((f, i) => (
                <li key={i} className={`text-[13px] ${T.sub}`}>• {f}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* App support */}
      {supportRows.length > 0 && (
        <section className="mt-7">
          <SectionHeader
            title="App support"
            icon={supportOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            onClick={() => setSupportOpen((v) => !v)}
          />
          {supportOpen && (
            <div className="px-4 flex flex-col gap-1 animate-in fade-in duration-150">
              {supportRows.map(({ Icon, label, sub, url }) => (
                <button
                  key={label}
                  onClick={() => onLaunchLink(url, label)}
                  className="flex items-center gap-4 py-2.5 text-left cursor-pointer active:opacity-70"
                >
                  <Icon size={20} className={T.sub} />
                  <div className="min-w-0">
                    <div className="text-[14px]">{label}</div>
                    <div className={`text-[12px] truncate ${T.sub}`}>{sub}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* More by developer */}
      {others.length > 0 && (
        <section className="mt-7 mb-4">
          <SectionHeader title={`More by ${app.developer}`} icon={<ArrowRight size={20} />} />
          <div className="flex gap-3.5 overflow-x-auto snap-x px-4 scrollbar-none">
            {others.map((a) => (
              <AppTile key={a.id} app={a} onClick={() => onSelectApp(a)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
