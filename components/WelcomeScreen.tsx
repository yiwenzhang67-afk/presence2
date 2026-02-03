import React from 'react';
import { INGREDIENTS } from '../constants';
import { Leaf, Wind, Timer } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-earth-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sage-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-earth-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

      <div className="z-10 max-w-md w-full text-center space-y-12 animate-fade-in">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-block p-3 rounded-full bg-sage-50 border border-sage-100 mb-4">
             <Wind className="w-6 h-6 text-sage-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-light tracking-widest text-earth-900">
            临在
          </h1>
          <p className="text-sm font-sans tracking-[0.2em] text-sage-700 uppercase">
            Presence
          </p>
          <div className="w-16 h-[1px] bg-earth-400 mx-auto mt-6"></div>
        </div>

        {/* Intro */}
        <div className="space-y-2">
          <p className="text-earth-600 font-serif leading-relaxed italic">
            “你不需要改变什么，你已经在这里。”
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-earth-500 font-sans tracking-wider mt-4">
            <Timer className="w-3 h-3" />
            <span>3分钟静心之旅</span>
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xs font-bold tracking-widest text-earth-500 mb-4 uppercase">
            Blend Composition
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {INGREDIENTS.map((ing) => (
              <span 
                key={ing.name}
                className="px-3 py-1 bg-white/60 border border-sage-100/50 rounded-full text-xs text-earth-700 font-sans shadow-sm"
              >
                {ing.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action */}
        <button 
          onClick={onStart}
          className="group relative px-8 py-3 bg-earth-800 text-earth-50 font-sans tracking-widest text-sm rounded-full overflow-hidden transition-all hover:bg-earth-700 hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:ring-offset-2 focus:ring-offset-earth-100"
        >
          <span className="relative z-10 flex items-center gap-2">
            开始冥想 (3分钟) <Leaf className="w-4 h-4 opacity-70 group-hover:rotate-12 transition-transform" />
          </span>
        </button>
      </div>
      
      <div className="absolute bottom-6 text-xs text-earth-400 font-sans">
        Mindfulness Essential Oil Companion
      </div>
    </div>
  );
};

export default WelcomeScreen;