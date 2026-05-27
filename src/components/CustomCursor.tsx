"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: mousePos.x,
        y: mousePos.y,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
    >
      <motion.div
        animate={{
          width: isHovering ? 24 : 6,
          height: isHovering ? 24 : 6,
          x: isHovering ? -12 : -3,
          y: isHovering ? -12 : -3,
          backgroundColor: isHovering ? "rgba(155, 74, 58, 0)" : resolvedTheme === "dark" ? "#F4F4F0" : "#1C1C1C",
          border: isHovering ? "1px solid #9B4A3A" : `0px solid ${resolvedTheme === "dark" ? "#F4F4F0" : "#1C1C1C"}`,
          borderRadius: isHovering ? 2 : 100,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <div className="w-[1px] h-[4px] bg-rust/40 absolute top-0" />
             <div className="w-[1px] h-[4px] bg-rust/40 absolute bottom-0" />
             <div className="w-[4px] h-[1px] bg-rust/40 absolute left-0" />
             <div className="w-[4px] h-[1px] bg-rust/40 absolute right-0" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
