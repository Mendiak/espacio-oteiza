"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // Increased duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-offwhite flex items-center justify-center overflow-hidden"
        >
          {/* Subtle Cromlech Reference (Circle) */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.05 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute w-[600px] h-[600px] border border-charcoal rounded-full"
          />

          <div className="relative w-32 h-32">
            {/* Metaphysical Box Assembly Animation */}
            {/* Triedro 1 */}
            <motion.div
              initial={{ x: -40, y: -40, opacity: 0, rotate: -45 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 border-l-2 border-t-2 border-charcoal"
            />
            {/* Triedro 2 */}
            <motion.div
              initial={{ x: 40, y: 40, opacity: 0, rotate: 45 }}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 border-r-2 border-b-2 border-charcoal/40"
            />
            
            {/* The Void Core */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              className="absolute inset-[30%] border border-rust/30 flex items-center justify-center"
            >
              <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 bg-rust"
              />
            </motion.div>

            {/* Label / Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
              className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-[14px] md:text-[16px] uppercase tracking-[0.6em] text-charcoal font-display">
                ESPACIO OTEIZA
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 2.5 }}
                className="h-px bg-rust/40" 
              />
              <span className="text-[9px] uppercase tracking-[0.4em] text-concrete font-bold mt-1">
                Laboratorio de Desocupación
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
