'use client';

import React from 'react';
import { profileData } from '../../../../data/profile';
import { usePrefsStore } from '../../../../store/prefs';
import { notch } from '../../../notch';

export const PixelResumeView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);

  const handleDownload = () => {
    notch.show({
      title: 'Downloading Curriculum Vitae',
      subtitle: 'CV_Rado_Situmorang.pdf',
    });
    // Open CV in new tab or trigger download
    window.open('/cv.pdf', '_blank');
  };

  return (
    <div className="flex flex-col gap-5 p-4 pb-16 text-[var(--m3-on-surface)] font-sans">
      {/* 1. GOOGLE DOCS HEADER BANNER */}
      <div className="p-4 rounded-[28px] bg-[var(--m3-surface-container)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-[14px] bg-[#4285F4]/20 text-[#4285F4] flex items-center justify-center shrink-0">
            <span className="material-symbols-rounded text-[28px]">description</span>
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold truncate">Curriculum Vitae</h2>
            <p className="text-[11px] text-[var(--m3-on-surface-variant)] truncate">
              PDF Document • Updated 2026
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold active:scale-95 transition-transform shrink-0"
        >
          <span className="material-symbols-rounded text-[16px]">download</span>
          <span>Download</span>
        </button>
      </div>

      {/* 2. SUMMARY HIGHLIGHTS (ASYMMETRIC GROUPED CARDS) */}
      <section>
        <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          Profile Highlights
        </h3>
        <div className="flex flex-col gap-[3px]">
          <div className="p-4 rounded-t-[20px] rounded-b-[4px] bg-[var(--m3-surface-container)]">
            <p className="text-xs font-semibold text-[var(--m3-primary)] mb-1">Education</p>
            <p className="text-sm font-bold">{profileData.education.institution}</p>
            <p className="text-xs text-[var(--m3-on-surface-variant)] mt-0.5">
              {profileData.education.program[language]} • GPA {profileData.education.gpa}
            </p>
          </div>

          <div className="p-4 rounded-[4px] bg-[var(--m3-surface-container)]">
            <p className="text-xs font-semibold text-[var(--m3-primary)] mb-1">Current Focus</p>
            <p className="text-sm font-bold">Mobile Development</p>
            <p className="text-xs text-[var(--m3-on-surface-variant)] mt-0.5">
              Building scalable, beautiful web and mobile applications with Kotlin, React, Next.js, and TypeScript.
            </p>
          </div>

          <div className="p-4 rounded-t-[4px] rounded-b-[20px] bg-[var(--m3-surface-container)]">
            <p className="text-xs font-semibold text-[var(--m3-primary)] mb-1">Key Experience</p>
            <p className="text-sm font-bold">Bangkit Academy & CV Mariban Indonesia</p>
            <p className="text-xs text-[var(--m3-on-surface-variant)] mt-0.5">
              Mobile Development Cohort (Google, GoTo, Traveloka) & Web Programmer.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

