import React, { useState, useEffect, useRef, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS — defined outside so they are never recreated ---
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);
const IconArchive = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M21 8H3" /><path d="M21 12H3" /><path d="M21 16H3" />
    <rect x="3" y="4" width="18" height="16" rx="2" />
  </svg>
);
const IconManifesto = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);
const IconUplink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
  </svg>
);

// Static data — defined outside so they are never recreated on render
const LINKS = [
  { path: '/',          label: 'Home',      Icon: IconHome },
  { path: '/portfolio', label: 'Archive',   Icon: IconArchive },
  { path: '/journal',   label: 'Manifesto', Icon: IconManifesto },
  { path: '/contact',   label: 'Uplink',    Icon: IconUplink },
];

const MAIN_ROUTES = ['/', '/portfolio', '/journal', '/contact'];

const dockVariants = {
  hidden: {
    y: 150,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 20, mass: 1.2 },
  },
};

const Navbar = memo(() => {
  const location = useLocation();
  const [isHovered,    setIsHovered]    = useState(false);
  const [isMobile,     setIsMobile]     = useState(false);
  const [resumeOpen,   setResumeOpen]   = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => setResumeOpen(e.detail);
    window.addEventListener('resume-modal', handler);
    return () => window.removeEventListener('resume-modal', handler);
  }, []);

  const isVisible = MAIN_ROUTES.includes(location.pathname);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startSleepTimer = () => {
    if (isMobile) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsHovered(false), 800);
  };

  const clearSleepTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseEnter = () => { if (!isMobile) { clearSleepTimer(); setIsHovered(true); } };
  const handleMouseLeave = () => { if (!isMobile) startSleepTimer(); };
  const handleMobileTap  = () => { if (isMobile) clearSleepTimer(); };

  const showLabels = !isMobile && isHovered;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={dockVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed bottom-8 inset-x-0 mx-auto z-50 flex justify-center w-full px-4 pointer-events-none will-change-transform"
        >
          <motion.nav
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleMobileTap}
            initial={{ borderRadius: 32, width: 'auto' }}
            animate={{
              width: 'auto',
              gap: showLabels ? 8 : (isMobile ? 6 : 0),
              padding: 8,
              backgroundColor: resumeOpen ? 'rgba(9,9,11,0.92)' : 'rgba(24,24,27,0.20)',
              borderColor: resumeOpen ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="pointer-events-auto relative flex items-center backdrop-blur-xl border overflow-hidden cursor-pointer"
            style={{ boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 8px 32px 0 rgba(0,0,0,0.5)' }}
          >
            {LINKS.map(({ path, label, Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link key={path} to={path}>
                  <div
                    className={`relative flex items-center justify-center rounded-full transition-colors duration-500 ${
                      isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                    style={{ height: 44 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        layout="position"
                        initial={false}
                        className="absolute inset-0 rounded-full z-0 overflow-hidden bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-md"
                        style={{
                          boxShadow: `
                            inset 0 1px 0 0 rgba(255,255,255,0.7),
                            inset 0 -1px 0 0 rgba(255,255,255,0.3),
                            inset 0 0 12px 0 rgba(255,255,255,0.15)
                          `
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className={`relative z-10 flex items-center justify-center h-full px-5 ${
                      isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''
                    }`}>
                      <span className="flex items-center justify-center"><Icon /></span>
                      <AnimatePresence>
                        {showLabels && (
                          <motion.span
                            initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                            animate={{ opacity: 1, width: 'auto', marginLeft: 8 }}
                            exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="font-mono text-xs tracking-widest whitespace-nowrap overflow-hidden"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Link>
              );
            })}

          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Navbar;
