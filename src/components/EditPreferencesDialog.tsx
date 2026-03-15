import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { preferencesSchema } from "@/lib/validations";

interface EditPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  profile: {
    dietary_preferences?: string[] | null;
    allergies?: string[] | null;
    favorite_cuisines?: string[] | null;
  } | null;
}

const commonDiets = ["Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean", "Gluten-Free", "Dairy-Free", "Low Carb"];
const commonAllergies = ["Peanuts", "Tree Nuts", "Milk", "Eggs", "Wheat", "Soy", "Fish", "Shellfish"];
const commonCuisines = ["Italian", "Mexican", "Japanese", "Indian", "Chinese", "Thai", "Mediterranean", "American"];

function TagInput({ label, tags, setTags, suggestions }: { label: string; tags: string[]; setTags: (t: string[]) => void; suggestions: string[] }) {
  const [input, setInput] = useState("");

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 20) {
      setTags([...tags, trimmed]);
    }
    setInput("");
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-1.5 mb-2 mt-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1">
            {tag}
            <X className="w-3 h-3 cursor-pointer" onClick={() => setTags(tags.filter((t) => t !== tag))} />
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(input); }}}
          placeholder="Type and press Enter"
          className="flex-1"
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {suggestions.filter((s) => !tags.includes(s)).slice(0, 6).map((s) => (
          <Badge key={s} variant="outline" className="cursor-pointer hover:bg-primary/10 text-xs" onClick={() => addTag(s)}>
            + {s}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function EditPreferencesDialog({ open, onOpenChange, userId, profile }: EditPreferencesDialogProps) {
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);
  const [diets, setDiets] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);

  useEffect(() => {
    if (profile && open) {
      setDiets(profile.dietary_preferences || []);
      setAllergies(profile.allergies || []);
      setCuisines(profile.favorite_cuisines || []);
    }
  }, [profile, open]);

  const handleSave = async () => {
    const parsed = preferencesSchema.safeParse({
      dietary_preferences: diets,
      allergies,
      favorite_cuisines: cuisines,
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
          dietary_preferences: diets.length > 0 ? diets : null,
          allergies: allergies.length > 0 ? allergies : null,
          favorite_cuisines: cuisines.length > 0 ? cuisines : null,
        })
        .eq("id", userId);

      if (error) throw error;
      toast.success("Preferences updated!");
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Preferences</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <TagInput label="Dietary Preferences" tags={diets} setTags={setDiets} suggestions={commonDiets} />
          <TagInput label="Allergies" tags={allergies} setTags={setAllergies} suggestions={commonAllergies} />
          <TagInput label="Favorite Cuisines" tags={cuisines} setTags={setCuisines} suggestions={commonCuisines} />
          <Button className="w-full" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
