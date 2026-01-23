import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface Collection {
  id: string;
  name: string;
  images: string[];
  description: string;
}

interface CollectionModalProps {
  trigger?: React.ReactNode;
}

const CollectionModal = ({ trigger }: CollectionModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<{ src: string; alt: string; number: number } | null>(null);
  const { t } = useLanguage();
  const collections: Collection[] = [
    {
      id: 'series',
      name: 'Kdramas (séries coréennes)',
      description: 'Découvrez nos dessins inspirés de vos séries coréennes préférées',
      images: [
        '/lovable-uploads/ahn-soheo-chibi.jpg',
        '/lovable-uploads/yeon-sieun-chibi.jpg',
        '/lovable-uploads/ri-jeong-hyeok-chibi.jpg',
        '/lovable-uploads/yoon-se-ri-chibi.jpg',
        '/lovable-uploads/kang-gumshik-chibi.jpg',
        '/lovable-uploads/oh-aeson-chibi.jpg',
        '/lovable-uploads/kim-geormoo-chibi.jpg',
        '/lovable-uploads/yoo-sijin-chibi.jpg',
        '/lovable-uploads/lee-hm-chibi.jpg',
        '/lovable-uploads/lee-keong-chibi.jpg',
        '/lovable-uploads/ko-moonyeong-chibi.jpg',
        '/lovable-uploads/mj10.jpg',
        '/lovable-uploads/aos1.jpg',
        '/lovable-uploads/md1.jpg',
        '/lovable-uploads/mj6.jpg',
        '/lovable-uploads/mp1.jpg',
        '/lovable-uploads/2521.jpg',
        '/lovable-uploads/2523.jpg',
        '/lovable-uploads/md2.jpg',
        '/lovable-uploads/mj9.jpg',
        '/lovable-uploads/tb1.jpg',
        '/lovable-uploads/tb2.jpg',
        '/lovable-uploads/tb3.jpg'
      ]
    },
    {
      id: 'music',
      name: 'Musique',
      description: 'Vos artistes et groupes préférés en version chibi',
      images: [
        '/lovable-uploads/michael-jackson-chibi.jpg',
        '/lovable-uploads/jennie.jpg',
        '/lovable-uploads/f.jpg',
        '/lovable-uploads/kat.jpg',
        '/lovable-uploads/kat1.jpg',
        '/lovable-uploads/kat2.jpg',
        '/lovable-uploads/kat4.jpg',
        '/lovable-uploads/kat6.jpg',
        '/lovable-uploads/kat7.jpg'
      ]
    },
    {
      id: 'cinema',
      name: 'Cinéma',
      description: 'Personnages de films cultes en version chibi',
      images: [
        '/lovable-uploads/neytiri.jpg'
      ]
    }
  ];

  const defaultTrigger = (
    <Button onClick={() => setOpen(true)} variant="outline" className="w-full mb-4 border-pink-200 bg-pink-100 text-stone-black hover:bg-korean-gold hover:text-stone-black transition-colors">
      <Eye className="w-4 h-4 mr-2" />
      {t('collections.viewButton')}
    </Button>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || defaultTrigger}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-gray-200 shadow-2xl" style={{ zIndex: 9999 }}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-stone-black font-snap">
              Nos Collections Chibis
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            {collections.map((collection, collectionIndex) => {
              // Calculer le numéro de départ pour cette collection
              const startNumber = collections.slice(0, collectionIndex).reduce((sum, col) => sum + col.images.length, 0) + 1;
              
              return (
                <div key={collection.id} className="korean-card p-6">
                  <h3 className="text-xl font-bold text-stone-black mb-2 font-snap text-center">
                    {collection.name}
                  </h3>
                  <p className="text-stone-black/70 text-sm mb-4 text-center font-snap">
                    {collection.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {collection.images.map((image, index) => {
                      const imageNumber = startNumber + index;
                      return (
                         <div key={index} className="flex flex-col items-center">
                           <div 
                             className="relative overflow-hidden rounded-lg group w-full cursor-pointer"
                             onClick={() => setSelectedImage({ 
                               src: image, 
                               alt: `${collection.name} - ${imageNumber}`, 
                               number: imageNumber 
                             })}
                           >
                             <img
                               src={image}
                               alt={`${collection.name} - ${imageNumber}`}
                               className="w-full h-32 object-contain group-hover:scale-110 transition-transform duration-300 bg-white rounded"
                               loading="lazy"
                             />
                             {/* Filigrane specimen */}
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                               <span className="text-stone-black/20 text-xs font-bold transform rotate-45 select-none">
                                 SPECIMEN
                               </span>
                             </div>
                             <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                           </div>
                          <div className="mt-2 bg-korean-gold text-stone-black px-3 py-1 rounded-full text-sm font-bold">
                            #{imageNumber}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center p-4 border-t border-korean-gold/20">
            <p className="text-stone-black/70 text-sm font-snap">
              ✨ Ces designs sont disponibles pour tous nos supports ✨
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal pour afficher l'image en grand */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-md max-h-[70vh] bg-white border border-gray-200 shadow-2xl" style={{ zIndex: 10000 }}>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-center text-stone-black font-snap">
              {selectedImage?.alt}
            </DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="flex flex-col items-center p-2">
              <div className="relative w-full max-w-xs">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto object-contain rounded-lg shadow-lg bg-white"
                  loading="lazy"
                />
                {/* Filigrane specimen */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-stone-black/20 text-lg font-bold transform rotate-45 select-none">
                    SPECIMEN
                  </span>
                </div>
              </div>
              <div className="mt-3 bg-korean-gold text-stone-black px-3 py-1 rounded-full text-sm font-bold">
                #{selectedImage.number}
              </div>
              <p className="mt-2 text-stone-black/70 text-xs font-snap text-center">
                Ce design est disponible pour tous nos supports
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CollectionModal;