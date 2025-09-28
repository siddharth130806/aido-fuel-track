import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export function DashboardCard({ title, children, className, gradient = false }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl border border-border/50 shadow-card animate-fade-in",
        gradient ? "bg-gradient-fresh" : "bg-card",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}