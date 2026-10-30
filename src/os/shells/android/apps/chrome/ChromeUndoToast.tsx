'use client';

import React from 'react';

interface ChromeUndoToastProps {
  text: string;
  showUndo?: boolean;
  onUndo: () => void;
}

export const ChromeUndoToast: React.FC<ChromeUndoToastProps> = ({
  text,
  showUndo,
  onUndo,
}) => {
  return (
    <div className="chrome-sn">
      <span>{text}</span>
      {showUndo && (
        <button type="button" onClick={onUndo}>
          Undo
        </button>
      )}
    </div>
  );
};
