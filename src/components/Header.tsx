
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-stone-powder to-stone-lavender rounded-full flex items-center justify-center">
              <span className="text-stone-black font-bold text-xl font-korean">SI</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-black font-poppins tracking-wide">
                STONE IDOL
              </h1>
              <p className="text-xs text-stone-black/60 font-korean">K-Drama Collectibles</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-stone-black hover:text-korean-gold transition-colors font-medium">
              Home
            </a>
            <a href="#shop" className="text-stone-black hover:text-korean-gold transition-colors font-medium">
              Shop
            </a>
            <a href="#about" className="text-stone-black hover:text-korean-gold transition-colors font-medium">
              About
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button className="relative p-2 hover:bg-stone-powder/20 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-stone-black" />
              <span className="absolute -top-1 -right-1 bg-korean-gold text-stone-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
