'use client';

import React, { useState, useEffect, useRef } from 'react';
import { playWindowsSound } from '../../lib/audio';
import { notch } from '../../os/notch';
import './androidstudio.css';

interface ProjectData {
  id: string;
  name: string;
  lang: string;
  a: [string, string];
  mono: string;
  tree: [number, string, string?][];
  f: Record<string, [string, string]>;
  log: string[];
  ui: {
    nav: string[];
    s: {
      h?: [string, string];
      b?: any[];
    }[];
  };
}

const PROJECTS: ProjectData[] = [
  /* -------------------------------------------------------------
     1. siGizi — Stunting Early Detection & Child Growth Tracking
     ------------------------------------------------------------- */
  {
    id: 'sigizi',
    name: 'siGizi',
    lang: 'Kotlin',
    a: ['#16a37f', '#0e7a8a'],
    mono: 'SG',
    tree: [
      [0, 'siGizi'],
      [1, 'app'],
      [2, 'java/com/example/sigizi/view'],
      [3, 'MainActivity.kt', 'm'],
      [3, 'HomeFragment.kt', 'h'],
      [2, 'res/layout'],
      [3, 'activity_main.xml', 'x'],
      [2, 'build.gradle.kts', 'g'],
      [1, 'README.md', 'r'],
    ],
    f: {
      m: [
        'MainActivity.kt',
        `package com.example.sigizi.view.main

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupWithNavController
import com.example.sigizi.R
import com.example.sigizi.data.network.ApiConfig
import com.example.sigizi.data.network.ApiService
import com.example.sigizi.databinding.ActivityMainBinding
import com.example.sigizi.di.ViewModelFactory
import com.example.sigizi.view.welcome.WelcomeActivity
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {

    private val viewModel: MainViewModel by viewModels {
        ViewModelFactory(this)
    }

    private lateinit var binding: ActivityMainBinding
    private lateinit var apiService: ApiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_home,
                R.id.navigation_dashboard,
                R.id.navigation_notifications,
                R.id.navigation_profile
            )
        )
        navView.setupWithNavController(navController)

        viewModel.getSession().observe(this) { user ->
            Log.e("MainActivity", "user: $user")
            if (!user.isLoggedIn) {
                startActivity(Intent(this@MainActivity, WelcomeActivity::class.java))
                finish()
            }
        }
        apiService = ApiConfig.getApiService(this)
    }
}`,
      ],
      h: [
        'HomeFragment.kt',
        `package com.example.sigizi.view.home

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.example.sigizi.databinding.FragmentHomeBinding
import com.example.sigizi.di.ViewModelFactory
import com.example.sigizi.view.artikel.DetailArtikelActivity
import com.example.sigizi.view.history.HistoryActivity
import com.example.sigizi.view.konsultasi.ActivityKonsultasi
import com.example.sigizi.view.nutrisi.NutrisiActivity

class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    private val viewModel: HomeViewModel by viewModels {
        ViewModelFactory(requireContext())
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel.loadUserSession()
    }
}`,
      ],
      x: [
        'activity_main.xml',
        `<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <fragment
        android:id="@+id/nav_host_fragment_activity_main"
        android:name="androidx.navigation.fragment.NavHostFragment"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        app:defaultNavHost="true"
        app:layout_constraintBottom_toTopOf="@id/nav_view"
        app:layout_constraintTop_toTopOf="parent" />

    <com.google.android.material.bottomnavigation.BottomNavigationView
        android:id="@+id/nav_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        app:layout_constraintBottom_toBottomOf="parent"
        app:menu="@menu/bottom_nav_menu" />
</androidx.constraintlayout.widget.ConstraintLayout>`,
      ],
      g: [
        'build.gradle.kts',
        `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.example.sigizi"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.sigizi"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("com.google.android.material:material:1.11.0")
    implementation("org.tensorflow:tensorflow-lite:2.14.0")
}`,
      ],
      r: [
        'README.md',
        `# siGizi — Stunting Early Detection & Child Growth Tracking
Bangkit Academy Capstone Project (Google, GoTo, Traveloka).
Aplikasi Android berbasis Machine Learning untuk membantu ibu memantau gizi dan mendeteksi dini risiko stunting pada balita.

- Tech Stack: Kotlin, Jetpack Lifecycle, Retrofit, TensorFlow Lite
- Role: Mobile Developer & ML Integration
- GitHub: https://github.com/radositumorang15/SiGizi`,
      ],
    },
    log: [
      '> Task :app:compileDebugKotlin',
      '> Task :app:mergeDebugResources',
      '> Task :app:packageDebug',
      '> Task :app:installDebug',
      "Installing APK 'app-debug.apk' on 'Pixel_8_API_34'...",
      "Launching 'com.example.sigizi.MainActivity' on Pixel 8 API 34.",
    ],
    ui: {
      nav: ['Beranda', 'Nutrisi', 'Edukasi'],
      s: [],
    },
  },

  /* -------------------------------------------------------------
     2. Bandarism — Smart Money & Institutional Flow Tracker
     ------------------------------------------------------------- */
  {
    id: 'bandarism',
    name: 'Bandarism',
    lang: 'Flutter',
    a: ['#10b981', '#06b6d4'],
    mono: 'BD',
    tree: [
      [0, 'bandarismapp'],
      [1, 'lib'],
      [2, 'main.dart', 'm'],
      [2, 'features/home/views'],
      [3, 'home_screen.dart', 'h'],
      [1, 'pubspec.yaml', 'p'],
      [1, 'README.md', 'r'],
    ],
    f: {
      m: [
        'main.dart',
        `import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'core/config/supabase_config.dart';
import 'core/navigation/app_router.dart';
import 'core/services/heroku_db_service.dart';
import 'core/theme/app_theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Initialize Indonesian locale for date/number formatting
  await initializeDateFormatting('id_ID', null);

  // Init Supabase untuk Auth & Watchlist
  await Supabase.initialize(
    url: SupabaseConfig.url,
    publishableKey: SupabaseConfig.anonKey,
    debug: kDebugMode,
  );

  // Init PostgreSQL database untuk data saham IDX
  await HerokuDbService.initialize();

  runApp(
    const ProviderScope(
      child: BandarismApp(),
    ),
  );
}

class BandarismApp extends ConsumerWidget {
  const BandarismApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);
    return MaterialApp.router(
      title: 'Bandarism',
      theme: AppTheme.darkTheme,
      routerConfig: router,
    );
  }
}`,
      ],
      h: [
        'home_screen.dart',
        `import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/cards/finora_ai_banner.dart';
import '../providers/market_pulse_provider.dart';
import '../providers/market_switcher_provider.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isUsMarket = ref.watch(marketSwitcherProvider);

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            // 1. Finora Header: "Welcome back!" & Switcher
            SliverToBoxAdapter(
              child: FinoraHeader(isUsMarket: isUsMarket),
            ),
            // 2. Finora Hero E-Wallet Balance Card
            SliverToBoxAdapter(
              child: FinoraHeroBalanceCard(isUsMarket: isUsMarket),
            ),
            // 3. Finora AI Insights Luminous Banner
            SliverToBoxAdapter(
              child: FinoraAiBanner(
                title: 'AI Insights',
                subtitle: isUsMarket
                    ? 'Evaluate Wall Street Confluence & Insider Flow'
                    : 'Evaluate Smart Money Flow & Confluence',
              ),
            ),
            // 4. Quick Actions Bento Row
            const SliverToBoxAdapter(child: FinoraQuickActionsRow()),
            // 5. Active Signals & Wyckoff Accumulation List
            const SliverToBoxAdapter(child: TransactionsWatchlistSection()),
          ],
        ),
      ),
    );
  }
}`,
      ],
      p: [
        'pubspec.yaml',
        `name: bandarismapp
description: "Smart Money & Institutional Stock Tracker for IDX & US Markets."
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1
  fl_chart: ^0.68.0
  supabase_flutter: ^2.5.0
  go_router: ^14.0.0`,
      ],
      r: [
        'README.md',
        `# Bandarism — Smart Money & Wyckoff Stock Tracker
Aplikasi fintech untuk menganalisis arus dana broker institusional di Bursa Efek Indonesia (IDX) dan bursa AS (US Equities).
Dilengkapi integrasi Finora AI Market Advisor untuk scoring confluence dan sinyal akumulasi volume pintar.`,
      ],
    },
    log: [
      "Running 'flutter pub get'...",
      'Resolving dependencies... (1.2s)',
      "Running Gradle task 'assembleDebug'...",
      '✓ Built build/app/outputs/flutter-apk/app-debug.apk',
      'Installing and launching on Pixel 8 API 34...',
    ],
    ui: {
      nav: ['Market', 'Screener', 'Watchlist'],
      s: [
        {
          h: ['IHSG 7.243,82 (+0.84%)', 'Bandarism Market Pulse'],
          b: [
            ['card', 'BBCA · Bank Central Asia', 'Net Buy Foreign Rp420 Miliar · Phase C Spring', 'Big Acc'],
            ['card', 'BREN · Barito Renewables', 'Smart Money Confluence Volume Spike', 'Smart Buy'],
            ['chart', 'Aktivitas Broker Institusi (ZP, AK, CC, CS)', [35, 52, 78, 62, 92, 86]],
            ['card', 'Finora AI Market Advisor', 'Bullish divergence terdeteksi pada saham perbankan'],
            ['btn', 'Buka Screener Wyckoff'],
          ],
        },
        {
          h: ['Deteksi Cerdas', 'Screener Akumulasi'],
          b: [
            ['card', 'BMRI · Bank Mandiri', 'Fase Re-akumulasi · Target Rp7.200', 'Normal Acc'],
            ['card', 'TLKM · Telkom Indonesia', 'Volume rebound di support kuat Rp2.850', 'Small Acc'],
            ['btn', 'Scan Ulang Pasar IDX'],
          ],
        },
        {
          h: ['Tersimpan', 'Watchlist Saham Pilihan'],
          b: [
            ['line', 'BBCA (Bank Central Asia)', 'Rp10.150 (+1.25%)'],
            ['line', 'BREN (Barito Renewables)', 'Rp6.800 (+4.62%)'],
            ['line', 'BMRI (Bank Mandiri)', 'Rp6.750 (-0.74%)'],
            ['line', 'TLKM (Telkom)', 'Rp2.890 (+0.35%)'],
          ],
        },
      ],
    },
  },

  /* -------------------------------------------------------------
     3. Mariban Customer — Automotive & Workshop Portal
     ------------------------------------------------------------- */
  {
    id: 'mariban',
    name: 'Mariban Customer',
    lang: 'Flutter',
    a: ['#d97706', '#dc2626'],
    mono: 'MB',
    tree: [
      [0, 'flutter-mariban-customer'],
      [1, 'lib'],
      [2, 'main.dart', 'm'],
      [2, 'features/pelangganlanding/views'],
      [3, 'landing_page_view.dart', 'l'],
      [2, 'features/home/views'],
      [3, 'home_view.dart', 'h'],
      [1, 'pubspec.yaml', 'p'],
      [1, 'README.md', 'r'],
    ],
    f: {
      m: [
        'main.dart',
        `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/home/views/home_view.dart';
import 'features/pelangganlanding/views/landing_page_view.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: MaribanCustomerApp(),
    ),
  );
}

class MaribanCustomerApp extends StatelessWidget {
  const MaribanCustomerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mariban Customer',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF141417),
      ),
      home: const LandingPageView(),
    );
  }
}`,
      ],
      l: [
        'landing_page_view.dart',
        `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../widgets/mariban_hero_section.dart';
import '../widgets/mariban_service_section.dart';
import '../widgets/mariban_search_section.dart';

class LandingPageView extends ConsumerStatefulWidget {
  const LandingPageView({super.key});

  @override
  ConsumerState<LandingPageView> createState() => _LandingPageViewState();
}

class _LandingPageViewState extends ConsumerState<LandingPageView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF141417),
      appBar: AppBar(
        backgroundColor: const Color(0xFF141417),
        centerTitle: true,
        title: Image.asset('assets/images/logo.png', height: 26),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: const [
            MaribanHeroSection(), // Spooring 3D & Balancing
            MaribanSearchSection(), // Cari Ukuran Ban & Mobil
            MaribanServiceSection(), // Layanan Bengkel Hunter
          ],
        ),
      ),
    );
  }
}`,
      ],
      h: [
        'home_view.dart',
        `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../widgets/attendance/home_attendance_summary.dart';
import '../widgets/bos/home_bos_quick_actions.dart';
import '../widgets/penjualan/home_penjualan_bos_summaries_section.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Dashboard Operasional Bengkel CV Mariban'),
      ),
    );
  }
}`,
      ],
      p: [
        'pubspec.yaml',
        `name: flutter_mariban
description: "Customer & workshop operation app for CV Mariban Indonesia."
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1
  flutter_svg: ^2.0.10
  grpc: ^3.2.4`,
      ],
      r: [
        'README.md',
        `# CV Mariban Indonesia — Customer & Workshop Portal
Aplikasi portal pelanggan bengkel mobil CV Mariban.
Fitur utama: booking antrean spooring 3D Hunter Hawkeye Elite, balancing komputer, katalog ukuran ban mobil, dan WhatsApp CS care.`,
      ],
    },
    log: [
      "Running 'flutter pub get'...",
      "Running Gradle task 'assembleDebug'...",
      '✓ Built app-debug.apk',
      'Installing app.apk on Pixel 8...',
    ],
    ui: {
      nav: ['Beranda', 'Layanan', 'Cabang'],
      s: [
        {
          h: ['CV Mariban Indonesia', 'Bengkel Ban & Spooring 3D'],
          b: [
            ['card', 'Spooring 3D Hunter Hawkeye', 'Kalibrasi presisi 4 roda dengan kamera 3D bergaransi', 'Hunter Elite'],
            ['card', 'Balancing Komputer', 'Hilangkan getaran kemudi pada kecepatan tinggi', 'Presisi'],
            ['card', 'Katalog Ban Mobil', 'Bridgestone, Dunlop, GT Radial diskon s/d 25%', 'Promo'],
            ['line', 'Cabang Semarang', 'Buka 08:00 - 17:00'],
            ['btn', 'Booking Antrean Servis'],
          ],
        },
        {
          h: ['Spesialis Kaki-kaki', 'Layanan Bengkel'],
          b: [
            ['card', 'Spooring 3D Bergaransi', 'Penyetelan camber, caster, toe sudut roda', 'Rp150.000'],
            ['card', 'Balancing Roda', 'Balancing timah presisi per ban', 'Rp35.000'],
            ['card', 'Isi Nitrogen Murni', 'Tekanan stabil, ban lebih awet dan empuk', 'Rp10.000'],
          ],
        },
        {
          h: ['Lokasi Bengkel', 'Cabang Mariban'],
          b: [
            ['card', 'Cabang Semarang Barat', 'Jl. Pamularsih No. 45 · Telp (024) 7601234'],
            ['card', 'Cabang Salatiga', 'Jl. Jend. Sudirman No. 88 · Telp (0298) 321456'],
            ['btn', 'Hubungi WhatsApp CS'],
          ],
        },
      ],
    },
  },

  /* -------------------------------------------------------------
     4. YoraJobs — Smart Job Application Tracker & Reminder
     ------------------------------------------------------------- */
  {
    id: 'yorajobs',
    name: 'YoraJobs',
    lang: 'Flutter',
    a: ['#4f46e5', '#6366f1'],
    mono: 'YJ',
    tree: [
      [0, 'yorajobs'],
      [1, 'lib'],
      [2, 'main.dart', 'm'],
      [2, 'features/jobs/presentation/screens'],
      [3, 'home_feed_screen.dart', 'h'],
      [1, 'pubspec.yaml', 'p'],
      [1, 'README.md', 'r'],
    ],
    f: {
      m: [
        'main.dart',
        `import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'core/constants/app_constants.dart';
import 'core/di/injection.dart';
import 'core/services/notification_service.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  
  await Supabase.initialize(
    url: AppConstants.supabaseUrl,
    anonKey: AppConstants.supabaseAnonKey,
  );

  await NotificationService().init();
  configureDependencies();

  runApp(
    const ProviderScope(
      child: JobTrackrApp(),
    ),
  );
}`,
      ],
      h: [
        'home_feed_screen.dart',
        `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/theme/app_colors.dart';
import '../providers/job_list_provider.dart';

enum JobFilter { semua, belumDilamar, sudahMelamar, dapatInterview, dapatPenawaran, ditolak }

class HomeFeedScreen extends ConsumerWidget {
  const HomeFeedScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('YoraJobs Tracker'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: const [
          SearchBarWidget(),
          FilterChipsRow(), // Semua, Belum Dilamar, Interview, Offering
          Expanded(child: JobListView()),
        ],
      ),
    );
  }
}`,
      ],
      p: [
        'pubspec.yaml',
        `name: yorajobs
description: "Smart job application tracker and interview reminders."
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1
  go_router: ^14.0.0
  supabase_flutter: ^2.5.0`,
      ],
      r: [
        'README.md',
        `# YoraJobs — Smart Job Application Tracker
Aplikasi pelacak proses rekrutmen kerja dengan filter status (Interview, Offering, Sudah Melamar), kalkulator gaji, dan notifikasi deadline wawancara.`,
      ],
    },
    log: [
      "Running 'flutter pub get'...",
      "Running Gradle task 'assembleDebug'...",
      '✓ Built app-debug.apk',
      'Syncing files to Pixel 8 API 34...',
    ],
    ui: {
      nav: ['Semua', 'Interview', 'Offering'],
      s: [
        {
          h: ['12 Lamaran Aktif', 'YoraJobs Tracker'],
          b: [
            ['card', 'Gojek · Mobile Developer (Flutter)', 'Rp14jt - Rp18jt / bln · Deadline 3 hari lagi', 'Offering'],
            ['card', 'Traveloka · Senior Android Engineer', 'Rp16jt - Rp22jt / bln · Jadwal: Besok 14:00', 'Interview'],
            ['card', 'Tokopedia · Frontend React', 'Rp11jt - Rp15jt / bln · Diajukan 2 hari lalu', 'Sudah Melamar'],
            ['card', 'Blibli · Junior Mobile Dev', 'Rp8jt - Rp11jt / bln · Disimpan', 'Belum Dilamar'],
            ['btn', '+ Tambah Lamaran Pekerjaan'],
          ],
        },
        {
          h: ['Tahap Wawancara', 'Jadwal Interview'],
          b: [
            ['card', 'Traveloka · User & Tech Interview', 'Kamis, 30 Okt 2026 pukul 14:00 WIB via Google Meet', 'Interview'],
            ['card', 'Persiapan Interview', 'Review arsitektur BLoC, Riverpod, dan Clean Architecture', 'Catatan'],
          ],
        },
        {
          h: ['Penawaran Kontrak', 'Offering Kerja'],
          b: [
            ['card', 'Gojek Indonesia · Flutter Dev', 'Gaji pokok + asuransi + bonus tahunan', 'Offering'],
            ['line', 'Batas Konfirmasi', '2 November 2026'],
            ['btn', 'Terima Penawaran Kerja'],
          ],
        },
      ],
    },
  },

  /* -------------------------------------------------------------
     5. Kotoba Learn — Japanese JLPT Vocabulary & Flashcards
     ------------------------------------------------------------- */
  {
    id: 'kotoba',
    name: 'Kotoba Learn',
    lang: 'Flutter',
    a: ['#ec4899', '#7c3aed'],
    mono: 'KL',
    tree: [
      [0, 'kotoba_learn'],
      [1, 'lib'],
      [2, 'main.dart', 'm'],
      [2, 'presentation/screens'],
      [3, 'flashcard_screen.dart', 'h'],
      [1, 'pubspec.yaml', 'p'],
      [1, 'README.md', 'r'],
    ],
    f: {
      m: [
        'main.dart',
        `import 'package:flutter/material.dart';
import 'presentation/screens/flashcard_screen.dart';

void main() => runApp(const KotobaLearnApp());

class KotobaLearnApp extends StatelessWidget {
  const KotobaLearnApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Kotoba Learn',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF7C3AED)),
      ),
      home: const FlashcardScreen(),
    );
  }
}`,
      ],
      h: [
        'flashcard_screen.dart',
        `import 'package:flutter/material.dart';

class FlashcardScreen extends StatefulWidget {
  const FlashcardScreen({super.key});

  @override
  State<FlashcardScreen> createState() => _FlashcardScreenState();
}

class _FlashcardScreenState extends State<FlashcardScreen> {
  bool _isFlipped = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Kotoba Learn — JLPT N5'),
      ),
      body: Center(
        child: GestureDetector(
          onTap: () => setState(() => _isFlipped = !_isFlipped),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            padding: const EdgeInsets.all(24),
            child: _isFlipped ? const Text('Arti: Makan') : const Text('食べる (たべる)'),
          ),
        ),
      ),
    );
  }
}`,
      ],
      p: [
        'pubspec.yaml',
        `name: kotoba_learn
description: "Offline-first Japanese vocabulary flashcard with spaced repetition."
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  sqflite: ^2.3.0
  flutter_animate: ^4.5.0`,
      ],
      r: [
        'README.md',
        `# Kotoba Learn — JLPT Japanese Vocabulary & Spaced Repetition
Aplikasi pembelajaran bahasa Jepang interaktif dengan flashcard dua sisi (Kanji, Furigana, Arti Bahasa Indonesia), pelacak streak harian, dan algoritma SM-2 Spaced Repetition.`,
      ],
    },
    log: [
      "Running 'flutter pub get'...",
      "Running Gradle task 'assembleDebug'...",
      '✓ Built app-debug.apk',
      'Installing app.apk on Pixel 8...',
    ],
    ui: {
      nav: ['Belajar', 'Flashcard', 'Koleksi'],
      s: [
        {
          h: ['JLPT N5 · 🔥 12 Hari', 'Kotoba Japanese Learn'],
          b: [
            ['card', '食べる (たべる) · taberu', 'Kata Kerja (Verb II) — Arti: Makan', 'Hafal'],
            ['card', '勉強する (べんきょうする)', 'Kata Kerja (Verb III) — Arti: Belajar', 'Sedang Dipelajari'],
            ['card', '日本語 (にほんご)', 'Kata Benda (Noun) — Arti: Bahasa Jepang', 'Hafal'],
            ['chart', 'Target Harian (15/20 Kosakata)', [25, 40, 55, 70, 75]],
            ['btn', 'Mulai Kuis Flashcard'],
          ],
        },
        {
          h: ['Uji Ingatan', 'Mode Flashcard'],
          b: [
            ['card', '行く (いく) · iku', 'Kata Kerja (Verb I) — Arti: Pergi', 'Uji Coba'],
            ['card', '友達 (ともだち) · tomodachi', 'Kata Benda (Noun) — Arti: Teman / Sahabat', 'Uji Coba'],
            ['btn', 'Balik Kartu (Lihat Arti)'],
          ],
        },
        {
          h: ['Bank Kosakata', 'Daftar Kanji N5'],
          b: [
            ['line', '日 (ひ / にち)', 'Matahari / Hari'],
            ['line', '本 (ほん)', 'Buku / Asal'],
            ['line', '人 (ひと / じん)', 'Orang'],
            ['line', '学 (がく)', 'Belajar / Ilmu'],
          ],
        },
      ],
    },
  },
];

interface ProjectState {
  tabs: string[];
  cur: string;
  st: 'off' | 'boot' | 'on';
  scr: number;
  logs: [string, string, string?][];
  lt: 'build' | 'logcat';
  busy: boolean;
  toast: string;
}

export const AndroidStudioApp: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string>('sigizi');
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'code' | 'emu'>('code');
  const [timeStr, setTimeStr] = useState('12:00');

  const fitContainerRef = useRef<HTMLDivElement>(null);
  const [phoneScale, setPhoneScale] = useState(1);

  // Per-project independent state
  const [projectStates, setProjectStates] = useState<Record<string, ProjectState>>(() => {
    const init: Record<string, ProjectState> = {};
    PROJECTS.forEach((p) => {
      const defaultKey = Object.keys(p.f)[0];
      init[p.id] = {
        tabs: [defaultKey],
        cur: defaultKey,
        st: 'on',
        scr: 0,
        logs: [],
        lt: 'build',
        busy: false,
        toast: '',
      };
    });
    return init;
  });

  // Current project & state
  const curProject = PROJECTS.find((p) => p.id === activeProject) || PROJECTS[0];
  const curState = projectStates[activeProject] || {
    tabs: ['m'],
    cur: 'm',
    st: 'on',
    scr: 0,
    logs: [],
    lt: 'build',
    busy: false,
    toast: '',
  };

  // Clock in status bar
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Responsive Phone Fit Scaling
  useEffect(() => {
    const computeScale = () => {
      if (!fitContainerRef.current) return;
      const el = fitContainerRef.current;
      const hScale = (el.clientHeight - 24) / 584;
      const wScale = (el.clientWidth - 24) / 290;
      const scale = Math.max(0.45, Math.min(1, Math.min(hScale, wScale)));
      setPhoneScale(scale);
    };

    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, [viewMode, activeProject]);

  const updateCurrentState = (partial: Partial<ProjectState>) => {
    setProjectStates((prev) => ({
      ...prev,
      [activeProject]: {
        ...prev[activeProject],
        ...partial,
      },
    }));
  };

  // Run Project build & boot sequence
  const handleRun = () => {
    if (curState.busy) return;
    playWindowsSound('click');

    const projId = activeProject;
    const proj = curProject;

    updateCurrentState({
      busy: true,
      st: 'off',
      scr: 0,
      logs: [],
      lt: 'build',
    });

    const buildSequence = [
      '> Task :app:preBuild UP-TO-DATE',
      ...proj.log,
      'BUILD SUCCESSFUL in 3.4s',
    ];

    buildSequence.forEach((logLine, index) => {
      setTimeout(() => {
        setProjectStates((prev) => {
          const current = prev[projId];
          if (!current) return prev;
          const isFinal = index === buildSequence.length - 1;
          const isBootingStep = index === buildSequence.length - 2;
          return {
            ...prev,
            [projId]: {
              ...current,
              st: isBootingStep ? 'boot' : current.st,
              logs: [...current.logs, ['build', logLine, isFinal ? 'ok' : '']],
            },
          };
        });
      }, index * 240);
    });

    const totalBuildTime = buildSequence.length * 240 + 900;
    setTimeout(() => {
      playWindowsSound('open');
      notch.show({
        title: `Pixel 8 API 34`,
        subtitle: `${proj.name} launched successfully`,
      });

      setProjectStates((prev) => {
        const current = prev[projId];
        if (!current) return prev;
        return {
          ...prev,
          [projId]: {
            ...current,
            st: 'on',
            busy: false,
            logs: [
              ...current.logs,
              ['logcat', `I/ActivityManager: Displayed ${proj.name}.MainActivity +350ms`],
            ],
          },
        };
      });
    }, totalBuildTime);
  };

  const handleStop = () => {
    playWindowsSound('click');
    updateCurrentState({
      st: 'off',
      busy: false,
      logs: [...curState.logs, ['logcat', 'I/Process: App process terminated (SIGKILL)']],
    });
  };

  // Syntax Highlighting
  const renderCodeWithHighlight = (codeText: string) => {
    const rx =
      /(\/\/[^\n]*|#[^\n]*)|("[^"]*"|'[^']*')|(@[\w+.]+|&lt;\/?[\w.]+|\bandroid:\w+)|\b(package|class|fun|val|var|override|import|private|by|return|void|const|extends|plugins|dependencies|implementation|android|id|sdk|final)\b|(\b\d+\b)/g;

    return codeText.split('\n').map((line, idx) => {
      const html = line.replace(rx, (m, com, str, ann, kw, num) => {
        if (com) return `<span class="as-c">${com}</span>`;
        if (str) return `<span class="as-s">${str}</span>`;
        if (ann) return `<span class="as-a">${ann}</span>`;
        if (kw) return `<span class="as-k">${kw}</span>`;
        if (num) return `<span class="as-n">${num}</span>`;
        return m;
      });

      return (
        <div key={idx}>
          <em>{idx + 1}</em>
          <span dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />
        </div>
      );
    });
  };

  // Render emulator screen content
  const renderEmulatorBody = () => {
    if (curState.st === 'off') {
      return (
        <div className="as-off">
          <p className="font-semibold text-white/90 mb-1">Android Studio Emulator</p>
          <span>Klik tombol &#9654; Run di atas untuk build dan jalankan aplikasi di Pixel 8.</span>
        </div>
      );
    }

    if (curState.st === 'boot') {
      return (
        <div className="as-boot">
          <span>android</span>
          <div className="as-ld" />
        </div>
      );
    }

    // 1. siGizi: Tampilkan screenshot asli aplikasi langsung di emulator Pixel 8
    if (curProject.id === 'sigizi') {
      return (
        <div className="as-scr-shot">
          <img
            src="/images/projects/sigizi/Screenshot_20240618_215553.png"
            alt="siGizi Mobile App"
          />
        </div>
      );
    }

    // 2. Apps lainnya (Bandarism, Mariban, YoraJobs, Kotoba):
    // Menggunakan komponen rapi prototype Android Studio
    const curScreenData = curProject.ui.s[curState.scr] || curProject.ui.s[0];

    return (
      <div className="as-ap">
        <div className="as-body">
          {curScreenData?.h && (
            <div className="as-hero">
              <small>{curScreenData.h[0]}</small>
              <b>{curScreenData.h[1]}</b>
            </div>
          )}

          {curScreenData?.b?.map((block: any, bIdx: number) => {
            const bType = block[0];
            if (bType === 'card') {
              return (
                <div key={bIdx} className="as-cardx">
                  <b>{block[1]}</b>
                  <small>{block[2]}</small>
                  {block[3] && (
                    <div style={{ marginTop: 8 }}>
                      <span className="as-chipx">{block[3]}</span>
                    </div>
                  )}
                </div>
              );
            }
            if (bType === 'chart') {
              return (
                <div key={bIdx} className="as-cardx">
                  <small>{block[1]}</small>
                  <div className="as-chart">
                    {block[2].map((heightPct: number, hIdx: number) => (
                      <i key={hIdx} style={{ height: `${heightPct}%` }} />
                    ))}
                  </div>
                </div>
              );
            }
            if (bType === 'line') {
              return (
                <div key={bIdx} className="as-ln">
                  <span>{block[1]}</span>
                  <b>{block[2]}</b>
                </div>
              );
            }
            if (bType === 'btn') {
              return (
                <button
                  key={bIdx}
                  onClick={() => {
                    playWindowsSound('click');
                    updateCurrentState({ toast: `Aksi dijalankan: ${block[1]}` });
                    setTimeout(() => updateCurrentState({ toast: '' }), 1800);
                  }}
                  className="as-btnx"
                >
                  {block[1]}
                </button>
              );
            }
            return null;
          })}
        </div>
        {renderBottomNav()}
      </div>
    );
  };

  const renderBottomNav = () => {
    if (curProject.id === 'sigizi' || !curProject.ui.nav?.length) return null;
    return (
      <div className="as-nv">
        {curProject.ui.nav.map((navLabel, nIdx) => (
          <button
            key={nIdx}
            onClick={() => {
              playWindowsSound('click');
              updateCurrentState({
                scr: nIdx,
                logs: [...curState.logs, ['logcat', `D/Nav: Navigate to tab ${nIdx} (${navLabel})`]],
              });
            }}
            className={nIdx === curState.scr ? 'on' : ''}
          >
            <span>{navLabel}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div
      className="as-root w-full h-full"
      data-v={viewMode}
      style={
        {
          '--a1': curProject.a[0],
          '--a2': curProject.a[1],
        } as React.CSSProperties
      }
    >
      {/* 1. Menu Bar */}
      <div className="as-mb">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Navigate</span>
        <span>Code</span>
        <span>Build</span>
        <span>Run</span>
        <span>Tools</span>
        <span>Help</span>
        <b>
          {curProject.name} – {curProject.f[curState.cur]?.[0] || 'Editor'}
        </b>
      </div>

      {/* 2. Top Toolbar */}
      <div className="as-tl relative">
        <button
          onClick={() => setIsPopOpen((prev) => !prev)}
          className={`as-pj ${isPopOpen ? 'on' : ''}`}
          title="Switch Project"
        >
          <span className="as-mi">{curProject.mono}</span>
          <span>{curProject.name}</span>
          <small>&#9662;</small>
        </button>

        <span className="as-cfg">app &#9662;</span>
        <span className="as-dv">Pixel 8 API 34</span>

        <button
          onClick={handleRun}
          className={`as-rb go ${curState.busy ? 'busy' : ''}`}
          title="Run 'app' (Shift+F10)"
        >
          &#9654;
        </button>
        <button onClick={handleStop} className="as-rb" title="Stop 'app' (Ctrl+F2)">
          &#9632;
        </button>

        {/* View Toggle on Smaller Viewports */}
        <div className="as-seg">
          <button
            onClick={() => setViewMode('code')}
            className={viewMode === 'code' ? 'on' : ''}
          >
            Code
          </button>
          <button
            onClick={() => setViewMode('emu')}
            className={viewMode === 'emu' ? 'on' : ''}
          >
            Emulator
          </button>
        </div>
      </div>

      {/* Project Switch Popup Dropdown */}
      {isPopOpen && (
        <div className="as-pop">
          <h6>Projects</h6>
          {PROJECTS.map((proj) => {
            const isRun = projectStates[proj.id]?.st === 'on';
            return (
              <button
                key={proj.id}
                onClick={() => {
                  playWindowsSound('click');
                  setActiveProject(proj.id);
                  setIsPopOpen(false);
                }}
                style={
                  {
                    '--a1': proj.a[0],
                    '--a2': proj.a[1],
                  } as React.CSSProperties
                }
              >
                <span className="as-mi">{proj.mono}</span>
                <span>
                  <b>{proj.name}</b>
                  <small>{proj.lang}</small>
                </span>
                {isRun ? <span className="as-rd" title="Running" /> : <span />}
                <span>{proj.id === activeProject ? '✓' : ''}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Main Workspace */}
      <div className="as-mn">
        {/* Left: Project Explorer Tree */}
        <div className="as-tree">
          <div className="as-th px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Project
          </div>
          <div className="as-tw">
            {curProject.tree.map(([lvl, label, fileKey], idx) => {
              const isSelected = fileKey && curState.cur === fileKey;
              return fileKey ? (
                <button
                  key={idx}
                  onClick={() => {
                    if (fileKey && curProject.f[fileKey]) {
                      playWindowsSound('click');
                      const tabs = curState.tabs.includes(fileKey)
                        ? curState.tabs
                        : [...curState.tabs, fileKey];
                      updateCurrentState({ tabs, cur: fileKey });
                    }
                  }}
                  className={`t ${isSelected ? 'on' : ''}`}
                  style={{ paddingLeft: `${10 + lvl * 12}px` }}
                >
                  📄 {label}
                </button>
              ) : (
                <div
                  key={idx}
                  className="t"
                  style={{ paddingLeft: `${10 + lvl * 12}px` }}
                >
                  &#9662; 📁 {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center: Code Editor */}
        <div className="as-ed">
          <div className="as-et">
            {curState.tabs.map((tabKey) => {
              const fileData = curProject.f[tabKey];
              if (!fileData) return null;
              const isTabActive = curState.cur === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => updateCurrentState({ cur: tabKey })}
                  className={isTabActive ? 'on' : ''}
                >
                  <span>{fileData[0]}</span>
                  {curState.tabs.length > 1 && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextTabs = curState.tabs.filter((t) => t !== tabKey);
                        const nextCur =
                          curState.cur === tabKey
                            ? nextTabs[nextTabs.length - 1]
                            : curState.cur;
                        updateCurrentState({ tabs: nextTabs, cur: nextCur });
                      }}
                      className="ml-1 opacity-60 hover:opacity-100 text-xs"
                    >
                      ×
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="as-cd">
            {curProject.f[curState.cur] &&
              renderCodeWithHighlight(curProject.f[curState.cur][1])}
          </div>
        </div>

        {/* Bottom Panel: Build Output & Logcat */}
        <div className="as-bt">
          <nav>
            <button
              onClick={() => updateCurrentState({ lt: 'build' })}
              className={curState.lt === 'build' ? 'on' : ''}
            >
              Build
            </button>
            <button
              onClick={() => updateCurrentState({ lt: 'logcat' })}
              className={curState.lt === 'logcat' ? 'on' : ''}
            >
              Logcat
            </button>
          </nav>
          <div className="as-lg">
            {curState.logs
              .filter((log) => log[0] === curState.lt)
              .map((log, lIdx) => (
                <p key={lIdx} className={log[2] === 'ok' ? 'ok' : ''}>
                  {log[1]}
                </p>
              ))}
            {curState.logs.filter((log) => log[0] === curState.lt).length === 0 && (
              <p>Press Run to build and launch the app.</p>
            )}
          </div>
        </div>

        {/* Right: Pixel 8 Emulator */}
        <div className="as-emu">
          <div className="as-eh">
            <span>Pixel 8 API 34 · {curProject.name}</span>
            <span className="flex items-center gap-1.5 text-[10px]">
              <span
                className={`w-2 h-2 rounded-full ${
                  curState.st === 'on'
                    ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]'
                    : curState.st === 'boot'
                    ? 'bg-amber-400'
                    : 'bg-neutral-600'
                }`}
              />
              {curState.st === 'on' ? 'Running' : curState.st === 'boot' ? 'Booting' : 'Not running'}
            </span>
          </div>

          <div ref={fitContainerRef} className="as-fit">
            <div className="as-ph" style={{ '--s': phoneScale } as React.CSSProperties}>
              <div className="as-scr">
                {/* Status Bar */}
                <div
                  className="as-sb"
                  style={
                    curProject.id === 'sigizi' && curState.st === 'on'
                      ? { color: '#ffffff', position: 'absolute', left: 0, right: 0, zIndex: 10 }
                      : undefined
                  }
                >
                  <span>{timeStr}</span>
                  <span className="flex items-center gap-1">5G ▮▮▮</span>
                </div>

                {/* Emulator Screen Body */}
                {renderEmulatorBody()}

                {/* Interactive Toast Notification */}
                {curState.toast && <div className="as-tost">{curState.toast}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
