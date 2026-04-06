import { cn } from "@/lib/utils";

const sizes = {
  sm: 60,
  md: 100,
  lg: 160,
  xl: 220,
};

interface MascotSeraProps {
  size?: keyof typeof sizes;
  mood?: "idle" | "breathing" | "happy" | "sleeping";
  className?: string;
}

const MascotSera = ({ size = "md", mood = "idle", className }: MascotSeraProps) => {
  const s = sizes[size];
  const eyeScale = s / 100;

  const animClass =
    mood === "idle" ? "animate-float-gentle" :
    mood === "sleeping" ? "animate-float-slow" :
    mood === "breathing" ? "animate-float-gentle" : "";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={s} height={s} viewBox="0 0 100 100" className={animClass}>
        {/* Body */}
        <circle cx="50" cy="50" r="46" fill="#F5820A" />
        {/* Left eye */}
        <path
          d={`M ${30 * eyeScale + (50 - 50 * eyeScale)} ${42} Q ${36 * eyeScale + (50 - 50 * eyeScale)} ${36} ${42 * eyeScale + (50 - 50 * eyeScale)} ${42}`}
          stroke="#2D2D2D"
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
        />
        {/* Right eye */}
        <path
          d={`M ${58 * eyeScale + (50 - 50 * eyeScale)} ${42} Q ${64 * eyeScale + (50 - 50 * eyeScale)} ${36} ${70 * eyeScale + (50 - 50 * eyeScale)} ${42}`}
          stroke="#2D2D2D"
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
        />
        {/* Smile */}
        <path
          d="M 38 56 Q 50 66 62 56"
          stroke="#2D2D2D"
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default MascotSera;
