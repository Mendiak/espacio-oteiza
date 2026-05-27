"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Landing() {
  const [isRendered, setIsRendered] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 2, delay: 2.5, ease: "easeInOut" }}
      onAnimationComplete={() => setIsRendered(false)}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-offwhite text-charcoal"
      style={{ display: isRendered ? "flex" : "none" }}
    >
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-4xl md:text-6xl mb-6 tracking-tighter uppercase"
      >
        espacio oteiza
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        className="text-sm md:text-base tracking-[0.3em] uppercase text-concrete font-light text-center px-4"
      >
        exploring sculpture through space
      </motion.p>
      
      <motion.div 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
        className="w-px h-24 bg-concrete mt-12 origin-top"
      />
    </motion.div>
  );
}
