import React from 'react';
import AnimatedContent from './AnimatedContent';

interface ScrollAnimateContainerProps {
  children: React.ReactNode;
  delay?: number;
}

export const ScrollAnimateContainer: React.FC<ScrollAnimateContainerProps> = ({ children, delay = 0 }) => {
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
};

export default ScrollAnimateContainer;
