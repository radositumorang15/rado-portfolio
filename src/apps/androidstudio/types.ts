export interface ProjectScreen {
  label: string;
  image: string;
  desc?: string;
}

export interface ProjectData {
  id: string;
  name: string;
  lang: 'Kotlin' | 'Flutter';
  mono: string;
  a: [string, string];
  screens: ProjectScreen[];
  tree: [number, string, string?][];
  f: Record<string, [string, string]>;
  log: string[];
  repoUrl: string;
  pkg: string;
}

export interface ProjectState {
  tabs: string[];
  cur: string;
  st: 'off' | 'boot' | 'on';
  scr: number;
  busy: boolean;
  logs: [string, string, string?][];
  lt: 'build' | 'logcat';
  toast: string;
}

