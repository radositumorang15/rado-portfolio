let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscs: OscillatorNode[] = [];

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
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContextClass();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 1.2);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(440, audioCtx.currentTime);

    masterGain.connect(filter);
    filter.connect(audioCtx.destination);

    // Warm chord notes (F minor / Ab major: F3, C4, Eb4, G4)
    const freqs = [174.61, 261.63, 311.13, 392.0];
    oscs = freqs.map((freq) => {
      const osc = audioCtx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx!.currentTime);
      osc.connect(masterGain!);
      osc.start();
      return osc;
    });
  } catch (err) {
    console.error('Audio initialization error:', err);
  }
}
