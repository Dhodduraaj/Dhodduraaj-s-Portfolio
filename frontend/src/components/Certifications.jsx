import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, X, Eye } from "lucide-react";

const certificationsData = [
  {
    id: 1,
    title: "Java SE 17 Developer Certificate",
    issuer: "Oracle",
    year: "2026",
    image: "/JAVA SE 17.png"
  },
  {
    id: 2,
    title: "Oracle Cloud Infrastructure 2025 Generative AI Professional",
    issuer: "Oracle",
    year: "2025",
    image: "/generative AI professional.png"
  },
  {
    id: 3,
    title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    issuer: "Oracle",
    year: "2025",
    image: "/AI foundations associate.png"
  },
  {
    id: 4,
    title: "Affective Computing",
    issuer: "NPTEL (IIT)",
    year: "2026",
    image: "/Affective Computing.png"
  },
  {
    id: 5,
    title: "Privacy and Security in Online Social Media",
    issuer: "NPTEL (IIT)",
    year: "2025",
    image: "/Privacy and Security in Online Social Media.png"
  },
  {
    id: 6,
    title: "Design & Implementation of Human-Computer Interfaces",
    issuer: "NPTEL (IIT)",
    year: "2024",
    image: "/Design & Implementation of Human-Computer Interfaces.png"
  },
];

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const carouselRef = useRef(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    if (container.scrollLeft > 20) {
      setShowSwipeHint(false);
    }
    const cards = container.querySelectorAll("[data-cert-card]");
    if (!cards.length) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section id="certifications" className="py-24 bg-white dark:bg-[#111C35] border-t-4 border-black relative overflow-hidden">
      {/* Background illustrated print grid using CSS Variable */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="certs-print" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="1.5" fill="var(--pattern-color)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#certs-print)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1D3557] text-white border-2 border-black px-3 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            CREDENTIAL INDEX
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white"
          >
            Specialized{" "}
            <span className="text-white px-3 bg-[#E63946] border-4 border-black inline-block transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Certs
            </span>
          </motion.h2>
          <div className="h-[4px] w-16 bg-[#E63946] border-2 border-black mx-auto mt-5" />
        </div>

        {/* Certifications Grid / Mobile Carousel */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-6 px-4 -mx-6 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none no-scrollbar"
        >
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.id}
              data-cert-card
              onClick={() => setSelectedCert(cert)}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex flex-col border-4 border-black bg-[#FFFBF0] dark:bg-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden group cursor-pointer relative w-[82vw] sm:w-[75vw] md:w-auto shrink-0 snap-center md:shrink md:snap-align-none"
            >
              {/* Image Preview Container (Visible on hover with smooth zoom) */}
              <div className="relative h-44 overflow-hidden border-b-4 border-black bg-slate-950/20">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Comic style BAM hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-yellow-300 text-black border-3 border-black font-black uppercase text-xs px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 transform rotate-2">
                    <Eye size={14} strokeWidth={3} />
                    View Certificate
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 border-2 border-black bg-[#E63946] text-white">
                      {cert.issuer}
                    </span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={11} strokeWidth={2.5} />
                      {cert.year}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-black dark:text-white uppercase leading-snug group-hover:text-[#E63946] transition-colors">
                    {cert.title}
                  </h3>
                </div>
                <div className="mt-6 pt-4 border-t-2 border-dashed border-black/35 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span>Connection Secure</span>
                  <Award size={15} className="text-[#E63946]/45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dot Indicators (Mobile Only) */}
        <div className="relative flex flex-col items-center mt-6 md:hidden">
          <div className="flex justify-center gap-2">
            {certificationsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (carouselRef.current) {
                    const cards = carouselRef.current.querySelectorAll("[data-cert-card]");
                    const card = cards[index];
                    if (card) {
                      card.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    }
                  }
                }}
                className={`w-3 h-3 rounded-full border-2 border-black transition-all cursor-pointer ${
                  activeIndex === index
                    ? "bg-[#E63946] scale-110 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white dark:bg-slate-700"
                }`}
                aria-label={`Go to certificate ${index + 1}`}
              />
            ))}
          </div>

          <AnimatePresence>
            {showSwipeHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -top-10 bg-yellow-300 text-black border-2 border-black px-2.5 py-1 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-bounce z-30"
              >
                SWIPE ➡️
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Certificate Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm pointer-events-auto"
            onClick={() => setSelectedCert(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="relative w-full max-w-4xl border-4 border-black bg-[#FFFBF0] p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              onClick={(e) => e.stopPropagation()} // Stop propagation to avoid close on backdrop click
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 border-3 border-black bg-[#E63946] hover:bg-red-650 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer z-30"
                aria-label="Close credentials popup"
              >
                <X size={18} strokeWidth={3} />
              </button>

              {/* Certificate Image Frame */}
              <div className="border-3 border-black p-2 bg-white flex flex-col items-center">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[75vh] object-contain border-2 border-black"
                />

                {/* Caption Panel */}
                <div className="w-full mt-3 p-4 border-t-3 border-black bg-[#FFFBF0] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">CERTIFICATION TITLE</span>
                    <h4 className="text-sm font-black uppercase text-[#E63946] leading-tight">
                      {selectedCert.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-yellow-300 text-black">
                      {selectedCert.issuer}
                    </span>
                    <span className="text-xs font-black uppercase px-3 py-1 border-2 border-black bg-white text-black">
                      {selectedCert.year}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
