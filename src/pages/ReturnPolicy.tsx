
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReturnPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20 bg-gradient-to-b from-stone-beige to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-black mb-4 font-poppins">
              🔁 {t('return.title')}
            </h1>
            <p className="text-xl text-stone-black/70 font-korean">
              {t('return.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            {/* What can be returned */}
            <div className="korean-card p-8">
              <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins flex items-center">
                <span className="mr-3">✅</span>
                {t('return.canReturnTitle')}
              </h2>
              <div className="space-y-3 font-korean text-stone-black/80">
                <p>{t('return.canReturnIntro')}</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>{t('return.tshirtsBags')}</strong> {t('return.tshirtsBagsDesc')}</li>
                  <li><strong>{t('return.cards')}</strong> {t('return.cardsDesc')}</li>
                </ul>
                <p className="mt-4 font-semibold">⏳ {t('return.timeLimit')}</p>
              </div>
            </div>

            {/* What can't be returned */}
            <div className="korean-card p-8">
              <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins flex items-center">
                <span className="mr-3">❌</span>
                {t('return.cannotReturnTitle')}
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-2 font-korean text-stone-black/80">
                <li>{t('return.cannotReturnWorn')}</li>
                <li>{t('return.cannotReturnCustom')}</li>
                <li>{t('return.cannotReturnSale')}</li>
                <li>{t('return.cannotReturnDamaged')}</li>
              </ul>
            </div>

            {/* How to return */}
            <div className="korean-card p-8">
              <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins flex items-center">
                <span className="mr-3">📦</span>
                {t('return.howToReturnTitle')}
              </h2>
              <div className="space-y-3 font-korean text-stone-black/80">
                <p>{t('return.howToReturnIntro')} <a href="mailto:stone.idol@yahoo.com" className="text-korean-gold hover:underline font-semibold">stone.idol@yahoo.com</a> {t('return.howToReturnWith')}</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>{t('return.orderNumber')}</li>
                  <li>{t('return.returnReason')}</li>
                </ul>
                <div className="mt-4 space-y-2">
                  <p>{t('return.instructionsSent')}</p>
                  <p>{t('return.shipWithin')}</p>
                </div>
                <p className="mt-4 bg-stone-powder/20 p-3 rounded-lg">
                  <strong>📌 Note:</strong> {t('return.shippingNote')}
                </p>
              </div>
            </div>

            {/* Refund process */}
            <div className="korean-card p-8">
              <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins flex items-center">
                <span className="mr-3">💸</span>
                {t('return.refundTitle')}
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-2 font-korean text-stone-black/80">
                <li>{t('return.refundReceived')}</li>
                <li>{t('return.refundTiming')}</li>
                <li>{t('return.refundMethod')}</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center bg-gradient-to-r from-korean-gold/10 to-stone-powder/20 p-8 rounded-xl">
              <p className="text-lg font-korean text-stone-black">
                {t('return.contactTitle')}{' '}
                <a href="mailto:stone.idol@yahoo.com" className="text-korean-gold hover:underline font-semibold">
                  stone.idol@yahoo.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
