import React, { useState, useEffect } from 'react';
import { GuideStep } from '../types';
import { GUIDE_STEPS } from '../constants';
import BreathingVisual from './BreathingVisual';
import { ChevronRight, ChevronLeft, Home, Sparkles, Timer } from 'lucide-react';

interface GuideScreenProps {
  onReturn: () => void;
}

const GuideScreen: React.FC<GuideScreenProps> = ({ onReturn }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentStep: GuideStep = GUIDE_STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === GUIDE_STEPS.length - 1;

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStepIndex < GUIDE_STEPS.length - 1) {
        setCurrentStepIndex(prev => prev + 1);
      }
      setIsTransitioning(false);
    }, 400); // Wait for fade out
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStepIndex > 0) {
        setCurrentStepIndex(prev => prev - 1);
      }
      setIsTransitioning(false);
    }, 400);
  };

  // Progress bar calculation
  const progress = ((currentStepIndex + 1) / GUIDE_STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-earth-50 text-earth-800 transition-colors duration-1000">
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-earth-200">
        <div 
          className="h-full bg-sage-500 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top Nav */}
      <div className="w-full max-w-2xl px-6 pt-8 flex justify-between items-center z-20">
        <button 
          onClick={onReturn}
          className="p-2 rounded-full hover:bg-earth-200/50 transition-colors text-earth-600"
          aria-label="Return home"
        >
          <Home className="w-5 h-5" />
        </button>
        
        <div className="text-xs font-sans tracking-widest text-earth-400 uppercase">
          Step {currentStep.id} / {GUIDE_STEPS.length}
        </div>

        {/* Timer Display */}
        <div className={`flex items-center gap-2 text-xs font-sans tracking-wider ${timeLeft === 0 ? 'text-sage-600 font-bold' : 'text-earth-500'}`}>
          <Timer className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xl px-8 pb-20 z-10">
        
        {/* Animated Container */}
        <div 
          className={`
            flex flex-col items-center w-full transition-all duration-500 transform
            ${isTransitioning ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'}
          `}
        >
          {/* Visual Anchor - Only show breathing animation on steps 1, 2, 3 */}
          {(currentStepIndex < 3) && <BreathingVisual />}
          
          {/* If it's step 4 (Empty space), show a minimal visual */}
          {currentStepIndex === 3 && (
             <div className="h-32 w-full flex items-center justify-center my-8">
                <div className="w-2 h-2 bg-sage-400 rounded-full animate-pulse"></div>
             </div>
          )}

          {/* If it's step 5 (Conclusion), show logo or final icon */}
          {currentStepIndex === 4 && (
             <div className="h-32 w-full flex items-center justify-center my-8">
                <Sparkles className="w-12 h-12 text-earth-400 opacity-60" />
             </div>
          )}

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-serif text-earth-900 mb-10 tracking-wide text-center">
            {currentStep.title}
          </h2>

          {/* Content Lines */}
          <div className="space-y-8 text-center max-w-lg">
            {currentStep.content.map((line, idx) => (
              <p 
                key={idx} 
                className="text-xl md:text-2xl font-serif font-light leading-loose text-earth-800 tracking-wide"
                style={{ 
                  animationDelay: `${idx * 150}ms` 
                }}
              >
                {line}
              </p>
            ))}
          </div>

        </div>
      </div>

      {/* Controls */}
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-earth-100 to-transparent pt-12 pb-8 px-8 flex justify-between items-end z-20 max-w-screen-xl mx-auto left-0 right-0">
        <button 
          onClick={handlePrev}
          disabled={isFirstStep}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium tracking-wider transition-all font-sans
            ${isFirstStep 
              ? 'opacity-0 pointer-events-none' 
              : 'text-earth-500 hover:bg-earth-200/50 hover:text-earth-800'
            }
          `}
        >
          <ChevronLeft className="w-4 h-4" />
          BACK
        </button>

        {!isLastStep ? (
          <button 
            onClick={handleNext}
            className="group flex items-center gap-3 pl-6 pr-5 py-3 bg-earth-800 text-earth-50 rounded-full shadow-lg hover:bg-sage-800 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="text-sm tracking-widest font-sans">NEXT</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button 
            onClick={onReturn}
            className="group flex items-center gap-3 px-6 py-3 bg-sage-700 text-white rounded-full shadow-lg hover:bg-sage-600 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span className="text-sm tracking-widest font-sans">COMPLETE</span>
            <Home className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default GuideScreen;