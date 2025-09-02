
import React, { useState } from 'react';
import { Calculator, MapPin, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const ShippingCalculator = () => {
  const { language, t } = useLanguage();
  const { total, itemCount } = useCart();
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
    let weightMultiplier = Math.max(1, Math.ceil(itemCount / 2)); // Assume 2 items per kg

    // Base shipping costs by zone
    switch (country.zone) {
      case 'domestic': // France
        baseCost = 4.90;
        break;
      case 'europe':
        baseCost = 8.90;
        break;
      case 'asia': // South Korea
        baseCost = 12.90;
        break;
      case 'international':
        baseCost = 15.90;
        break;
    }

    // Add weight-based cost
    const weightCost = (weightMultiplier - 1) * 3.00;
    let finalCost = baseCost + weightCost;

    // Free shipping threshold
    const freeShippingThreshold = 100;
    if (total >= freeShippingThreshold) {
      finalCost = 0;
    }

    setShippingCost(finalCost);
  };

  const getDeliveryTime = (zone: string) => {
    const times = {
      domestic: language === 'fr' ? '2-5 jours ouvrés' : language === 'ko' ? '영업일 2-5일' : '2-5 business days',
      europe: language === 'fr' ? '5-10 jours ouvrés' : language === 'ko' ? '영업일 5-10일' : '5-10 business days',
      asia: language === 'fr' ? '2-4 jours ouvrés' : language === 'ko' ? '영업일 2-4일' : '2-4 business days',
      international: language === 'fr' ? '7-15 jours ouvrés' : language === 'ko' ? '영업일 7-15일' : '7-15 business days'
    };
    return times[zone] || '';
  };

  return (
    <div className="korean-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-korean-gold" />
        <h3 className="text-xl font-bold text-stone-black font-poppins">
          {t('shipping.title')}
        </h3>
      </div>

      {itemCount === 0 ? (
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-stone-black/30 mx-auto mb-4" />
          <p className="text-stone-black/60 font-korean">
            {t('shipping.emptyCart')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-black mb-2 font-korean">
              {t('shipping.country')}
            </label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={language === 'fr' ? 'Sélectionnez un pays' : language === 'ko' ? '국가를 선택하세요' : 'Select a country'} />
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

          <div>
            <label className="block text-sm font-medium text-stone-black mb-2 font-korean">
              {t('shipping.postalCode')}
            </label>
            <Input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="12345"
              className="w-full"
            />
          </div>

          <button
            onClick={calculateShipping}
            disabled={!selectedCountry}
            className="korean-button w-full hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('shipping.calculate')}
          </button>

          {shippingCost !== null && selectedCountry && (
            <div className="bg-stone-beige/30 rounded-lg p-4 border-2 border-korean-gold/20">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-stone-black font-korean">
                  {t('shipping.cost')}:
                </span>
                <span className="text-xl font-bold text-korean-gold">
                  {shippingCost === 0 ? t('shipping.free') : `€${shippingCost.toFixed(2)}`}
                </span>
              </div>
              
              {(() => {
                const country = countries.find(c => c.code === selectedCountry);
                const deliveryTime = country ? getDeliveryTime(country.zone) : '';
                return deliveryTime && (
                  <div className="text-sm text-stone-black/70 font-korean">
                    <span className="font-medium">{t('shipping.deliveryTime')}:</span> {deliveryTime}
                  </div>
                );
              })()}

              {total < 100 && (
                <div className="text-sm text-korean-gold/80 mt-2 font-korean">
                  {language === 'fr' ? `Ajoutez €${(100 - total).toFixed(2)} pour la livraison gratuite !` :
                   language === 'ko' ? `€${(100 - total).toFixed(2)} 더 구매하시면 무료 배송!` :
                   `Add €${(100 - total).toFixed(2)} more for free shipping!`}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingCalculator;
