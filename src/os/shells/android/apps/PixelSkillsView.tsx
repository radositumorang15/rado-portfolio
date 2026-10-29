'use client';

import React, { useState } from 'react';
import { skillsData } from '../../../../data/skills';
import { Skill } from '../../../../data/types';
import { projectsData } from '../../../../data/projects';
import { usePrefsStore } from '../../../../store/prefs';

const SKILL_LEVEL_PERCENT: Record<string, number> = {
  Kotlin: 90,
  'XML (Android)': 90,
  JavaScript: 88,
  'HTML & CSS': 92,
  'Bootstrap 5': 88,
  'CodeIgniter 3': 82,
  ReactJS: 70,
  Flutter: 65,
  VueJS: 60,
  PHP: 75,
  Git: 88,
  'Android Studio': 90,
  Figma: 82,
  Postman: 85,
  Firebase: 72,
  'VS Code': 92,
};

export const PixelSkillsView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const competent = skillsData.filter((s) => s.category === 'competent');
  const novice = skillsData.filter((s) => s.category === 'novice');
  const tools = skillsData.filter((s) => s.category === 'tool');

  const renderSkillGroup = (title: string, list: Skill[]) => (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          {title}
        </h3>
        <span className="text-[11px] text-[var(--m3-on-surface-variant)]">
          {list.length} skills
        </span>
      </div>

      <div className="flex flex-col gap-[3px]">
        {list.map((skill, idx, arr) => {
          const radiusClass =
            arr.length === 1
              ? 'rounded-[24px]'
              : idx === 0
              ? 'rounded-t-[24px] rounded-b-[4px]'
              : idx === arr.length - 1
              ? 'rounded-t-[4px] rounded-b-[24px]'
              : 'rounded-[4px]';

          const percent = SKILL_LEVEL_PERCENT[skill.name] ?? 75;

          return (
            <div
              key={skill.name}
              onClick={() => setSelectedSkill(skill)}
              className={`p-4 bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] cursor-pointer transition-colors active:scale-99 ${radiusClass}`}
            >
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-sm font-semibold">{skill.name}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[10px] font-bold uppercase tracking-wider">
                  {skill.level}
                </span>
              </div>

              {/* M3 Expressive Linear Progress Bar (Active Bar + 6px Gap + Remaining Track + Stop Dot) */}
              <div className="flex items-center gap-1.5 w-full h-2">
                <div
                  style={{ width: `${percent}%` }}
                  className="h-full rounded-full bg-[var(--m3-primary)] transition-all duration-500"
                />
                <div className="flex-1 h-full rounded-full bg-[var(--m3-surface-container-highest)] flex items-center justify-end pr-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--m3-primary)] shrink-0" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className="flex flex-col gap-5 p-4 pb-16 text-[var(--m3-on-surface)] font-sans">
      {renderSkillGroup('Competent / Production Ready', competent)}
      {renderSkillGroup('Novice / Learning & Exploring', novice)}
      {renderSkillGroup('Tools & Development Ecosystem', tools)}

      {/* M3 DETAIL BOTTOM SHEET FOR SELECTED SKILL */}
      {selectedSkill && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex flex-col justify-end p-3 animate-in fade-in duration-200"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="w-full max-w-md mx-auto p-5 rounded-[28px] bg-[var(--m3-surface-container)] text-[var(--m3-on-surface)] shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-8 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1 rounded-full bg-[var(--m3-on-surface-variant)]/40 mx-auto" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedSkill.name}</h3>
                <span className="text-xs uppercase font-semibold text-[var(--m3-primary)]">
                  {selectedSkill.level} proficiency
                </span>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="w-8 h-8 rounded-full bg-[var(--m3-surface-container-high)] flex items-center justify-center text-[var(--m3-on-surface)]"
              >
                <span className="material-symbols-rounded text-[18px]">close</span>
              </button>
            </div>

            {/* Related Projects */}
            <div>
              <p className="text-xs font-semibold text-[var(--m3-on-surface-variant)] mb-2 uppercase tracking-wider">
                Applied in Projects
              </p>
              {selectedSkill.related && selectedSkill.related.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.related.map((slug) => {
                    const proj = projectsData.find((p) => p.slug === slug);
                    return (
                      <span
                        key={slug}
                        className="px-3 py-1 rounded-full bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)] text-xs font-medium"
                      >
                        {proj ? proj.title.split('—')[0].trim() : slug}
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-[var(--m3-on-surface-variant)]">Used across multiple repositories and exploratory prototypes.</p>
              )}
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              className="w-full h-10 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold active:scale-98 transition-transform"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

