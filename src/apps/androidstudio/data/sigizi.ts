import { ProjectData } from '../types';

export const sigiziProject: ProjectData = {
  id: 'sigizi',
  name: 'siGizi',
  lang: 'Kotlin',
  mono: 'SG',
  a: ['#16a37f', '#0e7a8a'],
  pkg: 'com.example.sigizi',
  repoUrl: 'https://github.com/radositumorang15/SiGizi',
  screens: [
    { label: 'Monitoring Gizi', image: '/images/projects/sigizi/Screenshot_20240618_215553.png', desc: 'Beranda & status gizi balita real-time' },
    { label: 'Prediksi Stunting', image: '/images/projects/sigizi/Screenshot_20240618_215604.png', desc: 'Analisis ML klasifikasi risiko stunting' },
    { label: 'Metrik Balita', image: '/images/projects/sigizi/Screenshot_20240618_215628.png', desc: 'Kurva pertumbuhan berat & tinggi badan' },
    { label: 'Edukasi & Menu', image: '/images/projects/sigizi/Screenshot_20240618_215211.png', desc: 'Artikel gizi & konsultasi posyandu' },
  ],
  tree: [
    [0, 'siGizi'],
    [1, 'app'],
    [2, 'src/main/java/com/example/sigizi/view/main'],
    [3, 'MainActivity.kt', 'm'],
    [2, 'src/main/java/com/example/sigizi/view/home'],
    [3, 'HomeFragment.kt', 'h'],
    [2, 'src/main/java/com/example/sigizi/data/network'],
    [3, 'ApiService.kt', 'a'],
    [2, 'src/main/res/layout'],
    [3, 'activity_main.xml', 'x'],
    [1, 'build.gradle.kts', 'g'],
    [1, 'README.md', 'r'],
  ],
  f: {
    m: [
      'MainActivity.kt',
      `package com.example.sigizi.view.main

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.example.sigizi.R
import com.example.sigizi.data.network.ApiConfig
import com.example.sigizi.databinding.ActivityMainBinding
import com.example.sigizi.di.ViewModelFactory
import com.example.sigizi.view.welcome.WelcomeActivity
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {
    private val viewModel: MainViewModel by viewModels { ViewModelFactory(this) }
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val navView: BottomNavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        navView.setupWithNavController(navController)

        viewModel.getSession().observe(this) { user ->
            if (!user.isLoggedIn) {
                startActivity(Intent(this, WelcomeActivity::class.java))
                finish()
            }
        }
    }
}`,
    ],
    h: [
      'HomeFragment.kt',
      `package com.example.sigizi.view.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.example.sigizi.databinding.FragmentHomeBinding
import com.example.sigizi.di.ViewModelFactory

class HomeFragment : Fragment() {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private val viewModel: HomeViewModel by viewModels { ViewModelFactory(requireContext()) }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        viewModel.loadUserSession()
    }
}`,
    ],
    a: [
      'ApiService.kt',
      `package com.example.sigizi.data.network

import com.example.sigizi.data.response.PredictResponse
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface ApiService {
    @FormUrlEncoded
    @POST("predict")
    suspend fun predictStunting(
        @Field("age_months") ageMonths: Int,
        @Field("gender") gender: String,
        @Field("height_cm") heightCm: Float,
        @Field("weight_kg") weightKg: Float
    ): PredictResponse
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
        app:layout_constraintBottom_toBottomOf="parent" />
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
    implementation("com.squareup.retrofit2:retrofit:2.9.0")
}`,
    ],
    r: [
      'README.md',
      `# siGizi — Stunting Early Detection & Child Growth Tracking
Bangkit Academy Capstone Project (Google, GoTo, Traveloka).
Aplikasi Android berbasis Machine Learning untuk membantu ibu memantau gizi balita.

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
};
