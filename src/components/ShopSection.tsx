import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Gift, Mail } from 'lucide-react';

const ShopSection = () => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  
  // Mochis box state
  const [quantity, setQuantity] = useState(1);
  const [kdramaChoices, setKdramaChoices] = useState("");
  
  // Gift card state
  const [giftQuantity, setGiftQuantity] = useState(1);
  const [recipientName, setRecipientName] = useState("");
  const [addPhysicalCard, setAddPhysicalCard] = useState(false);
  const physicalCardPrice = 3;

  const mochisProduct = {
    id: 'mochis-box',
    name: t('shop.mochisBoxName'),
    description: t('shop.mochisBoxDesc'),
    price: 27,
    image: '/lovable-uploads/IMG_1188.JPG'
  };

  const giftCardProduct = {
    id: 'gift-card',
    name: t('shop.giftCardName'),
    description: t('shop.giftCardDesc'),
    price: 27,
    image: '/lovable-uploads/fond43.jpg'
  };

  const handleAddMochisToCart = () => {
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
        id: `${mochisProduct.id}-${Date.now()}-${i}`,
        name: mochisProduct.name,
        price: mochisProduct.price,
        image: mochisProduct.image,
        selectedOptions: {
          kdramaChoices: kdramaChoices
        }
      });
    }

    toast({
      title: t('cart.itemAdded'),
      description: `${quantity} x ${mochisProduct.name} ${t('cart.addedToCart')}`,
    });

    setKdramaChoices("");
    setQuantity(1);
  };

  const handleAddGiftCardToCart = () => {
    const totalGiftPrice = giftCardProduct.price + (addPhysicalCard ? physicalCardPrice : 0);
    
    for (let i = 0; i < giftQuantity; i++) {
      addItem({
        id: `${giftCardProduct.id}-${Date.now()}-${i}`,
        name: addPhysicalCard 
          ? `${giftCardProduct.name} + ${t('shop.physicalCardName')}`
          : giftCardProduct.name,
        price: totalGiftPrice,
        image: giftCardProduct.image,
        selectedOptions: {
          recipientName: recipientName.trim() || undefined,
          includesPhysicalCard: addPhysicalCard
        }
      });
    }

    toast({
      title: t('cart.itemAdded'),
      description: `${giftQuantity} x ${giftCardProduct.name} ${t('cart.addedToCart')}`,
    });

    setRecipientName("");
    setGiftQuantity(1);
    setAddPhysicalCard(false);
  };

  const getGiftCardTotal = () => {
    return (giftCardProduct.price + (addPhysicalCard ? physicalCardPrice : 0)) * giftQuantity;
  };

  return (
    <section id="shop" className="section-spacing bg-gradient-to-b from-stone-beige via-white to-stone-beige/50">
      <div className="container mx-auto px-4 max-w-6xl">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mochis Box Card */}
            <div className="korean-card p-8 hover-glow">
              {/* Product Images */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                      <img 
                        src="/lovable-uploads/IMG_1188.JPG" 
                        alt="Ma boite de Mochis"
                        className="w-full h-40 object-cover"
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
                        src="/lovable-uploads/IMG_1226.JPG"
                        alt="Mochis dans la boite"
                        className="w-full h-40 object-cover"
                        loading="lazy"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <img 
                      src="/lovable-uploads/IMG_1226.JPG" 
                      alt="Mochis dans la boite (agrandie)"
                      className="w-full h-auto object-contain max-h-[80vh]"
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Product Info */}
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-stone-black mb-2 font-snap">
                  {mochisProduct.name}
                </h4>
                <p className="text-stone-black/70 mb-4 font-snap text-sm">
                  {mochisProduct.description}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-korean-gold font-snap">
                    €{mochisProduct.price}
                  </span>
                </div>
              </div>

              {/* Kdrama Choices Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-black mb-2 font-snap">
                  {t('shop.kdramaChoicesLabel')}
                </label>
                <Textarea
                  value={kdramaChoices}
                  onChange={(e) => setKdramaChoices(e.target.value)}
                  placeholder={t('shop.kdramaChoicesPlaceholder')}
                  className="w-full border-2 border-pink-200 focus:border-pink-400 bg-pink-50 rounded-xl p-3 min-h-[100px] text-sm"
                />
                <p className="text-xs text-stone-black/60 mt-1 italic">
                  {t('shop.kdramaChoicesHint')}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4 flex items-center justify-center gap-4">
                <label className="text-sm font-medium text-stone-black font-snap">
                  {t('shop.quantity')}:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full bg-stone-black/10 hover:bg-korean-gold/20 flex items-center justify-center font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full bg-stone-black/10 hover:bg-korean-gold/20 flex items-center justify-center font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddMochisToCart}
                className="korean-button w-full py-3"
              >
                {t('shop.addToCart')} - €{mochisProduct.price * quantity}
              </button>
            </div>

            {/* Gift Card */}
            <div className="korean-card p-8 hover-glow">
              {/* Gift Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-korean-gold/20 to-stone-lavender/30 flex items-center justify-center">
                  <Gift className="w-20 h-20 text-korean-gold" />
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-stone-black mb-2 font-snap">
                  {giftCardProduct.name}
                </h4>
                <p className="text-stone-black/70 mb-4 font-snap text-sm">
                  {giftCardProduct.description}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-korean-gold font-snap">
                    €{giftCardProduct.price}
                  </span>
                </div>
              </div>

              {/* Recipient Name Input (optional) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-stone-black mb-2 font-snap">
                  {t('shop.recipientNameLabel')}
                </label>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={t('shop.recipientNamePlaceholder')}
                  className="w-full border-2 border-pink-200 focus:border-pink-400 bg-pink-50 rounded-xl p-3"
                />
              </div>

              {/* Physical Card Option */}
              <div className="mb-4 p-4 bg-stone-lavender/10 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id="physical-card" 
                    checked={addPhysicalCard}
                    onCheckedChange={(checked) => setAddPhysicalCard(checked === true)}
                    className="border-korean-gold data-[state=checked]:bg-korean-gold"
                  />
                  <label 
                    htmlFor="physical-card" 
                    className="text-sm font-medium text-stone-black cursor-pointer flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-korean-gold" />
                    {t('shop.addPhysicalCard')} (+€{physicalCardPrice})
                  </label>
                </div>
                <p className="text-xs text-stone-black/60 mt-2 ml-6">
                  {t('shop.physicalCardDesc')}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-4 flex items-center justify-center gap-4">
                <label className="text-sm font-medium text-stone-black font-snap">
                  {t('shop.quantity')}:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGiftQuantity(Math.max(1, giftQuantity - 1))}
                    className="w-8 h-8 rounded-full bg-stone-black/10 hover:bg-korean-gold/20 flex items-center justify-center font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold">{giftQuantity}</span>
                  <button
                    onClick={() => setGiftQuantity(giftQuantity + 1)}
                    className="w-8 h-8 rounded-full bg-stone-black/10 hover:bg-korean-gold/20 flex items-center justify-center font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddGiftCardToCart}
                className="korean-button w-full py-3"
              >
                {t('shop.addToCart')} - €{getGiftCardTotal()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
