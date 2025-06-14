
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 korean-accent opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-beige/50 to-stone-beige"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-stone-powder/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-stone-lavender/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-stone-black mb-6 font-snap">
          Cartes collection et Goodies
        </h1>
        
        <p className="text-xl md:text-2xl text-stone-black/70 mb-8 font-snap leading-relaxed">
          inspirés des Séries Coréennes
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
