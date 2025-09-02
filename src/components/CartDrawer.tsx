
import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Calculator, MapPin, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import CheckoutButton from './CheckoutButton';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, total, removeItem, updateQuantity, itemCount } = useCart();
  const { language, t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  const countries = [
    { code: 'FR', name: 'France', zone: 'domestic' },
    { code: 'DE', name: 'Germany', zone: 'europe' },
    { code: 'IT', name: 'Italy', zone: 'europe' },
    { code: 'ES', name: 'Spain', zone: 'europe' },
    { code: 'NL', name: 'Netherlands', zone: 'europe' },
    { code: 'BE', name: 'Belgium', zone: 'europe' },
    { code: 'GB', name: 'United Kingdom', zone: 'europe' },
    { code: 'KR', name: 'South Korea', zone: 'asia' },
    { code: 'US', name: 'United States', zone: 'international' },
    { code: 'CA', name: 'Canada', zone: 'international' },
    { code: 'AU', name: 'Australia', zone: 'international' },
    { code: 'JP', name: 'Japan', zone: 'international' },
  ];

  const calculateShipping = () => {
    if (!selectedCountry || itemCount === 0) return;

    const country = countries.find(c => c.code === selectedCountry);
    if (!country) return;

    let baseCost = 0;
    let weightMultiplier = Math.max(1, Math.ceil(itemCount / 2));

    switch (country.zone) {
      case 'domestic':
        baseCost = 4.90;
        break;
      case 'europe':
        baseCost = 8.90;
        break;
      case 'asia':
        baseCost = 12.90;
        break;
      case 'international':
        baseCost = 15.90;
        break;
    }

    const weightCost = (weightMultiplier - 1) * 3.00;
    let finalCost = baseCost + weightCost;

    if (total >= 100) {
      finalCost = 0;
    }

    setShippingCost(finalCost);
  };

  if (!isOpen) return null;

  const finalTotal = total + (shippingCost || 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-bold font-poppins">{t('cart.title')}</h2>
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
                <p className="text-stone-black/60 font-korean">{t('cart.empty')}</p>
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

                {/* Shipping Calculator */}
                {items.length > 0 && (
                  <div className="korean-card p-4 mt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-5 h-5 text-korean-gold" />
                      <h3 className="font-bold text-stone-black font-poppins">
                        {t('cart.shipping')}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-stone-black mb-1 font-korean">
                          {t('cart.country')}
                        </label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={language === 'fr' ? 'Sélectionnez' : language === 'ko' ? '선택하세요' : 'Select country'} />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {country.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <button
                        onClick={calculateShipping}
                        disabled={!selectedCountry}
                        className="korean-button w-full hover-glow disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2"
                      >
                        {t('cart.calculate')}
                      </button>

                      {shippingCost !== null && selectedCountry && (
                        <div className="bg-stone-beige/30 rounded-lg p-3 border border-korean-gold/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-stone-black font-korean">
                              {t('cart.shipping')}:
                            </span>
                            <span className="font-bold text-korean-gold">
                              {shippingCost === 0 ? t('cart.freeShipping') : `€${shippingCost.toFixed(2)}`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium font-korean">{t('cart.subtotal')}:</span>
                  <span className="font-bold text-stone-black">€{total.toFixed(2)}</span>
                </div>
                {shippingCost !== null && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium font-korean">{t('cart.shipping')}:</span>
                    <span className="font-bold text-korean-gold">
                      {shippingCost === 0 ? t('cart.freeShipping') : `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                )}
                <hr className="border-stone-beige" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold font-poppins">{t('cart.total')}:</span>
                  <span className="text-xl font-bold text-korean-gold">€{finalTotal.toFixed(2)}</span>
                </div>
              </div>
              <CheckoutButton className="korean-button w-full hover-glow">
                {t('cart.checkout')}
              </CheckoutButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
