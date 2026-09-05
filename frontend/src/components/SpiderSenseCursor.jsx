import React, { useEffect, useState, useRef, useCallback } from "react";

/**
 * SpiderSenseCursor
 * 
 * Replaces the default browser cursor on desktop with a single, custom Spider-Sense pointer.
 * - 1:1 zero-lag tracking directly aligned with actual hardware mouse position.
 * - Center click hotspot dead-centered at pointer coordinates.
 * - Normal state: matches default cursor size (~21px comic Spidey mask with angled eyes, web lines & black outline).
 * - Interactive state: transforms smoothly into Spider-Sense radar ring + 8 directional comic lines (╲ │ ╱ ── ◉ ── ╱ │ ╲).
 * - Distinct sensory states: Connection (external/socials), Project (web pulse), Contact (signal beacon).
 * - Click feedback: micro comic impact burst (THWIP!) on click.
 * - Text inputs (<input>, <textarea>): smoothly yields to native text-caret for comfortable typing.
 * - Desktop-only: strictly dormant on mobile/touch devices.
 * - Respects prefers-reduced-motion.
 */
export default function SpiderSenseCursor() {
  const [senseType, setSenseType] = useState("default"); // default, interactive, connection, project, contact
  const [pulseKey, setPulseKey] = useState(0);
  const [clickKey, setClickKey] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [isOverTextInput, setIsOverTextInput] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cursorRef = useRef(null);
  const currentHoverEl = useRef(null);
  const isVisible = useRef(false);

  // Check desktop capabilities (fine pointer + hover) and reduced motion preference
  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setReducedMotion(prefersReduced);

    if (hasFinePointer && !isTouch) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Element classification: detects interactive targets and distinguishes special context
  const detectInteractiveTarget = useCallback((target) => {
    if (!target) return { isInteractive: false, type: "default", isTextInput: false };
    const el = target.nodeType === 1 ? target : target.parentElement;
    if (!el || typeof el.closest !== "function") return { isInteractive: false, type: "default", isTextInput: false };

    // Check if hovering a text input or textarea
    const textInputEl = el.closest('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');
    if (textInputEl) {
      return { isInteractive: false, type: "default", isTextInput: true, element: textInputEl };
    }

    // Check explicit data-spider-sense attribute
    const senseEl = el.closest("[data-spider-sense]");
    if (senseEl) {
      const explicitType = senseEl.getAttribute("data-spider-sense");
      return { isInteractive: true, type: explicitType || "interactive", isTextInput: false, element: senseEl };
    }

    // Check interactive HTML elements
    const interactiveEl = el.closest(
      'a, button, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer, [data-project-card], [data-cert-card]'
    );

    if (!interactiveEl) {
      return { isInteractive: false, type: "default", isTextInput: false };
    }

    // Categorize by context
    if (
      interactiveEl.closest("#projects") ||
      interactiveEl.hasAttribute("data-project-card") ||
      interactiveEl.classList.contains("project-card")
    ) {
      return { isInteractive: true, type: "project", isTextInput: false, element: interactiveEl };
    }

    if (
      interactiveEl.closest("#contact") ||
      interactiveEl.getAttribute("href")?.startsWith("mailto:") ||
      interactiveEl.getAttribute("href")?.startsWith("tel:")
    ) {
      return { isInteractive: true, type: "contact", isTextInput: false, element: interactiveEl };
    }

    if (
      interactiveEl.tagName === "A" &&
      (interactiveEl.getAttribute("target") === "_blank" ||
        interactiveEl.getAttribute("href")?.includes("github.com") ||
        interactiveEl.getAttribute("href")?.includes("linkedin.com") ||
        interactiveEl.getAttribute("href")?.includes("instagram.com"))
    ) {
      return { isInteractive: true, type: "connection", isTextInput: false, element: interactiveEl };
    }

    return { isInteractive: true, type: "interactive", isTextInput: false, element: interactiveEl };
  }, []);

  // Pointer tracking & event listeners
  useEffect(() => {
    if (!isEnabled) return;

    const updateTarget = (target) => {
      const { isInteractive, type, isTextInput, element } = detectInteractiveTarget(target);

      setIsOverTextInput(isTextInput);

      if (isInteractive) {
        if (currentHoverEl.current !== element) {
          currentHoverEl.current = element;
          setSenseType(type);
          setPulseKey((k) => k + 1);
        }
      } else {
        if (currentHoverEl.current !== null) {
          currentHoverEl.current = null;
          setSenseType("default");
        }
      }
    };

    // Instant 1:1 hardware pointer synchronization (zero lag)
    const handlePointerMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        if (!isVisible.current) {
          cursorRef.current.style.opacity = "1";
          isVisible.current = true;
        }
      }
      updateTarget(e.target);
    };

    const handlePointerOver = (e) => {
      updateTarget(e.target);
    };

    // Click feedback (THWIP impact)
    const handlePointerDown = () => {
      if (!reducedMotion) {
        setIsClicking(true);
        setClickKey((k) => k + 1);
      }
    };

    const handlePointerUp = () => {
      if (!reducedMotion) {
        setTimeout(() => setIsClicking(false), 220);
      }
    };

    // Update target if page scrolls beneath stationary cursor
    const handleScroll = () => {
      if (isVisible.current && cursorRef.current) {
        const rect = cursorRef.current.getBoundingClientRect();
        const el = document.elementFromPoint(rect.left + 24, rect.top + 24);
        if (el) updateTarget(el);
      }
    };

    const handlePointerLeave = () => {
      isVisible.current = false;
      currentHoverEl.current = null;
      setSenseType("default");
      if (cursorRef.current) {
        cursorRef.current.style.opacity = "0";
      }
    };

    const handlePointerEnter = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorRef.current.style.opacity = "1";
      }
      isVisible.current = true;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.documentElement.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, [isEnabled, detectInteractiveTarget, reducedMotion]);

  if (!isEnabled) return null;

  const isSenseActive = senseType !== "default";

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 pointer-events-none z-[99999] select-none will-change-transform ${
        isOverTextInput ? "opacity-0" : "opacity-1"
      } transition-opacity duration-150`}
      style={{
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      {/* 
        Center Anchor: 
        Left: -24px, Top: -24px aligns SVG's center (24, 24) directly with pointer (0, 0).
        This guarantees the click hotspot is 100% mathematically centered on the Spidey cursor!
      */}
      <div className="relative -top-6 -left-6 w-12 h-12 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 48 48"
          className="w-12 h-12 overflow-visible"
        >
          <defs>
            {/* Crisp comic drop shadow for high contrast on light & dark backgrounds */}
            <filter id="spider-cursor-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* 1. Spider-Sense Radar Ring (Activated on hover) */}
          {isSenseActive && (
            <g className="transition-opacity duration-200">
              {/* Calm active ring */}
              <circle
                cx="24"
                cy="24"
                r="16.5"
                fill="none"
                stroke="#E63946"
                strokeWidth="1.5"
                className="opacity-80"
              />

              {/* Outer comic dashed accent */}
              <circle
                cx="24"
                cy="24"
                r="16.5"
                fill="none"
                stroke="#000000"
                strokeWidth="0.6"
                strokeDasharray="2.5 2"
                className="opacity-70"
              />

              {/* Single radar ripple on trigger */}
              {!reducedMotion && (
                <circle
                  key={`pulse-${pulseKey}`}
                  cx="24"
                  cy="24"
                  r="15"
                  fill="none"
                  stroke={senseType === "contact" ? "#E63946" : senseType === "connection" ? "#1D3557" : "#E63946"}
                  strokeWidth="1.75"
                  className="spider-sense-radar-pulse"
                />
              )}

              {/* Special Context: Project Web Motif */}
              {senseType === "project" && (
                <polygon
                  points="24,13 31,16.5 34,24 31,31.5 24,35 17,31.5 14,24 17,16.5"
                  fill="none"
                  stroke="#E63946"
                  strokeWidth="0.9"
                  strokeDasharray="2.5 2"
                  className="opacity-85"
                />
              )}

              {/* Special Context: External Connection Corner Ticks */}
              {senseType === "connection" && (
                <g stroke="#1D3557" strokeWidth="1.5" strokeLinecap="square">
                  <line x1="6" y1="24" x2="3" y2="24" />
                  <line x1="42" y1="24" x2="45" y2="24" />
                  <line x1="24" y1="6" x2="24" y2="3" />
                  <line x1="24" y1="42" x2="24" y2="45" />
                </g>
              )}

              {/* Special Context: Signal Beacon Concentric Pulse */}
              {senseType === "contact" && (
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#E63946"
                  strokeWidth="0.9"
                  strokeDasharray="3 2"
                  className="opacity-75 animate-pulse"
                />
              )}
            </g>
          )}

          {/* 2. Sense Lines (Comic directional spikes: ╲ │ ╱ ── ◉ ── ╱ │ ╲) */}
          <g
            className={`transition-all duration-200 ${
              isSenseActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transformOrigin: "24px 24px" }}
          >
            {/* Top */}
            <line x1="24" y1="16" x2="24" y2="7" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="16" x2="24" y2="7" stroke="#000000" strokeWidth="0.6" strokeLinecap="round" />

            {/* Bottom */}
            <line x1="24" y1="32" x2="24" y2="41" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
            <line x1="24" y1="32" x2="24" y2="41" stroke="#000000" strokeWidth="0.6" strokeLinecap="round" />

            {/* Left */}
            <line x1="16" y1="24" x2="7" y2="24" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
            <line x1="16" y1="24" x2="7" y2="24" stroke="#000000" strokeWidth="0.6" strokeLinecap="round" />

            {/* Right */}
            <line x1="32" y1="24" x2="41" y2="24" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
            <line x1="32" y1="24" x2="41" y2="24" stroke="#000000" strokeWidth="0.6" strokeLinecap="round" />

            {/* Top-Left ╲ */}
            <line x1="18.5" y1="18.5" x2="11.5" y2="11.5" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.5" y1="18.5" x2="11.5" y2="11.5" stroke="#000000" strokeWidth="0.6" strokeLinecap="round" />

            {/* Top-Right ╱ */}
            <line x1="29.5" y1="18.5" x2="36.5" y2="11.5" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
            <line x1="29.5" y1="18.5" x2="36.5" y2="11.5" stroke="#000000" strokeWidth="0.6" strokeLinecap="round" />

            {/* Bottom-Left ╱ */}
            <line x1="18.5" y1="29.5" x2="11.5" y2="36.5" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.5" y1="29.5" x2="11.5" y2="36.5" stroke="#000000" strokeWidth="0.6" strokeLinecap="round" />

            {/* Bottom-Right ╲ */}
            <line x1="29.5" y1="29.5" x2="36.5" y2="36.5" stroke="#E63946" strokeWidth="2" strokeLinecap="round" />
            <line x1="29.5" y1="29.5" x2="36.5" y2="36.5" stroke="#000000" strokeWidth="0.6" strokeLinecap="round" />
          </g>

          {/* 3. Click Impact Effect (THWIP! micro-burst on user click) */}
          {isClicking && !reducedMotion && (
            <g key={`click-${clickKey}`}>
              {/* Expanding impact ring */}
              <circle
                cx="24"
                cy="24"
                r="11"
                fill="none"
                stroke="#E63946"
                strokeWidth="2.5"
                className="spider-sense-click-effect"
              />
              {/* Comic spark dots */}
              <g className="spider-sense-spark-effect" fill="#000000">
                <circle cx="14" cy="14" r="1.4" />
                <circle cx="34" cy="14" r="1.4" />
                <circle cx="14" cy="34" r="1.4" />
                <circle cx="34" cy="34" r="1.4" />
              </g>
            </g>
          )}

          {/* 4. Custom Spidey Theme Cursor Mask Pointer
              Diameter: ~21px-23px (matches standard default cursor size of ~20-24px),
              featuring comic Spider-Man mask silhouette, web lattice, and angled white eyes.
          */}
          <g>
            {/* Spidey Face Base Circle */}
            <circle
              cx="24"
              cy="24"
              r={isSenseActive ? 11.5 : 10.5}
              fill="#E63946"
              stroke="#000000"
              strokeWidth="1.8"
              filter="url(#spider-cursor-shadow)"
              className="transition-all duration-200"
            />

            {/* Web Lattice Lines */}
            <line
              x1="24"
              y1={isSenseActive ? 12.5 : 13.5}
              x2="24"
              y2={isSenseActive ? 35.5 : 34.5}
              stroke="#000000"
              strokeWidth="0.75"
              opacity="0.65"
            />
            <path
              d="M 16 23.5 Q 24 26 32 23.5"
              fill="none"
              stroke="#000000"
              strokeWidth="0.75"
              opacity="0.65"
            />
            <path
              d="M 17.5 19 Q 24 21.5 30.5 19"
              fill="none"
              stroke="#000000"
              strokeWidth="0.7"
              opacity="0.55"
            />
            <path
              d="M 18.5 28.5 Q 24 26 29.5 28.5"
              fill="none"
              stroke="#000000"
              strokeWidth="0.7"
              opacity="0.55"
            />

            {/* Iconic Spider-Man Angled White Eyes with Black Comic Contours */}
            {/* Left Eye */}
            <path
              d="M 16 21 Q 19 20 22 24.2 Q 19.5 25.5 16 21 Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            {/* Right Eye */}
            <path
              d="M 32 21 Q 29 20 26 24.2 Q 28.5 25.5 32 21 Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />

            {/* Specular Comic Highlight Reflection */}
            <circle
              cx="21.5"
              cy="16.5"
              r={isSenseActive ? 1.4 : 1.2}
              fill="#FFFFFF"
              opacity="0.9"
              className="transition-all duration-200"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
