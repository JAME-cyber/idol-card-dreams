
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
        <h1 className="text-3xl md:text-5xl font-bold text-stone-black mb-6 font-snap">
          {t('hero.title')}
        </h1>
        
        <p className="text-base md:text-lg text-stone-black/70 mb-4 font-medium">
          {t('hero.subtitle')}
        </p>
        <p className="text-sm md:text-base text-stone-black/60 mb-6 italic">
          {t('hero.tagline')}
        </p>
        
        {/* Photo */}
        <div className="mb-6 flex justify-center">
          <div className="w-64 h-48 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/92550196-85e7-45fb-b312-fb49afd26c3c.png" 
              alt="Exemple de chibi personnalisé"
              className="w-full h-full object-contain bg-white"
              loading="lazy"
            />
          </div>
        </div>
        
        {/* Description text */}
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-sm md:text-base text-stone-black/70 leading-relaxed font-snap text-justify">
            {t('hero.mainDescription')}
            <br /><br />
            {t('hero.personalDescription')}
            <br /><br />
            {t('hero.questionDescription')}
            <br /><br />
            {t('hero.giftDescription')}
            <br /><br />
            <span className="text-xs italic text-stone-black/60">{t('hero.noteDescription')}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
