import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, AlertCircle, X } from "lucide-react";
import axios from "axios";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size || 24, height: props.size || 24 }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={props.className} style={{ width: props.size || 24, height: props.size || 24 }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Caller name is required";
    if (!formData.email.trim()) return "Beacon email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Invalid email address";
    if (!formData.message.trim()) return "Signal transmission message is empty";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setStatus("error");
      setErrorMsg(error);
      return;
    }

    setStatus("loading");
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const response = await axios.post(`${apiBase}/api/contact`, formData);
      if (response.status === 201) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (err) {
      setStatus("error");
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("Failed to connect to the backend. Ensure the server is active.");
      }
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#FFFBF0] dark:bg-[#111C35] border-t-4 border-black relative overflow-hidden">
      {/* Background illustrated print halftone dots */}
      <div className="absolute inset-0 opacity-100 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="contact-halftone" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="1.5" fill="var(--pattern-color)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contact-halftone)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1D3557] text-white border-2 border-black px-3 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            CHAPTER 7
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white"
          >
            Signal{"  "}
            <span className="text-white px-3 bg-[#E63946] border-4 border-black inline-block transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Tower
            </span>
          </motion.h2>
          <div className="h-[4px] w-16 bg-[#E63946] border-2 border-black mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Signal hub details (Left - 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-2xl font-black text-black dark:text-white uppercase mb-4">Launch a Signal</h3>
              <p className="text-sm font-black text-slate-700 dark:text-slate-300 leading-relaxed">
                Need a full-stack developer who constructs secure REST APIs, layouts clean relational nodes,
                and crafts immersive, illustration-first frontends? Shoot a web signal beacon down!
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4 p-5 comic-card dark:comic-card-dark hover:-translate-y-0.5 transition-transform">
                <div className="p-3 border-2 border-black bg-[#E63946] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Mail size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-black uppercase tracking-wider">Email Signal</span>
                  <a href="mailto:dhodduraajsp@gmail.com" className="text-sm font-black text-slate-800 dark:text-slate-200 hover:text-[#E63946] transition-colors">
                    dhodduraajsp@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 comic-card dark:comic-card-dark hover:-translate-y-0.5 transition-transform">
                <div className="p-3 border-2 border-black bg-[#1D3557] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Phone size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-black uppercase tracking-wider">Call Signal</span>
                  <a href="tel:+918220920776" className="text-sm font-black text-slate-800 dark:text-slate-200 hover:text-[#E63946] transition-colors">
                    +91 8220920776
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 comic-card dark:comic-card-dark hover:-translate-y-0.5 transition-transform">
                <div className="p-3 border-2 border-black bg-black dark:bg-white text-white dark:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <MapPin size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-black uppercase tracking-wider">Base Coordinates</span>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                    Erode, Tamil Nadu, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/dhodduraaj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-3 border-black bg-white hover:bg-slate-50 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                title="LinkedIn Network"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://github.com/Dhodduraaj"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border-3 border-black bg-white hover:bg-slate-50 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                title="GitHub Codes"
              >
                <GithubIcon size={20} />
              </a>
            </div>
          </div>

          {/* Form and Hanging Spidey (Right - 7 cols) */}
          <div className="lg:col-span-7 relative">
            
            {/* Hanging Chibi Spider-Hero Upside-Down SVG */}
            <div className="absolute -top-[116px] right-8 w-24 h-32 z-20 pointer-events-none select-none hidden sm:block">
              <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-[3px_3px_0px_rgba(0,0,0,0.85)] animate-comic-swing" style={{ transformOrigin: "top center" }}>
                {/* Web rope hanging down */}
                <line x1="50" y1="0" x2="50" y2="60" stroke="#000000" strokeWidth="2.5" />
                
                {/* Wavy web rope segment */}
                <path d="M 50,0 Q 48,15 52,30 T 50,60" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="2 2" />

                {/* Upside down Chibi body */}
                {/* Torso */}
                <path
                  d="M 40,65 C 40,65 37,85 50,89 C 63,85 60,65 60,65 Z"
                  fill="#E63946"
                  stroke="#000000"
                  strokeWidth="3.5"
                />
                
                {/* Spider Emblem */}
                <circle cx="50" cy="74" r="1.5" fill="#000000" />
                <line x1="50" y1="74" x2="50" y2="78" stroke="#000000" strokeWidth="1" />

                {/* Legs wrapped around rope (folded) */}
                <path d="M 42,65 Q 46,55 50,55" stroke="#1D3557" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 58,65 Q 54,55 50,55" stroke="#1D3557" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Large Head at bottom */}
                <path
                  d="M 50,85 
                     C 32,85 28,91 28,105 
                     C 28,117 34,121 50,121 
                     C 66,121 72,117 72,105 
                     C 72,91 68,85 50,85 Z"
                  fill="#E63946"
                  stroke="#000000"
                  strokeWidth="3.5"
                />

                {/* Mask Web pattern */}
                <ellipse cx="50" cy="103" rx="14" ry="11" fill="none" stroke="#000000" strokeWidth="1" opacity="0.3" />
                <line x1="50" y1="103" x2="50" y2="85" stroke="#000000" strokeWidth="1" opacity="0.3" />
                <line x1="50" y1="103" x2="50" y2="121" stroke="#000000" strokeWidth="1" opacity="0.3" />

                {/* Large white eyes */}
                <polygon points="34,101 47,106 43,93" fill="#ffffff" stroke="#000000" strokeWidth="3" />
                <polygon points="66,101 53,106 57,93" fill="#ffffff" stroke="#000000" strokeWidth="3" />

                {/* Waving Arm (Upside-down) */}
                <path d="M 60,67 Q 70,72 74,80" stroke="#1D3557" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <circle cx="74" cy="80" r="2.5" fill="#E63946" stroke="#000000" strokeWidth="1" />
              </svg>
            </div>

            {/* Comic speech bubble contact container */}
            <div className="p-6 md:p-8 border-4 border-black bg-white text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative rounded-none">
              
              {/* Comic bubble pointer tail (hidden on small screens) */}
              <div className="absolute top-12 -left-4 w-0 h-0 border-t-[14px] border-t-transparent border-r-[14px] border-r-black border-b-[14px] border-b-transparent hidden lg:block" />
              <div className="absolute top-12 -left-3 w-0 h-0 border-t-[12px] border-t-transparent border-r-[12px] border-r-white border-b-[12px] border-b-transparent hidden lg:block" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Caller Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 border-3 border-black bg-white text-black text-sm font-semibold focus:outline-none focus:bg-slate-50 transition-colors rounded-none"
                      placeholder="Peter Parker"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Beacon Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full px-4 py-3 border-3 border-black bg-white text-black text-sm font-semibold focus:outline-none focus:bg-slate-50 transition-colors rounded-none"
                      placeholder="peter.parker@dailybugle.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Signal Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 border-3 border-black bg-white text-black text-sm font-semibold focus:outline-none focus:bg-slate-50 transition-colors rounded-none"
                    placeholder="Interview / Web Project / Collaboration"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Transmission Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full px-4 py-3 border-3 border-black bg-white text-black text-sm font-semibold focus:outline-none focus:bg-slate-50 transition-colors resize-none rounded-none"
                    placeholder="Write details of your backend or full-stack mission..."
                  />
                </div>

                {/* Status Banners (Static Error/Loading) */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 border-3 border-black bg-rose-100 text-rose-800 text-xs font-black flex items-center gap-2"
                    >
                      <AlertCircle size={16} className="shrink-0" strokeWidth={3} />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 comic-btn-red text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      TRANSMITTING SIGNAL...
                    </>
                  ) : (
                    <>
                      <Send size={16} strokeWidth={2.5} />
                      FIRE SIGNAL BEACON
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Pop-Art Animated Confirmation Dialog Overlay (Success state) */}
      <AnimatePresence>
        {status === "success" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm pointer-events-auto">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full max-w-md border-4 border-black bg-yellow-300 text-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
            >
              {/* Explosion background element */}
              <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
                <svg width="100%" height="100%">
                  <pattern id="explosion-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="6" cy="6" r="2" fill="#000000" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#explosion-grid)" />
                </svg>
              </div>

              <h3 className="text-3xl font-black uppercase mb-4 tracking-tighter text-red-600 border-b-3 border-black pb-2">
                💥 BOOM! 💥
              </h3>
              <p className="text-sm font-black uppercase tracking-wide leading-relaxed mb-6">
                Transmission Injected! Your contact signal has been securely stored in the PostgreSQL database grid!
              </p>

              <button
                onClick={() => setStatus("idle")}
                className="w-full py-3.5 border-3 border-black bg-black text-white hover:bg-slate-900 font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                DISMISS BEACON
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
