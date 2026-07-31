import { DEFAULT_EQUALIZER_STATE, EQ_STORAGE_KEY, normalizeEqualizerState, type EqualizerState } from './presets';

export function loadEqualizerState(): EqualizerState {
  try {
    const raw = localStorage.getItem(EQ_STORAGE_KEY);
    if (!raw) return DEFAULT_EQUALIZER_STATE;
    return normalizeEqualizerState(JSON.parse(raw) as Partial<EqualizerState>);
  } catch {
    return DEFAULT_EQUALIZER_STATE;
  }
}

export function saveEqualizerState(state: EqualizerState): void {
  try {
    localStorage.setItem(EQ_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures
  }
}
