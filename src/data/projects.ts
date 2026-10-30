import { Project } from './types';

export const projectsData: Project[] = [
  {
    slug: 'rado-dev',
    title: 'Rado.dev — Portfolio Website',
    category: 'web',
    summary: {
      en: 'Interactive dual-OS developer portfolio simulation featuring Windows 11 Fluent 2 and Android 16 Material 3 Expressive.',
      id: 'Situs portofolio simulasi dual-OS: Windows 11 Fluent 2 di desktop dan Android 16 Material 3 Expressive di mobile.',
    },
    description: {
      en: 'Engineered an authentic operating system simulation portfolio. Features Windows 11 Fluent 2 desktop experience on desktop viewports and Google Pixel Launcher Android 16 Material 3 Expressive on mobile devices, with dynamic Rado Notch island.',
      id: 'Dirancang dengan simulasi sistem operasi ganda: Windows 11 Fluent 2 di desktop dan Android 16 Material 3 Expressive di ponsel, dilengkapi dynamic Rado Notch island dan Web Audio chimes.',
    },
    readme: {
      en: '## RadoOS — Interactive Dual-OS Developer Portfolio\n\nSimulates two production-grade operating systems in a single modern web application.\n\n### Key Highlights:\n- **Windows 11 Fluent 2 Desktop:** Two-layer window hierarchy, active/inactive Mica materials, 3D Fluent icons, 3D File Explorer pocket cards, taskbar search pill, and Task Manager.\n- **Google Pixel Launcher (Android 16 M3 Expressive):** Monochromatic themed circular icons, At-a-Glance widget, bottom search bar, and fluid wallpaper.\n- **Dynamic Rado Notch Island:** System status, media audio visualizer, and live notifications.\n- **Web Audio API Synth:** Native OS sound effects (clicks, minimizes, window chimes) without external audio files.',
      id: '## RadoOS — Portofolio Pengembang Dual-OS Interaktif\n\nSimulasi dua sistem operasi lengkap dalam satu aplikasi web modern dan responsif.\n\n### Fitur Utama:\n- **Windows 11 Fluent 2 Desktop:** Hierarki two-layer, material Mica aktif/inaktif, ikon 3D Fluent, File Explorer 3D kartu saku, dan Task Manager.\n- **Google Pixel Launcher (Android 16 M3):** Themed circular icons monokromatik, At-a-Glance widget, bottom search bar, dan wallpaper dinamis.\n- **Dynamic Rado Notch Island:** Status sistem, kontrol pemutar audio, dan notifikasi real-time.\n- **Web Audio API Synth:** Efek suara autentik (klik tombol, minimize jendela, lonceng notifikasi) tanpa file audio eksternal.',
    },
    features: [
      { en: 'Authentic Windows 11 Fluent 2 desktop shell (≥1024px)', id: 'Shell desktop Windows 11 Fluent 2 autentik (≥1024px)' },
      { en: 'Google Pixel Launcher Android 16 Material 3 shell (<1024px)', id: 'Shell mobile Google Pixel Launcher Android 16 (<1024px)' },
      { en: 'Interactive Dynamic Rado Notch Island status & sound synth', id: 'Dynamic Rado Notch interaktif status & audio synth' },
      { en: 'WinUI 3 3D File Explorer with coverflow card decks', id: 'File Explorer 3D WinUI 3 dengan dek kartu coverflow' },
    ],
    stack: ['React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS 4', 'Web Audio API', 'Framer Motion'],
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
    title: 'siGizi — Stunting Early Detection & Child Nutrition',
    category: 'mobile',
    summary: {
      en: 'Android application empowering mothers to prevent stunting using machine learning nutrition insights and child growth tracking.',
      id: 'Aplikasi Android pencegahan stunting balita dengan rekomendasi nutrisi dan prediksi machine learning presisi.',
    },
    description: {
      en: 'Bangkit Academy Capstone Project (Google, GoTo, Traveloka). An Android app addressing Indonesia stunting challenge by delivering nutritional recommendations and edge ML prediction models to calculate risk accurately.',
      id: 'Proyek Capstone Bangkit Academy (Google, GoTo, Traveloka). Aplikasi Android untuk mengatasi stunting di Indonesia dengan rekomendasi nutrisi terbaik dan prediksi machine learning yang presisi dan akurat.',
    },
    readme: {
      en: '## SiGizi — Stunting Prediction & Child Growth Tracking\n\nAn app designed to help analyze and mitigate child stunting in Indonesia with high precision.\n\n### Key Features:\n- **ML Stunting Risk Prediction:** Edge machine learning inference classifying toddler growth metrics (age, gender, height, weight).\n- **Growth Curve & Monitoring:** WHO-standard growth chart tracking child weight and height trajectories over time.\n- **SurveyKit Interactive Questionnaires:** Guided developmental surveys for mothers and healthcare workers.\n- **Nutritional Recipes & Posyandu Forum:** Curated balanced meal recommendations and posyandu consultation.\n\n### Technology Stack:\n- **Kotlin & Android SDK (API 34)**\n- **TensorFlow Lite** for edge machine learning model evaluation\n- **Retrofit & OkHttp** for cloud REST API communication\n- **Material 3 (M3)** design system & Jetpack Navigation',
      id: '## SiGizi — Prediksi Stunting & Tumbuh Kembang Balita\n\nAplikasi Android untuk membantu analisis dan pencegahan masalah stunting pada balita di Indonesia.\n\n### Fitur Utama:\n- **Prediksi Risiko Stunting ML:** Inferensi machine learning presisi berdasarkan metrik umur, jenis kelamin, tinggi badan, dan berat badan.\n- **Grafik Kurva Pertumbuhan:** Pemantauan tumbuh kembang anak berbasis standar antropometri WHO.\n- **Kuesioner Interaktif SurveyKit:** Panduan pengisian data gizi harian yang ramah untuk ibu balita.\n- **Rekomendasi Menu Gizi & Forum:** Edukasi asupan gizi seimbang dan konsultasi kader posyandu.\n\n### Tech Stack:\n- **Kotlin & Android SDK (API 34)**\n- **TensorFlow Lite** untuk evaluasi model Machine Learning\n- **Retrofit & OkHttp** untuk komunikasi REST API\n- **Material 3 (M3)** & Jetpack Navigation Component',
    },
    features: [
      { en: 'Machine learning toddler stunting risk prediction model', id: 'Prediksi risiko stunting balita berbasis model Machine Learning' },
      { en: 'Antropometric WHO child growth curves and monitoring', id: 'Pemantauan grafik pertumbuhan antropometri standar WHO' },
      { en: 'Interactive developmental questionnaires with SurveyKit', id: 'Kuesioner pemantauan tumbuh kembang interaktif via SurveyKit' },
      { en: 'Nutritional recipe guidance and Posyandu consultation forum', id: 'Panduan menu gizi seimbang dan forum konsultasi kader Posyandu' },
    ],
    stack: ['Kotlin', 'Android SDK', 'TensorFlow Lite', 'SurveyKit', 'Retrofit', 'Material 3'],
    role: {
      en: 'Mobile Developer & ML Integration',
      id: 'Mobile Developer & Integrasi ML',
    },
    links: {
      source: 'https://github.com/radositumorang15/SiGizi',
      video: 'https://drive.google.com/file/d/19VCMxRRzYOvxn2cxJc-Eo5bLJDrLaBBW/view?usp=sharing',
    },
    images: [
      '/images/projects/sigizi/Screenshot_20240618_215553.png',
      '/images/projects/sigizi/Screenshot_20240618_215604.png',
      '/images/projects/sigizi/Screenshot_20240618_215628.png',
      '/images/projects/sigizi/Screenshot_20240618_215211.png',
    ],
  },
  {
    slug: 'katoba-learn',
    title: 'Kotoba (言葉) — Japanese Language & SRS Learning',
    category: 'mobile',
    summary: {
      en: 'Mobile app built with Compose Multiplatform (KMP) to learn Japanese from zero with an audio-first approach and pop-culture themes.',
      id: 'Aplikasi mobile berbasis Compose Multiplatform (KMP) untuk belajar bahasa Jepang dari nol dengan pendekatan audio-first dan tema anime.',
    },
    description: {
      en: 'Kotoba (言葉) is an interactive cross-platform Japanese learning app built with Kotlin & Compose Multiplatform 1.7.3. Features structured 4-phase curriculum (12 levels), placement Goal Quiz, Spaced Repetition (SM-2), native audio TTS, and Neon PostgreSQL.',
      id: 'Kotoba (言葉) adalah aplikasi belajar bahasa Jepang cross-platform berbasis Kotlin dan Compose Multiplatform 1.7.3. Dilengkapi kurikulum terstruktur 4 fase (12 level), kuis penempatan level, Spaced Repetition (SM-2), native TTS, dan database Neon PostgreSQL.',
    },
    readme: {
      en: '## Kotoba (言葉) — Japanese Language Learning App\n\nMobile application built with **Compose Multiplatform (KMP)** to learn Japanese from scratch to conversational level with an audio-first approach and anime pop-culture.\n\n### Key Highlights:\n1. **Structured 4-Phase Curriculum (12 Levels):**\n   - Phase A: Kana Foundation (Hiragana Seion, Dakuon, Youon, Sokuon)\n   - Phase B: Vocabulary & Katakana (Iconic Anime Vocab & Basic Katakana)\n   - Phase C: Basic Kanji & Grammar (Particles Wa/O/No, -masu sentence patterns)\n   - Phase D: Conversation & Listening (Self-introduction, Konbini situations)\n2. **Goal Quiz & Onboarding Personalization:** 3-step placement quiz with dynamic level assignment.\n3. **Spaced Repetition System (SRS):** SM-2/Leitner memory retention algorithm with daily review box.\n4. **Furigana Toggle:** Toggle Furigana ruby reading aids on/off across all cards.\n5. **Native Audio TTS:** Android TextToSpeech and iOS AVSpeechSynthesizer via expect/actual.\n6. **Backend & Cloud Database:** Neon Serverless PostgreSQL & Neon Auth API.\n\n### Tech Stack:\n- **Framework:** Compose Multiplatform (JetBrains) 1.7.3 & Kotlin 2.1.0\n- **Target Platform:** Android (SDK 35), Desktop (JVM), iOS\n- **Architecture:** MVC (Model - View - Controller)\n- **Networking & Auth:** Ktor Client & Neon Auth API',
      id: '## Kotoba (言葉) — Aplikasi Belajar Bahasa Jepang\n\nAplikasi mobile berbasis **Compose Multiplatform (KMP)** untuk belajar bahasa Jepang dari nol hingga level percakapan dasar dengan pendekatan *audio-first* dan pop-culture/anime.\n\n### Fitur Utama:\n1. **Kurikulum Terstruktur 4 Fase (12 Level):**\n   - Fase A: Fondasi Kana (Hiragana Seion, Dakuon, Youon & Sokuon)\n   - Fase B: Kosakata & Katakana (Kosakata Ikonik Anime & Katakana Dasar)\n   - Fase C: Kanji Dasar & Tata Bahasa (Partikel Wa/O/No, Kanji Angka/Waktu, Pola Kalimat -masu)\n   - Fase D: Percakapan & Listening (Perkenalan Diri, Situasi Sehari-hari/Konbini, Listening Mandiri)\n2. **Goal Quiz & Onboarding Personalization:** Kuis penempatan 3 langkah dengan penempatan level dinamis.\n3. **Spaced Repetition System (SRS):** Algoritma retensi memori jangka panjang individual per item (SM-2/Leitner).\n4. **Furigana Toggle (ルビ ON/OFF):** Menampilkan atau menyembunyikan bantuan baca Furigana.\n5. **Platform Audio TTS Native:** Android TextToSpeech dan iOS AVSpeechSynthesizer via expect/actual.\n6. **Backend & Database:** Neon Serverless PostgreSQL & Neon Auth API.\n\n### Tech Stack:\n- **Framework:** Compose Multiplatform (JetBrains) 1.7.3 & Kotlin 2.1.0\n- **Target Platform:** Android SDK 35, Desktop (JVM), iOS\n- **Networking:** Ktor Client & Neon Auth API\n- **Database:** Neon Serverless PostgreSQL',
    },
    features: [
      { en: 'Structured 4-Phase (12 Levels) Japanese curriculum from Kana to Conversation', id: 'Kurikulum terstruktur 4 fase (12 level) dari Kana hingga Percakapan' },
      { en: 'Daily Review Box with SM-2 Spaced Repetition System (SRS)', id: 'Kotak Ulangan Harian dengan Spaced Repetition System (SM-2 SRS)' },
      { en: 'Interactive Furigana (ルビ) visibility toggle across Kanji cards', id: 'Toggle bantuan baca Furigana (ルビ ON/OFF) di setiap kartu Kanji' },
      { en: 'Platform Native Audio TTS Engine on Android & iOS', id: 'Audio TTS Engine native di Android dan iOS via expect/actual' },
      { en: 'Cloud progress synchronization with Neon Serverless PostgreSQL', id: 'Sinkronisasi progres belajar cloud di Neon Serverless PostgreSQL' },
    ],
    stack: ['Kotlin', 'Compose Multiplatform', 'Ktor Client', 'PostgreSQL Neon', 'Android SDK'],
    role: {
      en: 'Mobile Developer (Kotlin Multiplatform & KMP)',
      id: 'Mobile Developer (Kotlin Multiplatform & KMP)',
    },
    links: {
      source: 'https://github.com/radositumorang15/katoba_learn',
    },
    images: [
      '/images/projects/kotoba/katoba1.png',
      '/images/projects/kotoba/katoba2.png',
    ],
  },
  {
    slug: 'bandarismapp',
    title: 'Bandarism — Smart Money & Institutional Flow Tracker',
    category: 'mobile',
    summary: {
      en: 'Real-time Indonesian (IDX) & US stock analytics powered by Wyckoff accumulation and Finora AI.',
      id: 'Aplikasi analisis bandarmologi IHSG & US stocks dengan deteksi akumulasi Wyckoff dan Finora AI.',
    },
    description: {
      en: 'Cross-platform financial technology mobile application tracking institutional broker flows, foreign buy/sell streaks, and Wyckoff price-action phases. Integrates Finora AI Market Advisor for instant confluence scoring.',
      id: 'Aplikasi mobile fintech berbasis Flutter untuk melacak aliran broker institusi (smart money), foreign flow harian, dan fase akumulasi Wyckoff, dilengkapi Finora AI Market Advisor.',
    },
    readme: {
      en: '## Bandarism — Smart Money & Wyckoff Stock Tracker\n\nFintech mobile application to analyze institutional broker fund flows in the Indonesia Stock Exchange (IDX) and US Equities.\n\n### Key Features:\n- **Broker Flow & Foreign Streak Tracker:** Tracks top institutional brokers (ZP, AK, CC, CS) and multi-day accumulation trends.\n- **Wyckoff Accumulation Screener:** Algorithmic identification of Phase C Springs, secondary tests, and volume dry-ups.\n- **Finora AI Market Advisor:** LLM confluence scoring comparing volume profiles against market structure.\n- **Interactive Financial Visualizations:** Candlestick charts and volume pulse powered by fl_chart.\n\n### Tech Stack:\n- **Flutter & Dart SDK**\n- **State Management:** Flutter Riverpod 2.5\n- **Database:** Supabase & PostgreSQL',
      id: '## Bandarism — Pelacak Smart Money & Akumulasi Wyckoff\n\nAplikasi fintech mobile untuk menganalisis arus dana broker institusional di Bursa Efek Indonesia (IDX) dan bursa AS (US Equities).\n\n### Fitur Utama:\n- **Pelacak Aliran Broker Institusi:** Memantau foreign flow harian dan akumulasi broker utama (ZP, AK, CC, CS).\n- **Screener Akumulasi Wyckoff:** Deteksi otomatis fase akumulasi Wyckoff (Phase C Spring, Absorption, Re-akumulasi).\n- **Finora AI Market Advisor:** Asisten AI untuk scoring confluence dan evaluasi sentimen pasar saham.\n- **Visualisasi Pasar Finansial:** Grafik candlestick dan volume interaktif dengan fl_chart.\n\n### Tech Stack:\n- **Flutter & Dart SDK**\n- **State Management:** Flutter Riverpod 2.5\n- **Database & Auth:** Supabase & PostgreSQL\n- **Charts:** fl_chart',
    },
    features: [
      { en: 'Real-time institutional broker flow tracking & foreign buy/sell streaks', id: 'Pelacak aliran broker institusi real-time & foreign accumulation streak' },
      { en: 'Algorithmic Wyckoff accumulation phase screener (Phase C Spring)', id: 'Screener otomatis fase akumulasi Wyckoff (Phase C Spring)' },
      { en: 'Finora AI Market Advisor confluence scoring and sentiment alerts', id: 'Scoring confluence dan notifikasi sentimen via Finora AI' },
      { en: 'Interactive candlestick and volume profile charts via fl_chart', id: 'Grafik candlestick dan profil volume interaktif via fl_chart' },
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'Supabase', 'PostgreSQL', 'fl_chart'],
    role: {
      en: 'Full Stack Mobile Developer',
      id: 'Full Stack Mobile Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15/bandarismapp',
    },
    images: [
      '/images/projects/bandarism/bandarism1.png',
      '/images/projects/bandarism/bandarism2.png',
    ],
  },
  {
    slug: 'mariban-customer',
    title: 'Mariban Customer — Automotive & Workshop Portal',
    category: 'mobile',
    summary: {
      en: 'Customer workshop booking app with tire size catalog, 3D spooring, and service queue reservations.',
      id: 'Aplikasi portal pelanggan bengkel modern CV Mariban untuk booking spooring 3D, balancing, dan katalog ban mobil.',
    },
    description: {
      en: 'Customer-facing mobile portal for CV Mariban Indonesia. Features Hunter Hawkeye 3D spooring reservations, computerized balancing, tire size lookup by car model, and direct WhatsApp customer care.',
      id: 'Portal layanan pelanggan CV Mariban Indonesia. Menyediakan reservasi spooring 3D, balancing komputer, pencarian ukuran ban berdasarkan merk mobil, dan customer care terintegrasi.',
    },
    readme: {
      en: '## CV Mariban Customer Portal App\n\nOfficial customer mobile portal for CV Mariban Indonesia automotive workshop.\n\n### Key Features:\n- **Hunter Hawkeye 3D Spooring Booking:** Easy reservation system for precision 4-wheel alignment with warranty.\n- **Computerized Wheel Balancing:** Eliminates steering vibration with computerized wheel balancing booking.\n- **Tire Catalog & Compatibility:** Search tires by car brand and rim specifications (Bridgestone, Dunlop, GT Radial).\n- **WhatsApp Customer Support:** Direct connection to customer support for consultation and estimate requests.',
      id: '## Aplikasi Portal Pelanggan CV Mariban Indonesia\n\nAplikasi mobile resmi pelanggan bengkel mobil CV Mariban Indonesia.\n\n### Fitur Utama:\n- **Reservasi Spooring 3D Hunter Hawkeye:** Pemesanan jadwal spooring presisi 4 roda bergaransi.\n- **Balancing Roda Komputer:** Booking balancing timah presisi untuk kenyamanan berkendara.\n- **Katalog Ukuran Ban & Mobil:** Pencarian ukuran ban mobil berdasarkan tipe kendaraan (Bridgestone, Dunlop, GT Radial).\n- **Integrasi WhatsApp CS:** Kontak langsung customer care untuk estimasi servis dan konsultasi.',
    },
    features: [
      { en: 'Hunter Hawkeye 3D spooring alignment online reservation', id: 'Reservasi online spooring 3D Hunter Hawkeye bergaransi' },
      { en: 'Computerized wheel balancing service booking', id: 'Pemesanan jadwal balancing roda komputer presisi' },
      { en: 'Tire catalog lookup filtered by vehicle brand and size', id: 'Pencarian katalog ban terfilter berdasarkan merk & tipe mobil' },
      { en: 'Direct WhatsApp customer care chat integration', id: 'Integrasi chat langsung WhatsApp customer care' },
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'gRPC', 'OpenCV', 'SVG'],
    role: {
      en: 'Mobile Application Developer',
      id: 'Mobile Application Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15',
    },
    images: [
      '/images/projects/maribancustomer/maribancust1.jpg',
      '/images/projects/maribancustomer/maribancust2.jpg',
    ],
  },
  {
    slug: 'mariban-app',
    title: 'Mariban App — Workshop Operations & POS Management',
    category: 'mobile',
    summary: {
      en: 'Internal workshop operations app for mechanics attendance, pit queues, tire inventory, and daily POS.',
      id: 'Aplikasi internal manajemen bengkel CV Mariban: antrean pit servis, suku cadang, dan kasir POS harian.',
    },
    description: {
      en: 'Internal operations management application for CV Mariban workshop. Manages daily vehicle queues across service pits, mechanic task assignments, tire stock inventory, and point-of-sale cashier reports.',
      id: 'Aplikasi internal manajemen operasional bengkel mobil CV Mariban. Mengelola alur pit servis harian, penugasan teknisi/mekanik, inventaris ban, dan pembukuan kasir POS.',
    },
    readme: {
      en: '## Mariban App — Workshop Operations & POS Management\n\nInternal enterprise mobile application designed for CV Mariban automotive workshop staff and management.\n\n### Key Modules:\n- **Service Pit Queue Dispatcher:** Live tracking of vehicles in service pits (Spooring, Balancing, Tire Replacement).\n- **Mechanic Work Orders:** Assignment and completion logs for workshop technicians.\n- **Inventory & Spare Parts Management:** Real-time inventory tracking for tire stocks and accessories.\n- **Point of Sale (POS):** Daily cashier checkout, billing, and financial summaries.',
      id: '## Mariban App — Manajemen Operasional Bengkel & Kasir POS\n\nAplikasi mobile internal untuk staf dan manajemen bengkel CV Mariban Indonesia.\n\n### Modul Utama:\n- **Dispatcher Antrean Pit Servis:** Pemantauan real-time status kendaraan di pit servis (Spooring, Balancing, Ganti Ban).\n- **Penugasan Pekerjaan Teknisi:** Riwayat dan checklist tugas mekanik bengkel.\n- **Manajemen Stok Ban & Suku Cadang:** Pelacakan inventaris stok ban dan oli secara real-time.\n- **Kasir Point-of-Sale (POS):** Transaksi kasir, cetak invoice, dan rekapitulasi penjualan harian.',
    },
    features: [
      { en: 'Live service pit status dispatcher (Spooring, Balancing, Replacement)', id: 'Monitoring status kendaraan di pit servis real-time' },
      { en: 'Technician work order assignment and progress logs', id: 'Penugasan dan checklist pengerjaan mekanik bengkel' },
      { en: 'Real-time tire inventory and parts stock management', id: 'Manajemen stok ban mobil dan suku cadang real-time' },
      { en: 'Point of Sale (POS) cashier checkout & daily reports', id: 'Kasir Point of Sale (POS) dan laporan keuangan harian' },
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'SQLite', 'REST API'],
    role: {
      en: 'Mobile Application Developer',
      id: 'Mobile Application Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15',
    },
    images: [
      '/images/projects/mariban/mariban.jpg',
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
    readme: {
      en: '## YoraJobs (Bantu Job) — Recruitment Pipeline & Tracker\n\nSmart job search and recruitment pipeline tracker designed to organize job applications with clarity.\n\n### Key Features:\n- **Figma Design Prototype:** Modern UI/UX based on the official Bantu design system.\n- **Pipeline Status Filter:** Organizes applications into distinct stages (Belum Dilamar, Sudah Melamar, Interview, Offering, Ditolak).\n- **MockAPI REST Integration:** Comprehensive endpoints for fetching, adding, updating, and filtering job listings.\n- **Interview Schedule Reminders:** Timely alerts and notes for upcoming HR & technical interviews.\n- **Salary Calculation Insights:** Compares base pay, health insurance, and annual bonuses.',
      id: '## YoraJobs (Bantu Job) — Pelacak Lamaran & Pipeline Rekrutmen\n\nAplikasi pelacak proses rekrutmen dan lamaran kerja berbasis Flutter dan Riverpod.\n\n### Fitur Utama:\n- **Prototipe Desain Figma:** Dirancang dengan UI/UX modern berbasis desain Figma Bantu resmi.\n- **Filter Status Pipeline:** Mengorganisir lamaran ke dalam status jelas (Belum Dilamar, Sudah Melamar, Interview, Offering, Ditolak).\n- **Integrasi REST API MockAPI:** Mengambil data lowongan, menambah lamaran, serta memperbarui status via REST API.\n- **Pengingat Jadwal Wawancara:** Notifikasi deadline dan jadwal interview teknis/HR.\n- **Kalkulator & Analisis Gaji:** Pembanding gaji pokok, benefit, dan asuransi antar lowongan kerja.',
    },
    features: [
      { en: 'Recruitment pipeline stage organization (Applied, Interview, Offering)', id: 'Pengelompokan status lamaran (Belum Dilamar, Interview, Offering)' },
      { en: 'Official Bantu Figma design prototype integration', id: 'Desain antarmuka modern berbasis prototipe Figma Bantu' },
      { en: 'MockAPI REST endpoint job search & filter', id: 'Pencarian lowongan kerja via REST API dan MockAPI' },
      { en: 'Interview alert reminders and preparation notes', id: 'Pengingat jadwal interview dan catatan persiapan tes' },
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'Freezed', 'Supabase', 'GoRouter'],
    role: {
      en: 'Mobile App Developer',
      id: 'Mobile App Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15/bantu-job',
    },
    images: ['/images/projects/yorajobs/yorajobs.png'],
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
    readme: {
      en: '## SmileShop — Mobile E-Commerce Application\n\nCross-platform mobile commerce shopping application built with Flutter and Firebase.\n\n### Key Highlights:\n- **Product Catalog:** Fetches items from FakeStore REST API with category filtering.\n- **Shopping Cart & Checkout:** Real-time Cloud Firestore cart management with quantities and totals calculation.\n- **Firebase Auth:** Secure customer login and registration flow.',
      id: '## SmileShop — Aplikasi E-Commerce Mobile\n\nAplikasi belanja e-commerce mobile cross-platform berbasis Flutter dan Firebase.\n\n### Fitur Utama:\n- **Katalog Produk:** Mengambil produk dari FakeStore REST API dengan filter kategori.\n- **Keranjang Belanja Real-time:** Sinkronisasi keranjang Cloud Firestore dengan hitung kuantitas & total otomatis.\n- **Autentikasi Firebase:** Alur login dan registrasi pelanggan aman.',
    },
    features: [
      { en: 'Product catalog exploration via FakeStore API', id: 'Eksplorasi katalog produk via FakeStore REST API' },
      { en: 'Real-time cart synchronization with Cloud Firestore', id: 'Sinkronisasi keranjang belanja real-time Cloud Firestore' },
      { en: 'Firebase Authentication secure login & registration', id: 'Login dan registrasi akun aman dengan Firebase Auth' },
    ],
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'REST API'],
    role: {
      en: 'Mobile Developer',
      id: 'Mobile Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15/smileshop',
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
    readme: {
      en: '## Monggosare — Hotel Booking Portal\n\nInteractive hotel reservation web application providing room browsing, date selection, and online booking workflows.\n\n### Key Highlights:\n- **Room Catalog:** Interactive listing of executive, deluxe, and standard suites.\n- **Reservation Form:** Validated booking system with date range checking.\n- **Responsive UI:** Clean Bootstrap 5 layouts adapted for mobile and desktop.',
      id: '## Monggosare — Website Reservasi Hotel\n\nAplikasi web pemesanan kamar hotel interaktif dengan fitur penelusuran kamar, pemilihan tanggal menginap, dan alur booking online.\n\n### Fitur Utama:\n- **Katalog Kamar:** Informasi kamar tipe executive, deluxe, dan standar.\n- **Formulir Reservasi:** Sistem validasi tanggal menginap dan kuota kamar.\n- **Antarmuka Responsif:** Tata letak bersih Bootstrap 5 yang nyaman diakses dari ponsel dan desktop.',
    },
    features: [
      { en: 'Interactive room tier selection and amenity specifications', id: 'Pemilihan tipe kamar dan spesifikasi fasilitas interaktif' },
      { en: 'Online booking validation form with check-in/out dates', id: 'Formulir reservasi online dengan validasi tanggal check-in/out' },
      { en: 'Responsive web layout built with Bootstrap 5', id: 'Desain web responsif dengan Bootstrap 5' },
    ],
    stack: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5', 'MySQL'],
    role: {
      en: 'Frontend Developer',
      id: 'Frontend Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15/Monggosare',
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
    readme: {
      en: '## Titik Makan — Restaurant Dining & Table Booking\n\nModern restaurant showcase and dining table reservation website.\n\n### Key Highlights:\n- **Culinary Menu Explorer:** Appetizers, main courses, desserts, and chef specials.\n- **Table Reservation:** Easy booking workflow for family dinners and corporate events.\n- **Visual Showcase:** High-resolution gallery displaying interior ambiance and dish presentations.',
      id: '## Titik Makan — Promosi Kuliner & Reservasi Meja Makan\n\nWebsite etalase restoran modern dan pemesanan meja makan online.\n\n### Fitur Utama:\n- **Eksplorasi Menu Kuliner:** Daftar menu hidangan pembuka, hidangan utama, hidangan penutup, dan menu spesial koki.\n- **Reservasi Meja Makan:** Alur pemesanan meja yang mudah untuk santap keluarga dan acara kantor.\n- **Galeri Visual:** Tampilan galeri foto suasana restoran dan sajian makanan.',
    },
    features: [
      { en: 'Interactive restaurant culinary menu showcase', id: 'Tampilan etalase menu makanan dan minuman interaktif' },
      { en: 'Online table reservation request workflow', id: 'Alur formulir pemesanan meja makan online' },
      { en: 'Modern responsive web presentation', id: 'Tampilan web modern yang responsif' },
    ],
    stack: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5'],
    role: {
      en: 'Frontend Developer',
      id: 'Frontend Developer',
    },
    links: {
      source: 'https://github.com/radositumorang15/titikmakann',
    },
    images: ['/images/projects/titik-makan.png'],
  },
];
