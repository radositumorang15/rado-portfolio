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
      source: 'https://github.com/radositumorang15/SiGizi',
    },
    images: [
      '/images/projects/sigizi/Screenshot_20240618_215553.png',
      '/images/projects/sigizi/Screenshot_20240618_215604.png',
      '/images/projects/sigizi/Screenshot_20240618_215628.png',
      '/images/projects/sigizi/Screenshot_20240618_215211.png',
    ],
  },
  {
    slug: 'bandarismapp',
    title: 'Bandarism — Smart Money & Institutional Flow Tracker',
    category: 'mobile',
    summary: {
      en: 'Real-time Indonesian & US stock analytics powered by Wyckoff accumulation and Finora AI.',
      id: 'Aplikasi analisis bandarmologi IHSG & US stocks dengan deteksi akumulasi Wyckoff dan Finora AI.',
    },
    description: {
      en: 'Cross-platform financial technology mobile application tracking institutional broker flows, foreign buy/sell streaks, and Wyckoff price-action phases. Integrates Finora AI Market Advisor for instant confluence scoring.',
      id: 'Aplikasi mobile fintech berbasis Flutter untuk melacak aliran broker institusi (smart money), foreign flow harian, dan fase akumulasi Wyckoff, dilengkapi Finora AI Market Advisor.',
    },
    stack: ['Flutter', 'Dart', 'Riverpod', 'Supabase', 'PostgreSQL', 'fl_chart'],
    role: {
      en: 'Full Stack Mobile & Systems Developer',
      id: 'Full Stack Mobile & Systems Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15/bandarismapp',
    },
    images: ['/images/projects/bandarism/logo.png'],
  },
  {
    slug: 'mariban',
    title: 'Mariban Customer — Automotive & Workshop Portal',
    category: 'mobile',
    summary: {
      en: 'Customer workshop management app with tire size catalog, 3D spooring, and service queue booking.',
      id: 'Aplikasi bengkel modern CV Mariban untuk booking spooring 3D, balancing, dan katalog ban mobil.',
    },
    description: {
      en: 'Customer and operations mobile portal for CV Mariban Indonesia. Features Hunter Hawkeye 3D spooring reservations, computerized balancing, tire size lookup by car model, and direct WhatsApp customer support.',
      id: 'Portal layanan pelanggan CV Mariban Indonesia. Menyediakan reservasi spooring 3D, balancing komputer, pencarian ukuran ban berdasarkan merk mobil, dan customer care terintegrasi.',
    },
    stack: ['Flutter', 'Dart', 'Riverpod', 'gRPC', 'OpenCV', 'SVG'],
    role: {
      en: 'Mobile Application Developer',
      id: 'Mobile Application Developer',
    },
    links: {
      source: 'https://github.com/felicadmaja/flutter-mariban',
    },
    images: [
      '/images/projects/mariban/logo.png',
      '/images/projects/mariban/Spooring.webp',
      '/images/projects/mariban/Balancing.webp',
      '/images/projects/mariban/Customer.png',
    ],
  },
  {
    slug: 'yorajobs',
    title: 'YoraJobs — Smart Job Application Tracker',
    category: 'mobile',
    summary: {
      en: 'Comprehensive job search tracker with pipeline status filters, salary insights, and reminder alerts.',
      id: 'Aplikasi pelacak lamaran kerja dengan filter status pipeline, catatan gaji, dan notifikasi deadline.',
    },
    description: {
      en: 'Personal recruitment pipeline organizer built with Flutter & Riverpod. Helps job seekers track application statuses (Belum Dilamar, Interview, Offering, Ditolak), bookmark listings, calculate salary ranges, and receive deadline notifications.',
      id: 'Aplikasi pengelola pipeline rekrutmen kerja berbasis Flutter dan Riverpod. Membantu pelamar memantau status lamaran kerja, menyimpan lowongan, memformat range gaji, dan menerima pengingat jadwal interview.',
    },
    stack: ['Flutter', 'Dart', 'Riverpod', 'Freezed', 'Supabase', 'GoRouter'],
    role: {
      en: 'Mobile App Developer',
      id: 'Mobile App Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15/yorajobs',
    },
    images: ['/images/projects/yorajobs/logo.png'],
  },
  {
    slug: 'katoba-learn',
    title: 'Kotoba Learn — JLPT Japanese Vocabulary & Flashcards',
    category: 'mobile',
    summary: {
      en: 'Offline-ready Japanese vocabulary flashcard app with spaced repetition and JLPT N5-N4 decks.',
      id: 'Aplikasi flashcard kosakata bahasa Jepang dengan metode spaced repetition dan materi JLPT N5-N4.',
    },
    description: {
      en: 'Interactive Japanese language learning mobile application featuring interactive flashcard decks with Furigana/Kanji, daily streak habit tracker, audio pronunciation, and structured JLPT N5/N4 vocabulary decks.',
      id: 'Aplikasi pembelajaran kosakata bahasa Jepang interaktif dengan flashcard dua sisi (Kanji, Furigana, Terjemahan), pelacak streak harian, dan bank kosakata JLPT N5 & N4 terstruktur.',
    },
    stack: ['Flutter', 'Dart', 'SQLite', 'Spaced Repetition', 'Material 3'],
    role: {
      en: 'Mobile Developer & UI Designer',
      id: 'Mobile Developer & Desainer UI',
    },
    links: {
      source: 'https://github.com/radositumorang15',
    },
    images: ['/images/projects/kotoba/preview.svg'],
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
