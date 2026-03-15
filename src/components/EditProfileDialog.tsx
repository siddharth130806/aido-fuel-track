import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { profileSchema } from "@/lib/validations";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  profile: {
    full_name?: string | null;
    age?: number | null;
    height?: number | null;
    weight?: number | null;
    goal?: string | null;
    activity_level?: string | null;
  } | null;
}

const goals = ["Lose weight", "Maintain weight", "Gain muscle", "Eat healthier", "Track nutrition"];
const activityLevels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extra Active"];

export function EditProfileDialog({ open, onOpenChange, userId, profile }: EditProfileDialogProps) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [activityLevel, setActivityLevel] = useState("");

  useEffect(() => {
    if (profile && open) {
      setFullName(profile.full_name || "");
      setAge(profile.age?.toString() || "");
      setHeight(profile.height?.toString() || "");
      setWeight(profile.weight?.toString() || "");
      setGoal(profile.goal || "");
      setActivityLevel(profile.activity_level || "");
    }
  }, [profile, open]);

  const handleSave = async () => {
    const parsed = profileSchema.safeParse({
      full_name: fullName || undefined,
      age: age ? parseInt(age) : null,
      height: height ? parseInt(height) : null,
      weight: weight ? parseFloat(weight) : null,
      goal: goal || undefined,
      activity_level: activityLevel || undefined,
    });

    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName || null,
          age: age ? parseInt(age) : null,
          height: height ? parseInt(height) : null,
          weight: weight ? parseFloat(weight) : null,
          goal: goal || null,
          activity_level: activityLevel || null,
        })
        .eq("id", userId);

      if (error) throw error;
      toast.success("Profile updated!");
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" />
            </div>
          </div>
          <div>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" />
          </div>
          <div>
            <Label>Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger><SelectValue placeholder="Select a goal" /></SelectTrigger>
              <SelectContent>
                {goals.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger><SelectValue placeholder="Select activity level" /></SelectTrigger>
              <SelectContent>
                {activityLevels.map((level) => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
