import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import MascotSera from "@/components/MascotSera";

const steps = [
  { number: 5, sense: "SEE", prompt: "Name something you can see...", color: "#4AADFF" },
  { number: 4, sense: "TOUCH", prompt: "Name something you can touch...", color: "#0D9488" },
  { number: 3, sense: "HEAR", prompt: "Name something you can hear...", color: "#8B5CF6" },
  { number: 2, sense: "SMELL", prompt: "Name something you can smell...", color: "#F59E0B" },
  { number: 1, sense: "TASTE", prompt: "Name something you can taste...", color: "#EF4444" },
];

interface GroundingScreenProps {
  onClose: () => void;
}

const GroundingScreen = ({ onClose }: GroundingScreenProps) => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [done, setDone] = useState(false);

  const current = steps[step];

  const next = () => {
    if (step < 4) {
      setStep(step + 1);
      setInput("");
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 bg-background">
        <MascotSera size="lg" mood="happy" className="mb-8" />
        <h1 className="text-2xl font-heading font-bold text-card-foreground text-center mb-2">
          You're grounded.
        </h1>
        <p className="text-lg text-card-foreground/80 text-center mb-1 font-body">You're here.</p>
        <p className="text-lg text-card-foreground/80 text-center mb-8 font-body">You're okay.</p>
        <button
          onClick={onClose}
          className="w-full max-w-xs py-3 rounded-pill bg-sera-blue text-card-foreground font-body font-bold text-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: current.color }}>
      {/* Back button */}
      <button
        onClick={step > 0 ? () => { setStep(step - 1); setInput(""); } : onClose}
        className="absolute top-5 left-5 z-10 text-card-foreground/70 hover:text-card-foreground transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Progress dots */}
      <div className="flex gap-2 justify-center mt-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i <= step ? "bg-card-foreground" : "bg-card-foreground/25"
            }`}
          />
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <span
          className="text-8xl font-heading font-bold text-card-foreground/20 mb-4 animate-fade-in-up"
          key={step}
        >
          {current.number}
        </span>
        <h2 className="text-2xl font-heading font-bold text-card-foreground mb-2">{current.sense}</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={current.prompt}
          className="w-full max-w-sm bg-card-foreground/15 border-none rounded-2xl px-5 py-4 text-card-foreground placeholder:text-card-foreground/40 text-center font-body outline-none focus:ring-2 focus:ring-card-foreground/30 mt-6"
          onKeyDown={(e) => e.key === "Enter" && input.trim() && next()}
        />
      </div>

      <div className="px-6 pb-10">
        <button
          onClick={next}
          disabled={!input.trim()}
          className="w-full py-3.5 rounded-pill bg-card-foreground/20 text-card-foreground font-body font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-30 hover:bg-card-foreground/30 transition-colors"
        >
          {step < 4 ? "Next" : "Finish"}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default GroundingScreen;
