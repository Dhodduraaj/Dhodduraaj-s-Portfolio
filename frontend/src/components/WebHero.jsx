import React, { useEffect, useState, useRef, useCallback } from "react";

export default function WebHero({ activeSection, isSwinging }) {
  const [pose, setPose] = useState("idle"); // idle, swinging, pointing
  const [customQuote, setCustomQuote] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [visible, setVisible] = useState(true);

  // ─── Physics simulation state (for React renders) ───────────────────────
  const [theta, setTheta] = useState(0);
  const [omega, setOmega] = useState(0);
  const [ropeLength, setRopeLength] = useState(360);
  const [bodyTilt, setBodyTilt] = useState(0);

  // ─── Refs for the inner physics loop ────────────────────────────────────
  const thetaRef = useRef(0);
  const omegaRef = useRef(0);
  const ropeLengthRef = useRef(360);
  const bodyTiltRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  const isSwingingRef = useRef(isSwinging);
  const activeSectionRef = useRef(activeSection);

  // ─── Scroll-delta tracking ───────────────────────────────────────────────
  const lastScrollY = useRef(window.scrollY);
  const scrollDeltaRef = useRef(0);     // accumulated scroll delta
  const scrollActiveRef = useRef(false); // true while user is scrolling

  // Keep refs in sync with props
  useEffect(() => {
    isSwingingRef.current = isSwinging;
    activeSectionRef.current = activeSection;
  }, [isSwinging, activeSection]);

  // ─── Scroll listener: accumulate delta ──────────────────────────────────
  useEffect(() => {
    let scrollTimer = null;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      lastScrollY.current = currentY;

      // Clamp contribution per scroll event
      scrollDeltaRef.current += Math.max(-40, Math.min(40, delta));
      scrollActiveRef.current = true;

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrollActiveRef.current = false;
      }, 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const spideyQuotes = [
    "Spring Boot is my web-shooter! 🕸️",
    "Bugs? Caught in mid-air! 🕷️",
    "Query load? I swing past it! 🚀",
    "Need a backend hero? PING ME!",
    "No radioactive servers were harmed. 🧪",
    "Deploying at terminal velocity! ⚡",
  ];

  const handleSpideyClick = useCallback((e) => {
    if (isSpinning) return;
    setIsSpinning(true);
    const randomIdx = Math.floor(Math.random() * spideyQuotes.length);
    setCustomQuote(spideyQuotes[randomIdx]);

    // Big velocity kick on click
    omegaRef.current = 18.0;

    window.dispatchEvent(new CustomEvent("spidey-shake"));
    window.dispatchEvent(
      new CustomEvent("spidey-shoot-splat", {
        detail: {
          x: e.clientX || window.innerWidth - 100,
          y: (e.clientY + window.scrollY) || 450,
        },
      })
    );

    setTimeout(() => setIsSpinning(false), 1200);
  }, [isSpinning]);

  // Clear quote when section changes
  useEffect(() => { setCustomQuote(""); }, [activeSection]);

  // ─── Physics Simulation Loop ─────────────────────────────────────────────
  useEffect(() => {
    let animId;

    const loop = () => {
      const now = Date.now();
      let dt = (now - lastTimeRef.current) / 1000;
      if (dt > 0.05) dt = 0.05;
      lastTimeRef.current = now;

      const g = 900;   // gravity px/s²
      const L_base = 360;   // base web length px

      // Pendulum: α = -(g/L)·sin(θ)
      let alpha = -(g / L_base) * Math.sin(thetaRef.current);

      // Higher damping to make the swing gentle and controlled
      const drag = scrollActiveRef.current ? 1.5 : 2.5;
      alpha -= drag * omegaRef.current;

      // ── Scroll-driven impulse ────────────────────────────────────────────
      if (scrollActiveRef.current && Math.abs(scrollDeltaRef.current) > 0) {
        // Map scroll delta → gentle angular velocity kick
        const impulse = scrollDeltaRef.current * 0.003;
        omegaRef.current += impulse;
        scrollDeltaRef.current *= 0.3; // fast decay
      }

      // Integrate
      omegaRef.current += alpha * dt;
      thetaRef.current += omegaRef.current * dt;

      // Hard clamp theta to an acute angle of ±35° (70° total swing arc)
      const maxTheta = 35 * Math.PI / 180;
      if (thetaRef.current < -maxTheta) {
        thetaRef.current = -maxTheta;
        omegaRef.current = 0;
      } else if (thetaRef.current > maxTheta) {
        thetaRef.current = maxTheta;
        omegaRef.current = 0;
      }

      // Fixed rope length (no stretch)
      ropeLengthRef.current = L_base;

      // Settle to rest quickly when not scrolling
      if (
        !scrollActiveRef.current &&
        Math.abs(thetaRef.current) < 0.04 &&
        Math.abs(omegaRef.current) < 0.04
      ) {
        thetaRef.current = 0;
        omegaRef.current = 0;
        ropeLengthRef.current = L_base;
      }

      // Keep character vertically upright (no rotation)
      bodyTiltRef.current = 0;

      // Pose update
      if (scrollActiveRef.current || Math.abs(omegaRef.current) > 0.5) {
        setPose("swinging");
      } else if (
        activeSectionRef.current === "projects" ||
        activeSectionRef.current === "contact"
      ) {
        setPose("pointing");
      } else {
        setPose("idle");
      }

      // Push state to React
      setTheta(thetaRef.current);
      setOmega(omegaRef.current);
      setRopeLength(ropeLengthRef.current);
      setBodyTilt(bodyTiltRef.current);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── Coordinate Calculations ─────────────────────────────────────────────
  // Container is 320px wide; pivot is near top-right
  const pivotX = 155;
  const pivotY = -30;  // above viewport edge

  // Web attachment point (Spidey's left hand)
  const handX = pivotX + ropeLength * Math.sin(theta);
  const handY = pivotY + ropeLength * Math.cos(theta);

  // Body centre (slightly below hand along swing axis)
  const bodyX = handX - 8 * Math.sin(bodyTilt);
  const bodyY = handY + 18 * Math.cos(bodyTilt);

  // Web control point bows with velocity
  const webCtrlX = (pivotX + handX) / 2 - omega * 14;
  const webCtrlY = (pivotY + handY) / 2;

  // ── Chibi skeleton ──────────────────────────────────────────────────────
  // Shoulder centre
  const shX = bodyX;
  const shY = bodyY - 16;

  // Hip centre (shorter torso = 22 px)
  const hipX = bodyX + 18 * Math.sin(bodyTilt);
  const hipY = bodyY + 22 * Math.cos(bodyTilt);

  // ── HEAD (chibi: large, upright, centred above shoulders) ───────────────
  // Head sits directly above shoulders and rotates with body axis — never inverts
  // We clamp bodyTilt to avoid flipping past ±90°
  const clampedTilt = Math.max(-1.1, Math.min(0, bodyTilt));
  const headCX = shX - 4 * Math.sin(clampedTilt);
  const headCY = shY - 20 * Math.cos(clampedTilt);   // 20 px above shoulders
  // Head tilt angle in degrees for SVG transform — much smaller than body tilt
  const headDeg = (clampedTilt * 180 / Math.PI) * 0.55;

  // ── Arms ────────────────────────────────────────────────────────────────
  // Left arm → locked onto web-attachment hand
  const leftElbowX = (shX - 8 + handX) / 2 - 14 * Math.cos(bodyTilt);
  const leftElbowY = (shY + handY) / 2 - 8 * Math.sin(bodyTilt);

  // Right arm → free / pose-dependent
  let rightHandX, rightHandY;
  if (pose === "pointing") {
    rightHandX = shX + 40;
    rightHandY = shY - 4;
  } else if (pose === "swinging") {
    const t = Date.now() / 150;
    rightHandX = shX + 26 * Math.sin(bodyTilt + 1.2 + Math.sin(t) * 0.4);
    rightHandY = shY - 18 * Math.cos(bodyTilt + 1.2);
  } else {
    const t = Date.now() / 300;
    rightHandX = shX + 18 + Math.sin(t) * 2;
    rightHandY = shY + 16 + Math.sin(t) * 1.5;
  }
  const rightElbowX = (shX + 8 + rightHandX) / 2 + 8 * Math.cos(bodyTilt);
  const rightElbowY = (shY + rightHandY) / 2 + 4 * Math.sin(bodyTilt);

  // ── Legs (shorter — chibi proportions) ──────────────────────────────────
  const leftHipX = hipX - 6 * Math.cos(bodyTilt);
  const leftHipY = hipY + 5 * Math.sin(bodyTilt);

  let leftFootX = leftHipX - 9 * Math.sin(bodyTilt) - omega * 9;
  let leftFootY = leftHipY + 30 * Math.cos(bodyTilt) - Math.abs(omega) * 2.5;
  if (pose === "idle") {
    const t = Date.now() / 350;
    leftFootX += Math.sin(t) * 1.0;
    leftFootY += Math.sin(t) * 1.5;
  }
  const leftKneeX = (leftHipX + leftFootX) / 2 - 7 * Math.cos(bodyTilt);
  const leftKneeY = (leftHipY + leftFootY) / 2 + 4 * Math.sin(bodyTilt);

  const rightHipX = hipX + 6 * Math.cos(bodyTilt);
  const rightHipY = hipY - 5 * Math.sin(bodyTilt);

  let rightFootX = rightHipX + 9 * Math.sin(bodyTilt) - omega * 6;
  let rightFootY = rightHipY + 25 * Math.cos(bodyTilt) - Math.abs(omega) * 1.5;
  if (pose === "idle") {
    const t = Date.now() / 350 + 0.5;
    rightFootX += Math.sin(t) * 1.0;
    rightFootY += Math.sin(t) * 1.5;
  }
  const rightKneeX = (rightHipX + rightFootX) / 2 + 7 * Math.cos(bodyTilt);
  const rightKneeY = (rightHipY + rightFootY) / 2 + 3 * Math.sin(bodyTilt);

  return (
    <div className="fixed top-0 right-0 h-screen w-[320px] pointer-events-none z-40 hidden md:block">

      {/* ── Pivot splat ─────────────────────────────────────────────────── */}
      <svg
        className="absolute overflow-visible text-slate-300 dark:text-slate-600"
        style={{ width: 60, height: 60, top: 0, left: pivotX, transform: "translate(-50%, -50%)" }}
      >
        <path
          d="M 30,30 L 10,10 M 30,30 L 50,10 M 30,30 L 50,50 M 30,30 L 10,50 M 30,30 L 30,5 M 30,30 L 30,55 M 30,30 L 5,30 M 30,30 L 55,30"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8"
        />
        <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" strokeDasharray="3 3" />
        <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <circle cx="30" cy="30" r="4.5" fill="currentColor" />
      </svg>

      {/* ── Main canvas ─────────────────────────────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">

        {/* Web line — bolder outer silhouette + bright inner */}
        <path
          d={`M ${pivotX},${pivotY} Q ${webCtrlX},${webCtrlY} ${handX},${handY}`}
          stroke="#000000" strokeWidth="5.5" fill="none" strokeLinecap="round"
        />
        <path
          d={`M ${pivotX},${pivotY} Q ${webCtrlX},${webCtrlY} ${handX},${handY}`}
          stroke="#EBEBEB" strokeWidth="2" fill="none" strokeLinecap="round"
        />

        {/* ── Clickable character group ──────────────────────────────────── */}
        <g className="cursor-pointer pointer-events-auto select-none" onClick={handleSpideyClick}>

          {/* ── Left arm — thicker, chibi proportions */}
          <path d={`M ${shX - 9},${shY + 2} Q ${leftElbowX},${leftElbowY} ${handX},${handY}`}
            stroke="#000000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d={`M ${shX - 9},${shY + 2} Q ${leftElbowX},${leftElbowY} ${handX},${handY}`}
            stroke="#E10600" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Left hand — oversized chibi knuckle + finger bumps */}
          <circle cx={handX} cy={handY} r="7" fill="#000000" />
          <circle cx={handX} cy={handY} r="4.2" fill="#E10600" />
          <circle cx={handX - 3} cy={handY - 5} r="1.6" fill="#000000" />
          <circle cx={handX} cy={handY - 6} r="1.6" fill="#000000" />
          <circle cx={handX + 3} cy={handY - 5} r="1.6" fill="#000000" />

          {/* ── Left leg — thigh (navy) + boot (red) + kneecap + oversized foot */}
          {/* Full leg outline */}
          <path d={`M ${leftHipX},${leftHipY} Q ${leftKneeX},${leftKneeY} ${leftFootX},${leftFootY}`}
            stroke="#000000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Thigh — hip to knee in navy */}
          <path d={`M ${leftHipX},${leftHipY} L ${leftKneeX},${leftKneeY}`}
            stroke="#1D3557" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          {/* Boot — knee to foot in red */}
          <path d={`M ${leftKneeX},${leftKneeY} Q ${(leftKneeX + leftFootX) / 2},${(leftKneeY + leftFootY) / 2 + 4} ${leftFootX},${leftFootY}`}
            stroke="#E10600" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx={leftKneeX} cy={leftKneeY} r="4" fill="#1D3557" stroke="#000000" strokeWidth="2.2" />
          <circle cx={leftFootX} cy={leftFootY} r="8" fill="#000000" />
          <circle cx={leftFootX} cy={leftFootY} r="5" fill="#E10600" />

          {/* ── Right leg — thigh (navy) + boot (red) + kneecap + oversized foot */}
          {/* Full leg outline */}
          <path d={`M ${rightHipX},${rightHipY} Q ${rightKneeX},${rightKneeY} ${rightFootX},${rightFootY}`}
            stroke="#000000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Thigh — hip to knee in navy */}
          <path d={`M ${rightHipX},${rightHipY} L ${rightKneeX},${rightKneeY}`}
            stroke="#1D3557" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          {/* Boot — knee to foot in red */}
          <path d={`M ${rightKneeX},${rightKneeY} Q ${(rightKneeX + rightFootX) / 2},${(rightKneeY + rightFootY) / 2 + 4} ${rightFootX},${rightFootY}`}
            stroke="#E10600" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx={rightKneeX} cy={rightKneeY} r="4" fill="#1D3557" stroke="#000000" strokeWidth="2.2" />
          <circle cx={rightFootX} cy={rightFootY} r="8" fill="#000000" />
          <circle cx={rightFootX} cy={rightFootY} r="5" fill="#E10600" />

          {/* ── Torso — barrel-chest silhouette ──────────────────────── */}
          {/* Black outer silhouette */}
          <path
            d={`M ${shX - 16},${shY + 1}
                C ${shX - 20},${shY + 8} ${leftHipX - 4},${leftHipY - 6} ${leftHipX},${leftHipY}
                L ${rightHipX},${rightHipY}
                C ${rightHipX + 4},${rightHipY - 6} ${shX + 20},${shY + 8} ${shX + 16},${shY + 1} Z`}
            fill="#000000" strokeLinejoin="round"
          />
          {/* Red torso fill */}
          <path
            d={`M ${shX - 14},${shY + 2}
                C ${shX - 17},${shY + 9} ${leftHipX - 2},${leftHipY - 4} ${leftHipX + 1},${leftHipY - 1}
                L ${rightHipX - 1},${rightHipY - 1}
                C ${rightHipX + 2},${rightHipY - 4} ${shX + 17},${shY + 9} ${shX + 14},${shY + 2} Z`}
            fill="#E10600" strokeLinejoin="round"
          />
          {/* Chest-puff highlight band */}
          <path
            d={`M ${shX - 13},${shY + 3}
                C ${shX - 16},${shY + 7} ${shX - 10},${shY + 5} ${shX},${shY + 5}
                C ${shX + 10},${shY + 5} ${shX + 16},${shY + 7} ${shX + 13},${shY + 3} Z`}
            fill="#FF2A1F" opacity="0.5"
          />
          {/* Blue side panels */}
          <path
            d={`M ${shX - 14},${shY + 5} L ${leftHipX + 1},${leftHipY - 1} L ${leftHipX + 5},${leftHipY - 1} L ${shX - 7},${shY + 7} Z`}
            fill="#1D3557"
          />
          <path
            d={`M ${shX + 14},${shY + 5} L ${rightHipX - 1},${rightHipY - 1} L ${rightHipX - 5},${rightHipY - 1} L ${shX + 7},${shY + 7} Z`}
            fill="#1D3557"
          />
          {/* Spider emblem — larger, centred */}
          <ellipse cx={shX} cy={shY + 10} rx="3" ry="2.5" fill="#000000" />
          <ellipse cx={shX} cy={shY + 14} rx="2" ry="1.8" fill="#000000" />
          <path d={`M ${shX},${shY + 10} Q ${shX - 5},${shY + 7}  ${shX - 9},${shY + 10}`} stroke="#000000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d={`M ${shX},${shY + 10} Q ${shX - 5},${shY + 13} ${shX - 9},${shY + 17}`} stroke="#000000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d={`M ${shX},${shY + 10} Q ${shX + 5},${shY + 7}  ${shX + 9},${shY + 10}`} stroke="#000000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          <path d={`M ${shX},${shY + 10} Q ${shX + 5},${shY + 13} ${shX + 9},${shY + 17}`} stroke="#000000" strokeWidth="1.3" fill="none" strokeLinecap="round" />

          {/* ── Right arm — thicker, chibi proportions */}
          <path d={`M ${shX + 9},${shY + 2} Q ${rightElbowX},${rightElbowY} ${rightHandX},${rightHandY}`}
            stroke="#000000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d={`M ${shX + 9},${shY + 2} Q ${rightElbowX},${rightElbowY} ${rightHandX},${rightHandY}`}
            stroke="#E10600" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Right hand — oversized chibi knuckle + finger bumps */}
          <circle cx={rightHandX} cy={rightHandY} r="6.5" fill="#000000" />
          <circle cx={rightHandX} cy={rightHandY} r="3.8" fill="#E10600" />
          <circle cx={rightHandX - 2.5} cy={rightHandY - 4.5} r="1.5" fill="#000000" />
          <circle cx={rightHandX} cy={rightHandY - 5.5} r="1.5" fill="#000000" />
          <circle cx={rightHandX + 2.5} cy={rightHandY - 4.5} r="1.5" fill="#000000" />

          {/* ── HEAD: chibi style, large, upright, centred ─────────────── */}
          {/*
            We rotate about (headCX, headCY) by headDeg — a small fraction of body tilt.
            rx / ry are generous for a chibi look.
            Origin stays above shoulders and never inverts.
          */}
          <g transform={`rotate(${headDeg}, ${headCX}, ${headCY})`}>

            {/* Neck — curved connector shoulder→head */}
            <path
              d={`M ${shX - 3},${shY - 1} Q ${shX},${(shY + headCY + 20) / 2} ${headCX},${headCY + 20}`}
              stroke="#000000" strokeWidth="8" strokeLinecap="round" fill="none"
            />
            <path
              d={`M ${shX - 3},${shY - 1} Q ${shX},${(shY + headCY + 20) / 2} ${headCX},${headCY + 20}`}
              stroke="#E10600" strokeWidth="4" strokeLinecap="round" fill="none"
            />

            {/* Outer black halo (silhouette border) */}
            <ellipse cx={headCX} cy={headCY} rx="20" ry="23" fill="#000000" />

            {/* Main red head fill */}
            <ellipse cx={headCX} cy={headCY} rx="18" ry="21" fill="#E10600" />

            {/* Blue chin + side mask zones */}
            <ellipse cx={headCX - 8} cy={headCY + 4} rx="8" ry="11" fill="#1D3557" opacity="0.7" />
            <ellipse cx={headCX + 8} cy={headCY + 4} rx="8" ry="11" fill="#1D3557" opacity="0.7" />
            <ellipse cx={headCX} cy={headCY + 15} rx="10" ry="6" fill="#1D3557" opacity="0.55" />

            {/* Web-lines on mask */}
            <ellipse cx={headCX} cy={headCY} rx="11" ry="14"
              fill="none" stroke="#000000" strokeWidth="0.8" opacity="0.35" />
            <line x1={headCX} y1={headCY - 21} x2={headCX} y2={headCY + 21}
              stroke="#000000" strokeWidth="0.8" opacity="0.35" />
            <line x1={headCX - 18} y1={headCY} x2={headCX + 18} y2={headCY}
              stroke="#000000" strokeWidth="0.8" opacity="0.35" />
            <line x1={headCX - 14} y1={headCY - 16} x2={headCX + 14} y2={headCY + 16}
              stroke="#000000" strokeWidth="0.6" opacity="0.22" />
            <line x1={headCX + 14} y1={headCY - 16} x2={headCX - 14} y2={headCY + 16}
              stroke="#000000" strokeWidth="0.6" opacity="0.22" />

            {/* ── Eyes: Spider-Verse arc-lens (thick black outer + sharp inner white) ─── */}
            {/* Left Eye Black Outline */}
            <path
              d={`M ${headCX - 16},${headCY - 2} C ${headCX - 15},${headCY - 9} ${headCX - 10},${headCY - 12.5} ${headCX - 1.5},${headCY + 3.5} C ${headCX - 4},${headCY + 8.5} ${headCX - 12},${headCY + 9.5} ${headCX - 16},${headCY - 2} Z`}
              fill="#000000" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round"
            />
            {/* Left Eye White Lens */}
            <path
              d={`M ${headCX - 14.5},${headCY - 2} C ${headCX - 13.5},${headCY - 8} ${headCX - 9.5},${headCY - 11} ${headCX - 3},${headCY + 2.5} C ${headCX - 5},${headCY + 7} ${headCX - 11.5},${headCY + 8} ${headCX - 14.5},${headCY - 2} Z`}
              fill="#FFFFFF" stroke="#000000" strokeWidth="0.8" strokeLinejoin="round"
            />

            {/* Right Eye Black Outline */}
            <path
              d={`M ${headCX + 16},${headCY - 2} C ${headCX + 15},${headCY - 9} ${headCX + 10},${headCY - 12.5} ${headCX + 1.5},${headCY + 3.5} C ${headCX + 4},${headCY + 8.5} ${headCX + 12},${headCY + 9.5} ${headCX + 16},${headCY - 2} Z`}
              fill="#000000" stroke="#000000" strokeWidth="1.2" strokeLinejoin="round"
            />
            {/* Right Eye White Lens */}
            <path
              d={`M ${headCX + 14.5},${headCY - 2} C ${headCX + 13.5},${headCY - 8} ${headCX + 9.5},${headCY - 11} ${headCX + 3},${headCY + 2.5} C ${headCX + 5},${headCY + 7} ${headCX + 11.5},${headCY + 8} ${headCX + 14.5},${headCY - 2} Z`}
              fill="#FFFFFF" stroke="#000000" strokeWidth="0.8" strokeLinejoin="round"
            />

            {/* Eye inner shadow */}
            <path d={`M ${headCX - 13.5},${headCY - 2.5} C ${headCX - 12.5},${headCY - 7.5} ${headCX - 9.5},${headCY - 10} ${headCX - 4.5},${headCY + 1.5}`}
              fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2.0" strokeLinecap="round" />
            <path d={`M ${headCX + 13.5},${headCY - 2.5} C ${headCX + 12.5},${headCY - 7.5} ${headCX + 9.5},${headCY - 10} ${headCX + 4.5},${headCY + 1.5}`}
              fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2.0" strokeLinecap="round" />

            {/* Eye gleam specks */}
            <circle cx={headCX - 9.5} cy={headCY - 6.5} r="1.8" fill="rgba(255,255,255,0.9)" />
            <circle cx={headCX - 12} cy={headCY - 3.5} r="1.0" fill="rgba(255,255,255,0.6)" />
            <circle cx={headCX + 9.5} cy={headCY - 6.5} r="1.8" fill="rgba(255,255,255,0.9)" />
            <circle cx={headCX + 12} cy={headCY - 3.5} r="1.0" fill="rgba(255,255,255,0.6)" />

          </g>

        </g>
      </svg>

      {/* ── Speech bubble ───────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: `${bodyX}px`,
          top: `${bodyY - 95}px`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.05s linear, top 0.05s linear",
        }}
        className="border-3 border-black bg-white text-black text-[9px] font-black px-3 py-2 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider whitespace-nowrap z-30 pointer-events-none select-none"
      >
        {customQuote ? customQuote : (
          <>
            {activeSection === "home" && "Bugs? Caught! 🕸️"}
            {activeSection === "about" && "Check stats below! 👇"}
            {activeSection === "skills" && "Active Power Grid! 📡"}
            {activeSection === "projects" && "Missions Survived! 🎖️"}
            {activeSection === "achievements" && "Wall of Wins! 🏆"}
            {activeSection === "certifications" && "Specialized Certs! 🎖️"}
            {activeSection === "stats" && "Reality Check! 🖥️"}
            {activeSection === "contact" && "Signal active! 📡"}
            {activeSection === "ComicReveal" && "That's me! 😁 "}
          </>
        )}
      </div>
    </div>
  );
}
