import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Scroll, Calendar } from "lucide-react";

const icons = {
  Hackathon: Trophy,
  Academic: Award,
  Certification: Scroll
};

const colors = {
  Hackathon: "text-[#E63946] bg-red-100 border-red-400 dark:bg-red-950/20",
  Academic: "text-blue-600 bg-blue-100 border-blue-400 dark:text-blue-400 dark:bg-blue-950/20",
  Certification: "text-slate-800 bg-slate-100 border-slate-350 dark:text-slate-300 dark:bg-slate-800/80"
};

const rotations = [
  "transform -rotate-1 hover:rotate-0",
  "transform rotate-1 hover:rotate-0",
  "transform -rotate-2 hover:rotate-0",
  "transform rotate-2 hover:rotate-0"
];

const pins = [
  "#E63946", // Spidey Red
  "#1D3557", // Spidey Blue
  "#FBBF24"  // Spidey Yellow
];

export default function Achievements({ achievements }) {
  return (
    <section id="achievements" className="py-24 bg-white dark:bg-[#0B1329] border-t-4 border-black relative overflow-hidden">
      {/* Background illustrated pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.01] pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="achievements-wall" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#000000" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="60" stroke="#000000" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#achievements-wall)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#E63946] text-white border-2 border-black px-3 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            CHAPTER 5
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white"
          >
            Wall of{" "}
            <span className="text-white px-3 bg-[#E63946] border-4 border-black inline-block transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Wins
            </span>
          </motion.h2>
          <div className="h-[4px] w-16 bg-[#E63946] border-2 border-black mx-auto mt-5" />
        </div>

        {/* Corkboard Bulletin Board container */}
        <div className="border-[12px] border-[#3E2723] dark:border-[#1F1311] bg-[#D7A26C] dark:bg-[#5C4033] p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative rounded-none">
          
          {/* Cork texture grid overlay */}
          <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.08] pointer-events-none z-0">
            <svg width="100%" height="100%">
              <pattern id="cork-dots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#000000" />
                <circle cx="6" cy="6" r="1" fill="#000000" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#cork-dots)" />
            </svg>
          </div>

          {/* board tag */}
          <div className="absolute top-4 left-4 bg-yellow-300 text-black border-2 border-black px-3 py-1 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10 transform -rotate-1">
            📌 TROPHY BULLETIN BOARD
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {achievements.length > 0 ? (
              achievements.map((item, idx) => {
                const Icon = icons[item.category] || Award;
                const colorClass = colors[item.category] || colors.Academic;
                const rot = rotations[idx % rotations.length];
                const pinColor = pins[idx % pins.length];

                return (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.08 }}
                    key={item.id}
                    className={`relative p-6 bg-[#FFFFF0] text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.85)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${rot} pb-10 flex flex-col justify-between`}
                    style={{ minHeight: "220px" }}
                  >
                    {/* Rendered SVG Push-Pin (No Gradients) */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-[2px_3px_0px_rgba(0,0,0,0.35)]">
                        {/* Pin Head */}
                        <circle cx="12" cy="8" r="6" fill={pinColor} stroke="#000000" strokeWidth="2" />
                        {/* Highlight */}
                        <circle cx="10" cy="6" r="1.5" fill="#ffffff" />
                        {/* Metal Shaft */}
                        <rect x="11.2" y="14" width="1.6" height="7" fill="#888888" stroke="#000000" strokeWidth="1" />
                        {/* Base collar */}
                        <ellipse cx="12" cy="14" rx="3.5" ry="1.5" fill={pinColor} stroke="#000000" strokeWidth="1.5" />
                      </svg>
                    </div>

                    <div>
                      {/* Top bar with category & date */}
                      <div className="flex justify-between items-center mb-4">
                        <span className={`inline-block px-2.5 py-0.5 border-2 border-black text-[8px] font-black uppercase tracking-wider ${colorClass}`}>
                          {item.category}
                        </span>
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <Calendar size={11} strokeWidth={2.5} />
                          {item.date}
                        </span>
                      </div>

                      <h3 className="text-base font-black text-black mb-2 uppercase leading-tight">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom illustration frame (Polaroid effect margin) */}
                    <div className="mt-6 pt-4 border-t-2 border-dashed border-black/30 flex justify-between items-center">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">RECORD INDEX #{item.id}</span>
                      <Icon className="text-[#E63946]/40" size={16} strokeWidth={2.5} />
                    </div>
                  </motion.div>
                );
              })
            ) : (
              // Skeleton cards
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="relative p-6 bg-[#FFFFF0] border-4 border-black animate-pulse h-48 flex flex-col justify-between"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-300 border-2 border-black rounded-full" />
                  <div className="h-4 w-1/3 bg-slate-200" />
                  <div className="h-5 w-3/4 bg-slate-300" />
                  <div className="h-3 w-full bg-slate-200" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
