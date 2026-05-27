"use client";

import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import Landing from "@/components/Landing";
import Map from "@/components/Map";
import ArtworkPanel from "@/components/ArtworkPanel";
import Filters from "@/components/Filters";
import AboutPanel from "@/components/AboutPanel";
import artworksData from "@/data/artworks.json";
import type { Artwork } from "@/lib/types";
import type { MapRef } from "react-map-gl/maplibre";

export default function Home() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [lang, setLang] = useState<"es" | "en" | "eu">("es");
  const [aboutOpen, setAboutOpen] = useState(false);
  
  const mapRef = useRef<MapRef>(null);

  const artworks = artworksData as Artwork[];

  const handleResetView = () => {
    // Reset filters
    setActiveRegion(null);
    setActiveTheme(null);
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
    <main className="relative w-full h-screen overflow-hidden bg-[#F4F4F0]">
      <Landing />
      <Navigation lang={lang} setLang={setLang} onAboutClick={() => setAboutOpen(true)} />
      
      <Map 
        mapRef={mapRef}
        artworks={artworks}
        activeRegion={activeRegion}
        activeTheme={activeTheme}
        onSelectArtwork={setSelectedArtwork}
        lang={lang}
      />
      
      <Filters 
        activeRegion={activeRegion}
        setActiveRegion={setActiveRegion}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        onResetView={handleResetView}
      />
      
      <ArtworkPanel 
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        lang={lang}
      />
    </main>
  );
}
