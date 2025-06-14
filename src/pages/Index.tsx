
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ShopSection from '../components/ShopSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ShopSection />
      <Footer />
    </div>
  );
};

export default Index;
