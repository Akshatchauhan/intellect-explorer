import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const CustomCursor = ({ activeMode }) => {
  // 1. RAW MOTION VALUES (Instant tracking, no lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const [isHovering, setIsHovering] = useState(false);

  // 2. TRACK MOUSE
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // 3. DEFINE VARIANTS (With encapsulated transitions)
  const variants = {
    default: {
      height: 32,
      width: 32,
      x: "-50%",
      y: "-50%",
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "difference",
      borderRadius: "50%",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    cognitive: {
      height: 60,
      width: 60,
      x: "-50%",
      y: "-50%",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      border: "1px solid rgba(99, 102, 241, 0.5)",
      backdropFilter: "blur(2px)",
      borderRadius: "50%",
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    behavioral: {
      height: 32,
      width: 32,
      // Jitter Animation relative to center
      x: ["-50%", "-54%", "-46%", "-50%"], 
      y: ["-50%", "-52%", "-48%", "-50%"],
      backgroundColor: "transparent",
      border: "2px solid rgba(239, 68, 68, 1)", // Red
      borderRadius: "0%", // Square
      transition: { 
        // Specific transition for the jitter loop
        x: { repeat: Infinity, duration: 0.1, ease: "linear" },
        y: { repeat: Infinity, duration: 0.1, ease: "linear" },
        // Spring for the shape morph
        default: { type: "spring", stiffness: 400, damping: 25 }
      }
    },
    interface: {
      height: 24,
      width: 4,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#34d399", // Emerald
      border: "none",
      borderRadius: 0,
      transition: { type: "spring", stiffness: 500, damping: 30 }
    },
    strategy: {
      height: 80,
      width: 80,
      x: "-50%",
      y: "-50%",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      backgroundColor: "transparent",
      borderRadius: "50%",
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const currentVariant = variants[activeMode] || variants.default;

  // Hover state overrides (Calculated dynamically to preserve transition logic)
  const finalVariant = isHovering ? {
    ...currentVariant,
    scale: 1.5,
    backgroundColor: activeMode === 'strategy' ? "transparent" : "rgba(255, 255, 255, 0.1)",
    mixBlendMode: "normal"
  } : currentVariant;

  return (
    <>
      <style>{`
        body, a, button, .cursor-pointer { cursor: none !important; }
      `}</style>

      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full flex items-center justify-center"
        style={{
          left: cursorX,
          top: cursorY,
        }}
        // We pass the entire variant object, which now contains the specific transition for that mode
        animate={finalVariant}
      >
        {/* INNER DOT (Hidden for Interface/Text mode) */}
        {activeMode !== 'interface' && (
           <div className={`w-1 h-1 rounded-full ${activeMode === 'behavioral' ? 'bg-red-500' : 'bg-white'}`} />
        )}

        {/* STRATEGY SCOPE LINES */}
        {activeMode === 'strategy' && (
          <>
            <div className="absolute top-0 w-[1px] h-[15%] bg-white/80" />
            <div className="absolute bottom-0 w-[1px] h-[15%] bg-white/80" />
            <div className="absolute left-0 h-[1px] w-[15%] bg-white/80" />
            <div className="absolute right-0 h-[1px] w-[15%] bg-white/80" />
          </>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;