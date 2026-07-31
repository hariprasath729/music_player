export const EQ_BANDS = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000] as const;

export type EqualizerBandFrequency = typeof EQ_BANDS[number];
export type EqualizerPresetName = 'Flat' | 'Bass Boost' | 'Vocal' | 'Rock' | 'Pop' | 'Classical' | 'Jazz' | 'Electronic' | 'Hip-Hop' | 'Custom';

export type EqualizerBands = Record<EqualizerBandFrequency, number>;

export interface EqualizerState {
  enabled: boolean;
  preset: EqualizerPresetName;
  preamp: number;
  bands: EqualizerBands;
}

export const EQ_STORAGE_KEY = 'music_player_equalizer_settings';

export const EQ_PRESETS: Record<Exclude<EqualizerPresetName, 'Custom'>, EqualizerBands> = {
  Flat: { 31: 0, 62: 0, 125: 0, 250: 0, 500: 0, 1000: 0, 2000: 0, 4000: 0, 8000: 0, 16000: 0 },
  'Bass Boost': { 31: 8, 62: 6, 125: 4, 250: 2, 500: 0, 1000: 0, 2000: -2, 4000: -4, 8000: -4, 16000: -4 },
  Vocal: { 31: -2, 62: -2, 125: 0, 250: 2, 500: 4, 1000: 6, 2000: 6, 4000: 4, 8000: 2, 16000: 0 },
  Rock: { 31: 5, 62: 4, 125: 2, 250: 0, 500: -2, 1000: 2, 2000: 4, 4000: 5, 8000: 6, 16000: 5 },
  Pop: { 31: -1, 62: 2, 125: 4, 250: 5, 500: 3, 1000: 0, 2000: -1, 4000: 2, 8000: 4, 16000: 5 },
  Classical: { 31: 0, 62: 0, 125: 1, 250: 2, 500: 3, 1000: 2, 2000: 1, 4000: 0, 8000: -1, 16000: -2 },
  Jazz: { 31: 2, 62: 2, 125: 1, 250: 0, 500: 1, 1000: 2, 2000: 3, 4000: 4, 8000: 3, 16000: 2 },
  Electronic: { 31: 6, 62: 5, 125: 4, 250: 2, 500: 0, 1000: 2, 2000: 4, 4000: 5, 8000: 6, 16000: 5 },
  'Hip-Hop': { 31: 7, 62: 6, 125: 5, 250: 2, 500: 0, 1000: 1, 2000: 2, 4000: 3, 8000: 2, 16000: 1 },
};

export const DEFAULT_EQUALIZER_STATE: EqualizerState = {
  enabled: false,
  preset: 'Flat',
  preamp: 0,
  bands: { ...EQ_PRESETS.Flat },
};

export const EQ_Q_FACTOR = 1.15;

export function cloneBands(bands: EqualizerBands): EqualizerBands {
  return { ...bands };
}

export function normalizeEqualizerState(input?: Partial<EqualizerState> | null): EqualizerState {
  const bands = { ...DEFAULT_EQUALIZER_STATE.bands };
  if (input?.bands) {
    for (const freq of EQ_BANDS) {
      const value = input.bands[freq];
      if (typeof value === 'number' && Number.isFinite(value)) {
        bands[freq] = Math.max(-12, Math.min(12, value));
      }
    }
  }

  const preset = input?.preset && (input.preset in EQ_PRESETS || input.preset === 'Custom')
    ? input.preset
    : DEFAULT_EQUALIZER_STATE.preset;

  return {
    enabled: typeof input?.enabled === 'boolean' ? input.enabled : DEFAULT_EQUALIZER_STATE.enabled,
    preset,
    preamp: typeof input?.preamp === 'number' && Number.isFinite(input.preamp)
      ? Math.max(-12, Math.min(12, input.preamp))
      : DEFAULT_EQUALIZER_STATE.preamp,
    bands,
  };
}

export function bandsFromPreset(preset: Exclude<EqualizerPresetName, 'Custom'>): EqualizerBands {
  return { ...EQ_PRESETS[preset] };
}
