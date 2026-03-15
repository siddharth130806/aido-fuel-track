import { z } from "zod";

// Authentication validation schemas
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
});

export const signupSchema = loginSchema.extend({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Full name is required" })
    .max(100, { message: "Full name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { 
      message: "Full name can only contain letters, spaces, hyphens, and apostrophes" 
    }),
});

// Food logging validation schema
export const foodLogSchema = z.object({
  food_name: z
    .string()
    .trim()
    .min(1, { message: "Food name is required" })
    .max(200, { message: "Food name must be less than 200 characters" }),
  calories: z
    .number()
    .int({ message: "Calories must be a whole number" })
    .min(0, { message: "Calories cannot be negative" })
    .max(10000, { message: "Calories seems unreasonably high" }),
  protein: z
    .number()
    .min(0, { message: "Protein cannot be negative" })
    .max(1000, { message: "Protein value seems unreasonably high" })
    .optional(),
  carbs: z
    .number()
    .min(0, { message: "Carbs cannot be negative" })
    .max(1000, { message: "Carbs value seems unreasonably high" })
    .optional(),
  fats: z
    .number()
    .min(0, { message: "Fats cannot be negative" })
    .max(1000, { message: "Fats value seems unreasonably high" })
    .optional(),
  meal_type: z.enum(["breakfast", "lunch", "dinner", "snacks"], {
    errorMap: () => ({ message: "Invalid meal type" }),
  }),
  brand: z
    .string()
    .trim()
    .max(100, { message: "Brand name must be less than 100 characters" })
    .optional(),
});

// Profile validation schema
export const profileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .max(100, { message: "Name must be less than 100 characters" })
    .optional()
    .or(z.literal("")),
  age: z
    .number()
    .int({ message: "Age must be a whole number" })
    .min(1, { message: "Age must be at least 1" })
    .max(150, { message: "Age must be less than 150" })
    .optional()
    .nullable(),
  height: z
    .number()
    .int({ message: "Height must be a whole number" })
    .min(30, { message: "Height must be at least 30 cm" })
    .max(300, { message: "Height must be less than 300 cm" })
    .optional()
    .nullable(),
  weight: z
    .number()
    .min(1, { message: "Weight must be at least 1 kg" })
    .max(500, { message: "Weight must be less than 500 kg" })
    .optional()
    .nullable(),
  goal: z
    .string()
    .trim()
    .max(100, { message: "Goal must be less than 100 characters" })
    .optional()
    .or(z.literal("")),
  activity_level: z
    .string()
    .trim()
    .max(50, { message: "Activity level must be less than 50 characters" })
    .optional()
    .or(z.literal("")),
});

export const preferencesSchema = z.object({
  dietary_preferences: z.array(z.string().max(50)).max(20).optional(),
  allergies: z.array(z.string().max(50)).max(20).optional(),
  favorite_cuisines: z.array(z.string().max(50)).max(20).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type FoodLogInput = z.infer<typeof foodLogSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type PreferencesInput = z.infer<typeof preferencesSchema>;
