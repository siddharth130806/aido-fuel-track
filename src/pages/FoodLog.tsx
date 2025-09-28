import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Camera, QrCode, Clock, Star } from "lucide-react";
import { useState } from "react";

// Mock data
const recentFoods = [
  { name: "Greek Yogurt", calories: 130, brand: "Chobani" },
  { name: "Banana", calories: 105, brand: "Fresh" },
  { name: "Oatmeal", calories: 150, brand: "Quaker" },
  { name: "Chicken Breast", calories: 185, brand: "Fresh" },
];

const popularFoods = [
  { name: "Apple", calories: 95, category: "Fruits" },
  { name: "Avocado", calories: 234, category: "Fruits" },
  { name: "Eggs", calories: 155, category: "Protein" },
  { name: "Brown Rice", calories: 216, category: "Grains" },
  { name: "Salmon", calories: 206, category: "Protein" },
  { name: "Spinach", calories: 23, category: "Vegetables" },
];

export default function FoodLog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("breakfast");

  const meals = ["breakfast", "lunch", "dinner", "snacks"];

  const filteredFoods = popularFoods.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <Button size="sm">Add</Button>
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
                {recentFoods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">{food.name}</p>
                      <p className="text-sm text-muted-foreground">{food.calories} cal • {food.brand}</p>
                    </div>
                    <Button size="sm" variant="outline">Add</Button>
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
                {popularFoods.slice(0, 6).map((food, index) => (
                  <div key={index} className="p-3 bg-gradient-fresh rounded-xl text-center hover:shadow-soft transition-all">
                    <p className="font-medium text-foreground text-sm">{food.name}</p>
                    <p className="text-xs text-muted-foreground">{food.calories} cal</p>
                    <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                      Add
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