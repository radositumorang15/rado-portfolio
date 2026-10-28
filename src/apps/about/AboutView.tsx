'use client';

import React from 'react';
import { MapPin, GraduationCap, Copy, ExternalLink, Cpu } from 'lucide-react';
import { Profile } from '../../data/types';

interface AboutViewProps {
  profile: Profile;
  lang?: 'en' | 'id';
  onCopySpecs?: () => void;
  onOpenSocial?: (url: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  profile,
  lang = 'en',
  onCopySpecs,
  onOpenSocial,
}) => {
  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6 text-[var(--rn-text)]">
      {/* Hero Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)]">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shrink-0">
          RN
        </div>
        <div className="flex-1 text-center md:text-left flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-sm font-medium text-[var(--rn-accent)]">{profile.tagline[lang]}</p>
          <div className="flex items-center justify-center md:justify-start gap-1 text-xs text-[var(--rn-text-muted)]">
            <MapPin size={13} />
            <span>{profile.location[lang]} ({profile.workLocation[lang]})</span>
          </div>
          <p className="text-xs text-[var(--rn-text)] mt-2 leading-relaxed">
            {profile.about[lang]}
          </p>
        </div>
      </div>

      {/* Device Specifications Card */}
      <div className="p-5 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--rn-border)]">
          <div className="flex items-center gap-2">
            <Cpu size={16} className="text-[var(--rn-accent)]" />
            <h2 className="text-sm font-semibold">Device Specifications (Rado OS)</h2>
          </div>
          {onCopySpecs && (
            <button
              onClick={onCopySpecs}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-[var(--rn-radius-control)] bg-[var(--rn-surface)] hover:bg-[var(--rn-accent-soft)] transition-colors border border-[var(--rn-border)]"
            >
              <Copy size={12} />
              <span>Copy</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[var(--rn-text-muted)]">Device Name: </span>
            <span className="font-mono font-medium">{profile.deviceSpecs.deviceName}</span>
          </div>
          <div>
            <span className="text-[var(--rn-text-muted)]">Processor: </span>
            <span className="font-medium">{profile.deviceSpecs.processor}</span>
          </div>
          <div>
            <span className="text-[var(--rn-text-muted)]">Cumulative GPA: </span>
            <span className="font-mono font-medium">{profile.deviceSpecs.gpa} / 4.00</span>
          </div>
          <div>
            <span className="text-[var(--rn-text-muted)]">Languages: </span>
            <span className="font-medium">{profile.deviceSpecs.languages}</span>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="p-5 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col gap-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[var(--rn-border)]">
          <GraduationCap size={16} className="text-[var(--rn-accent)]" />
          <h2 className="text-sm font-semibold">Education</h2>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{profile.education.institution}</h3>
          <p className="text-xs text-[var(--rn-accent)]">{profile.education.program[lang]}</p>
          <div className="flex items-center justify-between text-xs text-[var(--rn-text-muted)] mt-1">
            <span>{profile.education.period}</span>
            <span className="font-mono">GPA {profile.education.gpa}</span>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onOpenSocial?.(profile.linkedin)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-[var(--rn-radius-control)] bg-[var(--rn-accent)] text-[var(--rn-on-accent)] hover:opacity-90 transition-opacity"
        >
          <span>LinkedIn</span>
          <ExternalLink size={12} />
        </button>
        <button
          onClick={() => onOpenSocial?.(profile.github)}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-[var(--rn-radius-control)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] hover:bg-[var(--rn-accent-soft)] transition-colors"
        >
          <span>GitHub</span>
          <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
};
