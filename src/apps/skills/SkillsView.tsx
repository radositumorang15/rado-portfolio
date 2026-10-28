'use client';

import React from 'react';
import { Cpu, Code2, PenTool, Sparkles } from 'lucide-react';
import { Skill } from '../../data/types';

interface SkillsViewProps {
  skills: Skill[];
  selectedSkill?: string | null;
  onSelectSkill?: (skillName: string) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({
  skills,
  selectedSkill,
  onSelectSkill,
}) => {
  const competent = skills.filter((s) => s.category === 'competent');
  const novice = skills.filter((s) => s.category === 'novice');
  const tools = skills.filter((s) => s.category === 'tool');

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6 text-[var(--rn-text)]">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--rn-border)] flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Skills & Technologies</h1>
          <p className="text-xs text-[var(--rn-text-muted)]">Verified capabilities and development toolset</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--rn-accent)]" />
          <span className="text-xs font-mono font-medium">{skills.length} Total Technologies</span>
        </div>
      </div>

      {/* Competent Level */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)]">
          <Code2 size={14} className="text-emerald-500" />
          <span>Competent / Production Ready</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {competent.map((skill) => {
            const isSelected = selectedSkill === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => onSelectSkill?.(skill.name)}
                className={`p-3.5 rounded-[var(--rn-radius-card)] border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[var(--rn-accent-soft)] border-[var(--rn-accent)] shadow-xs'
                    : 'bg-[var(--rn-surface-alt)] border-[var(--rn-border)] hover:bg-[var(--rn-surface)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">{skill.name}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-500">Competent</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Novice / Learning */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)]">
          <Sparkles size={14} className="text-blue-400" />
          <span>Novice / In Progress</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {novice.map((skill) => {
            const isSelected = selectedSkill === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => onSelectSkill?.(skill.name)}
                className={`p-3.5 rounded-[var(--rn-radius-card)] border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[var(--rn-accent-soft)] border-[var(--rn-accent)] shadow-xs'
                    : 'bg-[var(--rn-surface-alt)] border-[var(--rn-border)] hover:bg-[var(--rn-surface)]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">{skill.name}</span>
                  <span className="text-[10px] uppercase font-bold text-blue-400">Learning</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-3/5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tools */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--rn-text-muted)]">
          <PenTool size={14} className="text-amber-500" />
          <span>Design & Tools</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {tools.map((skill) => (
            <div
              key={skill.name}
              className="p-3.5 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex items-center justify-between"
            >
              <span className="text-xs font-semibold">{skill.name}</span>
              <span className="text-[10px] uppercase font-bold text-amber-500">Design Tool</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
