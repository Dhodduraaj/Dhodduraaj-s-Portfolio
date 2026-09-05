import React, { useEffect, useState, useRef, useCallback } from "react";

/**
 * SpiderSenseCursor
 * 
 * Replaces the default browser cursor on desktop with a single, custom Spider-Sense pointer.
 * - 1:1 zero-lag tracking directly aligned with actual hardware mouse position.
 * - Center click hotspot dead-centered at pointer coordinates.
 * - Normal state: clearly visible to the naked eye (~9px comic dot with Spider-Man red, black outline & white shine).
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
        const el = document.elementFromPoint(rect.left + 20, rect.top + 20);
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
        Left: -20px, Top: -20px aligns SVG's center (20, 20) directly with (0, 0)
        This guarantees the click hotspot is 100% mathematically centered on the cursor dot!
      */}
      <div className="relative -top-5 -left-5 w-10 h-10 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 40 40"
          className="w-10 h-10 overflow-visible"
        >
          <defs>
            {/* Crisp comic drop shadow for high contrast on light & dark backgrounds */}
            <filter id="spider-cursor-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.65" />
            </filter>
          </defs>

          {/* 1. Spider-Sense Radar Ring (Activated on hover) */}
          {isSenseActive && (
            <g className="transition-opacity duration-200">
              {/* Calm active ring */}
              <circle
                cx="20"
                cy="20"
                r="13"
                fill="none"
                stroke="#E63946"
                strokeWidth="1.5"
                className="opacity-80"
              />

              {/* Outer comic dashed accent */}
              <circle
                cx="20"
                cy="20"
                r="13"
                fill="none"
                stroke="#000000"
                strokeWidth="0.6"
                strokeDasharray="2 2"
                className="opacity-70"
              />

              {/* Single radar ripple on trigger */}
              {!reducedMotion && (
                <circle
                  key={`pulse-${pulseKey}`}
                  cx="20"
                  cy="20"
                  r="12"
                  fill="none"
                  stroke={senseType === "contact" ? "#E63946" : senseType === "connection" ? "#1D3557" : "#E63946"}
                  strokeWidth="1.75"
                  className="spider-sense-radar-pulse"
                />
              )}

              {/* Special Context: Project Web Motif */}
              {senseType === "project" && (
                <polygon
                  points="20,11.5 25.5,14 28,19.5 25.5,25.5 20,28 14.5,25.5 12,19.5 14.5,14"
                  fill="none"
                  stroke="#E63946"
                  strokeWidth="0.9"
                  strokeDasharray="2 2"
                  className="opacity-85"
                />
              )}

              {/* Special Context: External Connection Corner Ticks */}
              {senseType === "connection" && (
                <g stroke="#1D3557" strokeWidth="1.4" strokeLinecap="square">
                  <line x1="6" y1="20" x2="4" y2="20" />
                  <line x1="34" y1="20" x2="36" y2="20" />
                  <line x1="20" y1="6" x2="20" y2="4" />
                  <line x1="20" y1="34" x2="20" y2="36" />
                </g>
              )}

              {/* Special Context: Signal Beacon Concentric Pulse */}
              {senseType === "contact" && (
                <circle
                  cx="20"
                  cy="20"
                  r="16.5"
                  fill="none"
                  stroke="#E63946"
                  strokeWidth="0.85"
                  strokeDasharray="3 2"
                  className="opacity-70 animate-pulse"
                />
              )}
            </g>
          )}

          {/* 2. Sense Lines (Comic directional spikes: ╲ │ ╱ ── ◉ ── ╱ │ ╲) */}
          <g
            className={`transition-all duration-200 ${
              isSenseActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transformOrigin: "20px 20px" }}
          >
            {/* Top */}
            <line x1="20" y1="13" x2="20" y2="6" stroke="#E63946" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="20" y1="13" x2="20" y2="6" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" />

            {/* Bottom */}
            <line x1="20" y1="27" x2="20" y2="34" stroke="#E63946" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="20" y1="27" x2="20" y2="34" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" />

            {/* Left */}
            <line x1="13" y1="20" x2="6" y2="20" stroke="#E63946" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="13" y1="20" x2="6" y2="20" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" />

            {/* Right */}
            <line x1="27" y1="20" x2="34" y2="20" stroke="#E63946" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="27" y1="20" x2="34" y2="20" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" />

            {/* Top-Left ╲ */}
            <line x1="15" y1="15" x2="9.5" y2="9.5" stroke="#E63946" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="15" y1="15" x2="9.5" y2="9.5" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" />

            {/* Top-Right ╱ */}
            <line x1="25" y1="15" x2="30.5" y2="9.5" stroke="#E63946" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="25" y1="15" x2="30.5" y2="9.5" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" />

            {/* Bottom-Left ╱ */}
            <line x1="15" y1="25" x2="9.5" y2="30.5" stroke="#E63946" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="15" y1="25" x2="9.5" y2="30.5" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" />

            {/* Bottom-Right ╲ */}
            <line x1="25" y1="25" x2="30.5" y2="30.5" stroke="#E63946" strokeWidth="1.75" strokeLinecap="round" />
            <line x1="25" y1="25" x2="30.5" y2="30.5" stroke="#000000" strokeWidth="0.5" strokeLinecap="round" />
          </g>

          {/* 3. Click Impact Effect (THWIP! micro-burst on user click) */}
          {isClicking && !reducedMotion && (
            <g key={`click-${clickKey}`}>
              {/* Expanding impact ring */}
              <circle
                cx="20"
                cy="20"
                r="7"
                fill="none"
                stroke="#E63946"
                strokeWidth="2.5"
                className="spider-sense-click-effect"
              />
              {/* Comic spark dots */}
              <g className="spider-sense-spark-effect" fill="#000000">
                <circle cx="12" cy="12" r="1.2" />
                <circle cx="28" cy="12" r="1.2" />
                <circle cx="12" cy="28" r="1.2" />
                <circle cx="28" cy="28" r="1.2" />
              </g>
            </g>
          )}

          {/* 4. Center Dot (Primary Cursor Pointer)
              Diameter: ~9px (r=4.5), clearly visible to the naked eye for all users,
              with bold comic black border and crisp white reflection speck.
          */}
          <circle
            cx="20"
            cy="20"
            r={isSenseActive ? 5.2 : 4.5}
            fill="#E63946"
            stroke="#000000"
            strokeWidth="1.6"
            filter="url(#spider-cursor-shadow)"
            className="transition-all duration-200"
          />

          {/* Tactile comic highlight reflection */}
          <circle
            cx="18.6"
            cy="18.6"
            r={isSenseActive ? 1.4 : 1.2}
            fill="#FFFFFF"
            className="transition-all duration-200"
          />
        </svg>
      </div>
    </div>
  );
}
