import { Home, Leaf, Sparkles, BookOpen, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "meditate", label: "Meditate", icon: Leaf },
  { id: "calm", label: "Calm", icon: Sparkles },
  { id: "journal", label: "Journal", icon: BookOpen },
  { id: "counselling", label: "Resources", icon: Heart },
] as const;

export type TabId = (typeof tabs)[number]["id"];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/30">
    <div className="max-w-md mx-auto flex items-center justify-around py-2 px-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isCenter = tab.id === "calm";
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center gap-0.5 py-1 px-3 transition-colors duration-200 relative",
              isActive ? "text-card-foreground" : "text-muted-foreground"
            )}
          >
            <tab.icon
              size={isCenter ? 26 : 22}
              className={cn(
                "transition-all duration-200",
                isActive && "drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
              )}
            />
            <span className="text-[10px] font-body">{tab.label}</span>
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-card-foreground" />
            )}
          </button>
        );
      })}
    </div>
  </nav>
);

export default BottomNav;
