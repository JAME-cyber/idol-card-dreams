
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
    'hero.title1': 'Discover the Magic of',
    'hero.title2': 'K-Drama Cards',
    'hero.description': 'Collect your favorite K-Drama moments in exclusive surprise packs.\nEach pack contains 3 carefully curated collectible cards.',
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
    'shop.surprisePackName': 'K-Drama Surprise Pack',
    'shop.surprisePackDesc': 'Mystery pack containing 3 exclusive K-Drama collectible cards',
    'shop.addToCart': 'Add to Cart',
    'shop.selectDesign': 'Select Design',
    'shop.selectSize': 'Select Size',
    'shop.cardsCollectionTitle': 'K-Drama Cards Collection',
    'shop.cardsCollectionSubtitle': 'I love them all!',
    'shop.goodiesTitle': 'Stone Idol Goodies',
    'shop.goodiesSubtitle': 'Choose your favorite drama among the most popular ones!',
    
    // Products
    'product.toteBag': 'K-Drama Tote Bag',
    'product.toteBagDesc': '100% cotton, Size: 38cm x 42cm',
    'product.tshirt': 'K-Drama T-Shirt',
    'product.tshirtDesc': 'Cotton and polyester blend',
    'product.backpack': 'K-Drama Backpack',
    'product.backpackDesc': '100% cotton, Size: 38cm x 40cm',
    'product.pictureFrame': 'K-Drama Picture Frame',
    'product.pictureFrameDesc': 'Size: 10cm x 15cm',
    'product.handkerchiefSet': 'Fabric Handkerchief Set',
    'product.handkerchiefSetDesc': '100% cotton, Size: 23cm x 23cm with carrying pouch',
    
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
    'hero.title1': 'Découvrez la Magie des',
    'hero.title2': 'Cartes K-Drama',
    'hero.description': 'Collectionnez vos moments K-Drama préférés dans des packs surprise exclusifs.\nChaque pack contient 3 cartes de collection soigneusement sélectionnées.',
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
    'shop.surprisePackName': 'Pack Surprise K-Drama',
    'shop.surprisePackDesc': 'Pack mystère contenant 3 cartes de collection K-Drama exclusives',
    'shop.addToCart': 'Ajouter au Panier',
    'shop.selectDesign': 'Sélectionner le Design',
    'shop.selectSize': 'Sélectionner la Taille',
    'shop.cardsCollectionTitle': 'Cartes collection Kdramas',
    'shop.cardsCollectionSubtitle': 'Je les aime tous!',
    'shop.goodiesTitle': 'Goodies Stone Idol',
    'shop.goodiesSubtitle': 'Choisis ton drama préféré parmi les plus populaires!',
    
    // Products
    'product.toteBag': 'Sac Tote K-Drama',
    'product.toteBagDesc': '100% coton, Taille: 38cm x 42cm',
    'product.tshirt': 'T-Shirt K-Drama',
    'product.tshirtDesc': 'Mélange coton et polyester',
    'product.backpack': 'Sac à Dos K-Drama',
    'product.backpackDesc': '100% coton, Taille: 38cm x 40cm',
    'product.pictureFrame': 'Cadre Photo K-Drama',
    'product.pictureFrameDesc': 'Taille: 10cm x 15cm',
    'product.handkerchiefSet': 'Set de Mouchoirs en Tissu',
    'product.handkerchiefSetDesc': '100% coton, Taille: 23cm x 23cm avec pochette de transport',
    
    // Footer
    'footer.quickLinks': 'Liens Rapides',
    'footer.customerService': 'Service Client',
    'footer.connectWithUs': 'Connectez-vous avec Nous',
    'footer.returnPolicy': 'Politique de Retour',
    'footer.shippingInfo': 'Infos Livraison',
    'footer.sizeGuide': 'Guide des Tailles',
    'footer.faq': 'FAQ',
    'footer.email': 'Email:',
    'footer.tiktok': 'TikTok:',
    'footer.company': 'Société:',
    'footer.siren': 'SIREN:',
    'footer.hosting': 'Hébergement:',
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
    'hero.title1': '케이드라마 카드의',
    'hero.title2': '마법을 발견하세요',
    'hero.description': '독점 서프라이즈 팩으로 좋아하는 케이드라마 순간들을 수집하세요.\n각 팩에는 엄선된 3장의 수집용 카드가 들어있습니다.',
    'hero.shopButton': '서프라이즈 팩 쇼핑',
    'hero.exploreButton': '굿즈 탐색',
    'hero.cardsPerPack': '팩당 카드',
    'hero.series': '케이드라마 시리즈',
    'hero.surprise': '서프라이즈',
    
    // Shop Section
    'shop.title': '우리의 컬렉션',
    'shop.description': '좋아하는 시리즈에서 영감을 받은 독점 케이드라마 수집품과 프리미엄 상품을 발견하세요.',
    'shop.surprisePacks': '서프라이즈 카드 팩',
    'shop.goodies': '굿즈',
    'shop.surprisePackName': '케이드라마 서프라이즈 팩',
    'shop.surprisePackDesc': '3장의 독점 케이드라마 수집용 카드가 들어있는 미스터리 팩',
    'shop.addToCart': '장바구니에 추가',
    'shop.selectDesign': '디자인 선택',
    'shop.selectSize': '사이즈 선택',
    'shop.cardsCollectionTitle': '케이드라마 카드 컬렉션',
    'shop.cardsCollectionSubtitle': '모두 사랑해요!',
    'shop.goodiesTitle': '스톤 아이돌 굿즈',
    'shop.goodiesSubtitle': '가장 인기 있는 드라마 중에서 좋아하는 것을 선택하세요!',
    
    // Products
    'product.toteBag': '케이드라마 토트백',
    'product.toteBagDesc': '100% 코튼, 사이즈: 38cm x 42cm',
    'product.tshirt': '케이드라마 티셔츠',
    'product.tshirtDesc': '코튼과 폴리에스터 혼방',
    'product.backpack': '케이드라마 백팩',
    'product.backpackDesc': '100% 코튼, 사이즈: 38cm x 40cm',
    'product.pictureFrame': '케이드라마 액자',
    'product.pictureFrameDesc': '사이즈: 10cm x 15cm',
    'product.handkerchiefSet': '패브릭 손수건 세트',
    'product.handkerchiefSetDesc': '100% 코튼, 사이즈: 23cm x 23cm 휴대용 파우치 포함',
    
    // Footer
    'footer.quickLinks': '빠른 링크',
    'footer.customerService': '고객 서비스',
    'footer.connectWithUs': '연결하기',
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
  const [language, setLanguage] = useState<Language>('en');

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
