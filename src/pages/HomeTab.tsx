import { useMemo } from "react";
import MascotSera from "@/components/MascotSera";
import SparkleIcon from "@/components/SparkleIcon";
import { getDailyQuote } from "@/data/quotes";
import { useState } from "react";
import { Wind, Compass, BookOpen, Music } from "lucide-react";

const moods = ["😔", "😟", "😐", "🙂", "😄"];

interface HomeTabProps {
  onNavigate: (screen: string) => void;
}

const HomeTab = ({ onNavigate }: HomeTabProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const quote = useMemo(() => getDailyQuote(), []);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const quickActions = [
    { label: "Breathe", icon: Wind, color: "bg-sera-sky/20", textColor: "text-sera-sky", screen: "breathe" },
    { label: "Ground Me", icon: Compass, color: "bg-emerald-500/20", textColor: "text-emerald-400", screen: "grounding" },
    { label: "Journal", icon: BookOpen, color: "bg-purple-500/20", textColor: "text-purple-400", screen: "journal-new" },
    { label: "Sounds", icon: Music, color: "bg-indigo-500/20", textColor: "text-indigo-400", screen: "sounds" },
  ];

  return (
    <div className="pb-24 px-5">
      {/* Header */}
      <div className="flex items-start justify-between pt-8 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">{greeting}</h1>
          <p className="text-muted-foreground text-sm mt-1">{today}</p>
        </div>
        <MascotSera size="sm" mood="idle" />
      </div>

      {/* Mood check-in */}
      <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <p className="text-sm text-muted-foreground mb-3">How are you feeling today?</p>
        <div className="flex gap-3 justify-between">
          {moods.map((emoji, i) => (
            <button
              key={i}
              onClick={() => setSelectedMood(i)}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-200 ${
                selectedMood === i
                  ? "ring-2 ring-sera-sky ring-offset-2 ring-offset-background scale-110"
                  : "hover:scale-105"
              }`}
              style={{ background: selectedMood === i ? "rgba(74,173,255,0.15)" : "transparent" }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => onNavigate(action.screen)}
            className="bg-card rounded-2xl p-4 flex flex-col items-start gap-3 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center`}>
              <action.icon size={20} className={action.textColor} />
            </div>
            <span className="text-sm font-body font-medium text-card-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Daily quote */}
      <div className="bg-card rounded-2xl p-5 mb-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-start gap-3">
          <span className="text-3xl text-sera-orange opacity-60">"</span>
          <div>
            <p className="text-sm text-card-foreground/90 italic leading-relaxed">{quote.text}</p>
            <p className="text-xs text-muted-foreground mt-2">— {quote.author}</p>
          </div>
        </div>
      </div>

      {/* Sparkle accent */}
      <div className="flex items-center justify-center gap-2 py-4">
        <SparkleIcon size={10} color="#F5C518" />
        <span className="text-xs text-muted-foreground">Take it one breath at a time</span>
        <SparkleIcon size={10} color="#F5C518" style={{ animationDelay: "0.5s" }} />
      </div>
    </div>
  );
};

export default HomeTab;
