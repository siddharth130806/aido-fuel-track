import { DashboardCard } from "@/components/DashboardCard";
import { ProgressRing } from "@/components/ProgressRing";
import { Button } from "@/components/ui/button";
import { Plus, Droplets, Zap } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTodayProgress } from "@/hooks/useTodayProgress";
import { useTodayFoodLogs } from "@/hooks/useTodayFoodLogs";
import heroFood from "@/assets/hero-food.jpg";
import { useNavigate } from "react-router-dom";

const tips = [
  "💪 Add protein to every meal for better satiety",
  "🥬 Try to fill half your plate with vegetables",
  "💧 Staying hydrated boosts your metabolism",
  "🥜 Healthy fats help absorb vitamins A, D, E, and K",
  "🌱 Eating slowly helps with better digestion"
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tipIndex] = useState(Math.floor(Math.random() * tips.length));
  
  const { data: progress } = useTodayProgress(user?.id);
  const { data: foodLogs } = useTodayFoodLogs(user?.id);

  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const meals = mealTypes.map(mealType => {
    const mealLogs = foodLogs?.filter(log => log.meal_type === mealType) || [];
    const calories = mealLogs.reduce((sum, log) => sum + log.calories, 0);
    return {
      name: mealType,
      calories,
      logged: mealLogs.length > 0
    };
  });

  const caloriesConsumed = progress?.calories_consumed || 0;
  const caloriesTarget = progress?.calories_target || 2200;
  const proteinGrams = progress?.protein_grams || 0;
  const waterGlasses = progress?.water_glasses || 0;
  
  const calorieProgress = (caloriesConsumed / caloriesTarget) * 100;
  const waterProgress = (waterGlasses / 8) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Good Morning! 🌅</h1>
        <p className="text-muted-foreground">Let's make today nutritious and delicious</p>
      </div>

      {/* Hero Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-glow mb-6">
        <img 
          src={heroFood} 
          alt="Fresh healthy foods" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>

      {/* Daily Progress */}
      <DashboardCard title="Today's Progress" gradient>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <ProgressRing progress={calorieProgress} size={100} color="primary">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {caloriesConsumed}
                </div>
                <div className="text-xs text-muted-foreground">
                  /{caloriesTarget} cal
                </div>
              </div>
            </ProgressRing>
            <p className="text-sm font-medium text-foreground mt-2">Calories</p>
          </div>
          
          <div className="text-center">
            <ProgressRing progress={waterProgress} size={100} color="accent">
              <div className="text-center">
                <Droplets className="w-6 h-6 text-accent mx-auto mb-1" />
                <div className="text-sm font-bold text-accent">
                  {waterGlasses}/8
                </div>
              </div>
            </ProgressRing>
            <p className="text-sm font-medium text-foreground mt-2">Water</p>
          </div>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-1 gap-4 mt-6 pt-6 border-t border-border/30">
          <div className="text-center">
            <div className="text-lg font-semibold text-success">{proteinGrams}g</div>
            <div className="text-xs text-muted-foreground">Protein (target: 120g)</div>
            <div className="w-full bg-muted rounded-full h-2 mt-1">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((proteinGrams / 120) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* Meals */}
      <DashboardCard title="Today's Meals">
        <div className="space-y-3">
          {meals.map((meal, index) => (
            <div key={meal.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${meal.logged ? 'bg-success' : 'bg-muted'}`} />
                <div>
                  <p className="font-medium text-foreground">{meal.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {meal.logged ? `${meal.calories} cal` : 'Not logged yet'}
                  </p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant={meal.logged ? "outline" : "default"}
                className="min-w-[60px]"
              >
                {meal.logged ? 'Edit' : 'Add'}
              </Button>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full mt-4 bg-gradient-primary hover:shadow-glow" 
          size="lg"
          onClick={() => navigate("/log")}
        >
          <Plus className="w-5 h-5 mr-2" />
          Quick Log Food
        </Button>
      </DashboardCard>

      {/* Tip of the Day */}
      <DashboardCard title="💡 Today's Tip">
        <div className="flex items-start space-x-3">
          <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <p className="text-foreground leading-relaxed">{tips[tipIndex]}</p>
        </div>
      </DashboardCard>
    </div>
  );
}