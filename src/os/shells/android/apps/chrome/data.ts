import { ChromeTab } from './types';

export const CHROME_TABS_DATA: Record<string, ChromeTab> = {
  home: {
    id: 'home',
    title: 'New tab',
    url: 'Search or type URL',
    ntp: true,
    hue: 220,
    l: 'N',
  },
  rado: {
    id: 'rado',
    title: 'Rado.dev',
    url: 'rado.dev',
    hue: 215,
    l: 'R',
    hero: ['Hi, I’m Rado', 'Mobile and web developer. An interactive, OS-style portfolio.', 'See projects'],
    sec: [
      ['Featured', [['Skills as apps', 'Installed stack with proof of work'], ['Projects as folders', '3D folders you can open'], ['Dynamic notch', 'A live status island']]],
      ['Built with', [['ReactJS'], ['Next.js'], ['Tailwind CSS']]],
    ],
    githubUrl: 'https://github.com/radositumorang15/rado-portfolio',
    liveUrl: 'https://radositumorang.netlify.app/',
  },
  mongg: {
    id: 'mongg',
    title: 'Monggosare',
    url: 'monggosare.com',
    hue: 165,
    l: 'M',
    serif: true,
    hero: ['Stay by the sea', 'Hotel reservation with automated room availability.', 'Check availability'],
    sec: [
      ['Rooms', [['Deluxe Room', 'From Rp650.000 / night'], ['Family Suite', 'From Rp1.100.000 / night'], ['Garden Villa', 'From Rp1.750.000 / night']]],
      ['Built with', [['PHP'], ['JavaScript'], ['HTML5']]],
    ],
    githubUrl: 'https://github.com/radositumorang15/Monggosare',
    liveUrl: 'https://radositumorang15.github.io/Monggosare/',
  },
  titik: {
    id: 'titik',
    title: 'Titik Makan',
    url: 'titikmakan.com',
    hue: 24,
    l: 'T',
    serif: true,
    hero: ['Dine at the point', 'A modern culinary reservation website.', 'Reserve a table'],
    sec: [
      ['Menu highlights', [['Rendang Tasting', 'Slow-cooked, served with sambal matah'], ['Grilled Seabass', 'Lemongrass butter, seasonal greens'], ['Pandan Panna Cotta', 'Coconut cream, palm sugar']]],
      ['Built with', [['JavaScript'], ['HTML5'], ['CSS3']]],
    ],
    githubUrl: 'https://github.com/radositumorang15/titikmakann',
  },
  sigizi: {
    id: 'sigizi',
    title: 'siGizi',
    url: 'sigizi.app',
    hue: 142,
    l: 'S',
    hero: ['Early Stunting Detection', 'Android app empowering mothers with machine learning nutrition insights.', 'View repository'],
    sec: [
      ['Features', [['ML Risk Prediction', 'Antropometric WHO child growth curves'], ['SurveyKit Questionnaires', 'Interactive guidance for mothers'], ['Nutritional Guidance', 'Balanced meal recipes & posyandu forum']]],
      ['Built with', [['Kotlin'], ['TensorFlow Lite'], ['Material 3']]],
    ],
    githubUrl: 'https://github.com/radositumorang15/SiGizi',
  },
  kotoba: {
    id: 'kotoba',
    title: 'Kotoba',
    url: 'kotoba.app',
    hue: 330,
    l: 'K',
    hero: ['Japanese SRS Learning', 'Audio-first Japanese learning with pop culture and SM-2 Spaced Repetition.', 'View repository'],
    sec: [
      ['Curriculum', [['4-Phase Curriculum', '12 levels from Kana to Conversation'], ['Spaced Repetition', 'SM-2 daily memory retention reviews'], ['Native TTS Audio', 'Platform-native pronunciation synthesis']]],
      ['Built with', [['Kotlin Multiplatform'], ['Compose Multiplatform'], ['Neon PostgreSQL']]],
    ],
    githubUrl: 'https://github.com/radositumorang15/katoba-learn-japanese',
  },
};

export const DEFAULT_TABS: string[] = ['home', 'rado', 'mongg', 'titik'];
