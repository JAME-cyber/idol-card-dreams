
import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import LanguageSelector from './LanguageSelector';
import CartDrawer from './CartDrawer';

const Header = () => {
  const { t } = useLanguage();
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img 
                  src="/lovable-uploads/922214f7-53ed-4332-9085-b848adaba843.png" 
                  alt="Stone Idol Logo"
                  className="h-16 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-stone-black hover:text-korean-gold transition-colors font-medium">
                {t('nav.home')}
              </Link>
              <a href="#shop" className="text-stone-black hover:text-korean-gold transition-colors font-medium">
                {t('nav.shop')}
              </a>
              <a href="#about" className="text-stone-black hover:text-korean-gold transition-colors font-medium">
                {t('nav.about')}
              </a>
            </nav>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button 
                data-cart-button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-stone-powder/20 rounded-full transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-stone-black" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-korean-gold text-stone-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
