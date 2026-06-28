import React, { useEffect, useState } from "react";
import { ArrowRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Responsibility-driven full-stack engineer",
  "I build projects that don't panic under load",
  "Yours Friendly Neighbourhood Developer"
];

const originalLetters = Array.from("DHODDURAAJ");
const targetLetters = Array.from("SPIDER-MAN");

// Stencil skeleton coordinates mapped to a 100x120 SVG box
// Hand-curved quadratic bezier curves (Q) to simulate organic spider-webs (no straight lines!)
function InteractiveName({ introPhase }) {
  const [isHovered, setIsHovered] = useState(false);

  // Card transition styles during name form
  const cardVariants = {
    logo: {
      opacity: 0,
      scale: 0.85,
      rotate: 0,
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "rgba(0,0,0,0)",
      boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
    },
    name: {
      opacity: 1,
      scale: [0.85, 1.08, 0.97, 1],
      rotate: -2,
      backgroundColor: "#E63946",
      borderColor: "#000000",
      boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
      x: [0, -1, 1, -1.5, 1.5, 0],
      y: [0, 1.5, -1, 1, -1.5, 0],
      transition: {
        opacity: { duration: 0.4 },
        backgroundColor: { delay: 0.2, duration: 0.5, ease: "easeOut" },
        borderColor: { delay: 0.2, duration: 0.5, ease: "easeOut" },
        boxShadow: { delay: 0.4, duration: 0.3 },
        rotate: { delay: 0.2, duration: 0.6, type: "spring", stiffness: 180, damping: 10 },
        scale: { delay: 0.2, duration: 0.6, ease: "easeInOut" },
        x: { delay: 0.2, duration: 0.6 },
        y: { delay: 0.2, duration: 0.6 }
      }
    },
    reveal: {
      opacity: 1,
      scale: 1,
      rotate: -2,
      backgroundColor: "#E63946",
      borderColor: "#000000",
      boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
    },
    complete: {
      opacity: 1,
      scale: 1,
      rotate: -2,
      backgroundColor: "#E63946",
      borderColor: "#000000",
      boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)",
    }
  };

  const realTextVariants = {
    logo: {
      opacity: 0,
      scale: 0.8
    },
    name: (idx) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.15 + idx * 0.05
      }
    }),
    reveal: { opacity: 1, scale: 1 },
    complete: { opacity: 1, scale: 1 }
  };

  return (
    <motion.span
      variants={cardVariants}
      animate={introPhase}
      onMouseEnter={() => {
        if (introPhase === "reveal" || introPhase === "complete") setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (introPhase === "reveal" || introPhase === "complete") setIsHovered(false);
      }}
      className="relative text-white px-4 py-2.5 border-4 inline-flex items-center cursor-pointer select-none overflow-hidden relative z-[49]"
    >
      {/* Marvel Logo Red/White Diagonal Swipe Overlay on Hover */}
      <motion.div
        className="absolute inset-0 bg-[#CC1E2A] z-0"
        initial={{ x: "-100%" }}
        animate={{ x: (isHovered && (introPhase === "reveal" || introPhase === "complete")) ? "0%" : "-100%" }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
      />
      {/* Subtle Yellow Flash on Hover State Trigger */}
      <motion.div
        className="absolute inset-0 bg-yellow-400 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: (isHovered && (introPhase === "reveal" || introPhase === "complete")) ? [0, 0.8, 0] : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Letter slots */}
      <span className="relative z-10 inline-flex font-black tracking-tight">
        {originalLetters.map((char, idx) => {
          const targetChar = targetLetters[idx];
          return (
            <span
              key={idx}
              className="relative inline-block w-[0.75em] h-[1.15em] overflow-hidden"
            >
              {/* Real Text Letters */}
              <motion.span
                className="absolute left-0 right-0 flex flex-col items-center justify-start h-[200%]"
                custom={idx}
                variants={realTextVariants}
                animate={introPhase}
                style={{ y: (isHovered && (introPhase === "reveal" || introPhase === "complete")) ? "-50%" : "0%" }}
              >
                {/* Top Letter: Original */}
                <span className="h-[50%] flex items-center justify-center">{char}</span>
                {/* Bottom Letter: Target */}
                <span className="h-[50%] flex items-center justify-center text-[#114C92] font-sans tracking-tighter">
                  {targetChar}
                </span>
              </motion.span>
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}

export default function Hero({ introPhase, darkMode }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [cameraFlash, setCameraFlash] = useState(false);

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

  // World Reveal Timed Variants
  const layer1Variants = {
    logo: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
    name: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
    reveal: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 0.0 } },
    complete: { opacity: 1, scale: 1, filter: "blur(0px)" }
  };

  const layer2Variants = {
    logo: { opacity: 0, y: 35, filter: "blur(8px)" },
    name: { opacity: 0, y: 35, filter: "blur(8px)" },
    reveal: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
    complete: { opacity: 1, y: 0, filter: "blur(0px)" }
  };

  const layer3Variants = {
    logo: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
    name: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
    reveal: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut", delay: 0.55 } },
    complete: { opacity: 1, scale: 1, filter: "blur(0px)" }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-28 pb-32 bg-[#FFFBF0] dark:bg-[#0B1329] border-b-4 border-black"
    >
      {/* Camera Flash Screen Overlay */}
      <AnimatePresence>
        {cameraFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Layer 1 - Backdrop Silhouettes & Environmental Elements */}
      <motion.div
        variants={layer1Variants}
        animate={introPhase}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {/* Left-Side Skyscraper Silhouette */}
        <div className="absolute left-0 bottom-0 h-96 w-44 z-0 flex items-end overflow-hidden opacity-85 dark:opacity-50">
          <svg viewBox="0 0 100 200" className="w-full h-full text-[#1D3557] dark:text-[#0B1329]" fill="currentColor">
            <polygon points="0,200 40,40 50,40 55,20 60,40 70,40 100,200" stroke="#000000" strokeWidth="2.5" />
            <g fill="#FBBF24" stroke="#000000" strokeWidth="0.5">
              <rect x="25" y="70" width="4" height="6" className="animate-flicker-slow" />
              <rect x="35" y="70" width="4" height="6" />
              <rect x="45" y="70" width="4" height="6" className="animate-flicker-fast" />

              <rect x="23" y="90" width="4" height="6" />
              <rect x="33" y="90" width="4" height="6" className="animate-flicker-slow" />
              <rect x="43" y="90" width="4" height="6" />
              <rect x="53" y="90" width="4" height="6" className="animate-flicker-fast" />

              <rect x="20" y="110" width="4" height="6" className="animate-flicker-fast" />
              <rect x="30" y="110" width="4" height="6" />
              <rect x="40" y="110" width="4" height="6" className="animate-flicker-slow" />
              <rect x="50" y="110" width="4" height="6" />

              <rect x="18" y="130" width="4" height="6" />
              <rect x="28" y="130" width="4" height="6" className="animate-flicker-slow" />
              <rect x="38" y="130" width="4" height="6" />
              <rect x="48" y="130" width="4" height="6" className="animate-flicker-fast" />
            </g>
          </svg>
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

        {/* Web Hanging Camera */}
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          style={{ transformOrigin: "50% 0px" }}
          className="absolute top-0 left-4 w-20 h-[180px] md:left-10 md:w-28 md:h-[260px] z-10 pointer-events-auto cursor-pointer group select-none block"
          onClick={() => {
            setCameraFlash(true);
            setTimeout(() => setCameraFlash(false), 200);
            window.dispatchEvent(new CustomEvent("show-spidey-polaroid"));
          }}
        >
          <svg viewBox="0 0 100 220" className="w-full h-full text-slate-800 dark:text-slate-200">
            <line x1="50" y1="0" x2="50" y2="150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50" y1="0" x2="50" y2="150" stroke="#000000" strokeWidth="0.5" />

            <g transform="translate(50, 150) translate(-25, 0)">
              <path d="M 12,0 C 12,-6 38,-6 38,0" fill="none" stroke="#000000" strokeWidth="2.5" />
              <rect x="0" y="0" width="50" height="34" rx="4" fill="#2D3748" stroke="#000000" strokeWidth="3" />
              <rect x="3" y="3" width="10" height="28" fill="#1A202C" />
              <circle cx="30" cy="17" r="13" fill="#1A202C" stroke="#000000" strokeWidth="2.5" />
              <circle cx="30" cy="17" r="8" fill="#4A5568" />
              <circle cx="27" cy="14" r="2.5" fill="#FFFFFF" opacity="0.6" />
              <rect x="18" y="-6" width="14" height="6" fill="#A0AEC0" stroke="#000000" strokeWidth="2.5" />
              <polygon points="19,-1 31,-1 29,-5 21,-5" fill="#FFFFFF" />
              <circle cx="8" cy="8" r="2" fill="#E63946" className="animate-pulse" />
              <circle cx="8" cy="8" r="3.5" fill="none" stroke="#E63946" strokeWidth="0.5" className="animate-ping" style={{ transformOrigin: "8px 8px" }} />

              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-[-10px] scale-75 origin-bottom">
                <rect x="-10" y="42" width="70" height="18" fill="#FBBF24" stroke="#000000" strokeWidth="2" />
                <text x="25" y="54" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="900" fontFamily="sans-serif">📸 CLICK FLASH!</text>
              </g>
            </g>
          </svg>
        </motion.div>

        {/* Floating Newspaper (Daily Bugle) */}
        <motion.a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="absolute left-10 top-[280px] w-48 bg-[#FFFDF0] border-4 border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all rotate-3 z-10 pointer-events-auto hidden lg:block select-none cursor-pointer group"
        >
          <div className="border-b-2 border-black pb-1 mb-2 text-center">
            <div className="bg-[#E63946] text-white text-[10px] font-black uppercase py-0.5 tracking-widest border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
              DAILY BUGLE
            </div>
            <div className="text-[6px] font-black text-slate-500 uppercase mt-0.5 tracking-wider">
              THE VOICE OF THE CITY • 10¢
            </div>
          </div>

          <h4 className="text-[10px] font-black uppercase text-black leading-tight mb-2 tracking-tight group-hover:text-[#E63946] transition-colors">
            SPIDER-MAN SIGHTED DEVELOPING SPRING BOOT API PORTS!
          </h4>

          <div className="flex gap-2">
            <div className="w-1/2 text-[5.5px] font-bold text-slate-700 leading-normal border-r border-black/35 pr-1">
              Bystanders claim Peter Parker webbed a Neon database connector to Java. "Bugs are disappearing in mid-air!" said one local citizen.
            </div>
            <div className="w-1/2 text-[5.5px] font-bold text-slate-700 leading-normal">
              Daily Bugle chief demands answers: "Is he a menace or a full-stack engineer? Read page 3 for our complete analysis!"
            </div>
          </div>

          <div className="mt-3 text-[7px] font-black text-[#E63946] uppercase tracking-wider text-right animate-pulse">
            READ FULL REPORT 🗞️
          </div>
        </motion.a>

        {/* Dynamic Comic Grid Pattern Background */}
        <div className="absolute inset-0 opacity-100 pointer-events-none z-0">
          <svg width="100%" height="100%">
            <pattern id="hero-halftone" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="3" fill="var(--pattern-color)" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hero-halftone)" />
          </svg>
        </div>

        {/* Layered Concentric Spider Web SVG */}
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          style={{ transformOrigin: "top right" }}
          className="absolute right-0 top-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] text-[#1D3557] dark:text-[#E63946] opacity-25 z-0"
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.35">
            <polygon points="100,0 100,50 50,0" />
            <polygon points="100,0 100,75 25,0" />
            <polygon points="100,0 100,90 10,0" />
            <line x1="100" y1="0" x2="0" y2="100" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="50" y2="100" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="0" y2="50" strokeWidth="0.5" />
            <path d="M 50,50 Q 75,25 100,50" strokeWidth="0.5" />
            <path d="M 25,75 Q 60,40 100,75" strokeWidth="0.5" />
            <path d="M 0,100 Q 50,50 100,100" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {/* Drifting Clouds */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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

        {/* Decorative Web line stretching across skyscrapers */}
        <svg className="absolute bottom-28 left-0 w-full h-16 z-1 text-black dark:text-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,12 Q 320,60 640,15 T 1280,48" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </motion.div>

      {/* Layer 3 - Background Pop-Art Callouts */}
      <motion.div
        variants={layer3Variants}
        animate={introPhase}
        className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-24 left-10 hidden lg:block">
          <motion.div
            animate={{ rotate: [-5, 5, -5], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="border-3 border-black bg-yellow-300 text-black px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-6"
          >
            💥 BUG BUSTER!
          </motion.div>
        </div>

        <div className="absolute bottom-48 right-12 hidden lg:block">
          <motion.div
            animate={{ rotate: [5, -5, 5], scale: [1, 0.95, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="border-3 border-black bg-[#E63946] text-white px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rotate-6"
          >
            🚀 PROD SURVIVED!
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
        {/* Tilted Chapter Header (Layer 2) */}
        <motion.div
          variants={layer2Variants}
          animate={introPhase}
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1D3557] text-white border-2 border-black px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20"
        >
          PAGE 1: A NEW DEVELOPER AWAKENS...
        </motion.div>

        {/* Swinging Badge (Layer 2) */}
        <motion.div
          variants={layer2Variants}
          animate={introPhase}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-none border-4 border-black bg-white text-black text-xs md:text-sm font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-10"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#E63946] border-2 border-black animate-ping" />
          BEACON STATUS: ACTIVE
        </motion.div>

        {/* Main Tilted Heading (Mixed Coordination) */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white mb-6 uppercase leading-none relative z-[49]">
          <motion.span
            variants={{
              logo: { opacity: 0, filter: "blur(8px)" },
              name: { opacity: 0, filter: "blur(8px)" },
              reveal: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.6, delay: 0.3 } },
              complete: { opacity: 1, filter: "blur(0px)" }
            }}
            animate={introPhase}
            className="inline-block mr-3"
          >
            I am
          </motion.span>
          <InteractiveName introPhase={introPhase} darkMode={darkMode} />
        </h1>

        {/* Narrative Tagline Loop (Layer 2) */}
        <motion.div
          variants={layer2Variants}
          animate={introPhase}
          className="h-12 md:h-16 overflow-hidden mb-10"
        >
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
        </motion.div>

        {/* Narrative Card (Layer 2) */}
        <motion.p
          variants={layer2Variants}
          animate={introPhase}
          className="text-sm md:text-lg text-slate-700 justify-center dark:text-slate-300 max-w-xl mx-auto mb-14 font-black leading-relaxed border-2 border-black bg-white dark:bg-slate-900 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          All right, let’s do this one more time.
          My name is Dhodduraaj. I’m a full-stack developer.
          I build reliable systems, chase down bugs & ship code that holds up under pressure.
          And no matter how many times something breaks… I build it back stronger.
          This is my portfolio.
        </motion.p>

        {/* CTAs (Layer 3) */}
        <motion.div
          variants={layer3Variants}
          animate={introPhase}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto px-10 py-5 comic-btn-red text-lg flex items-center justify-center gap-3"
          >
            INSPECT MISSIONS
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>

          <motion.a
            href="/Dhodduraaj_Resume.pdf"
            download="Dhodduraaj_Resume.pdf"
            whileHover={{
              scale: 1.05,
              backgroundColor: "#E63946",
              color: "#ffffff",
              boxShadow: "6px 6px 0px 0px #1D3557",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className="w-full sm:w-auto px-10 py-5 border-4 border-black bg-white text-black font-black text-lg uppercase flex items-center justify-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer relative overflow-hidden group"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-30 spidey-web-overlay pointer-events-none transition-opacity duration-300" />
            <FileText size={20} strokeWidth={2.5} className="relative z-10" />
            <span className="relative z-10">DOWNLOAD RESUME</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
