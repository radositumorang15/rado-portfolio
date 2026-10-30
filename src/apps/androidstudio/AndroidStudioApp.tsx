'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProjectState } from './types';
import { PROJECTS } from './data';
import { StudioToolbar } from './StudioToolbar';
import { ProjectTree } from './ProjectTree';
import { CodeEditor } from './CodeEditor';
import { EmulatorScreen } from './EmulatorScreen';
import { playWindowsSound } from '../../lib/audio';
import { notch } from '../../os/notch';
import './androidstudio.css';

export const AndroidStudioApp: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string>('sigizi');
  const [viewMode, setViewMode] = useState<'code' | 'emu'>('code');
  const [phoneScale, setPhoneScale] = useState<number>(1);
  const [timeStr, setTimeStr] = useState<string>('12:00');
  const fitContainerRef = useRef<HTMLDivElement | null>(null);

  const [projectStates, setProjectStates] = useState<Record<string, ProjectState>>(() => {
    const initial: Record<string, ProjectState> = {};
    PROJECTS.forEach((proj) => {
      const firstTab = Object.keys(proj.f)[0] || 'm';
      initial[proj.id] = {
        tabs: [firstTab],
        cur: firstTab,
        st: proj.id === 'sigizi' ? 'on' : 'off',
        scr: 0,
        busy: false,
        logs: proj.log.map((l) => ['build', l, 'ok']),
        lt: 'build',
        toast: '',
      };
    });
    return initial;
  });

  const curProject = PROJECTS.find((p) => p.id === activeProject) || PROJECTS[0];
  const curState = projectStates[activeProject] || projectStates[PROJECTS[0].id];

  const updateCurrentState = (partial: Partial<ProjectState>) => {
    setProjectStates((prev) => ({
      ...prev,
      [activeProject]: { ...prev[activeProject], ...partial },
    }));
  };

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(new Date().toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = fitContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const s = Math.min((width - 16) / 280, (height - 16) / 580, 1.15);
      setPhoneScale(Math.max(s, 0.45));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleRun = () => {
    if (curState.busy) return;
    playWindowsSound('click');
    updateCurrentState({
      busy: true,
      logs: [
        ...curState.logs,
        ['build', `Starting incremental build for ${curProject.name}...`],
        ['build', `> Task :${curProject.id}:compileDebug`],
        ['build', `> Task :${curProject.id}:installDebug (Pixel 8 API 34)`],
      ],
      st: 'boot',
    });

    setTimeout(() => {
      updateCurrentState({
        busy: false,
        st: 'on',
        logs: [
          ...curState.logs,
          ['build', `✓ Build successful! Application running.`, 'ok'],
          ['logcat', `I/ActivityManager: Start proc ${curProject.pkg} for activity .MainActivity`],
        ],
      });
      playWindowsSound('open');
      notch.show({
        title: `Android Studio: ${curProject.name}`,
        subtitle: `Application built & deployed on Pixel 8 API 34`,
        duration: 3500,
      });
    }, 950);
  };

  const handleStop = () => {
    playWindowsSound('click');
    updateCurrentState({
      busy: false,
      st: 'off',
      logs: [...curState.logs, ['logcat', `I/Process: Sending signal. PID: 8432 SIGTERM`]],
    });
  };

  return (
    <div
      className="as-root w-full h-full"
      data-v={viewMode}
      style={{ '--a1': curProject.a[0], '--a2': curProject.a[1] } as React.CSSProperties}
    >
      <StudioToolbar
        curProject={curProject}
        curState={curState}
        projectStates={projectStates}
        viewMode={viewMode}
        onSelectProject={(id) => setActiveProject(id)}
        onRun={handleRun}
        onStop={handleStop}
        onToggleViewMode={(mode) => setViewMode(mode)}
      />

      <div className="as-mn">
        <ProjectTree
          curProject={curProject}
          curState={curState}
          onSelectFile={(fileKey) => {
            const tabs = curState.tabs.includes(fileKey) ? curState.tabs : [...curState.tabs, fileKey];
            updateCurrentState({ tabs, cur: fileKey });
          }}
        />

        <CodeEditor
          curProject={curProject}
          curState={curState}
          onSelectTab={(tabKey) => updateCurrentState({ cur: tabKey })}
          onCloseTab={(tabKey) => {
            const nextTabs = curState.tabs.filter((t) => t !== tabKey);
            const nextCur = curState.cur === tabKey ? nextTabs[nextTabs.length - 1] : curState.cur;
            updateCurrentState({ tabs: nextTabs, cur: nextCur });
          }}
        />

        {/* Bottom Tool Window: Build & Logcat */}
        <div className="as-bt">
          <nav>
            <button
              onClick={() => updateCurrentState({ lt: 'build' })}
              className={curState.lt === 'build' ? 'on' : ''}
            >
              Build
            </button>
            <button
              onClick={() => updateCurrentState({ lt: 'logcat' })}
              className={curState.lt === 'logcat' ? 'on' : ''}
            >
              Logcat
            </button>
          </nav>
          <div className="as-lg">
            {curState.logs
              .filter((log) => log[0] === curState.lt)
              .map((log, lIdx) => (
                <p key={lIdx} className={log[2] === 'ok' ? 'ok' : ''}>{log[1]}</p>
              ))}
          </div>
        </div>

        <EmulatorScreen
          curProject={curProject}
          curState={curState}
          timeStr={timeStr}
          phoneScale={phoneScale}
          fitContainerRef={fitContainerRef}
          onSelectScreen={(screenIdx) => {
            updateCurrentState({
              scr: screenIdx,
              logs: [
                ...curState.logs,
                ['logcat', `D/Emulator: Switched to screen ${screenIdx} (${curProject.screens[screenIdx]?.label})`],
              ],
            });
          }}
        />
      </div>
    </div>
  );
};
