
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from './ProductCard';
import GoodiesCard from './GoodiesCard';

const ShopSection = () => {
  const { t } = useLanguage();

  const surprisePackProduct = {
    id: 'surprise-pack',
    name: t('shop.surprisePackName'),
    description: t('shop.surprisePackDesc'),
    price: 15.99,
    image: '/placeholder.svg',
    category: 'cards'
  };

  const goodiesProducts = [
    {
      id: 'tote-bag',
      name: t('product.toteBag'),
      description: t('product.toteBagDesc'),
      price: 19.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 't-shirt',
      name: t('product.tshirt'),
      description: t('product.tshirtDesc'),
      price: 24.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true,
      hasSizeOptions: true
    },
    {
      id: 'backpack',
      name: t('product.backpack'),
      description: t('product.backpackDesc'),
      price: 39.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 'picture-frame',
      name: t('product.pictureFrame'),
      description: t('product.pictureFrameDesc'),
      price: 12.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 'handkerchief-set',
      name: t('product.handkerchiefSet'),
      description: t('product.handkerchiefSetDesc'),
      price: 16.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasSpecialDesignOptions: true
    }
  ];

  return (
    <section id="shop" className="py-20 bg-gradient-to-b from-stone-beige to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-black mb-4 font-poppins">
            {t('shop.title')}
          </h2>
          <p className="text-xl text-stone-black/70 font-korean max-w-2xl mx-auto">
            {t('shop.description')}
          </p>
        </div>

        {/* Surprise Packs Section */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-stone-black mb-2 font-snap">
              Cartes collection Kdramas
            </h3>
            <p className="text-lg text-stone-black/80 font-snap">
              Je les aime tous!
            </p>
          </div>
          <div className="flex justify-center">
            <div className="max-w-md">
              <ProductCard product={surprisePackProduct} />
            </div>
          </div>
        </div>

        {/* Goodies Section */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-stone-black mb-2 font-snap">
              Goodies Stone Idol
            </h3>
            <p className="text-lg text-stone-black/80 font-snap">
              Choisis ton drama préféré parmi les plus populaires!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goodiesProducts.map((product) => (
              <GoodiesCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
