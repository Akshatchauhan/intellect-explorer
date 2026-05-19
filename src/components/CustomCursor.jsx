import React, { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { useAudioState } from '../Context/AudioContext';

// Defined outside so they are never recreated on render
const VARIANTS = {
  default: {
    height: 32,
    width: 32,
    x: '-50%',
    y: '-50%',
    backgroundColor: 'transparent',
    border: '1px solid rgba(255,255,255,0.5)',
    mixBlendMode: 'difference',
    borderRadius: '50%',
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
  cognitive: {
    height: 60,
    width: 60,
    x: '-50%',
    y: '-50%',
    backgroundColor: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.5)',
    backdropFilter: 'blur(2px)',
    borderRadius: '50%',
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  behavioral: {
    height: 32,
    width: 32,
    x: ['-50%', '-54%', '-46%', '-50%'],
    y: ['-50%', '-52%', '-48%', '-50%'],
    backgroundColor: 'transparent',
    border: '2px solid rgba(239,68,68,1)',
    borderRadius: '0%',
    transition: {
      x: { repeat: Infinity, duration: 0.1, ease: 'linear' },
      y: { repeat: Infinity, duration: 0.1, ease: 'linear' },
      default: { type: 'spring', stiffness: 400, damping: 25 },
    },
  },
  interface: {
    height: 24,
    width: 4,
    x: '-50%',
    y: '-50%',
    backgroundColor: '#34d399',
    border: 'none',
    borderRadius: 0,
    transition: { type: 'spring', stiffness: 500, damping: 30 },
  },
  strategy: {
    height: 80,
    width: 80,
    x: '-50%',
    y: '-50%',
    border: '1px solid rgba(255,255,255,0.5)',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
};

const CustomCursor = () => {
  const { currentMood: activeMode } = useAudioState();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [isHovering, setIsHovering] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => setResumeOpen(e.detail);
    window.addEventListener('resume-modal', handler);
    return () => window.removeEventListener('resume-modal', handler);
  }, []);

  // Lazy initialiser runs once — prevents cursor flash on load
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  });

  // Only adds the resize listener — initial value already set above
  useEffect(() => {
    const check = () => setIsTouchDevice(
      ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.innerWidth < 768
    );
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const el = e.target;
      setIsHovering(
        el.tagName === 'BUTTON' || el.tagName === 'A' || !!el.closest('.cursor-pointer')
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isTouchDevice, cursorX, cursorY]);

  if (isTouchDevice || resumeOpen) return null;

  const currentVariant = VARIANTS[activeMode] ?? VARIANTS.default;
  const finalVariant = isHovering
    ? {
        ...currentVariant,
        scale: 1.5,
        backgroundColor: activeMode === 'strategy' ? 'transparent' : 'rgba(255,255,255,0.1)',
        mixBlendMode: 'normal',
      }
    : currentVariant;

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button, .cursor-pointer { cursor: none !important; }
        }
        @media (hover: none) and (pointer: coarse) {
          .custom-cursor-container { display: none !important; }
        }
      `}</style>

      <motion.div
        className="custom-cursor-container fixed top-0 left-0 z-[99999] pointer-events-none rounded-full hidden md:flex items-center justify-center will-change-transform"
        style={{ left: cursorX, top: cursorY }}
        animate={finalVariant}
      >
        {activeMode !== 'interface' && (
          <div className={`w-1 h-1 rounded-full ${activeMode === 'behavioral' ? 'bg-red-500' : 'bg-white'}`} />
        )}
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
