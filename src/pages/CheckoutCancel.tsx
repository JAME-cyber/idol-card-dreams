
import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CheckoutCancel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-powder via-white to-stone-beige/30">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="mb-8">
              <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-stone-black mb-4 font-poppins">
                Payment Cancelled
              </h1>
              <p className="text-lg text-stone-black/70 font-korean">
                No worries! Your items are still in your cart.
              </p>
            </div>

            <div className="bg-stone-beige/20 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-stone-black mb-4 font-poppins">
                What happened?
              </h2>
              <p className="text-stone-black/80 font-korean">
                Your payment was cancelled and no charges were made. 
                Your cart items are safe and waiting for you!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="korean-button-outline hover-glow inline-flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Link>
              <button
                onClick={() => {
                  // This will open the cart drawer
                  const cartButton = document.querySelector('[data-cart-button]') as HTMLButtonElement;
                  if (cartButton) {
                    cartButton.click();
                  }
                }}
                className="korean-button hover-glow inline-flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutCancel;
