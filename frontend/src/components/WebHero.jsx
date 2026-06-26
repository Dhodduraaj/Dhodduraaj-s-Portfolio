import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function WebHero({ activeSection, isSwinging }) {
  const controls = useAnimation();
  const [stance, setStance] = useState("breathing"); // breathing, swinging, landing, pointing
  const [isSpinning, setIsSpinning] = useState(false);
  const [customQuote, setCustomQuote] = useState("");

  const spideyQuotes = [
    "Spring Boot is my web-shooter! 🕸️",
    "Bugs? Caught in mid-air! 🕷️",
    "Query load? I swing past it! 🚀",
    "Need a backend hero? PING ME!",
    "No radioactive spiders were harmed. 🧪",
    "Deploying code at terminal velocity! ⚡"
  ];

  // Rotate custom quote on hover or click
  const triggerRandomQuote = () => {
    const randomIdx = Math.floor(Math.random() * spideyQuotes.length);
    setCustomQuote(spideyQuotes[randomIdx]);
  };

  useEffect(() => {
    if (isSwinging) {
      setStance("swinging");
      
      // Physics-based pendulum swing curve: Slow at peak, fast at bottom.
      // Easing: ease-in-out-like cubic-bezier [0.3, 0, 0.2, 1]
      controls.start({
        x: [150, 40, -60, 0],
        y: [-160, 60, -20, 0],
        rotate: [-65, 10, 25, 0],
        scaleY: [1, 0.82, 1.18, 1],
        transition: { 
          duration: 1.1, 
          ease: [0.33, 0.05, 0.22, 1.0] // Pendulum ease curve
        }
      });
    } else {
      setStance("landing");
      controls.start({
        scaleY: [0.75, 1.22, 1],
        y: [35, -5, 0],
        transition: { duration: 0.45, ease: "easeOut" }
      }).then(() => {
        // Point character if on projects or contact sections
        if (activeSection === "projects" || activeSection === "contact") {
          setStance("pointing");
        } else {
          setStance("breathing");
        }
      });
    }
  }, [activeSection, isSwinging, controls]);

  // Click spin trigger
  const handleSpideyClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    triggerRandomQuote();
    controls.start({
      rotate: [0, 360],
      scale: [1, 1.25, 1],
      transition: { duration: 0.65, ease: "easeInOut" }
    }).then(() => {
      setIsSpinning(false);
    });
  };

  // Breathing loop animation when stationary
  const breathingVariants = {
    animate: {
      y: [0, -6, 0],
      scaleY: [1, 1.04, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <motion.div
        animate={controls}
        variants={stance === "breathing" ? breathingVariants : {}}
        onClick={handleSpideyClick}
        className="relative w-36 h-36 flex items-center justify-center cursor-pointer pointer-events-auto select-none group animate-comic-bob"
        whileHover={{ scale: 1.08 }}
        title="Click to spin Spidey!"
      >
        {/* Dynamic Bending Web String (Rope leads, body follows lag) */}
        {stance === "swinging" && (
          <svg className="absolute bottom-1/2 right-1/2 w-72 h-96 overflow-visible pointer-events-none text-black dark:text-white" style={{ transform: "translate(50%, -50%)" }}>
            <motion.path 
              d="M 50,-300 Q 150,-100 96,192" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3.5"
              animate={{
                d: [
                  "M 50,-300 Q 180,-120 96,192", // Start swing bent
                  "M 50,-300 Q 70,-80 96,192",   // Acceleration straight
                  "M 50,-300 Q -10,-140 96,192",  // Peak swing reverse bent
                  "M 50,-300 Q 50,-100 96,192"   // Landing straight
                ]
              }}
              transition={{
                duration: 1.1,
                ease: [0.33, 0.05, 0.22, 1.0]
              }}
            />
          </svg>
        )}

        {/* Vector SVG Chibi Hero Character */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-transform duration-200 group-hover:animate-comic-wiggle"
        >
          {/* Chibi Web Mask Head (Large Head) */}
          <path
            d="M 50,12 
               C 32,12 28,18 28,32 
               C 28,44 34,48 50,48 
               C 66,48 72,44 72,32 
               C 72,18 68,12 50,12 Z"
            fill="#E63946"
            stroke="#000000"
            strokeWidth="3.5"
          />

          {/* Web Lines on Mask */}
          <ellipse cx="50" cy="30" rx="14" ry="11" fill="none" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <ellipse cx="50" cy="30" rx="7" ry="5.5" fill="none" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <line x1="50" y1="30" x2="38" y2="18" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <line x1="50" y1="30" x2="62" y2="18" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <line x1="50" y1="30" x2="30" y2="30" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <line x1="50" y1="30" x2="70" y2="30" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <line x1="50" y1="30" x2="38" y2="42" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <line x1="50" y1="30" x2="62" y2="42" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <line x1="50" y1="30" x2="50" y2="12" stroke="#000000" strokeWidth="1" opacity="0.35" />
          <line x1="50" y1="30" x2="50" y2="48" stroke="#000000" strokeWidth="1" opacity="0.35" />

          {/* Expressive Mask Eyes (Big Chibi Triangles) */}
          <polygon points="34,26 47,31 43,18" fill="#ffffff" stroke="#000000" strokeWidth="3.5" strokeLinejoin="miter" />
          <polygon points="66,26 53,31 57,18" fill="#ffffff" stroke="#000000" strokeWidth="3.5" strokeLinejoin="miter" />

          {/* Chibi Small Torso */}
          <path
            d="M 40,48
               C 40,48 37,68 50,72
               C 63,68 60,48 60,48
               C 60,48 53,52 50,52
               C 47,52 40,48 40,48 Z"
            fill="#E63946"
            stroke="#000000"
            strokeWidth="3.5"
          />
          <path d="M 40,48 L 38,58 L 41,64 Z" fill="#1D3557" stroke="#000000" strokeWidth="1.5" />
          <path d="M 60,48 L 62,58 L 59,64 Z" fill="#1D3557" stroke="#000000" strokeWidth="1.5" />

          {/* Black Spider emblem */}
          <circle cx="50" cy="60" r="2" fill="#000000" />
          <line x1="50" y1="60" x2="50" y2="56" stroke="#000000" strokeWidth="1.5" />
          <path d="M 50,60 Q 45,58 43,60 M 50,60 Q 45,61 43,63" stroke="#000000" strokeWidth="1.2" fill="none" />
          <path d="M 50,60 Q 55,58 57,60 M 50,60 Q 55,61 57,63" stroke="#000000" strokeWidth="1.2" fill="none" />

          {/* Left Arm / Laptop */}
          <path d="M 40,50 C 33,52 28,58 28,64" stroke="#1D3557" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Laptop display details */}
          <rect x="18" y="56" width="12" height="8" rx="0.5" fill="#000000" stroke="#000000" strokeWidth="2" />
          <polygon points="16,64 32,64 34,69 14,69" fill="#1D3557" stroke="#000000" strokeWidth="2" />
          <rect x="21" y="58" width="6" height="4" fill="#ffffff" />

          {/* Right Arm (Dynamic depending on stance) */}
          {stance === "pointing" ? (
            <>
              <path d="M 60,50 Q 72,46 80,46" stroke="#1D3557" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="80" cy="46" r="3" fill="#E63946" stroke="#000000" strokeWidth="1.5" />
              <line x1="83" y1="46" x2="98" y2="46" stroke="#000000" strokeWidth="1.5" strokeDasharray="2 2" />
            </>
          ) : (
            <>
              <path d="M 60,50 C 67,52 72,58 72,64" stroke="#1D3557" strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="72" cy="64" r="3" fill="#E63946" stroke="#000000" strokeWidth="1.5" />
            </>
          )}

          {/* Left Leg */}
          <path d="M 44,70 Q 41,78 37,86" stroke="#1D3557" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M 37,86 L 31,86" stroke="#E63946" strokeWidth="3" strokeLinecap="round" />

          {/* Right Leg */}
          <path d="M 56,70 Q 59,78 63,86" stroke="#1D3557" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M 63,86 L 69,86" stroke="#E63946" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Dynamic flat speech bubbles guiding developers */}
        {(stance === "breathing" || stance === "pointing") && (
          <div className="absolute -top-12 right-2 border-3 border-black bg-white text-black text-[10px] font-black px-3.5 py-2 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider whitespace-nowrap z-30">
            {customQuote ? customQuote : (
              <>
                {activeSection === "home" && "Catching backend bugs! 🕸️"}
                {activeSection === "about" && "Check my stats below! 👇"}
                {activeSection === "skills" && "Active Power Grid! 📡"}
                {activeSection === "projects" && "Missions Survived! 🎖️"}
                {activeSection === "achievements" && "Wall of Wins! 🏆"}
                {activeSection === "stats" && "Reality Check Grid! 🖥️"}
                {activeSection === "contact" && "Signal active! 📡"}
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
