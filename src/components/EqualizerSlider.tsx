import React from 'react';

interface EqualizerSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const EqualizerSlider: React.FC<EqualizerSliderProps> = ({ label, value, onChange }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleTouch = (clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const pct = 1 - (y / rect.height);
    const clampedPct = Math.max(0, Math.min(1, pct));
    const rawValue = -12 + clampedPct * 24;
    const steppedValue = Math.round(rawValue * 2) / 2;
    onChange(steppedValue);
  };

  return (
    <div className="flex min-h-[210px] w-12 shrink-0 flex-col items-center gap-2 text-center">
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b3b3b3]">{label}</span>
      <div ref={containerRef} className="relative flex h-[160px] w-12 items-center justify-center">
        <input
          type="range"
          min={-12}
          max={12}
          step={0.5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onTouchStart={(e) => handleTouch(e.touches[0].clientY)}
          onTouchMove={(e) => handleTouch(e.touches[0].clientY)}
          className="eq-slider absolute h-8 w-[160px] rotate-[-90deg] appearance-none rounded-full bg-transparent"
          style={{ touchAction: 'none' }}
          aria-label={`${label} band`}
        />
      </div>
      <span className="text-xs font-semibold text-white">{value.toFixed(1).replace(/\.0$/, '')} dB</span>
      <style>{`
        .eq-slider::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(29,185,84,0.25), rgba(255,255,255,0.16));
        }
        .eq-slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          margin-top: -7px;
          background: #1db954;
          border: 2px solid #0f0f0f;
          box-shadow: 0 0 0 4px rgba(29,185,84,0.14);
          cursor: pointer;
        }
        .eq-slider::-moz-range-track {
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(29,185,84,0.25), rgba(255,255,255,0.16));
        }
        .eq-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #1db954;
          border: 2px solid #0f0f0f;
          box-shadow: 0 0 0 4px rgba(29,185,84,0.14);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
