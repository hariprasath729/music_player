import React from 'react';
import LiquidEther from '../LiquidEther';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-[100dvh] w-screen overflow-hidden bg-black text-white">
      {/* WebGL Fluid Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-auto w-full h-full">
        <LiquidEther
          mouseForce={17}
          cursorSize={55}
          isViscous={true}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={8}
          resolution={0.5}
          isBounce={true}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      
      {/* Content Overlay Layer — pointer-events-none lets mouse drag move background */}
      <div className="relative z-10 w-full h-full min-h-[100dvh] pointer-events-none flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
