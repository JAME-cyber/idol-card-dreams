
import React, { Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Lazy loading des sections pour réduire le bundle initial
const HeroSection = React.lazy(() => import('../components/HeroSection'));
const ShopSection = React.lazy(() => import('../components/ShopSection'));

const SectionFallback = () => (
  <div className="w-full h-64 bg-stone-beige/10 animate-pulse rounded-xl"></div>
);

const Index = React.memo(() => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Banner Image avec lazy loading */}
      <div className="w-full">
        <img 
          src="/lovable-uploads/f34ed131-a6b0-4be7-8028-7e53cc3a1898.png" 
          alt="Stone Idol Banner"
          className="w-full h-auto object-cover"
          loading="lazy"
          decoding="async"
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
