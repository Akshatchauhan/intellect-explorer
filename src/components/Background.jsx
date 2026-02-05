import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Background = () => {
  const location = useLocation();
  const path = location.pathname;
  const isHome = path === '/';

  // --- OPTIMIZATION: Config Object ---
  const lighthouseConfig = useMemo(() => {
    // 1. Portfolio: Focused diagonal beam
    if (path.includes('/portfolio')) return { x: '-45%', rotate: -30, opacity: 0.9, scaleX: 1.2 };
    
    // 2. Journal: Opposing diagonal beam
    if (path.includes('/journal'))   return { x: '45%', rotate: 30, opacity: 0.9, scaleX: 1.2 };
    
    // 3. Contact: "The Void" / Ambient Frequency
    // Changed from a spotlight (scale 0.6) to a wide, faint wash (scale 2.5, opacity 0.2)
    if (path.includes('/contact'))   return { x: '0%', rotate: 0, opacity: 0.2, scaleX: 2.5 };
    
    // Default / Fallback
    return { x: '0%', rotate: -15, opacity: 0, scaleX: 1 };
  }, [path]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-zinc-900 overflow-hidden transition-colors duration-1000">
      
      {/* 1. DITHER LAYER */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay z-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. THE BEAM SYSTEM */}
      <AnimatePresence mode="wait">
        
        {/* === A. HOME: THE CATHEDRAL === */}
        {isHome && (
          <motion.div
            key="cathedral"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
              {/* Beam 1: Main Shaft */}
              <motion.div 
                animate={{ 
                  opacity: [0.6, 0.9, 0.6], 
                  x: [-20, 20, -20],
                  rotate: [-30, -25, -30]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-50%] left-[10%] w-[500px] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[50px] transform -rotate-[30deg] will-change-transform" 
              />

              {/* Beam 2: Secondary Shaft */}
              <motion.div 
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  x: [0, -40, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[-50%] right-[20%] w-[350px] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[70px] transform -rotate-[40deg] will-change-transform" 
              />
          </motion.div>
        )}

        {/* === B. OTHERS: THE LIGHTHOUSE === */}
        {!isHome && (
          <motion.div
            key="lighthouse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <motion.div 
              initial={false}
              animate={lighthouseConfig}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-[-50%] left-[-50%] right-[-50%] h-[200%] w-[200%] mx-auto origin-top will-change-transform"
            >
              <div 
                className="w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent blur-[80px]" 
                style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }} 
              />
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* 3. REFLECTIVE FLOOR */}
      <div className="absolute bottom-[-10%] left-0 right-0 h-[60vh] bg-gradient-to-t from-zinc-800/80 to-transparent blur-[80px] opacity-80" />

      {/* 4. VIGNETTE */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/10 to-zinc-950 opacity-50 z-30" />

    </div>
  );
};

export default Background;