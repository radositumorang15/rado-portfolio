'use client';

import React, { useState } from 'react';
import { ExperienceView } from './ExperienceView';
import { experienceData } from '../../data/experience';
import { usePrefsStore } from '../../store/prefs';

export const ExperienceApp: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const [selectedSlug, setSelectedSlug] = useState<string>(experienceData[0].slug);

  return (
    <ExperienceView
      experiences={experienceData}
      selectedSlug={selectedSlug}
      lang={language}
      onSelect={(slug) => setSelectedSlug(slug)}
    />
  );
};
