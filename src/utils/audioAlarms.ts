/**
 * Web Audio API synthesizer for alarms and notifications.
 * Self-contained without external audio dependencies.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a high-urgency Android-style siren alarm for budget overruns
 */
export function playBudgetAlarmSiren(durationSeconds = 2.5): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    // Frequency modulation for siren effect (alternating between 880Hz and 587Hz)
    const cycles = Math.floor(durationSeconds * 3);
    for (let i = 0; i <= cycles; i++) {
      const time = now + (i * (durationSeconds / cycles));
      const freq = i % 2 === 0 ? 880 : 587;
      osc.frequency.setValueAtTime(freq, time);
    }

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + durationSeconds);

    // Haptic vibration on Android
    triggerHapticVibration([300, 100, 300, 100, 500]);
  } catch (err) {
    console.warn('Audio alarm playback failed', err);
  }
}

/**
 * Play a medium-urgency warning beep for reaching 80-95% of budget
 */
export function playWarningBeep(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // First beep
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.18);

    // Second beep
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, now + 0.22); // A5
    gain2.gain.setValueAtTime(0.2, now + 0.22);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.22);
    osc2.stop(now + 0.42);

    triggerHapticVibration([150, 80, 150]);
  } catch (err) {
    console.warn('Warning beep failed', err);
  }
}

/**
 * Pleasant money/coin chime when clocking in or crossing salary milestones
 */
export function playCashChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.18, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.25);
    });

    triggerHapticVibration([50, 40, 60]);
  } catch (err) {
    console.warn('Cash chime failed', err);
  }
}

/**
 * Android haptic vibration
 */
export function triggerHapticVibration(pattern: number[] = [80]): void {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignored if user has not interacted or device unsupported
    }
  }
}
