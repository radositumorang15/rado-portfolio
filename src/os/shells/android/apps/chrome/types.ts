export interface ChromeTab {
  id: string;
  name: string;
  title: string;
  mono: string;
  url: string;
  displayUrl: string;
  category: string;
  year: number;
  role: string;
  primaryLang: string;
  gradient: [string, string]; // [a1, a2]
  tagline: { en: string; id: string };
  description: { en: string; id: string };
  stack: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  previewImage?: string;
  accentColor: string;
}
