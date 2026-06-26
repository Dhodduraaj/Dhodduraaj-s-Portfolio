import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Cpu, Layout, Wrench, Palette } from "lucide-react";

const categories = [
  { id: "Backend", label: "Backend", x: 25, y: 25, icon: Cpu },
  { id: "Frontend", label: "Frontend", x: 75, y: 25, icon: Layout },
  { id: "Design", label: "Design", x: 25, y: 75, icon: Palette },
  { id: "Tools", label: "Tools", x: 75, y: 75, icon: Wrench }
];

export default function Skills({ skills }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const activeCategory = selectedCategory;

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  // Concentric spider-web coordinates for the 4 X-spokes
  const getWebRingPoints = (scale) => {
    return categories
      .map((cat) => {
        const rx = 50 + scale * (cat.x - 50);
        const ry = 50 + scale * (cat.y - 50);
        return `${rx},${ry}`;
      })
      .join(" ");
  };

  return (
    <section id="skills" className="py-24 bg-[#FFFBF0] dark:bg-[#0B1329] border-t-4 border-black relative overflow-hidden">
      {/* Background illustrated grid layout */}
      <div className="absolute inset-0 opacity-100 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="skills-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="20" y2="0" stroke="var(--pattern-color)" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="var(--pattern-color)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#skills-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1D3557] text-white border-2 border-black px-3 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            CHAPTER 3
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white"
          >
            Power{" "}
            <span className="text-white px-3 bg-[#E63946] border-4 border-black inline-block transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Grid
            </span>
          </motion.h2>
          <div className="h-[4px] w-16 bg-[#E63946] border-2 border-black mx-auto mt-5" />
        </div>

        {/* Web Node Interactive Container */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">

          {/* SVG Web Node Canvas */}
          <div className="relative w-full max-w-[500px] h-[400px] border-4 border-black rounded-3xl bg-white dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex items-center justify-center p-4">

            {/* Custom halftone card pattern */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="canvas-halftone" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1.5" fill="#000000" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#canvas-halftone)" />
              </svg>
            </div>

            {/* Connecting lines & Concentric Web Rings */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* Concentric Web Rings (Symmetric Concentric squares) */}
              <polygon points={getWebRingPoints(0.25)} fill="none" stroke="#000000" strokeWidth="0.75" strokeDasharray="2 2" className="opacity-45" />
              <polygon points={getWebRingPoints(0.5)} fill="none" stroke="#000000" strokeWidth="0.75" strokeDasharray="3 3" className="opacity-60" />
              <polygon points={getWebRingPoints(0.75)} fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="4 4" className="opacity-80" />
              <polygon points={getWebRingPoints(1.0)} fill="none" stroke="#000000" strokeWidth="1.5" className="opacity-100" />

              {/* Radiating strands */}
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <g key={cat.id}>
                    <line
                      x1="50"
                      y1="50"
                      x2={cat.x}
                      y2={cat.y}
                      stroke={isActive ? "#E63946" : "#000000"}
                      strokeWidth={isActive ? 3.5 : 1.5}
                      className="transition-colors duration-300"
                    />
                    {/* Pulsing signal dot moving down active line */}
                    {isActive && (
                      <motion.circle
                        r="3"
                        fill="#E63946"
                        stroke="#000000"
                        strokeWidth="1"
                        animate={{
                          cx: [50, cat.x],
                          cy: [50, cat.y]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: "linear"
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Center Core Node Button */}
            <motion.button
              onClick={() => setSelectedCategory("All")}
              className="absolute z-25 p-4 rounded-full bg-[#E63946] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"

              whileHover={{ scale: 1.1 }}
              title="Reset Power Grid"
            >
              <Network className="animate-spin [animation-duration:15s] text-white" size={28} />
            </motion.button>

            {/* Category Nodes */}
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  className="absolute z-20"
                  style={{
                    left: `${cat.x}%`,
                    top: `${cat.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.button
                    onClick={() => setSelectedCategory(cat.id)}
                    whileHover={{ scale: 1.10 }}
                    whileTap={{ scale: 1.10 }}
                    className={`p-3.5 rounded-2xl border-3 border-black transition-all cursor-pointer
          shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
          flex items-center justify-center
          ${isActive
                        ? "bg-[#E63946] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                      }`}
                    aria-label={cat.label}
                  >
                    <CatIcon size={20} />

                    <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-black tracking-wider uppercase
          text-black bg-yellow-300 dark:bg-yellow-400 px-2.5 py-0.5 rounded
          border-2 border-black whitespace-nowrap
          shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                      {cat.label}
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
          {/* Connected Grid Details */}
          <div className="flex-grow w-full space-y-6">
            <div className="flex items-center justify-between border-b-4 border-black pb-3">
              <h3 className="text-xl md:text-2xl font-black text-black dark:text-white uppercase tracking-tight">
                Sector: <span className="text-[#E63946]">{activeCategory} Skills</span>
              </h3>
              {activeCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="px-3 py-1 text-xs border-2 border-black bg-white hover:bg-slate-50 text-black font-black uppercase cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
                >
                  RESET GRID
                </button>
              )}
            </div>

            {/* Elastic Skills Cards (No progress bars or percentages) */}
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: 10 }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      key={skill.id}
                      className="p-5 comic-card dark:comic-card-dark flex items-center justify-between hover:border-[#E63946] hover:-translate-y-0.5 transition-all select-none"
                    >
                      <h4 className="font-black text-black dark:text-white text-xs md:text-sm uppercase tracking-wider">
                        {skill.name}
                      </h4>
                      <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 border-2 border-black bg-[#E63946] text-white">
                        {skill.category}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-5 comic-card dark:comic-card-dark animate-pulse h-16 flex items-center justify-between"
                    >
                      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 border-2 border-black" />
                    </div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
