import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Radio, Zap, ChevronDown } from 'lucide-react';

import PageTransition from '../components/PageTransition';
import GridFrame from '../components/GridFrame';
import Quotes from '../components/Quotes';
import { useAudioActions } from '../Context/AudioContext';

// --- COMPONENT: REALITY LAYERS (THE VISUAL FILTERS) ---
const RealityLayer = ({ mode }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <AnimatePresence mode="wait">

        {/* 1. COGNITIVE: TUNNEL VISION (The Trance) */}
        {mode === 'cognitive' && (
           <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}
             className="absolute inset-0 bg-black"
           >
             <motion.div
               animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#312e81_0%,_#000000_60%)]"
             />
             <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] md:shadow-[inset_0_0_300px_rgba(0,0,0,1)]" />
             <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
           </motion.div>
        )}

        {/* 2. BEHAVIORAL: RGB SPLIT (The Glitch) */}
        {mode === 'behavioral' && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
            className="absolute inset-0 bg-zinc-950"
          >
            <motion.div
               animate={{ x: [-2, 2, -1, 0], y: [1, -1, 0] }}
               transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
               className="absolute inset-0"
            >
              <div className="absolute inset-0 translate-x-[2px] bg-red-500/10 mix-blend-screen" />
              <div className="absolute inset-0 -translate-x-[2px] bg-cyan-500/10 mix-blend-screen" />
              <div className="absolute inset-0 opacity-20 mix-blend-hard-light" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 mix-blend-color-dodge">
               <div className="text-[30vw] font-serif text-red-600 blur-sm font-black animate-pulse">ERROR</div>
            </div>
          </motion.div>
        )}

        {/* 3. INTERFACE: CRT MONITOR (The Matrix) */}
        {mode === 'interface' && (
           <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
             className="absolute inset-0 bg-[#05100a]"
           >
             <div className="absolute inset-0 z-10 opacity-30 pointer-events-none"
                  style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%' }}
             />
             <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: `linear-gradient(rgba(52, 211, 153, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 211, 153, 0.4) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
             />
             <div className="absolute inset-0 bg-emerald-500/10 blur-[100px]" />
           </motion.div>
        )}

        {/* 4. STRATEGY: RADAR SWEEP (The War Room) */}
        {mode === 'strategy' && (
           <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
             className="absolute inset-0 bg-zinc-900"
           >
             <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255, 255, 255, 0.5) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255, 255, 255, 0.5) 50px)`, backgroundSize: '50px 50px' }}
             />
             <motion.div
               animate={{ top: ['-10%', '110%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent z-10"
             />
             <motion.div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


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

  const handleAccess = () => {
    setIsNavigating(true);
    setTimeout(() => navigate('/portfolio'), 2000);
  };

  // Apply scroll-snap to body (the actual scroll container due to overflow-x:hidden)
  // so mouse wheel snapping works via normal window scroll
  useEffect(() => {
    document.body.style.scrollSnapType = 'y mandatory';
    return () => {
      document.body.style.scrollSnapType = '';
    };
  }, []);

  const getTitleStyle = () => {
    switch (activeMode) {
      case 'cognitive': return "text-indigo-200 blur-[1px] drop-shadow-[0_0_15px_rgba(165,180,252,0.8)] tracking-wide transition-all duration-1000";
      case 'behavioral': return "text-red-500 drop-shadow-[2px_0_0_rgba(0,255,255,0.7)] shadow-[-2px_0_0_rgba(255,0,0,0.7)] italic transition-all duration-75";
      case 'interface': return "text-emerald-400 font-mono tracking-tighter decoration-emerald-500/30 underline decoration-4 underline-offset-4 transition-all duration-300";
      case 'strategy': return "text-zinc-50 font-mono tracking-[0.3em] uppercase transition-all duration-500";
      default: return "text-white transition-all duration-500";
    }
  };

  const getSubtextStyle = () => {
     switch (activeMode) {
      case 'cognitive': return "text-indigo-300/80 italic tracking-widest";
      case 'behavioral': return "text-red-500 font-bold font-mono uppercase tracking-tighter decoration-wavy underline";
      case 'interface': return "text-emerald-500/90 font-mono border-l-2 border-emerald-500 pl-4";
      case 'strategy': return "text-zinc-400/90 font-mono bg-zinc-900 px-2 border border-zinc-700";
      default: return "text-zinc-400";
    }
  };

  return (
    <PageTransition>
      <GridFrame />
      <RealityLayer mode={activeMode} />

      {/* === SNAP SCROLL CONTAINER === */}
      <div className="relative z-10 w-full">

        {/* --- SECTION 1: HERO --- */}
        <section className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 snap-start">
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
              className={`font-serif text-5xl md:text-9xl font-medium tracking-tight mb-6 md:mb-8 leading-[0.9] ${getTitleStyle()}`}
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
                  <span className={`block h-[1.1em] overflow-visible ${activeMode === 'interface' || activeMode === 'strategy' ? "font-mono" : "font-serif italic"}`}>
                    {activeMode === 'strategy' ? "LOGIC" : (activeMode === 'interface' ? "SYSTEM" : (activeMode === 'behavioral' ? "CHAOS" : "Intellect"))}
                  </span>
                  <span className={`block h-[1.1em] overflow-visible ${activeMode === 'interface' || activeMode === 'strategy' ? "font-mono uppercase" : "bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/10"}`}>
                    {activeMode === 'strategy' ? "ENGINE" : (activeMode === 'interface' ? "KERNEL" : (activeMode === 'behavioral' ? "SIGNAL" : "Explorer."))}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.h1>

            <div className="h-[3.5rem] md:h-[4rem] mb-5 flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeMode ?? 'default'}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`text-lg md:text-xl font-light leading-relaxed tracking-wide max-w-lg text-center ${getSubtextStyle()}`}
                >
                  {activeMode === 'cognitive' ? "Decoding the architecture of the human mind." :
                   activeMode === 'behavioral' ? "Intercepting raw signals from the noise." :
                   activeMode === 'interface' ? "Rendering structure from abstract data." :
                   activeMode === 'strategy' ? "Calculating the optimal path to victory." :
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
                    <ChevronDown size={14} className="text-zinc-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: QUOTES --- */}
        <section className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 snap-start">
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
        <section className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 text-center snap-start">
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

            <p className="text-zinc-400 max-w-2xl text-lg font-light mb-8">
              True luxury is clarity. I use
              <button className="text-indigo-400 hover:underline decoration-indigo-500/30 mx-2 font-medium" onClick={() => handleModeClick('cognitive')}>
                cognitive science
              </button>
              to build digital environments that don't just look right — they feel inevitable.
              Products, systems, and experiences designed for people who think.
            </p>

            <div className="flex gap-8 opacity-70">
              <button onClick={() => handleModeClick('behavioral')} className="flex items-center gap-2 group">
                <Radio size={16} className={`group-hover:text-red-500 transition-colors ${activeMode === 'behavioral' ? 'text-red-500' : 'text-zinc-500'}`} />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white">Behavioral</span>
              </button>
              <button onClick={() => handleModeClick('strategy')} className="flex items-center gap-2 group">
                <Zap size={16} className={`group-hover:text-yellow-200 transition-colors ${activeMode === 'strategy' ? 'text-white fill-white' : 'text-zinc-500'}`} />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white">Strategy</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* --- SECTION 4: IDENTITY --- */}
        <section className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 snap-start pb-24 md:pb-0">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="max-w-xl w-full"
          >
            {/* Bio */}
            <span className="text-emerald-500 font-mono text-xs tracking-[0.2em] mb-2 block">Subject_ID</span>
            <h4 className="text-4xl font-serif text-white italic mb-2">Akshat Chauhan</h4>
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6 block">Experience Architect</span>
            <p className="text-zinc-400 leading-relaxed mb-8">
              "Design is not decoration; it is directed psychology."
            </p>

            {/* Metadata strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6 mb-10">
              {[
                { label: 'Base', value: 'New Delhi, IN' },
                { label: 'Engine', value: 'React + Framer' },
                { label: 'Core', value: 'Stoic Philosophy' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{label}</span>
                  <span className="w-px h-3 bg-zinc-800" />
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{value}</span>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Status</span>
                <span className="w-px h-3 bg-zinc-800" />
                <span className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                  </span>
                  Online
                </span>
              </div>
            </div>

            {/* FINAL CTA */}
            <div className="flex justify-center">
              <div className="h-24 flex items-center justify-center relative">
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

                      {/* Hairline divider */}
                      <span className="w-px h-4 bg-white/15 shrink-0" />

                      <motion.div
                        whileHover={{ rotate: 15 }}
                        whileTap={{ scale: 1.4, filter: 'brightness(3)' }}
                        transition={{ type: 'spring', stiffness: 250, damping: 18 }}
                      >
                        <Fingerprint size={18} className="text-white/30 group-hover:text-white/60 transition-colors duration-700" />
                      </motion.div>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Fingerprint size={22} className="text-emerald-500" />
                      </motion.div>
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
