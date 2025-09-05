import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from './ProductCard';

const ShopSection = () => {
  const { t } = useLanguage();

  const products = [
    {
      id: 'custom-chibis',
      name: 'Chibibis personnalisés',
      description: 'Choisis ta Safe Place',
      price: 24.99,
      image: '/placeholder.svg',
      category: 'custom'
    },
    {
      id: 'preprinted-chibis',
      name: 'Chibibis pré-dessinés',
      description: 'Découvre nos collections',
      price: 19.99,
      image: '/placeholder.svg',
      category: 'preprinted'
    }
  ];

  return (
    <section id="shop" className="section-spacing bg-gradient-to-b from-stone-beige via-white to-stone-beige/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="content-spacing">
          <div className="text-center mb-12">
            <h3 className="section-title font-snap">
              Stone Idol Chibibis
            </h3>
            <div className="w-16 h-0.5 bg-korean-gold mx-auto mb-4"></div>
            <p className="section-subtitle font-snap">
              Que préfères-tu?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
