import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedOptions?: Record<string, unknown>;
}

interface RequestBody {
  giftCardCode: string;
  items: CartItem[];
  shippingCost: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Create client with user's auth context
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify the token and get user
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error('Invalid token:', claimsError);
      return new Response(
        JSON.stringify({ error: 'Invalid authentication' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const userId = claimsData.claims.sub as string;
    const userEmail = claimsData.claims.email as string;

    // Get full user details
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser();
    if (userError || !user) {
      console.error('Could not get user:', userError);
      return new Response(
        JSON.stringify({ error: 'Could not verify user' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Parse request body
    const { giftCardCode, items, shippingCost }: RequestBody = await req.json();

    // Validate input
    if (!giftCardCode || typeof giftCardCode !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Gift card code is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Cart items are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Create service client for database operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const normalizedCode = giftCardCode.toUpperCase().trim();
    console.log(`Processing gift card order for user ${userId}, code: ${normalizedCode}`);

    // Check if gift card exists and is not redeemed (atomic check)
    const { data: giftCard, error: fetchError } = await supabaseAdmin
      .from('gift_cards')
      .select('*')
      .eq('code', normalizedCode)
      .single();

    if (fetchError || !giftCard) {
      console.log('Gift card not found:', normalizedCode);
      return new Response(
        JSON.stringify({ error: 'Invalid gift card code' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (giftCard.is_redeemed) {
      console.log('Gift card already redeemed:', normalizedCode);
      return new Response(
        JSON.stringify({ error: 'This gift card has already been used' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Calculate order total
    const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalWithShipping = itemsTotal + (shippingCost || 0);

    // Verify gift card value covers the order
    if (giftCard.value < totalWithShipping) {
      return new Response(
        JSON.stringify({ 
          error: `Gift card value (${giftCard.value}€) is less than order total (${totalWithShipping}€)` 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Create order (using service role to bypass RLS)
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_email: userEmail,
        customer_name: user.user_metadata?.full_name || userEmail,
        total_amount: 0, // Free order with gift card
        currency: 'EUR',
        status: 'completed',
        user_id: userId,
        stripe_session_id: `gift-card-${normalizedCode}-${Date.now()}`,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log('Order created:', order.id);

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

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Don't fail the whole order, just log it
    }

    // Mark gift card as redeemed atomically
    const { error: updateError } = await supabaseAdmin
      .from('gift_cards')
      .update({
        is_redeemed: true,
        redeemed_at: new Date().toISOString(),
        redeemed_by_order_id: order.id,
      })
      .eq('id', giftCard.id)
      .eq('is_redeemed', false); // Ensure it hasn't been redeemed by another request

    if (updateError) {
      console.error('Error redeeming gift card:', updateError);
      // The order was already created, so we should still return success
      // but log this for manual review
    }

    // Send email notification
    try {
      await supabaseAdmin.functions.invoke('send-order-notification', {
        body: {
          to: 'stone.idol@yahoo.com',
          orderId: order.id,
          customerEmail: userEmail,
          customerName: user.user_metadata?.full_name || userEmail,
          totalAmount: 0,
          currency: 'EUR',
          items: items.map(item => ({
            ...item,
            selectedOptions: item.selectedOptions,
          })),
          shippingCost: shippingCost,
          orderStatus: 'completed',
          userId: userId,
          giftCardCode: normalizedCode,
        },
      });
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the order for email issues
    }

    console.log('Gift card order completed successfully:', order.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: order.id,
        message: 'Order completed successfully'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );

  } catch (error: unknown) {
    console.error('Error processing gift card order:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
