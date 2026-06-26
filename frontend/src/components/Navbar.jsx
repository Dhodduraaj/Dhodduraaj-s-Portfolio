import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Origin", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Missions", id: "projects" },
  { label: "Wins", id: "achievements" },
  { label: "Grid", id: "stats" },
  { label: "Signal", id: "contact" },
];

export default function Navbar({ darkMode, setDarkMode, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-white dark:bg-[#0B1329] border-b-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            : "py-5 bg-transparent border-b-3 border-transparent"
        }`}
      >
        {/* Scroll Progress Bar - Solid Red */}
        <div
          className="absolute top-0 left-0 h-[4px] bg-[#E63946] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-black tracking-tighter cursor-pointer flex items-center gap-1 uppercase"
            onClick={() => scrollTo("home")}
          >
            <span className="text-[#E63946]">
              DHODDURAAJ
            </span>
            <span className="text-slate-900 dark:text-slate-200">S P</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-xs font-black uppercase transition-colors cursor-pointer relative py-1 ${
                  activeSection === item.id
                    ? "text-[#E63946]"
                    : "text-slate-650 hover:text-[#E63946] dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavDot"
                    className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#E63946] rounded-none border-t border-black"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 border-2 border-black bg-white dark:bg-slate-900 text-black dark:text-white transition-colors cursor-pointer active:scale-90"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-black bg-white dark:bg-slate-900 text-black dark:text-white transition-colors md:hidden cursor-pointer active:scale-90"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[57px] left-0 right-0 z-40 bg-white dark:bg-slate-950 border-b-3 border-black py-6 px-6 flex flex-col gap-4 shadow-xl md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left py-2 font-black uppercase border-b-2 border-black cursor-pointer ${
                  activeSection === item.id
                    ? "text-[#E63946]"
                    : "text-slate-700 dark:text-slate-350"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
