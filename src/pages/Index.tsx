
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ShopSection from '../components/ShopSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Banner Image */}
      <div className="w-full">
        <img 
          src="/lovable-uploads/f34ed131-a6b0-4be7-8028-7e53cc3a1898.png" 
          alt="Stone Idol Banner"
          className="w-full h-auto object-cover"
        />
      </div>
      <HeroSection />
      <ShopSection />
      <Footer />
    </div>
  );
};

export default Index;
