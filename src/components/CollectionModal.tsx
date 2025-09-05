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
  const collections: Collection[] = [
    {
      id: 'series',
      name: 'Films/Séries',
      description: 'Découvrez nos dessins inspirés de vos séries préférées',
      images: [
        '/lovable-uploads/8902c19e-8aaa-4667-97bb-2084dfd0a6ed.png',
        '/lovable-uploads/e0b8ae8e-4081-44c3-bc6c-080fe7a78ac5.png',
        '/lovable-uploads/f34ed131-a6b0-4be7-8028-7e53cc3a1898.png',
        '/lovable-uploads/c8270c71-24ae-4551-a109-d1b9d549684a.png'
      ]
    },
    {
      id: 'family',
      name: 'Famille',
      description: 'Des moments précieux en famille capturés en chibi',
      images: [
        '/lovable-uploads/5f17cbb0-6cc2-437d-b6df-e6b5091cc25e.png',
        '/lovable-uploads/6e00455b-55b4-4589-a30f-6a59881756bf.png',
        '/lovable-uploads/7c02c0ae-eeb5-4faa-b02a-06fbaf2a7532.png',
        '/lovable-uploads/9179dd04-6fb7-46b6-a661-a6f0fed3db28.png'
      ]
    },
    {
      id: 'holidays',
      name: 'Fêtes',
      description: 'Célébrez les moments spéciaux avec style',
      images: [
        '/lovable-uploads/80b72e44-df54-47fa-85c7-34e00c50cd3e.png',
        '/lovable-uploads/922214f7-53ed-4332-9085-b848adaba843.png',
        '/lovable-uploads/cb7a13f6-c443-42bd-aac9-1cb9b52f2e67.png',
        '/lovable-uploads/df261ee6-26f7-43c6-b60b-ecb31aa6f1d8.png'
      ]
    },
    {
      id: 'objects',
      name: 'Objets',
      description: 'Vos objets favoris transformés en art chibi',
      images: [
        '/lovable-uploads/113e68de-85f6-407a-a5b8-c1ce51c003bb.png',
        '/lovable-uploads/276f8fc0-49f1-4459-821a-6227237aed06.png',
        '/lovable-uploads/485f0eaa-2152-4dc3-bfa7-1157fd649b06.png',
        '/lovable-uploads/4902926d-b6ae-4d9c-9502-65c796083e49.png'
      ]
    }
  ];

  const defaultTrigger = (
    <Button variant="outline" className="w-full mb-4 border-korean-gold text-korean-gold hover:bg-korean-gold hover:text-white transition-colors">
      <Eye className="w-4 h-4 mr-2" />
      Voir les collections
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-stone-black font-snap">
            Nos Collections Chibibis
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {collections.map((collection) => (
            <div key={collection.id} className="korean-card p-6">
              <h3 className="text-xl font-bold text-stone-black mb-2 font-snap text-center">
                {collection.name}
              </h3>
              <p className="text-stone-black/70 text-sm mb-4 text-center font-snap">
                {collection.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {collection.images.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg group">
                    <img
                      src={image}
                      alt={`${collection.name} - ${index + 1}`}
                      className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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