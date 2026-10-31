'use client';

import React, { useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { experienceData } from '../../../../data/experience';
import { Experience } from '../../../../data/types';
import { usePrefsStore } from '../../../../store/prefs';
import { BottomSheet, GroupedItem, PixelPage, SectionTitle, SheetCloseButton, useT } from './pixelUi';

const TYPE_LABEL: Record<string, { en: string; id: string }> = {
  work: { en: 'Work', id: 'Pekerjaan' },
  internship: { en: 'Internship', id: 'Magang' },
  organization: { en: 'Organization', id: 'Organisasi' },
  program: { en: 'Program', id: 'Program' },
};

/** Bullet manual: marker titik M3 konsisten */
const Bullet: React.FC<{ text: string; clamp?: boolean }> = ({ text, clamp }) => (
  <li className="flex items-start gap-2 list-none">
    <span className="w-1.5 h-1.5 rounded-full bg-[var(--m3-primary)] mt-[7px] shrink-0" />
    <span className={clamp ? 'line-clamp-1' : ''}>{text}</span>
  </li>
);

export const PixelExperienceView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const t = useT();
  const [selected, setSelected] = useState<Experience | null>(null);

  const range = (e: Experience) => `${e.start} — ${e.end === 'present' ? t('present') : e.end}`;
  const typeLabel = (e: Experience) => TYPE_LABEL[e.type]?.[language] ?? e.type;

  const { work, other } = useMemo(
    () => ({
      work: experienceData.filter((e) => e.type === 'work' || e.type === 'internship'),
      other: experienceData.filter((e) => e.type !== 'work' && e.type !== 'internship'),
    }),
    []
  );

  const renderGroup = (title: string, list: Experience[]) => (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="flex flex-col gap-[3px]">
        {list.map((exp, i) => (
          <GroupedItem key={exp.slug} index={i} count={list.length} onClick={() => setSelected(exp)}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="m-0 text-sm font-bold leading-snug">{exp.role[language]}</h4>
                <p className="m-0 mt-0.5 text-xs font-medium text-[var(--m3-primary)]">{exp.org}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[10px] font-bold shrink-0">
                {range(exp)}
              </span>
            </div>
            {exp.location && (
              <div className="flex items-center gap-1 mt-2 text-[11px] text-[var(--m3-on-surface-variant)]">
                <MapPin size={13} />
                {exp.location[language]}
              </div>
            )}
            <ul className="p-0 mt-2 mb-0 space-y-1 text-xs text-[var(--m3-on-surface-variant)]">
              {exp.bullets.slice(0, 2).map((b, k) => (
                <Bullet key={k} text={b[language]} clamp />
              ))}
            </ul>
          </GroupedItem>
        ))}
      </div>
    </section>
  );

  return (
    <PixelPage>
      {renderGroup(t('work'), work)}
      {other.length > 0 && renderGroup(t('other'), other)}

      {/* Detail Bottom Sheet */}
      <BottomSheet
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        label={selected?.role[language] ?? ''}
      >
        {selected && (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[10px] font-bold uppercase tracking-wider">
                  {typeLabel(selected)}
                </span>
                <h3 className="m-0 mt-1.5 text-base font-bold">{selected.role[language]}</h3>
                <p className="m-0 mt-0.5 text-xs font-medium text-[var(--m3-primary)]">{selected.org}</p>
                <p className="m-0 mt-0.5 text-[11px] text-[var(--m3-on-surface-variant)]">
                  {selected.location ? `${selected.location[language]} • ` : ''}
                  {range(selected)}
                </p>
              </div>
              <SheetCloseButton onClick={() => setSelected(null)} label={t('close')} />
            </div>

            <div className="p-3.5 rounded-[20px] bg-[var(--m3-surface-container-high)]">
              <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
                {t('contributions')}
              </p>
              <ul className="p-0 m-0 space-y-2 text-xs">
                {selected.bullets.map((b, i) => (
                  <Bullet key={i} text={b[language]} />
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="w-full h-10 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold cursor-pointer active:scale-[0.98] transition-transform"
            >
              {t('close')}
            </button>
          </>
        )}
      </BottomSheet>
    </PixelPage>
  );
};
