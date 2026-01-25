-- Fix orders table RLS policy to prevent guest order exposure
-- Only allow authenticated users to see their OWN orders where user_id matches
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (user_id IS NOT NULL AND auth.uid() = user_id);

-- Fix order_items table RLS policy to match
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;

CREATE POLICY "Users can view their own order items" 
ON public.order_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id IS NOT NULL 
    AND orders.user_id = auth.uid()
  )
);

-- Fix gift_cards table - remove public SELECT policy
-- All gift card access must go through edge functions with service role
DROP POLICY IF EXISTS "Anyone can view gift card by code" ON public.gift_cards;