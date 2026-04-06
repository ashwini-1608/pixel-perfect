import { Phone } from "lucide-react";

interface SOSButtonProps {
  onClick: () => void;
}

const SOSButton = ({ onClick }: SOSButtonProps) => (
  <button
    onClick={onClick}
    className="fixed bottom-20 right-4 z-40 w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
    style={{ background: "#C0392B" }}
    aria-label="SOS — Get help now"
  >
    <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(192,57,43,0.4)" }} />
    <Phone size={22} className="text-card-foreground relative z-10" />
  </button>
);

export default SOSButton;
