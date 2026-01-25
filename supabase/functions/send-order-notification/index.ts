import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// HTML escape function to prevent XSS in email templates
const escapeHtml = (text: string | null | undefined): string => {
  if (text === null || text === undefined) return '';
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return String(text).replace(/[&<>"'\/]/g, (char) => map[char]);
};

// Validate URL to prevent javascript: or data: injection
const isValidImageUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

interface OrderNotificationRequest {
  to: string;
  orderId: string;
  sessionId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  totalAmount: number;
  currency: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    image?: string;
    selectedOptions?: any;
  }>;
  shippingCost: number;
  shippingAddress?: any;
  billingAddress?: any;
  orderStatus?: string;
  userId?: string;
}

const formatAddress = (address: any) => {
  if (!address) return 'Non fournie';
  
  return `
    ${escapeHtml(address.line1 || '')}<br>
    ${address.line2 ? escapeHtml(address.line2) + '<br>' : ''}
    ${escapeHtml(address.postal_code || '')} ${escapeHtml(address.city || '')}<br>
    ${escapeHtml(address.country || '')}
  `;
};

const formatOptionKey = (key: string) => {
  const translations: { [key: string]: string } = {
    'supportType': 'Type de support',
    'frameColor': 'Couleur du cadre',
    'tshirtSize': 'Taille du T-shirt',
    'characterCount': 'Nombre de personnages',
    'characterChoices': 'Personnages choisis',
    'uploadedFiles': 'Fichiers uploadés'
  };
  return translations[key] || escapeHtml(key);
};

const sanitizeSelectedOptions = (options: any): string => {
  if (!options || typeof options !== 'object') return '';
  
  return Object.entries(options)
    .filter(([key, value]) => key !== 'uploadedFiles' && value !== undefined && value !== null && value !== '')
    .map(([key, value]) => 
      `<div style="margin: 3px 0;"><strong>${formatOptionKey(key)}:</strong> ${escapeHtml(String(value))}</div>`
    ).join('');
};

const getEmailTemplate = (data: OrderNotificationRequest) => {
  const itemsHtml = data.items.map(item => {
    // Determine product type
    let productType = '';
    const itemNameLower = (item.name || '').toLowerCase();
    if (itemNameLower.includes('personnalisé')) {
      productType = '<div style="color: #D4AF37; font-weight: bold; font-size: 13px; margin-top: 4px;">🎨 Chibis personnalisés</div>';
    } else if (itemNameLower.includes('pré-imprimé') || itemNameLower.includes('preprinted')) {
      productType = '<div style="color: #D4AF37; font-weight: bold; font-size: 13px; margin-top: 4px;">✨ Chibis pré-dessinés</div>';
    }

    const optionsHtml = item.selectedOptions && Object.keys(item.selectedOptions).length > 0
      ? `<div style="font-size: 12px; color: #666; margin-top: 8px;">
          ${sanitizeSelectedOptions(item.selectedOptions)}
          ${item.selectedOptions.uploadedFiles ? `<div style="margin: 3px 0;"><strong>Fichiers uploadés:</strong> ${escapeHtml(String(item.selectedOptions.uploadedFiles.length))} fichier(s)</div>` : ''}
        </div>`
      : '';
    
    // Only render image if URL is valid
    const imageHtml = isValidImageUrl(item.image) 
      ? `<img src="${escapeHtml(item.image)}" alt="Product" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 10px; vertical-align: top; display: inline-block;">`
      : '';
    
    return `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          ${imageHtml}
          <div style="display: inline-block; vertical-align: top;">
            <strong>${escapeHtml(item.name)}</strong>
            ${productType}
            ${optionsHtml}
          </div>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${escapeHtml(String(item.quantity))}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${escapeHtml(item.price.toFixed(2))} ${escapeHtml(data.currency)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">${escapeHtml((item.price * item.quantity).toFixed(2))} ${escapeHtml(data.currency)}</td>
      </tr>
    `;
  }).join('');

  const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + data.shippingCost;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #D4AF37; padding-bottom: 20px;">
          <h1 style="color: #D4AF37; font-size: 32px; margin: 0;">Stone Idol</h1>
          <p style="color: #666; margin-top: 5px; font-size: 14px;">Nouvelle Commande Reçue</p>
        </div>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">📦 Détails de la Commande</h2>
          <table style="width: 100%; font-size: 14px;">
            <tr>
              <td style="padding: 5px 0; color: #666;">Numéro de commande:</td>
              <td style="padding: 5px 0; font-weight: bold; text-align: right;">#${escapeHtml(data.orderId.slice(-8).toUpperCase())}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #666;">Session Stripe:</td>
              <td style="padding: 5px 0; font-family: monospace; font-size: 12px; text-align: right;">${escapeHtml(data.sessionId)}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">👤 Informations Client</h2>
          <table style="width: 100%; font-size: 14px;">
            <tr>
              <td style="padding: 5px 0; color: #666;">Nom:</td>
              <td style="padding: 5px 0; font-weight: bold; text-align: right;">${escapeHtml(data.customerName || 'Non fourni')}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #666;">Email:</td>
              <td style="padding: 5px 0; text-align: right;">${escapeHtml(data.customerEmail)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #666;">Téléphone:</td>
              <td style="padding: 5px 0; text-align: right; font-weight: bold;">${escapeHtml(data.customerPhone || 'Non fourni')}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0; color: #666;">Type:</td>
              <td style="padding: 5px 0; text-align: right;">${data.userId && data.userId !== 'Invité' ? 'Compte client' : 'Invité'}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">📍 Adresse de Livraison</h2>
          <div style="color: #666; font-size: 14px; line-height: 1.6;">
            ${formatAddress(data.shippingAddress)}
          </div>
        </div>

        ${data.billingAddress && JSON.stringify(data.billingAddress) !== JSON.stringify(data.shippingAddress) ? `
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">💳 Adresse de Facturation</h2>
          <div style="color: #666; font-size: 14px; line-height: 1.6;">
            ${formatAddress(data.billingAddress)}
          </div>
        </div>
        ` : ''}

        <div style="margin-bottom: 25px;">
          <h2 style="color: #333; margin: 0 0 15px 0; font-size: 20px;">🛍️ Articles Commandés</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #D4AF37;">Produit</th>
                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #D4AF37;">Quantité</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #D4AF37;">Prix unitaire</th>
                <th style="padding: 12px; text-align: right; border-bottom: 2px solid #D4AF37;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
        </div>

        <div style="background-color: #D4AF37; color: white; padding: 20px; border-radius: 8px; margin-top: 25px;">
          <table style="width: 100%; font-size: 14px;">
            <tr>
              <td style="padding: 5px 0;">Sous-total:</td>
              <td style="padding: 5px 0; text-align: right;">${escapeHtml(subtotal.toFixed(2))} ${escapeHtml(data.currency)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 0;">Frais de livraison:</td>
              <td style="padding: 5px 0; text-align: right;">${escapeHtml(data.shippingCost.toFixed(2))} ${escapeHtml(data.currency)}</td>
            </tr>
            <tr style="border-top: 2px solid rgba(255,255,255,0.3);">
              <td style="padding: 10px 0 0 0; font-size: 18px; font-weight: bold;">TOTAL:</td>
              <td style="padding: 10px 0 0 0; text-align: right; font-size: 20px; font-weight: bold;">${escapeHtml(total.toFixed(2))} ${escapeHtml(data.currency)}</td>
            </tr>
          </table>
        </div>

        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        
        <p style="color: #888; font-size: 12px; text-align: center; margin: 0;">
          Stone Idol - Premium Korean Fashion<br>
          Cette notification a été générée automatiquement suite à un paiement Stripe.
        </p>
      </div>
    </div>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: OrderNotificationRequest = await req.json();

    console.log('Sending order notification email to:', data.to);

    const emailResponse = await resend.emails.send({
      from: "Stone Idol <commande@stoneidol.com>",
      to: [data.to],
      subject: `Nouvelle commande #${escapeHtml(data.orderId.slice(-8).toUpperCase())} - ${escapeHtml(data.totalAmount.toFixed(2))} ${escapeHtml(data.currency)}`,
      html: getEmailTemplate(data),
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
    console.error("Error sending order notification email:", error);
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
