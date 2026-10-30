import { ProjectData } from '../types';

export const kotobaProject: ProjectData = {
  id: 'kotoba',
  name: 'Kotoba Learn',
  lang: 'Kotlin',
  mono: 'KL',
  a: ['#ec4899', '#7c3aed'],
  pkg: 'id.kotoba.app',
  repoUrl: 'https://github.com/radositumorang15/katoba_learn',
  screens: [
    {
      label: 'Home & Kurikulum',
      image: '/images/projects/kotoba/katoba1.png',
      desc: 'Level pembelajaran terstruktur & Kotak Ulangan Harian',
    },
    {
      label: 'Flashcard SRS',
      image: '/images/projects/kotoba/katoba2.png',
      desc: 'Kartu bolak-balik Kanji/Kana dengan Spaced Repetition',
    },
  ],
  tree: [
    [0, 'katoba_learn'],
    [1, 'composeApp'],
    [2, 'src/commonMain/kotlin/id/kotoba/app'],
    [3, 'App.kt', 'm'],
    [2, 'src/commonMain/kotlin/id/kotoba/app/view/screens'],
    [3, 'HomeScreen.kt', 'h'],
    [2, 'src/androidMain/kotlin/id/kotoba/app'],
    [3, 'MainActivity.kt', 'a'],
    [1, 'build.gradle.kts', 'g'],
    [1, 'README.md', 'r'],
  ],
  f: {
    m: [
      'App.kt',
      `package id.kotoba.app

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import cafe.adriel.voyager.navigator.Navigator
import cafe.adriel.voyager.transitions.SlideTransition
import id.kotoba.app.model.repository.AuthRepository
import id.kotoba.app.model.repository.ProgressRepository
import id.kotoba.app.model.repository.SrsRepository
import id.kotoba.app.platform.rememberAudioTtsEngine
import id.kotoba.app.view.navigation.AppState
import id.kotoba.app.view.navigation.LocalAppState
import id.kotoba.app.view.navigation.LocalAudioTtsEngine
import id.kotoba.app.view.navigation.SplashVoyagerScreen
import id.kotoba.app.view.theme.KotobaTheme

@Composable
fun App() {
    KotobaTheme {
        var appState by remember { mutableStateOf<AppState?>(null) }

        LaunchedEffect(Unit) {
            val progressRepo = ProgressRepository()
            appState = AppState(
                progressRepository = progressRepo,
                authRepository = AuthRepository(progressRepo = progressRepo),
                srsRepository = SrsRepository()
            )
        }

        val state = appState ?: return@KotobaTheme
        val ttsEngine = rememberAudioTtsEngine()

        CompositionLocalProvider(
            LocalAppState provides state,
            LocalAudioTtsEngine provides ttsEngine
        ) {
            Navigator(SplashVoyagerScreen) { navigator ->
                SlideTransition(navigator)
            }
        }
    }
}`,
    ],
    h: [
      'HomeScreen.kt',
      `package id.kotoba.app.view.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import id.kotoba.app.controller.HomeController
import id.kotoba.app.view.components.CourseCard
import id.kotoba.app.view.components.HeaderBar
import id.kotoba.app.view.components.HeroBannerCard

@Composable
fun HomeScreen(controller: HomeController, modifier: Modifier = Modifier) {
    val levels by controller.levels.collectAsState()
    val activeLevel = levels.firstOrNull { it.isUnlocked && !it.isCompleted }

    Column(modifier = modifier.fillMaxSize().padding(16.dp)) {
        HeaderBar(title = "Kotoba 言葉", streakDays = 12)
        HeroBannerCard(
            title = "Kotak Ulangan Harian",
            subtitle = "15 kosakata siap direview hari ini",
            onActionClick = { controller.startSrsReview() }
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text("Kurikulum 4 Fase", modifier = Modifier.padding(vertical = 8.dp))
        LazyColumn {
            items(levels) { level ->
                CourseCard(level = level, onClick = { controller.openLevel(level) })
            }
        }
    }
}`,
    ],
    a: [
      'MainActivity.kt',
      `package id.kotoba.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            App()
        }
    }
}`,
    ],
    g: [
      'build.gradle.kts',
      `plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.composeMultiplatform)
}

kotlin {
    androidTarget {
        compilerOptions {
            jvmTarget.set(org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17)
        }
    }
    sourceSets {
        commonMain.dependencies {
            implementation(compose.runtime)
            implementation(compose.foundation)
            implementation(compose.material3)
            implementation("io.ktor:ktor-client-core:2.3.7")
        }
    }
}`,
    ],
    r: [
      'README.md',
      `# Kotoba (言葉) — Japanese Language & SRS
Aplikasi mobile berbasis Compose Multiplatform (KMP) untuk belajar bahasa Jepang dari nol dengan pendekatan audio-first dan Spaced Repetition (SM-2).

- Framework: Compose Multiplatform (JetBrains) 1.7.3 & Kotlin 2.1.0
- Backend: Neon Serverless PostgreSQL & Ktor Client
- Platform: Android SDK 35, iOS, Desktop JVM
- GitHub: https://github.com/radositumorang15/katoba_learn`,
    ],
  },
  log: [
    '> Task :composeApp:compileDebugKotlinAndroid',
    '> Task :composeApp:mergeDebugResources',
    '> Task :composeApp:assembleDebug',
    "Installing APK 'composeApp-debug.apk' on Pixel 8 API 34...",
    "Launching 'id.kotoba.app.MainActivity'...",
  ],
};

