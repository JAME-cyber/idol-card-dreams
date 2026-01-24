
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';

interface CheckoutButtonProps {
  className?: string;
  children: React.ReactNode;
  shippingCost?: number;
  giftCardCode?: string;
  isFreeOrder?: boolean;
}

const CheckoutButton = ({ className, children, shippingCost = 0, giftCardCode, isFreeOrder = false }: CheckoutButtonProps) => {
  const { items, clearCart, removeGiftCard } = useCart();
  const { user, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFreeCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    if (!user || !session) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to continue with checkout.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!giftCardCode) {
      toast({
        title: "Error",
        description: "Gift card code is missing.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Processing free order with gift card:", giftCardCode);

      // Validate and redeem the gift card
      const { data: redeemData, error: redeemError } = await supabase.functions.invoke('validate-gift-card', {
        body: { code: giftCardCode, action: 'redeem' },
      });

      if (redeemError || !redeemData?.valid) {
        throw new Error(redeemData?.error || redeemError?.message || 'Failed to redeem gift card');
      }

      // Create order directly in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_email: user.email,
          customer_name: user.user_metadata?.full_name || user.email,
          total_amount: 0,
          currency: 'EUR',
          status: 'completed',
          user_id: user.id,
          stripe_session_id: `gift-card-${giftCardCode}-${Date.now()}`,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error('Failed to create order');
      }

      console.log('Free order created:', order.id);

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        selected_options: item.selectedOptions || {},
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
      }

      // Update gift card with redeemed_by_order_id
      await supabase
        .from('gift_cards')
        .update({ redeemed_by_order_id: order.id })
        .eq('code', giftCardCode);

      // Send email notification
      await supabase.functions.invoke('send-order-notification', {
        body: {
          to: 'stone.idol@yahoo.com',
          orderId: order.id,
          customerEmail: user.email,
          customerName: user.user_metadata?.full_name || user.email,
          totalAmount: 0,
          currency: 'EUR',
          items: items.map(item => ({
            ...item,
            selectedOptions: item.selectedOptions,
          })),
          shippingCost: shippingCost,
          orderStatus: 'completed',
          userId: user.id,
          giftCardCode: giftCardCode,
        },
      });

      clearCart();
      removeGiftCard();
      
      toast({
        title: "Order Confirmed!",
        description: "Your free order has been placed successfully.",
      });

      navigate(`/checkout/success?session_id=${order.id}`);

    } catch (error) {
      console.error("Free checkout failed:", error);
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    // Check if user is authenticated
    if (!user || !session) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to continue with checkout.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsLoading(true);

    try {
      console.log("Starting checkout process with items:", items);
      console.log("Shipping cost:", shippingCost);

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          items,
          shippingCost,
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
          navigate('/auth');
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

  // Show sign-in prompt for unauthenticated users
  if (!user) {
    return (
      <button
        onClick={() => navigate('/auth')}
        className={className}
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In to Checkout
      </button>
    );
  }

  return (
    <button
      onClick={isFreeOrder ? handleFreeCheckout : handleCheckout}
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
