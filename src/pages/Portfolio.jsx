import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../utils/content';
import PageTransition from '../components/PageTransition';
import { ArrowUpRight, Beaker, Layers, Lock, ArrowRight } from 'lucide-react';

const Portfolio = () => {
  // 1. DATA LOADING
  let allProjects = [];
  try {
    allProjects = getProjects() || [];
  } catch (error) {
    console.error("DATA LOAD ERROR:", error);
  }

  // 2. FILTERING
  const systems = Array.isArray(allProjects) ? allProjects.filter(p => p.type === 'SYSTEM' || !p.type) : [];
  const labs = Array.isArray(allProjects) ? allProjects.filter(p => p.type === 'LAB') : [];

  const [activeTab, setActiveTab] = useState('SYSTEMS');

  // --- EMPTY STATE: "THE SILENT VAULT" ---
  const EmptySector = ({ type }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      // CHANGED: Reduced padding from py-40 to py-20 to move text higher
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* 1. Elegant Typography */}
      <h3 className="font-serif text-3xl md:text-4xl text-zinc-300 mb-4 tracking-tight">
        The canvas is <span className="italic text-zinc-600">silent.</span>
      </h3>
      
      <p className="text-zinc-500 text-sm max-w-md mb-12 leading-relaxed font-light">
        This section of the archive is currently being architected. <br/>
        Theory precedes execution.
      </p>
      
      {/* 2. The "Ghost" Link */}
      <Link 
        to="/journal" 
        className="group flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
      >
        <span>Read the Manifesto</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-emerald-500" />
      </Link>
    </motion.div>
  );

  return (
    <PageTransition>
      {/* CONTAINER */}
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-6xl mx-auto pb-40 relative z-10">
        
        {/* === HEADER SECTION === */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] md:text-xs text-blue-400 tracking-widest uppercase mb-4 block">
              Directory / Level 1
            </span>
            <h1 className="font-serif text-5xl md:text-8xl text-white leading-none">
              The <span className="italic text-zinc-500">Archive.</span>
            </h1>
          </div>

          {/* TABS (Glass Filter) */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
             <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                {[
                  { id: 'SYSTEMS', icon: <Layers size={12} /> }, 
                  { id: 'LAB', icon: <Beaker size={12} /> }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-6 py-2 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 flex-shrink-0 ${
                      activeTab === tab.id ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {tab.icon} {tab.id}
                    </span>
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* === CONTENT GRID === */}
        <AnimatePresence mode="wait">
          
          {/* --- SYSTEMS VIEW (CASE FILES) --- */}
          {activeTab === 'SYSTEMS' && (
            <motion.div
              key="systems"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {systems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {systems.map((project, index) => (
                    <Link to={`/portfolio/${project.id}`} key={project.id}>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                      >
                        {/* CARD CONTAINER */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10 transition-all duration-500 group-hover:border-white/30 bg-zinc-900">
                          
                          {/* Image Layer */}
                          <div className="absolute inset-0">
                             {project.image && (
                               <motion.img 
                                 src={project.image} 
                                 alt={project.title}
                                 className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                               />
                             )}
                             {!project.image && <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950" />}
                          </div>

                          {/* Dark Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                          {/* Lock Status */}
                          {project.password && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-black/60 border border-white/10 rounded-full backdrop-blur-md">
                               <Lock size={10} className="text-zinc-400" />
                               <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">Restricted</span>
                            </div>
                          )}

                          {/* Floating Info */}
                          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                             <div className="flex justify-between items-end gap-4">
                                <div>
                                  <span className="font-mono text-[9px] md:text-[10px] text-blue-400 mb-2 block">
                                    CASE #{index < 9 ? `00${index + 1}` : `0${index + 1}`}
                                  </span>
                                  <h3 className="font-serif text-2xl md:text-3xl text-zinc-100 group-hover:text-white transition-colors break-words">
                                    {project.title}
                                  </h3>
                                </div>
                                
                                {!project.password && (
                                  <div className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-black/20 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <ArrowUpRight size={16} />
                                  </div>
                                )}
                             </div>
                          </div>
                        </div>

                        {/* Description Line */}
                        <div className="mt-4 flex justify-between items-start border-t border-white/5 pt-4">
                          <p className="text-xs md:text-sm text-zinc-500 font-light max-w-xs leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                          <span className="px-2 py-1 rounded border border-white/5 text-[9px] md:text-[10px] font-mono text-zinc-600 uppercase flex-shrink-0">
                            {project.year || '2026'}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptySector type="SYSTEMS" />
              )}
            </motion.div>
          )}

          {/* --- LAB VIEW (EVIDENCE) --- */}
          {activeTab === 'LAB' && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {labs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {labs.map((lab, index) => (
                    <Link to={`/portfolio/${lab.id}`} key={lab.id}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="group h-full bg-zinc-900/20 border border-white/5 hover:border-white/10 rounded-sm p-5 md:p-6 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <div className="p-2 bg-white/5 rounded-sm text-zinc-400 group-hover:text-white transition-colors">
                               <Beaker size={16} />
                            </div>
                            {lab.password && <Lock size={14} className="text-zinc-600" />}
                          </div>
                          
                          <h3 className="text-lg font-bold text-zinc-300 group-hover:text-white mb-2 transition-colors break-words">
                            {lab.title}
                          </h3>
                          <p className="text-[10px] md:text-xs text-zinc-500 leading-relaxed line-clamp-3 mb-4 font-mono">
                            {lab.description}
                          </p>
                        </div>
                        
                        <div className="w-full h-px bg-white/5 group-hover:bg-white/10 transition-colors mb-4" />
                        
                        <div className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest flex justify-between">
                          <span>EXP-{index < 9 ? `00${index + 1}` : `0${index + 1}`}</span>
                          <span className="group-hover:text-blue-400 transition-colors">:: ACCESS</span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              ) : (
                <EmptySector type="LAB" />
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Portfolio;