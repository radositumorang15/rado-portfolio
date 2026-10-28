export interface AccentPreset {
  id: string;
  name: string;
  primary: string;
  soft: string;
  onPrimary: string;
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: 'blue', name: 'Rado Blue (Default)', primary: '#0B57D0', soft: 'rgba(11, 87, 208, 0.15)', onPrimary: '#FFFFFF' },
  { id: 'emerald', name: 'Grimoire Emerald', primary: '#10B981', soft: 'rgba(16, 185, 129, 0.15)', onPrimary: '#FFFFFF' },
  { id: 'purple', name: 'Mystic Violet', primary: '#7C3AED', soft: 'rgba(124, 58, 237, 0.15)', onPrimary: '#FFFFFF' },
  { id: 'amber', name: 'Sunburst Amber', primary: '#D97706', soft: 'rgba(217, 119, 6, 0.15)', onPrimary: '#FFFFFF' },
  { id: 'rose', name: 'Crimson Rose', primary: '#E11D48', soft: 'rgba(225, 29, 72, 0.15)', onPrimary: '#FFFFFF' },
  { id: 'cyan', name: 'Cyber Cyan', primary: '#0891B2', soft: 'rgba(8, 145, 178, 0.15)', onPrimary: '#FFFFFF' },
];

export function applyAccentColor(accentId: string) {
  if (typeof document === 'undefined') return;
  const preset = ACCENT_PRESETS.find((p) => p.id === accentId) || ACCENT_PRESETS[0];
  const root = document.documentElement;

  root.style.setProperty('--shell-accent', preset.primary);
  root.style.setProperty('--shell-accent-soft', preset.soft);
  root.style.setProperty('--rn-accent', preset.primary);
  root.style.setProperty('--rn-accent-soft', preset.soft);
  root.style.setProperty('--rn-on-accent', preset.onPrimary);
  root.style.setProperty('--nx-accent', preset.primary);

  localStorage.setItem('rn_accent', preset.id);
}
