"use client";

import { useMemo, useRef } from "react";
import MapGL, { Marker, MapRef } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Artwork } from "@/lib/types";

interface MapProps {
  artworks: Artwork[];
  activeRegion: string | null;
  activeTheme: string | null;
  onSelectArtwork: (artwork: Artwork) => void;
  mapRef: React.RefObject<MapRef> | null;
  lang: "es" | "en" | "eu";
}

export default function Map({ artworks, activeRegion, activeTheme, onSelectArtwork, mapRef, lang }: MapProps) {

  const filteredArtworks = useMemo(() => {
    return artworks.filter(artwork => {
      if (activeRegion) {
        if (activeRegion === "Euskal Herria" && !["Bilbao", "San Sebastián", "Agiña"].includes(artwork.city)) return false;
        if (activeRegion === "Spain" && artwork.country !== "Spain") return false;
        if (activeRegion === "Latin America" && artwork.country !== "Colombia") return false;
        if (activeRegion === "World" && ["Spain"].includes(artwork.country)) return false;
      }
      if (activeTheme && !artwork.themes.includes(activeTheme)) {
        return false;
      }
      return true;
    });
  }, [artworks, activeRegion, activeTheme]);

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

  return (
    <div className="absolute inset-0 z-0">
      <MapGL
        ref={mapRef}
        initialViewState={{
          longitude: -3.0,
          latitude: 42.0,
          zoom: 4,
          pitch: 10,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
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
              <div className="w-4 h-4 bg-charcoal border-2 border-[#F4F4F0] group-hover:bg-rust group-hover:scale-150 group-hover:rotate-45 transition-all duration-700 ease-in-out shadow-lg" />
              
              <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none whitespace-nowrap bg-white/80 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest text-charcoal border border-concrete/20">
                {getTitle(artwork)}
              </div>
            </div>
          </Marker>
        ))}
      </MapGL>
    </div>
  );
}
