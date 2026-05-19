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

// --- COMPONENT: POWER SURGE CARD (Silent Edition) ---
const PowerSurgeCard = ({ label, value, active }) => {
  return (
    <div
      className="group relative overflow-hidden rounded-sm bg-zinc-900/40 border border-white/5 transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-800/60"
    >
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 opacity-0 transition-opacity duration-300 group-hover:animate-scan group-hover:opacity-100" />
      <div className="relative h-full w-full p-5 flex flex-col justify-between z-0">
        <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3 transition-colors duration-300 group-hover:text-zinc-400">
          {label}
        </div>
        <div className="font-mono text-sm tracking-wide text-zinc-500 transition-all duration-300 flex items-center gap-3 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
           {active && (
             <span className="relative flex h-2 w-2">
               <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
           )}
           {value}
        </div>
      </div>
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

            <div className="h-[3.5rem] md:h-[4rem] mb-8 flex items-center justify-center w-full">
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
                   "Architecting digital empires via the subconscious mind."}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
              className="font-mono flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-4 select-none"
            >
              <span onClick={() => handleModeClick('cognitive')} className={`cursor-pointer transition-all duration-300 py-4 px-4 hover:text-indigo-300 ${activeMode === 'cognitive' ? 'text-indigo-400 font-bold scale-110' : ''}`}>Psychology</span>
              <span className="text-zinc-700">×</span>
              <span onClick={() => handleModeClick('interface')} className={`cursor-pointer transition-all duration-300 py-4 px-4 hover:text-emerald-300 ${activeMode === 'interface' ? 'text-emerald-400 font-mono font-bold scale-110' : ''}`}>Infrastructure</span>
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
                {activeMode ? "SIMULATION ACTIVE" : "SCROLL TO DECRYPT"}
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
              I don't just design screens. <br />
              <span className="text-zinc-500 italic">I design decisions.</span>
            </h3>

            <p className="text-zinc-400 max-w-2xl text-lg font-light mb-12">
              In a world drowning in noise, true luxury is clarity. I use my background in
              <button className="text-indigo-400 hover:underline decoration-indigo-500/30 mx-2 font-medium" onClick={() => handleModeClick('cognitive')}>
                psychology
              </button>
              to build digital environments that respect the user's subconscious.
            </p>

            <div className="flex gap-8 opacity-70">
              <button onClick={() => handleModeClick('behavioral')} className="flex items-center gap-2 group">
                <Radio size={16} className={`group-hover:text-red-500 transition-colors ${activeMode === 'behavioral' ? 'text-red-500' : 'text-zinc-600'}`} />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white">Behavioral</span>
              </button>
              <button onClick={() => handleModeClick('strategy')} className="flex items-center gap-2 group">
                <Zap size={16} className={`group-hover:text-yellow-200 transition-colors ${activeMode === 'strategy' ? 'text-white fill-white' : 'text-zinc-600'}`} />
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
            className="max-w-5xl w-full"
          >
            <div className="grid md:grid-cols-2 gap-16 items-start mb-16">

              {/* Bio */}
              <div>
                <span className="text-emerald-500 font-mono text-xs tracking-[0.2em] mb-2 block">Subject_ID</span>
                <h4 className="text-4xl font-serif text-white italic mb-2">Akshat Chauhan</h4>
                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6 block">Experience Architect</span>
                <p className="text-zinc-400 leading-relaxed">
                  "Design is not decoration; it is directed psychology. With a foundation in Cognitive Science, I decode the 'why' behind user actions."
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <PowerSurgeCard label="Base" value="New Delhi, IN" />
                <PowerSurgeCard label="Status" value="Online" active={true} />
                <PowerSurgeCard label="Engine" value="React + Framer" />
                <PowerSurgeCard label="Core" value="Stoic Philosophy" />
              </div>
            </div>

            {/* FINAL CTA */}
            <div className="flex justify-center">
              <div className="h-24 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {!isNavigating ? (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAccess}
                      className="group flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      <span className="font-serif text-lg md:text-xl text-white tracking-wide">
                        Initialize <span className="italic text-zinc-500 group-hover:text-zinc-400 transition-colors">Archive.</span>
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 12 }}
                        whileTap={{ scale: 1.6, filter: 'brightness(4)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <Fingerprint className="text-zinc-600 group-hover:text-emerald-400 transition-colors" size={20} />
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
