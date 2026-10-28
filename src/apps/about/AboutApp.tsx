'use client';

import React from 'react';
import { AboutView } from './AboutView';
import { profileData } from '../../data/profile';
import { usePrefsStore } from '../../store/prefs';
import { notch } from '../../os/notch';

export const AboutApp: React.FC = () => {
  const language = usePrefsStore((s) => s.language);

  const handleCopySpecs = () => {
    const text = `Device: ${profileData.deviceSpecs.deviceName}\nProcessor: ${profileData.deviceSpecs.processor}\nGPA: ${profileData.deviceSpecs.gpa}`;
    navigator.clipboard?.writeText(text);
    notch.show({
      title: 'Specs Copied',
      subtitle: 'Copied specs to clipboard',
      icon: 'copy',
    });
  };

  const handleOpenSocial = (url: string) => {
    notch.show({
      title: 'Opening External Link',
      subtitle: url,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AboutView
      profile={profileData}
      lang={language}
      onCopySpecs={handleCopySpecs}
      onOpenSocial={handleOpenSocial}
    />
  );
};
