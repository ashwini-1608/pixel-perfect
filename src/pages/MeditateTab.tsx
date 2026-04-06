import { Wind, Music, Clock, Zap } from "lucide-react";
import SparkleIcon from "@/components/SparkleIcon";

interface MeditateTabProps {
  onNavigate: (screen: string) => void;
}

const sections = [
  {
    title: "Guided Breathwork",
    description: "Follow along with breathing exercises",
    icon: Wind,
    color: "text-sera-sky",
    bgColor: "bg-sera-sky/15",
    screen: "breathe",
  },
  {
    title: "Sounds & Frequencies",
    description: "Binaural beats, nature & healing sounds",
    icon: Music,
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/15",
    screen: "sounds",
  },
];

const techniques = [
  { name: "Box Breathing", desc: "4-4-4-4 equal phases", time: "4 min" },
  { name: "4-7-8 Technique", desc: "Calming exhale focus", time: "5 min" },
  { name: "Calm Breathing", desc: "4-4-6 gentle rhythm", time: "5 min" },
];

const MeditateTab = ({ onNavigate }: MeditateTabProps) => (
  <div className="pb-24">
    {/* Orange header */}
    <div className="px-5 pt-8 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(180deg, #F5820A 0%, #E0750A 100%)" }}>
      <h1 className="text-2xl font-heading font-bold text-card-foreground">Meditate</h1>
      <p className="text-card-foreground/70 text-sm mt-1 font-body">Find your calm</p>
      <SparkleIcon size={14} color="#F5C518" className="absolute top-10 right-8" />
    </div>

    <div className="px-5 mt-6 space-y-4">
      {/* Main cards */}
      {sections.map((s) => (
        <button
          key={s.title}
          onClick={() => onNavigate(s.screen)}
          className="w-full bg-card rounded-2xl p-5 flex items-center gap-4 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className={`w-12 h-12 rounded-xl ${s.bgColor} flex items-center justify-center`}>
            <s.icon size={24} className={s.color} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-heading font-bold text-card-foreground">{s.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
          </div>
        </button>
      ))}

      {/* Quick sessions */}
      <div className="mt-6">
        <h2 className="text-lg font-heading font-bold text-card-foreground mb-3">Quick Sessions</h2>
        <div className="flex gap-3">
          {["5 min", "10 min", "15 min"].map((t) => (
            <button
              key={t}
              onClick={() => onNavigate("breathe")}
              className="flex-1 py-3 rounded-pill bg-sera-orange/15 text-sera-orange text-sm font-body font-medium hover:bg-sera-orange/25 transition-colors flex items-center justify-center gap-1"
            >
              <Clock size={14} />
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Techniques */}
      <div className="mt-6">
        <h2 className="text-lg font-heading font-bold text-card-foreground mb-3">Techniques</h2>
        <div className="space-y-3">
          {techniques.map((t) => (
            <button
              key={t.name}
              onClick={() => onNavigate("breathe")}
              className="w-full bg-card rounded-2xl p-4 flex items-center justify-between transition-transform duration-200 hover:scale-[1.01]"
            >
              <div className="text-left">
                <h3 className="text-sm font-heading font-bold text-card-foreground">{t.name}</h3>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-pill">{t.time}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default MeditateTab;
