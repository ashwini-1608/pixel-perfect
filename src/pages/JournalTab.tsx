import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const moods = ["😔", "😟", "😐", "🙂", "😄"];
const moodColors = ["#EF4444", "#F59E0B", "#6B7280", "#3B82F6", "#10B981"];

interface JournalEntry {
  id: string;
  created_at: string;
  mood: number;
  text: string;
}

interface JournalTabProps {
  onNavigate: (screen: string) => void;
}

const JournalTab = ({ onNavigate }: JournalTabProps) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    const { data } = await supabase
      .from("journal_entries")
      .select("id, created_at, mood, text")
      .order("created_at", { ascending: false });
    if (data) setEntries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Refetch when returning from new-entry overlay
  useEffect(() => {
    const handleFocus = () => fetchEntries();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Calculate streak
  const streak = (() => {
    if (entries.length === 0) return 0;
    let count = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < entries.length; i++) {
      const entryDate = new Date(entries[i].created_at);
      entryDate.setHours(0, 0, 0, 0);
      const expected = new Date(today);
      expected.setDate(expected.getDate() - count);
      if (entryDate.getTime() === expected.getTime()) {
        count++;
      } else if (i === 0 && entryDate.getTime() === new Date(today.getTime() - 86400000).getTime()) {
        // Allow starting from yesterday
        count++;
      } else {
        break;
      }
    }
    return count;
  })();

  return (
    <div className="pb-24">
      <div className="px-5 pt-8 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(180deg, #4C1D95 0%, #3B0764 100%)" }}>
        <h1 className="text-2xl font-heading font-bold text-card-foreground">Journal</h1>
        <p className="text-card-foreground/70 text-sm mt-1 font-body">Your thoughts, your space</p>
      </div>

      <div className="px-5 mt-6">
        {streak > 0 && (
          <div className="bg-sera-orange/15 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <span className="text-xl">🔥</span>
            <p className="text-sm text-sera-orange font-body font-medium">
              {streak} day streak — you're building something beautiful
            </p>
          </div>
        )}

        {loading ? (
          <p className="text-muted-foreground text-sm text-center py-8 font-body">Loading…</p>
        ) : entries.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8 font-body">
            No entries yet. Tap + to start journaling.
          </p>
        ) : (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-card rounded-2xl p-4 flex gap-3 overflow-hidden relative"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: moodColors[entry.mood] }} />
                <div className="pl-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground font-body">
                      {format(new Date(entry.created_at), "MMMM d, yyyy")}
                    </span>
                    <span className="text-sm">{moods[entry.mood]}</span>
                  </div>
                  <p className="text-sm text-card-foreground/80 truncate font-body">{entry.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onNavigate("journal-new")}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full bg-sera-orange flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-30"
      >
        <Plus size={24} className="text-card-foreground" />
      </button>
    </div>
  );
};

export default JournalTab;
