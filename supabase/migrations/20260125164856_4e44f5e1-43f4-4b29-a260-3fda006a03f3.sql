-- Add explicit blocking policies for write operations on order_items
-- This provides defense-in-depth since all writes go through service role

-- Block all direct INSERT attempts from clients
CREATE POLICY "Service role only can insert order items"
ON public.order_items
FOR INSERT
WITH CHECK (false);

-- Block all direct UPDATE attempts from clients
CREATE POLICY "Service role only can update order items"
ON public.order_items
FOR UPDATE
USING (false)
WITH CHECK (false);

-- Block all direct DELETE attempts from clients
CREATE POLICY "Service role only can delete order items"
ON public.order_items
FOR DELETE
USING (false);