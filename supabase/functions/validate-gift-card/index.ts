import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, action } = await req.json();
    
    if (!code) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Code manquant' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const normalizedCode = code.toUpperCase().trim();
    console.log(`Validating gift card code: ${normalizedCode}, action: ${action}`);

    // Check if gift card exists and is not redeemed
    const { data: giftCard, error: fetchError } = await supabase
      .from('gift_cards')
      .select('*')
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

    // If action is 'redeem', mark the gift card as used
    if (action === 'redeem') {
      const { error: updateError } = await supabase
        .from('gift_cards')
        .update({
          is_redeemed: true,
          redeemed_at: new Date().toISOString(),
        })
        .eq('id', giftCard.id);

      if (updateError) {
        console.error('Error redeeming gift card:', updateError);
        return new Response(
          JSON.stringify({ valid: false, error: 'Erreur lors de l\'utilisation du bon' }),
          { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }

      console.log('Gift card redeemed successfully:', normalizedCode);
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
  } catch (error: any) {
    console.error('Error validating gift card:', error);
    return new Response(
      JSON.stringify({ valid: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

serve(handler);
