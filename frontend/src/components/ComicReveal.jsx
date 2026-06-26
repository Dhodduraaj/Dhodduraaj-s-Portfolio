import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Shield, Star, Code2 } from "lucide-react";

// ─── Halftone SVG pattern ────────────────────────────────────────────────────
function HalftonePattern({ id, color = "rgba(0,0,0,0.12)", size = 10, r = 2 }) {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <circle cx={size / 2} cy={size / 2} r={r} fill={color} />
        </pattern>
      </defs>
    </svg>
  );
}

// ─── Pop-art starburst button shape ─────────────────────────────────────────
function StarburstBg({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute inset-0 w-full h-full ${className}`} aria-hidden>
      <polygon
        points="100,0 117,65 180,20 135,80 200,100 135,120 180,180 117,135 100,200 83,135 20,180 65,120 0,100 65,80 20,20 83,65"
        fill="#FBBF24"
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Speech bubble ───────────────────────────────────────────────────────────
function SpeechBubble({ children, direction = "bottom", className = "" }) {
  const tailClass =
    direction === "bottom"
      ? "before:absolute before:bottom-[-18px] before:left-6 before:border-[10px] before:border-transparent before:border-t-black after:absolute after:bottom-[-12px] after:left-[26px] after:border-[8px] after:border-transparent after:border-t-white"
      : "before:absolute before:top-[-18px] before:left-6 before:border-[10px] before:border-transparent before:border-b-black after:absolute after:top-[-12px] after:left-[26px] after:border-[8px] after:border-transparent after:border-b-white";

  return (
    <div
      className={`relative bg-white border-4 border-black px-4 py-3 rounded-2xl shadow-[3px_3px_0px_0px_#000] font-black text-black text-sm uppercase ${tailClass} ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Stat badge ──────────────────────────────────────────────────────────────
function StatBadge({ icon: Icon, label, value, color }) {
  return (
    <div
      className="flex flex-col items-center gap-1 px-3 py-2 border-3 border-black bg-white shadow-[2px_2px_0px_0px_#000] min-w-[70px]"
      style={{ background: color }}
    >
      <Icon size={16} strokeWidth={3} className="text-black" />
      <span className="text-[10px] font-black text-black uppercase leading-none">{value}</span>
      <span className="text-[8px] font-bold text-black/70 uppercase">{label}</span>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export default function ComicReveal() {
  const [revealed, setRevealed] = useState(false);
  const [panelStage, setPanelStage] = useState(0); // 0 = closed, 1 = opening, 2 = open
  const overlayRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleReveal = () => {
    setRevealed(true);
    setPanelStage(1);
    setTimeout(() => setPanelStage(2), 400);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setPanelStage(1);
    setTimeout(() => {
      setPanelStage(0);
      setRevealed(false);
      document.body.style.overflow = "";
    }, 350);
  };

  return (
    <>
      {/* ── Comic-reveal section ────────────────────────────────────────── */}
      <section
        id="comic-reveal"
        className="relative py-24 bg-[#FFFBF0] dark:bg-[#0B1329] border-t-4 border-black overflow-hidden"
      >
        {/* Halftone background */}
        <HalftonePattern id="ht-reveal" color="rgba(230,57,70,0.12)" size={14} r={3} />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "url(#ht-reveal)" }}
          aria-hidden
        >
          <svg width="100%" height="100%">
            <rect width="100%" height="100%" fill="url(#ht-reveal)" />
          </svg>
        </div>

        {/* Dashed comic border lines */}
        <div className="absolute top-4 left-4 right-4 bottom-4 border-4 border-dashed border-black/20 dark:border-white/10 pointer-events-none rounded-none" />

        {/* Section badge */}
        <div className="flex justify-center mb-8 relative z-10">
          <motion.div
            initial={{ rotate: -3 }}
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-[#1D3557] text-white border-4 border-black px-6 py-2 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            🕷️ CLASSIFIED INTEL · FINAL PAGE
          </motion.div>
        </div>

        {/* ── Main callout card ──────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6">

          {/* Starburst callout button */}
          <motion.button
            id="comic-reveal-btn"
            onClick={handleReveal}
            aria-label="Reveal Spider-Man Identity"
            className="relative flex items-center justify-center w-48 h-48 cursor-pointer select-none focus:outline-none group"
            animate={{ scale: [1, 1.04, 1], rotate: [0, 1.5, -1.5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            whileTap={{ scale: 0.92 }}
          >
            <StarburstBg />
            <div className="relative z-10 flex flex-col items-center gap-1 text-center px-4">
              <span className="text-4xl leading-none">👉</span>
              <span className="text-[13px] font-black text-black uppercase leading-tight tracking-tight drop-shadow-[1px_1px_0px_rgba(0,0,0,0.4)]">
                REVEAL<br />SPIDER-MAN
              </span>
            </div>
          </motion.button>

          {/* Wiggling caption */}
          <motion.p
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-xs font-black text-black dark:text-white uppercase tracking-widest border-2 border-black bg-yellow-300 px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            ⚠️ TOP SECRET · CLICK TO DECLASSIFY
          </motion.p>
        </div>
      </section>

      {/* ── Overlay + Comic ID panel ───────────────────────────────────── */}
      <AnimatePresence>
        {revealed && (
          <>
            {/* Dark overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-[900] cursor-pointer"
              onClick={handleClose}
              aria-hidden
            />

            {/* Comic panel */}
            <motion.div
              key="panel"
              ref={overlayRef}
              role="dialog"
              aria-modal="true"
              aria-label="Spider-Man Identity Card"
              initial={{ scale: 0.5, opacity: 0, rotate: -8, y: 60 }}
              animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 8, y: 80 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 0.9,
              }}
              className="fixed inset-0 z-[950] flex items-center justify-center p-4"
              style={{ pointerEvents: "none" }}
            >
              <div
                className="relative w-full max-w-md pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Halftone bg on panel */}
                <HalftonePattern id="ht-card" color="rgba(0,0,0,0.07)" size={8} r={1.5} />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="absolute -top-4 -right-4 z-[960] w-10 h-10 border-4 border-black bg-[#E63946] text-white font-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} strokeWidth={3} />
                </button>

                {/* ── Card outer frame ──────────────────────────────────── */}
                <div
                  className="border-[5px] border-black bg-[#FFFBF0] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                >
                  {/* Halftone overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                    aria-hidden
                  >
                    <rect width="100%" height="100%" fill="url(#ht-card)" />
                  </svg>

                  {/* ── Card header ───────────────────────────────────── */}
                  <div className="relative z-10 bg-[#E63946] border-b-4 border-black px-5 py-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em]">
                        S.H.I.E.L.D. FILE #0042
                      </div>
                      <div className="text-lg font-black text-white uppercase leading-none">
                        IDENTITY CARD
                      </div>
                    </div>
                    <div className="text-3xl select-none">🕷️</div>
                  </div>

                  {/* ── Card body ─────────────────────────────────────── */}
                  <div className="relative z-10 p-5 flex flex-col gap-5">

                    {/* Photo + name block */}
                    <div className="flex gap-4 items-start">

                      {/* Photo frame */}
                      <div className="relative flex-shrink-0">
                        <div className="w-28 h-36 border-4 border-black overflow-hidden bg-[#1D3557] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <img
                            src="/my-photo.jpg"
                            alt="Dhodduraaj S P"
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              // Fallback if photo not available
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                                <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#1D3557;color:#FBBF24;font-size:32px;font-weight:900;">
                                  🕷️
                                  <div style="font-size:10px;color:#fff;margin-top:4px;font-family:monospace;text-align:center;padding:0 4px;">PHOTO<br>REDACTED</div>
                                </div>
                              `;
                            }}
                          />
                        </div>
                        {/* Comic red corner sticker */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#E63946] border-3 border-black flex items-center justify-center text-white font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          SP
                        </div>
                      </div>

                      {/* Name & role */}
                      <div className="flex-1 flex flex-col gap-2">
                        <div>
                          <div className="text-[9px] font-black text-black/50 uppercase tracking-widest">
                            Real Identity
                          </div>
                          <div className="text-xl font-black text-black uppercase leading-tight">
                            DHODDURAAJ S P
                          </div>
                        </div>

                        <div className="bg-[#1D3557] border-3 border-black px-2.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <div className="text-[8px] font-black text-[#FBBF24] uppercase tracking-widest">
                            Role / Alias
                          </div>
                          <div className="text-[11px] font-black text-white uppercase leading-snug">
                            Backend Engineer &<br />Friendly Neighbourhood<br />Developer 🌐
                          </div>
                        </div>

                        {/* Speech bubble */}
                        <SpeechBubble direction="bottom" className="text-[9px]">
                          "With great code comes great responsibility!"
                        </SpeechBubble>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-black" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-black">
                        POWER STATS
                      </span>
                      <div className="flex-1 h-1 bg-black" />
                    </div>

                    {/* Stats row */}
                    <div className="flex gap-2 flex-wrap">
                      <StatBadge icon={Code2} label="Stack" value="Full" color="#FBBF24" />
                      <StatBadge icon={Zap}   label="Speed" value="99%" color="#86efac" />
                      <StatBadge icon={Shield} label="Uptime" value="100%" color="#93c5fd" />
                      <StatBadge icon={Star}   label="Bugs" value="0" color="#fda4af" />
                    </div>

                    {/* Descriptors list */}
                    <div className="border-4 border-black bg-white p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <div className="text-[9px] font-black uppercase tracking-widest text-black/50 mb-2">
                        Spider-Man Powers
                      </div>
                      {[
                        "🕸️ Web-shooter of Spring Boot APIs",
                        "🧠 Spidey Sense for Hidden Bugs",
                        "🚀 Wall-crawls through Legacy Code",
                        "⚡ Builds systems that don't snap under load",
                        "🎯 Shoots PRs before deadlines swing past",
                      ].map((power, i) => (
                        <div
                          key={i}
                          className="text-[11px] font-bold text-black border-b border-black/10 last:border-0 py-1 leading-snug"
                        >
                          {power}
                        </div>
                      ))}
                    </div>

                    {/* Bottom speech bubble */}
                    <SpeechBubble direction="top" className="text-[10px] text-center">
                      💬 "Available for hire — no radioactive spiders required."
                    </SpeechBubble>

                    {/* Card footer */}
                    <div className="flex items-center justify-between border-t-3 border-black pt-3">
                      <div className="text-[9px] font-black text-black/50 uppercase tracking-widest">
                        KEC · 2025 · Full-Stack
                      </div>
                      <div className="flex gap-1">
                        {["⭐", "🏆", "🚀"].map((emoji, i) => (
                          <span key={i} className="text-base">{emoji}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Diagonal CLASSIFIED stamp */}
                  <div
                    className="absolute bottom-16 right-4 pointer-events-none select-none opacity-10"
                    style={{ transform: "rotate(-22deg)" }}
                    aria-hidden
                  >
                    <div className="border-4 border-[#E63946] text-[#E63946] text-3xl font-black uppercase px-3 py-1 tracking-widest">
                      CLASSIFIED
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
