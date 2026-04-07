import { useState } from "react";
import MascotSera from "@/components/MascotSera";
import CloudScene from "@/components/CloudScene";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Welcome to Serenova",
    subtitle: "Your safe space for mental wellness",
    mood: "happy" as const,
    mascotSize: "xl" as const,
  },
  {
    title: "Breathe & Ground",
    subtitle: "Guided breathing exercises and grounding techniques to calm your mind instantly",
    mood: "breathing" as const,
    mascotSize: "lg" as const,
  },
  {
    title: "Journal & Reflect",
    subtitle: "Express your thoughts freely — shred them, save them, or let them float away",
    mood: "idle" as const,
    mascotSize: "lg" as const,
  },
  {
    title: "You're Not Alone",
    subtitle: "Access crisis support, connect with therapists, and explore calming resources anytime",
    mood: "happy" as const,
    mascotSize: "lg" as const,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  const next = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrent((p) => p + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto flex flex-col">
      {/* Hero with cloud scene */}
      <CloudScene bgColor="bg-gradient-to-b from-sera-orange/80 to-sera-orange/40">
        <MascotSera size={slide.mascotSize} mood={slide.mood} className="mt-4" />
      </CloudScene>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between px-8 py-8">
        <div className="text-center animate-fade-in-up" key={current}>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-3">
            {slide.title}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px] mx-auto">
            {slide.subtitle}
          </p>
        </div>

        {/* Dots + actions */}
        <div className="w-full flex flex-col items-center gap-6 pb-4">
          {/* Pagination dots */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-sera-orange"
                    : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-3">
            <Button
              onClick={next}
              className="w-full h-12 rounded-full bg-sera-orange hover:bg-sera-orange/90 text-white font-heading font-bold text-base gap-2"
            >
              {isLast ? "Get Started" : "Next"}
              <ChevronRight size={18} />
            </Button>

            {!isLast && (
              <button
                onClick={onComplete}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
