"use client";

import { useCallback, useState } from "react";
import { ReportSection, reportSections } from "../data/reportContent";
import { ContentPanel } from "@/components/ContentPanel";
import { Navigation } from "@/components/Navigation";
import { HeroOverlay } from "@/components/HeroOverlay";
import { SpaceScene } from "@/components/SpaceScene";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<ReportSection | null>(null);
  const [targetSection, setTargetSection] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePlanetClick = useCallback((section: ReportSection) => {
    setSelectedSection(section);
    setTargetSection(section.id);
    setHasInteracted(true);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedSection(null);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    setHasInteracted(true);
    setTargetSection(sectionId);

    const section = reportSections.find((s) => s.id === sectionId);
    if (section) {
      // Delay opening content to allow camera to move
      setTimeout(() => {
        setSelectedSection(section);
      }, 1000);
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* 3D Scene */}
      <SpaceScene
        onPlanetClick={handlePlanetClick}
        activeSection={targetSection}
        targetSection={targetSection}
      />

      {/* Hero Overlay */}
      <HeroOverlay isVisible={!hasInteracted} />

      {/* Navigation */}
      <Navigation activeSection={targetSection} onNavigate={handleNavigate} />

      {/* Content Panel */}
      <ContentPanel section={selectedSection} onClose={handleClosePanel} />
    </main>
  );
}
