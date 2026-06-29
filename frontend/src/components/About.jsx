import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award } from "lucide-react";

export default function About() {
  const panelVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#111C35] border-t-4 border-black relative overflow-hidden">
      {/* Background Illustrated Brick Pattern/Grid (Solid vector shapes) */}
      <div className="absolute inset-0 opacity-100 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brick-pattern" width="40" height="20" patternUnits="userSpaceOnUse">
              <rect width="40" height="20" fill="none" stroke="var(--pattern-color)" strokeWidth="1.5" />
              <line x1="20" y1="0" x2="20" y2="20" stroke="var(--pattern-color)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brick-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#E63946] text-white border-2 border-black px-3 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            CHAPTER 2
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white"
          >
            Origin{" "}
            <span className="text-white px-3 bg-[#E63946] border-4 border-black inline-block transform rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Story
            </span>
          </motion.h2>
          <div className="h-[4px] w-16 bg-[#E63946] border-2 border-black mx-auto mt-5" />
        </div>

        {/* Comic Strip Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Panel 1: Story Intro (Left - 7 cols) */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 p-8 comic-card dark:comic-card-dark text-black dark:text-white transform -rotate-1 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Comic panel header tab */}
            <div className="absolute top-0 left-0 bg-[#E63946] text-white text-[10px] font-black uppercase px-4 py-1.5 border-b-4 border-r-4 border-black z-10">
              PANEL #1: CORE PHILOSOPHY
            </div>

            {/* Retro dots overlay inside header */}
            <div className="absolute top-0 right-0 w-24 h-12 opacity-[0.15] dark:opacity-[0.08] pointer-events-none">
              <svg width="100%" height="100%">
                <pattern id="card-halftone-1" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="1.5" fill="#000000" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#card-halftone-1)" />
              </svg>
            </div>

            <div className="space-y-5 pt-6 flex-grow">
              <h3 className="text-2xl md:text-3xl font-black text-black dark:text-white uppercase leading-tight mt-2">
                "With great power comes great responsibility!"
              </h3>
              <p className="text-sm font-black text-justify text-slate-700 dark:text-slate-300 leading-relaxed">
                Motivated Computer Science and Design student with hands-on experience in full-stack and backend development
                using Java, Spring Boot, and the MERN stack. Passionate about building scalable, user-centric applications and eager
                to apply strong problem-solving skills to real-world software development challenges.
              </p>
              <p className="text-sm font-black  text-slate-700 dark:text-slate-300 leading-relaxed">
                Rather than relying on templated designs, I prefer constructing custom mechanical frames, writing  entity mapping tables, and slinging responsive code widgets.
              </p>
            </div>

            {/* BAM bubble badge */}
            <div className="absolute bottom-4 right-4 transform rotate-6 select-none scale-90 sm:scale-100 z-10">
              <div className="relative bg-yellow-300 text-black border-3 border-black text-xs font-black px-4 py-2 uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                BAM!
              </div>
            </div>
          </motion.div>

          {/* Panel 2: Academics (Right - 5 cols) */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 comic-card dark:comic-card-dark text-black dark:text-white transform rotate-1 relative flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 bg-[#1D3557] text-white text-[10px] font-black uppercase px-4 py-1.5 border-b-4 border-r-4 border-black z-10">
              PANEL #2: ACADEMIC INDEX
            </div>

            <div className="flex items-center gap-3.5 mb-6 mt-6">
              <div className="p-2 border-2 border-black bg-[#E63946] text-white">
                <GraduationCap size={24} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-black dark:text-white uppercase">Education Node</h3>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="relative pl-6 border-l-3 border-black dark:border-white">
                <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-none border-2 border-black bg-[#E63946]" />
                <span className="text-[10px] font-black text-[#E63946] uppercase tracking-wider block mb-1">2023 - 2027</span>
                <h4 className="font-black text-black dark:text-white leading-tight uppercase text-sm">B.E. Computer Science and Design</h4>
                <p className="text-xs text-slate-500 font-black uppercase mt-0.5">Kongu Engineering College</p>

                {/* CGPA Star/Shield Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mt-4 border-3 border-black bg-[#E63946] text-white text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                  <Award size={16} strokeWidth={2.5} />
                  CGPA: 9.10 / 10.0
                </div>
              </div>

              <div className="relative pl-6 border-l-3 border-black dark:border-white">
                <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-none border-2 border-black bg-black dark:bg-white" />
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">HSC CLASS XII</span>
                <h4 className="font-black text-black dark:text-white leading-tight uppercase text-sm">Graduated with 92% Marks</h4>
                <p className="text-xs text-slate-500 font-black uppercase">Bharathiyar Matriculation School, Attur</p>
              </div>
            </div>
          </motion.div>

          {/* Panel 3: Technical Focus Grid (Full width below) */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8 mt-4"
          >
            {/* Sector 1 */}
            <div className="p-6 comic-card dark:comic-card-dark flex flex-col justify-between h-44 relative overflow-hidden group hover:-rotate-1 transition-transform">
              <div className="absolute top-0 right-0 bg-[#E63946] text-white text-[9px] font-black px-3 py-1 border-b-3 border-l-3 border-black">
                INTEREST #01
              </div>
              <div className="p-2 w-fit border-2 border-black bg-yellow-300 text-black mb-3">
                <BookOpen size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-black text-black dark:text-white text-base uppercase">Data Structures and Algorithms</h4>
                <p className="text-xs text-slate-500 font-black mt-1.5">Webbing together arrays and strings with efficient logics.</p>
              </div>
            </div>

            {/* Sector 2 */}
            <div className="p-6 comic-card dark:comic-card-dark flex flex-col justify-between h-44 relative overflow-hidden group hover:rotate-1 transition-transform">
              <div className="absolute top-0 right-0 bg-[#E63946] text-white text-[9px] font-black px-3 py-1 border-b-3 border-l-3 border-black">
                INTEREST #02
              </div>
              <div className="p-2 w-fit border-2 border-black bg-[#E63946] text-white mb-3">
                <GraduationCap size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-black text-black dark:text-white text-base uppercase">Java Microservices</h4>
                <p className="text-xs text-slate-500 font-black mt-1.5">Building the backend suit with Spring Boot fundamentals.</p>
              </div>
            </div>

            {/* Sector 3 */}
            <div className="p-6 comic-card dark:comic-card-dark flex flex-col justify-between h-44 relative overflow-hidden group hover:-rotate-1 transition-transform">
              <div className="absolute top-0 right-0 bg-[#E63946] text-white text-[9px] font-black px-3 py-1 border-b-3 border-l-3 border-black">
                INTEREST #03
              </div>
              <div className="p-2 w-fit border-2 border-black bg-[#1D3557] text-white mb-3">
                <Award size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-black text-black dark:text-white text-base uppercase">Database Management Systems</h4>
                <p className="text-xs text-slate-500 font-black mt-1.5">Making sure data stays consistent - query by query.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
