
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AuthEvent {
  type: string;
  table: string;
  record: any;
  schema: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authEvent: AuthEvent = await req.json();
    console.log('Auth event received:', authEvent);

    // Handle user signup confirmation emails
    if (authEvent.type === 'INSERT' && authEvent.table === 'users') {
      const user = authEvent.record;
      
      if (!user.email_confirmed_at) {
        // Generate confirmation URL
        const confirmationUrl = `${supabaseUrl}/auth/v1/verify?token=${user.confirmation_token}&type=signup&redirect_to=${Deno.env.get('SITE_URL') || 'http://localhost:3000'}`;

        // Send confirmation email using our Resend function
        const emailResponse = await supabase.functions.invoke('send-auth-email', {
          body: {
            to: user.email,
            subject: 'Welcome to Stone Idol - Confirm Your Email',
            confirmationUrl,
            type: 'signup'
          }
        });

        console.log('Confirmation email sent:', emailResponse);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error: any) {
    console.error('Error in auth webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
