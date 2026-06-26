import React, { useEffect, useState, useRef } from "react";

// -------------------------------------------------------------
// ATHLETIC SPIDER-MAN VECTOR PARTS (1:7 Proportion skeletal frames)
// -------------------------------------------------------------

const SpideyEyes = ({ type, y }) => {
  if (type === "squint") {
    return (
      <>
        {/* Left Eye */}
        <polygon points={`38,${y-1} 48,${y} 44,${y-3}`} fill="#FFFFFF" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
        {/* Right Eye */}
        <polygon points={`62,${y-1} 52,${y} 56,${y-3}`} fill="#FFFFFF" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
      </>
    );
  }
  if (type === "focused") {
    return (
      <>
        {/* Left Eye */}
        <polygon points={`36,${y-2} 48,${y+1} 44,${y-7}`} fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Right Eye */}
        <polygon points={`64,${y-2} 52,${y+1} 56,${y-7}`} fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
      </>
    );
  }
  if (type === "wide") {
    return (
      <>
        {/* Left Eye */}
        <path d={`M 34,${y-3} C 34,${y-3} 46,${y+4} 47,${y-1} C 48,-5 35,-9 34,${y-3}`} fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
        {/* Right Eye */}
        <path d={`M 66,${y-3} C 66,${y-3} 54,${y+4} 53,${y-1} C 52,-5 65,-9 66,${y-3}`} fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
      </>
    );
  }
  // Normal athletic eyes
  return (
    <>
      {/* Left Eye */}
      <polygon points={`36,${y-1} 48,${y+2} 44,${y-6}`} fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Right Eye */}
      <polygon points={`64,${y-1} 52,${y+2} 56,${y-6}`} fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" />
    </>
  );
};

const SpideyHead = ({ y, rot, eyeType }) => {
  return (
    <g transform={`rotate(${rot}, 50, ${y})`}>
      {/* Sleek Oval Head Shape (1:7 proportion - smaller head) */}
      <path
        d={`M 50,${y-12} 
           C 38,${y-12} 36,${y-8} 36,${y} 
           C 36,${y+7} 40,${y+10} 50,${y+10} 
           C 60,${y+7} 64,${y-8} 64,${y} 
           C 64,${y-8} 62,${y-12} 50,${y-12} Z`}
        fill="#E63946"
        stroke="#000000"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Mask web lines */}
      <ellipse cx="50" cy={y} rx="9" ry="7" fill="none" stroke="#000000" strokeWidth="0.6" opacity="0.35" />
      <ellipse cx="50" cy={y} rx="4.5" ry="3.5" fill="none" stroke="#000000" strokeWidth="0.6" opacity="0.35" />
      <line x1="50" y1={y} x2="41" y2={y-9} stroke="#000000" strokeWidth="0.6" opacity="0.35" />
      <line x1="50" y1={y} x2="59" y2={y-9} stroke="#000000" strokeWidth="0.6" opacity="0.35" />
      <line x1="50" y1={y} x2="36" y2={y} stroke="#000000" strokeWidth="0.6" opacity="0.35" />
      <line x1="50" y1={y} x2="64" y2={y} stroke="#000000" strokeWidth="0.6" opacity="0.35" />
      <line x1="50" y1={y} x2="41" y2={y+8} stroke="#000000" strokeWidth="0.6" opacity="0.35" />
      <line x1="50" y1={y} x2="59" y2={y+8} stroke="#000000" strokeWidth="0.6" opacity="0.35" />
      
      <SpideyEyes type={eyeType} y={y} />
    </g>
  );
};

const SpideyTorso = ({ y, h, w, headY }) => {
  const neckY = headY + 8;
  const hipY = y + h;
  const hipW = 10;
  return (
    <g>
      {/* Broad V-shaped muscular Torso Outline */}
      <path
        d={`M 50,${neckY} 
           C ${50 - w/2},${neckY+2} ${50 - w/2},${hipY-8} ${50 - hipW/2},${hipY} 
           L ${50 + hipW/2},${hipY}
           C ${50 + w/2},${hipY-8} ${50 + w/2},${neckY+2} 50,${neckY} Z`}
        fill="#E63946"
        stroke="#000000"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Blue Muscular Sides */}
      <path
        d={`M ${50 - w/2 + 2},${neckY+5} C ${50 - w/2 + 2},${neckY+14} ${50 - w/3},${hipY} ${50 - hipW/2},${hipY} L ${50 - w/2},${hipY} Z`}
        fill="#1D3557"
        stroke="#000000"
        strokeWidth="1.2"
      />
      <path
        d={`M ${50 + w/2 - 2},${neckY+5} C ${50 + w/2 - 2},${neckY+14} ${50 + w/3},${hipY} ${50 + hipW/2},${hipY} L ${50 + w/2},${hipY} Z`}
        fill="#1D3557"
        stroke="#000000"
        strokeWidth="1.2"
      />
      {/* Blue pelvis block */}
      <path
        d={`M ${50 - hipW/2},${hipY} L ${50 + hipW/2},${hipY} L 54,${hipY+5} L 46,${hipY+5} Z`}
        fill="#1D3557"
        stroke="#000000"
        strokeWidth="1.5"
      />
      
      {/* Spider Emblem */}
      <circle cx="50" cy={neckY + 6} r="1.5" fill="#000000" />
      <line x1="50" y1={neckY + 6} x2="50" y2={neckY + 3} stroke="#000000" strokeWidth="1.2" />
      <path d={`M 50,${neckY+6} Q 45,${neckY+4} 43,${neckY+6}`} stroke="#000000" strokeWidth="0.8" fill="none" />
      <path d={`M 50,${neckY+6} Q 45,${neckY+8} 43,${neckY+10}`} stroke="#000000" strokeWidth="0.8" fill="none" />
      <path d={`M 50,${neckY+6} Q 55,${neckY+4} 57,${neckY+6}`} stroke="#000000" strokeWidth="0.8" fill="none" />
      <path d={`M 50,${neckY+6} Q 55,${neckY+8} 57,${neckY+10}`} stroke="#000000" strokeWidth="0.8" fill="none" />
    </g>
  );
};

// Illustrated Double-Stroke Arm
const SpideyArm = ({ side, type, headY, torsoW }) => {
  const isLeft = side === "left";
  const shX = isLeft ? (50 - torsoW/2 - 2) : (50 + torsoW/2 + 2);
  const shY = headY + 11;

  let pathD = "";
  let showHand = false;
  let handX = 50;
  let handY = 0;

  if (type === "up-straight") {
    pathD = `M ${shX},${shY} L 50,0`;
    showHand = true;
    handX = 50;
    handY = 0;
  } else if (type === "up-bent") {
    const elbowX = isLeft ? 34 : 66;
    const elbowY = 16;
    pathD = `M ${shX},${shY} L ${elbowX},${elbowY} L 50,5`;
    showHand = true;
    handX = 50;
    handY = 5;
  } else if (type === "shoot-forward") {
    const targetX = isLeft ? 15 : 85;
    const targetY = shY + 3;
    pathD = `M ${shX},${shY} Q ${isLeft ? 26 : 74},${shY-4} ${targetX},${targetY}`;
    showHand = true;
    handX = targetX;
    handY = targetY;
  } else if (type === "out-balance") {
    const targetX = isLeft ? 12 : 88;
    const targetY = shY + 15;
    pathD = `M ${shX},${shY} Q ${isLeft ? 24 : 76},${shY-6} ${targetX},${targetY}`;
    showHand = true;
    handX = targetX;
    handY = targetY;
  } else if (type === "hands-ground") {
    const targetX = isLeft ? 26 : 74;
    const targetY = 82;
    pathD = `M ${shX},${shY} L ${isLeft ? 28 : 72},${shY+16} L ${targetX},${targetY}`;
    showHand = true;
    handX = targetX;
    handY = targetY;
  } else if (type === "pointing-right") {
    pathD = `M ${shX},${shY} Q 72,${shY-6} 86,${shY-3}`;
    showHand = true;
    handX = 86;
    handY = shY - 3;
  }

  // Double stroke vector rendering (thick black outline + colored core)
  if (pathD) {
    return (
      <g>
        <path d={pathD} stroke="#000000" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={pathD} stroke="#E63946" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {showHand && (
          <>
            <circle cx={handX} cy={handY} r="4" fill="#000000" />
            <circle cx={handX} cy={handY} r="2.2" fill="#E63946" />
          </>
        )}
        {type === "shoot-forward" && (
          <>
            {/* Shoot web line */}
            <line x1={handX} y1={handY} x2={isLeft ? -45 : 145} y2={handY - 14} stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
            <line x1={handX} y1={handY} x2={isLeft ? -45 : 145} y2={handY - 14} stroke="#000000" strokeWidth="0.8" />
          </>
        )}
        {type === "pointing-right" && (
          <line x1="89" y1={shY-3} x2="98" y2={shY-3} stroke="#E63946" strokeWidth="2.2" strokeDasharray="2 2" />
        )}
      </g>
    );
  }

  // Default: Left arm (holding laptop) or Right arm (resting on hip)
  if (isLeft) {
    const laptopArmD = `M ${shX},${shY} C 30,${shY+2} 24,${shY+10} 24,${shY+18}`;
    return (
      <g>
        <path d={laptopArmD} stroke="#000000" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d={laptopArmD} stroke="#1D3557" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Laptop */}
        <rect x="14" y="58" width="12" height="8" rx="0.5" fill="#000000" stroke="#000000" strokeWidth="1.5" />
        <polygon points="12,66 28,66 30,71 10,71" fill="#1D3557" stroke="#000000" strokeWidth="1.5" />
        <rect x="17" y="60" width="6" height="4" fill="#ffffff" />
      </g>
    );
  } else {
    const hipArmD = `M ${shX},${shY} C 70,${shY+2} 74,${shY+10} 74,${shY+18}`;
    return (
      <g>
        <path d={hipArmD} stroke="#000000" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d={hipArmD} stroke="#1D3557" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="74" cy={shY+18} r="3" fill="#E63946" stroke="#000000" strokeWidth="1.5" />
      </g>
    );
  }
};

// Illustrated Double-Stroke Leg
const SpideyLeg = ({ side, type, torsoY, torsoH, torsoW }) => {
  const isLeft = side === "left";
  const hipX = isLeft ? 45 : 55;
  const hipY = torsoY + torsoH;

  let pathD = "";
  let bootPathD = "";

  if (type === "tucked") {
    const kneeX = isLeft ? 28 : 72;
    const kneeY = hipY + 6;
    const footX = isLeft ? 38 : 62;
    const footY = hipY - 2;
    pathD = `M ${hipX},${hipY} L ${kneeX},${kneeY} L ${footX},${footY}`;
    bootPathD = `M ${kneeX},${kneeY} L ${footX},${footY}`;
  } else if (type === "straight-back") {
    const footX = isLeft ? 22 : 78;
    const footY = hipY + 30;
    pathD = `M ${hipX},${hipY} L ${footX},${footY}`;
    bootPathD = `M ${hipX + (footX - hipX)*0.55},${hipY + (footY - hipY)*0.55} L ${footX},${footY}`;
  } else if (type === "crunched") {
    const kneeX = isLeft ? 26 : 74;
    const kneeY = hipY + 14;
    const footX = isLeft ? 38 : 62;
    const footY = hipY + 22;
    pathD = `M ${hipX},${hipY} L ${kneeX},${kneeY} L ${footX},${footY}`;
    bootPathD = `M ${kneeX},${kneeY} L ${footX},${footY}`;
  } else if (type === "split-forward" || type === "split-backward") {
    const isForward = (type === "split-forward");
    const footX = isLeft ? (isForward ? 20 : 38) : (isForward ? 80 : 62);
    const footY = hipY + 28;
    pathD = `M ${hipX},${hipY} L ${footX},${footY}`;
    bootPathD = `M ${hipX + (footX - hipX)*0.5},${hipY + (footY - hipY)*0.5} L ${footX},${footY}`;
  } else if (type === "squat-left" || type === "squat-right") {
    const kneeX = isLeft ? 18 : 82;
    const kneeY = 80;
    const footX = isLeft ? 22 : 78;
    const footY = 82;
    pathD = `M ${hipX},${hipY} L ${kneeX},${kneeY} L ${footX},${footY}`;
    bootPathD = `M ${kneeX},${kneeY} L ${footX},${footY}`;
  }

  // Render leg paths with outline
  if (pathD) {
    return (
      <g>
        <path d={pathD} stroke="#000000" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={pathD} stroke="#1D3557" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {bootPathD && (
          <path d={bootPathD} stroke="#E63946" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        )}
      </g>
    );
  }

  // Default: stand-left / stand-right
  const kneeX = isLeft ? 41 : 59;
  const kneeY = hipY + 16;
  const footX = isLeft ? 36 : 64;
  const footY = 90;
  const standD = `M ${hipX},${hipY} L ${kneeX},${kneeY} L ${footX},${footY}`;
  const bootD = `M ${kneeX},${kneeY} L ${footX},${footY}`;

  return (
    <g>
      <path d={standD} stroke="#000000" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={standD} stroke="#1D3557" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={bootD} stroke="#E63946" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
};

// Dynamic skeletal config
function getSpideyConfig(pose, frameIndex) {
  if (pose === "swinging") {
    const swingFrames = [
      // Frame 0: Launch
      {
        headY: 15, headRot: -15, eyeType: "focused",
        torsoY: 23, torsoH: 26, torsoW: 16,
        armLeft: "up-straight", armRight: "shoot-forward",
        legLeft: "tucked", legRight: "tucked"
      },
      // Frame 1: Max Speed stretch
      {
        headY: 17, headRot: 0, eyeType: "wide",
        torsoY: 25, torsoH: 30, torsoW: 15,
        armLeft: "up-straight", armRight: "up-straight",
        legLeft: "straight-back", legRight: "straight-back"
      },
      // Frame 2: Pull-up rising
      {
        headY: 12, headRot: 12, eyeType: "focused",
        torsoY: 21, torsoH: 22, torsoW: 18,
        armLeft: "up-bent", armRight: "up-bent",
        legLeft: "crunched", legRight: "crunched"
      },
      // Frame 3: Apex heroic split
      {
        headY: 14, headRot: -20, eyeType: "wide",
        torsoY: 23, torsoH: 26, torsoW: 16,
        armLeft: "up-straight", armRight: "out-balance",
        legLeft: "split-forward", legRight: "split-backward"
      }
    ];
    return swingFrames[frameIndex % 4];
  } else if (pose === "landing") {
    const landingFrames = [
      // Frame 0: Ground crouch (three point landing)
      {
        headY: 30, headRot: 0, eyeType: "squint",
        torsoY: 36, torsoH: 16, torsoW: 20,
        armLeft: "hands-ground", armRight: "hands-ground",
        legLeft: "squat-left", legRight: "squat-right"
      },
      // Frame 1: Alert ready stance
      {
        headY: 16, headRot: 5, eyeType: "focused",
        torsoY: 24, torsoH: 26, torsoW: 16,
        armLeft: "idle-left", armRight: "idle-right",
        legLeft: "stand-left", legRight: "stand-right"
      }
    ];
    return landingFrames[frameIndex % 2];
  } else if (pose === "pointing") {
    return {
      headY: 13, headRot: 4, eyeType: "focused",
      torsoY: 22, torsoH: 26, torsoW: 16,
      armLeft: "idle-left", armRight: "pointing-right",
      legLeft: "stand-left", legRight: "stand-right"
    };
  } else {
    // Idle Stance (4 frames breathing)
    const breathingOffset = [0, 1.2, 2.5, 1.2][frameIndex % 4];
    const breathingScale = [1.0, 1.02, 1.04, 1.02][frameIndex % 4];
    return {
      headY: 13 + breathingOffset * 0.4, headRot: 0, eyeType: "normal",
      torsoY: 22 + breathingOffset * 0.2, torsoH: 26 * breathingScale, torsoW: 16,
      armLeft: "idle-left", armRight: "idle-right",
      legLeft: "stand-left", legRight: "stand-right"
    };
  }
}

const SpideySprite = ({ pose, frameIndex, bodyAngle }) => {
  const config = getSpideyConfig(pose, frameIndex);
  const { headY, headRot, eyeType, torsoY, torsoH, torsoW, armLeft, armRight, legLeft, legRight } = config;

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-32 h-32 overflow-visible drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-all duration-100"
      style={{
        transform: `rotate(${bodyAngle}deg)`,
        transformOrigin: "50% 11%", // Shoulder line rotation
      }}
    >
      {/* Left arm behind torso (idle / standing / pointing) */}
      {armLeft !== "up-straight" && armLeft !== "up-bent" && (
        <SpideyArm side="left" type={armLeft} headY={headY} torsoW={torsoW} />
      )}

      {/* Left Leg */}
      <SpideyLeg side="left" type={legLeft} torsoY={torsoY} torsoH={torsoH} torsoW={torsoW} />

      {/* Right Leg */}
      <SpideyLeg side="right" type={legRight} torsoY={torsoY} torsoH={torsoH} torsoW={torsoW} />

      {/* Torso */}
      <SpideyTorso y={torsoY} h={torsoH} w={torsoW} headY={headY} />

      {/* Left arm in front if holding web */}
      {(armLeft === "up-straight" || armLeft === "up-bent") && (
        <SpideyArm side="left" type={armLeft} headY={headY} torsoW={torsoW} />
      )}

      {/* Right Arm */}
      <SpideyArm side="right" type={armRight} headY={headY} torsoW={torsoW} />

      {/* Head drawn on top */}
      <SpideyHead y={headY} rot={headRot} eyeType={eyeType} />
    </svg>
  );
};

// -------------------------------------------------------------
// MAIN SYSTEM SYSTEM COMPONENT
// -------------------------------------------------------------

export default function WebHero({ activeSection, isSwinging }) {
  const [pose, setPose] = useState("idle");
  const [frame, setFrame] = useState(0);
  const [customQuote, setCustomQuote] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  // Layout swing angles
  const [currentAngle, setCurrentAngle] = useState(0);
  const [currentBodyAngle, setCurrentBodyAngle] = useState(0);

  // Velocity-driven squash/stretch states
  const [scaleX, setScaleX] = useState(1.0);
  const [scaleY, setScaleY] = useState(1.0);

  // Physics simulation refs
  const ropeAngle = useRef(0);
  const prevRopeAngle = useRef(0);
  const ropeVelocity = useRef(0);
  const prevRopeVelocity = useRef(0);
  const bodyAngle = useRef(0);
  const bodyVelocity = useRef(0);

  const lastTime = useRef(Date.now());
  const frameTimer = useRef(0);

  // Sync prop refs
  const isSwingingRef = useRef(isSwinging);
  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    isSwingingRef.current = isSwinging;
    activeSectionRef.current = activeSection;
  }, [isSwinging, activeSection]);

  const spideyQuotes = [
    "Spring Boot is my web-shooter! 🕸️",
    "Bugs? Caught in mid-air! 🕷️",
    "Query load? I swing past it! 🚀",
    "Need a backend hero? PING ME!",
    "No radioactive servers were harmed. 🧪",
    "Deploying at terminal velocity! ⚡"
  ];

  const handleSpideyClick = (e) => {
    if (isSpinning) return;
    setIsSpinning(true);
    // Custom spin quote
    const randomIdx = Math.floor(Math.random() * spideyQuotes.length);
    setCustomQuote(spideyQuotes[randomIdx]);

    // Apply spin force to body angle physics
    bodyVelocity.current = 720; 

    // Dispatch global events for camera shake and cursor splat
    window.dispatchEvent(new CustomEvent("spidey-shake"));
    window.dispatchEvent(new CustomEvent("spidey-shoot-splat", {
      detail: { x: e.clientX || window.innerWidth - 100, y: (e.clientY + window.scrollY) || 450 }
    }));

    setTimeout(() => {
      setIsSpinning(false);
    }, 1200);
  };

  useEffect(() => {
    setCustomQuote("");
  }, [activeSection]);

  useEffect(() => {
    let animId;

    const updatePhysics = () => {
      const now = Date.now();
      let dt = (now - lastTime.current) / 1000;
      if (dt > 0.08) dt = 0.08;
      lastTime.current = now;

      // 1. ROPE MOTION
      if (isSwingingRef.current) {
        prevRopeAngle.current = ropeAngle.current;
        ropeAngle.current = Math.sin(now / 170) * 45; 

        prevRopeVelocity.current = ropeVelocity.current;
        ropeVelocity.current = (ropeAngle.current - prevRopeAngle.current) / dt;
        setPose("swinging");
      } else {
        // Natural pendulum decay
        const g = 280; 
        const L = 3.5; 
        const ropeRad = ropeAngle.current * Math.PI / 180;
        const ropeAccel = -(g / L) * Math.sin(ropeRad);
        
        ropeVelocity.current += ropeAccel * dt;
        ropeVelocity.current *= 0.94; 
        ropeAngle.current += ropeVelocity.current * dt;

        // Reset to center
        if (Math.abs(ropeAngle.current) < 1.2 && Math.abs(ropeVelocity.current) < 10) {
          ropeAngle.current = 0;
          ropeVelocity.current = 0;
          
          if (activeSectionRef.current === "projects" || activeSectionRef.current === "contact") {
            setPose("pointing");
          } else {
            setPose("idle");
          }
        } else {
          setPose("landing"); 
        }
      }

      const ropeAccelCurrent = (ropeVelocity.current - prevRopeVelocity.current) / dt;

      // 2. BODY LAG PHYSICS
      const k = 140;
      const c = 7.5;
      const lagFactor = 0.55;

      const bodyAccel = -k * bodyAngle.current - c * bodyVelocity.current - lagFactor * ropeAccelCurrent;
      bodyVelocity.current += bodyAccel * dt;
      bodyAngle.current += bodyVelocity.current * dt;

      // 3. SQUASH AND STRETCH CALCS
      const velocityMagnitude = Math.abs(ropeVelocity.current);
      let targetScaleX = 1.0;
      let targetScaleY = 1.0;
      if (isSwingingRef.current) {
        // Stretch long at maximum velocity, squeeze narrow
        targetScaleY = 1.0 + (velocityMagnitude * 0.00045);
        targetScaleX = 1.0 - (velocityMagnitude * 0.00022);
      } else if (pose === "landing") {
        // Squash on deceleration/landing
        targetScaleY = 0.82;
        targetScaleX = 1.18;
      }

      setScaleX(targetScaleX);
      setScaleY(targetScaleY);

      // Sync state angles for UI
      setCurrentAngle(ropeAngle.current);
      setCurrentBodyAngle(bodyAngle.current);

      // 4. FRAME TIMER
      frameTimer.current += dt * 1000;
      const msPerFrame = isSwingingRef.current ? 100 : 250;
      if (frameTimer.current >= msPerFrame) {
        setFrame((prev) => prev + 1);
        frameTimer.current = 0;
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [pose]);

  return (
    <div className="fixed top-0 right-0 h-screen w-[320px] pointer-events-none z-40 hidden md:block">
      {/* Pivot Node: Visible Web-Splat Bracket Anchor */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "120px",
          width: "4px",
          height: "4px",
        }}
      >
        {/* SVG Web splat visual anchor at pivot */}
        <svg 
          className="absolute -translate-x-1/2 -translate-y-1/2 overflow-visible text-slate-300 dark:text-slate-500"
          style={{ width: "60px", height: "60px", top: 0, left: 0 }}
        >
          <path 
            d="M 30,30 L 10,10 M 30,30 L 50,10 M 30,30 L 50,50 M 30,30 L 10,50 M 30,30 L 30,5 M 30,30 L 30,55 M 30,30 L 5,30 M 30,30 L 55,30" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            opacity="0.8"
          />
          <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5" strokeDasharray="3 3" />
          <circle cx="30" cy="30" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
          <circle cx="30" cy="30" r="4.5" fill="currentColor" />
        </svg>

        {/* Rope Container */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top center",
            transform: `rotate(${currentAngle}deg)`,
            width: "120px",
            height: "420px", 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Web Path Bending */}
          <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none text-slate-300 dark:text-slate-500">
            <path
              d={`M 60,0 Q ${60 - currentBodyAngle * 0.7},210 60,420`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              opacity="0.85"
            />
          </svg>

          {/* Spidey Character body (with dynamic squash and stretch scaling) */}
          <div
            onClick={handleSpideyClick}
            style={{
              transform: `scale(${scaleX}, ${scaleY})`,
              transformOrigin: "center top",
              transition: "transform 0.05s linear",
            }}
            className="absolute bottom-0 left-[50%] -translate-x-[50%] w-32 h-32 flex items-center justify-center cursor-pointer pointer-events-auto select-none group"
            title="Click Spidey to shake the city!"
          >
            <SpideySprite pose={pose} frameIndex={frame} bodyAngle={currentBodyAngle} />

            {/* Bubble Quotes */}
            {(pose === "idle" || pose === "pointing") && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 border-3 border-black bg-white text-black text-[9px] font-black px-2.5 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider whitespace-nowrap z-30">
                {customQuote ? customQuote : (
                  <>
                    {activeSection === "home" && "Bugs? Caught! 🕸️"}
                    {activeSection === "about" && "Check stats below! 👇"}
                    {activeSection === "skills" && "Active Power Grid! 📡"}
                    {activeSection === "projects" && "Missions Survived! 🎖️"}
                    {activeSection === "achievements" && "Wall of Wins! 🏆"}
                    {activeSection === "stats" && "Reality Check! 🖥️"}
                    {activeSection === "contact" && "Signal active! 📡"}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
