import { ProjectData } from '../types';

export const yorajobsProject: ProjectData = {
  id: 'yorajobs',
  name: 'YoraJobs',
  lang: 'Flutter',
  mono: 'YJ',
  a: ['#4f46e5', '#6366f1'],
  pkg: 'com.yorajobs.tracker',
  repoUrl: 'https://github.com/radositumorang15/bantu-job',
  screens: [
    {
      label: 'Pipeline Lamaran',
      image: '/images/projects/yorajobs/yorajobs.png',
      desc: 'Pelacak status rekrutmen, offering, dan reminder jadwal interview',
    },
  ],
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
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'features/jobs/presentation/screens/home_feed_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: YoraJobsApp(),
    ),
  );
}

class YoraJobsApp extends StatelessWidget {
  const YoraJobsApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'YoraJobs',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF4F46E5)),
      ),
      home: const HomeFeedScreen(),
    );
  }
}`,
    ],
    h: [
      'home_feed_screen.dart',
      `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HomeFeedScreen extends ConsumerWidget {
  const HomeFeedScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      appBar: AppBar(
        title: const Text('YoraJobs Tracker'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Text('12 Lamaran Aktif'),
          Text('Gojek · Flutter Developer · Offering'),
          Text('Traveloka · Android Engineer · Interview'),
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
Aplikasi pengelola pipeline rekrutmen kerja berbasis Flutter dan Riverpod.
Membantu pelamar memantau status lamaran kerja, memformat range gaji, dan menerima pengingat jadwal interview.`,
    ],
  },
  log: [
    "Running 'flutter pub get'...",
    "Running Gradle task 'assembleDebug'...",
    '✓ Built app-debug.apk',
    'Syncing files to Pixel 8 API 34...',
  ],
};

