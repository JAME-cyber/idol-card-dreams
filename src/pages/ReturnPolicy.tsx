
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
              🔁 Return & Refund Policy
            </h1>
            <p className="text-xl text-stone-black/70 font-korean">
              We want you to be fully happy with your order! If there's a problem, we're here to help.
            </p>
          </div>

          <div className="space-y-8">
            {/* What can be returned */}
            <div className="korean-card p-8">
              <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins flex items-center">
                <span className="mr-3">✅</span>
                What can be returned?
              </h2>
              <div className="space-y-3 font-korean text-stone-black/80">
                <p>You can return:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li><strong>T-shirts and bags:</strong> must be unused, unwashed, and in original condition</li>
                  <li><strong>Cards (greeting/postcards):</strong> must be unused, undamaged, and in original packaging</li>
                </ul>
                <p className="mt-4 font-semibold">⏳ You have 14 days from the delivery date to request a return.</p>
              </div>
            </div>

            {/* What can't be returned */}
            <div className="korean-card p-8">
              <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins flex items-center">
                <span className="mr-3">❌</span>
                What can't be returned?
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-2 font-korean text-stone-black/80">
                <li>Items that have been worn, washed, or used</li>
                <li>Custom or personalized products</li>
                <li>Items on sale or promotion</li>
                <li>Damaged items caused by misuse</li>
              </ul>
            </div>

            {/* How to return */}
            <div className="korean-card p-8">
              <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins flex items-center">
                <span className="mr-3">📦</span>
                How to return?
              </h2>
              <div className="space-y-3 font-korean text-stone-black/80">
                <p>Email us at <a href="mailto:stone.idol@yahoo.com" className="text-korean-gold hover:underline font-semibold">stone.idol@yahoo.com</a> with:</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Your order number</li>
                  <li>The reason for return</li>
                </ul>
                <div className="mt-4 space-y-2">
                  <p>We'll send you the return instructions and address</p>
                  <p>Ship the item back within 7 days of approval</p>
                </div>
                <p className="mt-4 bg-stone-powder/20 p-3 rounded-lg">
                  <strong>📌 Note:</strong> Return shipping costs are your responsibility, unless the product is defective or we made a mistake.
                </p>
              </div>
            </div>

            {/* Refund process */}
            <div className="korean-card p-8">
              <h2 className="text-2xl font-bold text-stone-black mb-4 font-poppins flex items-center">
                <span className="mr-3">💸</span>
                Refund process
              </h2>
              <ul className="list-disc list-inside ml-4 space-y-2 font-korean text-stone-black/80">
                <li>Once we receive and inspect your item, we'll confirm by email</li>
                <li>If approved, you'll get your refund within 5–10 business days</li>
                <li>Refunds go back to your original payment method</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center bg-gradient-to-r from-korean-gold/10 to-stone-powder/20 p-8 rounded-xl">
              <p className="text-lg font-korean text-stone-black">
                Need help or have a question? Contact us anytime at{' '}
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
