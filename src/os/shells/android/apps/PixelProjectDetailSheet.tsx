'use client';

import React from 'react';
import { Project } from '../../../../data/types';
import { ProjectReadmeViewer } from '../../../../apps/projects/ProjectReadmeViewer';
import { useWindowsStore } from '../../../../store/windows';

interface PixelProjectDetailSheetProps {
  project: Project;
  language: 'en' | 'id';
  onClose: () => void;
  onOpenLink: (url: string, label: string) => void;
}

export const PixelProjectDetailSheet: React.FC<PixelProjectDetailSheetProps> = ({
  project,
  language,
  onClose,
  onOpenLink,
}) => {
  const openWindow = useWindowsStore((s) => s.openWindow);
  const readmeContent = project.readme
    ? project.readme[language] || project.readme.en
    : project.description[language];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex flex-col justify-end p-2 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg mx-auto max-h-[88vh] overflow-y-auto p-5 rounded-[28px] bg-[var(--m3-surface-container)] text-[var(--m3-on-surface)] shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-8 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sheet Handle */}
        <div className="w-10 h-1 rounded-full bg-[var(--m3-on-surface-variant)]/40 mx-auto shrink-0" />

        {/* Header Info */}
        <div className="flex items-start gap-3">
          <div className="w-13 h-13 rounded-[16px] bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-rounded text-[28px]">
              {project.category === 'mobile' ? 'android' : 'terminal'}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="px-2 py-0.5 rounded-full bg-[var(--m3-secondary-container)] text-[var(--m3-on-secondary-container)] text-[10px] font-bold uppercase tracking-wider">
              {project.category} application
            </span>
            <h3 className="text-sm sm:text-base font-bold leading-tight mt-1 text-[var(--m3-on-surface)]">
              {project.title}
            </h3>
            {project.role && (
              <p className="text-xs text-[var(--m3-primary)] mt-0.5 font-medium">
                {project.role[language]}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--m3-surface-container-high)] flex items-center justify-center text-[var(--m3-on-surface)] hover:bg-[var(--m3-surface-container-highest)]"
          >
            <span className="material-symbols-rounded text-[18px]">close</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {project.links.source && (
            <button
              onClick={() => onOpenLink(project.links.source!, 'GitHub Source')}
              className="h-10 rounded-full bg-[var(--m3-surface-container-high)] text-[var(--m3-on-surface)] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[var(--m3-surface-container-highest)] active:scale-98 transition-transform cursor-pointer"
            >
              <span className="material-symbols-rounded text-[16px]">code</span>
              <span>Source Code</span>
            </button>
          )}
          {project.links.live && (
            <button
              onClick={() => onOpenLink(project.links.live!, 'Live Application')}
              className="h-10 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-transform cursor-pointer"
            >
              <span className="material-symbols-rounded text-[16px]">open_in_new</span>
              <span>Launch Demo</span>
            </button>
          )}
          {project.category === 'mobile' && (
            <button
              onClick={() => {
                onClose();
                openWindow('androidstudio', project.slug);
              }}
              className="col-span-2 h-10 rounded-full bg-emerald-600/25 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-transform cursor-pointer"
            >
              <span className="material-symbols-rounded text-[16px]">shopping_bag</span>
              <span>View in Google Play Store</span>
            </button>
          )}
        </div>

        {/* Screenshots Horizontal Gallery */}
        {project.images.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-[var(--m3-on-surface-variant)] uppercase tracking-wider">
              Screenshots ({project.images.length})
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="w-40 sm:w-48 h-28 shrink-0 rounded-[14px] overflow-hidden border border-white/10 bg-black/40 cursor-pointer"
                  onClick={() => window.open(img, '_blank')}
                  title="Click to zoom"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features Checklist */}
        {project.features && project.features.length > 0 && (
          <div className="p-3.5 rounded-[18px] bg-[var(--m3-surface-container-high)] flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[var(--m3-primary)] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-rounded text-[16px]">verified</span>
              Key Capabilities
            </span>
            <div className="flex flex-col gap-1.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs leading-snug text-[var(--m3-on-surface)]">
                  <span className="material-symbols-rounded text-[15px] text-[var(--m3-primary)] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>{feat[language] || feat.en}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* README.md Details */}
        <div className="p-4 rounded-[18px] bg-[var(--m3-surface-container-high)] flex flex-col gap-2">
          <span className="text-[11px] font-bold text-[var(--m3-primary)] uppercase tracking-wider flex items-center gap-1">
            <span className="material-symbols-rounded text-[16px]">description</span>
            README.md & Architecture
          </span>
          <div className="max-h-[220px] overflow-y-auto pr-1">
            <ProjectReadmeViewer content={readmeContent} />
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.map((item) => (
            <span
              key={item}
              className="px-2.5 py-1 rounded-full bg-[var(--m3-surface-container-high)] text-[var(--m3-on-surface)] text-[11px] font-mono"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

