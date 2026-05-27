import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FiltersProps {
  activeRegion: string | null;
  setActiveRegion: (r: string | null) => void;
  activeCategory: string | null;
  setActiveCategory: (c: string | null) => void;
  activeMaterial: string | null;
  setActiveMaterial: (m: string | null) => void;
  onResetView: () => void;
  lang: "es" | "en" | "eu";
}

const REGIONS = ["Euskal Herria", "Spain", "Latin America", "World"];
const CATEGORIES = ["built", "intervention", "unbuilt"];
const MATERIALS = ["steel", "iron", "stone", "bronze"];

const T = {
  es: {
    filters: "Filtros",
    territory: "Territorio",
    spatiality: "Espacialidad",
    material: "Material",
    reset: "Restablecer Filtros",
    built: "Obras Construidas",
    intervention: "Intervenciones",
    unbuilt: "No Realizadas",
    steel: "Acero",
    iron: "Hierro",
    stone: "Piedra",
    bronze: "Bronce"
  },
  en: {
    filters: "Filters",
    territory: "Territory",
    spatiality: "Spatiality",
    material: "Material",
    reset: "Reset Filters",
    built: "Built Works",
    intervention: "Interventions",
    unbuilt: "Unbuilt",
    steel: "Steel",
    iron: "Iron",
    stone: "Stone",
    bronze: "Bronze"
  },
  eu: {
    filters: "Iragazkiak",
    territory: "Lurraldea",
    spatiality: "Espazialitatea",
    material: "Materiala",
    reset: "Iragazkiak Berrezarri",
    built: "Eraikitako Obrak",
    intervention: "Interbentzioak",
    unbuilt: "Eraiki Gabeak",
    steel: "Altzairua",
    iron: "Burdina",
    stone: "Harria",
    bronze: "Brontzea"
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
    "unbuilt": { title: "Proyectos no Realizados", desc: "Proyectos, propuestas de concursos y trabajos conceptuales vinculados a localizaciones reales." },
    "steel": { title: "Material: Acero", desc: "Símbolo de la industrialización vasca, el acero permitió a Oteiza crear estructuras ligeras que delimitan el vacío." },
    "iron": { title: "Material: Hierro", desc: "Material ancestral y telúrico, fundamental en la tradición metalúrgica vasca y en la etapa de experimentación de Oteiza." },
    "stone": { title: "Material: Piedra", desc: "Vinculada a lo prehistórico y lo eterno, la piedra representa la conexión de Oteiza con el Cromlech y la memoria del paisaje." },
    "bronze": { title: "Material: Bronce", desc: "Utilizado frecuentemente en sus maquetas y pequeñas piezas del laboratorio experimental para estudiar la desocupación." }
  },
  en: {
    "Euskal Herria": { title: "Territory: Euskal Herria", desc: "Works located in the Basque Country, the emotional, prehistoric, and cultural core of Oteiza's spatial cosmology." },
    "Spain": { title: "Territory: Spain", desc: "Sculptures in Spanish territory, reflecting his consecration in major collections and urban spaces like Madrid." },
    "Latin America": { title: "Territory: Latin America", desc: "His American stage (Colombia, etc.) was key to the development of his aesthetic theory and the study of pre-Columbian forms." },
    "World": { title: "Territory: International", desc: "Global presence of the artist, including world-renowned competitions such as the São Paulo Biennial." },
    "built": { title: "Built Works", desc: "Public sculptures, monuments, and permanent works that are part of the physical and urban landscape." },
    "intervention": { title: "Spatial Interventions", desc: "Integrations of architecture and sculpture, squares, landscapes, and urban spatial works." },
    "unbuilt": { title: "Unbuilt Projects", desc: "Projects, competition proposals, and conceptual works linked to real locations that were never executed." },
    "steel": { title: "Material: Steel", desc: "A symbol of Basque industrialization, steel allowed Oteiza to create light structures that delimit the void." },
    "iron": { title: "Material: Iron", desc: "An ancestral and telluric material, fundamental to Basque metallurgical tradition and Oteiza's experimental stage." },
    "stone": { title: "Material: Stone", desc: "Linked to the prehistoric and the eternal, stone represents Oteiza's connection with the Cromlech and landscape memory." },
    "bronze": { title: "Material: Bronze", desc: "Frequently used in his maquettes and small pieces of the experimental laboratory to study de-occupation." }
  },
  eu: {
    "Euskal Herria": { title: "Lurraldea: Euskal Herria", desc: "Euskal Herrian kokatutako obrak, Oteizaren kosmoloji espazialaren muin emozional, prehistoriko eta kulturala." },
    "Spain": { title: "Lurraldea: Espainia", desc: "Espainiako lurraldeko eskulturak, bilduma handietan eta Madril bezalako hiriguneetan duen presentzia islatuz." },
    "Latin America": { title: "Lurraldea: Amerika Latina", desc: "Amerikako etapa (Kolonbia, etab.) funtsezkoa izan zen bere teoria estetikoa garatzeko eta forma prekolonbinoak aztertzeko." },
    "World": { title: "Lurraldea: Nazioartekoa", desc: "Artistaren presentzia globala, São Pauloko Biurtekoa bezalako mundu mailako lehiaketak barne." },
    "built": { title: "Eraikitako Obrak", desc: "Paisaia fisiko eta urbanoaren parte diren eskultura publikoak, monumentuak eta obra iraunkorrak." },
    "intervention": { title: "Interbentzio Espazialak", desc: "Arkitektura eta eskulturaren integrazioak, plazak, paisaiak eta hiri-obra espazialak." },
    "unbuilt": { title: "Eraiki Gabeko Proiektuak", desc: "Gauzatu ez ziren proiektuak, lehiaketa-proposamenak eta benetako kokapenei lotutako lan kontzeptualak." },
    "steel": { title: "Materiala: Altzairua", desc: "Euskal industrializazioaren sinboloa, altzairuak hutsunea mugatzen duten egitura arinak sortzea ahalbidetu zion Oteizari." },
    "iron": { title: "Materiala: Burdina", desc: "Antzinako materiala eta telurikoa, funtsezkoa euskal tradizio metalurgikoan eta Oteizaren esperimentazio etapan." },
    "stone": { title: "Materiala: Harria", desc: "Prehistoriarekin eta betikoarekin lotuta, harriak Oteizak Harrespilarekin eta paisaiaren memoriarekin duen lotura irudikatzen du." },
    "bronze": { title: "Materiala: Brontzea", desc: "Bere maketetan eta laborategi esperimentaleko pieza txikietan maiz erabilia desokupazioa aztertzeko." }
  }
};

export default function Filters({ activeRegion, setActiveRegion, activeCategory, setActiveCategory, activeMaterial, setActiveMaterial, onResetView, lang }: FiltersProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [tooltipY, setTooltipY] = useState<number>(0);
  const t = T[lang];

  const handleMouseEnter = (e: React.MouseEvent, key: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
    if (parentRect) {
      // Calculate relative Y position within the filter panel
      setTooltipY(rect.top - parentRect.top);
    }
    setHoveredKey(key);
  };

  return (
    <div className="flex items-start gap-4 flex-row-reverse">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 1, ease: "easeOut" }}
        className="flex flex-col gap-6 bg-offwhite/70 backdrop-blur-md p-6 border border-charcoal/10 shadow-sm min-w-[180px] transition-colors duration-500 relative"
      >
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.4em] text-charcoal">{t.filters}</span>
          <div className="w-full h-px bg-charcoal/15 transition-colors duration-500" />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-concrete font-bold transition-colors duration-500">{t.territory}</h3>
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(activeRegion === region ? null : region)}
              onMouseEnter={(e) => handleMouseEnter(e, region)}
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

        <div className="w-8 h-px bg-concrete/30 transition-colors duration-500" />

        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-concrete font-bold transition-colors duration-500">{t.spatiality}</h3>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              onMouseEnter={(e) => handleMouseEnter(e, cat)}
              onMouseLeave={() => setHoveredKey(null)}
              className={`text-left text-xs transition-colors duration-500 flex items-center gap-3 cursor-pointer group/btn ${
                activeCategory === cat ? "text-rust" : "text-charcoal hover:text-concrete"
              }`}
            >
              <span className={`w-1 h-1 rounded-full shrink-0 ${activeCategory === cat ? "bg-rust" : "bg-transparent"}`} />
              
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 border transition-all duration-500 ${
                  cat === "intervention" ? "bg-rust rotate-45 border-offwhite" :
                  cat === "unbuilt" ? "bg-charcoal/30 border-charcoal/20 opacity-60 border-dashed" :
                  "bg-charcoal border-offwhite"
                }`} />
                {t[cat as keyof typeof t]}
              </div>
            </button>
          ))}
        </div>

        <div className="w-8 h-px bg-concrete/30 transition-colors duration-500" />

        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-concrete font-bold transition-colors duration-500">{t.material}</h3>
          {MATERIALS.map((mat) => (
            <button
              key={mat}
              onClick={() => setActiveMaterial(activeMaterial === mat ? null : mat)}
              onMouseEnter={(e) => handleMouseEnter(e, mat)}
              onMouseLeave={() => setHoveredKey(null)}
              className={`text-left text-xs transition-colors duration-500 flex items-center gap-2 cursor-pointer ${
                activeMaterial === mat ? "text-rust" : "text-charcoal hover:text-concrete"
              }`}
            >
              <span className={`w-1 h-1 rounded-full ${activeMaterial === mat ? "bg-rust" : "bg-transparent"}`} />
              {t[mat as keyof typeof t]}
            </button>
          ))}
        </div>

        <div className="w-8 h-px bg-concrete/30 transition-colors duration-500" />

        <button
          onClick={onResetView}
          className="text-left text-[10px] uppercase tracking-[0.2em] font-semibold text-concrete hover:text-rust transition-colors duration-500 flex items-center gap-2 mt-1 cursor-pointer"
        >
          <span className="w-1.5 h-1.5 bg-rust/50" />
          {t.reset}
        </button>
      </motion.div>

      <div className="relative pt-2" style={{ transform: `translateY(${tooltipY}px)`, transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        <AnimatePresence mode="wait">
          {hoveredKey && TOOLTIPS[lang][hoveredKey] && (
            <motion.div
              key={hoveredKey}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-[260px] bg-offwhite/90 backdrop-blur-md p-5 border border-charcoal/10 shadow-sm flex flex-col gap-2 transition-colors duration-500"
            >
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-rust transition-colors duration-500">
                {TOOLTIPS[lang][hoveredKey].title}
              </span>
              <p className="text-[11px] text-charcoal/80 leading-relaxed font-light transition-colors duration-500">
                {TOOLTIPS[lang][hoveredKey].desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
