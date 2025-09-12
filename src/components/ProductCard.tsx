
import React, { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Edit3 } from 'lucide-react';
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
  const [tshirtSize, setTshirtSize] = useState("M");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [characterChoices, setCharacterChoices] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles: File[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Vérifier si c'est une image ou un PDF
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        if (validTypes.includes(file.type)) {
          newFiles.push(file);
        }
      }
      
      if (newFiles.length > 0) {
        setUploadedFiles(prev => [...prev, ...newFiles]);
        toast({
          title: t('upload.success'),
          description: `${newFiles.length} ${t('upload.uploaded')}`,
        });
      } else {
        toast({
          title: t('upload.error'),
          description: t('upload.invalidFormat'),
          variant: "destructive",
        });
      }
    }
  }, [t]);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getPrice = React.useCallback(() => {
    let basePrice = product.price;
    
    // Calcul du prix de base selon le nombre de personnages
    if (product.id === 'custom-chibis') {
      switch (characterCount) {
        case "1": basePrice = 19.99; break;
        case "2": basePrice = 24.99; break;
        case "3": basePrice = 29.99; break;
        case "famille": basePrice = 34.99; break;
        default: basePrice = product.price;
      }
    } else if (product.id === 'preprinted-chibis') {
      switch (characterCount) {
        case "1": basePrice = 9.99; break;
        case "2": basePrice = 15.99; break;
        case "3": basePrice = 19.99; break;
        case "4": basePrice = 22.99; break;
        default: basePrice = product.price;
      }
    }
    
    // Calcul du prix du support
    let supportPrice = 0;
    switch (supportType) {
      case "papier-sans-cadre": supportPrice = 0.00; break;
      case "papier-avec-cadre": supportPrice = 3.00; break;
      case "tote-bag": supportPrice = 6.00; break;
      case "backpack": supportPrice = 6.00; break;
      case "t-shirt": supportPrice = 12.00; break;
      default: supportPrice = 0.00;
    }
    
    const totalPrice = Math.round((basePrice + supportPrice) * 100) / 100;
    
    return totalPrice;
  }, [product.id, product.price, characterCount, supportType]);

  const handleAddToCart = React.useCallback(() => {
    const selectedQuantity = parseInt(quantity);
    const finalPrice = getPrice();
    
    // Vérifier si un fichier est requis pour les Chibibis personnalisés
    if (product.id === 'custom-chibis' && uploadedFiles.length === 0) {
      toast({
        title: t('upload.required'),
        description: t('upload.requiredMessage'),
        variant: "destructive",
      });
      return;
    }
    
    // Vérifier si les numéros de personnages sont requis pour les Chibibis pré-dessinés
    if (product.id === 'preprinted-chibis' && !characterChoices.trim()) {
      toast({
        title: t('choices.required'),
        description: t('choices.requiredMessage'),
        variant: "destructive",
      });
      return;
    }
    
    for (let i = 0; i < selectedQuantity; i++) {
      addItem({
        id: `${product.id}-${Date.now()}-${i}`,
        name: supportType === "t-shirt" ? `${product.name} (Taille: ${tshirtSize})` : product.name,
        price: finalPrice,
        image: "/lovable-uploads/8902c19e-8aaa-4667-97bb-2084dfd0a6ed.png"
      });
    }
    
    toast({
      title: t('cart.itemAdded'),
      description: `${selectedQuantity} x ${product.name} ${t('cart.addedToCart')}`,
    });
  }, [product, quantity, addItem, getPrice, supportType, tshirtSize, uploadedFiles, characterChoices, t]);

  return (
    <div className="korean-card p-8 group hover-glow">
      <div className="relative mb-6 overflow-hidden rounded-xl">
        {/* Two image placeholders side by side */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative overflow-hidden rounded-lg">
              <img 
                src={product.id === 'custom-chibis' ? "/lovable-uploads/0a84e310-1195-4ef0-9993-35c4074ecb5e.png" : (product.id === 'preprinted-chibis' ? "/lovable-uploads/05697494-8bde-425d-b107-d61f7a90f5bd.png" : "/lovable-uploads/10c2c313-97a5-431e-92ca-2edaf1062e7d.png")} 
                alt={`${product.name} - Image 1`}
                className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500 bg-white rounded"
                loading="lazy"
              />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="relative overflow-hidden rounded-lg">
              <img 
                src={product.id === 'preprinted-chibis' ? "/lovable-uploads/a1298543-7ee0-4f0a-829a-af9ad3247cd3.png" : "/lovable-uploads/d2de6ccb-7f9f-48ee-98e2-e27d6ac9e635.png"} 
                alt={`${product.name} - Image 2`}
                className="w-full h-40 object-contain group-hover:scale-110 transition-transform duration-500 bg-white rounded"
                loading="lazy"
              />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
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
            {(product.id === 'custom-chibis' || product.id === 'preprinted-chibis') ? `€${getPrice()}` : `${t('shop.startingFrom')}${product.price}`}
          </span>
        </div>
        
        {/* Custom options for Chibibis personnalisés and préimprimés */}
        {(product.id === 'custom-chibis' || product.id === 'preprinted-chibis') && (
          <>
            {/* Character Count Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-black mb-2 font-snap">
                {t('shop.charactersLabel')}
              </label>
              <Select value={characterCount} onValueChange={setCharacterCount}>
                <SelectTrigger className="w-full max-w-xs mx-auto bg-white border-2 border-korean-gold/20 focus:border-korean-gold">
                  <SelectValue placeholder={t('shop.chooseNumber')} />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-korean-gold/20 z-50">
                  {product.id === 'custom-chibis' ? (
                    <>
                      <SelectItem value="1" className="hover:bg-korean-gold/10">{t('shop.character1')} (19.99€)</SelectItem>
                      <SelectItem value="2" className="hover:bg-korean-gold/10">{t('shop.characters2')} (24.99€)</SelectItem>
                      <SelectItem value="3" className="hover:bg-korean-gold/10">{t('shop.characters3')} (29.99€)</SelectItem>
                      <SelectItem value="famille" className="hover:bg-korean-gold/10">{t('shop.family')} (34.99€)</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="1" className="hover:bg-korean-gold/10">{t('shop.character1')} (9.99€)</SelectItem>
                      <SelectItem value="2" className="hover:bg-korean-gold/10">{t('shop.characters2')} (15.99€)</SelectItem>
                      <SelectItem value="3" className="hover:bg-korean-gold/10">{t('shop.characters3')} (19.99€)</SelectItem>
                      <SelectItem value="4" className="hover:bg-korean-gold/10">{t('shop.characters4')} (22.99€)</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Support Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-black mb-2 font-snap">
                {t('shop.supportLabel')}
              </label>
              <Select value={supportType} onValueChange={setSupportType}>
                <SelectTrigger className="w-full max-w-xs mx-auto bg-white border-2 border-korean-gold/20 focus:border-korean-gold">
                  <SelectValue placeholder={t('shop.chooseSupport')} />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-korean-gold/20 z-50">
                  <SelectItem value="papier-sans-cadre" className="hover:bg-korean-gold/10">{t('shop.paperNoFrame')} (+0.00€)</SelectItem>
                  <SelectItem value="papier-avec-cadre" className="hover:bg-korean-gold/10">{t('shop.paperWithFrame')} (+3.00€)</SelectItem>
                  <SelectItem value="tote-bag" className="hover:bg-korean-gold/10">{t('shop.toteBag')} (+6.00€)</SelectItem>
                  <SelectItem value="backpack" className="hover:bg-korean-gold/10">{t('shop.backpack')} (+6.00€)</SelectItem>
                  <SelectItem value="t-shirt" className="hover:bg-korean-gold/10">{t('shop.tshirt')} (+12.00€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* T-shirt Size Selector - only show when t-shirt is selected */}
            {supportType === "t-shirt" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-stone-black mb-2 font-snap">
                  {t('shop.tshirtSizeLabel')}
                </label>
                <Select value={tshirtSize} onValueChange={setTshirtSize}>
                  <SelectTrigger className="w-full max-w-xs mx-auto bg-white border-2 border-korean-gold/20 focus:border-korean-gold">
                    <SelectValue placeholder={t('shop.chooseSize')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-korean-gold/20 z-50">
                    <SelectItem value="S" className="hover:bg-korean-gold/10">S</SelectItem>
                    <SelectItem value="M" className="hover:bg-korean-gold/10">M</SelectItem>
                    <SelectItem value="L" className="hover:bg-korean-gold/10">L</SelectItem>
                    <SelectItem value="XL" className="hover:bg-korean-gold/10">XL</SelectItem>
                    <SelectItem value="XXL" className="hover:bg-korean-gold/10">XXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </>
        )}
        
        {/* Upload File Section - Only for Custom Chibis */}
        {product.id === 'custom-chibis' && (
          <div className="mb-6">
            <button
              onClick={triggerFileUpload}
              className="bg-korean-gold hover:bg-korean-gold/90 text-stone-black p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white flex items-center gap-2 mx-auto"
              title={uploadedFiles.length > 0 ? `${uploadedFiles.length} fichier(s) uploadé(s)` : t('upload.addFile')}
            >
              <Upload size={20} className={uploadedFiles.length > 0 ? "text-white" : "text-stone-black"} />
              <span className="text-sm font-bold">
                {uploadedFiles.length > 0 ? `${uploadedFiles.length} fichier(s)` : t('upload.downloadFile')}
              </span>
            </button>
            
            {/* Display uploaded files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 max-w-xs mx-auto">
                <div className="bg-korean-gold/10 border border-korean-gold/30 rounded-lg p-3">
                  <p className="text-xs font-bold text-stone-black mb-2">Fichiers uploadés:</p>
                  <div className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-stone-black/70 truncate flex-1">{file.name}</span>
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Supprimer"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Character Choices Section - Only for Preprinted Chibis */}
        {product.id === 'preprinted-chibis' && (
          <div className="mb-6">
            <div className="bg-korean-gold/10 border-2 border-korean-gold/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Edit3 size={20} className="text-korean-gold" />
                <span className="text-sm font-bold text-stone-black">
                  {t('choices.title')}
                </span>
              </div>
              <input
                type="text"
                value={characterChoices}
                onChange={(e) => setCharacterChoices(e.target.value)}
                placeholder={t('choices.placeholder')}
                className="w-full p-2 border-2 border-korean-gold/20 rounded-lg focus:border-korean-gold focus:outline-none bg-white"
              />
              <p className="text-xs text-stone-black/60 mt-2 font-snap">
                {t('choices.example')}
              </p>
            </div>
          </div>
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
