'use client';

import React from 'react';
import { profileData } from '../../../../data/profile';
import { usePrefsStore } from '../../../../store/prefs';
import { notch } from '../../../notch';

export const PixelAboutView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);

  const handleOpenSocial = (url: string) => {
    notch.show({
      title: 'Opening External Link',
      subtitle: url,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-4 p-4 pb-16 text-[var(--m3-on-surface)] font-sans">
      {/* 1. HERO BANNER M3 EXPRESSIVE */}
      <div className="p-4 rounded-[28px] bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)] flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 rounded-[14px] bg-[var(--m3-primary)] text-[var(--m3-on-primary)] flex items-center justify-center text-xl font-extrabold shrink-0 shadow-sm">
          RN
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] font-semibold">
              Pixel 10 Pro
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#81C995]/30 text-emerald-300 text-[10px] font-bold">
              GPA {profileData.education.gpa}
            </span>
          </div>
          <h2 className="text-base font-bold leading-snug truncate">
            {profileData.name}
          </h2>
          <p className="text-xs font-semibold opacity-90 mt-0.5 truncate text-[var(--m3-on-primary-container)]">
            {profileData.tagline[language]}
          </p>
          <p className="text-[11px] opacity-75 truncate">
            {profileData.education.institution}
          </p>
        </div>
      </div>

      {/* 2. BIO & SYSTEM SUMMARY */}
      <section>
        <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          About Me
        </h3>
        <div className="p-4 rounded-[24px] bg-[var(--m3-surface-container)] text-xs leading-relaxed text-[var(--m3-on-surface-variant)] shadow-xs">
          <p className="leading-relaxed text-justify">{profileData.about[language]}</p>
        </div>
      </section>

      {/* 3. CORE FOCUS CARDS */}
      <section>
        <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          Specialization
        </h3>
        <div className="flex flex-col gap-[3px]">
          <div className="p-3.5 rounded-t-[20px] rounded-b-[4px] bg-[var(--m3-surface-container)] flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--m3-on-surface)]">Native Android &amp; Cross-Platform</p>
              <p className="text-[11px] text-[var(--m3-on-surface-variant)] mt-0.5">Kotlin, Jetpack Compose, Flutter, Dart</p>
            </div>
            <span className="material-symbols-rounded text-[var(--m3-primary)] text-[22px]">smartphone</span>
          </div>

          <div className="p-3.5 rounded-t-[4px] rounded-b-[20px] bg-[var(--m3-surface-container)] flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--m3-on-surface)]">Modern Frontend Architecture</p>
              <p className="text-[11px] text-[var(--m3-on-surface-variant)] mt-0.5">React, Next.js, TypeScript, Tailwind CSS</p>
            </div>
            <span className="material-symbols-rounded text-emerald-400 text-[22px]">layers</span>
          </div>
        </div>
      </section>

      {/* 4. CONNECT CHIPS */}
      <section>
        <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          Official Profiles
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleOpenSocial(profileData.linkedin)}
            className="flex items-center gap-2.5 p-3 rounded-[16px] bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] text-left transition-colors active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0A66C2]/20 text-[#0A66C2] flex items-center justify-center shrink-0">
              <span className="material-symbols-rounded text-[18px]">badge</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">LinkedIn</p>
              <p className="text-[10px] text-[var(--m3-on-surface-variant)] truncate">Professional</p>
            </div>
          </button>

          <button
            onClick={() => handleOpenSocial(profileData.github)}
            className="flex items-center gap-2.5 p-3 rounded-[16px] bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] text-left transition-colors active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-rounded text-[18px]">code</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">GitHub</p>
              <p className="text-[10px] text-[var(--m3-on-surface-variant)] truncate">Repositories</p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
