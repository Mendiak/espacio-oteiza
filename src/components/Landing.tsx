"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Landing() {
  const [isRendered, setIsRendered] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 1.5, delay: 3, ease: "easeInOut" }}
      onAnimationComplete={() => setIsRendered(false)}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-offwhite text-charcoal overflow-hidden"
      style={{ display: isRendered ? "flex" : "none" }}
    >
      {/* Caja metafísica sutileza de fondo */}
      <motion.div
        initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
        animate={{ opacity: 0.04, rotate: 360, scale: 1 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute"
      >
        <svg width="480" height="480" viewBox="0 0 480 480" className="text-charcoal">
          <rect x="90" y="90" width="300" height="300" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="165" y="165" width="150" height="150" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Anillo concéntrico sutil */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        className="absolute w-[700px] h-[700px] border border-charcoal rounded-full"
      />

      {/* Eje vertical decorativo */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-charcoal/[0.02] -translate-x-1/2 origin-top"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Línea horizontal superior */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-px bg-rust/30 mb-8 origin-center"
        />

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl tracking-tighter uppercase text-center"
        >
          espacio oteiza
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base tracking-[0.3em] uppercase text-concrete font-light text-center px-4 mt-5"
        >
          exploring sculpture through space
        </motion.p>

        {/* Línea horizontal inferior */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px bg-rust/20 mt-8 origin-center"
        />
      </div>

    </motion.div>
  );
}
