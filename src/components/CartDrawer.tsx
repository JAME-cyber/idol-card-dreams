
import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import CheckoutButton from './CheckoutButton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, total, removeItem, updateQuantity } = useCart();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-bold font-poppins">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-powder/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-stone-black/60 font-korean">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 bg-stone-beige/30 p-3 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium font-poppins text-sm">{item.name}</h4>
                      {item.selectedOptions && (
                        <div className="text-xs text-stone-black/60 font-korean">
                          {item.selectedOptions.design && <span>Design: {item.selectedOptions.design}</span>}
                          {item.selectedOptions.size && <span className="ml-2">Size: {item.selectedOptions.size}</span>}
                        </div>
                      )}
                      <p className="text-korean-gold font-bold">€{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-stone-powder/20 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-stone-powder/20 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold font-poppins">Total:</span>
                <span className="text-xl font-bold text-korean-gold">€{total.toFixed(2)}</span>
              </div>
              <CheckoutButton className="korean-button w-full hover-glow">
                Proceed to Checkout
              </CheckoutButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
