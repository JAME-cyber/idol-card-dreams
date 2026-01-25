-- Fix mutable search_path on update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Add UPDATE policy for reviews - users can only update their own reviews (by matching user_name)
-- Note: Since reviews don't have user_id, we restrict updates to authenticated users only
CREATE POLICY "Authenticated users cannot update reviews"
ON public.reviews
FOR UPDATE
USING (false);

-- Add DELETE policy for reviews - prevent all deletes (admin-only via service role)
CREATE POLICY "Reviews cannot be deleted by users"
ON public.reviews
FOR DELETE
USING (false);