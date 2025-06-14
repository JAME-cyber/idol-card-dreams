
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-stone-black text-stone-beige">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-stone-powder to-stone-lavender rounded-full flex items-center justify-center">
                <span className="text-stone-black font-bold text-xl font-korean">SI</span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins">{t('header.title')}</h3>
                <p className="text-xs text-stone-beige/70 font-korean">{t('header.subtitle')}</p>
              </div>
            </div>
            <p className="text-stone-beige/80 font-korean text-sm leading-relaxed">
              Your premier destination for exclusive K-Drama collectible cards and premium merchandise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 font-korean">
              <li><a href="#home" className="text-stone-beige/80 hover:text-korean-gold transition-colors">{t('nav.home')}</a></li>
              <li><a href="#shop" className="text-stone-beige/80 hover:text-korean-gold transition-colors">{t('nav.shop')}</a></li>
              <li><a href="#surprise-packs" className="text-stone-beige/80 hover:text-korean-gold transition-colors">{t('shop.surprisePacks')}</a></li>
              <li><a href="#goodies" className="text-stone-beige/80 hover:text-korean-gold transition-colors">{t('shop.goodies')}</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">{t('footer.customerService')}</h4>
            <ul className="space-y-2 font-korean text-sm">
              <li><Link to="/return-policy" className="text-stone-beige/80 hover:text-korean-gold transition-colors">{t('footer.returnPolicy')}</Link></li>
              <li><a href="#" className="text-stone-beige/80 hover:text-korean-gold transition-colors">{t('footer.shippingInfo')}</a></li>
              <li><Link to="/size-guide" className="text-stone-beige/80 hover:text-korean-gold transition-colors">{t('footer.sizeGuide')}</Link></li>
              <li><a href="#" className="text-stone-beige/80 hover:text-korean-gold transition-colors">{t('footer.faq')}</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">{t('footer.connectWithUs')}</h4>
            <div className="space-y-3 font-korean text-sm">
              <div>
                <p className="text-stone-beige/60 mb-1">{t('footer.email')}</p>
                <a href="mailto:stone.idol@yahoo.com" className="text-stone-beige hover:text-korean-gold transition-colors">
                  stone.idol@yahoo.com
                </a>
              </div>
              <div>
                <p className="text-stone-beige/60 mb-1">{t('footer.tiktok')}</p>
                <a href="https://tiktok.com/@Stoneidol1" className="text-stone-beige hover:text-korean-gold transition-colors">
                  @Stoneidol1
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="border-t border-stone-beige/20">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-korean text-stone-beige/60">
            <div className="space-y-1">
              <p><strong>{t('footer.company')}</strong> DECOUVERTE LAURIE</p>
              <p><strong>{t('footer.siren')}</strong> 951853654</p>
              <p><strong>{t('footer.hosting')}</strong> HOSTINGER</p>
            </div>
            <div className="space-y-1 md:text-right">
              <p>{t('footer.copyright')}</p>
              <div className="space-x-4">
                <a href="#" className="hover:text-korean-gold transition-colors">{t('footer.legalTerms')}</a>
                <a href="#" className="hover:text-korean-gold transition-colors">{t('footer.privacyPolicy')}</a>
                <Link to="/return-policy" className="hover:text-korean-gold transition-colors">{t('footer.returns')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
