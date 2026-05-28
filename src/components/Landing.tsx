"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const floatingUnits = [
  { x: "12%", y: "18%", size: 44, delay: 0.3 },
  { x: "88%", y: "22%", size: 32, delay: 0.6 },
  { x: "15%", y: "78%", size: 36, delay: 0.9 },
  { x: "85%", y: "72%", size: 48, delay: 1.2 },
  { x: "50%", y: "10%", size: 20, delay: 1.0 },
  { x: "50%", y: "90%", size: 20, delay: 1.3 },
];

// 3D triedro coordinates — three planes forming an open cube corner
const V = [0, 40];
const A = [-80, -35];
const B = [80, -35];
const C = [0, -90];
const P1 = [0, -110]; // completes plane V-A-B
const P2 = [80, -165]; // completes plane V-B-C
const P3 = [-80, -165]; // completes plane V-C-A

const interiorEdges: { from: number[]; to: number[]; delay: number; opacity: number }[] = [
  { from: V, to: A, delay: 1.2, opacity: 0.25 },
  { from: V, to: B, delay: 1.2, opacity: 0.25 },
  { from: V, to: C, delay: 1.4, opacity: 0.3 },
];

const outerEdges: { from: number[]; to: number[]; delay: number; opacity: number }[] = [
  { from: A, to: P1, delay: 1.9, opacity: 0.15 },
  { from: B, to: P1, delay: 1.9, opacity: 0.15 },
  { from: B, to: P2, delay: 2.0, opacity: 0.12 },
  { from: C, to: P2, delay: 2.0, opacity: 0.12 },
  { from: C, to: P3, delay: 2.1, opacity: 0.12 },
  { from: A, to: P3, delay: 2.1, opacity: 0.12 },
];

// Internal structural lines for each plane (parallel offsets)
const structuralLines: { points: [number, number][]; delay: number }[] = [
  // Bottom plane lines
  { points: [[-20, 15], [60, -60]], delay: 0.1 },
  { points: [[-40, -10], [40, -85]], delay: 0.2 },
  // Right plane lines
  { points: [[60, -70], [60, -150]], delay: 0.3 },
  { points: [[30, -25], [30, -120]], delay: 0.4 },
  // Left plane lines
  { points: [[-60, -70], [-60, -150]], delay: 0.5 },
  { points: [[-30, -25], [-30, -120]], delay: 0.6 },
  // Diagonal cross-lines
  { points: [[-40, 10], [0, -110]], delay: 0.7 },
  { points: [[40, 10], [0, -110]], delay: 0.8 },
];

export default function Landing() {
  const [phase, setPhase] = useState<"intro" | "title" | "exiting" | "hidden">("intro");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("title"), 3500);
    const t2 = setTimeout(() => setPhase("exiting"), 6000);
    const t3 = setTimeout(() => setPhase("hidden"), 7500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "hidden") return null;

  const showSculpture = phase === "intro";

  return (
    <motion.div
      animate={phase === "exiting" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-offwhite text-charcoal overflow-hidden pointer-events-none"
    >
      {/* Grain texture */}
      <div className="oteiza-grain absolute inset-0" />

      {/* Void — concentric squares */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute flex items-center justify-center"
      >
        <svg width="640" height="640" viewBox="0 0 640 640" className="text-charcoal">
          <rect x="20" y="20" width="600" height="600" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="100" y="100" width="440" height="440" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="180" y="180" width="280" height="280" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="250" y="250" width="140" height="140" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <rect x="295" y="295" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Subtle concentric ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.02, scale: 1 }}
        transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        className="absolute w-[900px] h-[900px] border border-charcoal rounded-full"
      />

      {/* Central vertical axis */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-charcoal/[0.02] -translate-x-1/2 origin-top"
      />

      {/* Floating unidades */}
      {floatingUnits.map((unit, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={{ opacity: 0.06, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: unit.delay, ease: [0.16, 1, 0.3, 1] }}
          className="absolute border border-charcoal"
          style={{
            left: unit.x,
            top: unit.y,
            width: unit.size,
            height: unit.size,
            translate: "-50% -50%",
          }}
        />
      ))}

      {/* === 3D TRIEDRO SCULPTURE === */}
      <motion.div
        animate={
          showSculpture
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.92 }
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute flex items-center justify-center"
      >
        <motion.div
          animate={
            showSculpture
              ? { rotateX: 0, rotateY: 0 }
              : { rotateX: 0, rotateY: 0 }
          }
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <svg
            width="320"
            height="320"
            viewBox="-100 -180 200 230"
            className="overflow-visible"
          >
            {/* Plane 3 — left (back layer, drawn first) */}
            <motion.polygon
              points={`${V[0]},${V[1]} ${C[0]},${C[1]} ${P3[0]},${P3[1]} ${A[0]},${A[1]}`}
              fill="currentColor"
              fillOpacity={showSculpture ? 0.025 : 0}
              stroke="currentColor"
              strokeOpacity={showSculpture ? 0.2 : 0}
              strokeWidth="0.6"
              initial={{ opacity: 0 }}
              animate={
                showSculpture
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Plane 2 — right */}
            <motion.polygon
              points={`${V[0]},${V[1]} ${B[0]},${B[1]} ${P2[0]},${P2[1]} ${C[0]},${C[1]}`}
              fill="currentColor"
              fillOpacity={showSculpture ? 0.025 : 0}
              stroke="currentColor"
              strokeOpacity={showSculpture ? 0.2 : 0}
              strokeWidth="0.6"
              initial={{ opacity: 0 }}
              animate={
                showSculpture
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Plane 1 — bottom (front) */}
            <motion.polygon
              points={`${V[0]},${V[1]} ${A[0]},${A[1]} ${P1[0]},${P1[1]} ${B[0]},${B[1]}`}
              fill="currentColor"
              fillOpacity={showSculpture ? 0.03 : 0}
              stroke="currentColor"
              strokeOpacity={showSculpture ? 0.3 : 0}
              strokeWidth="0.8"
              initial={{ opacity: 0 }}
              animate={
                showSculpture
                  ? { opacity: 1 }
                  : { opacity: 0 }
              }
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Interior edges — V→A, V→B, V→C (skeleton) */}
            {interiorEdges.map(({ from, to, delay, opacity }, i) => (
              <motion.line
                key={`edge-${i}`}
                x1={from[0]} y1={from[1]}
                x2={to[0]} y2={to[1]}
                stroke="currentColor"
                strokeOpacity={showSculpture ? opacity : 0}
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={
                  showSculpture
                    ? { pathLength: 1 }
                    : { pathLength: 0 }
                }
                transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            {/* Outer boundary edges */}
            {outerEdges.map(({ from, to, delay, opacity }, i) => (
              <motion.line
                key={`outer-${i}`}
                x1={from[0]} y1={from[1]}
                x2={to[0]} y2={to[1]}
                stroke="currentColor"
                strokeOpacity={showSculpture ? opacity : 0}
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={
                  showSculpture
                    ? { pathLength: 1 }
                    : { pathLength: 0 }
                }
                transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            {/* Structural internal lines */}
            {structuralLines.map((line, i) => (
              <motion.line
                key={`struct-${i}`}
                x1={line.points[0][0]}
                y1={line.points[0][1]}
                x2={line.points[1][0]}
                y2={line.points[1][1]}
                stroke="currentColor"
                strokeOpacity={showSculpture ? 0.08 : 0}
                strokeWidth="0.4"
                strokeDasharray="3 4"
                initial={{ pathLength: 0 }}
                animate={
                  showSculpture
                    ? { pathLength: 1 }
                    : { pathLength: 0 }
                }
                transition={{ duration: 0.6, delay: 2.2 + line.delay, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}

            {/* Void core marker at vertex */}
            <motion.circle
              cx={V[0]} cy={V[1]} r="3"
              fill="none"
              stroke="#9B4A3A"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                showSculpture
                  ? { scale: 1, opacity: [0, 0.8, 0.4, 0.8] }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 2,
                delay: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* === MAIN TITLE === */}
      <motion.div
        animate={phase === "intro" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Top accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase === "intro" ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-px bg-rust/30 mb-8 origin-center"
        />

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={
            phase === "intro"
              ? { opacity: 0, y: 40, filter: "blur(8px)" }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl tracking-tighter uppercase text-center font-display leading-[0.9]"
        >
          espacio
          <br />
          oteiza
        </motion.h1>

        {/* Divider accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase === "intro" ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="w-12 h-[2px] bg-rust/30 my-5 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={
            phase === "intro"
              ? { opacity: 0, y: 15 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-concrete font-light text-center px-4 max-w-[280px] leading-relaxed"
        >
          exploring sculpture through space
        </motion.p>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={phase === "intro" ? { scaleX: 0 } : { scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px bg-rust/20 mt-6 origin-center"
        />

        {/* Entry hint */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={
            phase === "intro"
              ? { opacity: 0, y: 10 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 1, delay: 2.8 }}
          className="text-[9px] tracking-[0.45em] uppercase text-concrete/35 mt-14"
        >
          click to enter
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
