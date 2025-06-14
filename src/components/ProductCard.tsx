
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useLanguage();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: "/lovable-uploads/113e68de-85f6-407a-a5b8-c1ce51c003bb.png"
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="korean-card p-8 group hover-glow">
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <img 
          src="/lovable-uploads/113e68de-85f6-407a-a5b8-c1ce51c003bb.png" 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 bg-korean-gold text-stone-black px-3 py-1 rounded-full text-sm font-bold">
          {t('hero.surprise')}!
        </div>
      </div>
      
      <div className="text-center">
        <h4 className="text-2xl font-bold text-stone-black mb-2 font-poppins">
          {product.name}
        </h4>
        <p className="text-stone-black/70 mb-4 font-korean">
          3 Cartes collection Kdramas à découvrir parmi plus de 200!
        </p>
        <div className="flex items-center justify-center mb-6">
          <span className="text-3xl font-bold text-korean-gold font-poppins">
            €{product.price}
          </span>
        </div>
        <button onClick={handleAddToCart} className="korean-button w-full hover-glow">
          {t('shop.addToCart')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
