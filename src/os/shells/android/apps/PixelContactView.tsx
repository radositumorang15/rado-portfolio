'use client';

import React, { useState } from 'react';
import { profileData } from '../../../../data/profile';
import { usePrefsStore } from '../../../../store/prefs';
import { notch } from '../../../notch';

export const PixelContactView: React.FC = () => {
  const language = usePrefsStore((s) => s.language);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profileData.email);
    notch.show({
      title: 'Email Copied',
      subtitle: profileData.email,
    });
  };

  const handleOpenLink = (url: string, title: string) => {
    notch.show({
      title,
      subtitle: url,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Simulate sending email
    const subject = encodeURIComponent(`Message from ${name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.open(`mailto:${profileData.email}?subject=${subject}&body=${body}`, '_blank');

    setSent(true);
    notch.show({
      title: 'Opening Email Client',
      subtitle: `To: ${profileData.email}`,
    });
  };

  return (
    <div className="flex flex-col gap-5 p-4 pb-16 text-[var(--m3-on-surface)] font-sans">
      {/* 1. GMAIL / MESSAGES STYLE HEADER HERO */}
      <div className="p-4 rounded-[28px] bg-[var(--m3-primary-container)] text-[var(--m3-on-primary-container)] flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-[14px] bg-[var(--m3-primary)] text-[var(--m3-on-primary)] flex items-center justify-center shrink-0">
          <span className="material-symbols-rounded text-[26px]">mail</span>
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold truncate">Let&apos;s Connect</h2>
          <p className="text-xs opacity-90 truncate">{profileData.email}</p>
        </div>
      </div>

      {/* 2. DIRECT REACH SHORTCUTS */}
      <section>
        <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          Direct Channels
        </h3>
        <div className="flex flex-col gap-[3px]">
          <div
            onClick={handleCopyEmail}
            className="p-3.5 rounded-t-[20px] rounded-b-[4px] bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] cursor-pointer transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-rounded text-[20px] text-[var(--m3-primary)]">email</span>
              <div>
                <p className="text-xs font-semibold">Copy Email Address</p>
                <p className="text-[11px] text-[var(--m3-on-surface-variant)]">{profileData.email}</p>
              </div>
            </div>
            <span className="material-symbols-rounded text-[18px] text-[var(--m3-on-surface-variant)]">content_copy</span>
          </div>

          <div
            onClick={() => handleOpenLink(profileData.linkedin, 'Opening LinkedIn')}
            className="p-3.5 rounded-[4px] bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] cursor-pointer transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-rounded text-[20px] text-[#0A66C2]">person</span>
              <div>
                <p className="text-xs font-semibold">LinkedIn Profile</p>
                <p className="text-[11px] text-[var(--m3-on-surface-variant)]">in/radositumorang</p>
              </div>
            </div>
            <span className="material-symbols-rounded text-[18px] text-[var(--m3-on-surface-variant)]">open_in_new</span>
          </div>

          <div
            onClick={() => handleOpenLink(profileData.github, 'Opening GitHub')}
            className="p-3.5 rounded-t-[4px] rounded-b-[20px] bg-[var(--m3-surface-container)] hover:bg-[var(--m3-surface-container-high)] cursor-pointer transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-rounded text-[20px] text-white">code</span>
              <div>
                <p className="text-xs font-semibold">GitHub Profile</p>
                <p className="text-[11px] text-[var(--m3-on-surface-variant)]">radositumorang15</p>
              </div>
            </div>
            <span className="material-symbols-rounded text-[18px] text-[var(--m3-on-surface-variant)]">open_in_new</span>
          </div>
        </div>
      </section>

      {/* 3. SEND MESSAGE FORM */}
      <section>
        <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--m3-primary)]">
          Send Message
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
          <div className="p-3 rounded-[16px] bg-[var(--m3-surface-container)] flex flex-col gap-1 focus-within:ring-2 focus-within:ring-[var(--m3-primary)]">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--m3-on-surface-variant)]">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="bg-transparent text-xs text-[var(--m3-on-surface)] placeholder-[var(--m3-on-surface-variant)] focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-[16px] bg-[var(--m3-surface-container)] flex flex-col gap-1 focus-within:ring-2 focus-within:ring-[var(--m3-primary)]">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--m3-on-surface-variant)]">
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="bg-transparent text-xs text-[var(--m3-on-surface)] placeholder-[var(--m3-on-surface-variant)] focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-[16px] bg-[var(--m3-surface-container)] flex flex-col gap-1 focus-within:ring-2 focus-within:ring-[var(--m3-primary)]">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--m3-on-surface-variant)]">
              Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi Rado, I would like to discuss..."
              className="bg-transparent text-xs text-[var(--m3-on-surface)] placeholder-[var(--m3-on-surface-variant)] focus:outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-full bg-[var(--m3-primary)] text-[var(--m3-on-primary)] text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-xs"
          >
            <span className="material-symbols-rounded text-[18px]">send</span>
            <span>Send Direct Message</span>
          </button>
        </form>
      </section>
    </div>
  );
};

