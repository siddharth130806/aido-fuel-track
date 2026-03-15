import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, ChefHat, ShoppingCart, Repeat } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock data
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mealPlan = {
  "Mon": {
    breakfast: { name: "Greek Yogurt Bowl", calories: 320, prep: "5 min" },
    lunch: { name: "Quinoa Salad", calories: 450, prep: "15 min" },
    dinner: { name: "Grilled Salmon", calories: 520, prep: "25 min" }
  },
  "Tue": {
    breakfast: { name: "Avocado Toast", calories: 380, prep: "8 min" },
    lunch: { name: "Chicken Wrap", calories: 420, prep: "10 min" },
    dinner: { name: "Veggie Stir Fry", calories: 380, prep: "20 min" }
  },
  "Wed": {
    breakfast: { name: "Smoothie Bowl", calories: 340, prep: "5 min" },
    lunch: { name: "Turkey Sandwich", calories: 390, prep: "5 min" },
    dinner: { name: "Pasta Primavera", calories: 480, prep: "30 min" }
  }
};

const suggestions = [
  { name: "Mediterranean Bowl", calories: 420, tags: ["High Protein", "Heart Healthy"], prep: "15 min" },
  { name: "Asian Lettuce Wraps", calories: 280, tags: ["Low Carb", "Fresh"], prep: "20 min" },
  { name: "Quinoa Stuffed Peppers", calories: 380, tags: ["Vegetarian", "Fiber Rich"], prep: "35 min" },
  { name: "Grilled Chicken Salad", calories: 350, tags: ["High Protein", "Low Cal"], prep: "12 min" }
];

export default function MealPlan() {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const currentPlan = mealPlan[selectedDay as keyof typeof mealPlan];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Meal Planning 🍽️</h1>
        <p className="text-muted-foreground">Plan your week for better nutrition</p>
      </div>

      {/* Week Navigator */}
      <DashboardCard title="This Week" gradient>
        <div className="flex space-x-2 mb-4">
          {weekDays.map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              onClick={() => setSelectedDay(day)}
              className="flex-1 text-sm"
              size="sm"
            >
              {day}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Week of March 18-24</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>For 1 person</span>
          </div>
        </div>
      </DashboardCard>

      {/* Daily Plan */}
      {currentPlan && (
        <DashboardCard title={`${selectedDay} - Daily Plan`}>
          <div className="space-y-4">
            {Object.entries(currentPlan).map(([mealType, meal]) => (
              <div key={mealType} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-fresh rounded-lg flex items-center justify-center">
                    <ChefHat className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground capitalize">{mealType}</p>
                    <p className="text-sm text-muted-foreground">{meal.name}</p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-success font-medium">{meal.calories} cal</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{meal.prep}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast.info("Meal swapping coming soon!")}>
                  <Repeat className="w-4 h-4 mr-1" />
                  Swap
                </Button>
              </div>
            ))}
          </div>

          <div className="flex space-x-3 mt-6">
            <Button className="flex-1 bg-gradient-primary" onClick={() => toast.info("Grocery list coming soon!")}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Grocery List
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => toast.info("Plan generation coming soon!")}>
              Generate New Plan
            </Button>
          </div>
        </DashboardCard>
      )}

      {/* AI Suggestions */}
      <DashboardCard title="🤖 AI Meal Suggestions">
        <p className="text-sm text-muted-foreground mb-4">
          Based on your preferences and goals
        </p>
        
        <div className="grid grid-cols-1 gap-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-4 border border-border/50 rounded-xl hover:shadow-soft transition-all">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-foreground">{suggestion.name}</h4>
                <Button size="sm" variant="ghost" className="text-primary hover:bg-primary-light" onClick={() => toast.success(`Added ${suggestion.name} to your plan!`)}>
                  Add
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {suggestion.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <span className="text-success font-medium">{suggestion.calories} cal</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{suggestion.prep}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4" onClick={() => toast.info("More suggestions coming soon!")}>
          Get More Suggestions
        </Button>
      </DashboardCard>

      {/* Quick Actions */}
      <DashboardCard title="Quick Actions">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex-col space-y-1" onClick={() => toast.info("Next week planning coming soon!")}>
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm">Plan Next Week</span>
          </Button>
          
          <Button variant="outline" className="h-16 flex-col space-y-1" onClick={() => toast.info("Copy feature coming soon!")}>
            <Repeat className="w-5 h-5 text-accent" />
            <span className="text-sm">Copy Last Week</span>
          </Button>
          
          <Button variant="outline" className="h-16 flex-col space-y-1" onClick={() => toast.info("Grocery list coming soon!")}>
            <ShoppingCart className="w-5 h-5 text-success" />
            <span className="text-sm">View Grocery List</span>
          </Button>
          
          <Button variant="outline" className="h-16 flex-col space-y-1" onClick={() => toast.info("Recipe ideas coming soon!")}>
            <ChefHat className="w-5 h-5 text-warning" />
            <span className="text-sm">Recipe Ideas</span>
          </Button>
        </div>
      </DashboardCard>
    </div>
  );
}
