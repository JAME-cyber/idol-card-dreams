
import React, { Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ShopSection from '../components/ShopSection';

const SectionFallback = () => (
  <div className="w-full h-64 bg-stone-beige/10 animate-pulse rounded-xl"></div>
);

const Index = React.memo(() => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Banner Image avec lazy loading et gestion d'erreur */}
      <div className="w-full bg-gradient-to-b from-stone-lavender/20 to-stone-powder/20 flex justify-center py-3">
        <img 
          src="/lovable-uploads/fond43.jpg" 
          alt="Stone Idol Banner - Mini Kdrama Mochi"
          className="max-w-md md:max-w-lg h-auto object-contain rounded-xl shadow-lg"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            console.log('Banner image failed to load');
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <Suspense fallback={<SectionFallback />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ShopSection />
      </Suspense>
      <Footer />
    </div>
  );
});

Index.displayName = 'Index';

export default Index;
