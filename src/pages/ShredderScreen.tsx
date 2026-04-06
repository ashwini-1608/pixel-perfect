import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import SparkleIcon from "@/components/SparkleIcon";

interface ShredderScreenProps {
  onClose: () => void;
}

const ShredderScreen = ({ onClose }: ShredderScreenProps) => {
  const [text, setText] = useState("");
  const [animating, setAnimating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);

  const release = () => {
    if (!text.trim() || animating) return;
    setAnimating(true);

    // Text fades out
    setTimeout(() => {
      setText("");
      setBubbleVisible(true);

      // Bubble floats up and pops
      setTimeout(() => {
        setBubbleVisible(false);
        setShowMessage(true);

        // Message fades out
        setTimeout(() => {
          setShowMessage(false);
          setAnimating(false);
        }, 2500);
      }, 1800);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "linear-gradient(180deg, #1E1B4B 0%, #0F0D2E 100%)" }}>
      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <SparkleIcon
          key={i}
          size={6 + Math.random() * 8}
          color={i % 2 === 0 ? "#F5C518" : "#FFFFFF"}
          className="absolute opacity-40"
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}

      {/* Back */}
      <button
        onClick={onClose}
        className="absolute top-5 left-5 z-10 text-card-foreground/70 hover:text-card-foreground transition-colors"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        {/* Bubble animation */}
        {bubbleVisible && (
          <div
            className="absolute w-20 h-20 rounded-full"
            style={{
              background: "linear-gradient(135deg, #D946EF, #8B5CF6)",
              animation: "bubble-float 1.8s ease-out forwards",
            }}
          />
        )}

        {/* Released message */}
        {showMessage && (
          <p className="text-card-foreground/80 text-sm font-body animate-fade-in-up text-center">
            Released. Not saved. Gone.
          </p>
        )}

        {/* Input area */}
        {!showMessage && !bubbleVisible && (
          <>
            <p className="text-muted-foreground text-sm mb-6 font-body">What's on your mind?</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type it all out..."
              className={`w-full max-w-sm h-40 bg-transparent border-none text-card-foreground placeholder:text-card-foreground/25 text-lg font-body outline-none resize-none text-center transition-opacity duration-300 ${
                animating ? "opacity-0" : "opacity-100"
              }`}
            />
          </>
        )}
      </div>

      <div className="px-6 pb-10">
        <button
          onClick={release}
          disabled={!text.trim() || animating}
          className="w-full py-3.5 rounded-pill text-card-foreground font-body font-bold text-sm disabled:opacity-30 transition-colors"
          style={{ background: "#2563EB" }}
        >
          Let it go →
        </button>
      </div>
    </div>
  );
};

export default ShredderScreen;
