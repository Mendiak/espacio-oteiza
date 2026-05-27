"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavigationProps {
  lang: "es" | "en" | "eu";
  setLang: (lang: "es" | "en" | "eu") => void;
  onAboutClick: () => void;
}

const TRANSLATIONS = {
  es: {
    about: "Sobre el proyecto",
    archive: "Archivo",
    index: "Índice",
    disclaimer: "Sección en desarrollo (Prototipo v1)"
  },
  en: {
    about: "About",
    archive: "Archive",
    index: "Index",
    disclaimer: "Section in development (Prototype v1)"
  },
  eu: {
    about: "Proiektua",
    archive: "Artxiboa",
    index: "Aurkibidea",
    disclaimer: "Garapenean dagoen atala (Prototipoa v1)"
  }
};

export default function Navigation({ lang, setLang, onAboutClick }: NavigationProps) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleNavClick = () => {
    setShowDisclaimer(true);
    setTimeout(() => setShowDisclaimer(false), 3000);
  };

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-40 p-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-2xl uppercase tracking-tighter text-charcoal drop-shadow-md bg-white/50 px-2 py-1 backdrop-blur-md">espacio oteiza</h1>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal bg-white/50 px-4 py-2 backdrop-blur-md border border-white/20 shadow-sm">
            <button onClick={onAboutClick} className="hover:text-rust transition-colors cursor-pointer">{t.about}</button>
            <button onClick={handleNavClick} className="hover:text-rust transition-colors cursor-pointer">{t.archive}</button>
            <button onClick={handleNavClick} className="hover:text-rust transition-colors cursor-pointer">{t.index}</button>
          </div>
          
          <div className="flex gap-2 text-[10px] font-bold tracking-wider text-concrete bg-white/50 px-3 py-2 backdrop-blur-md border border-white/20 shadow-sm">
            <button 
              onClick={() => setLang("es")} 
              className={`hover:text-rust transition-colors cursor-pointer ${lang === "es" ? "text-rust font-black" : ""}`}
            >
              ES
            </button>
            <span className="opacity-30">/</span>
            <button 
              onClick={() => setLang("en")} 
              className={`hover:text-rust transition-colors cursor-pointer ${lang === "en" ? "text-rust font-black" : ""}`}
            >
              EN
            </button>
            <span className="opacity-30">/</span>
            <button 
              onClick={() => setLang("eu")} 
              className={`hover:text-rust transition-colors cursor-pointer ${lang === "eu" ? "text-rust font-black" : ""}`}
            >
              EU
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 right-6 z-50 bg-charcoal text-[#F4F4F0] text-[10px] uppercase tracking-[0.2em] px-4 py-2 shadow-sm"
          >
            {t.disclaimer}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
