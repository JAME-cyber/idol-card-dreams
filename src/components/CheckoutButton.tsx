
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  className?: string;
  children: React.ReactNode;
}

const CheckoutButton = ({ className, children }: CheckoutButtonProps) => {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get current user if authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      console.log("Starting checkout process with items:", items);

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items: items,
          customerEmail: user?.email || null,
        },
      });

      if (error) {
        console.error("Checkout error:", error);
        throw new Error(error.message || 'Failed to create checkout session');
      }

      if (!data?.url) {
        throw new Error('No checkout URL received');
      }

      console.log("Checkout session created, redirecting to:", data.url);

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      
      toast({
        title: "Redirecting to Payment",
        description: "Please complete your payment in the new tab.",
      });

    } catch (error) {
      console.error("Checkout failed:", error);
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading || items.length === 0}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default CheckoutButton;
