import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Camera, QrCode, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTodayFoodLogs } from "@/hooks/useTodayFoodLogs";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { foodLogSchema } from "@/lib/validations";

export default function FoodLog() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [isAdding, setIsAdding] = useState(false);

  // Set meal type from navigation state
  useEffect(() => {
    if (location.state?.mealType) {
      setSelectedMeal(location.state.mealType.toLowerCase());
    }
  }, [location.state]);

  const meals = ["breakfast", "lunch", "dinner", "snacks"];

  // Fetch foods from database
  const { data: allFoods = [] } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Fetch recent foods for this user
  const { data: recentFoodLogs = [] } = useQuery({
    queryKey: ["recent-foods", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("food_logs")
        .select("food_name, calories, brand")
        .eq("user_id", user.id)
        .order("logged_at", { ascending: false })
        .limit(4);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const filteredFoods = searchQuery
    ? allFoods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const popularFoods = allFoods.filter((f) => 
    ["Apple", "Banana", "Chicken Breast", "Brown Rice", "Eggs", "Greek Yogurt"].includes(f.name)
  );

  const addFoodLog = async (foodName: string, calories: number, brand?: string) => {
    if (!user) {
      toast.error("Please sign in to log food");
      return;
    }

    // Validate food log data
    const validationResult = foodLogSchema.safeParse({
      food_name: foodName,
      calories,
      brand,
      meal_type: selectedMeal,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    setIsAdding(true);
    try {
      const { error } = await supabase.from("food_logs").insert({
        user_id: user.id,
        food_name: validationResult.data.food_name,
        calories: validationResult.data.calories,
        brand: validationResult.data.brand || null,
        meal_type: validationResult.data.meal_type,
        logged_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Update progress data
      const today = new Date().toISOString().split("T")[0];
      const { data: existingProgress } = await supabase
        .from("progress_data")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      if (existingProgress) {
        await supabase
          .from("progress_data")
          .update({
            calories_consumed: existingProgress.calories_consumed + calories,
          })
          .eq("id", existingProgress.id);
      } else {
        await supabase.from("progress_data").insert({
          user_id: user.id,
          date: today,
          calories_consumed: calories,
          calories_target: 2200,
        });
      }

      toast.success(`Added ${foodName} to ${selectedMeal}!`);
      queryClient.invalidateQueries({ queryKey: ["today-food-logs"] });
      queryClient.invalidateQueries({ queryKey: ["today-progress"] });
    } catch (error: any) {
      toast.error(error.message || "Failed to add food");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Log Your Food 🍽️</h1>
        <p className="text-muted-foreground">Track what you eat to reach your goals</p>
      </div>

      {/* Meal Selection */}
      <DashboardCard title="Select Meal">
        <div className="flex space-x-2">
          {meals.map((meal) => (
            <Button
              key={meal}
              variant={selectedMeal === meal ? "default" : "outline"}
              onClick={() => setSelectedMeal(meal)}
              className="flex-1 capitalize"
            >
              {meal}
            </Button>
          ))}
        </div>
      </DashboardCard>

      {/* Quick Actions */}
      <DashboardCard title="Quick Add">
        <div className="grid grid-cols-1 gap-3">
          <Button 
            className="h-16 bg-gradient-primary hover:shadow-glow flex items-center justify-start px-6"
            size="lg"
          >
            <Camera className="w-6 h-6 mr-4" />
            <div className="text-left">
              <div className="font-semibold">Take Photo</div>
              <div className="text-sm opacity-90">AI will identify your food</div>
            </div>
          </Button>
          
          <Button 
            variant="outline"
            className="h-16 flex items-center justify-start px-6 hover:bg-accent-light"
            size="lg"
          >
            <QrCode className="w-6 h-6 mr-4 text-accent" />
            <div className="text-left">
              <div className="font-semibold">Scan Barcode</div>
              <div className="text-sm text-muted-foreground">For packaged foods</div>
            </div>
          </Button>
        </div>
      </DashboardCard>

      {/* Search */}
      <DashboardCard title="Search Foods">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search for foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12"
          />
        </div>

        {searchQuery ? (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground mb-3">Search Results</h4>
            {filteredFoods.map((food, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{food.name}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">{food.calories} cal</p>
                    <Badge variant="secondary" className="text-xs">{food.category}</Badge>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => addFoodLog(food.name, food.calories)}
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Add"}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Recent Foods */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h4 className="font-medium text-foreground">Recently Added</h4>
              </div>
              <div className="space-y-2">
                {recentFoodLogs.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">{food.food_name}</p>
                      <p className="text-sm text-muted-foreground">{food.calories} cal{food.brand ? ` • ${food.brand}` : ''}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => addFoodLog(food.food_name, food.calories, food.brand)}
                      disabled={isAdding}
                    >
                      {isAdding ? "Adding..." : "Add"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Foods */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Star className="w-5 h-5 text-warning" />
                <h4 className="font-medium text-foreground">Popular Foods</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {popularFoods.map((food, index) => (
                  <div key={index} className="p-3 bg-gradient-fresh rounded-xl text-center hover:shadow-soft transition-all">
                    <p className="font-medium text-foreground text-sm">{food.name}</p>
                    <p className="text-xs text-muted-foreground">{food.calories} cal</p>
                    {food.category && <Badge variant="secondary" className="text-xs mt-1">{food.category}</Badge>}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 h-7 text-xs w-full"
                      onClick={() => addFoodLog(food.name, food.calories, food.brand)}
                      disabled={isAdding}
                    >
                      {isAdding ? "..." : "Add"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </DashboardCard>
    </div>
  );
}