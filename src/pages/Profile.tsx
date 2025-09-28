import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Target, Heart, Shield, Bell, Share2, HelpCircle } from "lucide-react";

// Mock user data
const userData = {
  name: "Sarah Johnson",
  age: 28,
  height: "5'6\"",
  weight: "140 lbs",
  goal: "Maintain Weight",
  activity: "Moderately Active",
  joinDate: "March 2024"
};

const preferences = {
  dietary: ["Vegetarian", "Gluten-Free"],
  allergies: ["Nuts", "Shellfish"],
  cuisines: ["Mediterranean", "Asian", "Italian"]
};

const stats = {
  streak: 15,
  totalMeals: 342,
  favoriteFoods: ["Quinoa Bowl", "Greek Salad", "Smoothie"],
  achievements: 8
};

export default function Profile() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-1">{userData.name}</h1>
        <p className="text-muted-foreground">Member since {userData.joinDate}</p>
      </div>

      {/* Quick Stats */}
      <DashboardCard title="Your Stats" gradient>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">{stats.streak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-1">{stats.totalMeals}</div>
            <p className="text-sm text-muted-foreground">Meals Logged</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">{stats.achievements}</div>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-1">4.8</div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </div>
        </div>
      </DashboardCard>

      {/* Profile Info */}
      <DashboardCard title="Profile Information">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-semibold text-foreground">{userData.age} years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-semibold text-foreground">{userData.height}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-semibold text-foreground">{userData.weight}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Activity Level</p>
              <p className="font-semibold text-foreground">{userData.activity}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/30">
            <p className="text-sm text-muted-foreground mb-2">Current Goal</p>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">{userData.goal}</span>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          <Settings className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </DashboardCard>

      {/* Preferences */}
      <DashboardCard title="Dietary Preferences">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Diet Type</p>
            <div className="flex flex-wrap gap-2">
              {preferences.dietary.map((diet, index) => (
                <Badge key={index} className="bg-success-light text-success border-success/20">
                  {diet}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Allergies</p>
            <div className="flex flex-wrap gap-2">
              {preferences.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="bg-destructive/10">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Favorite Cuisines</p>
            <div className="flex flex-wrap gap-2">
              {preferences.cuisines.map((cuisine, index) => (
                <Badge key={index} variant="secondary">
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          <Heart className="w-4 h-4 mr-2" />
          Update Preferences
        </Button>
      </DashboardCard>

      {/* Favorite Foods */}
      <DashboardCard title="Favorite Foods">
        <div className="space-y-3">
          {stats.favoriteFoods.map((food, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <span className="font-medium text-foreground">{food}</span>
              <Badge variant="outline" className="text-xs">
                #{index + 1}
              </Badge>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Settings Menu */}
      <DashboardCard title="Settings">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start h-12">
            <Bell className="w-5 h-5 mr-3 text-muted-foreground" />
            <span>Notifications</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start h-12">
            <Shield className="w-5 h-5 mr-3 text-muted-foreground" />
            <span>Privacy & Security</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start h-12">
            <Share2 className="w-5 h-5 mr-3 text-muted-foreground" />
            <span>Connected Apps</span>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start h-12">
            <HelpCircle className="w-5 h-5 mr-3 text-muted-foreground" />
            <span>Help & Support</span>
          </Button>
        </div>
      </DashboardCard>
    </div>
  );
}