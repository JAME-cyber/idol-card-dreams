-- Create table for gift cards
CREATE TABLE public.gift_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  value NUMERIC NOT NULL DEFAULT 27,
  recipient_name TEXT,
  is_redeemed BOOLEAN NOT NULL DEFAULT false,
  redeemed_at TIMESTAMP WITH TIME ZONE,
  redeemed_by_order_id UUID REFERENCES public.orders(id),
  order_id UUID REFERENCES public.orders(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gift_cards ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to check if a gift card code is valid (for redemption)
CREATE POLICY "Anyone can view gift card by code"
ON public.gift_cards
FOR SELECT
USING (true);

-- Policy to allow service role to insert/update (via edge functions)
-- No direct insert/update from client allowed