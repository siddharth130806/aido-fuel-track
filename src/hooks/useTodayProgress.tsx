import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export function useTodayProgress(userId: string | undefined) {
  return useQuery({
    queryKey: ["today-progress", userId],
    queryFn: async () => {
      if (!userId) throw new Error("No user ID");
      
      const today = format(new Date(), "yyyy-MM-dd");
      
      const { data, error } = await supabase
        .from("progress_data")
        .select("*")
        .eq("user_id", userId)
        .eq("date", today)
        .maybeSingle();

      if (error) throw error;
      
      return data || {
        calories_consumed: 0,
        calories_target: 2200,
        protein_grams: 0,
        water_glasses: 0,
      };
    },
    enabled: !!userId,
  });
}
