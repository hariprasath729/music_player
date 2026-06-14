import React from 'react';
import { CheckCircle2, Heart, Plus, Trash2, Download, Link2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  check: CheckCircle2,
  heart: Heart,
  heartBreak: Heart,
  plus: Plus,
  minus: Trash2,
  download: Download,
  link: Link2,
};

export const Toast: React.FC = () => {
  const { toasts } = usePlayer();

  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed bottom-28 left-1/2 z-[100] flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-24">
      {toasts.map((t, i) => {
        const isLatest = i === toasts.length - 1;
        const Icon = t.icon ? ICONS[t.icon] : null;
        const isLikeBreak = t.icon === 'heartBreak';

        return (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 rounded-lg bg-[#3d3d3d] px-4 py-2.5 text-[13px] font-semibold text-white shadow-xl transition-all duration-300 ${
              isLatest ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
          >
            {Icon && (
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  t.icon === 'heart' && !isLikeBreak
                    ? 'fill-[#1db954] text-[#1db954]'
                    : isLikeBreak
                    ? 'text-white/70'
                    : 'text-white/90'
                }`}
              />
            )}
            <span>{t.text}</span>
          </div>
        );
      })}
    </div>
  );
};
