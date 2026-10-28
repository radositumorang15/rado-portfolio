'use client';

import React, { useState } from 'react';
import { TerminalView, TerminalEntry } from './TerminalView';
import { profileData } from '../../data/profile';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { experienceData } from '../../data/experience';
import { useWindowsStore } from '../../store/windows';
import { usePrefsStore } from '../../store/prefs';
import { notch } from '../../os/notch';

export const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);

  const openWindow = useWindowsStore((s) => s.openWindow);
  const setTheme = usePrefsStore((s) => s.setTheme);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const parts = cmd.split(' ');
    const root = parts[0];

    if (!cmd) return;

    setCmdHistory((prev) => [...prev, raw]);
    setHistIndex(-1);

    let output: string = '';

    switch (root) {
      case 'help':
        output = `Available commands:
  whoami       - Display profile summary
  about        - Open About window
  experience   - List career & work history
  projects     - List featured projects
  skills       - List competencies
  resume       - Download Rado's CV
  contact      - Open contact window
  theme <mode> - Switch theme ('light' or 'dark')
  clear        - Clear terminal screen
  sudo hire    - Fast-track interview / hire Easter egg`;
        break;

      case 'whoami':
        output = `${profileData.name} (${profileData.shortName})
${profileData.tagline.en}
Location: ${profileData.location.en}
Education: ${profileData.education.institution} (GPA ${profileData.education.gpa})`;
        break;

      case 'about':
        openWindow('about');
        output = `Opening About window...`;
        break;

      case 'experience':
        output = experienceData.map((e) => `• [${e.start} - ${e.end}] ${e.role.en} at ${e.org}`).join('\n');
        break;

      case 'projects':
        output = projectsData.map((p) => `• ${p.title} (${p.stack.join(', ')})`).join('\n');
        break;

      case 'skills':
        output = skillsData.map((s) => `• ${s.name} [${s.category}]`).join('\n');
        break;

      case 'resume':
        openWindow('resume');
        output = `Opening Resume viewer...`;
        break;

      case 'contact':
        openWindow('contact');
        output = `Opening Contact form...`;
        break;

      case 'theme':
        if (parts[1] === 'light' || parts[1] === 'dark') {
          setTheme(parts[1]);
          output = `Theme switched to ${parts[1]}.`;
        } else {
          output = `Usage: theme light | theme dark`;
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'sudo':
        if (cmd === 'sudo hire' || cmd === 'sudo hire rado') {
          openWindow('contact');
          notch.show({
            title: 'Easter Egg Triggered!',
            subtitle: 'Thanks for reaching out to hire Rado!',
            priority: 'high',
          });
          output = `ACCESS GRANTED! Opening contact channel for hiring Rado Situmorang...`;
        } else {
          output = `sudo: permission denied. Try 'sudo hire rado'`;
        }
        break;

      default:
        output = `command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: raw, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = histIndex === -1 ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(nextIndex);
      setInput(cmdHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === -1) return;
      const nextIndex = histIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistIndex(-1);
        setInput('');
      } else {
        setHistIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    }
  };

  return (
    <TerminalView
      history={history}
      input={input}
      onInputChange={setInput}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    />
  );
};
