-- Fix overly permissive RLS policy on reviews table
-- Drop the permissive INSERT policy that allows anyone to insert
DROP POLICY IF EXISTS "Anyone can insert reviews" ON public.reviews;

-- Create a more restrictive INSERT policy that requires authentication
-- Authenticated users can insert reviews (prevents anonymous spam)
CREATE POLICY "Authenticated users can insert reviews"
ON public.reviews
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);