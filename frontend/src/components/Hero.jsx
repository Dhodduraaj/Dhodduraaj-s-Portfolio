import React, { useEffect, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { motion } from "framer-motion";

const roles = [
  "I build Spring Boot APIs that don't panic under load.",
  "Slinging clean code blocks and robust backend grids.",
  "Catching server bugs in mid-air before they escape."
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Parallax Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-28 pb-32 bg-[#FFFBF0] dark:bg-[#0B1329] border-b-4 border-black"
    >
      {/* Dynamic Comic Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04] pointer-events-none z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hero-halftone" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="3" fill="#000000" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-halftone)" />
        </svg>
      </div>

      {/* Layered Concentric Spider Web SVG (Sways Gently) */}
      <motion.div
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        style={{ transformOrigin: "top right" }}
        className="absolute right-0 top-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] text-[#1D3557] dark:text-[#E63946] pointer-events-none opacity-25 z-0"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.35">
          <polygon points="100,0 100,50 50,0" />
          <polygon points="100,0 100,75 25,0" />
          <polygon points="100,0 100,90 10,0" />
          <line x1="100" y1="0" x2="0" y2="100" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="50" y2="100" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="0" y2="50" strokeWidth="0.5" />
          {/* Web Spoke Rings */}
          <path d="M 50,50 Q 75,25 100,50" strokeWidth="0.5" />
          <path d="M 25,75 Q 60,40 100,75" strokeWidth="0.5" />
          <path d="M 0,100 Q 50,50 100,100" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Drifting Clouds (Visual Environment Action) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Red Spidey Cloud */}
        <motion.div
          initial={{ x: "-150px" }}
          animate={{ x: "100vw" }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          className="absolute top-24 opacity-20 dark:opacity-10"
        >
          <svg width="120" height="60" viewBox="0 0 120 60" fill="currentColor" className="text-[#E63946]">
            <path d="M 20,40 A 15,15 0 0,1 50,40 A 20,20 0 0,1 90,40 A 15,15 0 0,1 110,40 A 10,10 0 0,1 120,45 L 0,45 Z" />
          </svg>
        </motion.div>

        {/* Blue Spidey Cloud */}
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: "-150px" }}
          transition={{ repeat: Infinity, duration: 110, ease: "linear" }}
          className="absolute top-44 opacity-25 dark:opacity-10"
        >
          <svg width="150" height="75" viewBox="0 0 150 75" fill="currentColor" className="text-[#1D3557]">
            <path d="M 20,50 A 20,20 0 0,1 60,50 A 25,25 0 0,1 110,50 A 20,20 0 0,1 140,50 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Pop-Art Callouts / Accents */}
      <div className="absolute top-24 left-10 hidden lg:block pointer-events-none z-10">
        <motion.div
          animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="border-3 border-black bg-yellow-300 text-black px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-6"
        >
          💥 BUG BUSTER!
        </motion.div>
      </div>

      <div className="absolute bottom-48 right-12 hidden lg:block pointer-events-none z-10">
        <motion.div
          animate={{ rotate: [5, -5, 5], scale: [1, 0.95, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="border-3 border-black bg-[#E63946] text-white px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-6"
        >
          🚀 PROD SURVIVED!
        </motion.div>
      </div>

      {/* Skyline Silhouettes City Backdrop (Multi-layered, Visual Parallax Density) */}
      {/* Background Layer (Deep Blue Buildings - Parallax speed 0.3) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none flex items-end justify-between px-1 opacity-70 overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.28}px)` }}
      >
        <div className="w-[12%] h-24 bg-[#1D3557] border-t-3 border-r-3 border-black opacity-30" />
        <div className="w-[15%] h-36 bg-[#1D3557] border-t-3 border-x-3 border-black opacity-30" />
        <div className="w-[10%] h-20 bg-[#1D3557] border-t-3 border-x-3 border-black opacity-30" />
        <div className="w-[18%] h-40 bg-[#1D3557] border-t-3 border-l-3 border-black opacity-30" />
      </div>

      {/* Midground Layer (Skyscraper Silhouettes with Flickering Windows - Parallax speed 0.12) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 z-1 pointer-events-none flex items-end justify-between px-2 overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      >
        {/* Building 1 */}
        <div className="w-[18%] h-36 bg-[#1D3557] dark:bg-[#1D3557] border-t-4 border-r-4 border-black relative">
          <div className="absolute top-4 left-3 w-3 h-4 bg-yellow-300 border-2 border-black animate-flicker-slow" />
          <div className="absolute top-4 right-3 w-3 h-4 bg-yellow-300 border-2 border-black" />
          <div className="absolute top-12 left-3 w-3 h-4 bg-yellow-300 border-2 border-black" />
          <div className="absolute top-20 left-3 w-3 h-4 bg-yellow-300 border-2 border-black animate-flicker-fast" />
          {/* Chimney Pipe */}
          <div className="absolute -top-6 left-4 w-4 h-6 bg-[#0B1329] dark:bg-black border-3 border-black" />
        </div>
        {/* Building 2 */}
        <div className="w-[24%] h-44 bg-[#0B1329] dark:bg-black border-t-4 border-x-4 border-black relative">
          <div className="absolute top-3 left-4 w-3.5 h-4.5 bg-yellow-300 border-2 border-black animate-flicker-fast" />
          <div className="absolute top-3 right-4 w-3.5 h-4.5 bg-yellow-300 border-2 border-black" />
          <div className="absolute top-12 left-4 w-3.5 h-4.5 bg-yellow-300 border-2 border-black animate-flicker-slow" />
          <div className="absolute top-12 right-4 w-3.5 h-4.5 bg-yellow-300 border-2 border-black" />
          <div className="absolute top-22 left-4 w-3.5 h-4.5 bg-yellow-300 border-2 border-black animate-flicker-fast" />
          <div className="absolute top-22 right-4 w-3.5 h-4.5 bg-yellow-300 border-2 border-black" />
          {/* Antenna */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1.5 h-10 bg-black dark:bg-white" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-2 bg-yellow-300 border-2 border-black rounded-full" />
        </div>
        {/* Building 3 */}
        <div className="w-[16%] h-28 bg-[#1D3557] dark:bg-[#1D3557] border-t-4 border-x-4 border-black relative">
          <div className="absolute top-4 left-3 w-3 h-4 bg-yellow-300 border-2 border-black animate-flicker-slow" />
          <div className="absolute top-12 left-3 w-3 h-4 bg-yellow-300 border-2 border-black" />
          <div className="absolute top-4 right-3 w-3 h-4 bg-yellow-300 border-2 border-black animate-flicker-fast" />
        </div>
        {/* Building 4 */}
        <div className="w-[20%] h-40 bg-[#0B1329] dark:bg-black border-t-4 border-l-4 border-black relative">
          <div className="absolute top-6 left-3 w-3.5 h-4.5 bg-yellow-300 border-2 border-black animate-flicker-fast" />
          <div className="absolute top-6 right-3 w-3.5 h-4.5 bg-yellow-300 border-2 border-black animate-flicker-slow" />
          <div className="absolute top-16 left-3 w-3.5 h-4.5 bg-yellow-300 border-2 border-black" />
          <div className="absolute top-26 left-3 w-3.5 h-4.5 bg-yellow-300 border-2 border-black" />
        </div>
      </div>

      {/* Decorative Web line stretching across skyscrapers */}
      <svg className="absolute bottom-28 left-0 w-full h-16 pointer-events-none z-1 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M 0,12 Q 320,60 640,15 T 1280,48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      </svg>

      <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
        
        {/* Tilted Chapter Header */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1D3557] text-white border-2 border-black px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20">
          PAGE 1: A NEW BACKEND DEV AWAKENS...
        </div>

        {/* Swinging Badge */}
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-none border-4 border-black bg-white text-black text-xs md:text-sm font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-10"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#E63946] border-2 border-black animate-ping" />
          BEACON STATUS: ACTIVE
        </motion.div>

        {/* Main Tilted Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-6 uppercase leading-none"
        >
          I am{" "}
          <span className="text-white px-4 py-2.5 bg-[#E63946] border-4 border-black inline-block transform -rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            DHODDURAAJ
          </span>
        </motion.h1>

        {/* Narrative Tagline Loop */}
        <div className="h-12 md:h-16 overflow-hidden mb-10">
          <motion.p
            key={roleIndex}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.35 }}
            className="text-base md:text-3xl font-black text-[#1D3557] dark:text-[#E63946] uppercase tracking-wide px-3"
          >
            {roles[roleIndex]}
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm md:text-lg text-slate-700 dark:text-slate-350 max-w-xl mx-auto mb-14 font-black leading-relaxed border-2 border-black bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Computer Science and Design student at Kongu Engineering College. By day, I structure robust database frameworks. 
          By night, I swing across server codes to squash exceptions and secure deployments.
        </motion.p>

        {/* CTAs in Flat Comic Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto px-10 py-5 comic-btn-red text-lg flex items-center justify-center gap-3"
          >
            INSPECT MISSIONS
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>
          
          <a
            href="/Dhodduraaj_Resume.txt"
            download="Dhodduraaj_Resume.txt"
            className="w-full sm:w-auto px-10 py-5 border-4 border-black bg-white hover:bg-slate-50 text-black font-black text-lg uppercase flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            <FileText size={20} strokeWidth={2.5} />
            DOWNLOAD DOSSIER
          </a>
        </motion.div>
      </div>

    </section>
  );
}
