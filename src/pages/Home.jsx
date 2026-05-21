import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import PageTransition from '../components/PageTransition';
import GridFrame from '../components/GridFrame';
import Quotes from '../components/Quotes';
import { useAudioActions } from '../Context/AudioContext';

const RealityLayer = ({ mode }) => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <AnimatePresence mode="wait">

      {/* COGNITIVE: tunnel vision — full restoration */}
      {mode === 'cognitive' && (
        <motion.div
          key="cognitive"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-black"
        >
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#312e81_0%,_#000000_60%)]"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] md:shadow-[inset_0_0_300px_rgba(0,0,0,1)]" />
          <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
        </motion.div>
      )}

      {/* INTERFACE: CRT toned down — scanlines and grid at half opacity, no dark bg override */}
      {mode === 'interface' && (
        <motion.div
          key="interface"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-10 opacity-[0.12] pointer-events-none"
               style={{ background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))', backgroundSize: '100% 4px, 6px 100%' }}
          />
          <div className="absolute inset-0 opacity-[0.08]"
               style={{ backgroundImage: `linear-gradient(rgba(52,211,153,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.4) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
          />
          <div className="absolute inset-0 bg-emerald-500/5 blur-[120px]" />
        </motion.div>
      )}

    </AnimatePresence>
  </div>
);


const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Home = () => {
  const navigate = useNavigate();
  const { setMood } = useAudioActions();

  const [activeMode, setActiveMode] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    return () => setMood('default');
  }, []);

  const handleModeClick = (mode) => {
    const newMode = activeMode === mode ? null : mode;
    setActiveMode(newMode);
    setMood(newMode || 'default');
  };

  useEffect(() => {
    const el = document.documentElement;
    el.style.scrollSnapType = 'y mandatory';
    el.style.scrollBehavior = 'smooth';
    return () => {
      el.style.scrollSnapType = '';
      el.style.scrollBehavior = '';
    };
  }, []);

  const handleAccess = () => {
    setIsNavigating(true);
    setTimeout(() => navigate('/portfolio'), 2000);
  };


  const getTitleStyle = () => {
    switch (activeMode) {
      case 'cognitive': return "text-indigo-200 transition-all duration-1000";
      case 'interface': return "text-emerald-300/90 transition-all duration-700";
      default: return "text-white transition-all duration-500";
    }
  };

  const getSubtextStyle = () => {
    switch (activeMode) {
      case 'cognitive': return "text-indigo-300/70 italic";
      case 'interface': return "text-emerald-400/70";
      default: return "text-zinc-400";
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Intellect Explorer — Akshat Chauhan</title>
        <meta name="description" content="Designer and systems thinker. Exploring the intersection of behavior, aesthetics, and intentional design." />
        <meta property="og:title" content="Intellect Explorer" />
        <meta property="og:description" content="Designer and systems thinker. Exploring the intersection of behavior, aesthetics, and intentional design." />
        <meta property="og:url" content="https://intellectexplorer.com" />
      </Helmet>

      <GridFrame />
      <RealityLayer mode={activeMode} />

      {/* === SNAP SCROLL CONTAINER === */}
      <div className="relative z-10 w-full">

        {/* --- SECTION 1: HERO --- */}
        <section className="h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-6 snap-center snap-always pb-24 md:pb-0">
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center relative min-h-[500px] justify-center">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-3 select-none"
            >
              <span>Akshat Chauhan</span>
              <span className="text-zinc-800">··</span>
              <span>Experience Architect</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
              className={`font-serif text-7xl md:text-9xl font-medium tracking-tight mb-6 md:mb-8 leading-[0.9] ${getTitleStyle()}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode ?? 'default'}
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-0"
                >
                  <span className={`block h-[1.1em] overflow-visible ${activeMode === 'interface' ? "font-mono" : "font-serif italic"}`}>
                    {activeMode === 'interface' ? "SYSTEM" : "Intellect"}
                  </span>
                  <span className={`block h-[1.1em] overflow-visible ${activeMode === 'interface' ? "font-mono uppercase" : "bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/10"}`}>
                    {activeMode === 'interface' ? "KERNEL" : "Explorer."}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.h1>

            <div className="h-[3.5rem] md:h-[4rem] mb-0 flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeMode ?? 'default'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`text-sm md:text-xl font-light leading-relaxed tracking-wide max-w-lg text-center ${getSubtextStyle()}`}
                >
                  {activeMode === 'cognitive' ? "Decoding the architecture of the human mind." :
                   activeMode === 'interface' ? "Rendering structure from abstract data." :
                   "The subconscious is the interface."}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
              className="font-mono flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-4 select-none"
            >
              <span onClick={() => handleModeClick('cognitive')} className={`cursor-pointer transition-all duration-300 py-2 px-3 hover:text-indigo-300 ${activeMode === 'cognitive' ? 'text-indigo-400 font-bold scale-110' : ''}`}>Mind</span>
              <span className="text-zinc-700">×</span>
              <span onClick={() => handleModeClick('interface')} className={`cursor-pointer transition-all duration-300 py-2 px-3 hover:text-emerald-300 ${activeMode === 'interface' ? 'text-emerald-400 font-mono font-bold scale-110' : ''}`}>Medium</span>
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
                {activeMode ? "SIMULATION ACTIVE" : "SCROLL TO ACCESS"}
              </span>
              <AnimatePresence>
                {!activeMode && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 6, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.4 } }}
                  >
                    <ChevronDown size={14} strokeWidth={1.5} className="text-zinc-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: QUOTES --- */}
        <section className="h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-6 snap-center snap-always">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <Quotes activeMode={activeMode} />
          </motion.div>
        </section>

        {/* --- SECTION 3: MISSION --- */}
        <section className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 text-center snap-center snap-always">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-3xl md:text-6xl font-serif text-white mb-6 leading-tight">
              I don't design screens. <br />
              <span className="text-zinc-500 italic">I design behavior.</span>
            </h3>

            <p className="text-zinc-400 max-w-2xl text-lg font-light mb-8 tracking-wide">
              True luxury is clarity. I use
              <button className="text-indigo-400 hover:underline decoration-indigo-500/30 mx-2 font-medium" onClick={() => handleModeClick('cognitive')}>
                cognitive science
              </button>
              to build digital environments that don't just look right. They feel inevitable.
              Products, systems, and experiences designed for people who think.
            </p>

          </motion.div>
        </section>

        {/* --- SECTION 4: IDENTITY --- */}
        <section className="h-[100dvh] w-full flex flex-col items-center justify-center px-4 md:px-6 snap-center snap-always pb-24 md:pb-0">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="max-w-xl w-full"
          >
            {/* Bio */}
            <h4 className="text-3xl md:text-4xl font-serif text-white italic mb-1 md:mb-2">Akshat Chauhan</h4>
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-4 md:mb-6 block">Experience Architect</span>
            <p className="text-zinc-400 leading-relaxed mb-4 md:mb-8 tracking-wide text-sm md:text-base">
              "Design is not decoration; it is directed psychology."
            </p>

            {/* Bio */}
            <p className="text-zinc-400 leading-relaxed mb-8 md:mb-12 tracking-wide text-sm md:text-base">
              I want to understand the people in the room before the room understands them. That instinct, reading before being read, is what I'm here to sharpen.
            </p>


            {/* FINAL CTA */}
            <div className="flex justify-center">
              <div className="h-16 md:h-24 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {!isNavigating ? (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAccess}
                      className="group relative overflow-hidden flex items-center gap-5 px-10 py-[18px] border border-white/[0.18] rounded-full hover:border-white/35 transition-colors duration-700"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* Light sweep — like sun catching polished metal */}
                      <motion.div
                        className="absolute top-0 bottom-0 w-1/2 pointer-events-none"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }}
                        animate={{ x: ['-120%', '340%'] }}
                        transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: [0.4, 0, 0.6, 1] }}
                      />

                      <span className="relative font-serif text-xl md:text-2xl text-white/70 tracking-wide group-hover:text-white transition-colors duration-700 select-none">
                        Access{' '}
                        <span className="italic text-white/30 group-hover:text-white/60 transition-colors duration-700">
                          the Archive.
                        </span>
                      </span>

                    </motion.button>
                  ) : (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <span className="text-emerald-500 font-mono text-[10px] tracking-widest uppercase">AUTHENTICATING...</span>
                      <div className="w-48 h-0.5 bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;
