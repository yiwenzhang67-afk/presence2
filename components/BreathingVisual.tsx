import React from 'react';

const BreathingVisual: React.FC = () => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center my-8">
      {/* Outer Circle - Exhale */}
      <div className="absolute w-full h-full rounded-full bg-sage-200/30 animate-breathe blur-xl"></div>
      
      {/* Middle Circle */}
      <div className="absolute w-3/4 h-3/4 rounded-full bg-sage-300/40 animate-breathe delay-150 blur-lg"></div>
      
      {/* Core Circle - Inhale */}
      <div className="absolute w-1/2 h-1/2 rounded-full bg-earth-200/50 backdrop-blur-md border border-white/30 shadow-inner flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default BreathingVisual;