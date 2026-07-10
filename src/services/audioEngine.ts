// Web Audio API Procedural Synth & Playback Engine

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private media: HTMLAudioElement | null = null;
  
  private isPlaying: boolean = false;
  private currentGenre: string = 'ambient';
  private scheduledNodes: { stop: () => void }[] = [];
  
  private startTime: number = 0;
  private pausedTime: number = 0;
  private currentTrackDuration: number = 200;
  private mediaEnded: boolean = false;
  private playbackRate: number = 1;
  private onEndedCallback: (() => void) | null = null;

  // Pattern loop timers
  private loopInterval: number | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.8;
      
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play( duration: number, startFromTime: number = 0, fileUrl?: string, preloadedMedia?: HTMLAudioElement) {
    if (fileUrl) {
      this.playMedia(fileUrl, duration, startFromTime, preloadedMedia);
      return;
    }

    console.warn('[AudioEngine] Play called without a valid file URL. Ignoring synth fallback.');
    this.isPlaying = false;
  }

  private playMedia(fileUrl: string, duration: number, startFromTime: number = 0, preloadedMedia?: HTMLAudioElement) {
    this.clearAllNodes();

    if (preloadedMedia && preloadedMedia.src === fileUrl) {
      if (this.media && this.media !== preloadedMedia) {
        this.media.pause();
        this.media.onended = null;
        this.media.onloadedmetadata = null;
      }
      this.media = preloadedMedia;
      // Bind standard ended handlers for preloaded media
      this.media.onended = () => {
        this.mediaEnded = true;
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      };
      this.media.onloadedmetadata = () => {
        if (this.media && Number.isFinite(this.media.duration)) {
          this.currentTrackDuration = this.media.duration;
        }
      };
    } else if (!this.media || this.media.src !== fileUrl) {
      if (this.media) {
        this.media.pause();
        this.media.onended = null;
        this.media.onloadedmetadata = null;
      }
      this.media = new Audio(fileUrl);
      this.media.crossOrigin = 'anonymous';
      this.media.preload = 'auto';
      this.media.onloadedmetadata = () => {
        if (this.media && Number.isFinite(this.media.duration)) {
          this.currentTrackDuration = this.media.duration;
        }
      };
      this.media.onended = () => {
        this.mediaEnded = true;
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      };
    }

    this.currentTrackDuration = duration || Number.POSITIVE_INFINITY;
    this.isPlaying = true;
    this.mediaEnded = false;
    this.pausedTime = startFromTime;

    try {
      this.media.currentTime = startFromTime;
    } catch {
      // Some CDNs may not allow seeking before metadata is ready.
    }

    this.media.playbackRate = this.playbackRate;
    this.media.volume = this.masterGain?.gain.value ?? 0.7;
    void this.media.play().catch((err) => {
      console.warn('[audioEngine] Media playback failed:', err);
      this.isPlaying = false;
    });
  }

  public pause() {
    if (this.media) {
      this.pausedTime = this.media.currentTime || 0;
      this.media.pause();
      this.isPlaying = false;
      return;
    }

    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    
    // Fade out smoothly to avoid clicks
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);

    setTimeout(() => {
      this.clearAllNodes();
      this.isPlaying = false;
      if (this.ctx) {
        this.pausedTime = this.ctx.currentTime - this.startTime;
      }
    }, 100);
  }

  public stop() {
    if (this.media) {
      this.media.pause();
      this.media.currentTime = 0;
      this.pausedTime = 0;
      this.mediaEnded = false;
    }
    this.clearAllNodes();
    this.isPlaying = false;
  }

  public seek(time: number) {
    if (this.media) {
      try {
        this.media.currentTime = time;
      } catch {
        // Ignore seek errors until metadata is available.
      }
      this.pausedTime = time;
      return;
    }

    if (!this.ctx) return;
    this.startTime = this.ctx.currentTime - time;
    if (this.isPlaying) {
      // Small restart to sync patterns
      this.clearAllNodes();
      this.startGenreLoop(this.currentGenre);
    }
  }

  public setVolume(volume: number) {
    if (this.media) {
      this.media.volume = Math.max(0, Math.min(1, volume));
    }
    if (this.masterGain && this.ctx) {
      // Clamp between 0 and 1
      const v = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setValueAtTime(v, this.ctx.currentTime);
    }
  }

  public setPlaybackRate(rate: number) {
    this.playbackRate = rate;
    if (this.media) {
      this.media.playbackRate = rate;
    }
  }

  public getPlaybackRate(): number {
    return this.playbackRate;
  }

  public setOnEnded(callback: () => void) {
    this.onEndedCallback = callback;
  }

  public getCurrentTime(): number {
    if (this.media) {
      return this.media.currentTime || this.pausedTime || 0;
    }

    if (!this.isPlaying || !this.ctx) {
      return this.pausedTime;
    }
    const t = this.ctx.currentTime - this.startTime;
    if (t >= this.currentTrackDuration) {
      return this.currentTrackDuration;
    }
    return t;
  }

  public getDuration(): number {
    if (this.media && Number.isFinite(this.media.duration) && this.media.duration > 0) {
      return this.media.duration;
    }
    return Number.isFinite(this.currentTrackDuration) ? this.currentTrackDuration : 0;
  }

  public hasEnded(): boolean {
    return this.media ? this.media.ended || this.mediaEnded : false;
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(64);
    }
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  private clearAllNodes() {
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    this.scheduledNodes.forEach(node => {
      try { node.stop(); } catch { /* ignore */ }
    });
    this.scheduledNodes = [];
  }

  // --- PROCEDURAL AUDIO GENERATOR ENGINES ---

  private startGenreLoop(genre: string) {
    if (!this.ctx) return;
    
    if (genre === 'lofi') {
      this.playLofiAmbient();
    } else if (genre === 'synthwave') {
      this.playSynthwave();
    } else if (genre === 'house') {
      this.playHouse();
    } else if (genre === 'ambient') {
      this.playAmbient();
    } else {
      this.playAcoustic();
    }
  }

  // 1. Lo-Fi Chill Beats
  private playLofiAmbient() {
    if (!this.ctx || !this.masterGain) return;

    // Create a continuous warm vinyl/tape hiss
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter the noise to sound like warm tape
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 800;
    noiseFilter.Q.value = 1.5;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.value = 0.03;

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    
    whiteNoise.start();
    this.scheduledNodes.push({ stop: () => whiteNoise.stop() });

    // Play dreamy electric piano chords using sine/triangle waves + lowpass filter
    const chords = [
      [130.81, 164.81, 196.00, 246.94], // Cmaj7
      [146.83, 174.61, 220.00, 261.63], // Dmin7
      [164.81, 196.00, 246.94, 293.66], // Emin7
      [130.81, 164.81, 196.00, 246.94]  // Cmaj7
    ];

    let chordIdx = 0;
    const playChord = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIdx];
      
      currentChord.forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        // Gentle soft attack and slow release
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.linearRampToValueAtTime(400, now + 3);

        osc.connect(gain);
        gain.connect(filter);
        filter.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 4);
        this.scheduledNodes.push({ stop: () => osc.stop() });
      });

      // Add a subtle kick and snap
      this.playKick(now, 60, 0.3);
      this.playKick(now + 1.5, 60, 0.2);
      this.playSnare(now + 1.0, 0.05);
      this.playSnare(now + 3.0, 0.05);

      chordIdx = (chordIdx + 1) % chords.length;
    };

    playChord();
    this.loopInterval = window.setInterval(playChord, 4000);
  }

  // 2. Synthwave / Outrun
  private playSynthwave() {
    if (!this.ctx || !this.masterGain) return;

    // Deep pulsing 16th-note sawtooth bassline
    const bassNotes = [55.00, 55.00, 55.00, 55.00, 65.41, 65.41, 58.27, 58.27];
    let step = 0;

    const playStep = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      // Bass note
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.value = bassNotes[step % bassNotes.length];

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(200, now + 0.15);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.15);

      // Four-on-the-floor Kick
      if (step % 4 === 0) {
        this.playKick(now, 90, 0.4);
      }
      // Snare on 2 and 4
      if (step % 8 === 4) {
        this.playSnare(now, 0.12);
      }
      // Hi-hats
      if (step % 2 === 0) {
        this.playHiHat(now, 0.03);
      }

      step++;
    };

    playStep();
    this.loopInterval = window.setInterval(playStep, 150);

    // Warm high synth pads
    const playPads = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const padFreqs = [220.00, 261.63, 329.63]; // A minor
      
      padFreqs.forEach(freq => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;

        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.linearRampToValueAtTime(1200, now + 2);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.04, now + 1);
        gain.gain.linearRampToValueAtTime(0, now + 4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 4);
      });
    };

    playPads();
    setInterval(() => { if (this.isPlaying) playPads(); }, 4000);
  }

  // 3. Deep House
  private playHouse() {
    if (!this.ctx || !this.masterGain) return;

    let step = 0;
    const bassFreqs = [65.41, 65.41, 73.42, 58.27]; // C2, C2, D2, A#1

    const playHouseStep = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      // Kick on every beat
      if (step % 4 === 0) {
        this.playKick(now, 110, 0.5);
      }

      // Off-beat open hi-hat
      if (step % 4 === 2) {
        this.playHiHat(now, 0.06, 0.15);
      }

      // FM-style bouncy Bass on specific steps
      if (step % 4 === 1 || step % 4 === 2) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.value = bassFreqs[Math.floor(step / 16) % bassFreqs.length];

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.18);
      }

      // Snare/Clap on beats 2 and 4
      if (step % 8 === 4) {
        this.playSnare(now, 0.1);
      }

      step++;
    };

    playHouseStep();
    this.loopInterval = window.setInterval(playHouseStep, 120);
  }

  // 4. Ambient Dreamscapes
  private playAmbient() {
    if (!this.ctx || !this.masterGain) return;

    // Slow drifting multi-layered pure sine waves
    const baseFreqs = [130.81, 196.00, 246.94, 293.66, 392.00]; // Cmaj9 pentatonic
    
    const triggerSwell = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      // Pick 3 random frequencies
      const shuffled = [...baseFreqs].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      selected.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        // Slight detuning for richness
        osc.type = 'sine';
        osc.frequency.value = freq + (Math.random() * 0.8 - 0.4);

        // Extremely slow attack and decay
        const start = now + idx * 0.5;
        const duration = 8 + Math.random() * 4;

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.06, start + duration * 0.4);
        gain.gain.linearRampToValueAtTime(0, start + duration);

        // Spatial panning
        const panner = this.ctx!.createStereoPanner();
        panner.pan.value = Math.random() * 1.4 - 0.7;

        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain!);

        osc.start(start);
        osc.stop(start + duration);
        this.scheduledNodes.push({ stop: () => osc.stop() });
      });
    };

    triggerSwell();
    this.loopInterval = window.setInterval(triggerSwell, 5000);
  }

  // 5. Acoustic Indie
  private playAcoustic() {
    if (!this.ctx || !this.masterGain) return;

    // Warm picked arpeggio patterns
    const notes = [130.81, 196.00, 261.63, 329.63, 392.00, 329.63, 261.63, 196.00]; // C major arpeggio
    let step = 0;

    const playPluck = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Triangle gives a lovely round acoustic-like plucked tone
      osc.type = 'triangle';
      osc.frequency.value = notes[step % notes.length];

      // Sharp acoustic attack, natural acoustic decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.linearRampToValueAtTime(400, now + 0.5);

      osc.connect(gain);
      gain.connect(filter);
      filter.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.8);

      // Soft foot tap every 4 steps
      if (step % 4 === 0) {
        this.playKick(now, 50, 0.15);
      }

      step++;
    };

    playPluck();
    this.loopInterval = window.setInterval(playPluck, 250);
  }

  // --- PERCUSSION HELPERS ---

  private playKick(time: number, startFreq: number = 100, volume: number = 0.4) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.15);

    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  private playSnare(time: number, volume: number = 0.1) {
    if (!this.ctx || !this.masterGain) return;
    
    // Short burst of noise
    const bufferSize = this.ctx.sampleRate * 0.1;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    noise.connect(noiseFilter);
    noiseFilter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.1);
  }

  private playHiHat(time: number, volume: number = 0.04, duration: number = 0.04) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * duration;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 8000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(noiseFilter);
    noiseFilter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + duration);
  }
}

export const audioEngine = new AudioEngine();
