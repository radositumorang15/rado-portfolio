import { create } from 'zustand';
import { AppId, Z_INDEX } from '../lib/constants';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  z: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

const DEFAULT_BOUNDS: Record<AppId, { w: number; h: number }> = {
  about: { w: 860, h: 560 },
  experience: { w: 960, h: 620 },
  projects: { w: 1040, h: 680 },
  skills: { w: 760, h: 520 },
  terminal: { w: 720, h: 460 },
  resume: { w: 880, h: 700 },
  contact: { w: 580, h: 580 },
  settings: { w: 860, h: 580 },
  taskmanager: { w: 820, h: 540 },
  androidstudio: { w: 1080, h: 680 },
};

interface WindowsStore {
  windows: Record<AppId, WindowState>;
  activeId: AppId | null;
  historyStack: AppId[];
  topZ: number;
  openWindow: (id: AppId, subRoute?: string) => void;
  closeWindow: (id: AppId) => void;
  focusWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  toggleMaximizeWindow: (id: AppId) => void;
  updatePosition: (id: AppId, x: number, y: number, w: number, h: number) => void;
}

const initialWindows: Record<AppId, WindowState> = {
  about: { id: 'about', title: 'About', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 80, y: 50, ...DEFAULT_BOUNDS.about },
  experience: { id: 'experience', title: 'Experience', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 110, y: 70, ...DEFAULT_BOUNDS.experience },
  projects: { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 140, y: 90, ...DEFAULT_BOUNDS.projects },
  skills: { id: 'skills', title: 'Skills', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 170, y: 110, ...DEFAULT_BOUNDS.skills },
  terminal: { id: 'terminal', title: 'Terminal', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 200, y: 130, ...DEFAULT_BOUNDS.terminal },
  resume: { id: 'resume', title: 'Resume', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 230, y: 60, ...DEFAULT_BOUNDS.resume },
  contact: { id: 'contact', title: 'Contact', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 260, y: 80, ...DEFAULT_BOUNDS.contact },
  settings: { id: 'settings', title: 'Settings', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 290, y: 100, ...DEFAULT_BOUNDS.settings },
  taskmanager: { id: 'taskmanager', title: 'Task Manager', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 200, y: 120, ...DEFAULT_BOUNDS.taskmanager },
  androidstudio: { id: 'androidstudio', title: 'Android Studio — Mobile Portfolio', isOpen: false, isMinimized: false, isMaximized: false, z: 100, x: 90, y: 50, ...DEFAULT_BOUNDS.androidstudio },
};

export const useWindowsStore = create<WindowsStore>((set, get) => ({
  windows: initialWindows,
  activeId: null,
  historyStack: [],
  topZ: Z_INDEX.WINDOWS_BASE,

  openWindow: (id, subRoute) => {
    const { windows, topZ, historyStack } = get();
    const nextZ = Math.min(topZ + 1, Z_INDEX.WINDOWS_MAX);
    const win = windows[id];

    if (typeof window !== 'undefined') {
      const targetHash = subRoute ? `${id}/${subRoute}` : id;
      if (window.location.hash.replace('#', '') !== targetHash) {
        window.location.hash = targetHash;
      }
    }

    set({
      windows: {
        ...windows,
        [id]: { ...win, isOpen: true, isMinimized: false, z: nextZ },
      },
      activeId: id,
      topZ: nextZ,
      historyStack: historyStack.filter((x) => x !== id).concat(id),
    });
  },

  closeWindow: (id) => {
    const { windows, historyStack } = get();
    const newStack = historyStack.filter((x) => x !== id);
    const remaining = newStack.filter((x) => windows[x]?.isOpen && !windows[x]?.isMinimized && x !== id);
    const nextActive = remaining.length > 0 ? remaining[remaining.length - 1] : null;

    if (typeof window !== 'undefined') {
      if (nextActive) {
        if (window.location.hash.replace('#', '') !== nextActive) window.location.hash = nextActive;
      } else if (window.location.hash) {
        try {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch {
          window.location.hash = '';
        }
      }
    }

    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isOpen: false, isMinimized: false },
      },
      activeId: nextActive,
      historyStack: newStack,
    });
  },

  focusWindow: (id) => {
    const { windows, topZ, activeId, historyStack } = get();
    if (activeId === id && !windows[id].isMinimized) return;

    const nextZ = Math.min(topZ + 1, Z_INDEX.WINDOWS_MAX);
    if (typeof window !== 'undefined') {
      if (window.location.hash.replace('#', '') !== id) window.location.hash = id;
    }

    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isMinimized: false, z: nextZ },
      },
      activeId: id,
      topZ: nextZ,
      historyStack: historyStack.filter((x) => x !== id).concat(id),
    });
  },

  minimizeWindow: (id) => {
    const { windows, historyStack } = get();
    const newStack = historyStack.filter((x) => x !== id);
    const remaining = newStack.filter((x) => windows[x]?.isOpen && !windows[x]?.isMinimized && x !== id);
    const nextActive = remaining.length > 0 ? remaining[remaining.length - 1] : null;

    if (typeof window !== 'undefined') {
      if (nextActive) {
        if (window.location.hash.replace('#', '') !== nextActive) window.location.hash = nextActive;
      } else if (window.location.hash) {
        try {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch {
          window.location.hash = '';
        }
      }
    }

    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isMinimized: true },
      },
      activeId: nextActive,
      historyStack: newStack,
    });
  },

  toggleMaximizeWindow: (id) => {
    const { windows } = get();
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          isMaximized: !windows[id].isMaximized,
        },
      },
    });
  },

  updatePosition: (id, x, y, w, h) => {
    const { windows } = get();
    set({
      windows: {
        ...windows,
        [id]: {
          ...windows[id],
          x,
          y,
          w,
          h,
        },
      },
    });
  },
}));

