import { useState } from "react";
import { BookOpen, Calendar, ChevronRight } from "lucide-react";
import { articles } from "@/data/articles";
import { therapists } from "@/data/therapists";

const categories = ["All", "Anxiety", "CBT", "Mindfulness", "Sleep", "Stress"];

interface CounsellingTabProps {
  onNavigate: (screen: string) => void;
}

const CounsellingTab = ({ onNavigate }: CounsellingTabProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = selectedCategory === "All"
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="pb-24">
      {/* Green header */}
      <div className="px-5 pt-8 pb-6 rounded-b-[2rem]" style={{ background: "linear-gradient(180deg, #065F46 0%, #064E3B 100%)" }}>
        <h1 className="text-2xl font-heading font-bold text-card-foreground">Resources</h1>
        <p className="text-card-foreground/70 text-sm mt-1 font-body">Learn and get support</p>
      </div>

      <div className="px-5 mt-6">
        {/* Book a session CTA */}
        <button
          onClick={() => onNavigate("therapists")}
          className="w-full rounded-2xl p-5 mb-6 flex items-center justify-between transition-transform duration-200 hover:scale-[1.01]"
          style={{ background: "linear-gradient(135deg, #065F46 0%, #047857 100%)" }}
        >
          <div className="flex items-center gap-3">
            <Calendar size={24} className="text-card-foreground/70" />
            <div className="text-left">
              <h3 className="text-sm font-heading font-bold text-card-foreground">Book a Session</h3>
              <p className="text-xs text-card-foreground/60 font-body">Find a therapist and schedule</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-card-foreground/40" />
        </button>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-pill text-xs font-body whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-sera-green text-card-foreground font-medium"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles */}
        <div className="mt-4 space-y-3">
          {filtered.map((article) => (
            <div
              key={article.id}
              className="bg-card rounded-2xl p-4 transition-transform duration-200 hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-sera-green bg-sera-green/15 px-2 py-0.5 rounded-pill font-body">
                    {article.category}
                  </span>
                  <h3 className="text-sm font-heading font-bold text-card-foreground mt-2">{article.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 font-body">{article.summary}</p>
                  <span className="text-[10px] text-muted-foreground mt-2 inline-block font-body">{article.readTime} min read</span>
                </div>
                <BookOpen size={18} className="text-muted-foreground/30 ml-3 flex-shrink-0 mt-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Therapists preview */}
        <div className="mt-8">
          <h2 className="text-lg font-heading font-bold text-card-foreground mb-3">Our Therapists</h2>
          <div className="space-y-3">
            {therapists.slice(0, 2).map((t) => (
              <div key={t.id} className="bg-card rounded-2xl p-4 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-card-foreground font-heading font-bold text-lg"
                  style={{ background: t.avatarColor }}
                >
                  {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-heading font-bold text-card-foreground">{t.name}</h3>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {t.specialty.map((s) => (
                      <span key={s} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded-pill">{s}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => onNavigate("therapists")}
                  className="text-xs bg-sera-green/20 text-emerald-400 px-3 py-1.5 rounded-pill font-body font-medium"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounsellingTab;
