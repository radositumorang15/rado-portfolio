import React from 'react';

interface StartLogoProps {
  size?: number;
  className?: string;
}

export const StartLogo: React.FC<StartLogoProps> = ({
  size = 20,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Windows 11 4-square geometry with rounded corners */}
      <rect x="2" y="2" width="9.2" height="9.2" rx="1.5" fill="#00ADEF" />
      <rect x="12.8" y="2" width="9.2" height="9.2" rx="1.5" fill="#0078D4" />
      <rect x="2" y="12.8" width="9.2" height="9.2" rx="1.5" fill="#0078D4" />
      <rect x="12.8" y="12.8" width="9.2" height="9.2" rx="1.5" fill="#2896F3" />
    </svg>
  );
};
