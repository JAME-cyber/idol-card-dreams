
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const validateCheckoutRequest = (data: any) => {
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    throw new Error("Invalid items: must be a non-empty array");
  }

  for (const item of data.items) {
    if (!item.name || typeof item.name !== 'string') {
      throw new Error("Invalid item: name is required and must be a string");
    }
    if (!item.price || typeof item.price !== 'number' || item.price <= 0) {
      throw new Error("Invalid item: price must be a positive number");
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity <= 0) {
      throw new Error("Invalid item: quantity must be a positive number");
    }
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error("Authentication required");
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing: ensure SUPABASE_URL and SUPABASE_ANON_KEY are set as secrets');
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseKey,
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error("Authentication error:", authError);
      throw new Error("Invalid authentication");
    }

    console.log("Authenticated user:", user.id);

    const { items } = await req.json();

    // Validate input data
    validateCheckoutRequest({ items });

    // Determine site origin for URLs and absolute image paths
    const referer = req.headers.get("referer") || '';
    let origin = req.headers.get("origin") || '';
    if (!origin && referer) {
      try { origin = new URL(referer).origin; } catch (_) { /* ignore */ }
    }
    console.log("Resolved origin for checkout:", origin, "referer:", referer);

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Check if customer exists for authenticated user
    let customerId;
    if (user.email) {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
    }

    // Create line items for Stripe with proper sanitization and absolute image URLs
    const toAbsoluteUrl = (img?: string) => {
      if (!img) return undefined;
      const s = String(img);
      if (/^https?:\/\//i.test(s)) return s;
      if (!origin) return undefined;
      return s.startsWith('/') ? `${origin}${s}` : `${origin}/${s}`;
    };

    const lineItems = items.map((item: any) => {
      const absImg = toAbsoluteUrl(item.image);
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: String(item.name).substring(0, 100),
            images: absImg ? [absImg] : [],
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: Math.min(Math.max(1, Math.floor(Number(item.quantity))), 99),
      };
    });

    console.log("Creating checkout session with items:", lineItems);

    // Create checkout session with detailed order metadata
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ['FR', 'DE', 'IT', 'ES', 'NL', 'BE', 'US', 'CA', 'GB'],
      },
      billing_address_collection: 'required',
      metadata: { 
        user_id: user.id,
        order_details: JSON.stringify(items.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          selectedOptions: item.selectedOptions || {}
        })))
      },
    });

    console.log("Checkout session created:", session.id, "for user:", user.id);

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    
    // Return appropriate error status based on error type
    const status = error.message.includes("Authentication") || error.message.includes("Invalid authentication") ? 401 : 400;
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: status,
    });
  }
});
