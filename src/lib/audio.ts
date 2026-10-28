let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscs: OscillatorNode[] = [];

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playWindowsSound(type: 'click' | 'open' | 'minimize' | 'notify') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    if (type === 'click') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'open') {
      // Win11 ascending harmonic chord (E5: 659Hz, B5: 987Hz)
      const freqs = [659.25, 987.77];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        noteGain.gain.setValueAtTime(0.001, now + i * 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.05, now + i * 0.05 + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.25);
        osc.connect(noteGain);
        noteGain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.25);
      });
    } else if (type === 'minimize') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'notify') {
      // Windows 11 Action Center chime (F#5: 739.99Hz, C#6: 1108.73Hz)
      const notes = [
        { f: 739.99, delay: 0 },
        { f: 1108.73, delay: 0.1 },
      ];
      notes.forEach(({ f, delay }) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + delay);
        noteGain.gain.setValueAtTime(0.001, now + delay);
        noteGain.gain.exponentialRampToValueAtTime(0.07, now + delay + 0.03);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.45);
        osc.connect(noteGain);
        noteGain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.45);
      });
    }
  } catch {}
}

export function playAndroidTapSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.025);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.025);
  } catch {}
}

export function toggleAmbientAudio(enable: boolean) {
  if (typeof window === 'undefined') return;
  if (!enable) {
    if (masterGain && audioCtx) {
      masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.4);
      setTimeout(() => {
        oscs.forEach((o) => {
          try { o.stop(); o.disconnect(); } catch {}
        });
        oscs = [];
      }, 500);
    }
    return;
  }

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.2);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(440, ctx.currentTime);
    masterGain.connect(filter);
    filter.connect(ctx.destination);

    const freqs = [174.61, 261.63, 311.13, 392.0];
    oscs = freqs.map((freq) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.connect(masterGain!);
      osc.start();
      return osc;
    });
  } catch (err) {
    console.error('Audio initialization error:', err);
  }
}
