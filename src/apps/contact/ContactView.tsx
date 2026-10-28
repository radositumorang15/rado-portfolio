'use client';

import React from 'react';
import { Mail, Send, Linkedin, Github } from 'lucide-react';

interface ContactViewProps {
  name: string;
  email: string;
  message: string;
  isSubmitting?: boolean;
  statusMessage?: { type: 'success' | 'error'; text: string } | null;
  onNameChange?: (v: string) => void;
  onEmailChange?: (v: string) => void;
  onMessageChange?: (v: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  name,
  email,
  message,
  isSubmitting = false,
  statusMessage,
  onNameChange,
  onEmailChange,
  onMessageChange,
  onSubmit,
}) => {
  return (
    <div className="p-6 max-w-xl mx-auto flex flex-col gap-6 text-[var(--rn-text)]">
      <div>
        <h1 className="text-xl font-bold">Contact Rado</h1>
        <p className="text-xs text-[var(--rn-text-muted)]">Send a message for collaboration, hiring, or inquiries.</p>
      </div>

      {statusMessage && (
        <div
          className={`p-3 rounded-lg text-xs font-medium border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Honeypot */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--rn-text-muted)]">Your Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => onNameChange?.(e.target.value)}
            placeholder="John Doe"
            className="h-9 px-3 text-xs rounded-[var(--rn-radius-control)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] focus:border-[var(--rn-accent)] outline-none text-[var(--rn-text)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--rn-text-muted)]">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange?.(e.target.value)}
            placeholder="john@example.com"
            className="h-9 px-3 text-xs rounded-[var(--rn-radius-control)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] focus:border-[var(--rn-accent)] outline-none text-[var(--rn-text)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[var(--rn-text-muted)]">Your Message</label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => onMessageChange?.(e.target.value)}
            placeholder="Hi Rado, let's discuss an opportunity..."
            className="p-3 text-xs rounded-[var(--rn-radius-control)] bg-[var(--rn-surface-alt)] border border-[var(--rn-border)] focus:border-[var(--rn-accent)] outline-none text-[var(--rn-text)] transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name || !email || !message}
          className="flex items-center justify-center gap-2 h-10 px-4 rounded-[var(--rn-radius-control)] bg-[var(--rn-accent)] text-[var(--rn-on-accent)] text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm cursor-pointer disabled:cursor-not-allowed"
        >
          <Send size={14} />
          <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
        </button>
      </form>

      {/* Direct Channels */}
      <div className="pt-4 border-t border-[var(--rn-border)] flex items-center justify-center gap-4 text-xs">
        <a
          href="mailto:radositumorang15@gmail.com"
          className="flex items-center gap-1.5 text-[var(--rn-text-muted)] hover:text-[var(--rn-text)] transition-colors"
        >
          <Mail size={13} />
          <span>Email Direct</span>
        </a>
        <a
          href="https://www.linkedin.com/in/radositumorang/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[var(--rn-text-muted)] hover:text-[var(--rn-text)] transition-colors"
        >
          <Linkedin size={13} />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/radositumorang15"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[var(--rn-text-muted)] hover:text-[var(--rn-text)] transition-colors"
        >
          <Github size={13} />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};
