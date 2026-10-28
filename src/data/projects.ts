import { Project } from './types';

export const projectsData: Project[] = [
  {
    slug: 'rado-dev',
    title: 'Rado.dev — Portfolio Website',
    category: 'web',
    summary: {
      en: 'Interactive developer portfolio featuring OS metaphors, dynamic notch, and smooth animations.',
      id: 'Situs portofolio responsif dengan elemen interaktif dan transisi halus.',
    },
    description: {
      en: 'Designed and engineered a dual-shell operating system simulation portfolio. Features Windows 11 Fluent 2 desktop experience and Android 17 Material 3 Expressive mobile experience.',
      id: 'Dirancang dan dibangun dengan simulasi sistem operasi ganda: Windows 11 Fluent 2 di desktop dan Android 17 Material 3 Expressive di ponsel.',
    },
    stack: ['ReactJS', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    role: {
      en: 'Frontend Developer & UI/UX Designer',
      id: 'Frontend Developer & Desainer UI/UX',
    },
    links: {
      live: 'https://radositumorang.netlify.app/',
      source: 'https://github.com/radositumorang15/rado-portfolio',
    },
    images: ['/images/projects/rado-dev.png'],
  },
  {
    slug: 'sigizi',
    title: 'siGizi — Stunting Prediction App',
    category: 'mobile',
    summary: {
      en: 'Android application empowering mothers to prevent stunting using machine learning nutrition insights.',
      id: 'Aplikasi Android untuk membantu ibu mencegah stunting dan edukasi gizi dengan analisis ML.',
    },
    description: {
      en: 'Capstoned in Bangkit Academy (Google, GoTo, Traveloka). An Android app integrating nutritional tracking, growth metrics, and edge ML predictions to detect stunting risk early.',
      id: 'Proyek Capstone Bangkit Academy. Aplikasi Android dengan pelacakan gizi, metrik pertumbuhan anak, dan integrasi model ML untuk deteksi dini risiko stunting.',
    },
    stack: ['Kotlin', 'Android SDK', 'XML', 'TensorFlow Lite', 'Retrofit'],
    role: {
      en: 'Mobile Developer & ML Integration',
      id: 'Mobile Developer & Integrasi ML',
    },
    links: {
      source: 'https://github.com/radositumorang15',
    },
    images: ['/images/projects/sigizi.png'],
  },
  {
    slug: 'smileshop',
    title: 'SmileShop — Mini E-Commerce App',
    category: 'mobile',
    summary: {
      en: 'Full-featured mobile e-commerce platform with authentication, cart management, and order tracking.',
      id: 'Platform e-commerce responsif: autentikasi aman, keranjang, dan pelacakan pesanan.',
    },
    description: {
      en: 'Cross-platform mobile commerce application built with Flutter and Firebase. Integrates FakeStore API for product catalog with real-time Firestore cart synchronization.',
      id: 'Aplikasi e-commerce mobile cross-platform berbasis Flutter dan Firebase dengan sinkronisasi keranjang belanja real-time dan katalog FakeStore API.',
    },
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'REST API'],
    role: {
      en: 'Mobile Developer',
      id: 'Mobile Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15',
    },
    images: ['/images/projects/smileshop.png'],
  },
  {
    slug: 'monggosare',
    title: 'Monggosare — Hotel Reservation Website',
    category: 'web',
    summary: {
      en: 'Hotel reservation platform with automated room availability, booking flow, and customer login.',
      id: 'Website reservasi hotel dengan alur login dan booking kamar online.',
    },
    description: {
      en: 'Academic project developing an end-to-end hotel booking portal. Built clean responsive UI interfaces with Bootstrap 5 and interactive room selection filters.',
      id: 'Website pemesanan kamar hotel dengan antarmuka responsif Bootstrap 5, alur reservasi interaktif, dan validasi formulir kamar.',
    },
    stack: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5', 'MySQL'],
    role: {
      en: 'Frontend Developer',
      id: 'Frontend Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15',
    },
    images: ['/images/projects/monggosare.png'],
  },
  {
    slug: 'titik-makan',
    title: 'Titik Makan — Restaurant Reservation Website',
    category: 'web',
    summary: {
      en: 'Modern culinary reservation website showcasing dining menus, ambiance, and table bookings.',
      id: 'Website restoran dengan identitas unik agar restoran tampak menarik dan representatif.',
    },
    description: {
      en: 'Created an appetizing web showcase for restaurant promotions, online dining reservations, and interactive menu exploration.',
      id: 'Website promosi kuliner dan reservasi meja makan dengan tata letak visual modern dan menu interaktif.',
    },
    stack: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5'],
    role: {
      en: 'Frontend Developer',
      id: 'Frontend Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15',
    },
    images: ['/images/projects/titik-makan.png'],
  },
];

