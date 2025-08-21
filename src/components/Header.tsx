
import React, { useState } from 'react';
import { ShoppingCart, Calculator, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import CartDrawer from './CartDrawer';
import ShippingDrawer from './ShippingDrawer';

const Header = () => {
  const { itemCount } = useCart();
  const { user, signOut } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-sm border-b border-stone-beige/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-stone-black font-snap hover:text-korean-gold transition-colors">
              Stone Idol
            </Link>
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

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 hover:bg-stone-powder/20 rounded-full transition-colors relative"
                  title="Account"
                >
                  <User className="w-6 h-6 text-stone-black" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-beige/30 py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-beige/30">
                      <p className="text-sm text-stone-black/70">Signed in as:</p>
                      <p className="text-sm font-medium text-stone-black truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-stone-black hover:bg-stone-powder/20 transition-colors flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="p-2 hover:bg-stone-powder/20 rounded-full transition-colors"
                title="Sign In"
              >
                <User className="w-6 h-6 text-stone-black" />
              </Link>
            )}
            
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ShippingDrawer isOpen={isShippingOpen} onClose={() => setIsShippingOpen(false)} />
    </>
  );
};

export default Header;
