import { ProjectScreen } from '@/src/apps/androidstudio/types';

export interface PlayApp {
  id: string;
  name: string;
  developer: string;
  category: string;
  tagline: { en: string; id: string };
  description: { en: string; id: string };
  lang: 'Kotlin' | 'Flutter' | 'React' | 'Compose';
  year: number;
  rating: number;
  reviewsCount: string;
  downloads: string;
  size: string;
  role: string;
  gradient: [string, string];
  iconInitials: string;
  iconSrc?: string;
  stack: string[];
  features?: string[];
  githubUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
  screens: ProjectScreen[];
}

