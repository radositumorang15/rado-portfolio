'use client';

import React from 'react';
import { Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

interface ResumeViewProps {
  pdfUrl?: string;
  onDownload?: () => void;
  onOpenNewTab?: () => void;
}

export const ResumeView: React.FC<ResumeViewProps> = ({
  pdfUrl = '/cv/CV_Rado.pdf',
  onDownload,
  onOpenNewTab,
}) => {
  return (
    <div className="flex flex-col h-full text-[var(--rn-text)]">
      {/* Top Toolbar */}
      <div className="h-12 px-4 border-b border-[var(--rn-border)] flex items-center justify-between bg-[var(--rn-surface)]">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[var(--rn-accent)]" />
          <span className="text-xs font-semibold">CV_Rado_Nelson.pdf</span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenNewTab && (
            <button
              onClick={onOpenNewTab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--rn-radius-control)] bg-[var(--rn-surface-alt)] hover:bg-[var(--rn-accent-soft)] text-xs font-medium border border-[var(--rn-border)] transition-colors"
            >
              <ExternalLink size={13} />
              <span>Open in Tab</span>
            </button>
          )}

          {onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[var(--rn-radius-control)] bg-[var(--rn-accent)] text-[var(--rn-on-accent)] text-xs font-medium hover:opacity-90 shadow-xs transition-opacity"
            >
              <Download size={13} />
              <span>Download CV</span>
            </button>
          )}
        </div>
      </div>

      {/* Viewer Body */}
      <div className="flex-1 bg-[var(--rn-bg)] p-6 overflow-y-auto flex flex-col items-center justify-center gap-4">
        <div className="w-full max-w-xl p-8 rounded-[var(--rn-radius-card)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] flex flex-col items-center text-center gap-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
            <FileText size={32} />
          </div>

          <div>
            <h2 className="text-base font-bold">Curriculum Vitae — Rado Situmorang</h2>
            <p className="text-xs text-[var(--rn-text-muted)] mt-1">
              Frontend & Android Developer • Final-Year PTIK Universitas Sebelas Maret
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full text-left text-xs bg-[var(--rn-surface)] p-4 rounded-xl border border-[var(--rn-border)]">
            <div className="flex items-center gap-2 text-emerald-500 font-medium">
              <CheckCircle2 size={14} />
              <span>Up-to-date with 4 professional experiences</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-500 font-medium">
              <CheckCircle2 size={14} />
              <span>siGizi, SmileShop & web applications included</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-500 font-medium">
              <CheckCircle2 size={14} />
              <span>GPA 3.81 / 4.00 verified academic record</span>
            </div>
          </div>

          <button
            onClick={onDownload}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[var(--rn-radius-control)] bg-[var(--rn-accent)] text-[var(--rn-on-accent)] text-xs font-semibold hover:opacity-90 shadow-md transition-all"
          >
            <Download size={15} />
            <span>Download Official PDF Document</span>
          </button>
        </div>
      </div>
    </div>
  );
};
