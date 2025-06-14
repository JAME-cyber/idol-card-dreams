
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ = () => {
  const { t, language } = useLanguage();

  const faqData = {
    fr: {
      title: "FAQ – E-commerce",
      country: "France",
      questions: [
        {
          question: "🛒 Q1. Quels types de produits vendez-vous ?",
          answer: "👉 Nous proposons des produits de qualité soigneusement sélectionnés : [100% COTON]."
        },
        {
          question: "🚚 Q2. Quels sont les délais de livraison ?",
          answer: "👉 En France, la livraison prend entre 2 à 5 jours ouvrés. Livraison express disponible."
        },
        {
          question: "💳 Q3. Quels moyens de paiement acceptez-vous ?",
          answer: "👉 CB (Visa, MasterCard), PayPal, Apple Pay, et parfois paiement en plusieurs fois (si dispo)."
        },
        {
          question: "📦 Q4. Puis-je suivre ma commande ?",
          answer: "👉 Oui, un lien de suivi est envoyé par email dès l'expédition."
        },
        {
          question: "↩️ Q5. Les retours sont-ils possibles ?",
          answer: "👉 Vous avez 14 jours pour nous retourner un article s'il est neuf et dans son emballage d'origine."
        },
        {
          question: "📞 Q6. Comment contacter le service client ?",
          answer: "👉 Par email, WhatsApp ou via notre formulaire de contact. Réponse sous 24h."
        }
      ]
    },
    ko: {
      title: "FAQ – E-commerce",
      country: "Korea",
      questions: [
        {
          question: "🛒 Q1. 어떤 제품을 판매하나요?",
          answer: "👉 저희는 엄선된 품질 좋은 상품을 제공합니다: [100% 면]."
        },
        {
          question: "🚚 Q2. 배송 기간은 얼마나 걸리나요?",
          answer: "👉 한국 내 배송은 평균 2~5 영업일 소요됩니다. 빠른 배송 옵션도 제공됩니다."
        },
        {
          question: "💳 Q3. 어떤 결제 수단이 가능한가요?",
          answer: "👉 신용카드(Visa, MasterCard), 페이팔, 애플페이 등을 지원합니다."
        },
        {
          question: "📦 Q4. 주문 추적은 어떻게 하나요?",
          answer: "👉 발송 후 이메일로 추적 링크를 보내드립니다."
        },
        {
          question: "↩️ Q5. 반품이 가능한가요?",
          answer: "👉 제품 수령 후 14일 이내, 미사용 상태일 경우 반품이 가능합니다."
        },
        {
          question: "📞 Q6. 고객센터 연락 방법은?",
          answer: "👉 이메일, WhatsApp, 또는 문의 양식을 통해 문의주세요. 24시간 내 응답합니다."
        }
      ]
    },
    en: {
      title: "FAQ – E-commerce",
      country: "English",
      questions: [
        {
          question: "🛒 Q1. What kind of products do you sell?",
          answer: "👉 We offer carefully selected quality items: [100% COTTON]."
        },
        {
          question: "🚚 Q2. How long does shipping take?",
          answer: "👉 Delivery takes 2–5 business days locally. Express shipping is available."
        },
        {
          question: "💳 Q3. What payment methods do you accept?",
          answer: "👉 We accept credit cards (Visa, MasterCard), PayPal, and Apple Pay. Installments may be available."
        },
        {
          question: "📦 Q4. Can I track my order?",
          answer: "👉 Yes! A tracking link is sent via email once your package ships."
        },
        {
          question: "↩️ Q5. Can I return a product?",
          answer: "👉 Yes, within 14 days after delivery if the item is unused and in original packaging."
        },
        {
          question: "📞 Q6. How can I contact customer support?",
          answer: "👉 You can reach us via email, WhatsApp, or contact form. We reply within 24 hours."
        }
      ]
    }
  };

  const currentFAQ = faqData[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-powder via-stone-lavender to-korean-gold/20">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-black mb-4 font-poppins">
              🌍 {currentFAQ.title}
            </h1>
            <div className="inline-block bg-korean-gold/20 px-4 py-2 rounded-full">
              <p className="text-lg font-semibold text-stone-black font-korean">
                {currentFAQ.country}
              </p>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {currentFAQ.questions.map((faq, index) => (
              <div key={index} className="korean-card p-6">
                <h3 className="text-lg font-bold text-stone-black mb-3 font-poppins">
                  {faq.question}
                </h3>
                <p className="text-stone-black/80 font-korean leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="korean-card p-8 mt-12 text-center">
            <h3 className="text-xl font-bold text-stone-black mb-4 font-poppins">
              {language === 'fr' ? 'Besoin d\'aide supplémentaire ?' : 
               language === 'ko' ? '추가 도움이 필요하신가요?' : 
               'Need additional help?'}
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

export default FAQ;
