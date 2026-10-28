'use client';

import React, { useState } from 'react';
import { SkillsView } from './SkillsView';
import { skillsData } from '../../data/skills';
import { notch } from '../../os/notch';

export const SkillsApp: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSelectSkill = (name: string) => {
    setSelectedSkill(name);
    const skill = skillsData.find((s) => s.name === name);
    if (skill && skill.related.length > 0) {
      notch.show({
        title: `${name} Selected`,
        subtitle: `Used in: ${skill.related.join(', ')}`,
      });
    }
  };

  return (
    <SkillsView
      skills={skillsData}
      selectedSkill={selectedSkill}
      onSelectSkill={handleSelectSkill}
    />
  );
};

