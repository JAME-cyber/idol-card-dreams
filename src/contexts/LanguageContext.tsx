import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.title': 'STONE IDOL',
    'header.subtitle': 'K-Drama Collectibles',
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    
    // Hero Section
    'hero.title': 'Custom Chibibi Gifts Stone Idol',
    'hero.subtitle': 'Custom Chibibi "My Safe Place" style gifts',
    'hero.tagline': 'To be sure to make you happy...',
    'hero.description': 'I create your favorite characters inspired by what matters most to you: your Safe Place, what reassures you and helps you manage everyday life.',
    'hero.mainDescription': 'I create your favorite characters inspired by what matters most to you: your Safe Place, what reassures and helps you manage everyday life.',
    'hero.personalDescription': 'For me, it\'s my family, my cat, and, right now, Korean series (Kdramas), hence my somewhat oriented collections :)',
    'hero.questionDescription': 'What is your refuge? A family member, a friend, a pet, a book, a movie, an object... I would be delighted to represent your Safe Place or that of your loved ones with my Chibibis. Don\'t hesitate!',
    'hero.giftDescription': 'And, for holidays or birthdays, a gift for which you took the time to think about the recipient has much more value.',
    'hero.noteDescription': 'Note: I don\'t use AI to create my Chibibis.',
    'hero.photoPlaceholder': 'Photo coming soon',
    'hero.shopButton': 'Shop Surprise Packs',
    'hero.exploreButton': 'Explore Goodies',
    'hero.cardsPerPack': 'Cards per pack',
    'hero.series': 'K-Drama series',
    'hero.surprise': 'Surprise',
    
    // Shop Section
    'shop.title': 'Our Collection',
    'shop.description': 'Discover exclusive K-Drama collectibles and premium merchandise inspired by your favorite series.',
    'shop.surprisePacks': 'Surprise Card Packs',
    'shop.goodies': 'Goodies',
    'shop.surprisePackName': 'Stone Idol Surprise Pack',
    'shop.surprisePackDesc': 'Mystery pack containing 3 exclusive Stone Idol collectible cards',
    'shop.addToCart': 'Add to Cart',
    'shop.selectDesign': 'Select Design',
    'shop.selectSize': 'Select Size',
    'shop.cardsCollectionTitle': 'Stone Idol Collection cards',
    'shop.cardsCollectionSubtitle': 'They all became part of our lives at some point',
    'shop.goodiesTitle': 'Stone Idol Goodies',
    'shop.goodiesSubtitle': 'Choose your favorite drama among the most popular ones!',
    
    // Products
    'product.toteBag': 'Stone Idol Tote Bag',
    'product.toteBagDesc': '100% cotton, Size: 38cm x 42cm',
    'product.tshirt': 'Stone Idol T-Shirt',
    'product.tshirtDesc': 'Cotton and polyester blend',
    'product.backpack': 'Stone Idol Backpack',
    'product.backpackDesc': '100% cotton, Size: 38cm x 40cm',
    'product.pictureFrame': 'Stone Idol Picture Frame',
    'product.pictureFrameDesc': 'Size: 10cm x 15cm',
    'product.handkerchiefSet': 'Fabric Handkerchief Set',
    'product.handkerchiefSetDesc': '100% cotton, Size: 23cm x 23cm with carrying pouch',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.shipping': 'Shipping',
    'cart.country': 'Destination Country',
    'cart.calculate': 'Calculate',
    'cart.subtotal': 'Subtotal',
    'cart.total': 'Total',
    'cart.freeShipping': 'Free Shipping!',
    'cart.checkout': 'Proceed to Checkout',
    
    // Shipping Calculator
    'shipping.title': 'Shipping Calculator',
    'shipping.country': 'Destination Country',
    'shipping.postalCode': 'Postal Code (optional)',
    'shipping.calculate': 'Calculate',
    'shipping.cost': 'Shipping Cost',
    'shipping.free': 'Free Shipping!',
    'shipping.emptyCart': 'Add items to cart to calculate shipping',
    'shipping.deliveryTime': 'Estimated Delivery Time',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.customerService': 'Customer Service',
    'footer.connectWithUs': 'Connect With Us',
    'footer.returnPolicy': 'Return Policy',
    'footer.shippingInfo': 'Shipping Info',
    'footer.sizeGuide': 'Size Guide',
    'footer.faq': 'FAQ',
    'footer.email': 'Email:',
    'footer.tiktok': 'TikTok:',
    'footer.company': 'Company:',
    'footer.siren': 'SIREN:',
    'footer.hosting': 'Hosting:',
    'footer.copyright': '© 2024 Stone Idol. All rights reserved.',
    'footer.legalTerms': 'Legal Terms',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.returns': 'Returns',
  },
  fr: {
    // Header
    'header.title': 'STONE IDOL',
    'header.subtitle': 'Collectibles K-Drama',
    'nav.home': 'Accueil',
    'nav.shop': 'Boutique',
    'nav.about': 'À propos',
    
    // Hero Section
    'hero.title': 'Cadeaux Personnalisés Chibibis Stone Idol',
    'hero.subtitle': 'Cadeaux personnalisés façon Chibibis "My Safe Place"',
    'hero.tagline': 'Pour être certain de faire plaisir...',
    'hero.description': 'Je crée vos personnages préférés en m\'inspirant de ce qui compte le plus pour vous: votre Safe Place, ce qui vous rassure et vous permet de gérer le quotidien.',
    'hero.mainDescription': 'Je crée vos personnages préférés en m\'inspirant de ce qui compte le plus pour vous: votre Safe Place, ce qui vous rassure et vous permet de gérer le quotidien.',
    'hero.personalDescription': 'Pour ma part, il s\'agit de ma famille, mon chat, et, en ce moment, des Séries coréennes (Kdramas), d\'où mes collections un peu orientées :)',
    'hero.questionDescription': 'Vous, quel est votre refuge? un membre de votre famille, un ami, un animal de compagnie, un livre, un film, un objet... Je serai ravi de représenter votre Safe Place ou celle d\'un de vos proches avec mes Chibibis. N\'hésitez pas!',
    'hero.giftDescription': 'Et, pour les fêtes ou les anniversaires, un cadeau pour lequel vous avez pris le temps de penser au destinataire a beaucoup plus de valeur.',
    'hero.noteDescription': 'NB: je n\'utilise pas d\'IA pour créer mes Chibibis.',
    'hero.photoPlaceholder': 'Photo à venir',
    'hero.shopButton': 'Acheter des Packs Surprise',
    'hero.exploreButton': 'Explorer les Goodies',
    'hero.cardsPerPack': 'Cartes par pack',
    'hero.series': 'Séries K-Drama',
    'hero.surprise': 'Surprise',
    
    // Shop Section
    'shop.title': 'Notre Collection',
    'shop.description': 'Découvrez des objets de collection K-Drama exclusifs et des produits premium inspirés de vos séries préférées.',
    'shop.surprisePacks': 'Packs de Cartes Surprise',
    'shop.goodies': 'Goodies',
    'shop.surprisePackName': 'Pack Surprise Stone Idol',
    'shop.surprisePackDesc': 'Pack mystère contenant 3 cartes de collection Stone Idol exclusives',
    'shop.addToCart': 'Ajouter au Panier',
    'shop.selectDesign': 'Sélectionner le Design',
    'shop.selectSize': 'Sélectionner la Taille',
    'shop.cardsCollectionTitle': 'Cartes de Collection Stone Idol',
    'shop.cardsCollectionSubtitle': 'Ils ont tous fait partie de nos vies à un moment donné',
    'shop.goodiesTitle': 'Goodies Stone Idol',
    'shop.goodiesSubtitle': 'Choisis ton drama préféré parmi les plus populaires !',
    
    // Products
    'product.toteBag': 'Sac Tote Stone Idol',
    'product.toteBagDesc': '100% coton, Taille : 38cm x 42cm',
    'product.tshirt': 'T-Shirt Stone Idol',
    'product.tshirtDesc': 'Mélange coton et polyester',
    'product.backpack': 'Sac à Dos Stone Idol',
    'product.backpackDesc': '100% coton, Taille : 38cm x 40cm',
    'product.pictureFrame': 'Cadre Photo Stone Idol',
    'product.pictureFrameDesc': 'Taille : 10cm x 15cm',
    'product.handkerchiefSet': 'Set de Mouchoirs en Tissu',
    'product.handkerchiefSetDesc': '100% coton, Taille : 23cm x 23cm avec pochette de transport',
    
    // Cart
    'cart.title': 'Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.shipping': 'Frais de livraison',
    'cart.country': 'Pays de destination',
    'cart.calculate': 'Calculer',
    'cart.subtotal': 'Sous-total',
    'cart.total': 'Total',
    'cart.freeShipping': 'Livraison gratuite !',
    'cart.checkout': 'Passer la commande',
    
    // Shipping Calculator
    'shipping.title': 'Calculateur de Livraison',
    'shipping.country': 'Pays de destination',
    'shipping.postalCode': 'Code postal (optionnel)',
    'shipping.calculate': 'Calculer',
    'shipping.cost': 'Frais de livraison',
    'shipping.free': 'Livraison gratuite !',
    'shipping.emptyCart': 'Ajoutez des articles au panier pour calculer les frais de livraison',
    'shipping.deliveryTime': 'Délai de livraison estimé',
    
    // Footer
    'footer.quickLinks': 'Liens Rapides',
    'footer.customerService': 'Service Client',
    'footer.connectWithUs': 'Restez Connectés',
    'footer.returnPolicy': 'Politique de Retour',
    'footer.shippingInfo': 'Infos Livraison',
    'footer.sizeGuide': 'Guide des Tailles',
    'footer.faq': 'FAQ',
    'footer.email': 'Email :',
    'footer.tiktok': 'TikTok :',
    'footer.company': 'Société :',
    'footer.siren': 'SIREN :',
    'footer.hosting': 'Hébergement :',
    'footer.copyright': '© 2024 Stone Idol. Tous droits réservés.',
    'footer.legalTerms': 'Mentions Légales',
    'footer.privacyPolicy': 'Politique de Confidentialité',
    'footer.returns': 'Retours',
  },
  ko: {
    // Header
    'header.title': 'STONE IDOL',
    'header.subtitle': '케이드라마 수집품',
    'nav.home': '홈',
    'nav.shop': '쇼핑',
    'nav.about': '소개',
    
    // Hero Section
    'hero.title': '맞춤형 치비 선물 Stone Idol',
    'hero.subtitle': '치비 "My Safe Place" 스타일 맞춤 선물',
    'hero.tagline': '기쁨을 주는 것이 확실하도록...',
    'hero.description': '당신에게 가장 소중한 것, 즉 당신의 Safe Place에서 영감을 받아 당신이 좋아하는 캐릭터들을 만듭니다.',
    'hero.mainDescription': '당신에게 가장 소중한 것에서 영감을 받아 좋아하는 캐릭터를 만듭니다: 당신의 Safe Place, 당신을 안심시키고 일상을 관리하는 데 도움이 되는 것.',
    'hero.personalDescription': '저에게는 가족, 고양이, 그리고 지금은 한국 드라마(K드라마)가 있어서 제 컬렉션이 조금 편향되어 있습니다 :)',
    'hero.questionDescription': '당신의 피난처는 무엇인가요? 가족, 친구, 애완동물, 책, 영화, 물건... 제 치비로 당신의 Safe Place나 사랑하는 사람의 것을 표현할 수 있어 기쁠 것입니다. 주저하지 마세요!',
    'hero.giftDescription': '그리고 휴일이나 생일에는 받는 사람을 생각하며 시간을 들인 선물이 훨씬 더 가치가 있습니다.',
    'hero.noteDescription': '참고: 치비를 만들 때 AI를 사용하지 않습니다.',
    'hero.photoPlaceholder': '곧 사진이 올 예정',
    'hero.shopButton': '서프라이즈 팩 쇼핑',
    'hero.exploreButton': '굿즈 탐색',
    'hero.cardsPerPack': '팩당 카드 수',
    'hero.series': '케이드라마 시리즈',
    'hero.surprise': '서프라이즈',
    
    // Shop Section
    'shop.title': '우리의 컬렉션',
    'shop.description': '좋아하는 시리즈에서 영감을 받은 독점 케이드라마 수집품과 프리미엄 상품을 발견하세요.',
    'shop.surprisePacks': '서프라이즈 카드 팩',
    'shop.goodies': '굿즈',
    'shop.surprisePackName': 'Stone Idol 서프라이즈 팩',
    'shop.surprisePackDesc': '3장의 독점 Stone Idol 수집용 카드가 들어있는 미스터리 팩',
    'shop.addToCart': '장바구니에 추가',
    'shop.selectDesign': '디자인 선택',
    'shop.selectSize': '사이즈 선택',
    'shop.cardsCollectionTitle': 'Stone Idol 컬렉션 카드',
    'shop.cardsCollectionSubtitle': '모두 사랑해요!',
    'shop.goodiesTitle': '스톤 아이돌 굿즈',
    'shop.goodiesSubtitle': '가장 인기 있는 드라마 중에서 좋아하는 것을 선택하세요!',
    
    // Products
    'product.toteBag': 'Stone Idol 토트백',
    'product.toteBagDesc': '100% 코튼, 사이즈: 38cm x 42cm',
    'product.tshirt': 'Stone Idol 티셔츠',
    'product.tshirtDesc': '코튼과 폴리에스터 혼방',
    'product.backpack': 'Stone Idol 백팩',
    'product.backpackDesc': '100% 코튼, 사이즈: 38cm x 40cm',
    'product.pictureFrame': 'Stone Idol 액자',
    'product.pictureFrameDesc': '사이즈: 10cm x 15cm',
    'product.handkerchiefSet': '패브릭 손수건 세트',
    'product.handkerchiefSetDesc': '100% 코튼, 사이즈: 23cm x 23cm 휴대용 파우치 포함',
    
    // Cart
    'cart.title': '장바구니',
    'cart.empty': '장바구니가 비어있습니다',
    'cart.shipping': '배송비',
    'cart.country': '배송 국가',
    'cart.calculate': '계산하기',
    'cart.subtotal': '소계',
    'cart.total': '총액',
    'cart.freeShipping': '무료 배송!',
    'cart.checkout': '결제하기',
    
    // Shipping Calculator
    'shipping.title': '배송비 계산기',
    'shipping.country': '배송 국가',
    'shipping.postalCode': '우편번호 (선택사항)',
    'shipping.calculate': '계산하기',
    'shipping.cost': '배송비',
    'shipping.free': '무료 배송!',
    'shipping.emptyCart': '배송비 계산을 위해 장바구니에 상품을 추가해주세요',
    'shipping.deliveryTime': '예상 배송 시간',
    
    // Footer
    'footer.quickLinks': '빠른 링크',
    'footer.customerService': '고객 서비스',
    'footer.connectWithUs': '소셜 미디어',
    'footer.returnPolicy': '반품 정책',
    'footer.shippingInfo': '배송 정보',
    'footer.sizeGuide': '사이즈 가이드',
    'footer.faq': '자주 묻는 질문',
    'footer.email': '이메일:',
    'footer.tiktok': '틱톡:',
    'footer.company': '회사:',
    'footer.siren': 'SIREN:',
    'footer.hosting': '호스팅:',
    'footer.copyright': '© 2024 Stone Idol. 모든 권리 보유.',
    'footer.legalTerms': '법적 조건',
    'footer.privacyPolicy': '개인정보 보호정책',
    'footer.returns': '반품',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
