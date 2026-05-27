import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FiltersProps {
  activeRegion: string | null;
  setActiveRegion: (r: string | null) => void;
  activeTheme: string | null;
  setActiveTheme: (t: string | null) => void;
  onResetView: () => void;
}

const REGIONS = ["Euskal Herria", "Spain", "Latin America", "World"];
const THEMES = ["Public sculpture", "Experimental", "Spiritual"];

const TOOLTIPS: Record<string, { title: string; desc: string }> = {
  "Euskal Herria": {
    title: "Territorio: Euskal Herria",
    desc: "Obras situadas en el País Vasco, el núcleo emocional, prehistórico y cultural de la cosmología espacial de Oteiza."
  },
  "Spain": {
    title: "Territorio: España",
    desc: "Esculturas en territorio español, reflejando su consagración en grandes colecciones y espacios urbanos como Madrid."
  },
  "Latin America": {
    title: "Territorio: América Latina",
    desc: "Su etapa americana (Colombia, etc.) fue clave para el desarrollo de su teoría estética y el estudio de las formas precolombinas."
  },
  "World": {
    title: "Territorio: Internacional",
    desc: "Presencia global del artista, incluyendo certámenes de prestigio mundial como la Bienal de São Paulo y colecciones internacionales."
  },
  "Public sculpture": {
    title: "Concepto: Escultura Pública",
    desc: "Monumentos a gran escala integrados en el paisaje urbano o natural, concebidos para dialogar activamente con la sociedad y el espacio común."
  },
  "Experimental": {
    title: "Concepto: Experimental",
    desc: "Piezas de investigación espacial pura, enfocadas en la desocupación de la esfera, el cubo y la activación activa del vacío."
  },
  "Spiritual": {
    title: "Concepto: Espiritual",
    desc: "Obras que conciben el vacío no como la nada, sino como un espacio sagrado de trascendencia, silencio y comunión metafísica inspirado en los crómlechs vascos."
  }
};

export default function Filters({ activeRegion, setActiveRegion, activeTheme, setActiveTheme, onResetView }: FiltersProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div className="absolute bottom-8 left-8 z-30 flex items-start gap-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 1, ease: "easeOut" }}
        className="flex flex-col gap-6 bg-white/70 backdrop-blur-md p-6 border border-white/20 shadow-sm min-w-[180px]"
      >
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-charcoal">Filters</span>
          <div className="w-full h-px bg-charcoal/15" />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-concrete font-bold">Territory</h3>
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(activeRegion === region ? null : region)}
              onMouseEnter={() => setHoveredKey(region)}
              onMouseLeave={() => setHoveredKey(null)}
              className={`text-left text-xs transition-colors duration-500 flex items-center gap-2 cursor-pointer ${
                activeRegion === region ? "text-rust" : "text-charcoal hover:text-concrete"
              }`}
            >
              <span className={`w-1 h-1 rounded-full ${activeRegion === region ? "bg-rust" : "bg-transparent"}`} />
              {region}
            </button>
          ))}
        </div>

        <div className="w-8 h-px bg-concrete/30" />

        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-concrete font-bold">Concept</h3>
          {THEMES.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(activeTheme === theme ? null : theme)}
              onMouseEnter={() => setHoveredKey(theme)}
              onMouseLeave={() => setHoveredKey(null)}
              className={`text-left text-xs transition-colors duration-500 flex items-center gap-2 cursor-pointer ${
                activeTheme === theme ? "text-rust" : "text-charcoal hover:text-concrete"
              }`}
            >
              <span className={`w-1 h-1 rounded-full ${activeTheme === theme ? "bg-rust" : "bg-transparent"}`} />
              {theme}
            </button>
          ))}
        </div>

        <div className="w-8 h-px bg-concrete/30" />

        <button
          onClick={onResetView}
          className="text-left text-[10px] uppercase tracking-[0.2em] font-semibold text-concrete hover:text-rust transition-colors duration-500 flex items-center gap-2 mt-1 cursor-pointer"
        >
          <span className="w-1.5 h-1.5 bg-rust/50" />
          Reset View
        </button>
      </motion.div>

      <AnimatePresence>
        {hoveredKey && TOOLTIPS[hoveredKey] && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[260px] bg-white/80 backdrop-blur-md p-5 border border-white/20 shadow-sm flex flex-col gap-2 mt-4 self-center"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-rust">
              {TOOLTIPS[hoveredKey].title}
            </span>
            <p className="text-[11px] text-charcoal/80 leading-relaxed font-light">
              {TOOLTIPS[hoveredKey].desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
