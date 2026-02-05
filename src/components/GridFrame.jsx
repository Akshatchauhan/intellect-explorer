import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const GridFrame = () => {
  // 1. SCROLL PHYSICS
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none hidden md:block">
      
      {/* --- THE FRAME LINES (The "Walls") --- */}
      {/* Left Line */}
      <div className="absolute top-0 bottom-0 left-24 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      {/* Right Line */}
      <div className="absolute top-0 bottom-0 right-24 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />


      {/* --- LEFT ZONE: HERITAGE DATA --- */}
      <div className="absolute top-0 bottom-0 left-0 w-24 flex flex-col justify-between py-12 items-center text-[9px] font-mono text-zinc-700 tracking-[0.2em] select-none">
        
        {/* Top: Coordinates */}
        <div className="flex flex-col gap-2 items-center opacity-60">
           <span>28.61°N</span>
           <span>77.20°E</span>
        </div>

        {/* Center: Location Only */}
        {/* Removed "EST. 2003" and the "bg-black" blocks that looked weird. */}
        <div className="flex flex-col items-center justify-center h-full">
           <span className="-rotate-90 block whitespace-nowrap text-zinc-600 opacity-80">
             DELHI, IN
           </span>
        </div>

        {/* Bottom: System ID */}
        <span className="opacity-40">SYS.2.0</span>
      </div>


      {/* --- RIGHT ZONE: NAVIGATION DATA --- */}
      <div className="absolute top-0 bottom-0 right-0 w-24 flex flex-col justify-between py-12 items-center text-[9px] font-mono text-zinc-700 tracking-[0.2em] select-none">
        
        {/* Top: Mode */}
        <span className="opacity-60">VIEWPORT</span>

        {/* Center: Scroll Bar */}
        <div className="h-32 w-[1px] bg-zinc-900 relative">
          {/* The Active Bar (Fills as you scroll) */}
          <motion.div 
            style={{ scaleY }} 
            className="absolute top-0 left-0 right-0 w-full bg-zinc-500 origin-top"
          />
        </div>

        {/* Bottom: REMOVED "SCROLL" TEXT */}
        {/* It is now empty to avoid overlapping the Mute Icon */}
        <div className="opacity-0">SCROLL</div>
      </div>

    </div>
  );
};

export default GridFrame;