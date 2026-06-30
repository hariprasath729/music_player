import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import AnimatedContent from './AnimatedContent';

interface ScrollAnimateContainerProps {
  children: React.ReactNode;
  delay?: number;
}

export const ScrollAnimateContainer: React.FC<ScrollAnimateContainerProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Triggers when at least 15% of the element is visible in the viewport.
  // once: false allows elements to re-animate when scrolling back in.
  const inView = useInView(ref, { amount: 0.15, once: false });
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false;
  });

  useEffect(() => {
    // Check if the viewport matches mobile breakpoint (less than 768px)
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    
    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Listener function for media query changes
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // On desktop or tablet (>= 768px), render GSAP AnimatedContent
  if (!isMobile) {
    return (
      <AnimatedContent
        distance={40}
        direction="vertical"
        reverse={false}
        duration={0.7}
        ease="power2.out"
        initialOpacity={0}
        animateOpacity={true}
        scale={0.95}
        threshold={0.05}
        delay={delay}
      >
        {children}
      </AnimatedContent>
    );
  }

  // On mobile screens, render the motion.div wrapper with scroll animation
  const animationProps = {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: 20 },
    transition: { duration: 0.45, delay, ease: [0.215, 0.610, 0.355, 1] as const }
  };

  return (
    <motion.div ref={ref} {...animationProps}>
      {children}
    </motion.div>
  );
};

export default ScrollAnimateContainer;
