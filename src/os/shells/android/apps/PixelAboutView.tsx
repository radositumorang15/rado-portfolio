'use client';

import React, { useState } from 'react';
import { profileData } from '../../../../data/profile';
import { usePrefsStore } from '../../../../store/prefs';
import { notch } from '../../../notch';

export const PixelAboutView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const [copied, setCopied] = useState(false);

  const handleCopySpecs = () => {
    const text = `Device: ${profileData.deviceSpecs.deviceName}\nProcessor: ${profileData.deviceSpecs.processor}\nGPA: ${profileData.deviceSpecs.gpa}\nLanguages: ${profileData.deviceSpecs.languages}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    notch.show({
      title: 'Specs Copied',
      subtitle: 'Copied specs to clipboard',
    });
  };

  const handleOpenSocial = (url: string) => {
    notch.show({
      title: 'Opening External Link',
      subtitle: url,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col gap-5 p-4 pb-16 text-[var(--m3-on-surface)] font-sans">
      {/* 1. HERO BANNER M3 EXPRESSIVE (Optical Roundness: Outer 28px - Padding 16px = Inner 12px) */}
      <div className="p-4 rounded-[28px] bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)] flex items-center gap-4">
        <div className="w-16 h-16 rounded-[12px] bg-[var(--m3-primary)] text-[var(--m3-on-primary)] flex items-center justify-center text-xl font-extrabold shrink-0 shadow-sm">
          RN
        </div>
        <div className="min-w-0">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/20 text-[11px] font-semibold mb-1">
            Pixel 10 Pro • RadoOS 16
          </span>
          <h2 className="text-base font-bold leading-snug truncate">
            {profileData.name}
          </h2>
          <p className="text-xs opacity-85 mt-0.5 truncate">
            {profileData.tagline[language]}
          </p>
        </div>
      </div>

      {/* 2. DEVICE SPECIFICATIONS (ASYMMETRIC GROUPED CARDS) */}
      <section>
        <div className="flex items-center justify-between px-2 mb-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
            Device Specifications
          </h3>
          <button
            onClick={handleCopySpecs}
            className="flex items-center gap-1 text-[11px] font-medium text-[var(--m3-primary)] hover:underline"
          >
            <span className="material-symbols-rounded text-[14px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="flex flex-col gap-[3px]">
          {/* Item 1 (Top): rounded-t-[24px] rounded-b-[4px] */}
          <div className="p-4 rounded-t-[24px] rounded-b-[4px] bg-[var(--m3-surface-container)] flex justify-between items-center">
            <div>
              <p className="text-xs text-[var(--m3-on-surface-variant)]">Device Name</p>
              <p className="text-sm font-semibold mt-0.5">{profileData.deviceSpecs.deviceName}</p>
            </div>
            <span className="material-symbols-rounded text-[var(--m3-on-surface-variant)] text-[22px]">smartphone</span>
          </div>

          {/* Item 2 (Middle): rounded-[4px] */}
          <div className="p-4 rounded-[4px] bg-[var(--m3-surface-container)] flex justify-between items-center">
            <div>
              <p className="text-xs text-[var(--m3-on-surface-variant)]">Processor / Education</p>
              <p className="text-sm font-semibold mt-0.5">{profileData.education.program[language]} — {profileData.education.institution}</p>
            </div>
            <span className="material-symbols-rounded text-[var(--m3-on-surface-variant)] text-[22px]">school</span>
          </div>

          {/* Item 3 (Middle): rounded-[4px] */}
          <div className="p-4 rounded-[4px] bg-[var(--m3-surface-container)] flex justify-between items-center">
            <div>
              <p className="text-xs text-[var(--m3-on-surface-variant)]">Cumulative GPA</p>
              <p className="text-sm font-semibold mt-0.5">{profileData.education.gpa} / 4.00 ({profileData.education.period})</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#81C995]/20 text-[#81C995] text-xs font-bold">
              Cumlaude Track
            </span>
          </div>

          {/* Item 4 (Bottom): rounded-t-[4px] rounded-b-[24px] */}
          <div className="p-4 rounded-t-[4px] rounded-b-[24px] bg-[var(--m3-surface-container)] flex justify-between items-center">
            <div>
              <p className="text-xs text-[var(--m3-on-surface-variant)]">Languages</p>
              <p className="text-sm font-semibold mt-0.5">{profileData.deviceSpecs.languages}</p>
            </div>
            <span className="material-symbols-rounded text-[var(--m3-on-surface-variant)] text-[22px]">translate</span>
          </div>
        </div>
      </section>

      {/* 3. BIO & SUMMARY */}
      <section>
        <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          System Summary
        </h3>
        <div className="p-4 rounded-[24px] bg-[var(--m3-surface-container)] text-xs leading-relaxed text-[var(--m3-on-surface-variant)]">
          {profileData.about[language]}
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
            className="flex items-center gap-2.5 p-3 rounded-[16px] bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] text-left transition-colors active:scale-98"
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
            className="flex items-center gap-2.5 p-3 rounded-[16px] bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] text-left transition-colors active:scale-98"
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

