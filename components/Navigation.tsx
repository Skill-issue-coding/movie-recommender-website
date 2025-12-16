import { reportSections } from "@/data/reportContent";

interface NavigationProps {
  activeSection: string | null;
  onNavigate: (sectionId: string) => void;
}

export const Navigation = ({ activeSection, onNavigate }: NavigationProps) => {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="glass-panel px-4 py-3 flex items-center gap-2">
        {reportSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`
              relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${
                activeSection === section.id
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
            `}
            style={{
              backgroundColor: activeSection === section.id ? section.color : "transparent",
              boxShadow: activeSection === section.id ? `0 0 20px ${section.color}50` : "none",
            }}>
            <span className="hidden md:inline">{section.title}</span>
            <span
              className="md:hidden w-3 h-3 rounded-full block"
              style={{ backgroundColor: section.color }}
            />
          </button>
        ))}
      </div>
    </nav>
  );
};
