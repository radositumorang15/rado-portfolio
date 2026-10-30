'use client';

import React from 'react';
import { SkillsView } from './SkillsView';
import { notch } from '../../os/notch';

export const SkillsApp: React.FC = () => {
  const handleOpenProject = (url: string, name: string) => {
    notch.show({
      title: `Opening ${name} on GitHub`,
      subtitle: url,
      icon: 'code',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return <SkillsView onOpenProject={handleOpenProject} />;
};
