import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = () => {
  const location = useLocation();
  const showLogo = location.pathname !== '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset on page change
  useEffect(() => {
    setScrolled(false);
  }, [location.pathname]);

  return (
    <div className="fixed top-8 left-6 md:left-8 z-50">
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <div className="relative cursor-pointer group px-2 py-1 rounded-sm backdrop-blur-md bg-black/20 overflow-hidden">

                {/* FULL TEXT — visible at top */}
                <AnimatePresence mode="wait">
                  {!scrolled ? (
                    <motion.div
                      key="wordmark"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex flex-col"
                    >
                      <span className="font-serif italic text-xl md:text-2xl text-white leading-none group-hover:text-zinc-300 transition-colors duration-300">
                        Intellect
                      </span>
                      <span className="font-serif text-base md:text-lg text-zinc-400 leading-none group-hover:text-white transition-colors duration-300">
                        Explorer.
                      </span>
                    </motion.div>
                  ) : (

                    /* IE MARK — visible on scroll */
                    <motion.div
                      key="mark"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex items-baseline"
                    >
                      <span className="font-serif italic text-2xl md:text-3xl text-white leading-none group-hover:text-zinc-300 transition-colors duration-300">I</span>
                      <span className="font-serif text-xl md:text-2xl text-zinc-400 leading-none group-hover:text-white transition-colors duration-300">E</span>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Logo;
