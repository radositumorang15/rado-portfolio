'use client';

import React, { useState } from 'react';
import { Bell, Trash2 } from 'lucide-react';
import { AppId } from '../../../lib/constants';

interface NotificationItem {
  id: string;
  badge: string;
  sender: string;
  title: string;
  body: string;
  time: string;
  actionApp?: AppId;
  actionLabel?: string;
}

interface QuickShadeNotificationsProps {
  language: string;
  onOpenApp?: (appId: AppId) => void;
}

export const QuickShadeNotifications: React.FC<QuickShadeNotificationsProps> = ({
  language,
  onOpenApp,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      badge: 'RN',
      sender: 'Rado Situmorang',
      title: language === 'id' ? 'Selamat datang di portofolio saya!' : 'Welcome to my portfolio!',
      body: language === 'id' ? 'Jelajahi karya web dan mobile saya.' : 'Explore my web and mobile projects.',
      time: 'Now',
      actionApp: 'projects',
      actionLabel: language === 'id' ? 'Buka Projects' : 'Open Projects',
    },
    {
      id: 'n2',
      badge: 'PS',
      sender: 'Google Play',
      title: 'siGizi & Kotoba Apps',
      body: language === 'id' ? 'Aplikasi siap dipasang dan dicoba.' : 'Ready to inspect on Play Store.',
      time: '5m ago',
      actionApp: 'androidstudio',
      actionLabel: language === 'id' ? 'Buka Play Store' : 'Open Store',
    },
    {
      id: 'n3',
      badge: '@',
      sender: 'Messages',
      title: language === 'id' ? 'Mari terhubung' : "Let's connect",
      body: language === 'id' ? 'Sapa saya, ide dan project diterima.' : 'Say hello, ideas and projects welcome.',
      time: '12m ago',
      actionApp: 'contact',
      actionLabel: language === 'id' ? 'Kirim Pesan' : 'Send Message',
    },
  ]);

  const dismiss = (id: string) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(6);
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.(10);
    }
    setNotifications([]);
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center justify-between px-1 text-xs font-semibold text-[var(--m3-on-surface-variant)]">
        <div className="flex items-center gap-1.5">
          <Bell size={13} />
          <span>{language === 'id' ? 'Notifikasi' : 'Notifications'}</span>
        </div>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-[11px] text-[#A9C4FF] hover:underline cursor-pointer"
          >
            <Trash2 size={12} />
            <span>{language === 'id' ? 'Hapus semua' : 'Clear all'}</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-xs text-white/40">
            {language === 'id' ? 'Tidak ada notifikasi baru' : 'No new notifications'}
          </div>
        ) : (
          notifications.map((nt) => (
            <div
              key={nt.id}
              className="p-3.5 rounded-[22px] bg-[var(--m3-surface-container-high)]/95 border border-white/5 flex gap-3 text-white transition-all active:scale-98 select-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#A9C4FF] text-[#0D2A63] font-bold text-xs flex items-center justify-center shrink-0">
                {nt.badge}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span className="truncate">{nt.sender}</span>
                  <span>{nt.time}</span>
                </div>
                <h4 className="text-xs font-semibold text-white/95 mt-0.5 truncate">{nt.title}</h4>
                <p className="text-[11px] text-white/70 mt-0.5 leading-snug">{nt.body}</p>
                {nt.actionApp && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => onOpenApp?.(nt.actionApp!)}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#A9C4FF] text-[11px] font-semibold transition-colors cursor-pointer"
                    >
                      {nt.actionLabel}
                    </button>
                    <button
                      onClick={() => dismiss(nt.id)}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-white/50 text-[11px] transition-colors cursor-pointer"
                    >
                      {language === 'id' ? 'Tutup' : 'Dismiss'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

