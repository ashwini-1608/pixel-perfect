import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import SparkleIcon from "@/components/SparkleIcon";

const patterns = [
  { label: "4-4-6 Calm", inhale: 4, hold: 4, exhale: 6 },
  { label: "Box", inhale: 4, hold: 4, exhale: 4 },
  { label: "4-7-8", inhale: 4, hold: 7, exhale: 8 },
];

interface BreatheScreenProps {
  onClose: () => void;
}

const BreatheScreen = ({ onClose }: BreatheScreenProps) => {
  const [patternIndex, setPatternIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "inhale" | "hold" | "exhale" | "done">("idle");
  const [breathCount, setBreathCount] = useState(0);
  const [totalBreaths] = useState(5);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const pattern = patterns[patternIndex];

  const phaseText = phase === "inhale" ? "Breathe in" : phase === "hold" ? "Hold" : phase === "exhale" ? "Breathe out" : phase === "done" ? "Well done ✓" : "Ready?";

  const bgColor = phase === "exhale"
    ? "linear-gradient(180deg, #6B5FBF 0%, #4A40A0 100%)"
    : phase === "done"
    ? "linear-gradient(180deg, #5A8FDF 0%, #4AADFF 100%)"
    : "linear-gradient(180deg, #4AADFF 0%, #3A9AEE 100%)";

  const circumference = 2 * Math.PI * 110;

  const animatePhase = useCallback((duration: number, reverse: boolean, onComplete: () => void) => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / (duration * 1000), 1);
      setProgress(reverse ? 1 - t : t);
      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const runBreathCycle = useCallback((breathNum: number) => {
    if (breathNum >= totalBreaths) {
      setPhase("done");
      setProgress(0);
      return;
    }
    setBreathCount(breathNum);

    // Inhale
    setPhase("inhale");
    animatePhase(pattern.inhale, false, () => {
      // Hold
      setPhase("hold");
      timerRef.current = window.setTimeout(() => {
        // Exhale
        setPhase("exhale");
        animatePhase(pattern.exhale, true, () => {
          runBreathCycle(breathNum + 1);
        });
      }, pattern.hold * 1000);
    });
  }, [pattern, totalBreaths, animatePhase]);

  const startBreathing = useCallback(() => {
    setBreathCount(0);
    runBreathCycle(0);
  }, [runBreathCycle]);

  useEffect(() => {
    startBreathing();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [patternIndex]);

  const handlePatternChange = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setPatternIndex(index);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between transition-all duration-1000"
      style={{ background: bgColor }}
    >
      {/* Clouds */}
      <svg className="absolute bottom-0 left-0 w-40 opacity-70 animate-cloud-drift" viewBox="0 0 200 80" fill="white">
        <ellipse cx="60" cy="55" rx="55" ry="25" /><ellipse cx="100" cy="40" rx="40" ry="22" /><ellipse cx="140" cy="55" rx="50" ry="25" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-44 opacity-70 animate-cloud-drift" style={{ animationDelay: "1s" }} viewBox="0 0 200 80" fill="white">
        <ellipse cx="60" cy="55" rx="55" ry="25" /><ellipse cx="100" cy="40" rx="40" ry="22" /><ellipse cx="140" cy="55" rx="50" ry="25" />
      </svg>
      <svg className="absolute bottom-0 left-1/4 w-36 opacity-50 animate-cloud-drift" style={{ animationDelay: "2s" }} viewBox="0 0 160 60" fill="#F9D5D3">
        <ellipse cx="50" cy="40" rx="45" ry="20" /><ellipse cx="90" cy="30" rx="35" ry="18" /><ellipse cx="110" cy="40" rx="40" ry="20" />
      </svg>

      <SparkleIcon size={18} color="#F5C518" className="absolute top-12 left-8" />
      <SparkleIcon size={12} color="#FFFFFF" className="absolute top-20 right-16" style={{ animationDelay: "1s" }} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-12 h-12 rounded-full bg-card-foreground/20 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-card-foreground/30 transition-colors"
      >
        <X size={22} className="text-card-foreground" />
      </button>

      {/* Pattern selector */}
      <div className="flex gap-2 mt-20 z-10">
        {patterns.map((p, i) => (
          <button
            key={p.label}
            onClick={() => handlePatternChange(i)}
            className={`px-4 py-2 rounded-pill text-sm font-body transition-all duration-200 ${
              i === patternIndex
                ? "bg-card-foreground text-background font-medium"
                : "bg-card-foreground/20 text-card-foreground/80"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Breathing circle */}
      <div className="relative flex items-center justify-center z-10">
        <svg width="260" height="260" className="transform -rotate-90">
          {/* Ghost circle */}
          <circle cx="130" cy="130" r="110" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
          {/* Progress arc */}
          <circle
            cx="130" cy="130" r="110"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            className="transition-[stroke-dashoffset] duration-100"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-heading font-bold text-card-foreground">{phaseText}</span>
          {phase !== "done" && phase !== "idle" && (
            <span className="text-sm text-card-foreground/70 mt-1 font-body">
              {totalBreaths - breathCount} breaths left
            </span>
          )}
        </div>
      </div>

      {/* Breath counter dots */}
      <div className="flex gap-2 mb-16 z-10">
        {Array.from({ length: totalBreaths }).map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i <= breathCount && phase !== "idle" ? "bg-card-foreground" : "bg-card-foreground/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BreatheScreen;
