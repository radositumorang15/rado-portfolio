# PORTFOLIO OS DESIGN SYSTEM SPECIFICATION

**Target Architecture:** Dual-OS Adaptive Web Portfolio (Inspired by vovacodes.ca)
- **Desktop Viewport (`>= 1024px`):** Windows 11 (Official Microsoft Fluent 2 / WinUI 3 Specification)
- **Mobile & Tablet Viewport (`< 1024px`):** Android 15/16 (Official Google Material 3 Expressive Specification)

---

## PART 1: WINDOWS 11 DESIGN SYSTEM (DESKTOP VIEWPORT `>= 1024px`)
*Reference: https://learn.microsoft.com/en-us/windows/apps/design/design-principles*

### 1.1 Core Design Principles
1. **Effortless:** Fast, intuitive interactions with clear focus and precision.
2. **Calm:** Decluttered UI where background chrome fades away using soft materials (Mica) so user content stands out.
3. **Personal:** Full support for Light/Dark modes, dynamic wallpaper tinting, and user-selectable system accent colors.
4. **Familiar:** Standard desktop metaphors (Centered Taskbar, Start Menu, Window Controls, Snap Layouts, Right-Click Context Menu).
5. **Complete + Coherent:** Every window, dialog, and control strictly adheres to the Two-Layer System and 3-level corner geometry.

### 1.2 Architecture of an App Window (Two-Layer System)
Every portfolio window (e.g., *File Explorer / Projects*, *Settings / About Me*, *Terminal*, *VSCode Viewer*) MUST implement the official WinUI 3 Two-Layer hierarchy:
1. **Base Layer (Foundation):**
   - Uses **Mica** (or **Mica Alt** for tabbed windows like Browser/Explorer).
   - Houses the **Title Bar** (`32px` or `40px` height), **NavigationView** (Left Sidebar or Top Tabs), and window command bars.
2. **Content Layer (Primary Workspace):**
   - Sits on top of the Base Layer (`LayerFillColorDefaultBrush`).
   - Has a `1px` top/left border (`CardStrokeColorDefault`) and an `8px` top-left corner radius (`border-top-left-radius: 8px`) when adjacent to a left navigation sidebar.
   - Inside the Content Layer, content is segmented into **Cards** (`CardBackgroundFillColorDefaultBrush`).

### 1.3 Official Material System (`Mica`, `Acrylic`, `Smoke`)
*CRITICAL RULE: Never use Acrylic for main application window backgrounds. Never keep Mica active when a window loses focus.*

| Material | Allowed Usage | Focused / Active State | Unfocused / Inactive State |
| :--- | :--- | :--- | :--- |
| **Mica** | Base layer of standard app windows (*Settings, About*) | Tinted with desktop wallpaper average color + `blur(60px)` + Luminosity overlay (`85%` dark / `88%` light) | Falls back to solid opaque `#202020` (Dark) / `#F3F3F3` (Light) |
| **Mica Alt** | Base layer of tabbed app windows (*File Explorer, Browser*) | Deeper tint than standard Mica (`#1A1A1A` dark / `#DADADA` light base) | Falls back to solid opaque `#1A1A1A` (Dark) / `#E5E5E5` (Light) |
| **Acrylic** | **ONLY** transient, light-dismiss surfaces (*Taskbar, Start Menu, Quick Settings, Context Menus, Flyouts*) | `backdrop-filter: blur(30px) saturate(140%)` + `2%` SVG noise overlay | Automatically dismissed on outside click (*light-dismiss*) |
| **Smoke** | Modal dialog backdrop (`ContentDialog` overlay) | Always `rgba(0, 0, 0, 0.30)` (**Not mode-aware**: identical in Light and Dark mode) | N/A |

### 1.4 Geometry & Corner Radius Rules (3-Level Rounding)
*Reference: https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/geometry*
- **`OverlayCornerRadius` (`8px`):**
  - Top-level floating app windows, `ContentDialog`, `Flyout`, `MenuFlyout` (Right-click context menu), `Start Menu`, `Widgets Board`, `Quick Settings`, `TeachingTip`, and internal `Card` containers.
- **`ControlCornerRadius` (`4px`):**
  - Standard in-page interactive controls: `Button`, `CheckBox`, `ComboBox`, `TextBox`, `SearchBox`, `ListView` selection backplate, `ProgressBar`, `ScrollBar`, `Slider`, Taskbar icon hover box, and **`ToolTip`** *(Official exception: ToolTip uses `4px` instead of `8px` due to its small size)*.
- **Zero Rounding (`0px` — When NOT to Round):**
  1. **Maximized or Snapped Windows:** When a window is maximized or snapped to screen edges/quadrants, its outer `border-radius` MUST transition to `0px`.
  2. **Intersecting Control Edges:** Touching edges of compound controls (e.g., the two halves of a `SplitButton` or attached input addons) MUST have `0px` radius on the shared edge with `0px` gap.
  3. **Connected Flyouts:** When an `AutoSuggestBox` dropdown opens directly attached to an input box, the touching corners are `0px`.

### 1.5 Elevation, Layering & Contour Hierarchy
*Reference: https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/layering*

All elevated surfaces in Windows 11 combine a `1px` contour border (`stroke-width: 1px`) with a directional shadow:

| Surface / Control | Official Z-Elevation | Stroke Token | CSS Box-Shadow Equivalent (Dark / Light) |
| :--- | :--- | :--- | :--- |
| **Active Window / Modal Dialog** | `128` | `SurfaceStrokeColorDefault` | `0 32px 64px rgba(0,0,0,0.45), 0 2px 21px rgba(0,0,0,0.22)` |
| **Inactive Window** | `128` (Dimmed) | `SurfaceStrokeColorDefault` | `0 16px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)` |
| **Flyout / Start Menu / Context Menu** | `32` | `SurfaceStrokeColorFlyout` | `0 8px 16px rgba(0,0,0,0.28)` |
| **Tooltip** | `16` | `SurfaceStrokeColorFlyout` | `0 4px 8px rgba(0,0,0,0.20)` |
| **Content Card** | `8` | `CardStrokeColorDefault` | `0 2px 4px rgba(0,0,0,0.08)` |
| **Standard Control (Rest / Hover)** | `2` | `ControlElevationBorder` | Bottom border highlight (`1px` lighter in Dark, darker in Light) |
| **Standard Control (Pressed) / Content Layer** | `1` | `ControlStrokeColorDefault` | `none` (Flat contour only) |

### 1.6 Typography System (`Segoe UI Variable`)
*Reference: https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/typography*

- **Strict Rules:**
  - **NO Bold (`700`) or Italic** in the standard UI type ramp. Use `Semibold (600)` for emphasis. Never use Italic in UI labels/body (accessibility requirement for dyslexia).
  - **Sentence case** for all UI titles, headers, buttons, and menu items.
  - **Line length:** Constrain reading blocks to `50–60` characters per line (`max-width: 60ch`).
  - **Minimum legible size:** Never render text smaller than `12px Regular` or `14px Semibold`.

| Type Ramp Role | Optical Axis (`opsz`) | Weight (`wght`) | Size / Line-Height (`epx`) | CSS `font-variation-settings` |
| :--- | :--- | :--- | :--- | :--- |
| **Caption** | Small (`8`) | Regular (`400`) | `12px / 16px` | `'wght' 400, 'opsz' 8` |
| **Body** | Text (`10.5`) | Regular (`400`) | `14px / 20px` | `'wght' 400, 'opsz' 10.5` |
| **Body Strong** | Text (`10.5`) | Semibold (`600`) | `14px / 20px` | `'wght' 600, 'opsz' 10.5` |
| **Body Large** | Text (`10.5`) | Regular (`400`) | `18px / 24px` | `'wght' 400, 'opsz' 10.5` |
| **Body Large Strong** | Text (`10.5`) | Semibold (`600`) | `18px / 24px` | `'wght' 600, 'opsz' 10.5` |
| **Subtitle** | Display (`36`) | Semibold (`600`) | `20px / 28px` | `'wght' 600, 'opsz' 36` |
| **Title** | Display (`36`) | Semibold (`600`) | `28px / 36px` | `'wght' 600, 'opsz' 36` |
| **Title Large** | Display (`36`) | Semibold (`600`) | `40px / 52px` | `'wght' 600, 'opsz' 36` |
| **Display** | Display (`36`) | Semibold (`600`) | `68px / 92px` | `'wght' 600, 'opsz' 36` |

### 1.7 Official Motion System (Timing & Easing Curves)
*Reference: https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/motion*

| Motion Purpose | Definition | Official Easing Curve | Official Duration(s) | Applied To |
| :--- | :--- | :--- | :--- | :--- |
| **Direct Entrance** | Fast – In | `cubic-bezier(0, 0, 0, 1)` | `167ms`, `250ms`, or `333ms` | Opening Windows, Start Menu (`250ms`), Context Menus (`167ms`), Flyouts |
| **Existing Elements** | Point-to-Point | `cubic-bezier(0.55, 0.55, 0, 1)` | `167ms`, `250ms`, or `333ms` | Window Snap transitions (`250ms`), Taskbar active pill morphing (`167ms`), Navigation indicator |
| **Direct Exit** | Fast – Out | `cubic-bezier(0, 0, 0, 1)` | `167ms` | Closing Windows/Flyouts (**MUST** combine with `83ms` fade out) |
| **Gentle Exit** | Soft – Out | `cubic-bezier(1, 0, 1, 1)` | `167ms` | Minimizing window to Taskbar |
| **Bare Minimum** | Fade In / Out | `linear` | `83ms` | Opacity cross-fades, hover state fill transitions |
| **Strong Entrance** | Elastic In (3 Keyframes) | KF1: `cubic-bezier(0.85, 0, 0, 1)` (`167ms`)<br>KF2: `cubic-bezier(0.85, 0, 0.75, 1)` (`167ms`)<br>KF3: `cubic-bezier(0.85, 0, 0, 1)` (`333ms`) | Total `667ms` | Taskbar icon bounce when clicked, minimized, or restored |

---

## PART 2: ANDROID 15/16 MATERIAL 3 EXPRESSIVE (MOBILE VIEWPORT `< 1024px`)
*Reference: https://m3.material.io/blog/building-with-m3-expressive & https://m3.material.io/styles/motion/overview/specs*

### 2.1 Core Expressive Tactics (Android 16)
1. **Edge-to-Edge Immersive Canvas (Android 15/16):** Full viewport rendering (`100dvh`) with translucent top Status Bar (`44px`) and bottom Gesture Pill (`24px` area).
2. **Shape Tension & Morphing:** Combine extra-rounded containers (`28px`), pills (`9999px`), and organic decorative cutouts (Scallop/Cookie, Clover, Sunny) with dynamic corner morphing (`9999px` -> `16px`) when pressed or toggled.
3. **Tonal Surface Hierarchy:** Replace heavy drop shadows with 5 levels of tonal container luminance (`surfaceContainerLowest` through `surfaceContainerHighest`) plus frosted glass blur (`backdrop-filter: blur(28px)`) on the Notification/Quick Settings shade.
4. **Visually Emphasized Typography:** Use variable font axes (`wght`, `wdth`) to create editorial hero moments (Lockscreen clock, App Bars, Active Tabs).
5. **Spring-Physics Motion System:** Zero linear/standard ease curves; all spatial movements use overshooting spring physics (`spatial`), while color/opacity uses non-bouncing critically damped springs (`effects`).

### 2.2 Official M3 Expressive Web Motion Tokens (`Spring-to-Bezier Specs`)
*Reference: https://m3.material.io/styles/motion/overview/specs (Web Conversion Table)*

- **Rule 1 (`Spatial` tokens):** Apply ONLY to `transform`, `translate`, `scale`, `width`, `height`, and `border-radius` (Shape Morphing). Note that the Y1/Y2 control points exceed `1.0` to produce natural spring bounce/overshoot.
- **Rule 2 (`Effects` tokens):** Apply ONLY to `background-color`, `color`, `border-color`, `opacity`, and `backdrop-filter` (no overshoot).

| Official M3 Token Name | Scheme | CSS `cubic-bezier()` Curve | Official Duration | Target Components |
| :--- | :--- | :--- | :--- | :--- |
| `md.sys.motion.spring.fast.spatial` | **Expressive** | `cubic-bezier(0.42, 1.67, 0.21, 0.90)` | `350ms` | Buttons, Switches, Quick Settings Tile shape morphing, Floating Toolbar buttons, Icon bounce |
| `md.sys.motion.spring.default.spatial` | **Expressive** | `cubic-bezier(0.38, 1.21, 0.22, 1.00)` | `500ms` | App Drawer swipe-up, Bottom Sheets, Notification Shade pull-down, Expanded Navigation Rail |
| `md.sys.motion.spring.slow.spatial` | **Expressive** | `cubic-bezier(0.39, 1.29, 0.35, 0.98)` | `650ms` | Full-screen App Launch from Homescreen icon, Predictive Back Gesture return |
| `md.sys.motion.spring.fast.effects` | **Expressive** | `cubic-bezier(0.31, 0.94, 0.34, 1.00)` | `150ms` | Button/Switch/Tile background color & text color transitions |
| `md.sys.motion.spring.default.effects` | **Expressive** | `cubic-bezier(0.34, 0.80, 0.34, 1.00)` | `200ms` | Drawer/Bottom sheet content opacity fade |
| `md.sys.motion.spring.slow.effects` | **Expressive** | `cubic-bezier(0.34, 0.88, 0.34, 1.00)` | `300ms` | Full-screen backdrop scrim blur & theme color transitions |
| `md.sys.motion.standard.fast.spatial` | Standard | `cubic-bezier(0.27, 1.06, 0.18, 1.00)` | `350ms` | Utilitarian secondary controls |
| `md.sys.motion.standard.default.spatial`| Standard | `cubic-bezier(0.27, 1.06, 0.18, 1.00)` | `500ms` | Standard list & dialog transitions |
| `md.sys.motion.standard.slow.spatial` | Standard | `cubic-bezier(0.27, 1.06, 0.18, 1.00)` | `750ms` | Utilitarian full-page transitions |

### 2.3 M3 Expressive Component & Shape Specifications
1. **Resizable Quick Settings Tiles (Tech Stack Showcase):**
   - Grid: 2-column or 4-column adaptive grid (`gap: 10px`).
   - Can span `1x1` (compact icon pill, `height: 64px`) or `2x1` (wide pill with icon + title + subtitle, `height: 64px`).
   - **Inactive State:** `border-radius: 9999px`, background `var(--m3-surface-container-high)`, text `var(--m3-on-surface)`.
   - **Active / Toggled State:** Morphs to `border-radius: 16px` using `var(--m3-spring-fast-spatial)`, background `var(--m3-primary)`, text `var(--m3-on-primary)`.
2. **Grouped Notification Cards (Experience / Blog / Contact Feed):**
   - Top card in stack: `border-radius: 24px 24px 6px 6px`
   - Middle cards in stack: `border-radius: 6px`
   - Bottom card in stack: `border-radius: 6px 6px 24px 24px`
   - Single standalone card or expanded card: `border-radius: 24px` (with `4px` vertical gap between stacked cards, expanding to `12px` margin when tapped).
3. **Floating Toolbar & Button Groups (New in M3 Expressive):**
   - Replaces rigid bottom bars inside opened portfolio apps.
   - Floating pill container (`height: 64px`, `padding: 0 12px`, `border-radius: 9999px`, background `var(--m3-surface-container-highest)`, `box-shadow: 0 8px 24px rgba(0,0,0,0.28)`), anchored `16px` above the Gesture Pill.
4. **Decorative Shape Library (Avatar & Project Thumbnail Masks):**
   - Use SVG `clipPath` or CSS `mask-image` for 12-sided **Cookie/Scallop**, **4-Leaf Clover**, or **Pill-Arch** shapes on the developer profile photo and featured project badges.

---

## PART 3: COMPLETE CSS DESIGN TOKENS (`tokens.css`)

```css
:root {
  /* ==========================================================================
     1. WINDOWS 11 FLUENT 2 TOKENS (OFFICIAL WINUI 3 BRUSH MAPPING - DARK DEFAULT)
     ========================================================================== */
  --win-font-family: 'Segoe UI Variable', 'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif;
  --win-font-mono: 'Cascadia Code', 'Consolas', monospace;

  /* Layer & Material Brushes */
  --win-mica-active-bg: rgba(32, 32, 32, 0.82);
  --win-mica-inactive-bg: #202020;
  --win-mica-alt-active-bg: rgba(26, 26, 26, 0.88);
  --win-mica-alt-inactive-bg: #1A1A1A;
  --win-acrylic-transient-bg: rgba(44, 44, 44, 0.72);
  --win-smoke-dialog-bg: rgba(0, 0, 0, 0.30); /* Mode-independent */

  /* Content Layer & Card Brushes */
  --win-layer-bg: rgba(58, 58, 58, 0.30);
  --win-layer-alt-bg: rgba(255, 255, 255, 0.0538);
  --win-card-bg-default: rgba(255, 255, 255, 0.0512);
  --win-card-bg-secondary: rgba(255, 255, 255, 0.0326);

  /* Control Fill Brushes */
  --win-control-fill-rest: rgba(255, 255, 255, 0.0605);
  --win-control-fill-hover: rgba(255, 255, 255, 0.0837);
  --win-control-fill-pressed: rgba(255, 255, 255, 0.0326);
  --win-control-fill-disabled: rgba(255, 255, 255, 0.0419);
  --win-subtle-fill-transparent: transparent;
  --win-subtle-fill-hover: rgba(255, 255, 255, 0.0605);
  --win-subtle-fill-pressed: rgba(255, 255, 255, 0.0419);

  /* Stroke & Elevation Borders */
  --win-surface-stroke-default: rgba(117, 117, 117, 0.40);
  --win-surface-stroke-flyout: rgba(0, 0, 0, 0.20);
  --win-card-stroke-default: rgba(0, 0, 0, 0.10);
  --win-control-stroke-default: rgba(255, 255, 255, 0.0698);
  --win-control-stroke-secondary: rgba(255, 255, 255, 0.093);
  --win-control-elevation-border: linear-gradient(180deg, rgba(255,255,255,0.093) 0%, rgba(255,255,255,0.0698) 90%);

  /* Text Hierarchy Brushes */
  --win-text-primary: #FFFFFF;
  --win-text-secondary: rgba(255, 255, 255, 0.786);
  --win-text-tertiary: rgba(255, 255, 255, 0.5442);
  --win-text-disabled: rgba(255, 255, 255, 0.3628);

  /* System Accent & Semantic Brushes */
  --win-accent-default: #60CDFF; /* SystemAccentColorLight2 for Dark Mode */
  --win-accent-secondary: rgba(96, 205, 255, 0.90);
  --win-accent-tertiary: rgba(96, 205, 255, 0.80);
  --win-accent-text-primary: #99EBFF; /* High contrast link text in Dark Mode */
  --win-text-on-accent: #000000;
  --win-system-critical: #FF99A4;
  --win-system-CloseHover-bg: #C42B1C;
  --win-system-success: #6CCB5F;
  --win-system-caution: #FCE100;

  /* Geometry Tokens */
  --win-overlay-corner-radius: 8px;
  --win-control-corner-radius: 4px;
  --win-zero-corner-radius: 0px;
  --win-taskbar-height: 48px;
  --win-titlebar-height: 36px;

  /* Elevation Shadows */
  --win-shadow-window-active: 0 32px 64px rgba(0, 0, 0, 0.45), 0 2px 21px rgba(0, 0, 0, 0.22);
  --win-shadow-window-inactive: 0 16px 32px rgba(0, 0, 0, 0.22), 0 2px 8px rgba(0, 0, 0, 0.12);
  --win-shadow-flyout: 0 8px 16px rgba(0, 0, 0, 0.28);
  --win-shadow-tooltip: 0 4px 8px rgba(0, 0, 0, 0.20);
  --win-shadow-card: 0 2px 4px rgba(0, 0, 0, 0.08);

  /* Official Windows 11 Motion Curves & Timings */
  --win-ease-direct-entrance: cubic-bezier(0, 0, 0, 1);
  --win-ease-point-to-point: cubic-bezier(0.55, 0.55, 0, 1);
  --win-ease-direct-exit: cubic-bezier(0, 0, 0, 1);
  --win-ease-gentle-exit: cubic-bezier(1, 0, 1, 1);
  --win-ease-fade: linear;

  --win-duration-fade: 83ms;
  --win-duration-fast: 167ms;
  --win-duration-normal: 250ms;
  --win-duration-slow: 333ms;

  /* ==========================================================================
     2. ANDROID 15/16 MATERIAL 3 EXPRESSIVE TOKENS (DARK DEFAULT)
     ========================================================================== */
  --m3-font-family: 'Google Sans Flex', 'Roboto Flex', 'Plus Jakarta Sans', system-ui, sans-serif;

  /* Tonal Surface Palette */
  --m3-surface-dim: #141218;
  --m3-surface: #141218;
  --m3-surface-bright: #3B383E;
  --m3-surface-container-lowest: #0F0D13;
  --m3-surface-container-low: #1D1B20;
  --m3-surface-container: #211F26;
  --m3-surface-container-high: #2B2930;
  --m3-surface-container-highest: #36343B;
  --m3-shade-scrim-blur: rgba(20, 18, 24, 0.72);

  /* Dynamic Accent Roles */
  --m3-primary: #D0BCFF;
  --m3-on-primary: #381E72;
  --m3-primary-container: #4F378B;
  --m3-on-primary-container: #EADDFF;
  --m3-secondary: #CCC2DC;
  --m3-on-secondary: #332D41;
  --m3-secondary-container: #4A4458;
  --m3-on-secondary-container: #E8DEF8;
  --m3-tertiary: #EFB8C8;
  --m3-on-tertiary: #492532;
  --m3-tertiary-container: #633B48;
  --m3-on-tertiary-container: #FFD8E4;

  --m3-on-surface: #E6E0E9;
  --m3-on-surface-variant: #CAC4D0;
  --m3-outline: #938F99;
  --m3-outline-variant: #49454F;

  /* Expressive Geometry */
  --m3-radius-xs: 4px;
  --m3-radius-sm: 8px;
  --m3-radius-md: 12px;
  --m3-radius-morphed: 16px;
  --m3-radius-card: 24px;
  --m3-radius-widget: 28px;
  --m3-radius-pill: 9999px;

  /* Official M3 Expressive Web Conversion Springs */
  --m3-spring-fast-spatial: 350ms cubic-bezier(0.42, 1.67, 0.21, 0.90);
  --m3-spring-default-spatial: 500ms cubic-bezier(0.38, 1.21, 0.22, 1.00);
  --m3-spring-slow-spatial: 650ms cubic-bezier(0.39, 1.29, 0.35, 0.98);

  --m3-spring-fast-effects: 150ms cubic-bezier(0.31, 0.94, 0.34, 1.00);
  --m3-spring-default-effects: 200ms cubic-bezier(0.34, 0.80, 0.34, 1.00);
  --m3-spring-slow-effects: 300ms cubic-bezier(0.34, 0.88, 0.34, 1.00);
}

/* ==========================================================================
   3. LIGHT MODE OVERRIDES (BOTH OS SYSTEMS)
   ========================================================================== */
[data-theme="light"] {
  /* Windows 11 Light Mode */
  --win-mica-active-bg: rgba(243, 243, 243, 0.88);
  --win-mica-inactive-bg: #F3F3F3;
  --win-mica-alt-active-bg: rgba(218, 218, 218, 0.90);
  --win-mica-alt-inactive-bg: #DADADA;
  --win-acrylic-transient-bg: rgba(252, 252, 252, 0.78);
  /* Note: --win-smoke-dialog-bg remains rgba(0, 0, 0, 0.30) */

  --win-layer-bg: rgba(255, 255, 255, 0.50);
  --win-layer-alt-bg: #FFFFFF;
  --win-card-bg-default: rgba(255, 255, 255, 0.70);
  --win-card-bg-secondary: rgba(246, 246, 246, 0.50);

  --win-control-fill-rest: rgba(255, 255, 255, 0.70);
  --win-control-fill-hover: rgba(249, 249, 249, 0.50);
  --win-control-fill-pressed: rgba(249, 249, 249, 0.30);
  --win-control-fill-disabled: rgba(249, 249, 249, 0.30);
  --win-subtle-fill-hover: rgba(0, 0, 0, 0.0373);
  --win-subtle-fill-pressed: rgba(0, 0, 0, 0.0241);

  --win-surface-stroke-default: rgba(117, 117, 117, 0.40);
  --win-surface-stroke-flyout: rgba(0, 0, 0, 0.0578);
  --win-card-stroke-default: rgba(0, 0, 0, 0.0578);
  --win-control-stroke-default: rgba(0, 0, 0, 0.0578);
  --win-control-stroke-secondary: rgba(0, 0, 0, 0.1622);
  --win-control-elevation-border: linear-gradient(180deg, rgba(0,0,0,0.0578) 90%, rgba(0,0,0,0.1622) 100%);

  --win-text-primary: rgba(0, 0, 0, 0.8956);
  --win-text-secondary: rgba(0, 0, 0, 0.6063);
  --win-text-tertiary: rgba(0, 0, 0, 0.4458);
  --win-text-disabled: rgba(0, 0, 0, 0.3614);

  --win-accent-default: #005FB8; /* SystemAccentColorDark1 for Light Mode */
  --win-accent-secondary: rgba(0, 95, 184, 0.90);
  --win-accent-tertiary: rgba(0, 95, 184, 0.80);
  --win-accent-text-primary: #003E92;
  --win-text-on-accent: #FFFFFF;

  --win-shadow-window-active: 0 32px 64px rgba(0, 0, 0, 0.1876), 0 2px 21px rgba(0, 0, 0, 0.1474);
  --win-shadow-window-inactive: 0 16px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  --win-shadow-flyout: 0 8px 16px rgba(0, 0, 0, 0.14);

  /* Android 16 M3 Expressive Light Mode */
  --m3-surface-dim: #DED8E1;
  --m3-surface: #FEF7FF;
  --m3-surface-bright: #FEF7FF;
  --m3-surface-container-lowest: #FFFFFF;
  --m3-surface-container-low: #F7F2FA;
  --m3-surface-container: #F3EDF7;
  --m3-surface-container-high: #ECE6F0;
  --m3-surface-container-highest: #E6E0E9;
  --m3-shade-scrim-blur: rgba(254, 247, 255, 0.75);

  --m3-primary: #6750A4;
  --m3-on-primary: #FFFFFF;
  --m3-primary-container: #EADDFF;
  --m3-on-primary-container: #21005D;
  --m3-secondary: #625B71;
  --m3-on-secondary: #FFFFFF;
  --m3-secondary-container: #E8DEF8;
  --m3-on-secondary-container: #1D192B;
  --m3-tertiary: #7D5260;
  --m3-on-tertiary: #FFFFFF;
  --m3-tertiary-container: #FFD8E4;
  --m3-on-tertiary-container: #31111D;

  --m3-on-surface: #1D1B20;
  --m3-on-surface-variant: #49454F;
  --m3-outline: #79747E;
  --m3-outline-variant: #CAC4D0;
}
```

---

## PART 4: UNIFIED PORTFOLIO STATE & COMPONENT ARCHITECTURE

Build a single central state store (e.g., Zustand / Redux / React Context) shared by both OS renderers:

```typescript
export type AppId =
  | 'explorer' // Projects & Case Studies
  | 'about'    // Settings > System > About (Bio, Education, Experience, Resume)
  | 'terminal' // Interactive CLI (help, skills, projects, contact, neofetch)
  | 'vscode'   // Live Code / GitHub Repository Viewer
  | 'browser'  // Live Project Previews & Blog Articles
  | 'contact'; // Mail / Direct Message Client

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  snapPosition: 'none' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface OSStoreState {
  theme: 'dark' | 'light';
  accentSeed: 'cobalt' | 'violet' | 'emerald' | 'amber';
  wallpaperId: number;
  activeAppId: AppId | null;
  windows: Record<AppId, WindowState>;

  // Transient Shells
  isStartMenuOpen: boolean;     // Windows 11 Start Menu / Android App Drawer
  isQuickSettingsOpen: boolean; // Windows 11 Quick Settings / Android Notification Shade
  isWidgetsOpen: boolean;       // Windows 11 Left Widgets Board
}
```

