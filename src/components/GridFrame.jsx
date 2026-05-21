import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TOTAL_SECTIONS = 4;

const GridFrame = () => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const vh = window.innerHeight;
      const section = Math.min(Math.round(scrollY / vh), TOTAL_SECTIONS - 1);
      setActiveSection(section);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none hidden md:block">

      {/* Frame line — right only */}
      <div className="absolute top-0 bottom-0 right-24 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      {/* Section indicators — right column */}
      <div className="absolute top-0 bottom-0 right-0 w-24 flex flex-col items-center justify-center gap-4">
        {Array.from({ length: TOTAL_SECTIONS }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: i === activeSection ? 28 : 8,
              opacity: i === activeSection ? 0.7 : 0.2,
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-[1px] bg-white rounded-full"
          />
        ))}
      </div>


    </div>
  );
};

export default GridFrame;
