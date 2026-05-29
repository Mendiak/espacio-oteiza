"use client";

import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Landing from "@/components/Landing";
import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";
import Filters from "@/components/Filters";
import AboutPanel from "@/components/AboutPanel";
import CustomCursor from "@/components/CustomCursor";
import artworksData from "@/data/artworks.json";
import type { Artwork } from "@/lib/types";
import type { MapRef } from "react-map-gl/maplibre";

export default function Home() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [lang, setLang] = useState<"es" | "en" | "eu">("es");
  const [aboutOpen, setAboutOpen] = useState(false);

  // Detect browser language on mount
  useEffect(() => {
    const browserLang = navigator.language?.split("-")[0];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (browserLang === "en" || browserLang === "eu") setLang(browserLang);
  }, []);
  
  const mapRef = useRef<MapRef | null>(null);

  const artworks = artworksData as Artwork[];

  const handleSelectArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [artwork.longitude, artwork.latitude],
        zoom: 13,
        pitch: 45,
        duration: 2500,
        essential: true,
      });
    }
  };

  const handleResetView = () => {
    // Reset filters
    setActiveRegion(null);
    setActiveCategory(null);
    setActiveMaterial(null);
    // Close artwork panel
    setSelectedArtwork(null);
    
    // Animate map back to initial view
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [-3.0, 42.0],
        zoom: 4,
        pitch: 10,
        duration: 2500,
        essential: true
      });
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-offwhite transition-colors duration-500">
      <CustomCursor />
      <Landing lang={lang} />
      
      {/* Layout Grid / Margins for "Spatial Air" */}
      <div className="absolute inset-4 md:inset-8 pointer-events-none z-20 border border-charcoal/5 pointer-events-none" />

      <Navigation lang={lang} setLang={setLang} onAboutClick={() => setAboutOpen(true)} />
      
      <Map 
        mapRef={mapRef}
        artworks={artworks}
        activeRegion={activeRegion}
        activeCategory={activeCategory}
        activeMaterial={activeMaterial}
        onSelectArtwork={setSelectedArtwork}
        lang={lang}
      />
      
      <div className="absolute bottom-8 right-8 z-30">
        <Filters 
          activeRegion={activeRegion}
          setActiveRegion={setActiveRegion}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeMaterial={activeMaterial}
          setActiveMaterial={setActiveMaterial}
          onResetView={handleResetView}
          lang={lang}
        />
      </div>
      
      <Sidebar 
        artworks={artworks}
        lang={lang}
        selectedArtwork={selectedArtwork}
        onClearSelection={() => setSelectedArtwork(null)}
        onSelectArtwork={handleSelectArtwork}
        activeRegion={activeRegion}
        activeCategory={activeCategory}
        activeMaterial={activeMaterial}
      />

      <AboutPanel 
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        lang={lang}
      />


    </main>
  );
}
