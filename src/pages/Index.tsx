
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
      <div className="w-full">
        <img 
          src="/lovable-uploads/80b72e44-df54-47fa-85c7-34e00c50cd3e.png" 
          alt="Stone Idol Banner"
          className="w-full h-auto max-h-[400px] object-cover"
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
