import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export default function SpiderOverlay({ introPhase, onSkip, darkMode }) {
  // Battery API guard
  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((battery) => {
        if (battery.level < 0.20 && !battery.charging) {
          console.warn("Low battery: bypassing intro animation.");
          onSkip();
        }
      });
    }
  }, [onSkip]);

  // Keypress listener to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        onSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSkip]);

  // Colors
  const colors = useMemo(() => {
    return {
      bg: darkMode ? "#0B1329" : "#FFFBF0",
      glow: "var(--color-brand-red, #E63946)",
    };
  }, [darkMode]);

  const maskRadiusVariants = {
    logo: { r: 0 },
    name: { r: 0 },
    reveal: { r: 1200, transition: { duration: 1.2, ease: "easeInOut" } },
    complete: { r: 1200 }
  };

  const isLogoVisible = introPhase === "logo";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        overflow: "hidden",
        userSelect: "none",
        pointerEvents: introPhase === "reveal" ? "none" : "auto",
      }}
    >
      {/* SVG Canvas for background masking reveal */}
      <svg
        viewBox="0 0 1000 1000"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Radial mask cutting a hole outward from center (500,500) */}
          <mask id="radial-reveal-mask">
            {/* White: everything is opaque backdrop */}
            <rect x="-200" y="-200" width="1400" height="1400" fill="white" />
            {/* Black: cuts a hole to reveal website underneath */}
            <motion.circle
              cx="500"
              cy="500"
              r={0}
              fill="black"
              variants={maskRadiusVariants}
              initial="logo"
              animate={introPhase}
            />
          </mask>

          {/* Spider-Sense central beacon glow */}
          <radialGradient id="spider-beacon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E63946" stopOpacity={darkMode ? "0.4" : "0.28"} />
            <stop offset="45%" stopColor="#E63946" stopOpacity={darkMode ? "0.15" : "0.08"} />
            <stop offset="100%" stopColor="#E63946" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Group masked by radial-reveal-mask so all background visuals smoothly peel open */}
        <g mask="url(#radial-reveal-mask)">
          {/* Backdrop rectangle */}
          <rect
            x="-200"
            y="-200"
            width="1400"
            height="1400"
            fill={colors.bg}
          />

          {/* Concentric Spider-Sense Beacon Waves moving outward from the spinning center icon */}
          <motion.g
            animate={{ opacity: isLogoVisible ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Ambient beacon center glow */}
            <circle cx="500" cy="500" r="380" fill="url(#spider-beacon-glow)" />

            {/* Static Spider-Sense radial web lines (8 spokes) */}
            <g stroke={darkMode ? "rgba(230, 57, 70, 0.16)" : "rgba(230, 57, 70, 0.2)"} strokeWidth="1.2">
              <line x1="500" y1="500" x2="500" y2="-100" />
              <line x1="500" y1="500" x2="500" y2="1100" />
              <line x1="500" y1="500" x2="-100" y2="500" />
              <line x1="500" y1="500" x2="1100" y2="500" />
              <line x1="500" y1="500" x2="-80" y2="-80" />
              <line x1="500" y1="500" x2="1080" y2="-80" />
              <line x1="500" y1="500" x2="-80" y2="1080" />
              <line x1="500" y1="500" x2="1080" y2="1080" />
            </g>

            {/* Subtle guideline concentric rings */}
            {[200, 350, 500, 650, 800].map((radius) => (
              <circle
                key={`guide-${radius}`}
                cx="500"
                cy="500"
                r={radius}
                fill="none"
                stroke={darkMode ? "rgba(230, 57, 70, 0.12)" : "rgba(230, 57, 70, 0.15)"}
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            ))}

            {/* Dynamic series of concentric circles moving out from the spinning icon */}
            {[0, 1, 2, 3, 4, 5].map((idx) => {
              const isAccent = idx % 2 === 1;
              return (
                <motion.circle
                  key={`pulse-wave-${idx}`}
                  cx="500"
                  cy="500"
                  fill="none"
                  stroke={isAccent ? (darkMode ? "#FFD166" : "#E63946") : "#E63946"}
                  strokeWidth={isAccent ? 2 : 3}
                  strokeDasharray={isAccent ? "10 8" : undefined}
                  initial={{ r: 100, opacity: 0 }}
                  animate={{
                    r: [100, 280, 540, 840],
                    opacity: [0, 0.85, 0.45, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.4,
                    delay: idx * 0.56,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </motion.g>
        </g>
      </svg>

      {/* Skip button on top right */}
      {introPhase !== "reveal" && (
        <button
          onClick={onSkip}
          className="absolute top-6 right-6 border-4 border-black px-4 py-2 bg-[#E63946] text-white font-black uppercase tracking-widest text-[10px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer z-50 select-none"
        >
          Skip Intro ➔
        </button>
      )}

      {/* Centered Logo & Comic Bubble */}
      <motion.div
        animate={{ opacity: isLogoVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6"
      >
        {/* Rotating & Pulsing Center Logo */}
        <motion.img
          src="/spider-man-comic-new-seeklogo.png"
          alt="Spider-Man Comic Logo"
          className="w-48 h-48 md:w-56 md:h-56 object-contain"
          animate={{
            rotate: 360,
            scale: [0.92, 1, 0.92],
            filter: [
              "drop-shadow(0 0 8px rgba(230, 57, 70, 0.35))",
              "drop-shadow(0 0 20px rgba(230, 57, 70, 0.8))",
              "drop-shadow(0 0 8px rgba(230, 57, 70, 0.35))"
            ]
          }}
          transition={{
            rotate: { repeat: Infinity, duration: 12, ease: "linear" },
            scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            filter: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
        />

        {/* Comic speech bubble popping in below the logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: 6 }}
          animate={isLogoVisible ? { scale: 1, opacity: 1, rotate: -2 } : { scale: 0.8, opacity: 0 }}
          transition={{
            scale: { type: "spring", stiffness: 140, damping: 9, delay: 0.90 },
            opacity: { duration: 0.25 },
            rotate: { type: "spring", stiffness: 120, damping: 10, delay: 0.90 }
          }}
          className="mt-8 px-6 py-2.5 bg-yellow-400 text-black border-4 border-black font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative select-none"
        >
          BEACON ACTIVATED
          {/* Small comic bubble spike pointing up to the logo */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-black" />
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-yellow-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}
