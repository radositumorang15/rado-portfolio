import { ProjectData } from '../types';

export const bandarismProject: ProjectData = {
  id: 'bandarism',
  name: 'Bandarism',
  lang: 'Flutter',
  mono: 'BD',
  a: ['#10b981', '#06b6d4'],
  pkg: 'com.bandarism.app',
  repoUrl: 'https://github.com/radositumorang15/bandarismapp',
  screens: [
    {
      label: 'Market Pulse',
      image: '/images/projects/bandarism/bandarism1.png',
      desc: 'Smart money flow IHSG & foreign buy/sell streak',
    },
    {
      label: 'Wyckoff & AI',
      image: '/images/projects/bandarism/bandarism2.png',
      desc: 'Fase akumulasi Wyckoff & Finora AI confluence advisor',
    },
  ],
  tree: [
    [0, 'bandarismapp'],
    [1, 'lib'],
    [2, 'main.dart', 'm'],
    [2, 'features/home/views'],
    [3, 'home_screen.dart', 'h'],
    [2, 'features/screener/views'],
    [3, 'wyckoff_screener.dart', 'w'],
    [1, 'pubspec.yaml', 'p'],
    [1, 'README.md', 'r'],
  ],
  f: {
    m: [
      'main.dart',
      `import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'core/navigation/app_router.dart';
import 'core/theme/app_theme.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Supabase.initialize(
    url: 'https://xyz.supabase.co',
    anonKey: 'public-anon-key',
  );
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
      `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/market_pulse_provider.dart';
import '../widgets/finora_ai_banner.dart';
import '../widgets/smart_money_card.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final market = ref.watch(marketPulseProvider);

    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      appBar: AppBar(
        title: const Text('Bandarism Smart Money'),
        backgroundColor: Colors.transparent,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          FinoraAiBanner(),
          SizedBox(height: 16),
          SmartMoneyCard(symbol: 'BBCA', netForeign: 'Rp420 Miliar'),
          SmartMoneyCard(symbol: 'BREN', netForeign: 'Rp180 Miliar'),
        ],
      ),
    );
  }
}`,
    ],
    w: [
      'wyckoff_screener.dart',
      `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class WyckoffScreener extends ConsumerWidget {
  const WyckoffScreener({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Wyckoff Accumulation Screener')),
      body: ListView(
        children: const [
          ListTile(
            title: Text('BBCA — Phase C Spring'),
            subtitle: Text('Volume divergence on support test'),
          ),
        ],
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

environment:
  sdk: '>=3.0.0 <4.0.0'

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
Aplikasi fintech berbasis Flutter untuk melacak aliran broker institusi (smart money), foreign flow harian, dan fase akumulasi Wyckoff, dilengkapi Finora AI Market Advisor.

- Framework: Flutter & Dart
- State Management: Riverpod
- Database: Supabase & PostgreSQL`,
    ],
  },
  log: [
    "Running 'flutter pub get'...",
    'Resolving dependencies... (1.1s)',
    "Running Gradle task 'assembleDebug'...",
    '✓ Built build/app/outputs/flutter-apk/app-debug.apk',
    'Installing and launching on Pixel 8 API 34...',
  ],
};

