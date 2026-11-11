/**
 * Web Audio API procedural romantic lofi chill beats synthesizer.
 * Provides soft romantic chords, warm tape/vinyl crackle, and sweet chime effects
 * with zero external file dependencies for 100% reliability.
 */

class RomanticLofiEngine {
  private ctx: AudioContext | null = null;
  private isPlayingState = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private vinylNode: AudioBufferSourceNode | null = null;
  private currentTrackIndex = 0;
  private volumeLevel = 0.55;

  private tracks = [
    {
      name: "Midnight Lofi Romance",
      tempo: 68,
      progression: [
        // Fmaj7 - Em7 - Dm7 - Cmaj7
        [174.61, 220.00, 261.63, 329.63],
        [164.81, 196.00, 246.94, 293.66],
        [146.83, 174.61, 220.00, 261.63],
        [130.81, 164.81, 196.00, 246.94],
      ],
      leadNotes: [392.00, 440.00, 523.25, 493.88, 392.00, 329.63, 261.63, 293.66]
    },
    {
      name: "Starry Night Cozy",
      tempo: 64,
      progression: [
        // Abmaj7 - Fm7 - Bbm7 - Eb7
        [207.65, 261.63, 311.13, 392.00],
        [174.61, 207.65, 261.63, 311.13],
        [233.08, 277.18, 349.23, 415.30],
        [155.56, 196.00, 233.08, 277.18],
      ],
      leadNotes: [523.25, 622.25, 698.46, 783.99, 622.25, 523.25, 466.16, 415.30]
    },
    {
      name: "Sweetest Memory",
      tempo: 72,
      progression: [
        // Cmaj9 - Am9 - Dm9 - G13
        [130.81, 196.00, 246.94, 293.66, 329.63],
        [110.00, 164.81, 220.00, 261.63, 329.63],
        [146.83, 220.00, 261.63, 329.63, 392.00],
        [98.00, 164.81, 196.00, 246.94, 329.63],
      ],
      leadNotes: [659.25, 587.33, 523.25, 392.00, 440.00, 493.88, 523.25, 659.25]
    }
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play a soft rhodes/piano chord with gentle decay and lowpass filter
  private playChord(freqs: number[], durationSec: number) {
    if (!this.ctx || !this.masterGain) return;

    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    chordGain.gain.linearRampToValueAtTime(0.22, this.ctx.currentTime + 0.12);
    chordGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);
    chordGain.connect(this.masterGain);

    // Warm vintage lowpass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);
    filter.connect(chordGain);

    freqs.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = i === 0 ? "sine" : "triangle";
      // Slight detune for warm vintage tape chorus
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, this.ctx.currentTime);

      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.7 / freqs.length, this.ctx.currentTime);

      osc.connect(noteGain);
      noteGain.connect(filter);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + durationSec);
    });
  }

  // Soft sparkle / bell lead note
  private playMelodyNote(freq: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 1.8);
  }

  // Vinyl crackle noise buffer
  private startVinylCrackle() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Occasional soft crackles
      const crackle = Math.random() < 0.001 ? (Math.random() * 2 - 1) * 0.4 : 0;
      data[i] = (Math.random() * 2 - 1) * 0.015 + crackle;
    }

    this.vinylNode = this.ctx.createBufferSource();
    this.vinylNode.buffer = buffer;
    this.vinylNode.loop = true;

    const vinylFilter = this.ctx.createBiquadFilter();
    vinylFilter.type = "bandpass";
    vinylFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const vinylGain = this.ctx.createGain();
    vinylGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.vinylNode.connect(vinylFilter);
    vinylFilter.connect(vinylGain);
    vinylGain.connect(this.masterGain);

    this.vinylNode.start(0);
  }

  public start() {
    this.initContext();
    if (this.isPlayingState) return;
    this.isPlayingState = true;
    this.startVinylCrackle();

    const track = this.tracks[this.currentTrackIndex];
    let step = 0;
    const chordDurationSec = (60 / track.tempo) * 4;

    const loop = () => {
      if (!this.isPlayingState) return;
      const chordIndex = step % track.progression.length;
      this.playChord(track.progression[chordIndex], chordDurationSec);

      // Play soft arpeggio lead notes
      const noteDelay1 = (chordDurationSec / 4) * 1000;
      const noteDelay2 = (chordDurationSec / 2) * 1000;
      const noteDelay3 = (chordDurationSec * 0.75) * 1000;

      setTimeout(() => {
        if (this.isPlayingState) {
          const lead = track.leadNotes[(step * 2) % track.leadNotes.length];
          this.playMelodyNote(lead);
        }
      }, noteDelay1);

      setTimeout(() => {
        if (this.isPlayingState) {
          const lead = track.leadNotes[(step * 2 + 1) % track.leadNotes.length];
          this.playMelodyNote(lead);
        }
      }, noteDelay2);

      setTimeout(() => {
        if (this.isPlayingState && Math.random() > 0.4) {
          const lead = track.leadNotes[(step * 2 + 2) % track.leadNotes.length];
          this.playMelodyNote(lead);
        }
      }, noteDelay3);

      step++;
      this.timerId = window.setTimeout(loop, chordDurationSec * 1000);
    };

    loop();
  }

  public stop() {
    this.isPlayingState = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.vinylNode) {
      try {
        this.vinylNode.stop();
        this.vinylNode.disconnect();
      } catch {
        // ignore
      }
      this.vinylNode = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlayingState) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(val: number) {
    this.volumeLevel = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
    }
  }

  public nextTrack(): string {
    const wasPlaying = this.isPlayingState;
    if (wasPlaying) this.stop();
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    if (wasPlaying) this.start();
    return this.tracks[this.currentTrackIndex].name;
  }

  public getCurrentTrackName(): string {
    return this.tracks[this.currentTrackIndex].name;
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  // Sweet chime sound effect for kisses and quiz achievements
  public playKissChime() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.08);

      const gain = this.ctx!.createGain();
      gain.gain.setValueAtTime(0.001, this.ctx!.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx!.currentTime + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + idx * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(this.ctx!.currentTime + idx * 0.08);
      osc.stop(this.ctx!.currentTime + idx * 0.08 + 0.85);
    });
  }

  // Typewriter gentle tick sound
  public playTypeTick() {
    if (!this.ctx || !this.masterGain || !this.isPlayingState) return;
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800 + Math.random() * 300, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.05);
  }
}

export const lofiAudio = new RomanticLofiEngine();
