import { Skill } from './types';

export const skillsData: Skill[] = [
  // Competent
  {
    name: 'Kotlin',
    level: 'competent',
    icon: 'code-2',
    category: 'competent',
    related: ['sigizi', 'bangkit'],
  },
  {
    name: 'XML (Android)',
    level: 'competent',
    icon: 'layout',
    category: 'competent',
    related: ['sigizi', 'bangkit'],
  },
  {
    name: 'JavaScript',
    level: 'competent',
    icon: 'file-code',
    category: 'competent',
    related: ['rado-dev', 'detik', 'monggosare', 'titik-makan'],
  },
  {
    name: 'HTML & CSS',
    level: 'competent',
    icon: 'globe',
    category: 'competent',
    related: ['detik', 'monggosare', 'titik-makan', 'kawan-kerja', 'mariban'],
  },
  {
    name: 'Bootstrap 5',
    level: 'competent',
    icon: 'box',
    category: 'competent',
    related: ['detik', 'monggosare', 'titik-makan'],
  },
  {
    name: 'CodeIgniter 3',
    level: 'competent',
    icon: 'server',
    category: 'competent',
    related: ['detik'],
  },

  // Novice / Learning
  {
    name: 'ReactJS',
    level: 'novice',
    icon: 'atom',
    category: 'novice',
    related: ['rado-dev', 'mariban'],
  },
  {
    name: 'Flutter',
    level: 'novice',
    icon: 'smartphone',
    category: 'novice',
    related: ['smileshop'],
  },
  {
    name: 'Rust',
    level: 'novice',
    icon: 'cpu',
    category: 'novice',
    related: [],
  },
  {
    name: 'Python',
    level: 'novice',
    icon: 'terminal',
    category: 'novice',
    related: ['bangkit'],
  },
  {
    name: 'SQL & Database',
    level: 'novice',
    icon: 'database',
    category: 'novice',
    related: ['monggosare'],
  },

  // Tools
  {
    name: 'Figma',
    level: 'tool',
    icon: 'pen-tool',
    category: 'tool',
    related: ['mariban', 'kawan-kerja', 'rado-dev'],
  },
  {
    name: 'Adobe Illustrator',
    level: 'tool',
    icon: 'palette',
    category: 'tool',
    related: ['bytesfest'],
  },
  {
    name: 'CorelDraw',
    level: 'tool',
    icon: 'brush',
    category: 'tool',
    related: [],
  },
];

