import { useEffect, useState } from 'react';
import { audioEngine } from '../services/audioEngine';
import type { EqualizerState } from './presets';

export function useEqualizer() {
  const [state, setState] = useState<EqualizerState>(() => audioEngine.getEqualizerState());

  useEffect(() => {
    const handleChange = () => setState(audioEngine.getEqualizerState());
    handleChange();
    window.addEventListener('music-player:equalizer-changed', handleChange as EventListener);
    return () => window.removeEventListener('music-player:equalizer-changed', handleChange as EventListener);
  }, []);

  return state;
}
