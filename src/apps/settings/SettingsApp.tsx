'use client';

import React from 'react';
import { SettingsView } from './SettingsView';
import { usePrefsStore } from '../../store/prefs';
import { notch } from '../../os/notch';

export const SettingsApp: React.FC = () => {
  const theme = usePrefsStore((s) => s.theme);
  const shell = usePrefsStore((s) => s.shell);
  const language = usePrefsStore((s) => s.language);
  const accent = usePrefsStore((s) => s.accent);
  const reduceMotion = usePrefsStore((s) => s.reduceMotion);
  const dockAutoHide = usePrefsStore((s) => s.dockAutoHide);

  const setTheme = usePrefsStore((s) => s.setTheme);
  const setShell = usePrefsStore((s) => s.setShell);
  const setLanguage = usePrefsStore((s) => s.setLanguage);
  const setAccent = usePrefsStore((s) => s.setAccent);
  const setReduceMotion = usePrefsStore((s) => s.setReduceMotion);
  const setDockAutoHide = usePrefsStore((s) => s.setDockAutoHide);

  const handleAccent = (a: string) => {
    setAccent(a);
    notch.show({ title: 'Accent Color Updated', subtitle: `Theme accent set to ${a}` });
  };

  const handleTheme = (t: 'system' | 'light' | 'dark') => {
    setTheme(t);
    notch.show({ title: 'Theme Updated', subtitle: `Theme set to ${t}` });
  };

  const handleShell = (s: 'auto' | 'windows' | 'android') => {
    setShell(s);
    notch.show({ title: 'Shell Updated', subtitle: `Switched to ${s}` });
  };

  const handleLang = (l: 'en' | 'id') => {
    setLanguage(l);
    notch.show({ title: 'Language Changed', subtitle: l === 'en' ? 'English' : 'Bahasa Indonesia' });
  };

  return (
    <SettingsView
      theme={theme}
      shell={shell}
      language={language}
      accent={accent}
      reduceMotion={reduceMotion}
      dockAutoHide={dockAutoHide}
      onThemeChange={handleTheme}
      onShellChange={handleShell}
      onLanguageChange={handleLang}
      onAccentChange={handleAccent}
      onReduceMotionChange={setReduceMotion}
      onDockAutoHideChange={setDockAutoHide}
    />
  );
};

