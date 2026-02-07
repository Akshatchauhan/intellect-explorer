import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Background = () => {
  const location = useLocation();
  const path = location.pathname;
  const isHome = path === '/';
  
  // SUPER WIDE MODE: 
  // We expand the container to 200% of the screen for non-home pages.
  // This pushes the edges of the gradient WAY off-screen.
  const isWide = path.includes('/portfolio') || path.includes('/journal') || path.includes('/contact');

  // --- CONFIG: THE ATMOSPHERE ---
  const beamConfig = useMemo(() => {
    // 1. Portfolio: "The Left Pillar"
    if (path.includes('/portfolio')) return { 
        x: '-10%', // Closer to center since container is huge
        rotate: -20, 
        opacity: 0.75, 
        scaleX: 4 // MASSIVE scale (was 2.5) - Soft, infinite edges
    };
    
    // 2. Journal: "The Right Pillar"
    if (path.includes('/journal'))   return { 
        x: '10%', 
        rotate: 20, 
        opacity: 0.75, 
        scaleX: 4 
    };
    
    // 3. Contact: "The Void"
    if (path.includes('/contact'))   return { 
        x: '0%', 
        rotate: 0, 
        opacity: 0.4, 
        scaleX: 5 // Enormous ambient wash
    };
    
    // Default
    return { x: '0%', rotate: 0, opacity: 0, scaleX: 1 };
  }, [path]);

  return (
    <div 
      className={`fixed pointer-events-none z-[-1] bg-zinc-900 overflow-hidden transition-colors duration-1000 
      ${isWide ? '-inset-[50%] w-[200%] h-[200%]' : 'inset-0 w-full h-full'}`}
    >
      
      {/* 1. GRAIN (Texture) */}
      <div 
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay z-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 2. THE LIGHT SYSTEM */}
      <AnimatePresence mode="wait">
        
        {/* === A. HOME: THE CATHEDRAL (Standard View) === */}
        {isHome ? (
          <motion.div
            key="cathedral"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
              <motion.div 
                animate={{ 
                  opacity: [0.6, 0.9, 0.6], 
                  x: [-20, 20, -20],
                  rotate: [-30, -25, -30]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-50%] left-[10%] w-[500px] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-[50px] transform -rotate-[30deg] will-change-transform" 
              />

              <motion.div 
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  x: [0, -40, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[-50%] right-[20%] w-[350px] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-[70px] transform -rotate-[40deg] will-change-transform" 
              />
          </motion.div>
        ) : (
          
        /* === B. OTHERS: THE INFINITE VIGIL === */
          <motion.div
            key="vigil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex justify-center items-center"
          >
            {/* The Beam Itself - Scaled up massively by beamConfig */}
            <motion.div 
              initial={false}
              animate={beamConfig}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute top-[-50%] h-[200%] w-[100%] will-change-transform"
            >
              <div 
                className="w-full h-full bg-gradient-to-b from-transparent via-white/15 to-transparent blur-[150px]" // Increased Blur
                style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }} 
              />
            </motion.div>

            {/* Background Ambience Pulse */}
            <motion.div 
               animate={{ opacity: [0.4, 0.6, 0.4] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent blur-3xl"
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* 3. REFLECTIVE FLOOR */}
      <div className="absolute bottom-[-10%] left-0 right-0 h-[60vh] bg-gradient-to-t from-zinc-800/80 to-transparent blur-[80px] opacity-80" />

      {/* 4. VIGNETTE */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-zinc-950/20 to-zinc-950 opacity-60 z-30 pointer-events-none" />

      {/* 5. GLOBAL BLUR LAYER */}
      <div className="absolute inset-0 backdrop-blur-[2px] z-50 pointer-events-none" />

    </div>
  );
};

export default Background;