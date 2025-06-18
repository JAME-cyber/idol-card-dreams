
import React, { useState } from 'react';
import { ShoppingCart, Calculator } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import LanguageSelector from './LanguageSelector';
import CartDrawer from './CartDrawer';
import ShippingDrawer from './ShippingDrawer';

const Header = () => {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-sm border-b border-stone-beige/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-stone-black font-poppins">
              Stone Idol
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsShippingOpen(true)}
              className="p-2 hover:bg-stone-powder/20 rounded-full transition-colors relative"
              title="Shipping Calculator"
            >
              <Calculator className="w-6 h-6 text-stone-black" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-stone-powder/20 rounded-full transition-colors relative"
              data-cart-button
            >
              <ShoppingCart className="w-6 h-6 text-stone-black" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-korean-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>
            
            <LanguageSelector />
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ShippingDrawer isOpen={isShippingOpen} onClose={() => setIsShippingOpen(false)} />
    </>
  );
};

export default Header;
