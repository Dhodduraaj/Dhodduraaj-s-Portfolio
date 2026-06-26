import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, ArrowUpRight, Terminal } from "lucide-react";
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

export default function CodingProfiles({ githubStats, darkMode }) {
  const [leetcodeSolved, setLeetcodeSolved] = useState(null);

  useEffect(() => {
    const fetchLeetcodeStats = async () => {
      try {
        const res = await axios.get("https://leetcode-api-faisal.appspot.com/api/v1/Dhodduraaj_");
        if (res.data && res.data.totalSolved) {
          setLeetcodeSolved(res.data.totalSolved);
        }
      } catch (err) {
        console.warn("Leetcode stats fetch blocked or offline. Falling back to profile link.");
      }
    };

    fetchLeetcodeStats();
  }, []);

  const profiles = [
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/Dhodduraaj_/",
      username: "Dhodduraaj_",
      stats: leetcodeSolved ? `${leetcodeSolved} Solved` : "300+ Solved Nodes",
      desc: "Solving DSA nodes in Java.Webbing together arrays and strings with efficient logics.",
      icon: Code2,
      color: "border-amber-500 hover:shadow-[6px_6px_0px_0px_#D97706] text-amber-400 bg-[#0B1329]",
      terminalHeader: "[CORE STATUS: RUNNING]"
    },
    {
      name: "GitHub",
      url: "https://github.com/Dhodduraaj",
      username: "Dhodduraaj",
      stats: `${githubStats.repos} Repositories`,
      desc: "Open source portfolio, REST API sectors, frontend pipelines, Android packages, and spring config repositories.",
      icon: GithubIcon,
      color: "border-emerald-500 hover:shadow-[6px_6px_0px_0px_#059669] text-emerald-400 bg-[#0B1329]",
      terminalHeader: "[GIT SHELL: ACTIVE]"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dhodduraaj",
      username: "dhodduraaj",
      stats: "Connect Signal",
      desc: "Professional networks. Broadcast message signals for career missions, backend work, or developer collaborations.",
      icon: LinkedinIcon,
      color: "border-blue-500 hover:shadow-[6px_6px_0px_0px_#2563EB] text-blue-400 bg-[#0B1329]",
      terminalHeader: "[COMM CHANNEL: STABLE]"
    }
  ];

  return (
    <section id="stats" className="py-24 bg-white dark:bg-[#111C35] border-t-4 border-black relative overflow-hidden">
      {/* Background illustrated print grid */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.06] text-black dark:text-[#E63946] pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="stats-print" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#stats-print)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#E63946] text-white border-2 border-black px-3 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            CHAPTER 6
          </div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white"
          >
            Reality{" "}
            <span className="text-white px-3 bg-[#E63946] border-4 border-black inline-block transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Check
            </span>
          </motion.h2>
          <div className="h-[4px] w-16 bg-[#E63946] border-2 border-black mx-auto mt-5" />
        </div>

        {/* Profiles Grid - Retro CRT Monitors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {profiles.map((profile, index) => {
            const Icon = profile.icon;

            return (
              <motion.a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={profile.name}
                className={`crt-panel crt-screen p-6 md:p-8 flex flex-col justify-between group transition-all duration-300 ${profile.color}`}
              >
                {/* CRT Terminal Header */}
                <div className="flex justify-between items-center border-b-2 border-black/40 pb-3 mb-6 select-none text-[8px] font-mono tracking-widest font-black uppercase opacity-80">
                  <span>{profile.terminalHeader}</span>
                  <span className="animate-pulse">● ONLINE</span>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 border-3 border-black bg-white dark:bg-slate-950 rounded-2xl text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Icon size={24} />
                    </div>
                    <span className="text-black dark:text-white border-2 border-black bg-white dark:bg-slate-900 p-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none transition-all">
                      <ArrowUpRight size={18} strokeWidth={2.5} />
                    </span>
                  </div>

                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                    @{profile.username}
                  </span>
                  <h3 className="text-2xl font-black text-white mb-3 leading-none uppercase">
                    {profile.name}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black bg-[#E63946] text-white text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-6 transform -rotate-1 select-none">
                    {profile.stats}
                  </div>

                  <p className="text-xs font-semibold text-slate-300 leading-relaxed">
                    {profile.desc}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="mt-8 pt-5 border-t-2 border-black/40 flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                  <span>Connection Grid</span>
                  <span className="text-[#E63946]">Verified Link</span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Dynamic Activity Panels (GitHub & LeetCode Heatmaps) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* GitHub Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 md:p-8 crt-panel crt-screen text-[#E63946] border-[#E63946]/60 shadow-[6px_6px_0px_0px_#E63946] flex flex-col"
          >
            <div className="flex justify-between items-center border-b-2 border-black/40 pb-3 mb-6 select-none text-[8px] font-mono tracking-widest font-black uppercase opacity-85">
              <span>[SYSTEM METRIC: GITHUB SYNC]</span>
              <span className="animate-pulse text-[#E63946]">● ONLINE TRACKER</span>
            </div>

            <div className="mb-6">
              <h3 className="font-black text-white text-lg flex items-center gap-2 uppercase tracking-tight mb-2">
                <Terminal size={18} className="text-[#E63946]" />
                GitHub Contribution Network
              </h3>
              <p className="text-xs font-semibold text-slate-400">
                Daily code commit matrix tracing live contributions on github.com/Dhodduraaj
              </p>
            </div>

            {/* Chart container */}
            <div className="flex-grow flex items-center justify-center my-4">
              <div className="w-full border-2 border-black/30 p-4 bg-[#070b14]/90 rounded-xl flex items-center justify-center min-h-[140px] shadow-[inner_3px_3px_0px_0px_rgba(0,0,0,0.5)]">
                <img
                  src={darkMode ? "https://ghchart.rshah.org/e63946/Dhodduraaj" : "https://ghchart.rshah.org/1d3557/Dhodduraaj"}
                  alt="Dhodduraaj GitHub Contributions"
                  className="w-full h-auto filter brightness-110 contrast-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 border-t border-b border-black/30 py-3 text-white">
              <div className="text-center p-1.5 border border-black/20 bg-slate-950/40 rounded-lg">
                <span className="text-[9px] text-slate-400 uppercase font-black block mb-0.5">Repositories</span>
                <span className="text-lg font-black text-[#E63946]">{githubStats.repos || 0}</span>
              </div>
              <div className="text-center p-1.5 border border-black/20 bg-slate-950/40 rounded-lg">
                <span className="text-[9px] text-slate-400 uppercase font-black block mb-0.5">Stars</span>
                <span className="text-lg font-black text-yellow-400">{githubStats.stars !== undefined ? githubStats.stars : 4}</span>
              </div>
              <div className="text-center p-1.5 border border-black/20 bg-slate-950/40 rounded-lg">
                <span className="text-[9px] text-slate-400 uppercase font-black block mb-0.5">Followers</span>
                <span className="text-lg font-black text-emerald-400">{githubStats.followers || 0}</span>
              </div>
              <div className="text-center p-1.5 border border-black/20 bg-slate-950/40 rounded-lg">
                <span className="text-[9px] text-slate-400 uppercase font-black block mb-0.5">Following</span>
                <span className="text-lg font-black text-blue-400">{githubStats.following !== undefined ? githubStats.following : 8}</span>
              </div>
            </div>

            {/* Top Languages */}
            <div className="mb-4">
              <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block mb-2 text-center sm:text-left">TOP LANGUAGES</span>
              <div className="h-2 w-full bg-slate-950/50 rounded-full overflow-hidden flex border border-black/30">
                {(githubStats.languages || [
                  { name: "Java", percentage: 55 },
                  { name: "JavaScript", percentage: 25 },
                  { name: "CSS", percentage: 12 },
                  { name: "HTML", percentage: 8 }
                ]).map((lang, index) => {
                  const colors = ["bg-[#E63946]", "bg-[#FBBF24]", "bg-blue-500", "bg-emerald-500"];
                  const colorClass = colors[index % colors.length];
                  return (
                    <div
                      key={lang.name}
                      style={{ width: `${lang.percentage}%` }}
                      className={`${colorClass} h-full`}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 justify-center sm:justify-start">
                {(githubStats.languages || [
                  { name: "Java", percentage: 55 },
                  { name: "JavaScript", percentage: 25 },
                  { name: "CSS", percentage: 12 },
                  { name: "HTML", percentage: 8 }
                ]).map((lang, index) => {
                  const colors = ["bg-[#E63946]", "bg-[#FBBF24]", "bg-blue-500", "bg-emerald-500"];
                  const colorClass = colors[index % colors.length];
                  return (
                    <div key={lang.name} className="flex items-center gap-1 text-[9px] font-mono text-slate-300">
                      <span className={`w-2 h-2 rounded-full ${colorClass}`} />
                      <span>{lang.name} ({lang.percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto pt-5 border-t-2 border-black/40 flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
              <span>Metric Module</span>
              <span className="text-[#E63946]">{githubStats.followers} Followers</span>
            </div>
          </motion.div>

          {/* LeetCode Activity Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 md:p-8 crt-panel crt-screen text-[#E63946] border-[#E63946]/60 shadow-[6px_6px_0px_0px_#E63946] flex flex-col"
          >
            <div className="flex justify-between items-center border-b-2 border-black/40 pb-3 mb-6 select-none text-[8px] font-mono tracking-widest font-black uppercase opacity-85">
              <span>[SYSTEM METRIC: LEETCODE FEED]</span>
              <span className="animate-pulse text-[#E63946]">● ONLINE SYNC</span>
            </div>

            <div className="mb-6">
              <h3 className="font-black text-white text-lg flex items-center gap-2 uppercase tracking-tight mb-2">
                <Code2 size={18} className="text-[#E63946]" />
                LeetCode Active Days
              </h3>
              <p className="text-xs font-semibold text-slate-400">
                Algorithmic structures, submissions, and active problem-solving streak
              </p>
            </div>

            {/* Chart container */}
            <div className="flex-grow flex items-center justify-center my-4">
              <div className="w-full border-2 border-black/30 p-2 bg-[#070b14]/90 rounded-xl flex items-center justify-center min-h-[140px] shadow-[inner_3px_3px_0px_0px_rgba(0,0,0,0.5)]">
                <img
                  src={darkMode ? "https://leetcard.jacoblin.cool/Dhodduraaj_?theme=unicolor&color=e63946&font=Outfit&ext=heatmap" : "https://leetcard.jacoblin.cool/Dhodduraaj_?theme=unicolor&color=1d3557&font=Outfit&ext=heatmap"}
                  alt="Dhodduraaj LeetCode Activity"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-auto pt-5 border-t-2 border-black/40 flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
              <span>Metric Module</span>
              <span className="text-[#E63946]">
                {leetcodeSolved ? `${leetcodeSolved} Solved` : "300+ Solved Nodes"}
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
