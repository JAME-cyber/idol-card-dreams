
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ban } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 korean-accent opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-beige/50 to-stone-beige"></div>
      
      {/* Floating Elements - hidden on mobile to reduce motion */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-32 h-32 bg-stone-powder/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="hidden md:block absolute bottom-1/3 right-1/4 w-40 h-40 bg-stone-lavender/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-stone-black mb-2 font-snap">
          {t('hero.title').split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < t('hero.title').split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
        <p className="text-2xl md:text-3xl font-bold text-stone-black/80 mb-6 font-snap">
          Collection
        </p>
        
        <p className="text-base md:text-lg text-stone-black/70 mb-4 font-medium">
          {t('hero.subtitle')}
        </p>
        <p className="text-sm md:text-base text-stone-black/60 mb-6 italic">
          {t('hero.tagline')}
        </p>
        
        {/* Photos */}
        <div className="mb-6 flex flex-col md:flex-row justify-center gap-4 items-center">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/lovable-uploads/IMG_1213.JPG" 
              alt="Mini Kdrama Mochis Collection"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-xl overflow-hidden shadow-lg bg-black flex items-center justify-center">
            <img 
              src="/lovable-uploads/enveloppe_juin.jpg" 
              alt="Stone Idol My Drama"
              className="w-full h-full object-contain"
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
            {t('hero.boxDescription')}
            <br /><br />
            {t('hero.callToAction')}
          </p>
          
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/IMG_1225-2.JPG" 
                  alt="Boite de 9 Mini Kdrama Mochis"
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Badge "Non comestible" */}
                <div className="absolute top-2 left-2 bg-destructive/90 text-destructive-foreground px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-medium shadow-md">
                  <Ban className="w-3 h-3" />
                  <span>Non comestible</span>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/IMG_1180-2.JPG" 
                  alt="Mini Mochi K-drama citron"
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/IMG_1227.JPG" 
                  alt="Collection Mini Mochis avec carte"
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>
            <p className="mt-4 text-xs italic text-stone-black/60 text-center">
              {t('hero.warningNotEdible')}
            </p>
            
            {/* Video placeholder */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-lg aspect-video bg-stone-lavender/20 rounded-xl border-2 border-dashed border-stone-black/20 flex items-center justify-center">
                <span className="text-stone-black/40 text-sm font-snap">Vidéo à venir</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
