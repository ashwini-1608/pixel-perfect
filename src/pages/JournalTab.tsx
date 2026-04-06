import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";

const moods = ["😔", "😟", "😐", "🙂", "😄"];
const moodColors = ["#EF4444", "#F59E0B", "#6B7280", "#3B82F6", "#10B981"];

interface JournalEntry {
  id: string;
  date: string;
  mood: number;
  text: string;
}

interface JournalTabProps {
  onNavigate: (screen: string) => void;
}

const JournalTab = ({ onNavigate }: JournalTabProps) => {
  const [entries] = useState<JournalEntry[]>([
    { id: "1", date: "April 5, 2026", mood: 3, text: "Felt productive today. The morning meditation really helped me focus. I want to try doing it every day this week." },
    { id: "2", date: "April 4, 2026", mood: 4, text: "Had a great day. Called an old friend and we talked for an hour. Reminded me how important connection is." },
    { id: "3", date: "April 3, 2026", mood: 2, text: "Struggled with anxiety today. Used the breathing exercise and it helped calm down after a few minutes." },
  ]);

  return (
    <div className="pb-24">
      {/* Purple header */}
      <div className="px-5 pt-8 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(180deg, #4C1D95 0%, #3B0764 100%)" }}>
        <h1 className="text-2xl font-heading font-bold text-card-foreground">Journal</h1>
        <p className="text-card-foreground/70 text-sm mt-1 font-body">Your thoughts, your space</p>
      </div>

      <div className="px-5 mt-6">
        {/* Streak banner */}
        <div className="bg-sera-orange/15 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <span className="text-xl">🔥</span>
          <p className="text-sm text-sera-orange font-body font-medium">3 day streak — you're building something beautiful</p>
        </div>

        {/* Entries */}
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-card rounded-2xl p-4 flex gap-3 overflow-hidden relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: moodColors[entry.mood] }} />
              <div className="pl-2 flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground font-body">{entry.date}</span>
                  <span className="text-sm">{moods[entry.mood]}</span>
                </div>
                <p className="text-sm text-card-foreground/80 truncate font-body">{entry.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
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
