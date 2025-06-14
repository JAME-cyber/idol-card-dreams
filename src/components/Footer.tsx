
import React from 'react';

const Footer = () => {
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
                <h3 className="text-xl font-bold font-poppins">STONE IDOL</h3>
                <p className="text-xs text-stone-beige/70 font-korean">K-Drama Collectibles</p>
              </div>
            </div>
            <p className="text-stone-beige/80 font-korean text-sm leading-relaxed">
              Your premier destination for exclusive K-Drama collectible cards and premium merchandise.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">Quick Links</h4>
            <ul className="space-y-2 font-korean">
              <li><a href="#home" className="text-stone-beige/80 hover:text-korean-gold transition-colors">Home</a></li>
              <li><a href="#shop" className="text-stone-beige/80 hover:text-korean-gold transition-colors">Shop</a></li>
              <li><a href="#surprise-packs" className="text-stone-beige/80 hover:text-korean-gold transition-colors">Surprise Packs</a></li>
              <li><a href="#goodies" className="text-stone-beige/80 hover:text-korean-gold transition-colors">Goodies</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">Customer Service</h4>
            <ul className="space-y-2 font-korean text-sm">
              <li><a href="#" className="text-stone-beige/80 hover:text-korean-gold transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-stone-beige/80 hover:text-korean-gold transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-stone-beige/80 hover:text-korean-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-stone-beige/80 hover:text-korean-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">Connect With Us</h4>
            <div className="space-y-3 font-korean text-sm">
              <div>
                <p className="text-stone-beige/60 mb-1">Email:</p>
                <a href="mailto:stone.idol@yahoo.com" className="text-stone-beige hover:text-korean-gold transition-colors">
                  stone.idol@yahoo.com
                </a>
              </div>
              <div>
                <p className="text-stone-beige/60 mb-1">TikTok:</p>
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
              <p><strong>Company:</strong> DECOUVERTE LAURIE</p>
              <p><strong>SIREN:</strong> 951853654</p>
              <p><strong>Hosting:</strong> HOSTINGER</p>
            </div>
            <div className="space-y-1 md:text-right">
              <p>© 2024 Stone Idol. All rights reserved.</p>
              <div className="space-x-4">
                <a href="#" className="hover:text-korean-gold transition-colors">Legal Terms</a>
                <a href="#" className="hover:text-korean-gold transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-korean-gold transition-colors">Returns</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
