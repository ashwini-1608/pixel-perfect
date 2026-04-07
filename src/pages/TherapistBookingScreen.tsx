import { useState } from "react";
import { ArrowLeft, X, Check } from "lucide-react";
import { therapists, type Therapist } from "@/data/therapists";
import { useToast } from "@/hooks/use-toast";

interface TherapistBookingScreenProps {
  onClose: () => void;
}

const TherapistBookingScreen = ({ onClose }: TherapistBookingScreenProps) => {
  const [selected, setSelected] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const { toast } = useToast();

  const handleBook = () => {
    if (!selected || !selectedDate || !selectedSlot) return;
    setBooked(true);
    toast({
      title: "Session Booked! 🎉",
      description: `With ${selected.name} on ${formatDate(selectedDate)} at ${selectedSlot}`,
    });
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };

  if (booked && selected && selectedDate && selectedSlot) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-full bg-sera-green/20 flex items-center justify-center mb-6">
          <Check size={40} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-heading font-bold text-card-foreground mb-2">You're all set!</h2>
        <p className="text-sm text-muted-foreground font-body text-center mb-1">
          Session with <span className="text-card-foreground font-medium">{selected.name}</span>
        </p>
        <p className="text-sm text-muted-foreground font-body text-center mb-8">
          {formatDate(selectedDate)} at {selectedSlot}
        </p>
        <button
          onClick={onClose}
          className="px-8 py-3 rounded-pill bg-sera-green text-card-foreground font-body font-medium text-sm"
        >
          Done
        </button>
      </div>
    );
  }

  if (selected) {
    const dates = Object.keys(selected.availableSlots);
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="px-5 pt-8 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(180deg, #065F46 0%, #064E3B 100%)" }}>
            <button onClick={() => { setSelected(null); setSelectedDate(null); setSelectedSlot(null); }} className="mb-4">
              <ArrowLeft size={22} className="text-card-foreground/70" />
            </button>
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-card-foreground font-heading font-bold text-lg"
                style={{ background: selected.avatarColor }}
              >
                {selected.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-card-foreground">{selected.name}</h1>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {selected.specialty.map(s => (
                    <span key={s} className="text-[10px] bg-card-foreground/10 text-card-foreground/70 px-2 py-0.5 rounded-pill">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 mt-6 pb-24">
            <p className="text-sm text-muted-foreground font-body mb-6">{selected.bio}</p>

            <h3 className="text-sm font-heading font-bold text-card-foreground mb-3">Select a Date</h3>
            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
              {dates.map(date => (
                <button
                  key={date}
                  onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                  className={`px-4 py-2 rounded-xl text-xs font-body whitespace-nowrap transition-colors ${
                    selectedDate === date
                      ? "bg-sera-green text-card-foreground font-medium"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>

            {selectedDate && (
              <>
                <h3 className="text-sm font-heading font-bold text-card-foreground mt-5 mb-3">Select a Time</h3>
                <div className="grid grid-cols-3 gap-2">
                  {selected.availableSlots[selectedDate].map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2.5 rounded-xl text-xs font-body transition-colors ${
                        selectedSlot === slot
                          ? "bg-sera-green text-card-foreground font-medium"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}

            {selectedDate && selectedSlot && (
              <button
                onClick={handleBook}
                className="w-full mt-8 py-3.5 rounded-pill bg-sera-green text-card-foreground font-body font-medium text-sm transition-transform hover:scale-[1.02]"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Therapist list
  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <div className="px-5 pt-8 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(180deg, #065F46 0%, #064E3B 100%)" }}>
          <button onClick={onClose} className="mb-4">
            <ArrowLeft size={22} className="text-card-foreground/70" />
          </button>
          <h1 className="text-2xl font-heading font-bold text-card-foreground">Our Therapists</h1>
          <p className="text-card-foreground/70 text-sm mt-1 font-body">Choose someone you connect with</p>
        </div>

        <div className="px-5 mt-6 pb-24 space-y-3">
          {therapists.map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(t)}
              className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 text-left transition-transform hover:scale-[1.01]"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-card-foreground font-heading font-bold text-lg flex-shrink-0"
                style={{ background: t.avatarColor }}
              >
                {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-heading font-bold text-card-foreground">{t.name}</h3>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {t.specialty.map(s => (
                    <span key={s} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-pill">{s}</span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 font-body truncate">{t.bio}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TherapistBookingScreen;
