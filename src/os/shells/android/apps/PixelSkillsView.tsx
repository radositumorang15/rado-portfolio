'use client';

import React, { useMemo, useState } from 'react';
import {
  INSTALLED_SKILLS,
  INSTALLING_SKILLS,
  GITHUB_PROJECTS,
  InstalledSkill,
  InstallingSkill,
} from '../../../../apps/skills/data';
import { BottomSheet, GroupedItem, PixelPage, SectionTitle, SheetCloseButton, useExternalLink, useT } from './pixelUi';
import { ExternalLink } from 'lucide-react';

const UsageDots: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-1" aria-hidden>
    {Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`w-1.5 h-1.5 rounded-full ${i < count ? 'bg-[var(--m3-primary)]' : 'bg-[var(--m3-surface-container-highest)]'}`}
      />
    ))}
  </div>
);

type SelectedItem =
  | { type: 'installed'; data: InstalledSkill }
  | { type: 'installing'; data: InstallingSkill }
  | null;

export const PixelSkillsView: React.FC = () => {
  const t = useT();
  const openExternal = useExternalLink();
  const [selected, setSelected] = useState<SelectedItem>(null);

  const categories = useMemo(() => {
    const cats: Record<string, InstalledSkill[]> = {};
    INSTALLED_SKILLS.forEach((s) => {
      cats[s.category] = cats[s.category] || [];
      cats[s.category].push(s);
    });
    return Object.entries(cats);
  }, []);

  return (
    <PixelPage>
      {/* 1. Summary Stats (16 Installed vs 3 Installing) */}
      <div className="flex gap-2">
        <div className="flex-1 p-3.5 rounded-[20px] bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)]">
          <div className="text-2xl font-bold leading-none">{INSTALLED_SKILLS.length}</div>
          <div className="text-[11px] mt-1 font-medium">{t('installed')}</div>
        </div>
        <div className="flex-1 p-3.5 rounded-[20px] bg-[var(--m3-surface-container)] text-[var(--m3-on-surface)]">
          <div className="text-2xl font-bold leading-none">{INSTALLING_SKILLS.length}</div>
          <div className="text-[11px] mt-1 text-[var(--m3-on-surface-variant)] font-medium">{t('installing')}</div>
        </div>
      </div>

      {/* 2. Installed Skills per Category */}
      {categories.map(([cat, list]) => (
        <section key={cat}>
          <SectionTitle aside={`${list.length} ${t('skills')}`}>{cat}</SectionTitle>
          <div className="flex flex-col gap-[3px]">
            {list.map((skill, i) => (
              <GroupedItem key={skill.name} index={i} count={list.length} onClick={() => setSelected({ type: 'installed', data: skill })}>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{skill.name}</div>
                    <div className="text-[11px] text-[var(--m3-on-surface-variant)] mt-0.5">
                      {skill.projects.length > 0
                        ? `${t('shippedIn')} ${skill.projects.length} ${skill.projects.length > 1 ? t('projects') : t('project')} (since ${skill.since})`
                        : `Since ${skill.since}`}
                    </div>
                  </div>
                  <UsageDots count={skill.projects.length} />
                </div>
              </GroupedItem>
            ))}
          </div>
        </section>
      ))}

      {/* 3. Installing Skills Queue */}
      <section>
        <SectionTitle aside={`${INSTALLING_SKILLS.length} ${t('skills')}`}>{t('novice')}</SectionTitle>
        <div className="flex flex-col gap-[3px]">
          {INSTALLING_SKILLS.map((skill, i) => {
            const pct = Math.round((skill.done / skill.steps.length) * 100);
            return (
              <GroupedItem key={skill.name} index={i} count={INSTALLING_SKILLS.length} onClick={() => setSelected({ type: 'installing', data: skill })}>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{skill.name}</div>
                    <div className="text-[11px] text-[var(--m3-on-surface-variant)] mt-0.5">
                      {t('learning')} • {skill.done}/{skill.steps.length} steps
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[var(--m3-primary)]">{pct}%</span>
                </div>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--m3-surface-container-highest)] mt-2">
                  <div className="h-full rounded-full bg-[var(--m3-primary)]" style={{ width: `${pct}%` }} />
                </div>
              </GroupedItem>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom Sheet Modal */}
      <BottomSheet open={Boolean(selected)} onClose={() => setSelected(null)} label={selected?.data.name ?? ''}>
        {selected && (
          <>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="px-2 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[10px] font-bold uppercase tracking-wider">
                  {selected.data.category}
                </span>
                <h3 className="m-0 mt-1 text-lg font-bold truncate">{selected.data.name}</h3>
              </div>
              <SheetCloseButton onClick={() => setSelected(null)} label={t('close')} />
            </div>

            {selected.type === 'installed' ? (
              <div>
                <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-on-surface-variant)]">
                  {t('appliedIn')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.data.projects.map((pid) => {
                    const meta = GITHUB_PROJECTS[pid];
                    return (
                      <button
                        key={pid}
                        onClick={() => meta && openExternal(meta.githubUrl, meta.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)] text-xs font-medium cursor-pointer active:scale-95 transition-transform"
                      >
                        <span>{meta ? meta.name : pid}</span>
                        {meta && <ExternalLink size={11} className="opacity-70" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-on-surface-variant)]">
                  Progress Steps
                </p>
                <ul className="space-y-1.5 text-xs m-0 p-0 list-none">
                  {selected.data.steps.map((st, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${idx < selected.data.done ? 'bg-[var(--m3-primary)] text-[var(--m3-on-primary)]' : 'bg-white/10 text-white/50'}`}>
                        {idx < selected.data.done ? '✓' : idx + 1}
                      </span>
                      <span className={idx < selected.data.done ? 'text-white' : 'text-white/60'}>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => setSelected(null)}
              className="w-full h-10 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold cursor-pointer active:scale-[0.98] transition-transform mt-2"
            >
              {t('done')}
            </button>
          </>
        )}
      </BottomSheet>
    </PixelPage>
  );
};
