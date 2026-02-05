import React, { useState, useEffect } from 'react';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

import { useNavigate, Link } from 'react-router-dom'; 

import { ArrowDown, User, Brain, LayoutTemplate, Zap, Radio, Fingerprint, X } from 'lucide-react';

import PageTransition from '../components/PageTransition';

import GridFrame from '../components/GridFrame';

import Quotes from '../components/Quotes';



const Home = () => {

  const navigate = useNavigate();

  const [activeMode, setActiveMode] = useState(null); 

  const [isNavigating, setIsNavigating] = useState(false);



  const handleModeClick = (mode) => {

    setActiveMode(prev => prev === mode ? null : mode);

  };



  // --- 1. SCROLL PHYSICS ---

  const { scrollY, scrollYProgress } = useScroll();



  // --- 2. PORTAL LOGIC ---

  useEffect(() => {

    const unsubscribe = scrollYProgress.onChange((v) => {

      if (v > 0.99 && !isNavigating) {

        setIsNavigating(true);

        // CHANGED: Increased wait time to 2.5 seconds for dramatic effect

        setTimeout(() => navigate('/portfolio'), 2500);

      }

    });

    return () => unsubscribe();

  }, [scrollYProgress, navigate, isNavigating]);



  // --- 3. ANIMATIONS ---

  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]); 

  

  const manifestoOpacity = useTransform(scrollY, [300, 600], [0, 1]);

  const manifestoScale = useTransform(scrollY, [300, 600], [0.95, 1]);

  

  const aboutOpacity = useTransform(scrollY, [700, 1000], [0, 1]);

  const aboutY = useTransform(scrollY, [700, 1000], [50, 0]);



  // --- STYLES ---

  const getTitleStyle = () => {

    switch (activeMode) {

      case 'cognitive': return "text-indigo-200 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] blur-[1px] tracking-wide transition-all duration-700"; 

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

      <div className="fixed inset-0 z-0 pointer-events-none">

        <AnimatePresence mode="wait">

          {activeMode === 'cognitive' && (

             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 bg-black">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-black to-black" />

                <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[150px]" />

                <motion.div animate={{ scale: [1, 1.3, 1], x: [-50, 50, -50] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-violet-800/20 rounded-full blur-[120px]" />

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

             <motion.div className="absolute inset-x-0 h-[2px] bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,1)]" animate={{ top: ['-10%', '110%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />

             <div className="absolute top-10 left-10 font-mono text-emerald-500/50 text-xs"><div>GRID_SYSTEM_ACTIVE</div><div>COORDS: {Math.random().toFixed(4)}, {Math.random().toFixed(4)}</div></div>

           </motion.div>

          )}

          {activeMode === 'strategy' && (

             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-zinc-900">

             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255, 255, 255, 0.1) 1px, rgba(255, 255, 255, 0.1) 2px)`, backgroundSize: '100% 4px' }} />

             <div className="flex justify-between w-full h-full opacity-10 px-4">{[...Array(6)].map((_, i) => (<motion.div key={i} className="w-px bg-white h-full" initial={{ scaleY: 0, originY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: i * 0.1 }} />))}</div>

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

          <div className="text-center max-w-4xl mx-auto flex flex-col items-center">

            

            <motion.h1 

              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}

              className={`font-serif text-5xl md:text-9xl font-medium tracking-tight mb-6 md:mb-8 leading-[0.9] ${getTitleStyle()}`}

            >

              <span className={activeMode === 'interface' || activeMode === 'strategy' ? "font-mono" : "font-serif italic"}>

                {activeMode === 'strategy' ? "LOGIC" : (activeMode === 'interface' ? "SYSTEM" : (activeMode === 'behavioral' ? "CHAOS" : "Intellect"))}

              </span>

              <br />

              <span className={activeMode === 'interface' || activeMode === 'strategy' ? "font-mono uppercase" : "bg-clip-text text-transparent bg-gradient-to-b from-white/80 to-white/10"}>

                 {activeMode === 'strategy' ? "ENGINE" : (activeMode === 'interface' ? "KERNEL" : (activeMode === 'behavioral' ? "SIGNAL" : "Explorer."))}

              </span>

            </motion.h1>



            <motion.p 

              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}

              className={`text-lg md:text-xl mb-8 font-light leading-relaxed tracking-wide max-w-lg transition-all duration-300 ${getSubtextStyle()}`}

            >

              {activeMode === 'cognitive' ? "Decoding the architecture of the human mind." : 

               activeMode === 'behavioral' ? "Intercepting raw signals from the noise." :

               activeMode === 'interface' ? "Rendering structure from abstract data." :

               activeMode === 'strategy' ? "Calculating the optimal path to victory." :

               "Architecting digital empires via the subconscious mind."}

            </motion.p>



            <motion.div 

              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}

              className="font-mono flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mb-12 select-none"

            >

              <span 

                className={`transition-all duration-300 py-4 px-4 ${activeMode === 'cognitive' ? 'text-indigo-400 blur-[0.5px]' : ''}`} 

                onClick={() => handleModeClick('cognitive')}

              >

                Psychology

              </span>

              <span className="text-zinc-700">×</span>

              <span 

                className={`transition-all duration-300 py-4 px-4 ${activeMode === 'interface' ? 'text-emerald-400 font-mono' : ''}`} 

                onClick={() => handleModeClick('interface')}

              >

                Infrastructure

              </span>

            </motion.div>



            <motion.div 

              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} 

              className="absolute bottom-32 text-[10px] font-mono text-zinc-600 tracking-widest uppercase animate-pulse"

            >

              {activeMode ? "SIMULATION ACTIVE" : "Scroll to Decrypt"}

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

        {/* Added vertical padding for mobile cleanliness */}

        <motion.div 

          style={{ opacity: aboutOpacity, y: aboutY }}

          className="min-h-screen flex items-center justify-center px-4 md:px-6 relative z-20 py-20 md:py-0"

        >

           <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

              

              <div className="relative group order-2 md:order-1">

                 <div className={`relative bg-zinc-900/40 border backdrop-blur-xl p-8 rounded-sm transition-colors duration-500 ${activeMode ? 'border-white/20 bg-black/80' : 'border-white/10'}`}>

                    

                    <div className="flex justify-between items-start mb-12 border-b border-white/5 pb-6">

                       <div className="text-right">

                          <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-1">Status</div>

                          <div className="text-xs font-mono text-emerald-400 tracking-widest uppercase flex items-center justify-end gap-2">

                             <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />

                             Online

                          </div>

                       </div>

                    </div>



                    <div className="space-y-6">

                       <div>

                          <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-2">Identity</div>

                          <div className="text-lg text-white font-serif italic flex items-center gap-2">

                             Akshat Chauhan

                          </div>

                       </div>



                       <div>

                          <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-2">Role</div>

                          <div className="text-xl text-white font-serif italic">Experience Architect</div>

                       </div>

                       

                       <div>

                          <div className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase mb-2">Primary Protocol</div>

                          <div className="text-sm text-zinc-300 font-light flex items-center select-none">

                             <span className={`cursor-pointer transition-all duration-300 ${activeMode === 'cognitive' ? 'text-indigo-400 blur-[0.5px]' : 'hover:text-indigo-300'}`} onClick={() => handleModeClick('cognitive')}>Cognitive Psychology</span>

                             <span className="text-zinc-600 mx-2">×</span>

                             <span className={`cursor-pointer transition-all duration-300 ${activeMode === 'interface' ? 'text-emerald-400 font-mono' : 'hover:text-emerald-400'}`} onClick={() => handleModeClick('interface')}>Interface Design</span>

                          </div>

                       </div>

                    </div>

                    

                    <div className="mt-12 opacity-30">

                       <div className="h-4 w-full bg-repeat-x" style={{ backgroundImage: 'linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '4px 100%' }} />

                    </div>

                 </div>

              </div>



              <div className="order-1 md:order-2">

                 <h3 className={`text-3xl md:text-4xl font-serif text-white mb-8 transition-all duration-500 ${activeMode ? 'opacity-80' : 'opacity-100'}`}>

                    I don't just design screens. <br />

                    <span className="text-zinc-500 italic">I design decisions.</span>

                 </h3>

                 <div className="space-y-6 text-zinc-400 font-light leading-relaxed">

                    <p>

                       In a world drowning in noise, true luxury is clarity. I use my background in 

                       <span className={`cursor-pointer mx-1 transition-all duration-300 border-b border-transparent ${activeMode === 'cognitive' ? 'text-indigo-400 border-indigo-400/50' : 'text-white hover:text-indigo-300'}`} onClick={() => handleModeClick('cognitive')}>psychology</span> 

                       to build digital environments that respect the user's subconscious.

                    </p>

                 </div>

                 

                 <div className="mt-12 flex items-center gap-8 select-none">

                    <div className={`flex items-center gap-3 text-xs font-mono uppercase tracking-widest group cursor-pointer transition-all duration-300 ${activeMode === 'behavioral' ? 'opacity-100 scale-105' : 'text-zinc-500 hover:text-red-400 opacity-70'}`} onClick={() => handleModeClick('behavioral')}>

                       <Radio size={14} className={`${activeMode === 'behavioral' ? 'text-red-500 animate-pulse' : ''}`} />

                       <span className={`${activeMode === 'behavioral' ? 'text-red-500 font-bold' : ''}`}>Behavioral Science</span>

                    </div>



                    <div className={`flex items-center gap-3 text-xs font-mono uppercase tracking-widest group cursor-pointer transition-all duration-300 ${activeMode === 'strategy' ? 'opacity-100 scale-105' : 'text-zinc-500 hover:text-white opacity-70'}`} onClick={() => handleModeClick('strategy')}>

                       <Zap size={14} className={`${activeMode === 'strategy' ? 'text-white fill-white' : ''}`} />

                       <span className={`${activeMode === 'strategy' ? 'text-white font-bold' : ''}`}>UX Strategy</span>

                    </div>

                 </div>

              </div>



           </div>

        </motion.div>





        {/* --- THE PORTAL (TRIGGER) --- */}

        <div className="h-[40vh] md:h-[50vh] flex flex-col items-center justify-center relative">

           <AnimatePresence>

             {!isNavigating && (

               <motion.div 

                 initial={{ opacity: 0 }} 

                 whileInView={{ opacity: 1 }} 

                 viewport={{ amount: 0.8 }}

                 className="flex flex-col items-center gap-4 text-zinc-600"

               >

                 <ArrowDown size={20} className="animate-bounce" />

                 <span className="font-mono text-xs tracking-[0.3em] uppercase">Scroll to Access Archive</span>

               </motion.div>

             )}

           </AnimatePresence>



           {isNavigating && (

             <motion.div 

               initial={{ opacity: 0 }} 

               animate={{ opacity: 1 }} 

               className="fixed inset-0 z-50 bg-black flex items-center justify-center px-4"

             >

               {/* OPTIMIZED FOR MOBILE: text-xs on small screens, smaller tracking */}

               <span className="text-white font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.5em] animate-pulse text-center">

                 AUTHENTICATING ID: AKSHAT_CHAUHAN...

               </span>

             </motion.div>

           )}

        </div>



      </div>

    </PageTransition>

  );

};



export default Home;