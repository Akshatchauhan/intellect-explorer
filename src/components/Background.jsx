import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Jewel tone palette — saturated but very dark, like silk in dim light
const SAPPHIRE = 'rgba(18, 42, 128, 0.90)';   // midnight blue
const GARNET   = 'rgba(128, 16, 42, 0.85)';   // deep burgundy-red
const GOLD     = 'rgba(138, 92, 14, 0.80)';   // dark amber
const VIOLET   = 'rgba(78, 18, 118, 0.80)';   // deep purple

const fadeProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 1.5 },
};

// A single jewel-toned orb
const Orb = ({ color, style, animate: anim, transition, blur = 80 }) => (
  <motion.div
    className="absolute rounded-full will-change-transform"
    style={{
      background: `radial-gradient(ellipse, ${color} 0%, transparent 68%)`,
      filter: `blur(${blur}px)`,
      ...style,
    }}
    animate={anim}
    transition={transition}
  />
);

const Background = () => {
  const { pathname: path } = useLocation();
  // Halve blur on mobile — blur(80px) on a ~270px orb spreads colour too
  // thin to see. Also used to gate the iOS Safari GPU-layer fix below.
  const blur = window.innerWidth < 768 ? 40 : 80;

  return (
    // translateZ(0) forces a GPU compositing layer — without it iOS Safari
    // silently drops filter:blur() on children of fixed elements.
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      style={{ backgroundColor: '#08070e', transform: 'translateZ(0)' }}
    >

      {/* GRAIN — gives the field micro-texture, like fabric weave */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay z-40"
        style={{ backgroundImage: GRAIN }}
      />

      <AnimatePresence mode="wait">

        {/* HOME: all four tones, balanced — like light catching silk at rest */}
        {path === '/' && (
          <motion.div key="home" {...fadeProps} className="absolute inset-0">
            <Orb blur={blur} color={SAPPHIRE}
              style={{ width: '72vw', height: '72vw', top: '-25%', left: '-15%' }}
              animate={{ x: [-25, 20, -25], y: [-15, 20, -15] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Orb blur={blur} color={GARNET}
              style={{ width: '65vw', height: '65vw', bottom: '-25%', right: '-15%' }}
              animate={{ x: [20, -25, 20], y: [15, -20, 15] }}
              transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            />
            <Orb blur={blur} color={GOLD}
              style={{ width: '55vw', height: '55vw', top: '20%', right: '-10%' }}
              animate={{ x: [10, -20, 10], y: [-10, 15, -10] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
            />
            <Orb blur={blur} color={VIOLET}
              style={{ width: '50vw', height: '50vw', bottom: '-10%', left: '10%' }}
              animate={{ x: [-15, 15, -15], y: [10, -15, 10] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
          </motion.div>
        )}

        {/* PORTFOLIO: sapphire-dominant — intellectual, deep water */}
        {path.includes('/portfolio') && (
          <motion.div key="portfolio" {...fadeProps} className="absolute inset-0">
            <Orb blur={blur} color={SAPPHIRE}
              style={{ width: '85vw', height: '85vw', top: '-30%', left: '-20%' }}
              animate={{ x: [-20, 18, -20], y: [-10, 18, -10] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Orb blur={blur} color={VIOLET}
              style={{ width: '60vw', height: '60vw', bottom: '-20%', right: '-10%' }}
              animate={{ x: [12, -18, 12], y: [8, -14, 8] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
            <Orb blur={blur} color={GARNET}
              style={{ width: '40vw', height: '40vw', top: '30%', right: '5%', opacity: 0.4 }}
              animate={{ x: [-8, 12, -8] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />
          </motion.div>
        )}

        {/* JOURNAL: garnet-dominant — personal, like dark velvet or wine */}
        {path.includes('/journal') && (
          <motion.div key="journal" {...fadeProps} className="absolute inset-0">
            <Orb blur={blur} color={GARNET}
              style={{ width: '80vw', height: '80vw', top: '-25%', right: '-20%' }}
              animate={{ x: [18, -20, 18], y: [-10, 18, -10] }}
              transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Orb blur={blur} color={GOLD}
              style={{ width: '58vw', height: '58vw', bottom: '-20%', left: '-10%' }}
              animate={{ x: [-14, 16, -14], y: [8, -12, 8] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            />
            <Orb blur={blur} color={VIOLET}
              style={{ width: '42vw', height: '42vw', top: '25%', left: '5%', opacity: 0.45 }}
              animate={{ y: [-8, 12, -8] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            />
          </motion.div>
        )}

        {/* CONTACT: gold-dominant — warm, the light at the end of the hall */}
        {path.includes('/contact') && (
          <motion.div key="contact" {...fadeProps} className="absolute inset-0">
            <Orb blur={blur} color={GOLD}
              style={{ width: '78vw', height: '78vw', top: '-20%', left: '10%' }}
              animate={{ x: [-15, 15, -15], y: [-10, 14, -10] }}
              transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Orb blur={blur} color={GARNET}
              style={{ width: '55vw', height: '55vw', bottom: '-20%', right: '-5%' }}
              animate={{ x: [10, -15, 10], y: [8, -12, 8] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />
            <Orb blur={blur} color={SAPPHIRE}
              style={{ width: '40vw', height: '40vw', bottom: '10%', left: '-5%', opacity: 0.40 }}
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/20 to-zinc-950 opacity-70 z-30 pointer-events-none" />

    </div>
  );
};

export default Background;
