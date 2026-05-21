import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { getPosts } from '../utils/content';
import PageTransition from '../components/PageTransition';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Journal = () => {
  const posts = getPosts();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const headerY = useTransform(scrollY, [0, 80], [0, -8]);
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80));
  const categories = ['ALL', ...new Set(posts.map(p => p.category))];
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get('category') || 'ALL'
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        No transmissions logged in this frequency yet. <br/>
        The signal is still forming.
      </p>
      
      {/* 2. Contact Link (Matches Portfolio Link Style with Arrow) */}
      <Link
        to="/contact"
        className="group inline-flex items-center gap-4 px-5 py-3 border border-white/[0.08] rounded-sm bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-white/20 transition-all duration-300 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white"
      >
        <span>Establish Uplink</span>
        <ArrowRight size={14} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300 text-blue-500" />
      </Link>
    </motion.div>
  );

  return (
    <PageTransition>
      <Helmet>
        <title>The Manifesto — Akshat Chauhan</title>
        <meta name="description" content="Dispatches on design, philosophy, and the science of observation." />
        <meta property="og:title" content="The Manifesto" />
        <meta property="og:description" content="Dispatches on design, philosophy, and the science of observation." />
        <meta property="og:url" content="https://intellectexplorer.com/journal" />
      </Helmet>

      {/* CONTAINER */}
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-6xl mx-auto pb-40 relative z-10">
        
        {/* === HEADER SECTION === */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY, pointerEvents: scrolled ? 'none' : 'auto' }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="font-mono text-[10px] md:text-xs text-blue-400 tracking-widest uppercase mb-4 block">
              Dispatches / Ongoing
            </span>
            <h1 className="font-serif text-4xl md:text-8xl text-white leading-none">
              The <span className="italic text-zinc-500">Manifesto.</span>
            </h1>
          </div>

          {/* FILTER SCROLL */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <div className="inline-flex items-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-5 py-2 rounded-sm text-[10px] md:text-xs font-mono tracking-widest uppercase transition-colors duration-300 flex-shrink-0 ${
                    selectedCategory === cat ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {selectedCategory === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-sm bg-white/[0.04] border border-white/20"
                      transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* === STICKY HEADER BAR === */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/30 border-b border-white/[0.06]"
            >
              <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
                <Link to="/" className="flex flex-col group cursor-pointer">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif italic text-2xl text-white leading-none group-hover:text-zinc-300 transition-colors duration-300">I</span>
                    <span className="font-serif text-xl text-zinc-400 leading-none group-hover:text-white transition-colors duration-300">E</span>
                  </div>
                  <span className="font-serif italic text-sm text-zinc-400 leading-snug group-hover:text-white transition-colors duration-300">the Manifesto.</span>
                </Link>
                {/* Sticky filters — mobile dropdown */}
                <div className="md:hidden relative">
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/[0.08] text-[10px] font-mono tracking-widest uppercase text-white"
                  >
                    <span>{selectedCategory}</span>
                    <ChevronDown size={10} strokeWidth={1.5} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-1 z-50 backdrop-blur-xl bg-zinc-900/60 border border-white/10 rounded-sm overflow-hidden min-w-[120px] shadow-xl shadow-black/50"
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => { setSelectedCategory(cat); setDropdownOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[10px] font-mono tracking-widest uppercase transition-colors duration-150 ${
                              selectedCategory === cat ? 'text-white bg-white/[0.06]' : 'text-zinc-500 hover:text-white hover:bg-white/[0.03]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sticky filters — desktop tabs */}
                <div className="hidden md:inline-flex items-center gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`relative px-4 py-1.5 rounded-sm text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 flex-shrink-0 ${
                        selectedCategory === cat ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {selectedCategory === cat && (
                        <motion.div
                          layoutId="activeCategorySticky"
                          className="absolute inset-0 rounded-sm bg-white/[0.04] border border-white/20"
                          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === CONTENT LIST === */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="space-y-4"
          >
            {filteredPosts.map((post) => (
              <Link key={post.id} to={`/journal/${post.id}`} className="block">
                <div
                  className="group relative p-5 md:p-8 border border-white/[0.08] bg-zinc-900/20 hover:bg-zinc-900/50 transition-all duration-500 rounded-sm hover:border-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    {/* Left: Content */}
                    <div className="max-w-2xl w-full">
                      {/* Meta Data Line */}
                      <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">
                            {post.category}
                          </span>
                          <span className="w-px h-3 bg-zinc-800" />
                          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                            {post.date}
                          </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-2xl md:text-4xl text-zinc-200 group-hover:text-white transition-colors mb-4 leading-tight break-words w-full">
                        {post.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed line-clamp-2 tracking-wide">
                        {post.description}
                      </p>
                    </div>

                    {/* Expanding dash */}
                    <div className="hidden md:block ml-auto flex-shrink-0">
                      <div className="w-4 h-px bg-white/10 group-hover:w-8 group-hover:bg-white/40 transition-all duration-500" />
                    </div>

                  </div>
                </div>
              </Link>
            ))}
            {filteredPosts.length === 0 && <EmptyJournal />}
          </motion.div>
        </AnimatePresence>

      </div>
    </PageTransition>
  );
};

export default Journal;