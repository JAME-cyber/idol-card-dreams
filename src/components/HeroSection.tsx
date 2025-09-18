
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
          {t('hero.title').split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < t('hero.title').split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
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
              src="/lovable-uploads/bc321f60-3074-46a7-b36f-b6c48eb154be.png" 
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
          
          {/* Photo Gallery */}
          <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/IMG_0254.JPG" 
                  alt="Exemple de produit chibi - Cadre personnalisé"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/IMG_0355.JPG" 
                  alt="Exemple de produit chibi - T-shirt personnalisé"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/lovable-uploads/IMG_0378.JPG" 
                  alt="Exemple de produit chibi - Sac personnalisé"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              {/* Placeholders pour les 2 photos restantes */}
              <div className="w-full h-32 md:h-40 bg-stone-beige/50 border-2 border-dashed border-korean-gold/30 rounded-xl flex items-center justify-center">
                <div className="text-center text-stone-black/50">
                  <p className="text-xs font-snap">Photo 4</p>
                </div>
              </div>
              <div className="w-full h-32 md:h-40 bg-stone-beige/50 border-2 border-dashed border-korean-gold/30 rounded-xl flex items-center justify-center">
                <div className="text-center text-stone-black/50">
                  <p className="text-xs font-snap">Photo 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
