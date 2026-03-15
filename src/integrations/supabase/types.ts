export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_description: string
          achievement_name: string
          created_at: string
          icon: string
          id: string
          unlocked: boolean | null
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_description: string
          achievement_name: string
          created_at?: string
          icon: string
          id?: string
          unlocked?: boolean | null
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_description?: string
          achievement_name?: string
          created_at?: string
          icon?: string
          id?: string
          unlocked?: boolean | null
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      food_logs: {
        Row: {
          brand: string | null
          calories: number
          carbs: number | null
          created_at: string
          fats: number | null
          food_name: string
          id: string
          logged_at: string
          meal_type: string
          protein: number | null
          user_id: string
        }
        Insert: {
          brand?: string | null
          calories: number
          carbs?: number | null
          created_at?: string
          fats?: number | null
          food_name: string
          id?: string
          logged_at?: string
          meal_type: string
          protein?: number | null
          user_id: string
        }
        Update: {
          brand?: string | null
          calories?: number
          carbs?: number | null
          created_at?: string
          fats?: number | null
          food_name?: string
          id?: string
          logged_at?: string
          meal_type?: string
          protein?: number | null
          user_id?: string
        }
        Relationships: []
      }
      foods: {
        Row: {
          brand: string | null
          calories: number
          carbs: number | null
          category: string
          created_at: string | null
          fats: number | null
          id: string
          name: string
          protein: number | null
          serving_size: string | null
        }
        Insert: {
          brand?: string | null
          calories: number
          carbs?: number | null
          category: string
          created_at?: string | null
          fats?: number | null
          id?: string
          name: string
          protein?: number | null
          serving_size?: string | null
        }
        Update: {
          brand?: string | null
          calories?: number
          carbs?: number | null
          category?: string
          created_at?: string | null
          fats?: number | null
          id?: string
          name?: string
          protein?: number | null
          serving_size?: string | null
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          calories: number
          created_at: string
          day_of_week: string
          id: string
          meal_name: string
          meal_type: string
          prep_time: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          calories: number
          created_at?: string
          day_of_week: string
          id?: string
          meal_name: string
          meal_type: string
          prep_time?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          calories?: number
          created_at?: string
          day_of_week?: string
          id?: string
          meal_name?: string
          meal_type?: string
          prep_time?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          allergies: string[] | null
          created_at: string
          dietary_preferences: string[] | null
          favorite_cuisines: string[] | null
          full_name: string | null
          goal: string | null
          height: number | null
          id: string
          updated_at: string
          weight: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          allergies?: string[] | null
          created_at?: string
          dietary_preferences?: string[] | null
          favorite_cuisines?: string[] | null
          full_name?: string | null
          goal?: string | null
          height?: number | null
          id: string
          updated_at?: string
          weight?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          allergies?: string[] | null
          created_at?: string
          dietary_preferences?: string[] | null
          favorite_cuisines?: string[] | null
          full_name?: string | null
          goal?: string | null
          height?: number | null
          id?: string
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      progress_data: {
        Row: {
          calories_consumed: number
          calories_target: number
          created_at: string
          date: string
          id: string
          protein_grams: number | null
          updated_at: string
          user_id: string
          water_glasses: number | null
          workout_completed: boolean | null
        }
        Insert: {
          calories_consumed?: number
          calories_target: number
          created_at?: string
          date: string
          id?: string
          protein_grams?: number | null
          updated_at?: string
          user_id: string
          water_glasses?: number | null
          workout_completed?: boolean | null
        }
        Update: {
          calories_consumed?: number
          calories_target?: number
          created_at?: string
          date?: string
          id?: string
          protein_grams?: number | null
          updated_at?: string
          user_id?: string
          water_glasses?: number | null
          workout_completed?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      foods_search: {
        Row: {
          brand: string | null
          calories: number | null
          carbs: number | null
          category: string | null
          fats: number | null
          id: string | null
          name: string | null
          protein: number | null
          search_vector: unknown
          serving_size: string | null
        }
        Insert: {
          brand?: string | null
          calories?: number | null
          carbs?: number | null
          category?: string | null
          fats?: number | null
          id?: string | null
          name?: string | null
          protein?: number | null
          search_vector?: never
          serving_size?: string | null
        }
        Update: {
          brand?: string | null
          calories?: number | null
          carbs?: number | null
          category?: string | null
          fats?: number | null
          id?: string | null
          name?: string | null
          protein?: number | null
          search_vector?: never
          serving_size?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
