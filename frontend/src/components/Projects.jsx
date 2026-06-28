import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, CheckSquare, Folder, X, ChevronLeft, ChevronRight } from "lucide-react";

const projectScreenshots = {
  "dog-ecommerce": ["/dog-ecommerce.png", "/dog-ecommerce-2.png", "/dog-ecommerce-3.png"],
  "smart-wallet": ["/smart-wallet.png", "/smart-wallet-2.png", "/smart-wallet-3.png"],
  "wellbeing": ["/wellbeing.png", "/wellbeing2.png", "/wellbeing3.png"]
};

const Github = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size || 24, height: props.size || 24 }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const LiveURL = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size || 24, height: props.size || 24 }}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const liveLink = {
  "dog-ecommerce": "https://dog-vaathi.vercel.app",
  "smart-wallet": "https://smarter-wallet-one.vercel.app/",
  "wellbeing": "https://github.com/Dhodduraaj/MindEase"
}
const githubRepoMap = {
  "dog-ecommerce": "https://github.com/Dhodduraaj/DogVaathi-Mern",
  "smart-wallet": "https://github.com/Dhodduraaj/Smart-Wallet",
  "wellbeing": "https://github.com/Dhodduraaj/MindEase"
};


const dossierStamps = {
  "dog-ecommerce": { text: "FINALIZED", color: "bg-[#E63946] text-white" },
  "smart-wallet": { text: "APPROVED", color: "bg-emerald-600 text-white" },
  "wellbeing": { text: "SURVIVED", color: "bg-[#1D3557] text-white" },
  default: { text: "ACTIVE", color: "bg-slate-900 text-white" }
};

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setActiveSlide(0);
  }, [selectedProject]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-[#111C35] border-t-4 border-black relative overflow-hidden">
      {/* Background illustrated blueprint layout */}
      <div className="absolute inset-0 opacity-100 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" stroke="var(--pattern-blue)" strokeWidth="1" />
            <circle cx="20" cy="20" r="1.5" fill="var(--pattern-blue)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#E63946] text-white border-2 border-black px-3 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            CHAPTER 4
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white"
          >
            Projects{" "}
            <span className="text-white px-3 bg-[#E63946] border-4 border-black inline-block transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Dossiers
            </span>
          </motion.h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-black uppercase tracking-wider">Live deployments — bugs squashed in mid-air.</p>
          <div className="h-[4px] w-16 bg-[#E63946] border-2 border-black mx-auto mt-5" />
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.length > 0 ? (
            projects.map((project) => {
              const stamp = dossierStamps[project.imageKey] || dossierStamps.default;

              return (
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.01, transition: { type: "spring", stiffness: 300, damping: 12 } }}
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="flex flex-col border-4 border-black bg-[#FFFBF0] dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden group relative transition-all cursor-pointer"
                >
                  {/* Mock Paperclip SVG */}
                  <div className="absolute top-4 left-6 z-25 pointer-events-none transform -rotate-12">
                    <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4C8 4 6 7 6 12V36C6 40 8 43 12 43C16 43 18 40 18 36V12C18 9 16 7 13 7C10 7 9 9 9 12V32C9 33 10 34 12 34C14 34 15 33 15 32V14" stroke="#888888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 4C8 4 6 7 6 12V36C6 40 8 43 12 43C16 43 18 40 18 36V12C18 9 16 7 13 7C10 7 9 9 9 12V32C9 33 10 34 12 34C14 34 15 33 15 32V14" stroke="#000000" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Manila Folder Tab Header */}
                  <div className="relative pt-6 border-b-4 border-black">
                    {/* Tab element */}
                    <div className="absolute top-0 left-16 h-6 w-32 bg-[#EAD49E] dark:bg-slate-800 border-t-4 border-x-4 border-black transform -skew-x-12 origin-bottom flex items-center justify-center">
                      <span className="text-[8px] font-black uppercase text-black dark:text-slate-300 tracking-wider">PROJECT-FILE</span>
                    </div>

                    {/* Banner main block */}
                    <div className="h-32 bg-[#EAD49E] dark:bg-slate-800 p-6 flex flex-col justify-end relative mt-0 z-10 border-t-4 border-black">

                      {/* Halftone dot pattern per card */}
                      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                        <svg width="100%" height="100%">
                          <pattern id={`dot-${project.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
                            <circle cx="4" cy="4" r="1.5" fill="#000000" />
                          </pattern>
                          <rect width="100%" height="100%" fill={`url(#dot-${project.id})`} />
                        </svg>
                      </div>

                      {/* Dossier status stamp */}
                      <div className={`absolute top-4 right-4 ${stamp.color} border-2 border-black px-2 py-0.5 text-[8px] font-black uppercase tracking-wider transform rotate-3 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] z-20`}>
                        {stamp.text}
                      </div>

                      <h3 className="text-xl font-black text-black dark:text-white uppercase tracking-tight leading-tight group-hover:translate-x-1 transition-transform z-10">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Project Details (Short Card Preview) */}
                  <div className="p-6 flex flex-col flex-grow bg-[#FFFBF0] dark:bg-slate-900">
                    <p className="text-xs font-black text-slate-700 dark:text-slate-300 mb-6 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    <div className="flex justify-between items-center pt-4 border-t-3 border-black text-[#E63946] text-xs font-black uppercase tracking-wider">
                      <span>Click to view file</span>
                      <Folder size={16} />
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            // Skeleton Dossiers
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col border-4 border-black animate-pulse h-[300px] overflow-hidden"
              >
                <div className="h-6 w-32 bg-slate-300 border-b-4 border-r-4 border-black" />
                <div className="h-32 bg-slate-200 border-b-4 border-black" />
                <div className="p-6 flex flex-col flex-grow space-y-6">
                  <div className="h-4 w-3/4 bg-slate-300 rounded" />
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>

      {/* Dossier Detailed Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm pointer-events-auto"
            onClick={() => setSelectedProject(null)}
          >

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="relative w-full max-w-2xl max-h-[102vh] overflow-y-auto border-4 border-black bg-[#FFFBF0] dark:bg-slate-900 text-black dark:text-white p-4 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 border-3 border-black bg-[#E63946] hover:bg-red-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer z-40"
                aria-label="Close dossier"
              >
                <X size={18} strokeWidth={3} />
              </button>

              {/* Title Header */}
              <div className="border-b-4 border-black pb-4 mb-6 pr-10 md:pr-0">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">
                  CLASSIFIED DOSSIER FILE: {selectedProject.imageKey?.toUpperCase()}
                </span>
                <h3 className="text-2xl md:text-3xl font-black uppercase text-[#E63946] leading-tight">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Screenshots Carousel */}
              {projectScreenshots[selectedProject.imageKey] && (
                <div className="relative h-40 sm:h-56 md:h-72 border-4 border-black bg-slate-950 overflow-hidden mb-6 flex items-center justify-center">
                  <img
                    src={projectScreenshots[selectedProject.imageKey][activeSlide]}
                    alt={`${selectedProject.title} screenshot ${activeSlide + 1}`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />

                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const slides = projectScreenshots[selectedProject.imageKey];
                      setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 border-3 border-black bg-[#E63946] hover:bg-red-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer z-30"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft size={16} strokeWidth={3} className="pointer-events-none" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const slides = projectScreenshots[selectedProject.imageKey];
                      setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 border-3 border-black bg-[#E63946] hover:bg-red-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer z-30"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight size={16} strokeWidth={3} className="pointer-events-none" />
                  </button>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
                    {projectScreenshots[selectedProject.imageKey].map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveSlide(idx);
                        }}
                        className={`w-2 h-2 rounded-full border border-black transition-colors ${idx === activeSlide ? "bg-yellow-300" : "bg-white"}`}
                        aria-label={`Go to screenshot ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {/*<div className="mb-6">
                <p className="text-sm font-black text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>*/}

              {/* Mission Directives */}
              <div className="space-y-3 mb-6 bg-white dark:bg-slate-800 p-5 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <h4 className="text-xs font-black uppercase tracking-widest text-[#E63946] mb-1">
                  MISSION PARAMETERS & DEPLOYED DELIVERABLES:
                </h4>
                <ul className="space-y-2">
                  {selectedProject.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-black text-slate-800 dark:text-slate-300 leading-relaxed">
                      <CheckSquare size={14} className="text-[#E63946] shrink-0 mt-0.5" strokeWidth={3} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Badges */}
              <div className="mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                  TECHNOLOGICAL COMPOSITION:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-black uppercase px-2.5 py-1 border-2 border-black bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 border-t-3 border-black pt-5">
                <a
                  href={githubRepoMap[selectedProject.imageKey]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 comic-btn-red text-center text-xs flex items-center justify-center gap-2"
                >
                  <Github size={16} />
                  INSPECT CODE
                </a>
                {liveLink[selectedProject.imageKey] && (
                  <a
                    href={liveLink[selectedProject.imageKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 comic-btn-blue text-center text-xs flex items-center justify-center gap-2"
                  >
                    <LiveURL size={16} />
                    LAUNCH DEPLOYMENT
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3.5 border-3 border-black bg-white hover:bg-slate-50 text-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer sm:ml-auto"
                >
                  CLOSE DOSSIER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
