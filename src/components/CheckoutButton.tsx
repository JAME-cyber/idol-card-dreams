
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';

interface CheckoutButtonProps {
  className?: string;
  children: React.ReactNode;
  shippingCost?: number;
}

const CheckoutButton = ({ className, children, shippingCost = 0 }: CheckoutButtonProps) => {
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
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to proceed with checkout.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      console.log("Starting checkout process with items:", items);
      console.log("Shipping cost:", shippingCost);

      // Add shipping as a line item if there's a cost
      const checkoutItems = [...items];
      if (shippingCost > 0) {
        checkoutItems.push({
          id: 'shipping',
          name: 'Shipping',
          price: shippingCost,
          quantity: 1,
          image: ''
        });
      }

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items: checkoutItems,
        },
      });

      if (error) {
        console.error("Checkout error:", error);
        
        // Handle authentication errors specifically
        if (error.message?.includes("Authentication") || error.message?.includes("Invalid authentication")) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to proceed with checkout.",
            variant: "destructive",
          });
          return;
        }
        
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
