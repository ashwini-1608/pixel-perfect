import { useState } from "react";
import { Compass, Trash2 } from "lucide-react";

interface CalmTabProps {
  onNavigate: (screen: string) => void;
}

const CalmTab = ({ onNavigate }: CalmTabProps) => (
  <div className="pb-24">
    {/* Sky header */}
    <div className="px-5 pt-8 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(180deg, #4AADFF 0%, #3A9AEE 100%)" }}>
      <h1 className="text-2xl font-heading font-bold text-card-foreground">Calm Toolkit</h1>
      <p className="text-card-foreground/70 text-sm mt-1 font-body">Tools to help you feel grounded</p>
    </div>

    <div className="px-5 mt-6 space-y-4">
      {/* Grounding card */}
      <button
        onClick={() => onNavigate("grounding")}
        className="w-full rounded-2xl p-6 text-left transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        style={{ background: "linear-gradient(135deg, #0D9488 0%, #065F46 100%)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-heading font-bold text-card-foreground mb-1">5-4-3-2-1</h2>
            <h3 className="text-lg font-heading font-bold text-card-foreground">Grounding</h3>
            <p className="text-card-foreground/70 text-sm mt-2 font-body">Ground yourself in the present</p>
          </div>
          <Compass size={32} className="text-card-foreground/30" />
        </div>
      </button>

      {/* Thought Shredder card */}
      <button
        onClick={() => onNavigate("shredder")}
        className="w-full rounded-2xl p-6 text-left transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
        style={{ background: "linear-gradient(135deg, #4C1D95 0%, #3B0764 100%)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-heading font-bold text-card-foreground">Thought Shredder</h3>
            <p className="text-card-foreground/70 text-sm mt-2 font-body">Release what's weighing on you</p>
          </div>
          <Trash2 size={28} className="text-card-foreground/30" />
        </div>
      </button>

      {/* Info card */}
      <div className="bg-card rounded-2xl p-5 mt-4">
        <h3 className="text-sm font-heading font-bold text-card-foreground mb-2">What is grounding?</h3>
        <p className="text-xs text-muted-foreground leading-relaxed font-body">
          Grounding techniques help you reconnect with the present moment when anxiety or overwhelming emotions take over.
          By focusing on your five senses, you anchor your mind to the here and now, interrupting spiraling thoughts and
          activating your body's calm response.
        </p>
      </div>
    </div>
  </div>
);

export default CalmTab;
