-- Recreate foods_search view to run with caller permissions and respect underlying RLS
DROP VIEW IF EXISTS public.foods_search;

CREATE VIEW public.foods_search
WITH (security_invoker = true)
AS
SELECT
  f.id,
  f.calories,
  f.protein,
  f.carbs,
  f.fats,
  to_tsvector('english'::regconfig, (((f.name || ' '::text) || COALESCE(f.brand, ''::text)) || ' '::text) || f.category) AS search_vector,
  f.category,
  f.brand,
  f.name,
  f.serving_size
FROM public.foods f;