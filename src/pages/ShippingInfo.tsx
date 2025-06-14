
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ShippingInfo = () => {
  const { t, language } = useLanguage();

  const shippingData = {
    fr: {
      title: "🇫🇷 Informations sur la Livraison",
      sections: [
        {
          title: "Origine de l'expédition",
          content: "Les commandes sont expédiées depuis la France ou la Corée du Sud, selon la disponibilité du produit."
        },
        {
          title: "Délais de traitement",
          content: "Les commandes sont traitées sous 1 à 3 jours ouvrés."
        },
        {
          title: "Délais de livraison",
          content: "• France : 2 à 5 jours ouvrés\n• Europe : 5 à 10 jours ouvrés\n• Corée du Sud : 2 à 4 jours ouvrés\n• International : 7 à 15 jours ouvrés"
        },
        {
          title: "Frais de livraison",
          content: "Les frais sont calculés lors du paiement selon la destination et le poids.\nLivraison gratuite à partir de 100€ / 120$ d'achat."
        },
        {
          title: "Douanes & Taxes",
          content: "Des frais de douane peuvent s'appliquer pour les commandes internationales. Ces frais sont à la charge du client."
        }
      ]
    },
    ko: {
      title: "🇰🇷 배송 안내",
      sections: [
        {
          title: "배송 출고지",
          content: "제품은 프랑스 또는 대한민국에서 출고됩니다 (제품 재고에 따라 다름)."
        },
        {
          title: "처리 시간",
          content: "주문은 영업일 기준 1~3일 내에 처리됩니다."
        },
        {
          title: "배송 소요 시간",
          content: "• 프랑스: 영업일 기준 2~5일\n• 유럽: 영업일 기준 5~10일\n• 대한민국: 영업일 기준 2~4일\n• 기타 해외: 영업일 기준 7~15일"
        },
        {
          title: "배송비",
          content: "배송비는 결제 시 자동 계산됩니다 (지역과 무게 기준).\n€100 / $120 이상 구매 시 무료 배송."
        },
        {
          title: "관세 및 세금",
          content: "국제 배송 시 관세나 수입세가 부과될 수 있으며, 이는 고객 부담입니다."
        }
      ]
    },
    en: {
      title: "🇬🇧 Shipping Information",
      sections: [
        {
          title: "Where We Ship From",
          content: "Orders are shipped from France and South Korea, depending on product availability."
        },
        {
          title: "Processing Time",
          content: "Orders are processed within 1-3 business days."
        },
        {
          title: "Delivery Time",
          content: "• France: 2–5 business days\n• Europe: 5–10 business days\n• South Korea: 2–4 business days\n• Worldwide: 7–15 business days"
        },
        {
          title: "Shipping Costs",
          content: "Shipping is calculated at checkout based on your location and package weight.\nFree shipping for orders over €100 / $120."
        },
        {
          title: "Customs & Duties",
          content: "International orders may be subject to customs fees. These are the responsibility of the customer."
        }
      ]
    }
  };

  const currentShipping = shippingData[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-powder via-stone-lavender to-korean-gold/20">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-black mb-6 font-poppins">
              {currentShipping.title}
            </h1>
          </div>

          {/* Shipping Information Sections */}
          <div className="space-y-8">
            {currentShipping.sections.map((section, index) => (
              <div key={index} className="korean-card p-8">
                <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins">
                  {section.title}
                </h2>
                <div className="text-stone-black/80 font-korean leading-relaxed">
                  {section.content.split('\n').map((line, lineIndex) => (
                    <p key={lineIndex} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="korean-card p-8 mt-12 text-center">
            <h3 className="text-xl font-bold text-stone-black mb-4 font-poppins">
              {language === 'fr' ? 'Questions sur la livraison ?' : 
               language === 'ko' ? '배송 관련 문의사항이 있으신가요?' : 
               'Questions about shipping?'}
            </h3>
            <p className="text-stone-black/80 font-korean mb-4">
              {language === 'fr' ? 'Contactez-nous à' : 
               language === 'ko' ? '다음으로 연락주세요' : 
               'Contact us at'}
            </p>
            <a 
              href="mailto:stone.idol@yahoo.com" 
              className="text-korean-gold hover:text-korean-gold/80 font-semibold transition-colors"
            >
              stone.idol@yahoo.com
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShippingInfo;
