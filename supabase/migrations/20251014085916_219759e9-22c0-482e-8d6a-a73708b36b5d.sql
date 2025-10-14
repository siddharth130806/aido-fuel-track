-- Create foods catalog table
CREATE TABLE public.foods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  calories integer NOT NULL,
  protein numeric DEFAULT 0,
  carbs numeric DEFAULT 0,
  fats numeric DEFAULT 0,
  category text NOT NULL,
  brand text,
  serving_size text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read foods (it's a catalog)
CREATE POLICY "Anyone can view foods catalog"
ON public.foods
FOR SELECT
USING (true);

-- Only authenticated users can suggest new foods
CREATE POLICY "Authenticated users can insert foods"
ON public.foods
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create index for faster searches
CREATE INDEX idx_foods_name ON public.foods USING gin(to_tsvector('english', name));
CREATE INDEX idx_foods_category ON public.foods(category);

-- Insert comprehensive food catalog
INSERT INTO public.foods (name, calories, protein, carbs, fats, category, brand, serving_size) VALUES
-- Fruits
('Apple', 95, 0.5, 25, 0.3, 'Fruits', NULL, '1 medium'),
('Banana', 105, 1.3, 27, 0.4, 'Fruits', NULL, '1 medium'),
('Orange', 62, 1.2, 15, 0.2, 'Fruits', NULL, '1 medium'),
('Strawberries', 49, 1, 12, 0.5, 'Fruits', NULL, '1 cup'),
('Blueberries', 84, 1.1, 21, 0.5, 'Fruits', NULL, '1 cup'),
('Grapes', 104, 1.1, 27, 0.2, 'Fruits', NULL, '1 cup'),
('Watermelon', 46, 0.9, 11, 0.2, 'Fruits', NULL, '1 cup'),
('Mango', 99, 1.4, 25, 0.6, 'Fruits', NULL, '1 cup'),
('Pineapple', 82, 0.9, 22, 0.2, 'Fruits', NULL, '1 cup'),
('Peach', 59, 1.4, 14, 0.4, 'Fruits', NULL, '1 medium'),
('Pear', 101, 0.6, 27, 0.2, 'Fruits', NULL, '1 medium'),
('Kiwi', 42, 0.8, 10, 0.4, 'Fruits', NULL, '1 fruit'),
('Avocado', 234, 2.9, 12, 21, 'Fruits', NULL, '1 medium'),
('Grapefruit', 52, 0.9, 13, 0.2, 'Fruits', NULL, '1/2 fruit'),
('Cantaloupe', 60, 1.5, 14, 0.3, 'Fruits', NULL, '1 cup'),

-- Vegetables
('Broccoli', 31, 2.6, 6, 0.3, 'Vegetables', NULL, '1 cup'),
('Spinach', 7, 0.9, 1, 0.1, 'Vegetables', NULL, '1 cup raw'),
('Carrots', 52, 1.2, 12, 0.3, 'Vegetables', NULL, '1 cup'),
('Bell Pepper', 30, 1, 7, 0.2, 'Vegetables', NULL, '1 cup'),
('Tomato', 22, 1.1, 5, 0.2, 'Vegetables', NULL, '1 medium'),
('Cucumber', 16, 0.7, 4, 0.1, 'Vegetables', NULL, '1 cup'),
('Lettuce', 5, 0.5, 1, 0.1, 'Vegetables', NULL, '1 cup'),
('Cauliflower', 25, 2, 5, 0.3, 'Vegetables', NULL, '1 cup'),
('Zucchini', 20, 1.5, 4, 0.4, 'Vegetables', NULL, '1 cup'),
('Asparagus', 27, 3, 5, 0.2, 'Vegetables', NULL, '1 cup'),
('Green Beans', 31, 1.8, 7, 0.1, 'Vegetables', NULL, '1 cup'),
('Kale', 33, 2.9, 6, 0.6, 'Vegetables', NULL, '1 cup'),
('Sweet Potato', 112, 2, 26, 0.1, 'Vegetables', NULL, '1 medium'),
('Mushrooms', 15, 2.2, 2, 0.2, 'Vegetables', NULL, '1 cup'),
('Onion', 44, 1.2, 10, 0.1, 'Vegetables', NULL, '1 medium'),

-- Protein Sources
('Chicken Breast', 165, 31, 0, 3.6, 'Protein', NULL, '100g'),
('Turkey Breast', 135, 30, 0, 0.7, 'Protein', NULL, '100g'),
('Salmon', 206, 22, 0, 13, 'Protein', NULL, '100g'),
('Tuna', 132, 28, 0, 1.3, 'Protein', NULL, '100g'),
('Tilapia', 128, 26, 0, 2.7, 'Protein', NULL, '100g'),
('Ground Beef 90/10', 176, 20, 0, 10, 'Protein', NULL, '100g'),
('Pork Chop', 231, 23, 0, 15, 'Protein', NULL, '100g'),
('Eggs', 155, 13, 1.1, 11, 'Protein', NULL, '2 large'),
('Egg Whites', 52, 11, 0.7, 0.2, 'Protein', NULL, '4 large'),
('Shrimp', 99, 24, 0.2, 0.3, 'Protein', NULL, '100g'),
('Cod', 105, 23, 0, 0.9, 'Protein', NULL, '100g'),
('Tofu', 144, 17, 3, 9, 'Protein', NULL, '100g'),
('Tempeh', 193, 20, 9, 11, 'Protein', NULL, '100g'),
('Lean Ground Turkey', 170, 21, 0, 9, 'Protein', NULL, '100g'),
('Steak (Sirloin)', 271, 25, 0, 19, 'Protein', NULL, '100g'),

-- Dairy
('Greek Yogurt', 100, 17, 6, 0.7, 'Dairy', 'Chobani', '170g'),
('Milk (2%)', 122, 8, 12, 5, 'Dairy', NULL, '1 cup'),
('Almond Milk', 30, 1, 1, 2.5, 'Dairy', NULL, '1 cup'),
('Cottage Cheese', 163, 28, 6, 2.3, 'Dairy', NULL, '1 cup'),
('Cheddar Cheese', 113, 7, 0.4, 9, 'Dairy', NULL, '1 oz'),
('Mozzarella', 85, 6, 1, 6, 'Dairy', NULL, '1 oz'),
('Yogurt', 149, 8.5, 17, 8, 'Dairy', NULL, '1 cup'),
('Cream Cheese', 99, 2, 1.6, 10, 'Dairy', NULL, '2 tbsp'),
('Butter', 102, 0.1, 0, 12, 'Dairy', NULL, '1 tbsp'),
('Heavy Cream', 51, 0.4, 0.4, 5.5, 'Dairy', NULL, '1 tbsp'),

-- Grains & Carbs
('Brown Rice', 216, 5, 45, 1.8, 'Grains', NULL, '1 cup cooked'),
('White Rice', 205, 4.2, 45, 0.4, 'Grains', NULL, '1 cup cooked'),
('Quinoa', 222, 8, 39, 3.6, 'Grains', NULL, '1 cup cooked'),
('Oatmeal', 150, 5, 27, 3, 'Grains', 'Quaker', '1 cup cooked'),
('Whole Wheat Bread', 81, 4, 14, 1.1, 'Grains', NULL, '1 slice'),
('White Bread', 79, 2.3, 15, 1, 'Grains', NULL, '1 slice'),
('Pasta', 220, 8, 43, 1.3, 'Grains', NULL, '1 cup cooked'),
('Whole Wheat Pasta', 174, 7.5, 37, 0.8, 'Grains', NULL, '1 cup cooked'),
('Bagel', 289, 11, 56, 2, 'Grains', NULL, '1 bagel'),
('English Muffin', 134, 4.4, 26, 1, 'Grains', NULL, '1 muffin'),
('Tortilla', 150, 4, 24, 4, 'Grains', NULL, '1 large'),
('Pita Bread', 165, 5.5, 33, 0.7, 'Grains', NULL, '1 pita'),
('Couscous', 176, 6, 36, 0.3, 'Grains', NULL, '1 cup cooked'),
('Barley', 193, 3.6, 44, 0.7, 'Grains', NULL, '1 cup cooked'),

-- Legumes
('Black Beans', 227, 15, 41, 0.9, 'Legumes', NULL, '1 cup cooked'),
('Chickpeas', 269, 14.5, 45, 4.3, 'Legumes', NULL, '1 cup cooked'),
('Lentils', 230, 18, 40, 0.8, 'Legumes', NULL, '1 cup cooked'),
('Kidney Beans', 225, 15, 40, 0.9, 'Legumes', NULL, '1 cup cooked'),
('Pinto Beans', 245, 15, 45, 1.1, 'Legumes', NULL, '1 cup cooked'),
('Navy Beans', 255, 15, 47, 1.1, 'Legumes', NULL, '1 cup cooked'),
('Edamame', 189, 17, 15, 8, 'Legumes', NULL, '1 cup'),
('Lima Beans', 216, 15, 39, 0.7, 'Legumes', NULL, '1 cup cooked'),

-- Nuts & Seeds
('Almonds', 164, 6, 6, 14, 'Nuts & Seeds', NULL, '1 oz'),
('Walnuts', 185, 4.3, 3.9, 18.5, 'Nuts & Seeds', NULL, '1 oz'),
('Cashews', 157, 5.2, 8.6, 12.4, 'Nuts & Seeds', NULL, '1 oz'),
('Peanuts', 161, 7.3, 4.6, 14, 'Nuts & Seeds', NULL, '1 oz'),
('Pecans', 196, 2.6, 3.9, 20.4, 'Nuts & Seeds', NULL, '1 oz'),
('Peanut Butter', 188, 8, 7, 16, 'Nuts & Seeds', NULL, '2 tbsp'),
('Almond Butter', 196, 6.7, 6, 18, 'Nuts & Seeds', NULL, '2 tbsp'),
('Chia Seeds', 138, 4.7, 12, 8.7, 'Nuts & Seeds', NULL, '1 oz'),
('Flax Seeds', 150, 5.1, 8.1, 12, 'Nuts & Seeds', NULL, '1 oz'),
('Sunflower Seeds', 165, 5.8, 6.8, 14, 'Nuts & Seeds', NULL, '1 oz'),
('Pumpkin Seeds', 151, 7, 5, 13, 'Nuts & Seeds', NULL, '1 oz'),
('Pistachios', 159, 5.7, 7.7, 12.9, 'Nuts & Seeds', NULL, '1 oz'),

-- Snacks
('Protein Bar', 200, 20, 22, 7, 'Snacks', 'Quest', '1 bar'),
('Granola Bar', 120, 2, 19, 4.5, 'Snacks', NULL, '1 bar'),
('Protein Shake', 160, 30, 4, 3, 'Snacks', 'Premier Protein', '11 fl oz'),
('Popcorn', 31, 1, 6, 0.4, 'Snacks', NULL, '1 cup popped'),
('Dark Chocolate', 155, 1.4, 13, 12, 'Snacks', NULL, '1 oz'),
('Rice Cakes', 35, 0.7, 7, 0.3, 'Snacks', NULL, '1 cake'),
('Hummus', 166, 7.9, 14.3, 9.6, 'Snacks', NULL, '1/4 cup'),
('Trail Mix', 173, 5.2, 16.6, 11.2, 'Snacks', NULL, '1 oz'),
('Beef Jerky', 116, 9.4, 3.1, 7.3, 'Snacks', NULL, '1 oz'),
('String Cheese', 80, 6, 1, 6, 'Snacks', NULL, '1 stick'),

-- Fast Food (Common Items)
('Big Mac', 563, 26, 46, 33, 'Fast Food', 'McDonalds', '1 burger'),
('Whopper', 657, 28, 49, 40, 'Fast Food', 'Burger King', '1 burger'),
('Chicken McNuggets', 170, 9, 10, 10, 'Fast Food', 'McDonalds', '4 pieces'),
('French Fries', 365, 4, 48, 17, 'Fast Food', 'McDonalds', 'Medium'),
('Pizza Slice', 285, 12, 36, 10, 'Fast Food', NULL, '1 slice'),
('Cheese Pizza', 272, 12.2, 33.8, 9.8, 'Fast Food', NULL, '1 slice'),
('Pepperoni Pizza', 298, 13, 34, 13, 'Fast Food', NULL, '1 slice'),
('Subway 6 inch Turkey', 280, 18, 46, 3.5, 'Fast Food', 'Subway', '6 inch'),
('Chick-fil-A Sandwich', 440, 28, 40, 19, 'Fast Food', 'Chick-fil-A', '1 sandwich'),
('Taco', 170, 8, 13, 10, 'Fast Food', 'Taco Bell', '1 taco'),

-- Beverages
('Coffee Black', 2, 0.3, 0, 0, 'Beverages', NULL, '8 oz'),
('Latte', 190, 13, 18, 7, 'Beverages', 'Starbucks', '16 oz'),
('Green Tea', 0, 0, 0, 0, 'Beverages', NULL, '8 oz'),
('Orange Juice', 112, 1.7, 26, 0.5, 'Beverages', NULL, '8 oz'),
('Apple Juice', 114, 0.2, 28, 0.3, 'Beverages', NULL, '8 oz'),
('Soda', 140, 0, 39, 0, 'Beverages', 'Coca-Cola', '12 oz'),
('Diet Soda', 0, 0, 0, 0, 'Beverages', NULL, '12 oz'),
('Coconut Water', 46, 1.7, 9, 0.5, 'Beverages', NULL, '8 oz'),
('Sports Drink', 80, 0, 21, 0, 'Beverages', 'Gatorade', '12 oz'),
('Smoothie', 220, 4, 50, 2, 'Beverages', NULL, '16 oz'),

-- Condiments & Oils
('Olive Oil', 119, 0, 0, 13.5, 'Oils & Condiments', NULL, '1 tbsp'),
('Coconut Oil', 121, 0, 0, 13.5, 'Oils & Condiments', NULL, '1 tbsp'),
('Ketchup', 15, 0.2, 4, 0, 'Oils & Condiments', NULL, '1 tbsp'),
('Mustard', 3, 0.2, 0.3, 0.2, 'Oils & Condiments', NULL, '1 tsp'),
('Mayonnaise', 94, 0.1, 0.1, 10.3, 'Oils & Condiments', NULL, '1 tbsp'),
('Ranch Dressing', 73, 0.4, 1.4, 7.7, 'Oils & Condiments', NULL, '1 tbsp'),
('Balsamic Vinegar', 14, 0, 2.7, 0, 'Oils & Condiments', NULL, '1 tbsp'),
('Soy Sauce', 8, 0.8, 0.8, 0, 'Oils & Condiments', NULL, '1 tbsp'),
('Hot Sauce', 1, 0, 0.1, 0, 'Oils & Condiments', NULL, '1 tsp'),
('Honey', 64, 0.1, 17, 0, 'Oils & Condiments', NULL, '1 tbsp');

-- Create a view for easy food searching
CREATE OR REPLACE VIEW foods_search AS
SELECT 
  id,
  name,
  calories,
  protein,
  carbs,
  fats,
  category,
  brand,
  serving_size,
  to_tsvector('english', name || ' ' || COALESCE(brand, '') || ' ' || category) as search_vector
FROM public.foods;