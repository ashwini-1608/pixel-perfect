export interface Sound {
  id: string;
  name: string;
  type: "Binaural" | "Healing" | "Nature" | "Noise";
  hz?: number;
  color: string;
  description: string;
  icon: string;
}

export const sounds: Sound[] = [
  { id: "delta", name: "Deep Sleep", type: "Binaural", hz: 2, color: "#1E3A5F", description: "Delta waves for deep sleep", icon: "🌙" },
  { id: "theta", name: "Ease Anxiety", type: "Binaural", hz: 6, color: "#2D1B69", description: "Theta waves — meditation and calm", icon: "☁️" },
  { id: "alpha", name: "Relax & Unwind", type: "Binaural", hz: 10, color: "#1A4A5A", description: "Alpha waves — gentle relaxation", icon: "🌊" },
  { id: "beta", name: "Focus & Clarity", type: "Binaural", hz: 18, color: "#1A3A2A", description: "Beta waves — concentration", icon: "💎" },
  { id: "gamma", name: "Elevated Mood", type: "Binaural", hz: 40, color: "#4A3000", description: "Gamma waves — uplift and cognition", icon: "☀️" },
  { id: "bowls", name: "Singing Bowls", type: "Healing", hz: 432, color: "#4A3800", description: "Tibetan bowls at 432Hz", icon: "🔔" },
  { id: "528hz", name: "Repair & Restore", type: "Healing", hz: 528, color: "#2A1A4A", description: "528Hz healing frequency", icon: "🧬" },
  { id: "ocean", name: "Ocean Waves", type: "Nature", color: "#0A2A4A", description: "Calm ocean sounds", icon: "🌊" },
  { id: "rain", name: "Rainfall", type: "Nature", color: "#1A2A3A", description: "Gentle rain on leaves", icon: "🌧️" },
  { id: "forest", name: "Forest", type: "Nature", color: "#0A2A1A", description: "Birds and rustling trees", icon: "🌲" },
  { id: "brown", name: "Brown Noise", type: "Noise", color: "#2A1A0A", description: "Deep rumbling calm noise", icon: "🟤" },
  { id: "white", name: "White Noise", type: "Noise", color: "#2A2A2A", description: "Constant white noise", icon: "⚪" },
];
