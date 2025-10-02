import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Target, Heart, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export default function Profile() {
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile(user?.id);
  
  const { data: achievements } = useQuery({
    queryKey: ["achievements", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("achievements")
        .select("*")
        .eq("user_id", user?.id);
      return data || [];
    },
    enabled: !!user?.id,
  });

  const { data: foodLogs } = useQuery({
    queryKey: ["food-logs-count", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("food_logs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user?.id);
      return data;
    },
    enabled: !!user?.id,
  });

  const unlockedAchievements = achievements?.filter(a => a.unlocked) || [];
  const joinDate = profile?.created_at ? format(new Date(profile.created_at), "MMMM yyyy") : "Recently";
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-1">{profile?.full_name || user?.email}</h1>
        <p className="text-muted-foreground">Member since {joinDate}</p>
      </div>

      {/* Quick Stats */}
      <DashboardCard title="Your Stats" gradient>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">0</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-1">0</div>
            <p className="text-sm text-muted-foreground">Meals Logged</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-1">{unlockedAchievements.length}</div>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-1">{achievements?.length || 0}</div>
            <p className="text-sm text-muted-foreground">Total Badges</p>
          </div>
        </div>
      </DashboardCard>

      {/* Profile Info */}
      <DashboardCard title="Profile Information">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-semibold text-foreground">{profile?.age || "Not set"} {profile?.age && "years"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="font-semibold text-foreground">{profile?.height ? `${profile.height} cm` : "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="font-semibold text-foreground">{profile?.weight ? `${profile.weight} kg` : "Not set"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Activity Level</p>
              <p className="font-semibold text-foreground">{profile?.activity_level || "Not set"}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/30">
            <p className="text-sm text-muted-foreground mb-2">Current Goal</p>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">{profile?.goal || "Not set"}</span>
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
              {profile?.dietary_preferences && profile.dietary_preferences.length > 0 ? (
                profile.dietary_preferences.map((diet, index) => (
                  <Badge key={index} className="bg-success-light text-success border-success/20">
                    {diet}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No preferences set</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Allergies</p>
            <div className="flex flex-wrap gap-2">
              {profile?.allergies && profile.allergies.length > 0 ? (
                profile.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive" className="bg-destructive/10">
                    {allergy}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No allergies listed</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Favorite Cuisines</p>
            <div className="flex flex-wrap gap-2">
              {profile?.favorite_cuisines && profile.favorite_cuisines.length > 0 ? (
                profile.favorite_cuisines.map((cuisine, index) => (
                  <Badge key={index} variant="secondary">
                    {cuisine}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No favorite cuisines</p>
              )}
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4">
          <Heart className="w-4 h-4 mr-2" />
          Update Preferences
        </Button>
      </DashboardCard>

      {/* Achievements */}
      <DashboardCard title="Achievements">
        <div className="space-y-3">
          {achievements && achievements.length > 0 ? (
            achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`flex items-center justify-between p-3 rounded-xl ${
                  achievement.unlocked ? 'bg-success-light' : 'bg-muted/30 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{achievement.achievement_name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.achievement_description}</p>
                  </div>
                </div>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    Unlocked
                  </Badge>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No achievements yet</p>
          )}
        </div>
      </DashboardCard>

      {/* Sign Out */}
      <DashboardCard title="Account">
        <Button 
          variant="outline" 
          className="w-full justify-start h-12 text-destructive hover:bg-destructive/10"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Sign Out</span>
        </Button>
      </DashboardCard>
    </div>
  );
}