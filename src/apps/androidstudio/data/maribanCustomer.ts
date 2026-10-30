import { ProjectData } from '../types';

export const maribanCustomerProject: ProjectData = {
  id: 'maribancustomer',
  name: 'Mariban Customer',
  lang: 'Flutter',
  mono: 'MC',
  a: ['#d97706', '#dc2626'],
  pkg: 'id.mariban.customer',
  repoUrl: 'https://github.com/radositumorang15',
  screens: [
    {
      label: 'Katalog & Booking',
      image: '/images/projects/maribancustomer/maribancust1.jpg',
      desc: 'Pencarian ukuran ban mobil & reservasi service',
    },
    {
      label: 'Spooring 3D',
      image: '/images/projects/maribancustomer/maribancust2.jpg',
      desc: 'Kalibrasi presisi 4 roda kamera Hunter Hawkeye',
    },
  ],
  tree: [
    [0, 'flutter-mariban-customer'],
    [1, 'lib'],
    [2, 'main.dart', 'm'],
    [2, 'features/pelangganlanding/views'],
    [3, 'landing_page_view.dart', 'l'],
    [2, 'features/layanan/views'],
    [3, 'spooring_service_view.dart', 'h'],
    [1, 'pubspec.yaml', 'p'],
    [1, 'README.md', 'r'],
  ],
  f: {
    m: [
      'main.dart',
      `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
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
      theme: ThemeData.dark(),
      home: const LandingPageView(),
    );
  }
}`,
    ],
    l: [
      'landing_page_view.dart',
      `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class LandingPageView extends ConsumerWidget {
  const LandingPageView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: const Color(0xFF141417),
      appBar: AppBar(
        title: const Text('CV Mariban Customer Portal'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: const [
            Text('Katalog Ukuran Ban Mobil & Booking Online'),
            Text('Spooring 3D Hunter Hawkeye Elite'),
          ],
        ),
      ),
    );
  }
}`,
    ],
    h: [
      'spooring_service_view.dart',
      `import 'package:flutter/material.dart';

class SpooringServiceView extends StatelessWidget {
  const SpooringServiceView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Layanan Spooring 3D')),
      body: const Center(
        child: Text('Kalibrasi Camber, Caster, dan Toe bergaransi'),
      ),
    );
  }
}`,
    ],
    p: [
      'pubspec.yaml',
      `name: flutter_mariban_customer
description: "Customer workshop service booking and tire catalog app for CV Mariban."
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1
  flutter_svg: ^2.0.10`,
    ],
    r: [
      'README.md',
      `# CV Mariban Indonesia — Customer Portal App
Aplikasi mobile pelanggan bengkel mobil CV Mariban.
Fitur utama: booking antrean spooring 3D Hunter Hawkeye, balancing komputer, katalog ukuran ban mobil, dan WhatsApp CS care.`,
    ],
  },
  log: [
    "Running 'flutter pub get'...",
    "Running Gradle task 'assembleDebug'...",
    '✓ Built app-debug.apk',
    'Installing app.apk on Pixel 8...',
  ],
};

