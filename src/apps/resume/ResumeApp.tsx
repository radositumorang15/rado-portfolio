'use client';

import React from 'react';
import { ResumeView } from './ResumeView';
import { notch } from '../../os/notch';

export const ResumeApp: React.FC = () => {
  const handleDownload = () => {
    notch.show({
      title: 'CV Downloaded',
      subtitle: 'CV_Rado_Nelson.pdf downloaded',
      icon: 'download',
    });
    // Trigger download
    const link = document.createElement('a');
    link.href = '/cv/CV_Rado.pdf';
    link.download = 'CV_Rado_Nelson.pdf';
    link.click();
  };

  const handleOpenNewTab = () => {
    window.open('/cv/CV_Rado.pdf', '_blank');
  };

  return (
    <ResumeView
      onDownload={handleDownload}
      onOpenNewTab={handleOpenNewTab}
    />
  );
};
