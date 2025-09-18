import React from 'react';
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
        '/lovable-uploads/2523.jpg'
      ]
    },
    {
      id: 'music',
      name: 'Musique',
      description: 'Vos artistes et groupes préférés en version chibi',
      images: [
        '/lovable-uploads/e41abdda-bd58-4f65-bc69-ba2917f22430.png',
        '/lovable-uploads/michael-jackson-chibi.jpg'
      ]
    }
  ];

  const defaultTrigger = (
    <Button onClick={() => setOpen(true)} variant="outline" className="w-full mb-4 border-korean-gold-pastel bg-korean-gold-pastel text-stone-black hover:bg-korean-gold hover:text-stone-black transition-colors">
      <Eye className="w-4 h-4 mr-2" />
      Voir les collections
    </Button>
  );

  return (
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
                         <div className="relative overflow-hidden rounded-lg group w-full">
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
  );
};

export default CollectionModal;