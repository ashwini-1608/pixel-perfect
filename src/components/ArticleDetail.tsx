import { ArrowLeft } from "lucide-react";
import type { Article } from "@/data/articles";

interface ArticleDetailProps {
  article: Article;
  onClose: () => void;
}

const ArticleDetail = ({ article, onClose }: ArticleDetailProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
      <div
        className="px-5 pt-6 pb-5 rounded-b-[2rem]"
        style={{ background: "linear-gradient(180deg, #065F46 0%, #064E3B 100%)" }}
      >
        <button
          onClick={onClose}
          className="mb-3 text-card-foreground/70 hover:text-card-foreground transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <span className="text-[10px] text-emerald-300 bg-emerald-400/15 px-2 py-0.5 rounded-full font-body">
          {article.category}
        </span>
        <h1 className="text-2xl font-heading font-bold text-card-foreground mt-2">
          {article.title}
        </h1>
        <p className="text-card-foreground/60 text-xs mt-1 font-body">
          {article.readTime} min read
        </p>
      </div>

      <div className="px-5 py-6 pb-10">
        {article.content.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className="text-sm text-card-foreground/80 font-body leading-relaxed mb-4"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
