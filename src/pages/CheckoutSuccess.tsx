
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [orderCleared, setOrderCleared] = useState(false);

  useEffect(() => {
    // Clear cart after successful payment
    if (sessionId && !orderCleared) {
      clearCart();
      setOrderCleared(true);
    }
  }, [sessionId, clearCart, orderCleared]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-powder via-white to-stone-beige/30">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="mb-8">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-stone-black mb-4 font-poppins">
                Payment Successful!
              </h1>
              <p className="text-lg text-stone-black/70 font-korean">
                Thank you for your order. Your personalized chibis are on their way!
              </p>
            </div>

            <div className="bg-stone-beige/20 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-korean-gold mr-3" />
                <h2 className="text-xl font-bold text-stone-black font-poppins">
                  What's Next?
                </h2>
              </div>
              <div className="space-y-3 text-stone-black/80 font-korean">
                <p>✨ You'll receive an order confirmation email shortly</p>
                <p>📦 Your items will be carefully packaged and shipped</p>
                <p>🚚 Tracking information will be sent once your order ships</p>
              </div>
            </div>

            {sessionId && (
              <div className="bg-stone-powder/10 rounded-lg p-4 mb-8">
                <p className="text-sm text-stone-black/60 font-korean">
                  Order Reference: <span className="font-mono text-korean-gold">{sessionId.slice(-12)}</span>
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="korean-button hover-glow inline-flex items-center justify-center"
              >
                Continue Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
