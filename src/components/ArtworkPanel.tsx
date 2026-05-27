

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Artwork } from "@/lib/types";

interface ArtworkPanelProps {
  artwork: Artwork | null;
  onClose: () => void;
  lang: "es" | "en" | "eu";
}

export default function ArtworkPanel({ artwork, onClose, lang }: ArtworkPanelProps) {
  const getTitle = (art: Artwork) => {
    switch (lang) {
      case "en": return art.title_en;
      case "eu": return art.title_eu;
      case "es": default: return art.title_es;
    }
  };

  const getCity = (art: Artwork) => {
    switch (lang) {
      case "en": return art.city_en;
      case "eu": return art.city_eu;
      case "es": default: return art.city_es;
    }
  };

  const getCountry = (art: Artwork) => {
    switch (lang) {
      case "en": return art.country_en;
      case "eu": return art.country_eu;
      case "es": default: return art.country_es;
    }
  };

  const getDescription = (art: Artwork) => {
    switch (lang) {
      case "en": return art.description_en;
      case "eu": return art.description_eu;
      case "es": default: return art.description_es;
    }
  };

  const getMaterials = (art: Artwork) => {
    switch (lang) {
      case "en": return art.materials_en;
      case "eu": return art.materials_eu;
      case "es": default: return art.materials_es;
    }
  };
  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-[#F4F4F0] z-50 border-l border-concrete/20 shadow-2xl flex flex-col overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-concrete hover:text-charcoal transition-colors z-10 bg-white/50 backdrop-blur-md rounded-full"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="relative h-[40vh] bg-charcoal/5 border-b border-concrete/10">
            {/* Minimal placeholder for image since we don't have real images */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border border-concrete/20 rotate-45" />
              <span className="absolute text-[10px] uppercase tracking-[0.3em] text-concrete/50">Archivo Visual</span>
            </div>
          </div>

          <div className="p-10 flex-1 flex flex-col">
            <div className="mb-10">
              <h2 className="text-3xl mb-4 leading-tight">
                {getTitle(artwork).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()}
              </h2>
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-concrete font-semibold">
                <span>{artwork.year}</span>
                <span className="w-1 h-1 rounded-full bg-concrete/40" />
                <span>{getCity(artwork)}, {getCountry(artwork)}</span>
              </div>
            </div>

            <div className="mb-12 text-lg leading-relaxed text-charcoal font-light border-l border-rust/40 pl-5 bg-white/80 backdrop-blur-sm rounded-md p-4 shadow-sm">
              <p>{getDescription(artwork)}</p>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-8 border-t border-concrete/20 pt-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-concrete font-bold mb-2">Materials</h4>
                <p className="text-xs text-charcoal tracking-wide">{getMaterials(artwork)}</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] text-concrete font-bold mb-2">Spatiality</h4>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-charcoal tracking-wide capitalize">{artwork.category}</span>
                  {artwork.subtype && (
                    <span className="text-[10px] uppercase tracking-[0.1em] text-concrete/70 font-medium italic">
                      {artwork.subtype}
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
