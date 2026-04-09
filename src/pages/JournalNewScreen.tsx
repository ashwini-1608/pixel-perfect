import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const moods = ["😔", "😟", "😐", "🙂", "😄"];
const moodLabels = ["Awful", "Bad", "Meh", "Good", "Great"];

interface JournalNewScreenProps {
  onClose: () => void;
}

const JournalNewScreen = ({ onClose }: JournalNewScreenProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (selectedMood === null) {
      toast({ title: "Pick a mood first", description: "How are you feeling right now?" });
      return;
    }

    setSaving(true);

    // Try to get logged-in user; fall back to a fixed demo UUID
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id ?? "00000000-0000-0000-0000-000000000000";

    const { error } = await supabase.from("journal_entries").insert({
      user_id: userId,
      mood: selectedMood,
      text,
    });

    setSaving(false);

    if (error) {
      toast({ title: "Couldn't save", description: error.message });
      return;
    }

    toast({ title: "Entry saved ✨", description: "Keep showing up for yourself" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <div className="px-5 pt-8 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(180deg, #4C1D95 0%, #3B0764 100%)" }}>
          <button onClick={onClose} className="mb-4">
            <ArrowLeft size={22} className="text-card-foreground/70" />
          </button>
          <h1 className="text-2xl font-heading font-bold text-card-foreground">New Entry</h1>
          <p className="text-card-foreground/70 text-sm mt-1 font-body">How are you feeling?</p>
        </div>

        <div className="px-5 mt-6 pb-24">
          <div className="flex justify-between mb-2">
            {moods.map((emoji, i) => (
              <button
                key={i}
                onClick={() => setSelectedMood(i)}
                className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
                  selectedMood === i ? "bg-card scale-110" : "opacity-60 hover:opacity-100"
                }`}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-[10px] text-muted-foreground font-body">{moodLabels[i]}</span>
              </button>
            ))}
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your thoughts…"
            className="w-full mt-6 bg-card rounded-2xl p-4 text-sm text-card-foreground font-body placeholder:text-muted-foreground/50 resize-none focus:outline-none focus:ring-1 focus:ring-sera-purple/30 min-h-[180px]"
          />

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-6 py-3.5 rounded-pill text-card-foreground font-body font-medium text-sm transition-transform hover:scale-[1.02] disabled:opacity-50"
            style={{ background: "linear-gradient(135deg, #4C1D95, #6D28D9)" }}
          >
            {saving ? "Saving…" : "Save Entry"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalNewScreen;
