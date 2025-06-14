
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  hasDesignOptions?: boolean;
  hasSpecialDesignOptions?: boolean;
  hasSizeOptions?: boolean;
}

interface GoodiesCardProps {
  product: Product;
}

const GoodiesCard = ({ product }: GoodiesCardProps) => {
  const [selectedDesign, setSelectedDesign] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { addItem } = useCart();

  const designOptions = [
    'Mr Plankton', 'Crash Landing on You', 'When Life Gives You Tangerines',
    'Twenty-one Twenty-five', 'Dear Hongrang', 'Itaewon Class', 'My Dearest',
    'Alchemy of Souls', 'My Demon', 'Weak Hero Class', 'True Beauty', 'Jae-yi',
    'Lim Ju-Kyung', 'Yoon Se-ri', 'Mu Deok-i', 'Park Sae-royi', 'Hae-jo',
    'Kim Geon-woo', 'Ri Jeong-hyeok', 'Yoo Si-jin', 'Lee Su-ho', 'Han Seo-jun',
    '#kdramalovers', '#kdramagirlspower'
  ];

  const handkerchiefOptions = [
    'Mr Plankton', 'Crash Landing on You', 'When Life Gives You Tangerines',
    'Twenty-one Twenty-five', 'Dear Hongrang', 'Itaewon Class', 'My Dearest',
    'Alchemy of Souls', 'My Demon', 'Weak Hero Class', 'True Beauty'
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const getImageForProduct = (productId: string) => {
    const imageMap = {
      'tote-bag': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop',
      't-shirt': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      'backpack': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop',
      'picture-frame': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop',
      'handkerchief-set': 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=300&fit=crop'
    };
    return imageMap[productId as keyof typeof imageMap] || '/placeholder.svg';
  };

  const handleAddToCart = () => {
    // Check if required options are selected
    if (product.hasDesignOptions || product.hasSpecialDesignOptions) {
      if (!selectedDesign) {
        toast({
          title: "Please select a design",
          description: "You need to choose a design before adding to cart.",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (product.hasSizeOptions && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "You need to choose a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    addItem({
      id: `${product.id}-${selectedDesign}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: getImageForProduct(product.id),
      selectedOptions: {
        design: selectedDesign || undefined,
        size: selectedSize || undefined,
      }
    });
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="korean-card p-6 group hover-glow">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img 
          src={getImageForProduct(product.id)}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div>
        <h4 className="text-xl font-bold text-stone-black mb-2 font-poppins">
          {product.name}
        </h4>
        <p className="text-stone-black/70 mb-4 font-korean text-sm">
          {product.description}
        </p>

        {/* Design Options */}
        {(product.hasDesignOptions || product.hasSpecialDesignOptions) && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-black mb-2 font-korean">
              Design:
            </label>
            <Select value={selectedDesign} onValueChange={setSelectedDesign}>
              <SelectTrigger className="w-full bg-white/80 border-stone-black/20 hover:bg-stone-powder/20 transition-colors">
                <SelectValue placeholder="Choose design" />
              </SelectTrigger>
              <SelectContent className="bg-white border-stone-black/20 shadow-lg max-h-60 overflow-y-auto z-50">
                {(product.hasSpecialDesignOptions ? handkerchiefOptions : designOptions).map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className="hover:bg-stone-powder/20 cursor-pointer font-korean"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Size Options */}
        {product.hasSizeOptions && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-black mb-2 font-korean">
              Size:
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full bg-white/80 border-stone-black/20 hover:bg-stone-powder/20 transition-colors">
                <SelectValue placeholder="Choose size" />
              </SelectTrigger>
              <SelectContent className="bg-white border-stone-black/20 shadow-lg z-50">
                {sizeOptions.map((size) => (
                  <SelectItem 
                    key={size} 
                    value={size}
                    className="hover:bg-stone-powder/20 cursor-pointer font-korean"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-korean-gold font-poppins">
            €{product.price}
          </span>
        </div>
        <button onClick={handleAddToCart} className="korean-button w-full hover-glow">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default GoodiesCard;
