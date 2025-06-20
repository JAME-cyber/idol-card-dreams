
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  to: string;
  subject: string;
  confirmationUrl?: string;
  magicLinkUrl?: string;
  type: 'signup' | 'login' | 'recovery';
}

const getEmailTemplate = (type: string, confirmationUrl?: string, magicLinkUrl?: string) => {
  switch (type) {
    case 'signup':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D4AF37; font-size: 28px; margin: 0;">Stone Idol</h1>
            <p style="color: #666; margin-top: 5px;">Premium Korean Fashion</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Welcome to Stone Idol!</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">
            Thank you for joining Stone Idol! Please confirm your email address to complete your registration and start shopping our exclusive Korean fashion collection.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" 
               style="background-color: #D4AF37; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Confirm Your Email
            </a>
          </div>
          
          <p style="color: #888; font-size: 14px; margin-top: 30px;">
            If you didn't create this account, you can safely ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #888; font-size: 12px; text-align: center;">
            Stone Idol - Premium Korean Fashion<br>
            This email was sent because you signed up for an account.
          </p>
        </div>
      `;
      
    case 'login':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D4AF37; font-size: 28px; margin: 0;">Stone Idol</h1>
            <p style="color: #666; margin-top: 5px;">Premium Korean Fashion</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Sign in to your account</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">
            Click the link below to sign in to your Stone Idol account:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${magicLinkUrl}" 
               style="background-color: #D4AF37; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Sign In to Stone Idol
            </a>
          </div>
          
          <p style="color: #888; font-size: 14px; margin-top: 30px;">
            If you didn't request this login link, you can safely ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #888; font-size: 12px; text-align: center;">
            Stone Idol - Premium Korean Fashion
          </p>
        </div>
      `;
      
    case 'recovery':
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #D4AF37; font-size: 28px; margin: 0;">Stone Idol</h1>
            <p style="color: #666; margin-top: 5px;">Premium Korean Fashion</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Reset your password</h2>
          
          <p style="color: #555; line-height: 1.6; margin-bottom: 25px;">
            You requested to reset your password. Click the link below to create a new password:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" 
               style="background-color: #D4AF37; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #888; font-size: 14px; margin-top: 30px;">
            If you didn't request a password reset, you can safely ignore this email.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="color: #888; font-size: 12px; text-align: center;">
            Stone Idol - Premium Korean Fashion
          </p>
        </div>
      `;
      
    default:
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #D4AF37;">Stone Idol</h1>
          <p>You have received this email from Stone Idol.</p>
        </div>
      `;
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, confirmationUrl, magicLinkUrl, type }: AuthEmailRequest = await req.json();

    const html = getEmailTemplate(type, confirmationUrl, magicLinkUrl);

    const emailResponse = await resend.emails.send({
      from: "Stone Idol <noreply@your-domain.com>", // Replace with your verified domain
      to: [to],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
