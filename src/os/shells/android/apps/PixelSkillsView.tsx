'use client';

import React, { useMemo, useState } from 'react';
import { skillsData } from '../../../../data/skills';
import { Skill } from '../../../../data/types';
import { projectsData } from '../../../../data/projects';
import { BottomSheet, GroupedItem, PixelPage, SectionTitle, SheetCloseButton, useT } from './pixelUi';

const MAX_DOTS = 5;

const projectName = (slug: string) => {
  const p = projectsData.find((x) => x.slug === slug);
  return p ? p.title.split('—')[0].trim() : slug;
};

/** Titik penggunaan: berapa project yang memakai skill ini sebagai bukti kerja nyata */
const UsageDots: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-1" aria-hidden>
    {Array.from({ length: MAX_DOTS }, (_, i) => (
      <span
        key={i}
        className={`w-1.5 h-1.5 rounded-full ${
          i < count ? 'bg-[var(--m3-primary)]' : 'bg-[var(--m3-surface-container-highest)]'
        }`}
      />
    ))}
  </div>
);

/** Progres "sedang dipasang" untuk skill novice/learning */
const InstallingBar: React.FC = () => (
  <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--m3-surface-container-highest)]">
    <span className="px-slide absolute inset-y-0 w-2/5 rounded-full bg-[var(--m3-primary)] motion-reduce:animate-none" />
  </div>
);

export const PixelSkillsView: React.FC = () => {
  const t = useT();
  const [selected, setSelected] = useState<Skill | null>(null);

  const groups = useMemo(
    () => [
      { key: 'competent', title: t('competent'), list: skillsData.filter((s) => s.category === 'competent') },
      { key: 'tool', title: t('tools'), list: skillsData.filter((s) => s.category === 'tool') },
      { key: 'novice', title: t('novice'), list: skillsData.filter((s) => s.category === 'novice') },
    ],
    [t]
  );

  const installed = skillsData.filter((s) => s.category !== 'novice').length;
  const installing = skillsData.length - installed;

  return (
    <PixelPage>
      {/* Ringkasan: Installed vs Installing Apps */}
      <div className="flex gap-2">
        <div className="flex-1 p-3.5 rounded-[20px] bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)]">
          <div className="text-2xl font-bold leading-none">{installed}</div>
          <div className="text-[11px] mt-1 opacity-80">{t('installed')}</div>
        </div>
        <div className="flex-1 p-3.5 rounded-[20px] bg-[var(--m3-surface-container)]">
          <div className="text-2xl font-bold leading-none">{installing}</div>
          <div className="text-[11px] mt-1 text-[var(--m3-on-surface-variant)]">{t('installing')}</div>
        </div>
      </div>

      {groups.map(
        (g) =>
          g.list.length > 0 && (
            <section key={g.key}>
              <SectionTitle aside={`${g.list.length} ${t('skills')}`}>{g.title}</SectionTitle>
              <div className="flex flex-col gap-[3px]">
                {g.list.map((skill, i) => {
                  const used = skill.related?.length ?? 0;
                  const learning = skill.category === 'novice';
                  return (
                    <GroupedItem
                      key={skill.name}
                      index={i}
                      count={g.list.length}
                      onClick={() => setSelected(skill)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate">{skill.name}</div>
                          <div className="text-[11px] text-[var(--m3-on-surface-variant)] mt-0.5">
                            {learning
                              ? t('learning')
                              : used > 0
                              ? `${t('shippedIn')} ${used} ${used > 1 ? t('projects') : t('project')}`
                              : skill.level}
                          </div>
                        </div>
                        {learning ? null : <UsageDots count={used} />}
                      </div>
                      {learning && (
                        <div className="mt-3">
                          <InstallingBar />
                        </div>
                      )}
                    </GroupedItem>
                  );
                })}
              </div>
            </section>
          )
      )}

      {/* Detail Bottom Sheet */}
      <BottomSheet
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        label={selected?.name ?? ''}
      >
        {selected && (
          <>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="m-0 text-lg font-bold truncate">{selected.name}</h3>
                <span className="text-xs font-semibold uppercase text-[var(--m3-primary)]">
                  {selected.category === 'novice' ? t('learning') : selected.level}
                </span>
              </div>
              <SheetCloseButton onClick={() => setSelected(null)} label={t('close')} />
            </div>

            <div>
              <p className="m-0 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-on-surface-variant)]">
                {t('appliedIn')}
              </p>
              {selected.related && selected.related.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {selected.related.map((slug) => (
                    <span
                      key={slug}
                      className="px-3 py-1 rounded-full bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)] text-xs font-medium"
                    >
                      {projectName(slug)}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="m-0 text-xs text-[var(--m3-on-surface-variant)]">
                  {t('learningNote')}
                </p>
              )}
            </div>

            <button
              onClick={() => setSelected(null)}
              className="w-full h-10 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold cursor-pointer active:scale-[0.98] transition-transform"
            >
              {t('done')}
            </button>
          </>
        )}
      </BottomSheet>
    </PixelPage>
  );
};
