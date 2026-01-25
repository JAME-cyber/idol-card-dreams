import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication - require user to be logged in
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ valid: false, error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Create client with user's auth context
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Verify the token
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims) {
      console.error('Invalid token:', claimsError);
      return new Response(
        JSON.stringify({ valid: false, error: 'Invalid authentication' }),
        { status: 401, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const userId = claimsData.claims.sub;
    console.log(`Gift card validation request from user: ${userId}`);

    // Parse and validate request body
    const { code, action } = await req.json();
    
    if (!code || typeof code !== 'string') {
      return new Response(
        JSON.stringify({ valid: false, error: 'Code manquant' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Sanitize and normalize code
    const normalizedCode = code.toUpperCase().trim().slice(0, 50); // Limit length
    
    // Validate code format (basic alphanumeric with dashes)
    if (!/^[A-Z0-9-]+$/.test(normalizedCode)) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Code invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log(`Validating gift card code: ${normalizedCode}, action: ${action}, user: ${userId}`);

    // Use service role for database operations
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Check if gift card exists and is not redeemed
    const { data: giftCard, error: fetchError } = await supabaseAdmin
      .from('gift_cards')
      .select('id, code, value, recipient_name, is_redeemed')
      .eq('code', normalizedCode)
      .single();

    if (fetchError || !giftCard) {
      console.log('Gift card not found:', normalizedCode);
      return new Response(
        JSON.stringify({ valid: false, error: 'Code invalide' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    if (giftCard.is_redeemed) {
      console.log('Gift card already redeemed:', normalizedCode);
      return new Response(
        JSON.stringify({ valid: false, error: 'Ce bon cadeau a déjà été utilisé' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // REMOVED: Direct redemption via this endpoint
    // Redemption should only happen through process-gift-card-order
    // This endpoint is now ONLY for validation
    if (action === 'redeem') {
      console.warn(`Attempted direct redemption via validate endpoint by user ${userId}`);
      return new Response(
        JSON.stringify({ valid: false, error: 'Direct redemption not allowed. Use checkout process.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ 
        valid: true, 
        value: giftCard.value,
        recipientName: giftCard.recipient_name,
        code: giftCard.code
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error('Error validating gift card:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ valid: false, error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
