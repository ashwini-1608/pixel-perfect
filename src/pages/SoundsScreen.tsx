import { sounds } from "@/data/sounds";
import { ArrowLeft, Moon, Cloud, Waves, Gem, Sun, Bell, Dna, CloudRain, TreePine, Circle } from "lucide-react";
import { useState } from "react";
import SparkleIcon from "@/components/SparkleIcon";

const soundIconMap: Record<string, React.ReactNode> = {
  delta: <Moon size={24} className="text-card-foreground/80" />,
  theta: <Cloud size={24} className="text-card-foreground/80" />,
  alpha: <Waves size={24} className="text-card-foreground/80" />,
  beta: <Gem size={24} className="text-card-foreground/80" />,
  gamma: <Sun size={24} className="text-card-foreground/80" />,
  bowls: <Bell size={24} className="text-card-foreground/80" />,
  "528hz": <Dna size={24} className="text-card-foreground/80" />,
  ocean: <Waves size={24} className="text-card-foreground/80" />,
  rain: <CloudRain size={24} className="text-card-foreground/80" />,
  forest: <TreePine size={24} className="text-card-foreground/80" />,
  brown: <Circle size={24} className="text-card-foreground/80" fill="currentColor" />,
  white: <Circle size={24} className="text-card-foreground/80" />,
};

interface SoundsScreenProps {
  onClose: () => void;
}

const SoundsScreen = ({ onClose }: SoundsScreenProps) => {
  const [playing, setPlaying] = useState<string | null>(null);

  const groups = {
    Binaural: sounds.filter((s) => s.type === "Binaural"),
    Healing: sounds.filter((s) => s.type === "Healing"),
    Nature: sounds.filter((s) => s.type === "Nature"),
    Noise: sounds.filter((s) => s.type === "Noise"),
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      {/* Orange header */}
      <div className="px-5 pt-6 pb-5 rounded-b-[2rem] relative" style={{ background: "linear-gradient(180deg, #F5820A 0%, #E0750A 100%)" }}>
        <button onClick={onClose} className="mb-3 text-card-foreground/70 hover:text-card-foreground transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-heading font-bold text-card-foreground">Sounds & Frequencies</h1>
        <SparkleIcon size={14} color="#F5C518" className="absolute top-8 right-8" />
      </div>

      <div className="px-5 py-6 pb-10">
        {Object.entries(groups).map(([group, items]) => (
          <div key={group} className="mb-8">
            <h2 className="text-base font-heading font-bold text-card-foreground mb-3">{group} {group === "Binaural" ? "Beats" : group === "Healing" ? "Frequencies" : "Sounds"}</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {items.map((sound) => {
                const isPlaying = playing === sound.id;
                return (
                  <button
                    key={sound.id}
                    onClick={() => setPlaying(isPlaying ? null : sound.id)}
                    className={`flex-shrink-0 w-[140px] h-[140px] rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 hover:scale-[1.03] ${
                      isPlaying ? "ring-2 ring-sera-orange" : ""
                    }`}
                    style={{ background: sound.color }}
                  >
                    <span>{soundIconMap[sound.id] ?? sound.icon}</span>
                    <div>
                      <p className="text-sm font-heading font-bold text-card-foreground text-left">{sound.name}</p>
                      {sound.hz && (
                        <p className="text-[10px] text-card-foreground/60 text-left font-body">{sound.hz}Hz</p>
                      )}
                    </div>
                    {isPlaying && (
                      <div className="absolute top-3 right-3 flex gap-0.5">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-0.5 bg-sera-orange rounded-full animate-pulse" style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }} />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoundsScreen;
