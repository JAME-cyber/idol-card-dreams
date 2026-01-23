import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ShopSection = () => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [kdramaChoices, setKdramaChoices] = useState("");

  const product = {
    id: 'mochis-box',
    name: t('shop.mochisBoxName'),
    description: t('shop.mochisBoxDesc'),
    price: 27,
    image: '/lovable-uploads/IMG_1188.JPG'
  };

  const handleAddToCart = () => {
    if (!kdramaChoices.trim()) {
      toast({
        title: t('shop.kdramaRequired'),
        description: t('shop.kdramaRequiredMessage'),
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${Date.now()}-${i}`,
        name: product.name,
        price: product.price,
        image: product.image,
        selectedOptions: {
          kdramaChoices: kdramaChoices
        }
      });
    }

    toast({
      title: t('cart.itemAdded'),
      description: `${quantity} x ${product.name} ${t('cart.addedToCart')}`,
    });

    setKdramaChoices("");
    setQuantity(1);
  };

  return (
    <section id="shop" className="section-spacing bg-gradient-to-b from-stone-beige via-white to-stone-beige/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="content-spacing">
          <div className="text-center mb-12">
            <h3 className="section-title font-snap">
              {t('shop.title')}
            </h3>
            <div className="w-16 h-0.5 bg-korean-gold mx-auto mb-4"></div>
            <p className="section-subtitle font-snap">
              {t('shop.subtitle')}
            </p>
          </div>
          
          {/* Single Product Card */}
          <div className="korean-card p-8 max-w-2xl mx-auto hover-glow">
            {/* Product Images */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/lovable-uploads/IMG_1188.JPG" 
                      alt="Ma boite de Mochis"
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <img 
                    src="/lovable-uploads/IMG_1188.JPG" 
                    alt="Ma boite de Mochis (agrandie)"
                    className="w-full h-auto object-contain max-h-[80vh]"
                  />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/lovable-uploads/IMG_1178.JPG" 
                      alt="Mochis dans la boite"
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <img 
                    src="/lovable-uploads/IMG_1178.JPG" 
                    alt="Mochis dans la boite (agrandie)"
                    className="w-full h-auto object-contain max-h-[80vh]"
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Product Info */}
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-stone-black mb-2 font-snap">
                {product.name}
              </h4>
              <p className="text-stone-black/70 mb-4 font-snap">
                {product.description}
              </p>
              <div className="flex items-center justify-center mb-6">
                <span className="text-4xl font-bold text-korean-gold font-snap">
                  €{product.price}
                </span>
              </div>
            </div>

            {/* Kdrama Choices Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-black mb-2 font-snap">
                {t('shop.kdramaChoicesLabel')}
              </label>
              <Textarea
                value={kdramaChoices}
                onChange={(e) => setKdramaChoices(e.target.value)}
                placeholder={t('shop.kdramaChoicesPlaceholder')}
                className="w-full border-2 border-korean-gold/20 focus:border-korean-gold rounded-xl p-4 min-h-[120px]"
              />
              <p className="text-xs text-stone-black/60 mt-2 italic">
                {t('shop.kdramaChoicesHint')}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <label className="text-sm font-medium text-stone-black font-snap">
                {t('shop.quantity')}:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-stone-black/10 hover:bg-korean-gold/20 flex items-center justify-center font-bold transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-stone-black/10 hover:bg-korean-gold/20 flex items-center justify-center font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="korean-button w-full text-lg py-4"
            >
              {t('shop.addToCart')} - €{product.price * quantity}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
