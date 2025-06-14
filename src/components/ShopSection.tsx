
import React from 'react';
import ProductCard from './ProductCard';
import GoodiesCard from './GoodiesCard';

const ShopSection = () => {
  const surprisePackProduct = {
    id: 'surprise-pack',
    name: 'K-Drama Surprise Pack',
    description: 'Mystery pack containing 3 exclusive K-Drama collectible cards',
    price: 15.99,
    image: '/placeholder.svg', // This would be the sealed pack image
    category: 'cards'
  };

  const goodiesProducts = [
    {
      id: 'tote-bag',
      name: 'K-Drama Tote Bag',
      description: '100% cotton, Size: 38cm x 42cm',
      price: 19.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 't-shirt',
      name: 'K-Drama T-Shirt',
      description: 'Cotton and polyester blend',
      price: 24.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true,
      hasSizeOptions: true
    },
    {
      id: 'backpack',
      name: 'K-Drama Backpack',
      description: '100% cotton, Size: 38cm x 40cm',
      price: 39.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 'picture-frame',
      name: 'K-Drama Picture Frame',
      description: 'Size: 10cm x 15cm',
      price: 12.99,
      image: '/placeholder.svg',
      category: 'goodies',
      hasDesignOptions: true
    },
    {
      id: 'handkerchief-set',
      name: 'Fabric Handkerchief Set',
      description: '100% cotton, Size: 23cm x 23cm with carrying pouch',
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
            Our Collection
          </h2>
          <p className="text-xl text-stone-black/70 font-korean max-w-2xl mx-auto">
            Discover exclusive K-Drama collectibles and premium merchandise inspired by your favorite series.
          </p>
        </div>

        {/* Surprise Packs Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-stone-black mb-8 text-center font-poppins">
            Surprise Card Packs
          </h3>
          <div className="flex justify-center">
            <div className="max-w-md">
              <ProductCard product={surprisePackProduct} />
            </div>
          </div>
        </div>

        {/* Goodies Section */}
        <div>
          <h3 className="text-3xl font-bold text-stone-black mb-8 text-center font-poppins">
            Goodies
          </h3>
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
