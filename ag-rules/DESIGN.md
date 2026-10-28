# DESIGN.md — RadoOS Portfolio Design System

> **Proyek:** Portofolio interaktif Rado Nelson Dela Sadrak Situmorang
> **Konsep:** "RadoOS" — portofolio yang berperilaku seperti sistem operasi.
> **Desktop:** Windows 11 (Fluent 2) · **Mobile:** Android 17 (Material 3 Expressive)
> **Ciri khas:** Dock kustom (menggantikan taskbar) + **Rado Notch** (UI notch buatan sendiri)
> **Versi dokumen:** 1.1 (menambahkan ketentuan Next.js) · **Tanggal:** 28 Okt 2026
> **Pembaca utama:** developer (kamu) dan AI coding agent (Claude Code, Cursor, dll.) yang akan mengimplementasikan UI.

Dokumen ini adalah *sumber kebenaran* untuk semua keputusan visual dan interaksi. Konten (teks CV, proyek, link) ada di `PRD.md`.

---

## 0. Referensi versi platform

| Platform | Target | Catatan |
|---|---|---|
| Windows 11 | 25H2 / 26H2 | Bahasa desain **Fluent 2** tetap sama di keduanya. 26H1 hanya untuk perangkat Snapdragon X2 dan bukan acuan desain. |
| Android | **Android 17** (stabil sejak 16–17 Juni 2026) | Bahasa desain **Material 3 Expressive** (M3E), yang sudah menjadi baseline sejak Android 16 QPR1. Fitur sistem baru yang relevan: **Bubbles** (jendela mengambang), windowing desktop, predictive back, edge-to-edge wajib. |

**Aturan trademark:** jangan memakai logo Windows, logo Android/robot Android, wallpaper "Bloom", atau ikon bawaan Microsoft/Google yang berlisensi tertutup. Kita **meniru bahasa desain dan perilakunya**, bukan aset mereknya. Semua logo, wallpaper, dan ikon aplikasi harus buatan sendiri atau berlisensi terbuka (lihat §9).

---

## 1. Konsep & prinsip desain

### 1.1 Satu konten, dua shell
Konten portofolio (About, Experience, Projects, dst.) ditulis **sekali** sebagai komponen *view*. Dua **shell** membungkusnya:

```
┌────────────────────────── Content Views (shared) ──────────────────────────┐
│  AboutView  ExperienceView  ProjectsView  SkillsView  ResumeView  ContactView │
└───────────────┬───────────────────────────────────────────┬────────────────┘
                │                                           │
     ┌──────────▼──────────┐                     ┌──────────▼──────────┐
     │  WindowsShell       │                     │  AndroidShell       │
     │  (≥ 1024px, pointer)│                     │  (< 1024px, touch)  │
     │  Dock · Tray · Start│                     │  Home · Shade · Nav │
     │  Widgets · Windows  │                     │  App screens        │
     └──────────┬──────────┘                     └──────────┬──────────┘
                └──────────────► Rado Notch ◄───────────────┘
                          (komponen identitas, ada di kedua shell)
```

### 1.2 Prinsip
1. **Familiar dalam 3 detik.** Pengunjung (recruiter, klien) harus langsung paham: klik ikon → jendela/app terbuka.
2. **Konten dulu, hiasan kemudian.** OS-metaphor tidak boleh menyembunyikan CV. Setiap app punya judul jelas, isi bisa dipindai, dan ada tombol "Classic view" (halaman biasa).
3. **Otentik tapi bukan salinan.** Ikuti proporsi, radius, tipografi, dan motion platform aslinya; ganti semua aset merek dengan identitas Rado.
4. **Dock dan Notch = tanda tangan.** Dua elemen ini yang paling kustom dan paling diingat. Semua yang lain boleh "standar OS".
5. **Cepat dan hemat.** Animasi hanya `transform`/`opacity`. Setiap app dimuat *lazy*.
6. **Aksesibel.** Kontras AA, fokus terlihat, `prefers-reduced-motion` dihormati, semua bisa dipakai dengan keyboard (desktop) dan target sentuh ≥ 48 px (mobile).

---

## 2. Platform, breakpoint, dan deteksi shell

| Nama | Lebar viewport | Shell | Catatan |
|---|---|---|---|
| `phone` | 0–599 | AndroidShell (compact) | Home screen 4 kolom, navigation bar bawah |
| `tablet` | 600–1023 | AndroidShell (medium/expanded) | Navigation rail, panel ganda (list-detail), mendukung Bubbles |
| `desktop` | 1024–1919 | WindowsShell | Jendela mengambang |
| `wide` | ≥ 1920 | WindowsShell | Jendela default lebih besar, widget board lebih lebar |

**Logika pemilihan shell** (urutan prioritas):
1. Override manual dari Settings → "Shell: Auto / Windows / Android" (disimpan di `localStorage`).
2. `matchMedia('(min-width: 1024px) and (pointer: fine)')` → Windows.
3. Selain itu → Android.

> **Next.js:** pemilihan shell dan tema harus ditetapkan **sebelum cat pertama** lewat skrip inline di `<head>` yang mengisi `data-shell` dan `data-theme` pada `<html>` (lihat `PRD.md §11.4c, f`). Pohon React shell dimuat di client saja (`ssr: false`) dengan splash/boot sebagai fallback, sehingga tidak ada hydration mismatch dan tidak ada kedip tema.

Tablet dengan keyboard + mouse boleh masuk Windows shell lewat aturan nomor 2. Resize jendela browser melewati 1024 px harus *menukar shell dengan transisi cross-fade 250 ms* dan **mempertahankan app yang sedang terbuka** (state di store global, bukan di komponen shell).

---

## 3. Design tokens

Tiga lapis: **primitif → semantik (shared) → shell-spesifik.**

### 3.1 Primitif warna (merek)

```css
:root {
  /* Brand — satu aksen untuk dua OS */
  --brand-50:  #EAF1FF;
  --brand-100: #D3E3FD;
  --brand-200: #A8C7FA;
  --brand-300: #7CACF8;
  --brand-400: #4C8DF6;
  --brand-500: #1A73E8;
  --brand-600: #0B57D0;   /* ← seed / aksen light */
  --brand-700: #0842A0;
  --brand-800: #062E6F;
  --brand-900: #041E49;

  /* Netral hangat-dingin (dipakai Windows shell) */
  --gray-0:   #FFFFFF;
  --gray-50:  #FBFBFB;
  --gray-100: #F3F3F3;   /* Mica light */
  --gray-200: #E5E5E5;
  --gray-400: #9E9E9E;
  --gray-600: #5C5C5C;
  --gray-800: #2C2C2C;   /* flyout dark */
  --gray-900: #202020;   /* Mica dark */
  --gray-1000:#000000;   /* Notch */

  /* Status */
  --green-600: #0F7B0F;  --green-300: #6CCB5F;
  --red-600:   #C42B1C;  --red-300:   #FF99A4;
  --amber-700: #9D5D00;  --amber-300: #FCE100;
}
```

> **Seed M3:** `#0B57D0`. Tabel peran warna Android di §3.3 adalah *snapshot rujukan*. Di kode, hasilkan palet dinamis dengan `@material/material-color-utilities` (`themeFromSourceColor`) agar konsisten saat user mengganti aksen.

### 3.2 Token semantik (shared) — dipakai oleh Content Views

Content Views **hanya boleh memakai token `--rn-*`** ini. Shell yang memetakan token ke Fluent atau M3.

```css
/* ===== Shared semantic tokens ===== */
:root {
  --rn-bg:            var(--shell-bg);
  --rn-surface:       var(--shell-surface);
  --rn-surface-alt:   var(--shell-surface-alt);
  --rn-text:          var(--shell-text);
  --rn-text-muted:    var(--shell-text-muted);
  --rn-border:        var(--shell-border);
  --rn-accent:        var(--shell-accent);
  --rn-on-accent:     var(--shell-on-accent);
  --rn-accent-soft:   var(--shell-accent-soft);
  --rn-success:       var(--shell-success);
  --rn-danger:        var(--shell-danger);
  --rn-radius-card:   var(--shell-radius-card);
  --rn-radius-control:var(--shell-radius-control);
  --rn-focus:         var(--shell-focus);
}
```

### 3.3 Token shell Windows 11 (Fluent 2)

```css
[data-shell="windows"][data-theme="light"] {
  --shell-bg:           #F3F3F3;                    /* Mica base */
  --shell-surface:      #FFFFFF;
  --shell-surface-alt:  rgba(255,255,255,.70);      /* Card */
  --shell-text:         #1A1A1A;                    /* ≈ rgba(0,0,0,.90) */
  --shell-text-muted:   #5C5C5C;                    /* ≈ rgba(0,0,0,.61) */
  --shell-text-disabled:rgba(0,0,0,.36);
  --shell-border:       rgba(0,0,0,.058);
  --shell-border-strong:rgba(117,117,117,.40);
  --shell-accent:       #0B57D0;
  --shell-on-accent:    #FFFFFF;
  --shell-accent-soft:  rgba(11,87,208,.10);
  --shell-success:      #0F7B0F;
  --shell-danger:       #C42B1C;
  --shell-focus:        #000000;                    /* ring dalam; ring luar putih */
  --acrylic-bg:         rgba(252,252,252,.72);      /* flyout, dock, start */
  --acrylic-border:     rgba(0,0,0,.06);
  --control-fill:       rgba(255,255,255,.70);
  --control-fill-hover: rgba(249,249,249,.50);
  --control-fill-press: rgba(249,249,249,.30);
  --shell-radius-card:    8px;
  --shell-radius-control: 4px;
}

[data-shell="windows"][data-theme="dark"] {
  --shell-bg:           #202020;
  --shell-surface:      #2B2B2B;
  --shell-surface-alt:  rgba(255,255,255,.051);
  --shell-text:         #FFFFFF;
  --shell-text-muted:   rgba(255,255,255,.787);
  --shell-text-disabled:rgba(255,255,255,.363);
  --shell-border:       rgba(255,255,255,.070);
  --shell-border-strong:rgba(117,117,117,.40);
  --shell-accent:       #A8C7FA;
  --shell-on-accent:    #000000;
  --shell-accent-soft:  rgba(168,199,250,.16);
  --shell-success:      #6CCB5F;
  --shell-danger:       #FF99A4;
  --shell-focus:        #FFFFFF;
  --acrylic-bg:         rgba(32,32,32,.72);
  --acrylic-border:     rgba(255,255,255,.08);
  --control-fill:       rgba(255,255,255,.061);
  --control-fill-hover: rgba(255,255,255,.084);
  --control-fill-press: rgba(255,255,255,.033);
}
```

**Material (efek kaca):**

| Nama | Dipakai di | Resep CSS |
|---|---|---|
| Mica (aproksimasi) | Title bar, latar jendela | `background: var(--shell-bg)` + overlay tint 4% dari warna dominan wallpaper |
| Acrylic | Dock, Start, Widgets, Flyout, Context menu | `background: var(--acrylic-bg); backdrop-filter: blur(30px) saturate(1.25); border: 1px solid var(--acrylic-border)` |
| Smoke | Backdrop dialog modal | `background: rgba(0,0,0,.30)` |

> Mica asli tidak mungkin di web. Gunakan warna solid + sedikit tint. **Batasi `backdrop-filter` maksimal 4 elemen aktif sekaligus** (dock, tray, 1 flyout, notch tidak pakai) demi performa.

### 3.4 Token shell Android 17 (Material 3 Expressive)

Snapshot rujukan (seed `#0B57D0`):

| Peran | Light | Dark |
|---|---|---|
| primary | `#0B57D0` | `#A8C7FA` |
| on-primary | `#FFFFFF` | `#062E6F` |
| primary-container | `#D3E3FD` | `#0842A0` |
| on-primary-container | `#041E49` | `#D3E3FD` |
| secondary | `#00639B` | `#7FCFFF` |
| on-secondary | `#FFFFFF` | `#00354A` |
| secondary-container | `#C2E7FF` | `#004A77` |
| on-secondary-container | `#001D35` | `#C2E7FF` |
| tertiary | `#146C2E` | `#6DD58C` |
| tertiary-container | `#C4EED0` | `#0F5223` |
| error | `#B3261E` | `#F2B8B5` |
| error-container | `#F9DEDC` | `#8C1D18` |
| surface / background | `#F8FAFD` | `#131314` |
| surface-container-lowest | `#FFFFFF` | `#0E0E0F` |
| surface-container-low | `#F3F6FB` | `#1B1B1D` |
| surface-container | `#ECF0F7` | `#1E1F20` |
| surface-container-high | `#E6EAF2` | `#282A2C` |
| surface-container-highest | `#E0E4EC` | `#333537` |
| on-surface | `#1A1C1E` | `#E3E3E3` |
| on-surface-variant | `#43474E` | `#C4C7C5` |
| outline | `#73777F` | `#8E918F` |
| outline-variant | `#C3C7CF` | `#444746` |
| inverse-surface | `#2F3133` | `#E3E3E3` |
| scrim | `#000000` | `#000000` |

Pemetaan ke token semantik:

```css
[data-shell="android"] {
  --shell-bg:           var(--md-surface);
  --shell-surface:      var(--md-surface-container);
  --shell-surface-alt:  var(--md-surface-container-high);
  --shell-text:         var(--md-on-surface);
  --shell-text-muted:   var(--md-on-surface-variant);
  --shell-border:       var(--md-outline-variant);
  --shell-accent:       var(--md-primary);
  --shell-on-accent:    var(--md-on-primary);
  --shell-accent-soft:  var(--md-primary-container);
  --shell-success:      var(--md-tertiary);
  --shell-danger:       var(--md-error);
  --shell-focus:        var(--md-primary);
  --shell-radius-card:    var(--md-shape-large);      /* 16 */
  --shell-radius-control: var(--md-shape-full);
}
```

### 3.5 Tipografi

| | Windows shell | Android shell | Kode / Terminal |
|---|---|---|---|
| Keluarga | `"Segoe UI Variable", "Segoe UI", Inter, system-ui, sans-serif` | `"Roboto Flex", Roboto, system-ui, sans-serif` | `"Cascadia Code", "JetBrains Mono", ui-monospace, monospace` |
| Sumber web-font | Inter (fallback untuk non-Windows) | Roboto Flex (variable) | Cascadia Code (OFL) |
| Pemuatan (Next.js) | `next/font/google` → `--font-inter` | `next/font/google` → `--font-roboto-flex` | `next/font/local` → `--font-cascadia` |

> Segoe UI tidak boleh di-embed di web. Di Windows ia terpakai otomatis; di OS lain jatuh ke Inter. Muat Inter dan Roboto Flex dengan `font-display: swap` dan *subset* Latin.

**Skala Fluent (Windows):**

| Token | Ukuran / Line-height | Berat |
|---|---|---|
| `caption` | 12 / 16 | 400 |
| `body` | 14 / 20 | 400 |
| `body-strong` | 14 / 20 | 600 |
| `body-large` | 18 / 24 | 400 |
| `subtitle` | 20 / 28 | 600 |
| `title` | 28 / 36 | 600 |
| `title-large` | 40 / 52 | 600 |
| `display` | 68 / 92 | 600 |

**Skala Material 3 (Android):**

| Token | Ukuran / LH | Berat |
|---|---|---|
| Display L / M / S | 57/64 · 45/52 · 36/44 | 400 |
| Headline L / M / S | 32/40 · 28/36 · 24/32 | 400 |
| Title L / M / S | 22/28 · 16/24 · 14/20 | 400 / 500 / 500 |
| Body L / M / S | 16/24 · 14/20 · 12/16 | 400 |
| Label L / M / S | 14/20 · 12/16 · 11/16 | 500 |

M3E menambahkan varian **emphasized** (berat +1 tingkat, mis. Headline emphasized = 600). Pakai untuk judul app dan angka penting.

### 3.6 Spasi, radius, ukuran

```css
:root {
  /* grid 4px */
  --sp-0:0; --sp-1:2px; --sp-2:4px; --sp-3:6px; --sp-4:8px; --sp-5:12px;
  --sp-6:16px; --sp-7:20px; --sp-8:24px; --sp-9:32px; --sp-10:40px; --sp-11:48px; --sp-12:64px;

  /* Fluent */
  --fl-radius-sm: 2px;
  --fl-radius-control: 4px;
  --fl-radius-overlay: 8px;      /* jendela, flyout */
  --fl-radius-dock: 20px;

  /* M3E shape scale */
  --md-shape-none: 0;
  --md-shape-xs: 4px;
  --md-shape-sm: 8px;
  --md-shape-md: 12px;
  --md-shape-large: 16px;
  --md-shape-large-inc: 20px;
  --md-shape-xl: 28px;
  --md-shape-xl-inc: 32px;
  --md-shape-xxl: 48px;
  --md-shape-full: 9999px;
}
```

**Ukuran target interaksi:** pointer ≥ 32×32 px · sentuh ≥ 48×48 dp.

### 3.7 Elevasi

**Windows (shadow berlapis):**

| Level | Dipakai di | CSS |
|---|---|---|
| `shadow-2` | Card | `0 0 2px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.14)` |
| `shadow-8` | Tombol floating, tooltip | `0 0 2px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.14)` |
| `shadow-16` | Flyout, menu | `0 0 2px rgba(0,0,0,.12), 0 8px 16px rgba(0,0,0,.14)` |
| `shadow-dock` | Dock | `0 8px 32px rgba(0,0,0,.28), 0 0 0 1px var(--acrylic-border)` |
| `shadow-window-active` | Jendela fokus | `0 0 8px rgba(0,0,0,.20), 0 32px 64px rgba(0,0,0,.30)` |
| `shadow-window-inactive` | Jendela tidak fokus | `0 0 4px rgba(0,0,0,.10), 0 16px 32px rgba(0,0,0,.18)` |

**Android:** elevasi dinyatakan lewat **warna** (`surface-container-*`), bukan bayangan, kecuali: FAB/menu/dialog `0 1px 2px rgba(0,0,0,.30), 0 2px 6px 2px rgba(0,0,0,.15)`.

### 3.8 Motion

**Windows (Fluent):**

| Token | Nilai |
|---|---|
| Durasi | `50 / 100 / 150 / 250 / 300 / 400 ms` (ultra-fast → slower) |
| `ease-decelerate` | `cubic-bezier(.1,.9,.2,1)` — elemen masuk |
| `ease-accelerate` | `cubic-bezier(1,0,1,1)` — elemen keluar |
| `ease-fast-invoke` | `cubic-bezier(0,0,0,1)` — jendela buka, flyout |
| `ease-point` | `cubic-bezier(.55,.55,0,1)` — gerak titik ke titik |

**Android (M3 Expressive — spring):**

| Token | Damping | Stiffness | Pemakaian |
|---|---|---|---|
| `spatial-fast` | 0.6 | 800 | Toggle, chip, ikon |
| `spatial-default` | 0.8 | 380 | Container transform, sheet |
| `spatial-slow` | 0.8 | 200 | Transisi layar penuh |
| `effects-fast` | 1.0 | 3800 | Opacity, warna cepat |
| `effects-default` | 1.0 | 1600 | Opacity, warna |
| `effects-slow` | 1.0 | 800 | Fade besar |

Implementasi web: `motion` (Framer Motion) `type: "spring", damping/stiffness` → ubah *damping ratio* ke `damping = ratio × 2 × √(stiffness × mass)` dengan `mass: 1`.

**Reduced motion:** bila `prefers-reduced-motion: reduce`, ganti semua spring/scale/slide dengan **fade 100 ms**; Notch tidak melakukan morph (langsung ganti ukuran).

### 3.9 Z-index

| Lapisan | z |
|---|---|
| Wallpaper | 0 |
| Desktop icon / widget tempel | 10 |
| Jendela (dikelola window manager) | 100–899 |
| Dock · Tray | 900 |
| Start · Widgets · Quick Settings flyout | 1000 |
| Context menu | 1100 |
| Tooltip | 1200 |
| **Rado Notch** | 1300 |
| Toast / notifikasi | 1350 |
| Boot / lock screen | 2000 |

---

## 4. Rado Notch — komponen identitas

Notch adalah UI buatan sendiri yang tampil di **kedua shell**. Dokumen ini mendefinisikan *kontrak* (ukuran, state, API, slot) sehingga desain visual notch milikmu bisa dipasang tanpa mengubah shell.

### 4.1 Perilaku konsep
- **Desktop:** menempel di tepi atas layar, tengah, seperti notch fisik laptop. Latar selalu hitam `#000` di kedua tema (terlihat seperti perangkat keras).
- **Mobile:** menyatu dengan *punch-hole camera* Android di tengah status bar, lalu memuai menjadi pill saat ada event.
- Ia adalah **pusat notifikasi ringan** portofolio: status ketersediaan kerja, proyek yang sedang dikerjakan, dan umpan balik aksi ("CV diunduh", "Tema diganti").

### 4.2 State

| State | Desktop (px) | Mobile (dp) | Trigger | Isi |
|---|---|---|---|---|
| `idle` | 168 × 32 | 28 × 28 (lingkaran) | Default | Titik status hijau kecil (tersedia kerja) |
| `peek` | 260 × 40 | 120 × 36 | Hover (desktop) · event ringan | Ikon + 1 baris teks |
| `active` | 420 × 96 | `min(92vw, 360)` × 72 | Event toast · klik | Ikon, judul, subjudul, 1 aksi |
| `expanded` | 560 × 220 | `min(92vw, 380)` × 168 | Klik saat `peek`/`active` · long-press | Modul penuh (§4.4) |

**Bentuk (desktop):** menempel di `top: 0`; sudut bawah `radius: 20 → 24 → 28 px` mengikuti state; sudut atas memakai *inverse curve* 12 px (pseudo-element) agar menyatu dengan tepi layar.
**Bentuk (mobile):** `border-radius: 9999px`; posisi `top: calc(env(safe-area-inset-top, 0px) + 6px)`.

### 4.3 Animasi
- Desktop: `width`, `height`, `border-radius` dianimasikan dengan `spring(damping .8, stiffness 380)`. Konten *cross-fade* 120 ms dengan jeda 60 ms agar tidak terlihat melompat.
- Mobile: spring `spatial-default`; saat `expanded` latar belakang diberi scrim 20%.
- Auto-collapse: `active` → `peek` setelah **4 detik**, `peek` → `idle` setelah **2,5 detik**. Pause saat hover/fokus.
- Antrean event: FIFO, maksimal 3 menunggu; event berprioritas `high` menyela.

### 4.4 Modul konten `expanded`

| Modul | Isi | Aksi |
|---|---|---|
| **Status** | "Open to work" (titik hijau) · lokasi "Surakarta, ID" | — |
| **Now building** | Proyek terbaru (CV Mariban Indonesia website) | Buka app Projects |
| **Quick contact** | Tombol: Email · LinkedIn · GitHub | Buka tautan / app Contact |
| **Resume** | "Download CV" | Unduh PDF → memicu toast `CV downloaded` |
| **Activity** | 3 event terakhir (riwayat toast) | — |

Modul dipilih lewat segmented control kecil atau swipe horizontal (mobile). Jika desain notch milikmu hanya punya sebagian modul, modul lain boleh dilewati.

### 4.5 API (kontrak untuk UI notch kustom)

```ts
type NotchState = 'idle' | 'peek' | 'active' | 'expanded';

interface NotchEvent {
  id: string;
  priority?: 'low' | 'normal' | 'high';
  icon?: string;                // nama ikon atau URL SVG
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;            // ms, default 4000
}

interface NotchSlotProps {
  state: NotchState;
  platform: 'windows' | 'android';
  bounds: { width: number; height: number; radius: number };  // dari §4.2
  event?: NotchEvent;
  onRequestState: (next: NotchState) => void;
}

// Pemakaian di seluruh app
notch.show({ title: 'CV downloaded', icon: 'download', priority: 'normal' });
notch.setState('expanded');
```

`<NotchHost>` mengelola state, antrean, dan animasi ukuran. UI notch kustom kamu cukup mengimplementasikan `NotchSlotProps` (hanya *isi*; ukuran dan morph tetap ditangani host).

### 4.6 Aksesibilitas notch
- `role="status"` + `aria-live="polite"` untuk event; `high` → `assertive`.
- Dapat difokuskan (`tabindex="0"`), `Enter/Space` = toggle `expanded`, `Esc` = tutup.
- Jangan mengandalkan warna saja (titik hijau selalu disertai teks "Open to work").
- Dengan reduced-motion: perubahan ukuran instan, tanpa spring.

---

## 5. Shell Windows 11 (desktop, ≥ 1024 px)

### 5.1 Anatomi layar

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        ┌── Rado Notch (top-center) ──┐                    │
│  ┌─ Widget Board ─┐    └─────────────────────────────┘      [Desktop Icon]│
│  │ (kiri, toggle) │                                          [Desktop Icon]│
│  └────────────────┘      ┌───────── Window ─────────┐                      │
│                          │ title bar  ─  ▢  ✕       │                      │
│   [Desktop Icons]        │ content                  │                      │
│                          └──────────────────────────┘                      │
│                                                                           │
│            ┌──────────── DOCK (floating, center) ────────────┐  ┌ Tray ┐   │
│            │ ⊞  🔍 │ About Exp Proj Skills Term │ CV Mail │ ⚙ │  │ pill │   │
│            └─────────────────────────────────────────────────┘  └──────┘   │
└───────────────────────────────────────────────────────────────────────────┘
```

Tidak ada taskbar penuh dan tidak ada menu bar atas. Notch menempati area atas; dock + tray pill menempati area bawah.

### 5.2 Dock (pengganti taskbar)

| Properti | Nilai |
|---|---|
| Posisi | `position: fixed; bottom: 12px; left: 50%; transform: translateX(-50%)` |
| Tinggi | 64 px (padding 8 px; ikon 44 px dalam hit-area 48 px) |
| Jarak antar item | 4 px; separator 1×28 px `var(--acrylic-border)` |
| Radius | `--fl-radius-dock` 20 px |
| Material | Acrylic + `shadow-dock` |
| Maks. lebar | `min(92vw, 720px)` |

**Isi dock (kiri → kanan):**

| # | Item | Fungsi |
|---|---|---|
| 1 | **Start** (logo "R" buatan sendiri) | Buka Start menu |
| 2 | **Search** | Buka command palette (juga `Ctrl/⌘ + K`) |
| — | separator | |
| 3 | About | App About |
| 4 | Experience | App Experience |
| 5 | Projects | App Projects |
| 6 | Skills | App Skills |
| 7 | Terminal | App Terminal |
| — | separator | |
| 8 | Resume | App Resume (PDF viewer) |
| 9 | Contact | App Contact |
| — | separator | |
| 10 | Settings | App Settings |

**Interaksi:**
- Hover: `scale(1.12) translateY(-4px)`, 120 ms `ease-fast-invoke`; tooltip Fluent di atas ikon (delay 400 ms).
- Press: `scale(.94)` 100 ms.
- Indikator app: **pill 3 px di bawah ikon**. Terbuka & fokus = lebar 16 px `--rn-accent`; terbuka tidak fokus = 6 px abu-abu; tertutup = tidak ada.
- Klik ikon: bila tertutup → buka; bila terbuka-tidak-fokus → fokuskan; bila terfokus → minimize.
- Klik kanan ikon: context menu (Open · Open in new window · Close).
- **Auto-hide cerdas:** saat ada jendela *maximized*, dock turun keluar layar (translateY(100% + 12px)); muncul lagi saat pointer menyentuh 8 px tepi bawah. Bisa dimatikan di Settings.
- Keyboard: `Tab` masuk dock → panah kiri/kanan berpindah, `Enter` membuka. `role="toolbar"`, tiap item `role="button"` + `aria-label`.

### 5.3 Tray pill (kanan bawah)

Tinggi 40 px, radius 12 px, Acrylic, `bottom: 12px; right: 12px`. Isi: **bahasa (ID/EN)** · ikon Wi-Fi/baterai (dekoratif) · **ikon Quick Settings** · **jam & tanggal** (zona `Asia/Jakarta`, format `15:32` / `28 Okt 2026`). Klik jam → flyout Kalender; klik ikon → Quick Settings (tema, bahasa, shell, kecerahan dekoratif, "Classic view").

### 5.4 Window

| Properti | Spesifikasi |
|---|---|
| Radius | 8 px (hilang saat maximized) |
| Title bar | 32 px: ikon app 16 px · judul `body` · tombol caption di kanan |
| Tombol caption | `Minimize`, `Maximize/Restore`, `Close` — masing-masing 46 × 32 px; hover = `control-fill-hover`; **Close hover = `#C42B1C`, ikon putih** |
| Ukuran minimum | 360 × 280 px |
| Ukuran default | About 860×560 · Experience 960×620 · Projects 1040×680 · Skills 760×520 · Terminal 720×460 · Resume 880×700 · Contact 560×560 · Settings 880×600 |
| Border | 1 px `--shell-border-strong` |
| Shadow | `shadow-window-active` / `shadow-window-inactive` |
| Drag | Title bar; jendela tidak boleh keluar layar lebih dari 60% lebar |
| Resize | Semua tepi/sudut, area tangkap 6 px, dengan kursor resize yang sesuai |
| Maximize | Dobel-klik title bar atau tombol; berhenti 0 px dari tepi (dock auto-hide aktif) |
| Snap | Seret ke tepi kiri/kanan = setengah layar; seret ke atas = maximize. **Snap layouts flyout** saat hover tombol maximize: P2 |
| Buka | `opacity 0→1`, `scale .96→1`, 250 ms `ease-fast-invoke`, `transform-origin` = posisi ikon dock |
| Tutup | `opacity 1→0`, `scale 1→.96`, 150 ms `ease-accelerate` |
| Minimize | Meluncur ke ikon dock, `scale → .2`, 250 ms |
| Fokus | Klik di mana saja = bring-to-front (z-index naik); jendela non-fokus: title bar teks `--shell-text-muted` |
| A11y | `role="dialog"`, `aria-labelledby` = judul; `Alt+F4`/`Esc` (di jendela fokus tanpa input aktif) menutup; `F11` maximize |

Setiap jendela punya **URL hash** (`#about`, `#projects/sigizi`) yang diperbarui saat fokus berubah dan dibaca saat load (deep link).

### 5.5 Start menu

- Posisi: tengah, `bottom: 88px` (di atas dock). Ukuran **640 × 720 px**, Acrylic, radius 8 px, `shadow-16`.
- Struktur: kolom pencarian (atas) → **Pinned** (grid 6 × 3 ikon app) → **Recommended** (3–6 item: "Latest experience", "Latest project", "Resume") → footer: avatar + nama Rado (kiri) dan tombol **"Hire me"** (kanan, menggantikan ikon power; membuka Contact).
- Buka/tutup: `translateY(24px) + opacity` 250 ms; tutup dengan klik di luar, `Esc`, atau tombol Start.

### 5.6 Widget board

- Slide dari kiri, 480 px lebar, tinggi layar − 24 px, Acrylic.
- Widget: **Profile & Availability** · **GitHub activity** (snapshot statis atau fetch API) · **Skills snapshot** · **Latest project** · **Jam & cuaca** (P2).
- Buka lewat ikon di dock (opsional) atau `Win`-like shortcut `W`; tutup `Esc`.

### 5.7 Command palette (Search)

Modal 640 px di atas tengah, input 48 px, hasil dikelompokkan: Apps · Projects · Experience · Skills · Actions ("Download CV", "Toggle theme", "Open Classic view"). Navigasi panah + `Enter`. Fuzzy search dengan indeks statis dari data konten.

### 5.8 Komponen Fluent yang dipakai di dalam app

| Komponen | Spesifikasi singkat |
|---|---|
| Button (standard) | Tinggi 32, radius 4, padding 0 12, `control-fill` + border 1 px `--shell-border`; hover/press seperti token fill |
| Button (accent) | Latar `--rn-accent`, teks `--rn-on-accent`; hover opasitas 90%, press 80% |
| Button (subtle) | Transparan, hover `control-fill-hover` |
| Toggle switch | 40 × 20, thumb 12 px (14 saat hover) |
| TextBox | Tinggi 32, radius 4, garis bawah 1 px (aktif: 2 px `--rn-accent`) |
| Tabs (TabView) | Tinggi 36, tab aktif menyatu dengan konten, radius atas 8 |
| NavigationView | Panel kiri 240 px (compact 48 px), item 40 px, indikator pill 3×16 px `--rn-accent` di kiri item aktif |
| Card | `--rn-surface-alt`, radius 8, border 1 px `--rn-border`, padding 16, `shadow-2` |
| InfoBar | Radius 4, ikon + judul + pesan + aksi; varian info/success/warning/error |
| Tooltip | Acrylic kecil, radius 4, `caption`, delay 400 ms |
| Context menu | Acrylic, radius 8, item 32 px, shortcut di kanan |
| Focus ring | **Dua lapis:** 2 px `--shell-focus` di dalam + 1 px kontras di luar; terlihat hanya saat navigasi keyboard (`:focus-visible`) |

---

## 6. Shell Android 17 (mobile, < 1024 px)

### 6.1 Anatomi layar

```
┌───────────────────────────────┐
│ 15:32        (◯ Notch)   ▂▄▆ 🔋│  ← status bar 32px, edge-to-edge
│                               │
│  Rabu, 28 Okt   ☁ 29°          │  ← At-a-glance (widget teks)
│ ┌───────────────────────────┐ │
│ │  (avatar bentuk cookie)    │ │  ← Profile widget (M3E shape)
│ │  Rado Nelson Dela Sadrak S.│ │
│ │  Frontend & Android Dev    │ │
│ │  [Contact]  [Resume]       │ │
│ └───────────────────────────┘ │
│                               │
│  ▣ About   ▣ Experience  ...   │  ← App grid 4 kolom
│  ▣ Projects ▣ Skills  ▣ Term.. │
│                               │
│  ┌ Search pill ───────────────┐│
│  └────────────────────────────┘│
│   ▣    ▣    ▣    ▣            │  ← Dock 4 app favorit
│          ━━━━━━               │  ← gesture pill 108×4
└───────────────────────────────┘
```

### 6.2 Status bar dan Notch
- Tinggi 32 px + `env(safe-area-inset-top)`; waktu kiri, ikon kanan, **Rado Notch** di tengah (lihat §4).
- Edge-to-edge: konten boleh menggambar di belakang status bar dan nav bar; tambahkan padding dengan `env(safe-area-inset-*)`.
- `<meta name="theme-color">` mengikuti `surface` agar bar browser menyatu (PWA).

### 6.3 Home screen
- **Wallpaper:** gradien/gambar buatan sendiri; warna aksen dihasilkan dari wallpaper (*dynamic color*) bila pengguna memilih "Wallpaper colors" di Settings; default memakai seed `#0B57D0`.
- **At a glance:** tanggal + salam ("Halo, saya Rado"), `Headline S`.
- **Profile widget:** lebar penuh − 32 dp, radius `xl` 28, latar `primary-container`; avatar memakai **mask bentuk M3E** ("Cookie 9-sisi") dengan `clip-path` SVG; dua tombol: `Contact` (filled) dan `Resume` (tonal).
- **Grid app:** 4 kolom, ikon 56 dp (bentuk adaptive-icon *squircle*, radius ≈ 18 dp), label `Label Medium`, jarak vertikal 24 dp, jarak antar baris label→ikon 8 dp. Ikon **themed (monokrom)** otomatis saat "Themed icons" aktif.
- **Dock:** 4 app favorit (About, Projects, Resume, Contact), tanpa latar, ikon 56 dp.
- **Search pill:** tinggi 56 dp, radius full, `surface-container-high`; ketuk membuka command palette versi full-screen (search view M3).
- **Gesture pill:** 108 × 4 dp, `on-surface` 40%, 8 dp dari bawah.
- Halaman kedua (geser kiri): **Widget page** — Availability, Skills snapshot, Latest project (opsional P1).

### 6.4 Membuka app
- **Container transform** dari ikon → layar penuh, spring `spatial-default`, ±400 ms; konten fade-in 150 ms setelah container 60%.
- **Predictive back:** saat gestur geser dari tepi, layar menyusut ke `scale .9`, radius `xl`, ikon app terlihat di balik; lepas = kembali ke home; batal = kembali penuh.
- **Recents:** geser-tahan dari gesture pill → carousel horizontal kartu app terbuka (M3E *hero carousel*); geser kartu ke atas = tutup.
- **Bubbles (P2):** app Terminal dan Chat dapat "Open in bubble" — jendela mengambang 320 × 480 dp yang dapat diseret, mengikuti perilaku Bubbles di Android 17.

### 6.5 Scaffold app
- **Large flexible top app bar** (collapsing): judul `Headline M emphasized`, ikon back (tonal), aksi di kanan; mengecil saat scroll jadi `Title L`.
- **Flexible navigation bar** (bawah, hanya app yang punya tab, mis. Projects: *All · Web · Mobile*): tinggi 64 dp, indikator pill `secondary-container`, label `Label M`.
- **Konten:** margin horizontal 16 dp (compact) / 24 dp (medium); kartu `surface-container`, radius 16–28.
- Tablet (≥ 600): **navigation rail** 80 dp menggantikan nav bar; layout list-detail (daftar 360 dp + detail).

### 6.6 Komponen M3E yang dipakai

| Komponen | Spesifikasi singkat |
|---|---|
| Button | Filled / tonal / outlined / text; tinggi 40 (default), shape **round** (full) atau **square** (radius 12) dengan *shape morph* saat ditekan (round → square) |
| Button group | Segmen berjarak 2 dp; tombol yang ditekan melebar 8% |
| Split button | Aksi utama + menu panah (mis. "Download CV ▾": PDF / DOCX) |
| FAB / FAB menu | 56 dp, radius 16; FAB menu mengembang jadi daftar aksi (Email, LinkedIn, GitHub) |
| Chips | Tinggi 32, radius 8; filter chip untuk teknologi |
| Cards | Elevated / filled / outlined; radius 16 (sedang) atau 28 (hero) |
| List item | 1–3 baris, leading ikon/avatar, trailing meta; tinggi min 56 / 72 / 88 |
| Segmented button | Tinggi 40, 2–5 segmen |
| Loading indicator | **Shape morphing** M3E (ganti circular spinner) saat memuat PDF / konten berat |
| Bottom sheet | Radius atas 28, drag handle 32 × 4 |
| Dialog | Radius 28, `surface-container-high`, padding 24 |
| Snackbar | `inverse-surface`, radius 4, di atas nav bar |
| Switch | 52 × 32, thumb 24 (ikon centang saat on) |

### 6.7 Notification shade & Quick Settings
- Geser turun dari status bar: sheet penuh dengan **Quick Settings tiles** (2 kolom besar/4 kolom kecil): *Dark theme*, *Language (ID/EN)*, *Classic view*, *Dynamic color*, *Reduce motion*; di bawahnya **riwayat event Notch** sebagai notifikasi (judul, waktu relatif, aksi).
- Tile: tinggi 64 dp, radius `full` (aktif: `primary`, tidak aktif: `surface-container-high`); tile aktif berubah bentuk jadi `radius 16`.

### 6.8 PWA
- `manifest.webmanifest`: `display: "standalone"`, `theme_color`, ikon **maskable** 192/512, `shortcuts` ke `#projects`, `#resume`, `#contact`.
- Meta: `viewport-fit=cover`, `color-scheme: light dark`.
- Service worker: cache app shell + font + data konten (offline-friendly).
- **Next.js:** manifest dibuat lewat `app/manifest.ts`; ikon di `app/icon.png` dan `app/apple-icon.png`; `theme_color` diselaraskan dengan `surface` tema aktif.

---

## 7. Pola layout per app (shared views)

Content Views menyesuaikan diri dengan **container query**, bukan viewport, supaya sama-sama rapi di jendela 560 px maupun layar HP.

| App | Windows (metafora) | Android (metafora) | Pola konten |
|---|---|---|---|
| About | Halaman **Settings → System → About** (kartu "Device specs" versi Rado) | Layar **Settings → About phone** | Hero profil; ringkasan; pendidikan; tautan sosial |
| Experience | **File Explorer**: folder per perusahaan, panel detail | List-detail + timeline vertikal | 4 peran + 1 event |
| Projects | **Microsoft Store**: grid kartu, tombol *View / Source* | **Play Store**: carousel + list | 5 proyek dengan stack chip |
| Skills | **Task Manager → Performance**: bar level + grafik | Layar **Digital Wellbeing**-style: ring & bar | Competent / Novice / Tools |
| Terminal | **Windows Terminal** (Cascadia Code, tab, PowerShell prompt) | **Termux**-style full screen | Perintah `help`, `whoami`, `skills`, `projects`, `contact`, `clear` |
| Resume | **PDF viewer** (Edge-style toolbar) | Document viewer + FAB unduh | `CV_Rado.pdf` + tombol Download |
| Contact | **Mail** app (compose) | **Messages**/Gmail compose | Form + tautan sosial; kirim via mailto/Formspree |
| Settings | **Settings** (Personalization) | **Settings** (Display & wallpaper) | Tema, aksen, bahasa, shell, motion, Classic view |

---

## 8. Aksesibilitas

| Area | Aturan |
|---|---|
| Kontras | Teks normal ≥ 4.5:1; teks besar & ikon penting ≥ 3:1. Uji untuk **semua kombinasi** tema × shell. |
| Fokus | `:focus-visible` selalu terlihat (§5.8 untuk Windows; Android pakai ring 3 dp `primary` offset 2 dp). |
| Keyboard (desktop) | `Tab` urutan logis; `Esc` menutup flyout/Start/palette; `Ctrl/⌘+K` palette; `Alt+Tab`-like: `Ctrl+\`` siklus jendela; panah di dock. |
| Pembaca layar | Landmark: `main`, `nav` (dock), `region` (tiap jendela). Jendela `role="dialog"`. Status notch `aria-live`. |
| Sentuh | ≥ 48 × 48 dp; jarak antar target ≥ 8 dp. |
| Motion | Hormati `prefers-reduced-motion`; tanpa konten berkedip > 3 Hz. |
| Teks | Bisa diperbesar 200% tanpa kehilangan konten; unit `rem`. |
| Bahasa | `lang` di `<html>` mengikuti pilihan EN/ID. |
| **Classic view** | Halaman biasa, semantik penuh, tanpa metafora OS. Wajib ada, dapat dijangkau dari Settings, Quick Settings, dan *skip link* pertama di halaman. |

---

## 9. Aset & ikonografi

| Kebutuhan | Sumber (lisensi aman) |
|---|---|
| Ikon UI Windows | **Fluent UI System Icons** (MIT) — gaya *Regular*, *Filled* untuk aktif |
| Ikon UI Android | **Material Symbols Rounded** (Apache 2.0), variable axes: `FILL 0/1`, `wght 400`, `GRAD 0`, `opsz 24` |
| Ikon app (dock/grid) | Buatan sendiri (Figma/Illustrator): kanvas 256×256; Windows = squircle 12 px dengan gradien halus + glyph putih; Android = *adaptive icon* (foreground 72% di safe-zone 66%) + versi monokrom |
| Logo "R" (Start) | Buatan sendiri, SVG 1 warna, 24×24 |
| Wallpaper | Buatan sendiri / AI-generated / Unsplash (periksa lisensi). Siapkan **light + dark**, 3840×2160 dan 1170×2532 (WebP, ≤ 250 KB) |
| Foto profil | Dari CV (lingkaran). Siapkan 512 px WebP |
| Font | Inter, Roboto Flex, Cascadia Code (semua OFL) — self-host |

---

## 10. Implementasi teknis (ringkas)

**Stack:** **Next.js 16 (App Router)** + React 19 + TypeScript + Tailwind CSS v4, `motion`, `zustand`, `react-rnd` (drag/resize), `cmdk` (palette), `@material/material-color-utilities`. Hosting di Netlify. Detail migrasi dan konfigurasi: `PRD.md §11.4`.

### 10.1 Aturan Server vs Client Component

| Jenis | Boleh | Tidak boleh |
|---|---|---|
| **Server Component** (default di `app/`) | Membaca `src/data/*`, merender Classic view, `metadata` | `useState`, `useEffect`, `window`, event handler |
| **Client Component** (`"use client"`) | Shell OS, window manager, Dock, Notch, Terminal, form, animasi | Mengimpor modul server-only |
| **View presentasional** (`*View.tsx`) | Hanya props + token `--rn-*`; dipakai server **dan** client | Hooks, API browser |
| **App wrapper** (`*App.tsx`) | Integrasi window/stack, `notch.show()`, state UI | Menduplikasi markup View |

### 10.2 Aturan hydration yang berdampak ke desain
- Elemen yang bergantung waktu/viewport (jam Tray, durasi pengalaman, pilihan shell) dirender **setelah mount**; sebelum itu tampilkan placeholder berukuran sama agar **CLS = 0**.
- Splash/boot menjadi *fallback* `dynamic(..., { ssr: false })`; ukurannya memenuhi viewport agar tidak ada lonjakan layout saat shell muncul.
- Wallpaper memakai `next/image` dengan `priority` dan `placeholder="blur"`; ukuran tetap lewat `fill` + container `position: relative`.
- Komponen 3D (mis. `lanyard`) dan viewer PDF dimuat `ssr: false` dan memakai skeleton berukuran tetap.

### 10.3 Struktur folder

```
app/
  layout.tsx              # html, next/font, skrip tema+shell, metadata
  page.tsx                # memuat <OSRoot/> (dynamic, ssr:false)
  classic/
    page.tsx              # CV lengkap (Server Component, SSG)
    projects/[slug]/page.tsx
  manifest.ts  sitemap.ts  robots.ts
  opengraph-image.png  icon.png  apple-icon.png
src/
  tokens/            tokens.css, fluent.css, m3.css
  os/
    OSRoot.tsx       # "use client": memilih shell, boot, notch host
    shells/
      windows/       WindowsShell, Dock, TrayPill, StartMenu, WidgetBoard, Window, Palette
      android/       AndroidShell, Home, StatusBar, AppScaffold, QuickShade, Recents
    notch/           NotchHost, NotchSlot (UI kustom), notchStore
  apps/              about/ experience/ projects/ skills/ terminal/ resume/ contact/ settings/
                     # tiap app: XView.tsx (presentasional) + XApp.tsx ("use client")
  data/              profile.ts, experience.ts, projects.ts, skills.ts   (satu sumber data)
  store/             windows.ts (z-order, minimize, maximize), prefs.ts
public/
  wallpapers/ icons/ cv/CV_Rado.pdf
next.config.mjs      # output: 'export', images.unoptimized
```

**State jendela (zustand):**

```ts
interface WinState {
  id: AppId;
  z: number;
  x: number; y: number; w: number; h: number;
  minimized: boolean;
  maximized: boolean;
}
// aksi: open(id), close(id), focus(id), minimize(id), toggleMaximize(id), move/resize
// shell Android memakai store yang sama: hanya "stack" aplikasi (top = layar aktif)
```

**Anggaran performa (Next.js):** gunakan `next build` output sebagai acuan; JS awal ≤ 200 KB gzip · tiap app lazy-chunk ≤ 60 KB gzip · LCP < 2,5 s (4G) · CLS < 0,1 · INP < 200 ms · wallpaper `fetchpriority="high"` + blur-up · animasi hanya `transform`/`opacity`/`clip-path`.

---

## 11. Do & Don't

| ✅ Do | ❌ Don't |
|---|---|
| Pakai token `--rn-*` di Content Views | Hard-code warna hex di komponen app |
| Pertahankan proporsi: radius jendela 8 px, title bar 32 px | Membulatkan semuanya 24 px "biar modern" |
| Beri Notch warna hitam murni di dua tema | Memberi Notch transparansi/blur (merusak ilusi perangkat keras) |
| Sediakan Classic view dan SEO fallback | Menyembunyikan CV hanya di balik jendela yang harus dibuka |
| Animasikan `transform`/`opacity` | Animasi `width/height/top/left` pada jendela besar |
| Pakai aset buatan sendiri / berlisensi terbuka | Menyalin logo Windows, robot Android, wallpaper Bloom |
| Uji di Chrome Android + Safari iOS + Edge/Chrome/Firefox desktop | Mengandalkan `backdrop-filter` tanpa fallback warna solid |

---

## 12. Checklist QA desain

- [ ] Semua token ada di light **dan** dark, untuk kedua shell.
- [ ] Kontras AA lulus pada Dock, Tray, Start, tombol, chip, tab.
- [ ] Dock: hover, press, indikator, auto-hide, keyboard nav berfungsi.
- [ ] Notch: 4 state + antrean + reduced-motion + `aria-live` diuji.
- [ ] Jendela: drag, resize, maximize, minimize, fokus, deep link hash.
- [ ] Pergantian shell saat resize mempertahankan app yang terbuka.
- [ ] **Next.js:** tidak ada hydration warning di console; tema dan shell benar sejak cat pertama (tanpa kedip); CLS = 0 untuk jam/durasi/boot.
- [ ] **Next.js:** `next build` lolos; `/classic` dan `/classic/projects/[slug]` ter-render statis; metadata, `sitemap`, `robots`, OG image valid.
- [ ] **Next.js:** komponen browser-only (3D, PDF, drag) dimuat `ssr: false` dan punya skeleton.
- [ ] Android: predictive back, container transform, Quick Shade, PWA install.
- [ ] Classic view memuat 100% konten CV dan terindeks mesin pencari.
- [ ] Lighthouse: Performance ≥ 90 (desktop) / ≥ 85 (mobile), Accessibility ≥ 95.
