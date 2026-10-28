# PRD — RadoOS Portfolio

> **Produk:** Portofolio interaktif bergaya sistem operasi untuk Rado Nelson Dela Sadrak Situmorang
> **Versi:** 1.1 (menambahkan ketentuan Next.js) · **Tanggal:** 28 Okt 2026 · **Pemilik:** Rado · **Status:** Draft siap dikerjakan
> **Dokumen terkait:** `DESIGN.md` (design system & spesifikasi UI)

---

## 1. Ringkasan

RadoOS adalah website portofolio yang tampil seperti **Windows 11** di desktop dan berubah menjadi **Android 17** di layar kecil. Pengunjung membuka "aplikasi" (About, Experience, Projects, Skills, Terminal, Resume, Contact) untuk mengenal Rado: mahasiswa final-year Informatics Engineering Education (UNS) yang berpengalaman membangun aplikasi web (ReactJS, Bootstrap, CodeIgniter) dan Android (Kotlin).

Dua elemen khas: **Dock kustom** (pengganti taskbar) dan **Rado Notch** (UI notch buatan sendiri yang jadi pusat status dan notifikasi ringan).

**Tujuan akhir:** membuat recruiter, tech lead, dan calon klien *ingat* Rado dalam hitungan detik, lalu **menghubungi atau mengundang wawancara**.

---

## 2. Latar belakang & masalah

| Masalah | Dampak |
|---|---|
| CV PDF satu halaman tidak menunjukkan kemampuan UI/UX dan engineering Rado | Kandidat terlihat sama dengan ratusan lainnya |
| Portofolio saat ini (`radositumorang.netlify.app`) berbentuk landing page standar | Kurang memorable; tidak menonjolkan kemampuan frontend tingkat lanjut |
| Pelamar frontend/mobile sangat banyak, terutama fresh graduate | Butuh diferensiasi yang *membuktikan* skill, bukan sekadar menyebutkannya |

**Insight:** portofolio yang *berperilaku* seperti produk nyata (window manager, dock, notch, animasi spring) adalah bukti langsung kemampuan frontend, dan format OS familiar sehingga tidak membingungkan pengunjung.

---

## 3. Tujuan, non-tujuan, metrik

### 3.1 Tujuan
1. **G1 — Diferensiasi:** tampilan OS yang meyakinkan di desktop (Windows 11) dan mobile (Android 17).
2. **G2 — Konten lengkap:** semua isi CV tersaji (About, Education, Experience, Projects, Event, Skills) dengan struktur lebih mudah dipindai daripada PDF.
3. **G3 — Konversi:** pengunjung mengunduh CV atau mengirim pesan.
4. **G4 — Bukti teknis:** performa dan aksesibilitas tinggi, sehingga situsnya sendiri menjadi *case study*.
5. **G5 — Dapat ditemukan:** terindeks mesin pencari dan dapat dibagikan per-"app" (deep link).

### 3.2 Non-tujuan (v1)
- Bukan emulator OS sungguhan (tanpa file system nyata, tanpa instalasi app, tanpa multi-user).
- Bukan blog/CMS. Konten dikelola lewat file data di repo.
- Tidak ada akun/login pengunjung.
- Tidak memakai aset merek Microsoft/Google (logo, wallpaper, ikon).

### 3.3 Metrik keberhasilan (30 hari setelah rilis)

| Metrik | Target |
|---|---|
| Rata-rata durasi sesi | ≥ 2 menit |
| Rata-rata app dibuka per sesi | ≥ 3 |
| Klik CTA (Download CV + Contact + LinkedIn) per sesi | ≥ 8% |
| Lighthouse Performance (desktop / mobile) | ≥ 90 / ≥ 85 |
| Lighthouse Accessibility / SEO | ≥ 95 / ≥ 95 |
| LCP / CLS / INP | < 2,5 s / < 0,1 / < 200 ms |
| Bounce rate | < 50% |
| Pengunjung yang memakai "Classic view" | Dipantau (indikator seberapa membingungkan metafora OS) |

---

## 4. Target pengguna

| Persona | Kebutuhan | Waktu yang tersedia | Yang harus mereka temukan |
|---|---|---|---|
| **Recruiter / HR** | Menyaring cepat: stack, pengalaman, kontak | 30–90 dtk | Posisi, pengalaman (4), skills, tombol Download CV |
| **Tech lead / hiring manager** | Menilai kualitas kerja | 3–5 mnt | Proyek + stack + tautan live/source, kualitas UI situs |
| **Calon klien UMKM** | Apakah Rado bisa buatkan website | 1–2 mnt | Pengalaman website UMKM, proyek, cara menghubungi |
| **Dosen / rekan / komunitas** | Mengenal Rado & proyeknya | Santai | About, Education, event, proyek |

**Perangkat:** mayoritas recruiter membuka dari **LinkedIn → ponsel** (Android/iOS) dan laptop Windows. Karena itu mobile shell bukan tambahan, melainkan jalur utama.

---

## 5. Perjalanan pengguna utama

1. **Recruiter di ponsel:** buka link dari LinkedIn → boot singkat → home screen Android → ketuk *Resume* atau *Experience* → ketuk *Contact* (atau tombol di widget profil).
2. **Tech lead di laptop:** buka link → desktop Windows → Notch menampilkan "Open to work" → buka *Projects* → klik SiGizi → baca detail + tautan → buka *Terminal* → ketik `skills`.
3. **Klien UMKM:** buka *Experience* → lihat peran Kawan Kerja (website UMKM) → *Contact* → kirim pesan.
4. **Pengunjung yang tidak suka metafora OS:** klik "Classic view" (Quick Settings atau skip link) → halaman biasa dengan semua konten.

---

## 6. Ruang lingkup fitur

Prioritas: **P0** wajib rilis · **P1** target rilis, boleh menyusul 1–2 minggu · **P2** setelah rilis.

### 6.1 Shell & sistem

| ID | Fitur | Prioritas |
|---|---|---|
| SYS-01 | Boot screen singkat (≤ 1,2 dtk, bisa di-skip, hanya sekali per sesi) | P0 |
| SYS-02 | Pemilihan shell otomatis (Windows ≥ 1024 px + pointer halus; selain itu Android) + override manual | P0 |
| SYS-03 | Window manager (buka, tutup, fokus, minimize, maximize, drag, resize, z-order) — desktop | P0 |
| SYS-04 | Navigasi stack + container transform + predictive back — mobile | P0 |
| SYS-05 | **Dock kustom** (desktop) dan **Dock 4 app** (mobile) | P0 |
| SYS-06 | **Rado Notch** — 4 state, antrean event, API `notch.show()` | P0 |
| SYS-07 | Tray pill: bahasa, jam WIB, Quick Settings (desktop) | P0 |
| SYS-08 | Start menu (desktop) dengan Pinned + Recommended + "Hire me" | P1 |
| SYS-09 | Command palette (`Ctrl/⌘+K`), pencarian app, proyek, pengalaman, aksi | P1 |
| SYS-10 | Widget board (desktop) / widget page (mobile) | P1 |
| SYS-11 | Notification shade + Quick Settings tiles + riwayat Notch (mobile) | P1 |
| SYS-12 | Tema Light/Dark (ikut sistem + manual), aksen dinamis (mobile) | P0 |
| SYS-13 | Bahasa EN (default) / ID | P1 |
| SYS-14 | Deep link per app via hash (`#projects/sigizi`) | P0 |
| SYS-15 | Context menu klik kanan (dock, desktop) | P1 |
| SYS-16 | Snap layouts, Bubbles (mobile), lock screen | P2 |
| SYS-17 | PWA (installable, offline shell) | P1 |
| SYS-18 | **Classic view** (halaman biasa, semua konten) + SEO fallback, berupa rute Next.js `/classic` yang dirender saat build | **P0** |
| SYS-19 | **Migrasi Vite → Next.js** (App Router) tanpa downtime, sesuai §11.4 | **P0** |
| SYS-20 | Metadata SEO lewat Next.js Metadata API (`title`, OG, JSON-LD, `sitemap`, `robots`) | **P0** |
| SYS-21 | Penyelesaian *hydration* tanpa kedip (tema + shell ditentukan sebelum cat pertama) | **P0** |

### 6.2 Aplikasi (konten)

| ID | App | Isi | Prioritas |
|---|---|---|---|
| APP-01 | **About** | Profil, ringkasan, pendidikan, tautan sosial, "device specs" bergaya OS | P0 |
| APP-02 | **Experience** | 4 peran + event, dengan detail per item | P0 |
| APP-03 | **Projects** | 5 proyek, filter stack, tautan | P0 |
| APP-04 | **Skills** | Kompetensi per level + tools | P0 |
| APP-05 | **Resume** | Viewer PDF + tombol unduh | P0 |
| APP-06 | **Contact** | Form pesan + tautan sosial | P0 |
| APP-07 | **Terminal** | Perintah interaktif (Easter egg + navigasi cepat) | P1 |
| APP-08 | **Settings** | Tema, aksen, bahasa, shell, reduce motion, Classic view | P0 |
| APP-09 | **AI Assistant** (chat tentang Rado, bergaya Copilot/Gemini) | P2 |
| APP-10 | **Photos** (galeri kegiatan: Bangkit, BYTESFEST, dll.) | P2 |
| APP-11 | **Games** (mini-game Easter egg) | P2 |

---

## 7. Inventaris konten (bersumber dari CV)

> Data ini disimpan di `src/data/*.ts` dan menjadi **satu-satunya sumber** untuk jendela, aplikasi mobile, Classic view, palette, dan Terminal. **Teks di bawah sudah dirapikan** dari CV (typo dan kalimat yang terpotong diperbaiki); lihat §12 untuk hal yang perlu keputusanmu.

### 7.1 Profil

| Field | Nilai |
|---|---|
| Nama | Rado Nelson Dela Sadrak Situmorang |
| Nama tampil pendek | Rado Situmorang |
| Peran (tagline) | Frontend & Android Developer *(usulan; sesuaikan)* |
| Lokasi | Surakarta, Jawa Tengah, Indonesia (bekerja di Bandung, Jawa Barat) |
| Foto | Foto profil dari CV (lingkaran) |
| LinkedIn | https://www.linkedin.com/in/radositumorang/ |
| GitHub | https://github.com/radositumorang15 |
| Portofolio lama / short link | https://s.id/Portofolio_Rado · https://radositumorang.netlify.app/ |
| Email | **[BELUM ADA — isi]** |
| Ringkasan (About) | Final-year Informatics Engineering Education student with hands-on experience building high-performance Android and web applications. Works with Kotlin, ReactJS, and other web technologies. Looking for a challenging role to apply these skills on innovative projects. |

### 7.2 Pendidikan

| Institusi | Program | Periode | Catatan |
|---|---|---|---|
| Sebelas Maret University (UNS), Surakarta | Informatics Engineering Education | 2021 – sekarang | GPA 3.81 (semester 7) |

### 7.3 Pengalaman (urut terbaru → terlama)

| # | Peran | Organisasi | Lokasi | Periode | Poin utama |
|---|---|---|---|---|---|
| 1 | Programmer | CV Mariban Indonesia | Bandung, Jawa Barat | Nov 2025 – sekarang | Membangun website untuk Mariban Indonesia dengan desain responsif dan ramah pengguna · Merancang wireframe dan mockup menjadi antarmuka yang efisien |
| 2 | Frontend Developer Intern | Kawan Kerja | Bandung, Jawa Barat | Mar 2025 – Agu 2025 | Membangun front-end website untuk UMKM yang responsif dan ramah pengguna · Berkolaborasi dengan tim desain mengubah wireframe/mockup menjadi UI yang efisien |
| 3 | Mobile Development Cohort (Internship) | Bangkit Academy (Google, Tokopedia, Gojek, Traveloka) | — | Feb 2024 – Jun 2024 | Mengembangkan **siGizi**, aplikasi untuk membantu ibu di Indonesia mencegah stunting dan belajar gizi, dengan machine learning · Merancang & membangun app interaktif dengan Kotlin dan XML · Mengelola integrasi model machine learning ke aplikasi Android · Berkembang dari pemula ke level kompeten dalam pengembangan Android |
| 4 | Frontend Developer Intern | Detik.com | Jakarta Selatan | Agu 2023 – Des 2023 | Membangun website Forum Alumni untuk CT Arsa School · Menerapkan desain ke Bootstrap 5, HTML, CSS, JavaScript · Desain responsif lintas perangkat · Integrasi data backend–frontend dengan CodeIgniter 3 · Mengidentifikasi dan memperbaiki bug |

### 7.4 Proyek

| # | Proyek | Deskripsi | Stack | Tautan |
|---|---|---|---|---|
| 1 | **Rado.dev** — Portfolio Website | Situs portofolio responsif dengan elemen interaktif dan transisi halus | ReactJS, Tailwind CSS, Vite | https://radositumorang.netlify.app/ |
| 2 | **siGizi** — Stunting Prediction App | Aplikasi Android untuk membantu ibu mencegah stunting dan edukasi gizi; memakai ML untuk analisis | Kotlin, XML, JavaScript, ML | [isi: GitHub / demo] |
| 3 | **SmileShop** — Mini E-commerce App | Platform e-commerce responsif: autentikasi aman, keranjang, pelacakan pesanan | Flutter, Firestore, Firebase Auth, FakeStore API | [isi] |
| 4 | **Monggosare** — Hotel Reservation Website | Website reservasi hotel (proyek semester 3) dengan login dan reservasi; Rado sebagai frontend | PHP, JavaScript, HTML, CSS, Bootstrap | [isi] |
| 5 | **Titik Makan** — Restaurant Reservation Website | Website restoran dengan identitas unik agar restoran tampak menarik dan representatif | JavaScript, HTML, CSS, Bootstrap | [isi] |

### 7.5 Event / organisasi

| Event | Peran | Periode | Poin |
|---|---|---|---|
| BYTESFEST | Coordinator, Sponsorship Division | Nov 2022 | Menyusun rencana proposal dan perjanjian sponsor · Membuat daftar perusahaan sponsor · Menawarkan proposal dan menjelaskan ketentuan event |

### 7.6 Skills

| Kategori | Isi |
|---|---|
| **Competent** | Kotlin, XML, JavaScript, HTML, CSS, Bootstrap 5, CodeIgniter 3 |
| **Novice / Learning** | Flutter, VueJS, ReactJS, Python, SQL |
| **Design tools** | Adobe Illustrator, CorelDraw, Figma |

> Level "Competent/Novice" dipakai apa adanya dari CV; di app Skills ditampilkan sebagai bar level dengan label teks (bukan angka persen palsu). Lihat §12 untuk inkonsistensi ReactJS.

---

## 8. Persyaratan fungsional per app

Format: **FR-ID** — kebutuhan → *Kriteria penerimaan (AC)*.

### 8.1 About (APP-01)
- **FR-A1** Tampilkan foto, nama, tagline, lokasi, ringkasan. → AC: semua field dari §7.1 tampil; foto punya `alt`.
- **FR-A2** "Device specs" bergaya OS (Windows: *Device name* = `Rado-Surakarta`, *Processor* = "Informatics Engineering Education — UNS", *GPA* = 3.81, *Languages* = Indonesian, English). → AC: tampil sebagai kartu/definition list; salin dengan tombol "Copy".
- **FR-A3** Tautan sosial (LinkedIn, GitHub, Portofolio). → AC: buka tab baru, `rel="noopener noreferrer"`; memicu event Notch "Opening LinkedIn…".

### 8.2 Experience (APP-02)
- **FR-E1** Daftar 4 peran + folder "Events" (BYTESFEST) urut terbaru. → AC: tiap item menampilkan peran, organisasi, periode, lokasi.
- **FR-E2** Detail item menampilkan poin-poin §7.3. → AC: Windows = panel detail kanan; Android = layar detail (list-detail di tablet).
- **FR-E3** Durasi dihitung otomatis ("Nov 2025 – Present · 12 mo"). → AC: akurat terhadap tanggal saat ini.
- **FR-E4** Deep link per item (`#experience/kawan-kerja`). → AC: membuka app + item terpilih.

### 8.3 Projects (APP-03)
- **FR-P1** Grid kartu proyek: judul, deskripsi singkat, chip stack, tombol *View* / *Source*. → AC: 5 proyek tampil; tombol tanpa tautan disembunyikan (bukan mati).
- **FR-P2** Filter berdasarkan kategori **Web / Mobile** dan pencarian stack. → AC: filter chip + hasil seketika tanpa reload.
- **FR-P3** Halaman detail proyek (deskripsi lengkap, peran Rado, stack, tantangan, hasil, tangkapan layar). → AC: minimal 1 gambar per proyek (placeholder boleh di v1.0).
- **FR-P4** Proyek dengan demo live dibuka dalam jendela "browser" (iframe) bila situs mengizinkan; bila tidak, buka tab baru. → AC: tidak ada iframe kosong akibat `X-Frame-Options`.

### 8.4 Skills (APP-04)
- **FR-S1** Tampilkan tiga kelompok (Competent, Novice/Learning, Design tools). → AC: setiap skill punya ikon + label teks level.
- **FR-S2** Visualisasi bergaya Task Manager (Windows) / ring (Android) dengan animasi masuk. → AC: tidak mengandalkan warna saja; dapat dibaca pembaca layar sebagai daftar.
- **FR-S3** Klik skill menyorot proyek/pengalaman terkait. → AC: memunculkan daftar tautan ke Projects/Experience.

### 8.5 Resume (APP-05)
- **FR-R1** Viewer PDF `CV_Rado.pdf` (pdf.js atau `<object>` dengan fallback). → AC: halaman tampil < 2 dtk; ada zoom + tombol unduh.
- **FR-R2** Tombol **Download CV** (juga di Notch, Start menu, widget profil). → AC: mengunduh file; memicu toast Notch "CV downloaded"; event analytics tercatat.
- **FR-R3** Versi PDF selalu sinkron dengan data (satu file di `public/cv/`). → AC: nama file memuat tanggal versi di metadata.

### 8.6 Contact (APP-06)
- **FR-C1** Form: Nama, Email, Pesan; validasi inline. → AC: error terbaca pembaca layar; tombol kirim nonaktif saat tidak valid.
- **FR-C2** Pengiriman via layanan form (Formspree/Netlify Forms) **atau** `mailto:` sebagai fallback. → AC: sukses → toast Notch + InfoBar/Snackbar; gagal → pesan error + opsi `mailto:`.
- **FR-C3** Perlindungan spam (honeypot + rate limit sisi layanan). → AC: tidak ada CAPTCHA mengganggu.
- **FR-C4** Tautan langsung: Email, LinkedIn, GitHub. → AC: tersedia juga dari Notch `expanded`.

### 8.7 Terminal (APP-07)
Perintah yang didukung:

| Perintah | Keluaran |
|---|---|
| `help` | Daftar perintah |
| `whoami` | Ringkasan profil |
| `about` / `education` | Buka app About / tampilkan pendidikan |
| `experience` | Daftar pengalaman ringkas |
| `projects` | Daftar proyek; `projects open <nama>` membuka app |
| `skills` | Daftar skills |
| `contact` | Tautan kontak |
| `resume` | Mengunduh CV |
| `theme dark\|light` | Mengganti tema |
| `clear` | Membersihkan layar |
| `sudo hire rado` | Easter egg → membuka Contact + toast |
| *(tidak dikenal)* | `command not found: <x> — try help` |

→ AC: riwayat dengan panah atas/bawah; `Tab` autocomplete; output dapat dipilih/disalin.

### 8.8 Settings (APP-08)
- **FR-ST1** Tema (Light / Dark / System). **FR-ST2** Aksen (preset 6 warna → regenerasi token). **FR-ST3** Bahasa (EN/ID). **FR-ST4** Shell (Auto/Windows/Android). **FR-ST5** Reduce motion. **FR-ST6** Dock auto-hide. **FR-ST7** Classic view.
→ AC: semua pilihan tersimpan di `localStorage` dan berlaku seketika tanpa reload.

---

## 9. Persyaratan shell

### 9.1 Dock (SYS-05)
- **FR-D1** Desktop: dock mengambang bawah-tengah sesuai `DESIGN.md §5.2` dengan 10 item (Start, Search, About, Experience, Projects, Skills, Terminal, Resume, Contact, Settings). → AC: semua item dapat diakses keyboard; tooltip muncul 400 ms.
- **FR-D2** Indikator status app (fokus / terbuka / tertutup). → AC: sinkron dengan window store.
- **FR-D3** Auto-hide saat ada jendela maximized, muncul saat pointer di tepi bawah. → AC: bisa dimatikan di Settings.
- **FR-D4** Mobile: dock 4 app (About, Projects, Resume, Contact) + search pill. → AC: target sentuh ≥ 48 dp.

### 9.2 Rado Notch (SYS-06)
- **FR-N1** Empat state (`idle/peek/active/expanded`) dengan ukuran sesuai `DESIGN.md §4.2`. → AC: transisi spring; reduce-motion = instan.
- **FR-N2** `notch.show(event)` dapat dipanggil dari app mana pun; antrean maks 3, prioritas `high` menyela. → AC: uji unit untuk antrean.
- **FR-N3** Event otomatis: unduh CV, pesan terkirim/gagal, ganti tema/bahasa, buka tautan eksternal, "Welcome" saat boot selesai. → AC: tiap event muncul tepat sekali.
- **FR-N4** Modul `expanded` (Status, Now building, Quick contact, Resume, Activity). → AC: minimal Status + Quick contact + Resume di v1.0.
- **FR-N5** Slot UI kustom: komponen notch buatan sendiri mengimplementasikan `NotchSlotProps` tanpa mengubah `NotchHost`. → AC: mengganti `NotchSlot` tidak memerlukan perubahan di shell.
- **FR-N6** Aksesibilitas: `role="status"`, `aria-live`, fokus keyboard, `Esc` menutup. → AC: lolos audit axe.

### 9.3 Window manager — desktop (SYS-03)
- **FR-W1** Banyak jendela sekaligus; klik = fokus; z-order konsisten. **FR-W2** Drag/resize/maximize/minimize/close. **FR-W3** Posisi awal berjenjang (cascade 28 px) dan tidak keluar layar. **FR-W4** Jendela tidak bergeser saat resize browser; bila viewport mengecil, jendela dijepit ke dalam layar. **FR-W5** Hash URL mengikuti jendela fokus. → AC: reload dengan hash membuka app yang sama.

### 9.4 Navigasi — mobile (SYS-04)
- **FR-M1** Stack navigasi; tombol/gestur back bekerja (termasuk `popstate`). **FR-M2** Container transform dari ikon. **FR-M3** Predictive back (gestur tepi + fallback tombol). **FR-M4** Pull-down shade dengan Quick Settings dan riwayat Notch. **FR-M5** Recents (carousel) dari gestur gesture-pill. → AC: tidak ada "dead end"; selalu bisa kembali ke home.

---

## 10. Persyaratan non-fungsional

| Kategori | Persyaratan |
|---|---|
| **Performa** | JS awal ≤ 200 KB gzip; chunk per app ≤ 60 KB gzip; LCP < 2,5 s pada 4G; CLS < 0,1; INP < 200 ms; wallpaper WebP ≤ 250 KB; boot tidak memblokir render konten (konten di-preload di balik boot) |
| **Aksesibilitas** | WCAG 2.2 AA; navigasi keyboard penuh di desktop; `prefers-reduced-motion`; target sentuh ≥ 48 dp; Classic view sebagai jalur setara |
| **SEO** | Halaman Classic dirender saat build (SSG) lewat Next.js; `metadata`/`generateMetadata` per rute (title, description, OG, canonical); JSON-LD `Person`; `app/sitemap.ts`, `app/robots.ts`; konten CV ada di HTML awal (bukan hanya setelah JS) |
| **Kompatibilitas** | Chrome/Edge/Firefox 2 versi terakhir; Safari 16+ (macOS/iOS); Chrome Android; fallback solid bila `backdrop-filter` tidak didukung |
| **Responsif** | 320 px – 3840 px; orientasi landscape ponsel memakai layout medium |
| **Keamanan** | Tautan eksternal `rel="noopener noreferrer"`; CSP ketat; form dengan honeypot; tidak menyimpan data pribadi pengunjung |
| **Privasi** | Analytics tanpa cookie (Plausible/Umami/Cloudflare Web Analytics); tidak ada pelacak iklan |
| **Pemeliharaan** | Semua konten di `src/data/`; menambah proyek = menambah 1 objek; CI menjalankan lint, type-check, Lighthouse CI |
| **Internasionalisasi** | String di file JSON per bahasa (`en.json`, `id.json`); tanggal diformat dengan `Intl.DateTimeFormat` |
| **Offline** | Service worker meng-cache app shell + data + CV PDF |

---

## 11. Arsitektur informasi & teknis

### 11.1 Rute (hash) dan deep link

| Hash | Hasil |
|---|---|
| `#` | Desktop / home screen |
| `#about` | App About |
| `#experience` · `#experience/<slug>` | App Experience (+ item) |
| `#projects` · `#projects/<slug>` | App Projects (+ detail) |
| `#skills` | App Skills |
| `#resume` | App Resume |
| `#contact` | App Contact |
| `#terminal` | App Terminal |
| `#settings` | App Settings |
| `/classic` | Halaman biasa (SSG) — path sungguhan, bukan hash |

> **Catatan Next.js:** hash (`#about`) tidak terlihat oleh server, jadi **hanya dibaca di client** (`window.location.hash` + event `hashchange`) oleh shell OS. Rute dengan path sungguhan (`/classic`, `/classic/projects/[slug]`) dirender saat build dengan `generateStaticParams`.

Slug proyek: `rado-dev`, `sigizi`, `smileshop`, `monggosare`, `titik-makan`. Slug pengalaman: `mariban`, `kawan-kerja`, `bangkit`, `detik`, `bytesfest`.

### 11.2 Stack

| Lapisan | Pilihan |
|---|---|
| Framework | **Next.js 16 (App Router)** + React 19 + TypeScript (Turbopack bawaan) |
| Styling | Tailwind CSS v4 + CSS variables token (`DESIGN.md §3`) |
| Animasi | `motion` (spring) |
| State | `zustand` (window store, prefs, notch) |
| Drag/resize | `react-rnd` |
| Palette | `cmdk` |
| Warna dinamis | `@material/material-color-utilities` |
| PDF | `pdfjs-dist` (lazy) atau `<object>` + fallback |
| i18n | `i18next` atau kamus JSON sederhana |
| Rendering | Halaman Classic = Server Component, dirender saat build (SSG). Shell OS = Client Component (`"use client"`), dimuat dengan `dynamic(..., { ssr: false })` |
| Hosting | **Netlify** (adapter Next.js/OpenNext otomatis, tanpa konfigurasi tambahan) |
| Analytics | Plausible / Umami / Cloudflare Web Analytics |
| Form | **Formspree** (default; tidak perlu Route Handler). Netlify Forms butuh penyesuaian khusus di Next.js |
| Font | `next/font` (Inter, Roboto Flex via Google; Cascadia Code via `next/font/local`) |
| Gambar | `next/image` (wallpaper, foto) — dengan `output: 'export'` pakai `images.unoptimized: true` |
| QA | Vitest, Playwright (E2E: buka app, drag, notch), axe-core, Lighthouse CI, ESLint (flat config `eslint.config.mjs`) |

### 11.3 Model data (cuplikan)

```ts
export type Level = 'competent' | 'novice' | 'tool';

export interface Experience {
  slug: string; role: string; org: string; location?: string;
  start: string; end: string | 'present';          // ISO yyyy-mm
  bullets: { en: string; id: string }[];
  type: 'work' | 'internship' | 'event';
}

export interface Project {
  slug: string; title: string; category: 'web' | 'mobile';
  summary: { en: string; id: string };
  stack: string[]; role?: string;
  links: { live?: string; source?: string; video?: string };
  images: string[];
}

export interface Skill { name: string; level: Level; icon: string; related: string[] }
```

---

### 11.4 Ketentuan Next.js

**Keputusan:** memakai **Next.js 16 App Router** di atas Netlify. Netlify mendukung Next.js 16 tanpa konfigurasi tambahan, dan dari v15 ke v16 tidak perlu mengubah pengaturan Netlify.

#### a. Strategi rendering

| Bagian | Jenis | Alasan |
|---|---|---|
| `app/layout.tsx` | Server Component | `<html>`, font, metadata, skrip tema/shell |
| `app/page.tsx` (OS) | Server Component tipis yang memuat `<OSRoot />` | HTML awal = splash/boot ringan |
| `OSRoot` (shell, window manager, Dock, Notch, apps) | **Client Component** (`"use client"`), `dynamic(..., { ssr: false })` | Memakai `window`, `matchMedia`, drag, spring |
| `app/classic/**` | **Server Component**, SSG | SEO, tanpa JS wajib |
| `src/data/*` | Modul TS murni | Dipakai server dan client |

**Mode output (v1):** `output: 'export'` (situs statis penuh), karena:
- paling mirip perilaku situs Vite yang sekarang, paling murah, tanpa cold start;
- form memakai Formspree, jadi tidak butuh Route Handler;
- semua halaman diketahui saat build.

Beralih ke mode server (tanpa `output: 'export'`) hanya bila butuh: AI Assistant (APP-09), proxy API, atau Image Optimization bawaan. Adapter Netlify menangani itu tanpa konfigurasi tambahan.

Konsekuensi `output: 'export'`: tidak ada Route Handler dinamis, tidak ada middleware, `images.unoptimized: true`, dan hanya rute yang dapat diprediksi saat build.

#### b. Struktur rute

```
app/
  layout.tsx            # html, body, next/font, skrip tema+shell, metadata dasar
  page.tsx              # OS (memuat <OSRoot/>)
  classic/
    page.tsx            # CV lengkap (server)
    projects/[slug]/page.tsx   # generateStaticParams dari data/projects.ts
  manifest.ts           # PWA manifest
  sitemap.ts
  robots.ts
  opengraph-image.png   # OG image statis
  icon.png  apple-icon.png
```

#### c. Aturan hydration (wajib, mencegah error dan kedip)

1. Kode yang membaca `window`, `document`, `localStorage`, `matchMedia`, atau waktu/acak **hanya** berjalan di `useEffect` atau di komponen yang dimuat `ssr: false`.
2. **Tema dan shell** ditentukan oleh **skrip inline di `<head>`** sebelum cat pertama: membaca `localStorage` + `matchMedia`, lalu mengisi `data-theme` dan `data-shell` pada `<html>`. `<html>` diberi `suppressHydrationWarning`.
3. Jam di Tray, durasi pengalaman ("12 mo"), dan sapaan waktu dirender **setelah mount**.
4. Jangan memakai `Math.random()` atau `new Date()` di render untuk konten yang ikut dirender server.
5. Library browser-only (three.js/react-three-fiber untuk komponen `lanyard`, `react-rnd`, `pdfjs-dist`) dimuat dengan `dynamic(..., { ssr: false })`.

#### d. Pemisahan komponen shared

Tiap Content View dipecah dua agar bisa dipakai Classic (server) dan OS (client):

```
apps/projects/
  ProjectsView.tsx      # presentasional, tanpa hooks/browser API (bisa Server Component)
  ProjectsApp.tsx       # "use client": integrasi window/stack, filter, notch.show()
```

`ProjectsView` hanya memakai token `--rn-*` dan data. `ProjectsApp` membungkusnya dengan interaksi.

#### e. Migrasi dari Vite (proyek `rado-portfolio`)

| Langkah | Detail |
|---|---|
| 1. Branch | Kerjakan di branch/repo baru (`next-migration`). `main` tetap live |
| 2. Dependensi | `npm i next@latest react react-dom`; hapus `vite`, `@vitejs/plugin-react` |
| 3. Skrip | `dev: next dev` · `build: next build` · `start: next start` |
| 4. Entry | Hapus `index.html`, `main.jsx`, `vite.config.js`; buat `app/layout.tsx` + `app/page.tsx` |
| 5. Jalur cepat | Muat `App.jsx` lama lewat `dynamic(() => import('@/src/App'), { ssr: false })` agar langsung jalan; refactor bertahap |
| 6. Env | `import.meta.env.VITE_*` → `process.env.NEXT_PUBLIC_*` |
| 7. Aset | Impor gambar menghasilkan objek di Next.js: pakai `.src` atau `next/image` |
| 8. Routing | React Router boleh dipertahankan sementara (client-only); target akhir: hash untuk OS, file-based untuk Classic |
| 9. Tailwind | Jika v4: konfigurasi lewat PostCSS (`@tailwindcss/postcss`), bukan plugin Vite |
| 10. ESLint | Ganti `.eslintrc.cjs` dengan konfigurasi flat bawaan Next.js |
| 11. Blog | Putuskan: dipindah ke rute Next.js (disarankan) atau dinonaktifkan sementara |
| 12. Netlify | Hapus aturan SPA lama (`/* /index.html 200`) di `_redirects`/`netlify.toml`; jangan paksa publish directory `dist`; setel `NODE_VERSION` ke versi yang didukung Next.js 16 (≥ 20.9) |
| 13. Preview | Aktifkan Deploy Preview; uji di URL preview; merge ke `main` setelah lolos QA |
| 14. Rollback | Siapkan deploy Vite terakhir di riwayat Netlify untuk dipublish ulang bila perlu |

**Kriteria penerimaan migrasi:** `next build` lolos tanpa error; tidak ada hydration warning di console; Lighthouse ≥ target §3.3; semua deep link hash dan `/classic` berfungsi; situs lama tidak mengalami downtime.

#### f. Konfigurasi minimal

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // hapus bila butuh server (AI Assistant, dll.)
  images: { unoptimized: true }, // wajib saat output: 'export'
  reactStrictMode: true,
  // reactCompiler: true,        // opsional, setelah QA
};
export default nextConfig;
```

```html
<!-- skrip inline di <head> (app/layout.tsx), dijalankan sebelum cat pertama -->
<script>
  try {
    var t = localStorage.getItem('theme');
    if (!t || t === 'system') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var s = localStorage.getItem('shell');
    if (!s || s === 'auto') s = matchMedia('(min-width:1024px) and (pointer:fine)').matches ? 'windows' : 'android';
    document.documentElement.dataset.theme = t;
    document.documentElement.dataset.shell = s;
  } catch (e) {}
</script>
```

---

## 12. Celah konten & keputusan yang perlu kamu ambil

Temuan dari membaca `CV_Rado.pdf`. Sebagian besar harus beres **sebelum** konten dikunci.

| # | Temuan | Saran |
|---|---|---|
| 1 | **ReactJS tidak konsisten.** Ringkasan menyebut "Proficient in Kotlin, ReactJS", tapi daftar skills menaruh ReactJS di **Novice**, padahal portofolio sendiri dibangun dengan React. | Pilih satu level (mis. naikkan ke Competent jika memang dipakai di Kawan Kerja/Mariban) dan samakan di CV + situs. |
| 2 | **Klaim "from beginner to expert"** (Bangkit) bertabrakan dengan skills "Competent". | Pakai "from beginner to confident in Android development" atau tonjolkan hasil nyata (siGizi). |
| 3 | **Tidak ada email/telepon di CV.** | Tentukan email profesional untuk form dan tombol *Email*. |
| 4 | **Typo di CV dan portofolio:** "Portofilio", "Taillwind", "Firbase", "Sponshorship", "Maka a list". | Sudah dirapikan di §7; perbarui juga PDF yang dipakai di app Resume. |
| 5 | **Kalimat terpotong:** Kawan Kerja & Mariban ("...mockups into efficient" tanpa objek). | Sudah dilengkapi di §7.3 ("...menjadi UI yang efisien"); konfirmasi maknanya. |
| 6 | **Tautan proyek hilang** untuk siGizi, SmileShop, Monggosare, Titik Makan. | Tambahkan repo GitHub/demo; tanpa tautan, kartu hanya menampilkan deskripsi. |
| 7 | **Tidak ada hasil terukur** (angka, dampak). | Tambahkan 1 angka per pengalaman bila ada (mis. jumlah halaman, pengguna, skor Lighthouse). |
| 8 | **Proyek siGizi:** CV menyebut Kotlin + XML + **JavaScript** dan ML. | Jelaskan peran JS (backend/API?) dan model ML apa yang dipakai. |
| 9 | **Lokasi:** Surakarta (kuliah) vs Bandung (kerja). | Putuskan lokasi utama di Notch dan About (usul: "Surakarta · bekerja di Bandung"). |
| 10 | **Foto & wallpaper** perlu dibuat/dipilih (lisensi). | Lihat `DESIGN.md §9`. |
| 11 | **Aset merek:** jangan pakai logo Windows/Android. | Logo "R" + ikon app kustom. |
| 12 | **Tagline** belum ada di CV. | Usulan: "Frontend & Android Developer"; sesuaikan. |

---

## 13. Analytics & privasi

Event yang dilacak (tanpa data pribadi): `app_open{app}`, `shell{windows|android}`, `classic_view_open`, `cv_download{source}`, `contact_submit{ok|fail}`, `link_click{target}`, `terminal_cmd{name}`, `theme_change`, `lang_change`, `notch_expand`. Corong utama: **kunjungan → buka ≥ 1 app → buka Experience/Projects → klik CTA**. Tampilkan catatan singkat "No cookies, no tracking" di Settings → About.

---

## 14. Risiko & mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Metafora OS membingungkan / lambat bagi recruiter | Konten tidak terbaca | Classic view mudah dijangkau; boot bisa di-skip; app pertama (About) terbuka otomatis di desktop |
| SEO buruk karena SPA | Tidak terindeks | SSG untuk `/classic` + JSON-LD; konten ada di HTML awal |
| `backdrop-filter` berat di perangkat low-end | Jank | Maks. 4 elemen blur; fallback solid; deteksi `deviceMemory`/FPS untuk "lite mode" |
| Ruang lingkup membengkak (ingin meniru OS terlalu detail) | Rilis molor | Patuhi prioritas P0/P1/P2; tiap fitur P2 diblok sampai rilis |
| Pelanggaran merek dagang | Takedown | Aset kustom; tidak ada logo/wallpaper resmi |
| Bahasa Inggris vs Indonesia tidak konsisten | Kesan tidak profesional | Satu kamus i18n; review ulang sebelum rilis |
| Gestur mobile (predictive back) bentrok dengan gestur browser | UX rusak | Tangani `popstate`; uji di Chrome Android dan Safari iOS; fallback tombol back |
| Iframe demo ditolak (`X-Frame-Options`) | Jendela kosong | Deteksi lalu buka tab baru |
| Hydration mismatch (komponen memakai `window`/`matchMedia`/waktu) | Error console, layout melompat | Aturan §11.4c; `ssr: false` untuk shell; skrip inline tema+shell |
| Migrasi Vite → Next.js merusak situs yang sedang live | Downtime, kehilangan trafik | Branch terpisah + Deploy Preview; rollback lewat riwayat deploy Netlify |
| Library 3D/PDF tidak kompatibel dengan SSR | Build gagal | Muat dengan `dynamic(..., { ssr: false })` |
| `output: 'export'` membatasi fitur server | AI Assistant tidak bisa | Pindah ke mode server di Netlify saat P2 dikerjakan |

---

## 15. Rencana rilis

Perkiraan untuk satu developer paruh waktu (~15–20 jam/minggu).

| Fase | Minggu | Output | Definition of done |
|---|---|---|---|
| **0 — Persiapan** | 1 | Keputusan §12, `src/data/*`, aset (logo, ikon, foto, wallpaper), desain notch kustom, **branch `next-migration` + Deploy Preview Netlify (§11.4e)** | Data & aset final; token CSS terkirim; app Next.js kosong ter-deploy di preview |
| **1 — Fondasi** | 2–3 | Token, skrip tema+shell (tanpa kedip), shell switcher, window store, Dock, Tray, Window, **NotchHost** | Dapat membuka/menutup/drag 2 app dummy; notch 4 state jalan; **tanpa hydration warning** |
| **2 — Aplikasi P0 (desktop)** | 4–5 | About, Experience, Projects, Skills, Resume, Contact, Settings, deep link | Semua konten CV tampil; CTA berfungsi |
| **3 — Android shell** | 6 | Home, grid, container transform, predictive back, scaffold, Quick Shade | Semua app P0 dapat dipakai di 360×800 |
| **4 — Polish & kualitas** | 7 | Classic view + SSG, i18n, PWA, Terminal, Start menu, palette, a11y, Lighthouse, E2E | Metrik §3.3 terpenuhi di staging |
| **5 — Rilis** | 8 | Domain, analytics, OG image, update link di LinkedIn/CV | Live; pantau 30 hari |
| **Pasca-rilis** | — | P2: AI Assistant, Photos, Games, Snap layouts, Bubbles, lock screen | Per fitur |

---

## 16. Pertanyaan terbuka

1. Desain **Rado Notch** kustom: siapa/di mana sumber visualnya (Figma)? Modul mana yang akan dipakai?
2. Email profesional dan layanan form yang dipilih?
3. Domain: tetap `radositumorang.netlify.app` atau domain baru (mis. `rado.dev`)?
4. Bahasa default: EN (sesuai CV) atau ID?
5. Apakah semua proyek boleh dipublikasikan source-nya (terutama proyek perusahaan: Kawan Kerja, Mariban)?
6. Apakah ingin app **AI Assistant** (butuh backend/proxy API dan anggaran) di v1.1? Bila ya, `output: 'export'` perlu dilepas.
7. Mulai dari jalur cepat (membungkus `App.jsx` lama, §11.4e langkah 5) atau langsung menulis ulang per komponen?
8. Folder `blog` yang sekarang: dipindahkan ke Next.js atau ditunda?

---

## 17. Lampiran — microcopy awal

| Konteks | EN | ID |
|---|---|---|
| Boot | "Starting RadoOS…" | "Memulai RadoOS…" |
| Welcome (Notch) | "Welcome · Open to work" | "Selamat datang · Terbuka untuk kerja" |
| Start → tombol | "Hire me" | "Rekrut saya" |
| Download CV (toast) | "CV downloaded" | "CV terunduh" |
| Pesan terkirim | "Message sent — thanks!" | "Pesan terkirim — terima kasih!" |
| Pesan gagal | "Couldn't send. Try email instead." | "Gagal mengirim. Coba lewat email." |
| Classic view | "Switch to classic view" | "Beralih ke tampilan klasik" |
| Terminal welcome | `RadoOS · type help` | `RadoOS · ketik help` |
| Terminal tidak dikenal | `command not found: x — try help` | `perintah tidak ditemukan: x — coba help` |
| Tab/JSON-LD title | "Rado Situmorang — Frontend & Android Developer" | sama |
