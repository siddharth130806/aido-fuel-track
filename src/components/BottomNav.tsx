import { Home, Camera, Calendar, TrendingUp, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/log", icon: Camera, label: "Log" },
  { to: "/plan", icon: Calendar, label: "Plan" },
  { to: "/progress", icon: TrendingUp, label: "Progress" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 backdrop-blur-sm">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200",
                "hover:bg-primary-light/50 active:scale-95",
                isActive
                  ? "text-primary bg-primary-light/30"
                  : "text-muted-foreground hover:text-primary"
              )
            }
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}