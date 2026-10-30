export type Level = 'competent' | 'novice' | 'tool';

export interface LocalizedString {
  en: string;
  id: string;
}

export interface Profile {
  name: string;
  shortName: string;
  tagline: LocalizedString;
  location: LocalizedString;
  workLocation: LocalizedString;
  avatar: string;
  linkedin: string;
  github: string;
  portfolio: string;
  email: string;
  about: LocalizedString;
  education: {
    institution: string;
    program: LocalizedString;
    period: string;
    gpa: string;
  };
  deviceSpecs: {
    deviceName: string;
    processor: string;
    gpa: string;
    languages: string;
  };
}

export interface Experience {
  slug: string;
  role: LocalizedString;
  org: string;
  location?: LocalizedString;
  start: string;
  end: string | 'present';
  bullets: LocalizedString[];
  type: 'work' | 'internship' | 'event';
}

export interface Project {
  slug: string;
  title: string;
  category: 'web' | 'mobile';
  summary: LocalizedString;
  description: LocalizedString;
  readme?: LocalizedString;
  features?: LocalizedString[];
  stack: string[];
  role?: LocalizedString;
  links: {
    live?: string;
    source?: string;
    video?: string;
  };
  images: string[];
}

export interface Skill {
  name: string;
  level: Level;
  icon: string;
  category: 'competent' | 'novice' | 'tool';
  related: string[];
}

