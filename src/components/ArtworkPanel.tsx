

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Box, Maximize2 } from "lucide-react";
import type { Artwork } from "@/lib/types";

interface ArtworkPanelProps {
  artwork: Artwork | null;
  onClose: () => void;
  lang: "es" | "en" | "eu";
}

const T = {
  es: {
    materials: "Materiales",
    spatiality: "Espacialidad",
    built: "Obra Construida",
    intervention: "Intervención",
    unbuilt: "No Realizada",
    visual: "Archivo Visual",
    close: "Cerrar panel",
    sculpture: "Escultura",
    landscape: "Paisaia / Paisaje",
    monument: "Monumento",
    project: "Proyecto",
    location: "Ubicación",
    year: "Año",
    steel: "Acero",
    iron: "Hierro",
    stone: "Piedra",
    bronze: "Bronce"
  },
  en: {
    materials: "Materials",
    spatiality: "Spatiality",
    built: "Built Work",
    intervention: "Intervention",
    unbuilt: "Unbuilt",
    visual: "Visual Archive",
    close: "Close panel",
    sculpture: "Sculpture",
    landscape: "Landscape",
    monument: "Monument",
    project: "Project",
    location: "Location",
    year: "Year",
    steel: "Steel",
    iron: "Iron",
    stone: "Stone",
    bronze: "Bronze"
  },
  eu: {
    materials: "Materialak",
    spatiality: "Espazialitatea",
    built: "Eraikitako Obra",
    intervention: "Interbentzioa",
    unbuilt: "Eraiki Gabea",
    visual: "Artxibo Bisuala",
    close: "Panela itxi",
    sculpture: "Eskultura",
    landscape: "Paisaia",
    monument: "Monumentua",
    project: "Proiektua",
    location: "Kokalekua",
    year: "Urtea",
    steel: "Altzairua",
    iron: "Burdina",
    stone: "Harria",
    bronze: "Brontzea"
  }
};

export default function ArtworkPanel({ artwork, onClose, lang }: ArtworkPanelProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!artwork) return null;

  const t = T[lang];

  const getLocalized = (field: string) => {
    const key = `${field}_${lang}` as keyof Artwork;
    return artwork[key] as string;
  };

  const title = getLocalized("title").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  const city = getLocalized("city");
  const country = getLocalized("country");
  const description = getLocalized("description");
  const materialsText = getLocalized("materials");

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="artwork-title"
          className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] bg-offwhite z-50 border-l border-charcoal/10 shadow-2xl flex flex-col overflow-y-auto transition-colors duration-500 custom-scrollbar oteiza-grain"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label={t.close}
            className="absolute top-6 right-6 p-2 text-concrete hover:text-rust transition-all duration-300 z-10 bg-offwhite/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md border border-charcoal/5 group"
          >
            <X size={20} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
          </button>

          {/* Image Section */}
          <div className="relative h-[45vh] bg-charcoal/5 border-b border-charcoal/10 overflow-hidden transition-colors duration-500 group/img">
            {artwork.image && !artwork.image.includes("placeholder") ? (
              <>
                <img 
                  src={artwork.image} 
                  alt={getLocalized("title")} 
                  className="w-full h-full object-cover grayscale filter transition-all duration-1000 group-hover/img:grayscale-0 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-700" />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 border border-concrete/20 rotate-45 flex items-center justify-center">
                  <div className="w-12 h-12 border border-rust/20 -rotate-12" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-concrete/60 font-semibold">{t.visual}</span>
              </div>
            )}
            <div className="absolute bottom-4 left-6 flex gap-2">
              {artwork.material.map((m) => (
                <span key={m} className="px-2 py-0.5 bg-offwhite/90 backdrop-blur-sm border border-charcoal/10 text-[8px] uppercase tracking-widest text-charcoal/70 font-bold rounded-sm">
                  {t[m as keyof typeof t] || m}
                </span>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex-1 flex flex-col">
            <div className="mb-10">
              <div className="flex items-center gap-2 text-rust mb-3">
                <div className="w-8 h-px bg-rust/30" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{t[artwork.category as keyof typeof t]}</span>
              </div>
              <h2 id="artwork-title" className="text-3xl md:text-4xl mb-6 leading-[1.1] text-charcoal font-light tracking-tight transition-colors duration-500">
                {title}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Calendar size={14} className="text-concrete mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-concrete font-bold">{t.year}</span>
                    <span className="text-sm text-charcoal font-medium">{artwork.year}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-concrete mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-concrete font-bold">{t.location}</span>
                    <span className="text-sm text-charcoal font-medium">{city}, {country}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 relative">
              <div className="absolute -left-6 top-0 bottom-0 w-px bg-rust/20" />
              <p className="text-base md:text-lg leading-relaxed text-charcoal/90 font-light text-justify transition-colors duration-500">
                {description}
              </p>
            </div>

            <div className="mt-auto pt-10 border-t border-charcoal/10 grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Box size={14} className="text-concrete" />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-concrete font-bold transition-colors duration-500">{t.materials}</h4>
                </div>
                <p className="text-xs text-charcoal/80 leading-relaxed font-medium transition-colors duration-500">{materialsText}</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Maximize2 size={14} className="text-concrete" />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] text-concrete font-bold transition-colors duration-500">{t.spatiality}</h4>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-charcoal/80 font-medium capitalize transition-colors duration-500">
                    {t[artwork.category as keyof typeof t]}
                  </span>
                  {artwork.subtype && (
                    <span className="text-[10px] uppercase tracking-[0.1em] text-rust font-bold italic transition-colors duration-500">
                      {t[artwork.subtype as keyof typeof t] || artwork.subtype}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
