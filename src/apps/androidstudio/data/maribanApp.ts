import { ProjectData } from '../types';

export const maribanAppProject: ProjectData = {
  id: 'maribanapp',
  name: 'Mariban App',
  lang: 'Flutter',
  mono: 'MA',
  a: ['#ea580c', '#c2410c'],
  pkg: 'id.mariban.operations',
  repoUrl: 'https://github.com/radositumorang15',
  screens: [
    {
      label: 'Dashboard Bengkel',
      image: '/images/projects/mariban/mariban.jpg',
      desc: 'Monitoring operasional servis, pit antrean & kasir POS',
    },
  ],
  tree: [
    [0, 'mariban-operations-app'],
    [1, 'lib'],
    [2, 'main.dart', 'm'],
    [2, 'features/dashboard/views'],
    [3, 'workshop_dashboard_view.dart', 'd'],
    [2, 'features/antrean/views'],
    [3, 'service_queue_view.dart', 'q'],
    [1, 'pubspec.yaml', 'p'],
    [1, 'README.md', 'r'],
  ],
  f: {
    m: [
      'main.dart',
      `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/dashboard/views/workshop_dashboard_view.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: MaribanWorkshopApp(),
    ),
  );
}

class MaribanWorkshopApp extends StatelessWidget {
  const MaribanWorkshopApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mariban Workshop App',
      theme: ThemeData.dark(),
      home: const WorkshopDashboardView(),
    );
  }
}`,
    ],
    d: [
      'workshop_dashboard_view.dart',
      `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class WorkshopDashboardView extends ConsumerWidget {
  const WorkshopDashboardView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard Operasional Bengkel'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Text('Antrean Servis Aktif: 8 Mobil'),
          Text('Penjualan Ban Hari Ini: 14 Unit'),
          Text('Pit Spooring: 2 Sedang Bekerja'),
        ],
      ),
    );
  }
}`,
    ],
    q: [
      'service_queue_view.dart',
      `import 'package:flutter/material.dart';

class ServiceQueueView extends StatelessWidget {
  const ServiceQueueView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Antrean Pit Servis')),
      body: const Center(
        child: Text('Manajemen Alokasi Teknisi & Antrean Bengkel'),
      ),
    );
  }
}`,
    ],
    p: [
      'pubspec.yaml',
      `name: mariban_app
description: "Internal workshop operations, POS, and mechanic management for CV Mariban."
version: 1.0.0+1

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.5.1
  intl: ^0.19.0`,
    ],
    r: [
      'README.md',
      `# Mariban App — Workshop Operations & POS Management
Aplikasi internal manajemen operasional bengkel mobil CV Mariban.
Mengelola alur pengerjaan pit servis, stok ban & suku cadang, kehadiran teknisi, serta transaksi kasir POS harian.`,
    ],
  },
  log: [
    "Running 'flutter pub get'...",
    "Running Gradle task 'assembleDebug'...",
    '✓ Built app-debug.apk',
    'Installing app.apk on Pixel 8...',
  ],
};

