'use client';

import React, { useState } from 'react';
import { experienceData } from '../../../../data/experience';
import { Experience } from '../../../../data/types';
import { usePrefsStore } from '../../../../store/prefs';

export const PixelExperienceView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const work = experienceData.filter((e) => e.type === 'work' || e.type === 'internship');
  const other = experienceData.filter((e) => e.type !== 'work' && e.type !== 'internship');

  const renderGroup = (title: string, list: Experience[]) => (
    <section className="flex flex-col gap-2">
      <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
        {title}
      </h3>
      <div className="flex flex-col gap-[3px]">
        {list.map((exp, idx, arr) => {
          const radiusClass =
            arr.length === 1
              ? 'rounded-[24px]'
              : idx === 0
              ? 'rounded-t-[24px] rounded-b-[4px]'
              : idx === arr.length - 1
              ? 'rounded-t-[4px] rounded-b-[24px]'
              : 'rounded-[4px]';

          return (
            <div
              key={exp.slug}
              onClick={() => setSelectedExp(exp)}
              className={`p-4 bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] cursor-pointer transition-colors active:scale-99 flex flex-col gap-2 ${radiusClass}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-[var(--m3-on-surface)] leading-snug">
                    {exp.role[language]}
                  </h4>
                  <p className="text-xs text-[var(--m3-primary)] font-medium mt-0.5">
                    {exp.org}
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[10px] font-bold shrink-0">
                  {exp.start} — {exp.end === 'present' ? (language === 'id' ? 'Sekarang' : 'Present') : exp.end}
                </span>
              </div>

              {exp.location && (
                <div className="flex items-center gap-1 text-[11px] text-[var(--m3-on-surface-variant)]">
                  <span className="material-symbols-rounded text-[14px]">location_on</span>
                  <span>{exp.location[language]}</span>
                </div>
              )}

              <ul className="list-disc list-inside text-xs text-[var(--m3-on-surface-variant)] space-y-1 mt-1">
                {exp.bullets.slice(0, 2).map((b, i) => (
                  <li key={i} className="line-clamp-1">{b[language]}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className="flex flex-col gap-5 p-4 pb-16 text-[var(--m3-on-surface)] font-sans">
      {renderGroup('Professional & Internship Experience', work)}
      {other.length > 0 && renderGroup('Organizations & Activities', other)}

      {/* DETAIL MODAL SHEET */}
      {selectedExp && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex flex-col justify-end p-3 animate-in fade-in duration-200"
          onClick={() => setSelectedExp(null)}
        >
          <div
            className="w-full max-w-md mx-auto p-5 rounded-[28px] bg-[var(--m3-surface-container)] text-[var(--m3-on-surface)] shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-[var(--m3-on-surface-variant)]/40 mx-auto" />

            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[10px] font-bold uppercase tracking-wider">
                  {selectedExp.type}
                </span>
                <h3 className="text-base font-bold mt-1.5 text-[var(--m3-on-surface)]">
                  {selectedExp.role[language]}
                </h3>
                <p className="text-xs text-[var(--m3-primary)] font-medium mt-0.5">
                  {selectedExp.org}
                </p>
                {selectedExp.location && (
                  <p className="text-[11px] text-[var(--m3-on-surface-variant)] mt-0.5">
                    {selectedExp.location[language]} • {selectedExp.start} — {selectedExp.end}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedExp(null)}
                className="w-8 h-8 rounded-full bg-[var(--m3-surface-container-high)] flex items-center justify-center text-[var(--m3-on-surface)]"
              >
                <span className="material-symbols-rounded text-[18px]">close</span>
              </button>
            </div>

            <div className="p-3.5 rounded-[20px] bg-[var(--m3-surface-container-high)]">
              <p className="text-xs font-semibold text-[var(--m3-primary)] mb-2 uppercase tracking-wider">
                Key Contributions & Responsibilities
              </p>
              <ul className="space-y-2 text-xs text-[var(--m3-on-surface)]">
                {selectedExp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--m3-primary)] mt-1.5 shrink-0" />
                    <span>{b[language]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedExp(null)}
              className="w-full h-10 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold active:scale-98 transition-transform"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

