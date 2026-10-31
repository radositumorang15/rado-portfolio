export interface GitHubProjectMeta {
  id: string;
  name: string;
  type: 'mobile' | 'web';
  color: string;
  githubUrl: string;
}

export interface InstalledSkill {
  name: string;
  category: 'Mobile' | 'Web' | 'Backend' | 'Design' | 'Tools';
  since: number;
  projects: string[];
}

export interface InstallingSkill {
  name: string;
  category: 'Mobile' | 'Web' | 'Backend' | 'Design' | 'Tools';
  steps: string[];
  done: number;
}

export const GITHUB_PROJECTS: Record<string, GitHubProjectMeta> = {
  sigizi: {
    id: 'sigizi',
    name: 'siGizi',
    type: 'mobile',
    color: '#16A37F',
    githubUrl: 'https://github.com/radositumorang15/SiGizi',
  },
  katoba: {
    id: 'katoba',
    name: 'Kotoba',
    type: 'mobile',
    color: '#0EA5E9',
    githubUrl: 'https://github.com/radositumorang15',
  },
  bandarism: {
    id: 'bandarism',
    name: 'Bandarism',
    type: 'mobile',
    color: '#F59E0B',
    githubUrl: 'https://github.com/radositumorang15/bandarism',
  },
  smile: {
    id: 'smile',
    name: 'SmileShop',
    type: 'mobile',
    color: '#FF6B4A',
    githubUrl: 'https://github.com/radositumorang15',
  },
  mariban: {
    id: 'mariban',
    name: 'Mariban App',
    type: 'mobile',
    color: '#10B981',
    githubUrl: 'https://github.com/radositumorang15',
  },
  maribancust: {
    id: 'maribancust',
    name: 'Mariban Cust',
    type: 'mobile',
    color: '#059669',
    githubUrl: 'https://github.com/radositumorang15/maribancustomer',
  },
  yorajobs: {
    id: 'yorajobs',
    name: 'YoraJobs',
    type: 'mobile',
    color: '#8B5CF6',
    githubUrl: 'https://github.com/radositumorang15/yorajobs',
  },
  rado: {
    id: 'rado',
    name: 'Rado.dev',
    type: 'web',
    color: '#3B82F6',
    githubUrl: 'https://github.com/radositumorang15/rado-portfolio',
  },
  mongg: {
    id: 'mongg',
    name: 'Monggosare',
    type: 'web',
    color: '#06B6D4',
    githubUrl: 'https://github.com/radositumorang15/Monggosare',
  },
  titik: {
    id: 'titik',
    name: 'Titik Makan',
    type: 'web',
    color: '#EC4899',
    githubUrl: 'https://github.com/radositumorang15/titikmakann',
  },
};

export const CATEGORY_HUES: Record<InstalledSkill['category'], { h: number; hex: string }> = {
  Mobile: { h: 150, hex: '#10B981' },
  Web: { h: 210, hex: '#3B82F6' },
  Backend: { h: 35, hex: '#F59E0B' },
  Design: { h: 280, hex: '#A855F7' },
  Tools: { h: 250, hex: '#6366F1' },
};

export const INSTALLED_SKILLS: InstalledSkill[] = [
  { name: 'Kotlin', category: 'Mobile', since: 2024, projects: ['sigizi', 'katoba', 'bandarism'] },
  { name: 'Android SDK', category: 'Mobile', since: 2024, projects: ['sigizi', 'katoba', 'bandarism'] },
  { name: 'Flutter', category: 'Mobile', since: 2025, projects: ['smile', 'mariban', 'maribancust', 'yorajobs'] },
  { name: 'Dart', category: 'Mobile', since: 2025, projects: ['smile', 'mariban', 'maribancust', 'yorajobs'] },
  { name: 'Compose Multiplatform', category: 'Mobile', since: 2025, projects: ['katoba'] },
  { name: 'Next.js 16', category: 'Web', since: 2025, projects: ['rado'] },
  { name: 'React 19', category: 'Web', since: 2024, projects: ['rado', 'mongg', 'titik'] },
  { name: 'TypeScript', category: 'Web', since: 2024, projects: ['rado'] },
  { name: 'Tailwind CSS 4', category: 'Web', since: 2024, projects: ['rado', 'titik'] },
  { name: 'Git & GitHub', category: 'Tools', since: 2023, projects: ['rado', 'sigizi', 'katoba', 'smile', 'mariban', 'mongg'] },
  { name: 'Firebase', category: 'Backend', since: 2024, projects: ['smile', 'mariban', 'titik'] },
  { name: 'REST API & Retrofit', category: 'Backend', since: 2024, projects: ['sigizi', 'bandarism', 'yorajobs', 'mongg'] },
  { name: 'TensorFlow Lite', category: 'Mobile', since: 2024, projects: ['sigizi'] },
  { name: 'Google Maps API', category: 'Mobile', since: 2024, projects: ['maribancust', 'titik'] },
  { name: 'PostgreSQL (Neon)', category: 'Backend', since: 2025, projects: ['katoba'] },
  { name: 'Figma', category: 'Design', since: 2024, projects: ['rado', 'sigizi', 'smile', 'mariban'] },
];

export const INSTALLING_SKILLS: InstallingSkill[] = [
  {
    name: 'KMP iOS (Swift & CocoaPods)',
    category: 'Mobile',
    steps: ['expect/actual native audio', 'CocoaPods iOS packaging', 'App Store release test'],
    done: 2,
  },
  {
    name: 'Python & ML Fine-tuning',
    category: 'Backend',
    steps: ['Dataset preprocessing', 'Transfer learning pipeline', 'TFLite edge export'],
    done: 2,
  },
  {
    name: 'Rust (Axum & Systems)',
    category: 'Backend',
    steps: ['Ownership, lifetimes & borrow checker', 'Async Tokio & Axum microservices', 'UniFFI mobile native bindings'],
    done: 1,
  },
];

