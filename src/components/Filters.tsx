import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FiltersProps {
  activeRegion: string | null;
  setActiveRegion: (r: string | null) => void;
  activeCategory: string | null;
  setActiveCategory: (c: string | null) => void;
  onResetView: () => void;
  lang: "es" | "en" | "eu";
}

const REGIONS = ["Euskal Herria", "Spain", "Latin America", "World"];
const CATEGORIES = ["built", "intervention", "unbuilt"];

const T = {
  es: {
    filters: "Filtros",
    territory: "Territorio",
    spatiality: "Espacialidad",
    reset: "Restablecer Vista",
    built: "Obras Construidas",
    intervention: "Intervenciones",
    unbuilt: "No Realizadas"
  },
  en: {
    filters: "Filters",
    territory: "Territory",
    spatiality: "Spatiality",
    reset: "Reset View",
    built: "Built Works",
    intervention: "Interventions",
    unbuilt: "Unbuilt"
  },
  eu: {
    filters: "Iragazkiak",
    territory: "Lurraldea",
    spatiality: "Espazialitatea",
    reset: "Ikuspegia Berrezarri",
    built: "Eraikitako Obrak",
    intervention: "Interbentzioak",
    unbuilt: "Eraiki Gabeak"
  }
};

const TOOLTIPS: Record<string, Record<string, { title: string; desc: string }>> = {
  es: {
    "Euskal Herria": { title: "Territorio: Euskal Herria", desc: "Obras situadas en el País Vasco, el núcleo emocional, prehistórico y cultural de la cosmología espacial de Oteiza." },
    "Spain": { title: "Territorio: España", desc: "Esculturas en territorio español, reflejando su consagración en grandes colecciones y espacios urbanos como Madrid." },
    "Latin America": { title: "Territorio: América Latina", desc: "Su etapa americana (Colombia, etc.) fue clave para el desarrollo de su teoría estética y el estudio de las formas precolombinas." },
    "World": { title: "Territorio: Internacional", desc: "Presencia global del artista, incluyendo certámenes de prestigio mundial como la Bienal de São Paulo." },
    "built": { title: "Obras Construidas", desc: "Esculturas públicas, monumentos y obras permanentes que forman parte del paisaje físico y urbano." },
    "intervention": { title: "Intervenciones Espaciales", desc: "Integraciones de arquitectura y escultura, plazas, paisajes y obras espaciales urbanas." },
    "unbuilt": { title: "Proyectos no Realizados", desc: "Proyectos, propuestas de concursos y trabajos conceptuales vinculados a localizaciones reales." }
  },
  en: {
    "Euskal Herria": { title: "Territory: Euskal Herria", desc: "Works located in the Basque Country, the emotional, prehistoric, and cultural core of Oteiza's spatial cosmology." },
    "Spain": { title: "Territory: Spain", desc: "Sculptures in Spanish territory, reflecting his consecration in major collections and urban spaces like Madrid." },
    "Latin America": { title: "Territory: Latin America", desc: "His American stage (Colombia, etc.) was key to the development of his aesthetic theory and the study of pre-Columbian forms." },
    "World": { title: "Territory: International", desc: "Global presence of the artist, including world-renowned competitions such as the São Paulo Biennial." },
    "built": { title: "Built Works", desc: "Public sculptures, monuments, and permanent works that are part of the physical and urban landscape." },
    "intervention": { title: "Spatial Interventions", desc: "Integrations of architecture and sculpture, squares, landscapes, and urban spatial works." },
    "unbuilt": { title: "Unbuilt Projects", desc: "Projects, competition proposals, and conceptual works linked to real locations that were never executed." }
  },
  eu: {
    "Euskal Herria": { title: "Lurraldea: Euskal Herria", desc: "Euskal Herrian kokatutako obrak, Oteizaren kosmoloji espazialaren muin emozional, prehistoriko eta kulturala." },
    "Spain": { title: "Lurraldea: Espainia", desc: "Espainiako lurraldeko eskulturak, bilduma handietan eta Madril bezalako hiriguneetan duen presentzia islatuz." },
    "Latin America": { title: "Lurraldea: Amerika Latina", desc: "Amerikako etapa (Kolonbia, etab.) funtsezkoa izan zen bere teoria estetikoa garatzeko eta forma prekolonbinoak aztertzeko." },
    "World": { title: "Lurraldea: Nazioartekoa", desc: "Artistaren presentzia globala, São Pauloko Biurtekoa bezalako mundu mailako lehiaketak barne." },
    "built": { title: "Eraikitako Obrak", desc: "Paisaia fisiko eta urbanoaren parte diren eskultura publikoak, monumentuak eta obra iraunkorrak." },
    "intervention": { title: "Interbentzio Espazialak", desc: "Arkitektura eta eskulturaren integrazioak, plazak, paisaiak eta hiri-obra espazialak." },
    "unbuilt": { title: "Eraiki Gabeko Proiektuak", desc: "Gauzatu ez ziren proiektuak, lehiaketa-proposamenak eta benetako kokapenei lotutako lan kontzeptualak." }
  }
};

export default function Filters({ activeRegion, setActiveRegion, activeCategory, setActiveCategory, onResetView, lang }: FiltersProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const t = T[lang];

  return (
    <div className="absolute bottom-8 left-8 z-30 flex items-start gap-4">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 1, ease: "easeOut" }}
        className="flex flex-col gap-6 bg-white/70 backdrop-blur-md p-6 border border-white/20 shadow-sm min-w-[180px]"
      >
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-charcoal">{t.filters}</span>
          <div className="w-full h-px bg-charcoal/15" />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-concrete font-bold">{t.territory}</h3>
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
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-concrete font-bold">{t.spatiality}</h3>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              onMouseEnter={() => setHoveredKey(cat)}
              onMouseLeave={() => setHoveredKey(null)}
              className={`text-left text-xs transition-colors duration-500 flex items-center gap-2 cursor-pointer ${
                activeCategory === cat ? "text-rust" : "text-charcoal hover:text-concrete"
              }`}
            >
              <span className={`w-1 h-1 rounded-full ${activeCategory === cat ? "bg-rust" : "bg-transparent"}`} />
              {t[cat as keyof typeof t]}
            </button>
          ))}
        </div>

        <div className="w-8 h-px bg-concrete/30" />

        <button
          onClick={onResetView}
          className="text-left text-[10px] uppercase tracking-[0.2em] font-semibold text-concrete hover:text-rust transition-colors duration-500 flex items-center gap-2 mt-1 cursor-pointer"
        >
          <span className="w-1.5 h-1.5 bg-rust/50" />
          {t.reset}
        </button>
      </motion.div>

      <AnimatePresence>
        {hoveredKey && TOOLTIPS[lang][hoveredKey] && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[260px] bg-white/80 backdrop-blur-md p-5 border border-white/20 shadow-sm flex flex-col gap-2 mt-4 self-center"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-rust">
              {TOOLTIPS[lang][hoveredKey].title}
            </span>
            <p className="text-[11px] text-charcoal/80 leading-relaxed font-light">
              {TOOLTIPS[lang][hoveredKey].desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
