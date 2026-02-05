import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => {
  const location = useLocation();
  
  // We only show this logo if we are NOT on the homepage ("/")
  const showLogo = location.pathname !== '/';

  return (
    // Added md:left-8 for better mobile spacing
    <div className="fixed top-8 left-6 md:left-8 z-50 mix-blend-difference">
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <div className="flex flex-col cursor-pointer group">
                
                {/* LINE 1: "Intellect" (Italic Serif) */}
                <span className="font-serif italic text-xl md:text-2xl text-white leading-none group-hover:text-zinc-300 transition-colors">
                  Intellect
                </span>
                
                {/* LINE 2: "Explorer." (Normal Serif + Period) */}
                <span className="font-serif text-base md:text-lg text-zinc-400 leading-none group-hover:text-white transition-colors">
                  Explorer.
                </span>
                
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Logo;