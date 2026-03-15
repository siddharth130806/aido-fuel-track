-- Prevent clients from self-granting or manipulating achievements.
-- Achievement rows should be created/updated only by trusted backend logic.
DROP POLICY IF EXISTS "Users can insert their own achievements" ON public.achievements;
DROP POLICY IF EXISTS "Users can update their own achievements" ON public.achievements;