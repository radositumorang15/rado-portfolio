'use client';

import React, { useState } from 'react';
import { GITHUB_PROJECTS, INSTALLED_SKILLS } from './data';

export const SkillsConnectionsTab: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);

  const projectKeys = Object.keys(GITHUB_PROJECTS);

  const getCaption = () => {
    if (hoveredRow !== null && hoveredCol !== null) {
      const skill = INSTALLED_SKILLS[hoveredRow];
      const project = GITHUB_PROJECTS[hoveredCol];
      if (skill && project) {
        const isUsed = skill.projects.includes(hoveredCol);
        return isUsed
          ? `${skill.name} is shipped and verified in the ${project.name} GitHub repository.`
          : `${skill.name} is not utilized in ${project.name}.`;
      }
    }
    if (hoveredRow !== null) {
      const skill = INSTALLED_SKILLS[hoveredRow];
      if (skill) {
        const names = skill.projects.map((k) => GITHUB_PROJECTS[k]?.name).filter(Boolean);
        return `${skill.name} is shipped across ${names.join(', ')}.`;
      }
    }
    return 'Hover over any cell or technology to inspect cross-project relationships on GitHub.';
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto scrollbar-thin border border-white/10 rounded-xl bg-white/[0.02]">
        <table className="w-full text-xs text-left border-collapse min-w-[680px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-3 font-semibold text-white/70 w-44 sticky left-0 bg-[#23252a] z-10">
                Technology / Skill
              </th>
              {projectKeys.map((key) => {
                const meta = GITHUB_PROJECTS[key];
                const isColHl = hoveredCol === key;
                return (
                  <th
                    key={key}
                    onMouseEnter={() => setHoveredCol(key)}
                    onMouseLeave={() => setHoveredCol(null)}
                    className={`p-2.5 text-center font-medium transition-colors ${
                      isColHl ? 'text-white bg-white/10' : 'text-white/60'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span
                        style={{ backgroundColor: meta.color }}
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                      />
                      <span className="truncate">{meta.name}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {INSTALLED_SKILLS.map((skill, r) => {
              const isRowHl = hoveredRow === r;
              return (
                <tr
                  key={skill.name}
                  onMouseEnter={() => setHoveredRow(r)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-b border-white/5 transition-colors ${
                    isRowHl ? 'bg-white/[0.08]' : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <td className="p-2.5 font-medium text-white/90 sticky left-0 bg-[#23252a] z-10 whitespace-nowrap">
                    {skill.name}
                  </td>
                  {projectKeys.map((colKey) => {
                    const isUsed = skill.projects.includes(colKey);
                    const isCellHl = hoveredRow === r && hoveredCol === colKey;
                    const meta = GITHUB_PROJECTS[colKey];
                    return (
                      <td
                        key={colKey}
                        onMouseEnter={() => {
                          setHoveredRow(r);
                          setHoveredCol(colKey);
                        }}
                        onMouseLeave={() => {
                          setHoveredCol(null);
                        }}
                        className={`p-2.5 text-center transition-all ${
                          isCellHl ? 'bg-white/15' : ''
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          {isUsed ? (
                            <span
                              style={{
                                backgroundColor: meta.color,
                                boxShadow: `0 0 10px ${meta.color}88`,
                              }}
                              className="w-3.5 h-3.5 rounded-full inline-block transition-transform hover:scale-125"
                            />
                          ) : (
                            <span className="w-2 h-2 rounded-full border border-white/20 inline-block opacity-40" />
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Dynamic Caption */}
      <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-white/70 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
        <span className="leading-snug">{getCaption()}</span>
      </div>
    </div>
  );
};

