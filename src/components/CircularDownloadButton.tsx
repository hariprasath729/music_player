import React from 'react';
import { Download, CheckCircle2 } from 'lucide-react';

interface CircularDownloadButtonProps {
  isDownloaded: boolean;
  progress?: number; // 0 to 1
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: number;
}

export const CircularDownloadButton: React.FC<CircularDownloadButtonProps> = ({
  isDownloaded,
  progress,
  onClick,
  className = '',
  size = 16,
}) => {
  const isDownloading = progress !== undefined && progress < 1;

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center rounded-full transition-all focus:outline-none ${className}`}
      title={isDownloaded ? 'Remove download' : isDownloading ? 'Downloading...' : 'Download'}
      disabled={isDownloading}
      style={{ width: size + 4, height: size + 4 }}
    >
      {isDownloaded ? (
        <CheckCircle2 className="text-[#1db954] animate-fade-in" style={{ width: size, height: size }} />
      ) : isDownloading ? (
        <svg
          width={size + 6}
          height={size + 6}
          viewBox="0 0 24 24"
          className="-rotate-90 animate-pulse"
        >
          {/* Background circle */}
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="transparent"
            stroke="#1db954"
            strokeWidth="3"
            strokeDasharray={2 * Math.PI * 9}
            strokeDashoffset={2 * Math.PI * 9 * (1 - (progress ?? 0))}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>
      ) : (
        <Download className="transition-transform active:scale-95" style={{ width: size, height: size }} />
      )}
    </button>
  );
};
