import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import CodingProfiles from "./components/CodingProfiles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ComicReveal from "./components/ComicReveal";
import WebHero from "./components/WebHero";
import axios from "axios";
import { skills } from "./data/skills";
import { projects } from "./data/projects";
import { achievements } from "./data/achievements";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });



  // Live GitHub Stats State
  const [githubStats, setGithubStats] = useState({
    repos: 12,
    followers: 5,
    following: 8,
    stars: 4,
    languages: [
      { name: "Java", percentage: 55 },
      { name: "JavaScript", percentage: 25 },
      { name: "CSS", percentage: 12 },
      { name: "HTML", percentage: 8 }
    ]
  });

  // Scroll swing tracking states
  const [activeSection, setActiveSection] = useState("home");
  const [isSwinging, setIsSwinging] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  // Easter Egg States: Camera Shake and Web Splats
  const [shakeActive, setShakeActive] = useState(false);
  const [splats, setSplats] = useState([]);

  useEffect(() => {
    const handleShake = () => {
      setShakeActive(true);
      setTimeout(() => setShakeActive(false), 400);
    };

    const handleSplat = (e) => {
      const { x, y } = e.detail || { x: window.innerWidth - 100, y: 400 };
      const id = Date.now() + Math.random();
      setSplats((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setSplats((prev) => prev.filter((s) => s.id !== id));
      }, 1500);
    };

    window.addEventListener("spidey-shake", handleShake);
    window.addEventListener("spidey-shoot-splat", handleSplat);

    // Global click listener for red headings / logo splat
    const handleGlobalClick = (e) => {
      const isTrigger = e.target.closest("span.text-white.bg-\\[\\#E63946\\]") ||
        e.target.closest("header div.text-xl") ||
        e.target.closest("h2 span.text-white") ||
        e.target.closest("h1 span.text-white");

      if (isTrigger) {
        const splatX = e.pageX;
        const splatY = e.pageY;
        window.dispatchEvent(new CustomEvent("spidey-shoot-splat", {
          detail: { x: splatX, y: splatY }
        }));
        window.dispatchEvent(new CustomEvent("spidey-shake"));
      }
    };

    window.addEventListener("click", handleGlobalClick);

    return () => {
      window.removeEventListener("spidey-shake", handleShake);
      window.removeEventListener("spidey-shoot-splat", handleSplat);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  // Apply Dark Mode styling class globally to html tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Sync with system theme changes if no manual override exists
  useEffect(() => {
    if (localStorage.getItem("theme")) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Global scroll listener for swing triggers & scrollSpy
  useEffect(() => {
    const handleScroll = () => {
      setIsSwinging(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);

      const timeout = setTimeout(() => {
        setIsSwinging(false);
      }, 500);
      setScrollTimeout(timeout);

      const scrollPosition = window.scrollY + 250;
      const navItems = ["home", "about", "skills", "projects", "achievements", "certifications", "stats", "contact"];
      for (const id of navItems) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [scrollTimeout]);

  // Fetch Live GitHub Stats
  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          axios.get("https://api.github.com/users/Dhodduraaj"),
          axios.get("https://api.github.com/users/Dhodduraaj/repos?per_page=100")
        ]);

        if (userRes.data && reposRes.data) {
          const reposData = reposRes.data;

          // Calculate stars
          const stars = reposData.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

          // Calculate languages
          const langMap = {};
          reposData.forEach(repo => {
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          });

          const totalLangs = Object.values(langMap).reduce((a, b) => a + b, 0);
          const topLanguages = Object.entries(langMap)
            .map(([lang, count]) => ({
              name: lang,
              percentage: Math.round((count / totalLangs) * 100)
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 4);

          setGithubStats({
            repos: userRes.data.public_repos,
            followers: userRes.data.followers,
            following: userRes.data.following,
            stars: stars,
            languages: topLanguages
          });
        }
      } catch (err) {
        console.warn("GitHub extended fetch bypassed. Using offline stats.", err.message);
        // Fallbacks
        setGithubStats({
          repos: 12,
          followers: 5,
          following: 8,
          stars: 4,
          languages: [
            { name: "Java", percentage: 55 },
            { name: "JavaScript", percentage: 25 },
            { name: "CSS", percentage: 12 },
            { name: "HTML", percentage: 8 }
          ]
        });
      }
    };

    fetchGithub();
  }, []);

  return (
    <div className={`min-h-screen text-slate-900 dark:text-slate-100 bg-[#FFFBF0] dark:bg-[#0B1329] transition-colors duration-300 relative ${shakeActive ? "camera-shake-active" : ""}`}>
      <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} activeSection={activeSection} />
      <Hero />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Achievements achievements={achievements} />
      <Certifications />
      <CodingProfiles githubStats={githubStats} darkMode={darkMode} />
      <Contact />
      <ComicReveal />
      <Footer />
      {/* Floating vector guide */}
      <WebHero activeSection={activeSection} isSwinging={isSwinging} />

      {/* Floating Web Splat Layer */}
      {splats.map((splat) => (
        <div
          key={splat.id}
          style={{
            position: "absolute",
            left: splat.x,
            top: splat.y,
            transform: "translate(-50%, -50%)",
            width: "120px",
            height: "120px",
            zIndex: 9999,
          }}
          className="pointer-events-none select-none animate-pulse"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-slate-400 dark:text-slate-100 opacity-90 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
            <circle cx="50" cy="50" r="10" fill="currentColor" />
            <path d="M 50,50 L 15,15 M 50,50 L 85,15 M 50,50 L 85,85 M 50,50 L 15,85 M 50,50 L 50,5 M 50,50 L 50,95 M 50,50 L 5,50 M 50,50 L 95,50" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M 50,50 Q 25,25 15,15 M 50,50 Q 75,25 85,15 M 50,50 Q 25,75 15,85 M 50,50 Q 75,75 85,85" stroke="currentColor" strokeWidth="2.2" fill="none" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default App;
