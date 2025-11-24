import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { orderId } = await req.json();

    // If no orderId provided, get the most recent order
    let order;
    if (orderId) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (error) throw new Error(`Order not found: ${error.message}`);
      order = data;
    } else {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw new Error(`No orders found: ${error.message}`);
      order = data;
    }

    console.log('Resending email for order:', order.id);

    // Get order items with their selected options
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);

    if (itemsError) {
      throw new Error(`Failed to fetch order items: ${itemsError.message}`);
    }

    console.log('Order items:', JSON.stringify(orderItems, null, 2));

    // Calculate shipping cost (3.50€ default)
    const shippingCost = 3.50;

    // Prepare email data
    const emailData = {
      to: 'stone.idol@yahoo.com',
      orderId: order.id,
      sessionId: order.stripe_session_id || 'MANUAL_RESEND',
      customerEmail: order.customer_email,
      customerName: order.customer_name,
      customerPhone: 'Non fourni',
      totalAmount: order.total_amount,
      currency: order.currency,
      items: orderItems.map(item => ({
        id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        selectedOptions: item.selected_options || {}
      })),
      shippingCost: shippingCost,
      shippingAddress: order.shipping_address,
      billingAddress: order.billing_address,
      orderStatus: order.status,
      userId: order.user_id || 'Invité',
    };

    console.log('Sending email with data:', JSON.stringify(emailData, null, 2));

    // Send email notification
    const { data: emailResponse, error: emailError } = await supabase.functions.invoke('send-order-notification', {
      body: emailData,
    });

    if (emailError) {
      console.error('Error sending email:', emailError);
      throw new Error(`Failed to send email: ${emailError.message}`);
    }

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: order.id,
        message: 'Email resent successfully',
        emailData 
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in resend-order-email:', error);
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
