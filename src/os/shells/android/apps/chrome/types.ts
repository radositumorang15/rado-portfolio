export type ChromeSectionItem = [string, string?];
export type ChromeSection = [string, ChromeSectionItem[]];

export interface ChromeTab {
  id: string;
  title: string;
  url: string;
  hue: number;
  l: string;
  ntp?: boolean;
  serif?: boolean;
  hero?: [string, string, string];
  sec?: ChromeSection[];
  githubUrl?: string;
  liveUrl?: string;
}

export type SwitcherMode = 'grid' | 'stack';
