import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getPosts } from '../utils/content';
import PageTransition from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';

const Journal = () => {
  const posts = getPosts();
  const categories = ['ALL', ...new Set(posts.map(p => p.category))];
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredPosts = selectedCategory === 'ALL'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  // --- EMPTY STATE: "THE SILENT FREQUENCY" (Matches Portfolio Style) ---
  const EmptyJournal = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      // Matching padding from Portfolio
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* 1. Elegant Typography (Matching Portfolio structure) */}
      <h3 className="font-serif text-3xl md:text-4xl text-zinc-300 mb-4 tracking-tight">
        The frequency is <span className="italic text-zinc-600">silent.</span>
      </h3>
      
      {/* Matching margin-bottom (mb-12) and styling */}
      <p className="text-zinc-500 text-sm max-w-md mb-12 leading-relaxed font-light">
        No thoughts have been recorded in this sector yet. <br/>
        The signal is awaiting input.
      </p>
      
      {/* 2. Contact Link (Matches Portfolio Link Style with Arrow) */}
      <Link 
        to="/contact"
        className="group flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
      >
        <span>:: Establish Uplink</span>
        {/* Added Arrow back to match Portfolio style */}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-blue-500" />
      </Link>
    </motion.div>
  );

  return (
    <PageTransition>
      {/* CONTAINER */}
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-5xl mx-auto pb-40 relative z-10">
        
        {/* === HEADER SECTION === */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] md:text-xs text-blue-400 tracking-widest uppercase mb-4 block">
              Neural Logs / Level 2
            </span>
            <h1 className="font-serif text-4xl md:text-8xl text-white leading-none">
              The <span className="italic text-zinc-500">Manifesto.</span>
            </h1>
          </div>

          {/* FILTER SCROLL */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
             <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-6 py-2 rounded-full text-[10px] md:text-xs font-mono tracking-widest uppercase transition-colors duration-300 flex-shrink-0 ${
                      selectedCategory === cat ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {selectedCategory === cat && (
                      <motion.div 
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* === CONTENT LIST === */}
        <div className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {filteredPosts.map((post, index) => (
              <Link key={post.id} to={`/journal/${post.id}`} className="block">
                <motion.div 
                  layout 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative p-5 md:p-8 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/50 transition-all duration-500 rounded-sm hover:border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Left: Content */}
                    <div className="max-w-2xl w-full">
                      {/* Meta Data Line */}
                      <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-[9px] md:text-[10px] text-blue-400 uppercase tracking-widest">
                            {post.category}
                          </span>
                          <span className="w-px h-3 bg-zinc-800" />
                          <span className="font-mono text-[9px] md:text-[10px] text-zinc-600 uppercase tracking-widest">
                            {post.date}
                          </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-2xl md:text-4xl text-zinc-200 group-hover:text-white transition-colors mb-4 leading-tight break-words w-full">
                        {post.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed line-clamp-2">
                        {post.description}
                      </p>
                    </div>

                    {/* Right: Interaction Icon */}
                    <div className="hidden md:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-600 group-hover:bg-white group-hover:text-black transition-all duration-500">
                      <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-500" />
                    </div>

                    {/* Mobile Only Icon */}
                    <div className="md:hidden flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-2 group-hover:text-white">
                      <span>Read Entry</span>
                      <ArrowRight size={12} />
                    </div>

                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
          
          {/* EMPTY STATE TRIGGER */}
          {filteredPosts.length === 0 && (
             <EmptyJournal />
          )}
        </div>

      </div>
    </PageTransition>
  );
};

export default Journal;