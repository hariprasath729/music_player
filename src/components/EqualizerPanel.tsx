import React from 'react';
import { createPortal } from 'react-dom';
import { X, SlidersHorizontal } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';
import { useEqualizer } from '../equalizer/useEqualizer';
import { EQ_BANDS, EQ_PRESETS, type EqualizerPresetName } from '../equalizer/presets';
import { EqualizerSlider } from './EqualizerSlider';

interface EqualizerPanelProps {
  onClose: () => void;
}

const presetOptions: EqualizerPresetName[] = ['Flat', 'Bass Boost', 'Vocal', 'Rock', 'Pop', 'Classical', 'Jazz', 'Electronic', 'Hip-Hop', 'Custom'];

export const EqualizerPanel: React.FC<EqualizerPanelProps> = ({ onClose }) => {
  const eq = useEqualizer();
  const [isPresetOpen, setIsPresetOpen] = React.useState(false);

  const applyPreset = (preset: EqualizerPresetName) => {
    audioEngine.setEqualizerPreset(preset);
  };

  const updateBand = (band: number, value: number) => {
    audioEngine.setEqualizerBandGain(band as typeof EQ_BANDS[number], value);
  };

  const setEnabled = (enabled: boolean) => {
    audioEngine.setEqualizerEnabled(enabled);
  };

  const setPreamp = (value: number) => {
    audioEngine.setEqualizerPreamp(value);
  };

  const currentBands = eq.bands;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop overlay sibling (prevents Chrome misalignment bug inside filters) */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md" 
        onClick={onClose}
      />
      {/* Modal card container */}
      <div className="relative z-10 flex h-full w-full flex-col bg-[#121212] shadow-2xl sm:h-auto sm:max-h-[95vh] sm:max-w-6xl sm:rounded-[28px] sm:border sm:border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1db954]/15 text-[#1db954]">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Equalizer</h2>
              <p className="text-xs text-[#b3b3b3]">10-band Web Audio processing</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-[#b3b3b3] transition hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 min-w-0 w-full overflow-y-auto px-5 py-5 sm:px-6 grid grid-cols-1 gap-5 lg:grid-cols-[320px_1fr]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 w-full min-w-0">
            <div className="block space-y-2 w-full min-w-0 relative">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b3b3b3] block">Preset</span>
              <button
                type="button"
                onClick={() => setIsPresetOpen(!isPresetOpen)}
                className="flex items-center justify-between w-full min-w-0 rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-[#1db954]"
              >
                <span>{eq.preset}</span>
                <svg className={`h-4 w-4 text-[#b3b3b3] transition-transform ${isPresetOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isPresetOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsPresetOpen(false)} />
                  <div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-2xl border border-white/10 bg-[#1a1a1a] p-1 shadow-2xl z-50 scrollbar-none">
                    {presetOptions.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          applyPreset(preset);
                          setIsPresetOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-colors ${
                          eq.preset === preset 
                            ? 'bg-[#1db954] text-black font-semibold' 
                            : 'text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{preset}</span>
                        {eq.preset === preset && (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 py-3 w-full min-w-0">
              <div>
                <span className="block text-sm font-semibold text-white">Enable EQ</span>
                <span className="block text-xs text-[#b3b3b3]">Bypass when off</span>
              </div>
              <button
                onClick={() => setEnabled(!eq.enabled)}
                className={`relative h-8 w-14 rounded-full transition ${eq.enabled ? 'bg-[#1db954]' : 'bg-white/15'}`}
                aria-pressed={eq.enabled}
                aria-label="Toggle equalizer"
              >
                <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${eq.enabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="block space-y-2 w-full min-w-0">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b3b3b3] block">Preamp</span>
              <input
                type="range"
                min={-12}
                max={12}
                step={0.5}
                value={eq.preamp}
                onChange={(e) => setPreamp(Number(e.target.value))}
                className="eq-horizontal h-2 w-full appearance-none rounded-full bg-white/10 min-w-0"
              />
              <div className="flex justify-between text-xs text-[#b3b3b3]">
                <span>-12 dB</span>
                <span className="font-semibold text-white">{eq.preamp.toFixed(1).replace(/\.0$/, '')} dB</span>
                <span>+12 dB</span>
              </div>
            </div>

            <div className="hidden lg:block rounded-2xl border border-white/10 bg-[#101010] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b3b3b3]">Current preset values</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[#b3b3b3] sm:grid-cols-5">
                {EQ_BANDS.map((band) => (
                  <div key={band} className="rounded-xl bg-white/5 px-3 py-2 text-center">
                    <span className="block text-white">{band >= 1000 ? `${band / 1000}K` : band}</span>
                    <span>{currentBands[band].toFixed(1).replace(/\.0$/, '')} dB</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => applyPreset('Flat')}
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Reset to Flat
            </button>
          </div>

          <div className="min-w-0 rounded-3xl border border-white/10 bg-[#101010] p-4 sm:p-5 flex flex-col justify-between">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white">10 Band Graphic EQ</h3>
                <p className="text-sm text-[#b3b3b3]">Changes apply instantly to the current song</p>
              </div>
              <div className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-[#b3b3b3]">{eq.enabled ? 'On' : 'Bypassed'}</div>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent md:justify-center md:gap-4 lg:grid lg:grid-cols-10 lg:gap-2">
              {EQ_BANDS.map((band) => (
                <EqualizerSlider
                  key={band}
                  label={band >= 1000 ? `${band / 1000}K` : `${band}`}
                  value={currentBands[band]}
                  onChange={(value) => updateBand(band, value)}
                />
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .eq-horizontal::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 999px;
            background: linear-gradient(90deg, rgba(29,185,84,0.35), rgba(255,255,255,0.12));
          }
          .eq-horizontal::-webkit-slider-thumb {
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 999px;
            background: #1db954;
            border: 2px solid #0f0f0f;
            margin-top: -5px;
          }
          .eq-horizontal::-moz-range-track {
            height: 8px;
            border-radius: 999px;
            background: linear-gradient(90deg, rgba(29,185,84,0.35), rgba(255,255,255,0.12));
          }
          .eq-horizontal::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 999px;
            background: #1db954;
            border: 2px solid #0f0f0f;
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
};
