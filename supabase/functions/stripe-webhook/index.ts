import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      throw new Error('No Stripe signature found');
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    let event: Stripe.Event;
    
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }

    console.log('Webhook event type:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('Processing checkout session:', session.id);
      
      // Extract order details from metadata
      const metadata = session.metadata || {};
      const itemsData = metadata.items ? JSON.parse(metadata.items) : [];
      const shippingCost = metadata.shippingCost ? parseFloat(metadata.shippingCost) : 0;
      
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          stripe_session_id: session.id,
          customer_email: session.customer_details?.email || session.customer_email,
          customer_name: session.customer_details?.name,
          total_amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || 'EUR',
          status: 'completed',
          shipping_address: session.shipping_details?.address,
          billing_address: session.customer_details?.address,
          user_id: metadata.userId || null,
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw orderError;
      }

      console.log('Order created:', order.id);

      // Create order items
      if (itemsData.length > 0) {
        const orderItems = itemsData.map((item: any) => ({
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
          throw itemsError;
        }

        console.log('Order items created with uploaded files data');

        // Create gift cards for any gift card items
        for (const item of itemsData) {
          if (item.id?.startsWith('gift-card') && item.selectedOptions?.giftCardCode) {
            console.log('Creating gift card:', item.selectedOptions.giftCardCode);
            const { error: giftCardError } = await supabase
              .from('gift_cards')
              .insert({
                code: item.selectedOptions.giftCardCode,
                value: 32.90, // Gift card value covers product (27€) + shipping (5.90€)
                recipient_name: item.selectedOptions.recipientName || null,
                order_id: order.id,
                is_redeemed: false,
              });

            if (giftCardError) {
              console.error('Error creating gift card:', giftCardError);
            } else {
              console.log('Gift card created successfully:', item.selectedOptions.giftCardCode);
            }
          }
        }
      }

      // Send email notification
      const emailData = {
        to: 'stone.idol@yahoo.com',
        orderId: order.id,
        sessionId: session.id,
        customerEmail: order.customer_email,
        customerName: order.customer_name,
        customerPhone: session.customer_details?.phone || session.shipping_details?.phone || 'Non fourni',
        totalAmount: order.total_amount,
        currency: order.currency,
        items: itemsData,
        shippingCost: shippingCost,
        shippingAddress: session.shipping_details?.address,
        billingAddress: session.customer_details?.address,
        orderStatus: order.status,
        userId: metadata.userId || 'Invité',
      };

      const { error: emailError } = await supabase.functions.invoke('send-order-notification', {
        body: emailData,
      });

      if (emailError) {
        console.error('Error sending email:', emailError);
      } else {
        console.log('Email notification sent successfully');
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
