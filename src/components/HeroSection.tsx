
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
        <h1 className="text-5xl md:text-7xl font-bold text-stone-black mb-6 font-poppins">
          {t('hero.title1')}
          <span className="block text-transparent bg-clip-text korean-accent font-korean">
            {t('hero.title2')}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-stone-black/70 mb-8 font-korean leading-relaxed whitespace-pre-line">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="korean-button text-lg px-8 py-4 hover-glow">
            {t('hero.shopButton')}
          </button>
          <button className="bg-transparent border-2 border-stone-black text-stone-black hover:bg-stone-black hover:text-stone-beige transition-all duration-300 font-medium px-8 py-4 rounded-full">
            {t('hero.exploreButton')}
          </button>
        </div>
        
        <div className="mt-12 flex justify-center items-center space-x-8 text-stone-black/60">
          <div className="text-center">
            <div className="text-2xl font-bold text-korean-gold">3</div>
            <div className="text-sm font-korean">{t('hero.cardsPerPack')}</div>
          </div>
          <div className="w-px h-8 bg-stone-black/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-korean-gold">15+</div>
            <div className="text-sm font-korean">{t('hero.series')}</div>
          </div>
          <div className="w-px h-8 bg-stone-black/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-korean-gold">100%</div>
            <div className="text-sm font-korean">{t('hero.surprise')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
