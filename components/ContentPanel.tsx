import { ReportSection } from "@/data/reportContent";
import { X, ArrowLeft } from "lucide-react";

interface ContentPanelProps {
  section: ReportSection | null;
  onClose: () => void;
}

export const ContentPanel = ({ section, onClose }: ContentPanelProps) => {
  if (!section) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Content */}
      <div
        className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto glass-panel animate-scale-in"
        style={{
          boxShadow: `0 0 80px ${section.color}30, 0 0 120px ${section.color}20`,
        }}>
        {/* Header */}
        <div
          className="sticky top-0 z-10 p-6 border-b border-border/50 backdrop-blur-xl"
          style={{
            background: `linear-gradient(135deg, ${section.color}15, transparent)`,
          }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: section.color,
                boxShadow: `0 0 20px ${section.color}`,
              }}
            />
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
              {section.subtitle}
            </span>
          </div>

          <h2
            className="font-display text-3xl md:text-4xl font-bold"
            style={{
              color: section.color,
              textShadow: `0 0 40px ${section.color}60`,
            }}>
            {section.content.heading}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {section.content.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-foreground/90 text-lg leading-relaxed animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "backwards",
              }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border/50">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to the universe</span>
          </button>
        </div>
      </div>
    </div>
  );
};
