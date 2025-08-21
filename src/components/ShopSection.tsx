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
    price: 5.99,
    image: '/placeholder.svg',
    category: 'cards'
  };

  const goodiesProducts = [
    {
      id: 'keychain',
      name: t('product.keychain'),
      description: t('product.keychainDesc'),
      price: 8.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 'badge',
      name: t('product.badge'),
      description: t('product.badgeDesc'),
      price: 4.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 'backpack',
      name: t('product.backpack'),
      description: t('product.backpackDesc'),
      price: 35.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 'picture-frame',
      name: t('product.tshirt'),
      description: t('product.tshirtDesc'),
      price: 24.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true,
      hasSizeOptions: true
    },
    {
      id: 'handkerchief-set',
      name: t('product.handkerchiefSet'),
      description: t('product.handkerchiefSetDesc'),
      price: 6.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasSpecialDesignOptions: true
    }
  ];

  return (
    <section id="shop" className="section-spacing bg-gradient-to-b from-stone-beige via-white to-stone-beige/50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Surprise Packs Section */}
        <div className="content-spacing">
          <div className="text-center mb-12">
            <h3 className="section-title font-snap">
              {t('shop.cardsCollectionTitle')}
            </h3>
            <div className="w-16 h-0.5 bg-korean-gold mx-auto mb-4"></div>
            <p className="section-subtitle font-snap">
              {t('shop.cardsCollectionSubtitle')}
            </p>
          </div>
          
          <div className="flex justify-center mb-16">
            <div className="max-w-md w-full">
              <ProductCard product={surprisePackProduct} />
            </div>
          </div>
          
          {/* K-drama Surprise Pack Ad Video */}
          <div className="flex justify-center">
            <div className="max-w-4xl w-full">
              <div className="korean-card p-8 bg-gradient-to-br from-korean-gold/5 via-stone-powder/10 to-stone-lavender/5 border-2 border-korean-gold/20">
                <div className="text-center mb-6">
                  <h4 className="text-2xl md:text-3xl font-bold text-stone-black mb-3 font-snap">
                    🎬 Discover Your K-Drama Surprise Pack!
                  </h4>
                  <div className="w-12 h-0.5 bg-korean-gold mx-auto mb-3"></div>
                  <p className="text-stone-black/70 font-korean text-lg">
                    Get a sneak peek of what awaits you in our exclusive collection
                  </p>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-black/40 via-transparent to-transparent flex items-end">
                    <div className="p-6 text-white w-full">
                      <p className="text-sm md:text-base font-korean text-center">
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
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-bold text-stone-black mb-4 font-snap">
              {t('shop.goodiesTitle')}
            </h3>
            <div className="w-16 h-0.5 bg-korean-gold mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-stone-black/80 font-snap">
              {t('shop.goodiesSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {goodiesProducts.map((product) => (
              <GoodiesCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Characters List Section */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="korean-card p-6 bg-gradient-to-br from-stone-powder/10 via-white to-stone-lavender/5 border-2 border-korean-gold/20">
              <h4 className="text-xl font-bold text-stone-black mb-4 font-snap">
                * Personnages disponibles pour les badges, sacs et T-shirts
              </h4>
              <div className="text-stone-black/70 font-korean">
                {/* Contenu à compléter plus tard */}
                <p className="italic">Liste à compléter...</p>
              </div>
            </div>
          </div>
          
          {/* Stone Idol Goodies Ad Video */}
          <div className="flex justify-center">
            <div className="max-w-4xl w-full">
              <div className="korean-card p-8 bg-gradient-to-br from-stone-powder/5 via-korean-gold/5 to-stone-blue/10 border-2 border-stone-powder/30">
                <div className="text-center mb-6">
                  <h4 className="text-2xl md:text-3xl font-bold text-stone-black mb-3 font-snap">
                    🎭 Stone Idol Goodies Collection
                  </h4>
                  <div className="w-12 h-0.5 bg-korean-gold mx-auto mb-3"></div>
                  <p className="text-stone-black/70 font-korean text-lg">
                    Express your K-drama passion with our premium merchandise
                  </p>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-black/40 via-transparent to-transparent flex items-end">
                    <div className="p-6 text-white w-full">
                      <p className="text-sm md:text-base font-korean text-center">
                        🎒 Stylish Backpacks • 🏅 Premium Badges • 🖼️ Custom Frames • ✨ And More!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
