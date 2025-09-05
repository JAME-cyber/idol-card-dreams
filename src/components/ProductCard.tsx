
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CollectionModal from './CollectionModal';

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
  const [characterCount, setCharacterCount] = useState("1");
  const [supportType, setSupportType] = useState("papier-sans-cadre");

  const handleAddToCart = React.useCallback(() => {
    const selectedQuantity = parseInt(quantity);
    
    for (let i = 0; i < selectedQuantity; i++) {
      addItem({
        id: `${product.id}-${Date.now()}-${i}`,
        name: product.name,
        price: product.price,
        image: "/lovable-uploads/8902c19e-8aaa-4667-97bb-2084dfd0a6ed.png"
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
              src="/lovable-uploads/8902c19e-8aaa-4667-97bb-2084dfd0a6ed.png" 
              alt={`${product.name} - Image 1`}
              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img 
              src="/lovable-uploads/e0b8ae8e-4081-44c3-bc6c-080fe7a78ac5.png" 
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
        <h4 className="text-2xl font-bold text-stone-black mb-2 font-snap">
          {product.name}
        </h4>
        <p className="text-stone-black/70 mb-4 font-snap">
          {product.description}
        </p>
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-korean-gold font-snap">
            €{product.price}
          </span>
        </div>
        
        {/* Custom options for Chibibis personnalisés and préimprimés */}
        {(product.id === 'custom-chibis' || product.id === 'preprinted-chibis') && (
          <>
            {/* Character Count Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-black mb-2 font-snap">
                Nombre de personnages:
              </label>
              <Select value={characterCount} onValueChange={setCharacterCount}>
                <SelectTrigger className="w-full max-w-xs mx-auto bg-white border-2 border-korean-gold/20 focus:border-korean-gold">
                  <SelectValue placeholder="Choisir le nombre" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-korean-gold/20 z-50">
                  <SelectItem value="1" className="hover:bg-korean-gold/10">1 personnage</SelectItem>
                  <SelectItem value="2" className="hover:bg-korean-gold/10">2 personnages</SelectItem>
                  <SelectItem value="famille" className="hover:bg-korean-gold/10">Famille</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Support Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-black mb-2 font-snap">
                Support:
              </label>
              <Select value={supportType} onValueChange={setSupportType}>
                <SelectTrigger className="w-full max-w-xs mx-auto bg-white border-2 border-korean-gold/20 focus:border-korean-gold">
                  <SelectValue placeholder="Choisir le support" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-korean-gold/20 z-50">
                  <SelectItem value="papier-sans-cadre" className="hover:bg-korean-gold/10">Papier 250g A4 sans cadre</SelectItem>
                  <SelectItem value="papier-avec-cadre" className="hover:bg-korean-gold/10">Papier 250g A4 avec cadre</SelectItem>
                  <SelectItem value="tote-bag" className="hover:bg-korean-gold/10">Tote Bag</SelectItem>
                  <SelectItem value="backpack" className="hover:bg-korean-gold/10">Backpack</SelectItem>
                  <SelectItem value="t-shirt" className="hover:bg-korean-gold/10">T-shirt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
        {/* Collection Modal for preprinted chibis */}
        {product.id === 'preprinted-chibis' && (
          <div className="mb-4">
            <CollectionModal />
          </div>
        )}
        
        <button onClick={handleAddToCart} className="korean-button w-full hover-glow">
          {t('shop.addToCart')}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
