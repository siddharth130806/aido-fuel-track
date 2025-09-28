import { BottomNav } from "./BottomNav";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20 px-4 pt-6">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}