import { ChevronDown, MousePointer2 } from "lucide-react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
});

interface HeroOverlayProps {
  isVisible: boolean;
}

export const HeroOverlay = ({ isVisible }: HeroOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex flex-col items-center justify-between py-12">
      {/* Header */}
      <div className="text-center px-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <h1
          className={`font-display text-4xl md:text-6xl lg:text-7xl font-bold text-glow mb-4 ${orbitron.className}`}>
          Interaktiv Projektrapport
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Utforska vår forskning genom ett interaktivt universum. Varje planet representerar en del
          av rapporten.
        </p>
      </div>

      {/* Instructions */}
      <div
        className="glass-panel px-6 py-4 text-center animate-fade-in pointer-events-auto"
        style={{ animationDelay: "1s" }}>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MousePointer2 className="w-4 h-4 text-primary" />
            <span>Klicka på en planet för att läsa</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-primary">🖱️</span>
            <span>Dra för att rotera</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-primary">⚙️</span>
            <span>Scrolla för att zooma</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="animate-fade-in flex flex-col items-center gap-2"
        style={{ animationDelay: "1.5s" }}>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Börja utforska
        </span>
        <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
      </div>
    </div>
  );
};
