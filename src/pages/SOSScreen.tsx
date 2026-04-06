import MascotSera from "@/components/MascotSera";
import { Phone, ExternalLink, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

const breathTexts = ["Breathe in slowly...", "Hold gently...", "Breathe out completely..."];
const breathDurations = [4000, 2000, 6000];

const helplines = [
  { name: "iCall India", number: "9152987821", tel: "tel:9152987821" },
  { name: "Vandrevala Foundation", number: "1860-2662-345", tel: "tel:18602662345" },
  { name: "NIMHANS Helpline", number: "080-46110007", tel: "tel:08046110007" },
];

interface SOSScreenProps {
  onClose: () => void;
}

const SOSScreen = ({ onClose }: SOSScreenProps) => {
  const [breathIndex, setBreathIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let timeout: number;
    const cycle = () => {
      setOpacity(0);
      timeout = window.setTimeout(() => {
        setBreathIndex((prev) => (prev + 1) % 3);
        setOpacity(1);
        timeout = window.setTimeout(cycle, breathDurations[(breathIndex + 1) % 3]);
      }, 400);
    };
    timeout = window.setTimeout(cycle, breathDurations[breathIndex]);
    return () => clearTimeout(timeout);
  }, [breathIndex]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #1A0000 0%, #3B0F0F 100%)" }}
    >
      <div className="flex-1 flex flex-col items-center px-6 py-8">
        {/* Back */}
        <button
          onClick={onClose}
          className="self-start mb-6 flex items-center gap-2 text-card-foreground/70 hover:text-card-foreground transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-body">Back</span>
        </button>

        <MascotSera size="md" mood="sleeping" className="mb-6" />

        <h1 className="text-2xl font-heading font-bold text-card-foreground text-center mb-2">
          You're not alone.
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
          Right now, in this moment, you are safe.
        </p>

        {/* Breathing text */}
        <div className="h-10 flex items-center justify-center mb-10">
          <p
            className="text-lg font-body text-card-foreground/80 transition-opacity duration-400"
            style={{ opacity }}
          >
            {breathTexts[breathIndex]}
          </p>
        </div>

        {/* Need to talk */}
        <div className="w-full max-w-sm">
          <h2 className="text-lg font-heading font-bold text-card-foreground mb-4">
            Need to talk to someone?
          </h2>
          <div className="space-y-3">
            {helplines.map((line) => (
              <a
                key={line.name}
                href={line.tel}
                className="flex items-center justify-between p-4 rounded-2xl transition-colors duration-200 hover:opacity-90"
                style={{ background: "#2D0A0A" }}
              >
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-card-foreground/70" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{line.name}</p>
                    <p className="text-xs text-muted-foreground">{line.number}</p>
                  </div>
                </div>
                <ExternalLink size={16} className="text-card-foreground/40" />
              </a>
            ))}
          </div>
        </div>

        {/* Feeling better button */}
        <button
          onClick={onClose}
          className="mt-8 w-full max-w-sm py-3 rounded-pill border border-card-foreground/30 text-card-foreground text-sm font-body font-medium transition-colors hover:bg-card-foreground/10"
        >
          I'm feeling a little better
        </button>
      </div>
    </div>
  );
};

export default SOSScreen;
