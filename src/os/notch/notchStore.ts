import { create } from 'zustand';

export type NotchState = 'idle' | 'peek' | 'active' | 'expanded';
export type Mood = 'normal' | 'happy' | 'sleepy' | 'alert';

export interface NotchEvent {
  id: string;
  priority?: 'low' | 'normal' | 'high';
  icon?: string;
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

interface NotchStore {
  state: NotchState;
  currentEvent: NotchEvent | null;
  queue: NotchEvent[];
  mood: Mood;
  activeTab: 'status' | 'media' | 'shelf' | 'pulse';
  isPlaying: boolean;
  show: (event: Omit<NotchEvent, 'id'> & { id?: string }) => void;
  setState: (state: NotchState) => void;
  setMood: (mood: Mood) => void;
  setActiveTab: (tab: 'status' | 'media' | 'shelf' | 'pulse') => void;
  togglePlayback: () => void;
  dismiss: () => void;
}

export const useNotchStore = create<NotchStore>((set, get) => ({
  state: 'idle',
  currentEvent: null,
  queue: [],
  mood: 'normal',
  activeTab: 'status',
  isPlaying: false,

  show: (eventData) => {
    const id = eventData.id || `event-${Date.now()}`;
    const newEvent: NotchEvent = { ...eventData, id, duration: eventData.duration || 4000 };
    const { queue, state } = get();

    if (newEvent.priority === 'high') {
      set({
        currentEvent: newEvent,
        state: 'active',
        queue: queue.length >= 3 ? queue.slice(0, 2) : queue,
      });
      return;
    }

    if (state === 'idle' || state === 'peek') {
      set({ currentEvent: newEvent, state: 'active' });
    } else if (queue.length < 3) {
      set({ queue: [...queue, newEvent] });
    }
  },

  setState: (state) => set({ state }),
  setMood: (mood) => set({ mood }),
  setActiveTab: (activeTab) => set({ activeTab }),
  togglePlayback: () => set((s) => ({ isPlaying: !s.isPlaying, mood: !s.isPlaying ? 'happy' : 'normal' })),

  dismiss: () => {
    const { queue } = get();
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      set({ currentEvent: next, queue: rest, state: 'active' });
    } else {
      set({ currentEvent: null, state: 'idle' });
    }
  },
}));

export const notch = {
  show: (event: Omit<NotchEvent, 'id'> & { id?: string }) => useNotchStore.getState().show(event),
  setState: (state: NotchState) => useNotchStore.getState().setState(state),
  setMood: (mood: Mood) => useNotchStore.getState().setMood(mood),
};

