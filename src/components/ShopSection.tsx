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
              {t('shop.cardsCollectionTitle')}
            </h3>
            <p className="text-lg text-stone-black/80 font-snap">
              {t('shop.cardsCollectionSubtitle')}
            </p>
          </div>
          <div className="flex justify-center">
            <div className="max-w-md">
              <ProductCard product={surprisePackProduct} />
            </div>
          </div>
          
          {/* K-drama Surprise Pack Ad Video */}
          <div className="mt-12 flex justify-center">
            <div className="max-w-2xl w-full">
              <div className="korean-card p-6 bg-gradient-to-r from-korean-gold/10 to-stone-powder/20">
                <div className="text-center mb-4">
                  <h4 className="text-2xl font-bold text-stone-black mb-2 font-snap">
                    🎬 Discover Your K-Drama Surprise Pack!
                  </h4>
                  <p className="text-stone-black/70 font-korean">
                    Get a sneak peek of what awaits you in our exclusive collection
                  </p>
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop
                    playsInline
                  >
                    <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-black/30 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm font-korean">
                        ✨ 3 Random K-Drama Cards • Premium Quality • Collector's Edition
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Goodies Section */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-stone-black mb-2 font-snap">
              {t('shop.goodiesTitle')}
            </h3>
            <p className="text-lg text-stone-black/80 font-snap">
              {t('shop.goodiesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-2 lg:grid-cols-3 gap-8">
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
