import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Radio, Zap } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import GridFrame from '../components/GridFrame';
import Quotes from '../components/Quotes';

// --- COMPONENT: POWER SURGE CARD (Silent Edition) ---
const PowerSurgeCard = ({ label, value, active }) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-sm bg-zinc-900/40 border border-white/5 transition-all duration-500 hover:border-zinc-700 hover:bg-zinc-800/60"
    >
      
      {/* 1. THE SCANLINE (The "Surge" - Hover Only) */}
      <div 
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-10 opacity-0 transition-opacity duration-300 group-hover:animate-[scan_1.5s_ease-in-out_infinite] group-hover:opacity-100" 
      />
      
      {/* 2. THE CONTENT */}
      <div className="relative h-full w-full p-5 flex flex-col justify-between z-0">
        
        {/* Label */}
        <div className="text-[10px] text-zinc-600 uppercase tracking-widest mb-3 transition-colors duration-300 group-hover:text-zinc-400">
          {label}
        </div>
        
        {/* Value */}
        <div 
          className="font-mono text-sm tracking-wide text-zinc-500 transition-all duration-300 flex items-center gap-3 group-hover:text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]"
        >
           {/* Active Status Dot (Heartbeat) */}
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

const Home = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const handleModeClick = (mode) => {
    setActiveMode(prev => prev === mode ? null : mode);
  };

  const { scrollY } = useScroll();

  const handleAccess = () => {
    setIsNavigating(true);
    setTimeout(() => navigate('/portfolio'), 2000);
  };

  // --- 1. ANIMATION PHYSICS ---
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]); 
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.05]);
  
  // iPad Optimized Fade
  const manifestoOpacity = useTransform(scrollY, [200, 500, 1100, 1400], [0, 1, 1, 0]);
  const manifestoScale = useTransform(scrollY, [200, 500], [0.95, 1]);
  
  // --- 2. THE DYNAMIC BLUR ---
  const deepDiveBlur = useTransform(
    scrollY,
    [800, 1400],
    ["blur(0px)", "blur(12px)"] 
  );

  // --- STYLES ---
  const getTitleStyle = () => {
    switch (activeMode) {
      case 'cognitive': return "text-indigo-200 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] tracking-wide transition-all duration-700";
      case 'behavioral': return "text-white drop-shadow-[4px_0_0_rgba(220,38,38,0.8)] shadow-[-4px_0_0_rgba(37,99,235,0.8)] italic transition-all duration-100";
      case 'interface': return "text-emerald-400 font-mono tracking-tighter decoration-emerald-500/30 underline decoration-2 underline-offset-4 transition-all duration-300";
      case 'strategy': return "text-zinc-50 font-mono tracking-[0.3em] uppercase transition-all duration-500";
      default: return "text-white transition-all duration-500";
    }
  };

  const getSubtextStyle = () => {
     switch (activeMode) {
      case 'cognitive': return "text-indigo-300/90 italic tracking-widest";
      case 'behavioral': return "text-red-500 font-bold font-mono uppercase tracking-tighter";
      case 'interface': return "text-emerald-500/90 font-mono";
      case 'strategy': return "text-zinc-400/90 font-mono bg-zinc-900 px-2";
      default: return "text-zinc-400";
    }
  };

  return (
    <PageTransition>
      <GridFrame />

      {/* === BACKGROUND LAYERS === */}
      <div className="fixed top-0 left-0 w-full h-[100dvh] z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeMode === 'cognitive' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-black to-black" />
                <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[150px]" />
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(165, 180, 252, 0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
             </motion.div>
          )}
          {activeMode === 'behavioral' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }} className="absolute inset-0 bg-zinc-950">
              <div className="absolute inset-0 opacity-20 mix-blend-hard-light" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 mix-blend-color-dodge">
                 <div className="text-[30vw] font-serif text-red-600 blur-3xl font-black">ERROR</div>
              </div>
            </motion.div>
          )}
          {activeMode === 'interface' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 bg-emerald-950/90">
             <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `linear-gradient(rgba(52, 211, 153, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(52, 211, 153, 0.4) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
             <div className="absolute top-10 left-10 font-mono text-emerald-500/50 text-xs"><div>GRID_SYSTEM_ACTIVE</div></div>
           </motion.div>
          )}
          {activeMode === 'strategy' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-zinc-900">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.1) 1px, rgba(255, 255, 255, 0.1) 2px)`, backgroundSize: '100% 4px' }} />
             <motion.div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
           </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 w-full overflow-x-hidden">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 sticky top-0"
        >
          <div className="text-center max-w-4xl mx-auto flex flex-col items-center relative min-h-[500px] justify-center"> 
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
              className={`font-serif text-5xl md:text-9xl font-medium tracking-tight mb-6 md:mb-8 leading-[0.9] ${getTitleStyle()}`}
            >
              {/* TIGHTER SPACING: Removed 'md:gap-2' */}
              <div className="flex flex-col items-center gap-0">
                <span className={`block h-[1.1em] overflow-visible ${activeMode === 'interface' || activeMode === 'strategy' ? "font-mono" : "font-serif italic"}`}>
                  {activeMode === 'strategy' ? "LOGIC" : (activeMode === 'interface' ? "SYSTEM" : (activeMode === 'behavioral' ? "CHAOS" : "Intellect"))}
                </span>
                <span className={`block h-[1.1em] overflow-visible ${activeMode === 'interface' || activeMode === 'strategy' ? "font-mono uppercase" : "bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/10"}`}>
                   {activeMode === 'strategy' ? "ENGINE" : (activeMode === 'interface' ? "KERNEL" : (activeMode === 'behavioral' ? "SIGNAL" : "Explorer."))}
                </span>
              </div>
            </motion.h1>

            <div className="h-[3.5rem] md:h-[4rem] mb-8 flex items-center justify-center w-full">
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
                className={`text-lg md:text-xl font-light leading-relaxed tracking-wide max-w-lg transition-all duration-300 text-center ${getSubtextStyle()}`}
              >
                {activeMode === 'cognitive' ? "Decoding the architecture of the human mind." : 
                 activeMode === 'behavioral' ? "Intercepting raw signals from the noise." :
                 activeMode === 'interface' ? "Rendering structure from abstract data." :
                 activeMode === 'strategy' ? "Calculating the optimal path to victory." :
                 "Architecting digital empires via the subconscious mind."}
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
              // REDUCED MARGIN BOTTOM: Changed mb-8 to mb-4 to pull scroll text up
              className="font-mono flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-4 select-none"
            >
              <span onClick={() => handleModeClick('cognitive')} className={`cursor-pointer transition-all duration-300 py-4 px-4 ${activeMode === 'cognitive' ? 'text-indigo-400' : ''}`}>Psychology</span>
              <span className="text-zinc-700">×</span>
              <span onClick={() => handleModeClick('interface')} className={`cursor-pointer transition-all duration-300 py-4 px-4 ${activeMode === 'interface' ? 'text-emerald-400 font-mono' : ''}`}>Infrastructure</span>
            </motion.div>
            
            <motion.div 
              style={{ opacity: heroOpacity }}
              className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase animate-pulse"
            >
              {activeMode ? "SIMULATION ACTIVE" : "SCROLL TO DECRYPT"}
            </motion.div>
          </div>
        </motion.div>

        {/* --- QUOTES SECTION --- */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 relative z-20">
          <motion.div style={{ opacity: manifestoOpacity, scale: manifestoScale }}>
             <Quotes activeMode={activeMode} /> 
          </motion.div>
        </div>

        {/* --- DOSSIER SECTION --- */}
        <motion.div 
          style={{ 
            backdropFilter: deepDiveBlur,
            WebkitBackdropFilter: deepDiveBlur
          }}
          className="min-h-screen flex flex-col relative z-20 transition-all duration-100"
        >
            
            {/* PART A: MISSION */}
            <div className="py-32 px-6 flex flex-col items-center text-center">
              <h3 className="text-3xl md:text-6xl font-serif text-white mb-6 leading-tight">
                I don't just design screens. <br />
                <span className="text-zinc-500 italic">I design decisions.</span>
              </h3>
              
              <p className="text-zinc-400 max-w-2xl text-lg font-light mb-12">
                 In a world drowning in noise, true luxury is clarity. I use my background in 
                 <button className="text-indigo-400 hover:underline decoration-indigo-500/30 mx-2" onClick={() => setActiveMode('cognitive')}>
                   psychology
                 </button> 
                 to build digital environments that respect the user's subconscious.
              </p>

              {/* TOGGLES */}
              <div className="flex gap-8 opacity-70">
                 <button onClick={() => setActiveMode(prev => prev === 'behavioral' ? null : 'behavioral')} className="flex items-center gap-2 group">
                    <Radio size={16} className={`group-hover:text-red-500 transition-colors ${activeMode === 'behavioral' ? 'text-red-500' : 'text-zinc-600'}`} />
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white">Behavioral</span>
                 </button>
                 <button onClick={() => setActiveMode(prev => prev === 'strategy' ? null : 'strategy')} className="flex items-center gap-2 group">
                    <Zap size={16} className={`group-hover:text-yellow-200 transition-colors ${activeMode === 'strategy' ? 'text-white fill-white' : 'text-zinc-600'}`} />
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest group-hover:text-white">Strategy</span>
                 </button>
              </div>
            </div>

            {/* PART B: IDENTITY GRID */}
            <div className="py-24 px-6 flex flex-col items-center">
               <div className="max-w-5xl w-full grid md:grid-cols-2 gap-16 items-start">
                  
                  {/* Bio */}
                  <div>
                    <span className="text-emerald-500 font-mono text-xs tracking-[0.2em] mb-2 block">Subject_ID</span>
                    <h4 className="text-4xl font-serif text-white italic mb-2">Akshat Chauhan</h4>
                    <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6 block">Experience Architect</span>
                    <p className="text-zinc-400 leading-relaxed">
                      "Design is not decoration; it is directed psychology. With a foundation in Cognitive Science, I decode the 'why' behind user actions."
                    </p>
                  </div>

                  {/* Stats Grid (STATIC MODE) */}
                  <div className="grid grid-cols-2 gap-4">
                      <PowerSurgeCard label="Base" value="New Delhi, IN" />
                      <PowerSurgeCard label="Status" value="Online" active={true} />
                      <PowerSurgeCard label="Engine" value="React + Framer" />
                      <PowerSurgeCard label="Core" value="Stoic Philosophy" />
                  </div>
               </div>

               {/* FINAL CTA */}
               <div className="mt-20 pb-[20vh]">
                  <div className="h-24 flex items-center justify-center relative w-full">
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
                            
                            <Fingerprint className="text-zinc-600 group-hover:text-emerald-400 transition-colors" size={20} />
                        </motion.button>
                      ) : (
                        <motion.div 
                          key="loading"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-4"
                        >
                          <span className="text-emerald-500 font-mono text-[10px] tracking-widest animate-pulse">AUTHENTICATING...</span>
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
            </div>
        </motion.div>

      </div>
    </PageTransition>
  );
};

export default Home;