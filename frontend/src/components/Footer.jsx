import React, { useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  // Easter Egg Console Log
  useEffect(() => {
    console.log(
      "%cWith great power comes great responsibility… to write clean code! 🕷️",
      "color: #E63946; font-size: 16px; font-weight: bold; font-family: monospace;"
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-white dark:bg-slate-950 border-t-4 border-black transition-colors relative select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <p className="text-sm font-black text-black dark:text-white uppercase tracking-wider">
            © {new Date().getFullYear()} DHODDURAAJ S P
          </p>
          <p className="text-xs font-black text-[#E63946] dark:text-slate-400 uppercase tracking-tight mt-1">
            YOURS FRIENDLY NEIGHBOURHOOD DEVELOPER.
          </p>
        </div>

        {/* Comic styled scroll to top */}
        <button
          onClick={scrollToTop}
          className="px-4 py-3 border-3 border-black bg-white hover:bg-slate-50 text-black font-black uppercase text-xs flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          aria-label="Back to Top"
        >
          <span>BACK TO SKY</span>
          <ArrowUp size={14} strokeWidth={3} />
        </button>
      </div>
    </footer>
  );
}
