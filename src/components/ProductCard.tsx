
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const ProductCard = React.memo(({ product }: ProductCardProps) => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState("1");

  const handleAddToCart = React.useCallback(() => {
    const selectedQuantity = parseInt(quantity);
    
    for (let i = 0; i < selectedQuantity; i++) {
      addItem({
        id: `${product.id}-${Date.now()}-${i}`,
        name: product.name,
        price: product.price,
        image: "/lovable-uploads/113e68de-85f6-407a-a5b8-c1ce51c003bb.png"
      });
    }
    
    toast({
      title: "Added to cart!",
      description: `${selectedQuantity} x ${product.name} has been added to your cart.`,
    });
  }, [product, quantity, addItem]);

  return (
    <div className="korean-card p-8 group hover-glow">
      <div className="relative mb-6 overflow-hidden rounded-xl">
        {/* Two image placeholders side by side */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/lovable-uploads/113e68de-85f6-407a-a5b8-c1ce51c003bb.png" 
              alt={`${product.name} - Image 1`}
              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/lovable-uploads/113e68de-85f6-407a-a5b8-c1ce51c003bb.png" 
              alt={`${product.name} - Image 2`}
              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
        <div className="absolute top-4 right-4 bg-korean-gold text-stone-black px-3 py-1 rounded-full text-sm font-bold">
          {t('hero.surprise')}!
        </div>
      </div>
      
      <div className="text-center">
        <h4 className="text-2xl font-bold text-stone-black mb-2 font-poppins">
          {product.name}
        </h4>
        <p className="text-stone-black/70 mb-4 font-korean">
          3 Cartes collection Stone Idol à découvrir parmi plus de 200!
        </p>
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-korean-gold font-poppins">
            €{product.price}
          </span>
        </div>
        
        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-black mb-2 font-korean">
            Nombre de packs:
          </label>
          <Select value={quantity} onValueChange={setQuantity}>
            <SelectTrigger className="w-full max-w-xs mx-auto bg-white border-2 border-korean-gold/20 focus:border-korean-gold">
              <SelectValue placeholder="Choisir la quantité" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-korean-gold/20 z-50">
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()} className="hover:bg-korean-gold/10">
                  {num} pack{num > 1 ? 's' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <button onClick={handleAddToCart} className="korean-button w-full hover-glow">
          {t('shop.addToCart')}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
