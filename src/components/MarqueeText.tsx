import React, { useRef, useState, useEffect } from 'react';

export const MarqueeText: React.FC<{ children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }> = ({ children, className, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        // scrollWidth correctly measures the true size of the un-truncated text
        setIsOverflowing(textRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };

    checkOverflow();
    const observer = new ResizeObserver(() => checkOverflow());
    if (containerRef.current) observer.observe(containerRef.current);
    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, [children]);

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
      <div 
        ref={containerRef} 
        className="overflow-hidden whitespace-nowrap w-full"
        style={{
          maskImage: isOverflowing ? 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)' : 'none',
          WebkitMaskImage: isOverflowing ? 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)' : 'none'
        }}
      >
        <div className={`flex w-max ${isOverflowing ? 'animate-marquee hover:[animation-play-state:paused]' : ''}`}>
          <div onClick={onClick} className={`shrink-0 ${className || ''}`} style={{ paddingRight: isOverflowing ? '3rem' : '0' }}>
            <span ref={textRef} className="inline-block">{children}</span>
          </div>
          {isOverflowing && (
            <div onClick={onClick} className={`shrink-0 ${className || ''}`} style={{ paddingRight: '3rem' }}>
              <span className="inline-block">{children}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};