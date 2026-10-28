'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { Experience } from '../../data/types';

interface ExperienceViewProps {
  experiences: Experience[];
  selectedSlug?: string;
  lang?: 'en' | 'id';
  onSelect?: (slug: string) => void;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({
  experiences,
  selectedSlug,
  lang = 'en',
  onSelect,
}) => {
  const activeExp = experiences.find((e) => e.slug === selectedSlug) || experiences[0];

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[460px] text-[var(--rn-text)]">
      {/* Sidebar List */}
      <div className="w-full md:w-80 border-r border-[var(--rn-border)] p-4 flex flex-col gap-2 overflow-y-auto bg-[var(--rn-surface)]">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)] mb-2 px-2">
          Career & Roles
        </h2>
        {experiences.map((exp) => {
          const isSelected = exp.slug === activeExp?.slug;
          return (
            <div
              key={exp.slug}
              onClick={() => onSelect?.(exp.slug)}
              className={`p-3 rounded-[var(--rn-radius-control)] cursor-pointer transition-colors flex flex-col gap-1 border ${
                isSelected
                  ? 'bg-[var(--rn-accent-soft)] border-[var(--rn-accent)] text-[var(--rn-accent)] font-medium'
                  : 'bg-[var(--rn-surface-alt)] border-[var(--rn-border)] hover:bg-[var(--rn-surface)]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold truncate">{exp.role[lang]}</span>
                <span className="text-[10px] text-[var(--rn-text-muted)] shrink-0">{exp.start}</span>
              </div>
              <span className="text-[11px] text-[var(--rn-text-muted)] truncate">{exp.org}</span>
            </div>
          );
        })}
      </div>

      {/* Main Detail Area */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 bg-[var(--rn-bg)]">
        {activeExp && (
          <>
            <div className="flex flex-col gap-2 pb-4 border-b border-[var(--rn-border)]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--rn-accent)]">
                <Briefcase size={14} />
                <span>{activeExp.type.toUpperCase()}</span>
              </div>
              <h1 className="text-xl font-bold">{activeExp.role[lang]}</h1>
              <h2 className="text-sm font-semibold text-[var(--rn-text-muted)]">{activeExp.org}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--rn-text-muted)] mt-1">
                <div className="flex items-center gap-1">
                  <Calendar size={13} />
                  <span>{activeExp.start} – {activeExp.end}</span>
                </div>
                {activeExp.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={13} />
                    <span>{activeExp.location[lang]}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)]">
                Key Responsibilities & Achievements
              </h3>
              <ul className="flex flex-col gap-2.5">
                {activeExp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--rn-accent)] mt-1.5 shrink-0" />
                    <span>{bullet[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
