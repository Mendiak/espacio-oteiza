"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AboutPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "es" | "en" | "eu";
}

const CONTENT = {
  es: {
    title: "SOBRE EL PROYECTO",
    subtitle: "ESPACIO OTEIZA — LABORATORIO DIGITAL",
    projectTitle: "El Proyecto",
    projectText: "Espacio Oteiza es un laboratorio cartográfico digital dedicado a la investigación del vacío y la desocupación espacial en la obra del escultor vasco Jorge Oteiza (1908–2003). Este prototipo geolocaliza sus monumentos públicos más significativos y piezas clave de su laboratorio experimental, explorando la relación indisoluble entre la escultura, el espacio sagrado y el paisaje natural.",
    theoryTitle: "La Teoría del Vacío",
    theoryText: "Para Oteiza, la escultura no consiste en rellenar el espacio con masa, sino en desocuparlo. Su 'Propósito Experimental' culminó en 1959 al declarar conclusa su obra escultórica, habiendo alcanzado la 'caja vacía' o 'caja metafísica': un espacio protegido y cargado de energía espiritual donde el vacío se convierte en pura presencia activa y trascendente.",
    biographyTitle: "Jorge Oteiza (1908–2003)",
    biographyText: "Nacido en Orio, Oteiza fue uno de los artistas y teóricos más influyentes de la vanguardia del siglo XX. Ganador del Gran Premio de Escultura en la Bienal de São Paulo (1957), su trabajo abarcó no solo la escultura en hierro, piedra y tizas, sino también la poesía, la arquitectura, la antropología y la política cultural vasca.",
    readMore: "Leer más en Wikipedia",
    footer: "Prototipo de Investigación Estética v1.0 — 2026"
  },
  en: {
    title: "ABOUT THE PROJECT",
    subtitle: "OTEIZA SPACE — DIGITAL LABORATORY",
    projectTitle: "The Project",
    projectText: "Oteiza Space is a digital cartographic laboratory dedicated to the research of empty space and spatial de-occupation in the work of the Basque sculptor Jorge Oteiza (1908–2003). This prototype geolocates his most significant public monuments and key pieces of his experimental laboratory, exploring the indissoluble relationship between sculpture, sacred space, and the natural landscape.",
    theoryTitle: "The Theory of the Void",
    theoryText: "For Oteiza, sculpture is not about filling space with mass, but about de-occupying it. His 'Experimental Purpose' culminated in 1959 when he declared his sculptural work complete, having achieved the 'empty box' or 'metaphysical box': a protected space charged with spiritual energy where the void becomes pure active and transcendent presence.",
    biographyTitle: "Jorge Oteiza (1908–2003)",
    biographyText: "Born in Orio, Oteiza was one of the most influential artists and theorists of the 20th-century avant-garde. Winner of the Grand Prize for Sculpture at the São Paulo Biennial (1957), his work spanned not only sculpture in iron, stone, and chalk, but also poetry, architecture, anthropology, and Basque cultural politics.",
    readMore: "Read more on Wikipedia",
    footer: "Aesthetic Research Prototype v1.0 — 2026"
  },
  eu: {
    title: "PROIEKTUARI BURUZ",
    subtitle: "OTEIZA ESPAZIOA — LABORATEGI DIGITALA",
    projectTitle: "Proiektua",
    projectText: "Oteiza Espazioa Jorge Oteiza (1908–2003) euskal eskultorearen lanean hutsunea eta espazioaren desokupazioa ikertzeko laborategi kartografiko digitala da. Prototipo honek bere monumentu publiko esanguratsuenak eta bere laborategi esperimentaleko lan nagusiak geolokalizatzen ditu, eskulturaren, espazio sakratuaren eta paisaia naturalaren arteko harreman disolbaezina arakatuz.",
    theoryTitle: "Hutsunearen Teoria",
    theoryText: "Oteizarentzat, eskultura ez da espazioa masaz betetzea, desokupatzea baizik. Bere 'Proposamen Esperimentala' 1959an amaitu zen bere lan eskultorikoa bukatutzat eman zuenean, 'kutxa hutsa' edo 'kutxa metafisikoa' lortu ondoren: energia espiritualez kargatutako espazio babestua, non hutsunea presentzia aktibo eta transzendente huts bihurtzen den.",
    biographyTitle: "Jorge Oteiza (1908–2003)",
    biographyText: "Orion jaioa, Oteiza XX. mendeko abangoardiako artista eta teoriko garrantzitsuenetarikoa izan zen. São Pauloko Biurtekoan Eskultura Sari Nagusia irabazi zuen (1957). Bere lanak burdinazko, harrizko eta tizas egindako eskultura ez ezik, olerkigintza, arkitektura, antropologia eta euskal kultura-politika ere jorratu zituen.",
    readMore: "Gehiago irakurri Wikipedian",
    footer: "Ikerketa Estetikoaren Prototipoa v1.0 — 2026"
  }
};

export default function AboutPanel({ isOpen, onClose, lang }: AboutPanelProps) {
  const t = CONTENT[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex justify-start pointer-events-auto transition-colors duration-500"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="w-full sm:w-[500px] md:w-[600px] bg-offwhite h-full shadow-2xl p-8 md:p-12 flex flex-col justify-between overflow-y-auto transition-colors duration-500 oteiza-grain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              {/* Close Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={onClose}
                  className="p-2 text-concrete hover:text-rust transition-colors border border-charcoal/10 hover:border-charcoal/30 rounded-full cursor-pointer"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Title Section */}
              <div className="mb-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-rust font-bold block mb-2 transition-colors duration-500">
                  {t.title}
                </span>
                <h2 className="text-3xl md:text-4xl font-display tracking-tight text-charcoal leading-tight transition-colors duration-500">
                  {t.subtitle}
                </h2>
                <div className="w-16 h-[2px] bg-rust mt-4 transition-colors duration-500" />
              </div>

              {/* Content Sections */}
              <div className="flex flex-col gap-8 pr-2">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-concrete font-bold mb-3 transition-colors duration-500">
                    {t.projectTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/80 font-light text-justify transition-colors duration-500">
                    {t.projectText}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-concrete font-bold mb-3 transition-colors duration-500">
                    {t.theoryTitle}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/80 font-light text-justify transition-colors duration-500">
                    {t.theoryText}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-concrete font-bold mb-3 transition-colors duration-500">
                    {t.biographyTitle}
                  </h3>
                  <div className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed text-charcoal/80 font-light text-justify transition-colors duration-500">
                      {t.biographyText}
                    </p>
                    <a 
                      href="https://es.wikipedia.org/wiki/Jorge_de_Oteiza" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-[0.2em] text-rust hover:text-charcoal font-bold self-start transition-colors duration-300 border-b border-rust/30 hover:border-charcoal/30 pb-0.5"
                    >
                      {t.readMore} →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Geometric Art & Footer */}
            <div className="mt-12 pt-8 border-t border-charcoal/10 flex items-center justify-between transition-colors duration-500">
              {/* Minimalistic Oteiza Cube sketch */}
              <div className="w-10 h-10 border border-concrete/40 relative flex items-center justify-center rotate-6">
                <div className="absolute w-6 h-6 border border-rust/40 -rotate-12 translate-x-1 translate-y-1" />
                <span className="text-[7px] text-concrete/60 font-mono">0</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.15em] text-concrete font-medium transition-colors duration-500">
                {t.footer}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
