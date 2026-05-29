"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface NavigationProps {
  lang: "es" | "en" | "eu";
  setLang: (lang: "es" | "en" | "eu") => void;
  onAboutClick: () => void;
}

const TRANSLATIONS = {
  es: { about: "Sobre el proyecto", themeToggle: "Cambiar a modo oscuro", themeToggleLight: "Cambiar a modo claro" },
  en: { about: "About", themeToggle: "Switch to dark mode", themeToggleLight: "Switch to light mode" },
  eu: { about: "Proiektua", themeToggle: "Modu ilunera aldatu", themeToggleLight: "Modu argira aldatu" }
};

export default function Navigation({ lang, setLang, onAboutClick }: NavigationProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  const t = TRANSLATIONS[lang];

  // Avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-40 p-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-2xl uppercase tracking-tighter text-charcoal drop-shadow-md bg-offwhite/50 px-2 py-1 backdrop-blur-md transition-colors duration-500">espacio oteiza</h1>
        </div>
        
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal bg-offwhite/50 px-4 py-2 backdrop-blur-md border border-charcoal/10 shadow-sm transition-colors duration-500">
            <button onClick={onAboutClick} className="hover:text-rust transition-colors cursor-pointer">{t.about}</button>
          </div>
          
          <div className="flex gap-2 text-[10px] font-bold tracking-wider text-concrete bg-offwhite/50 px-3 py-2 backdrop-blur-md border border-charcoal/10 shadow-sm transition-colors duration-500">
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

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? t.themeToggleLight : t.themeToggle}
            className="flex items-center justify-center w-9 h-9 bg-offwhite/50 backdrop-blur-md border border-charcoal/10 text-charcoal hover:text-rust transition-all duration-500 shadow-sm"
          >
            {mounted && (theme === "dark" ? <Sun size={14} /> : <Moon size={14} />)}
          </button>
        </div>
      </nav>
    </>
  );
}
