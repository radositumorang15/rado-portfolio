'use client';

import React, { useState } from 'react';
import { ProjectsView } from './ProjectsView';
import { projectsData } from '../../data/projects';
import { usePrefsStore } from '../../store/prefs';

export const ProjectsApp: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const [filterCategory, setFilterCategory] = useState<'all' | 'web' | 'mobile'>('all');

  return (
    <ProjectsView
      projects={projectsData}
      filterCategory={filterCategory}
      lang={language}
      onFilterChange={setFilterCategory}
    />
  );
};

