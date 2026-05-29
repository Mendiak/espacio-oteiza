"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Box, Maximize2, ChevronLeft, Crosshair, Copy } from "lucide-react";
import type { Artwork } from "@/lib/types";

interface SidebarProps {
  artworks: Artwork[];
  lang: "es" | "en" | "eu";
  selectedArtwork?: Artwork | null;
  onClearSelection?: () => void;
  onSelectArtwork?: (artwork: Artwork) => void;
  activeRegion?: string | null;
  activeCategory?: string | null;
  activeMaterial?: string | null;
}

const T = {
  materials: { es: "Materiales", en: "Materials", eu: "Materialak" },
  spatiality: { es: "Espacialidad", en: "Spatiality", eu: "Espazialitatea" },
  built: { es: "Obra Construida", en: "Built Work", eu: "Eraikitako Obra" },
  intervention: { es: "Intervención", en: "Intervention", eu: "Interbentzioa" },
  unbuilt: { es: "No Realizada", en: "Unbuilt", eu: "Eraiki Gabea" },
  visual: { es: "Archivo Visual", en: "Visual Archive", eu: "Artxibo Bisuala" },
  sculpture: { es: "Escultura", en: "Sculpture", eu: "Eskultura" },
  landscape: { es: "Paisaje", en: "Landscape", eu: "Paisaia" },
  monument: { es: "Monumento", en: "Monument", eu: "Monumentua" },
  project: { es: "Proyecto", en: "Project", eu: "Proiektua" },
  location: { es: "Ubicación", en: "Location", eu: "Kokalekua" },
  coordinates: { es: "Coordenadas", en: "Coordinates", eu: "Koordenadak" },
  year: { es: "Año", en: "Year", eu: "Urtea" },
  steel: { es: "Acero", en: "Steel", eu: "Altzairua" },
  iron: { es: "Hierro", en: "Iron", eu: "Burdina" },
  stone: { es: "Piedra", en: "Stone", eu: "Harria" },
  bronze: { es: "Bronce", en: "Bronze", eu: "Brontzea" },
};

const EUSKAL_HERRIA_CITIES = [
  "Agiña",
  "Bilbao",
  "Oñati",
  "Pamplona",
  "San Sebastian",
];

const LATIN_AMERICA_COUNTRIES = [
  "Argentina",
  "Chile",
  "Colombia",
  "Mexico",
  "Peru",
  "Uruguay",
];

export default function Sidebar({ artworks, lang, selectedArtwork, onClearSelection, onSelectArtwork, activeRegion, activeCategory, activeMaterial }: SidebarProps) {
  const [listSelected, setListSelected] = useState<Artwork | null>(null);

  const filteredArtworks = artworks.filter(artwork => {
    if (activeRegion) {
      const country = artwork.country_en;
      const city = artwork.city_en;
      if (activeRegion === "Euskal Herria") {
        if (!EUSKAL_HERRIA_CITIES.includes(city)) return false;
      } else if (activeRegion === "Spain") {
        if (country !== "Spain") return false;
        if (EUSKAL_HERRIA_CITIES.includes(city)) return false;
      } else if (activeRegion === "Latin America") {
        if (!LATIN_AMERICA_COUNTRIES.includes(country)) return false;
      } else if (activeRegion === "World") {
        if (["Spain"].includes(country)) return false;
      }
    }
    if (activeCategory && artwork.category !== activeCategory) return false;
    if (activeMaterial && !artwork.material.includes(activeMaterial)) return false;
    return true;
  });

  // Use external selection (map marker) when set, otherwise local list selection
  const activeArtwork = selectedArtwork ?? listSelected;
  const isDetail = activeArtwork !== null;

  const t = (key: string) => {
    const entry = (T as Record<string, Record<string, string>>)[key];
    return entry?.[lang] ?? key;
  };

  const getLocalized = (artwork: Artwork, field: string) => {
    const key = `${field}_${lang}` as keyof Artwork;
    return artwork[key] as string;
  };

  const handleSelect = (artwork: Artwork) => {
    setListSelected(artwork);
    onClearSelection?.();
    onSelectArtwork?.(artwork);
  };

  const handleBack = () => {
    setListSelected(null);
    if (selectedArtwork) onClearSelection?.();
  };

  const title = (artwork: Artwork) =>
    getLocalized(artwork, "title")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();

  return (
    <motion.aside
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 bottom-0 w-[min(430px,100vw)] bg-offwhite z-40 border-r border-charcoal/10 shadow-2xl flex flex-col transition-colors duration-500 oteiza-grain"
    >
      {/* Header */}
      <div className="shrink-0 p-6 pb-4">
        <h1 className="text-2xl uppercase tracking-tighter text-charcoal drop-shadow-md bg-offwhite/50 px-2 py-1 backdrop-blur-md transition-colors duration-500 mb-3">
          espacio oteiza
        </h1>
        <div className="flex items-center gap-3 mb-1">
          {isDetail && (
            <button
              onClick={handleBack}
              className="p-1.5 -ml-1.5 text-concrete hover:text-rust transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
          )}
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-charcoal transition-colors duration-500">
            {isDetail ? "Ficha" : "Archivo"}
          </span>
        </div>
        <div className="w-full h-px bg-charcoal/15 transition-colors duration-500 mt-3" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <AnimatePresence mode="wait">
          {!isDetail ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              {filteredArtworks.map((artwork) => (
                <button
                  key={artwork.id}
                  onClick={() => handleSelect(artwork)}
                  className="flex gap-4 text-left w-full p-3 border border-charcoal/5 hover:border-charcoal/20 bg-offwhite hover:bg-charcoal/[0.02] transition-all duration-300 group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 shrink-0 bg-charcoal/5 border border-charcoal/10 overflow-hidden flex items-center justify-center">
                    {artwork.image && !artwork.image.includes("placeholder") ? (
                      <img
                        src={artwork.image}
                        alt={getLocalized(artwork, "title")}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-10 h-10 border border-concrete/20 rotate-45 flex items-center justify-center">
                        <div className="w-6 h-6 border border-rust/20 -rotate-12" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs uppercase tracking-[0.05em] text-charcoal font-medium leading-snug transition-colors duration-500 line-clamp-2">
                      {title(artwork)}
                    </h3>
                    <div className="flex flex-col gap-0.5 mt-1.5">
                      <span className="text-[9px] uppercase tracking-[0.15em] text-concrete font-medium">
                        {artwork.year}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.15em] text-concrete font-medium truncate">
                        {getLocalized(artwork, "city")}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.15em] text-concrete font-medium truncate">
                        {t(artwork.category)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {artwork.material.map((m) => (
                        <span
                          key={m}
                          className="px-1.5 py-[1px] bg-charcoal/5 text-[7px] uppercase tracking-widest text-concrete font-semibold rounded-[1px]"
                        >
                          {t(m)}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          ) : activeArtwork ? (
            <DetailView
              key="detail"
              artwork={activeArtwork}
              t={t}
              getLocalized={getLocalized}
              title={title}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}

function DetailView({
  artwork,
  t,
  getLocalized,
  title,
}: {
  artwork: Artwork;
  t: (key: string) => string;
  getLocalized: (artwork: Artwork, field: string) => string;
  title: (artwork: Artwork) => string;
}) {
  const [copied, setCopied] = useState(false);
  const city = getLocalized(artwork, "city");
  const country = getLocalized(artwork, "country");
  const description = getLocalized(artwork, "description");
  const materialsText = getLocalized(artwork, "materials");

  const copyCoords = () => {
    navigator.clipboard.writeText(`${artwork.latitude}, ${artwork.longitude}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Image */}
      <div className="relative h-[260px] bg-charcoal/5 border border-charcoal/10 overflow-hidden mb-6 transition-colors duration-500 group/img">
        {artwork.image && !artwork.image.includes("placeholder") ? (
          <>
            <img
              src={artwork.image}
              alt={getLocalized(artwork, "title")}
              className="w-full h-full object-contain grayscale filter transition-all duration-1000 group-hover/img:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border border-concrete/20 rotate-45 flex items-center justify-center">
              <div className="w-10 h-10 border border-rust/20 -rotate-12" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-concrete/60 font-semibold">
              {t("visual")}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-4 flex gap-2">
          {artwork.material.map((m) => (
            <span
              key={m}
              className="px-2 py-0.5 bg-offwhite/90 backdrop-blur-sm border border-charcoal/10 text-[8px] uppercase tracking-widest text-charcoal/70 font-bold rounded-sm"
            >
              {t(m)}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 text-rust mb-2">
            <div className="w-6 h-px bg-rust/30" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
              {t(artwork.category)}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl mb-4 leading-[1.1] text-charcoal font-light tracking-tight transition-colors duration-500">
            {title(artwork)}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <Calendar size={13} className="text-concrete mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider text-concrete font-bold">{t("year")}</span>
                <span className="text-xs text-charcoal font-medium">{artwork.year}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-concrete mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-wider text-concrete font-bold">{t("location")}</span>
                <span className="text-xs text-charcoal font-medium truncate">{city}, {country}</span>
              </div>
            </div>
          </div>

          <div
            className="flex items-start gap-2 mt-3 cursor-pointer group"
            onClick={copyCoords}
            title="Click to copy"
          >
            <Crosshair size={13} className="text-concrete mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-concrete font-bold flex items-center gap-1.5">
                {t("coordinates")}
                {copied ? (
                  <span className="text-rust font-bold">Copied!</span>
                ) : (
                  <Copy size={9} className="text-concrete/40 group-hover:text-rust transition-colors" />
                )}
              </span>
              <span className="text-xs text-charcoal font-medium font-mono">
                {artwork.latitude.toFixed(4)}, {artwork.longitude.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        <div className="relative pl-5">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-rust/20" />
          <p className="text-sm leading-relaxed text-charcoal/90 font-light text-justify transition-colors duration-500">
            {description}
          </p>
        </div>

        <div className="pt-5 border-t border-charcoal/10 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Box size={13} className="text-concrete shrink-0" />
              <h4 className="text-[9px] uppercase tracking-[0.2em] text-concrete font-bold transition-colors duration-500">
                {t("materials")}
              </h4>
            </div>
            <p className="text-[11px] text-charcoal/80 leading-relaxed font-medium transition-colors duration-500">
              {materialsText}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Maximize2 size={13} className="text-concrete shrink-0" />
              <h4 className="text-[9px] uppercase tracking-[0.2em] text-concrete font-bold transition-colors duration-500">
                {t("spatiality")}
              </h4>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-charcoal/80 font-medium capitalize transition-colors duration-500">
                {t(artwork.category)}
              </span>
              {artwork.subtype && (
                <span className="text-[9px] uppercase tracking-[0.1em] text-rust font-bold italic transition-colors duration-500">
                  {t(artwork.subtype)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
