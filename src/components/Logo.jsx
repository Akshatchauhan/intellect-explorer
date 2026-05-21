import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects, getPosts } from '../utils/content';

const PAGE_TITLES = {
  '/portfolio': 'the Archive.',
  '/journal':   'the Manifesto.',
  '/contact':   'the Uplink.',
};

const Logo = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isListingPage = ['/portfolio', '/journal', '/contact'].includes(location.pathname);
  const showLogo = location.pathname !== '/' && !(isListingPage && scrolled);

  const pageTitle = PAGE_TITLES[location.pathname];

  // Look up title for post/project pages
  let contentTitle = null;
  try {
    const projectMatch = location.pathname.match(/^\/portfolio\/(.+)$/);
    const postMatch = location.pathname.match(/^\/journal\/(.+)$/);
    if (projectMatch) {
      const project = getProjects()?.find(p => p.id === projectMatch[1]);
      contentTitle = project?.title || null;
    } else if (postMatch) {
      const post = getPosts()?.find(p => p.id === postMatch[1]);
      contentTitle = post?.title || null;
    }
  } catch {}

  const label = contentTitle || pageTitle;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <div className={`relative cursor-pointer group px-2 py-1 rounded-sm overflow-hidden transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/20' : ''}`}>
                <AnimatePresence mode="wait">
                  {!scrolled ? (

                    /* FULL WORDMARK — at top */
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

                    /* IE + LABEL — on scroll */
                    <motion.div
                      key="mark"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="flex flex-col"
                    >
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif italic text-2xl md:text-3xl text-white leading-none group-hover:text-zinc-300 transition-colors duration-300">I</span>
                        <span className="font-serif text-xl md:text-2xl text-zinc-400 leading-none group-hover:text-white transition-colors duration-300">E</span>
                      </div>
                      {label && (
                        <span className="font-serif italic text-sm text-zinc-400 leading-snug group-hover:text-white transition-colors duration-300 max-w-[200px] md:max-w-[300px] break-words whitespace-normal">
                          {label}
                        </span>
                      )}
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
