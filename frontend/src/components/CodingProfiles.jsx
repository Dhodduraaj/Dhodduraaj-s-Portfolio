import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, ArrowUpRight, Terminal, RefreshCw } from "lucide-react";
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

export default function CodingProfiles({ githubStats }) {
  const [gitEvents, setGitEvents] = useState([]);
  const [gitLoading, setGitLoading] = useState(true);
  const [gitError, setGitError] = useState(false);

  const [leetcodeSolved, setLeetcodeSolved] = useState(null);
  const [leetcodeLoading, setLeetcodeLoading] = useState(true);

  // Fetch real GitHub events
  useEffect(() => {
    const fetchGitEvents = async () => {
      try {
        const res = await axios.get("https://api.github.com/users/Dhodduraaj/events");
        const pushes = (res.data || [])
          .filter(e => e.type === "PushEvent")
          .slice(0, 4); // Get top 4 recent pushes
        setGitEvents(pushes);
        setGitError(false);
      } catch (err) {
        console.warn("Failed to fetch real Git events. Bypassing grid.", err.message);
        setGitError(true);
      } finally {
        setGitLoading(false);
      }
    };

    const fetchLeetcodeStats = async () => {
      try {
        const res = await axios.get("https://leetcode-api-faisal.appspot.com/api/v1/Dhodduraaj_");
        if (res.data && res.data.totalSolved) {
          setLeetcodeSolved(res.data.totalSolved);
        }
      } catch (err) {
        console.warn("Leetcode stats fetch blocked or offline. Falling back to profile link.");
      } finally {
        setLeetcodeLoading(false);
      }
    };

    fetchGitEvents();
    fetchLeetcodeStats();
  }, []);

  const profiles = [
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/Dhodduraaj_/",
      username: "Dhodduraaj_",
      stats: leetcodeSolved ? `${leetcodeSolved} Solved` : "300+ Solved Nodes",
      desc: "Solving DSA nodes in Java. Focus on recursive stacks, binary searches, dynamic arrays, and paths.",
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
    <section id="stats" className="py-24 bg-white dark:bg-[#0B1329] border-t-4 border-black relative overflow-hidden">
      {/* Background illustrated print grid */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] pointer-events-none z-0">
        <svg width="100%" height="100%">
          <pattern id="stats-print" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.5" fill="#000000" />
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

        {/* Git Contribution Grid - Glowing Monitor Frame with REAL Git push events */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 crt-panel crt-screen text-emerald-400 border-emerald-500/60 shadow-[6px_6px_0px_0px_#059669]"
        >
          <div className="flex justify-between items-center border-b-2 border-black/40 pb-3 mb-6 select-none text-[8px] font-mono tracking-widest font-black uppercase opacity-85">
            <span>[GITHUB CORE METRIC: RECENT ACTIVITIES]</span>
            <span className="animate-pulse text-emerald-400">● LIVE FEED</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-black text-white text-lg flex items-center gap-2 uppercase tracking-tight">
                <Terminal size={18} className="text-[#E63946]" />
                Recent Git Commits Log (Real Data Only)
              </h3>
              <p className="text-xs font-semibold text-slate-400">Showing public repository push logs dynamically fetched from GitHub</p>
            </div>
            <span className="text-xs font-black px-3 py-1 border-2 border-black bg-emerald-500/10 text-emerald-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase flex items-center gap-1.5">
              <RefreshCw className="animate-spin [animation-duration:8s]" size={12} />
              {githubStats.followers} Followers
            </span>
          </div>

          {/* Activity Console */}
          <div className="border-2 border-black/30 p-5 bg-[#070b14]/95 font-mono text-xs md:text-sm text-emerald-400 space-y-3 max-h-60 overflow-y-auto leading-relaxed shadow-[inner_3px_3px_0px_0px_rgba(0,0,0,1)]">
            {gitLoading ? (
              <div className="flex items-center gap-2">
                <span className="animate-ping w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>SYSTEM LOADER ACTIVE... RETRIEVING LIVE COMMITS...</span>
              </div>
            ) : gitError || gitEvents.length === 0 ? (
              <div className="text-rose-400 space-y-2">
                <div>[ERROR: CONNECTION BLOCKED OR RATELIMITED BY HOST]</div>
                <div className="text-slate-400 text-xs">Direct API call bypassed. Please click the GitHub button above to inspect my commits directly!</div>
              </div>
            ) : (
              gitEvents.map((evt, idx) => {
                const repoName = evt.repo.name.replace("Dhodduraaj/", "");
                const commits = evt.payload.commits || [];
                const latestCommitMsg = commits[0]?.message || "Modified files";
                const eventDate = new Date(evt.created_at).toLocaleDateString();

                return (
                  <div key={evt.id} className="border-b border-black/30 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-[#E63946] font-bold">[{eventDate}]</span>{" "}
                    <span className="text-white font-bold">dhodduraaj</span> pushed to{" "}
                    <span className="underline text-emerald-300 font-bold">{repoName}</span>:
                    <div className="pl-4 text-slate-350 italic mt-0.5 font-sans font-semibold">
                      "{latestCommitMsg}"
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
