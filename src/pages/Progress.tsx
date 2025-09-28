import { DashboardCard } from "@/components/DashboardCard";
import { ProgressRing } from "@/components/ProgressRing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Award, Target, Calendar } from "lucide-react";

// Mock data
const weeklyStats = {
  caloriesAvg: 1980,
  proteinAvg: 102,
  waterAvg: 7.2,
  workoutDays: 4,
  goalDays: 6
};

const achievements = [
  { name: "Water Warrior", description: "7 days of proper hydration", icon: "💧", unlocked: true },
  { name: "Protein Power", description: "Hit protein goals 5 days in row", icon: "💪", unlocked: true },
  { name: "Streak Master", description: "30 days of logging", icon: "🔥", unlocked: false },
  { name: "Balanced Eater", description: "Perfect macro balance for a week", icon: "⚖️", unlocked: false }
];

const weeklyData = [
  { day: "Mon", calories: 2100, target: 2200, deficit: -100 },
  { day: "Tue", calories: 1850, target: 2200, deficit: -350 },
  { day: "Wed", calories: 2050, target: 2200, deficit: -150 },
  { day: "Thu", calories: 2300, target: 2200, deficit: 100 },
  { day: "Fri", calories: 1950, target: 2200, deficit: -250 },
  { day: "Sat", calories: 2150, target: 2200, deficit: -50 },
  { day: "Sun", calories: 1980, target: 2200, deficit: -220 }
];

export default function Progress() {
  const totalDeficit = weeklyData.reduce((sum, day) => sum + Math.abs(day.deficit), 0);
  const avgAccuracy = 100 - (totalDeficit / (weeklyData.length * 22)); // 22 = 1% of 2200

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Your Progress 📊</h1>
        <p className="text-muted-foreground">Track your journey to better health</p>
      </div>

      {/* Weekly Overview */}
      <DashboardCard title="This Week's Overview" gradient>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <ProgressRing progress={avgAccuracy} size={80} color="success">
              <div className="text-center">
                <div className="text-lg font-bold text-success">
                  {Math.round(avgAccuracy)}%
                </div>
              </div>
            </ProgressRing>
            <p className="text-sm font-medium text-foreground mt-2">Goal Accuracy</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Calories</span>
              <span className="font-semibold text-foreground">{weeklyStats.caloriesAvg}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Protein</span>
              <span className="font-semibold text-success">{weeklyStats.proteinAvg}g</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Water</span>
              <span className="font-semibold text-accent">{weeklyStats.waterAvg} cups</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Days</span>
              <span className="font-semibold text-warning">{weeklyStats.workoutDays}/7</span>
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* Daily Breakdown */}
      <DashboardCard title="Daily Calorie Tracking">
        <div className="space-y-3">
          {weeklyData.map((day, index) => {
            const percentage = (day.calories / day.target) * 100;
            const isOver = day.calories > day.target;
            
            return (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-10 text-sm font-medium text-muted-foreground">{day.day}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{day.calories} cal</span>
                    <div className="flex items-center space-x-1">
                      {isOver ? (
                        <TrendingUp className="w-4 h-4 text-warning" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-success" />
                      )}
                      <span className={`text-xs ${isOver ? 'text-warning' : 'text-success'}`}>
                        {Math.abs(day.deficit)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isOver ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>

      {/* Achievements */}
      <DashboardCard title="Achievements">
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-4 p-3 rounded-xl transition-all ${
                achievement.unlocked 
                  ? 'bg-success-light border border-success/20' 
                  : 'bg-muted/30 opacity-60'
              }`}
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                  {achievement.unlocked && <Award className="w-4 h-4 text-warning" />}
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              {achievement.unlocked && (
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  Unlocked
                </Badge>
              )}
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Goals */}
      <DashboardCard title="Current Goals">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gradient-fresh rounded-xl">
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground">Daily Calorie Goal</p>
                <p className="text-sm text-muted-foreground">Maintain current weight</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">2,200</p>
              <p className="text-xs text-muted-foreground">calories</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-accent-light rounded-xl">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-accent" />
              <div>
                <p className="font-semibold text-foreground">Weekly Activity</p>
                <p className="text-sm text-muted-foreground">Stay active 5 days/week</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-accent">{weeklyStats.workoutDays}/5</p>
              <p className="text-xs text-muted-foreground">days</p>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          Adjust Goals
        </Button>
      </DashboardCard>
    </div>
  );
}