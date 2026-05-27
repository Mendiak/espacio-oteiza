"use client";

import { useMemo, useEffect, useState } from "react";
import MapGL, { Marker, MapRef } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTheme } from "next-themes";
import type { Artwork } from "@/lib/types";

interface MapProps {
  artworks: Artwork[];
  activeRegion: string | null;
  activeCategory: string | null;
  activeMaterial: string | null;
  onSelectArtwork: (artwork: Artwork) => void;
  mapRef: React.RefObject<MapRef | null> | null;
  lang: "es" | "en" | "eu";
}

const LIGHT_STYLE = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";
const DARK_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

export default function Map({ artworks, activeRegion, activeCategory, activeMaterial, onSelectArtwork, mapRef, lang }: MapProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const filteredArtworks = useMemo(() => {
    return artworks.filter(artwork => {
      if (activeRegion) {
        const country = artwork.country_en;
        const city = artwork.city_en;
        
        if (activeRegion === "Euskal Herria") {
          // Simplified for the mock data:
          if (!["Bilbao", "San Sebastian", "Agiña"].includes(city)) return false;
        } else if (activeRegion === "Spain") {
          if (country !== "Spain") return false;
          // Exclude EH cities if EH is a separate region filter
          if (["Bilbao", "San Sebastian", "Agiña"].includes(city)) return false;
        } else if (activeRegion === "Latin America") {
          if (!["Colombia", "Argentina", "Mexico", "Peru", "Chile"].includes(country)) return false;
        } else if (activeRegion === "World") {
          if (["Spain"].includes(country)) return false;
        }
      }
      
      if (activeCategory && artwork.category !== activeCategory) {
        return false;
      }

      if (activeMaterial && !artwork.material.includes(activeMaterial)) {
        return false;
      }
      
      return true;
    });
  }, [artworks, activeRegion, activeCategory, activeMaterial]);

  const getTitle = (artwork: Artwork) => {
    switch (lang) {
      case "en":
        return artwork.title_en;
      case "eu":
        return artwork.title_eu;
      case "es":
      default:
        return artwork.title_es;
    }
  };

  const getMarkerStyle = (category: string) => {
    switch (category) {
      case "intervention":
        return "bg-rust rotate-45 scale-110 border-offwhite";
      case "unbuilt":
        return "bg-charcoal/30 border-charcoal/20 opacity-60 scale-90 dashed";
      case "built":
      default:
        return "bg-charcoal border-offwhite";
    }
  };

  return (
    <div className="absolute inset-0 z-0 transition-opacity duration-1000">
      <MapGL
        ref={mapRef}
        initialViewState={{
          longitude: -3.0,
          latitude: 42.0,
          zoom: 4,
          pitch: 10,
        }}
        mapStyle={mounted && theme === "dark" ? DARK_STYLE : LIGHT_STYLE}
        mapLib={maplibregl}
        attributionControl={false}
      >
        {filteredArtworks.map(artwork => (
          <Marker
            key={artwork.id}
            longitude={artwork.longitude}
            latitude={artwork.latitude}
            anchor="center"
            onClick={e => {
              e.originalEvent.stopPropagation();
              mapRef?.current?.flyTo({
                center: [artwork.longitude, artwork.latitude],
                zoom: 13,
                pitch: 45,
                duration: 2500,
                essential: true,
              });
              onSelectArtwork(artwork);
            }}
          >
            <div className="group relative cursor-pointer">
              <div className={`w-4 h-4 border-2 transition-all duration-700 ease-in-out shadow-lg group-hover:scale-150 group-hover:bg-rust ${getMarkerStyle(artwork.category)}`} />
              
              <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none whitespace-nowrap bg-offwhite/80 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest text-charcoal border border-charcoal/10">
                {getTitle(artwork)}
              </div>
            </div>
          </Marker>
        ))}
      </MapGL>
    </div>
  );
}
