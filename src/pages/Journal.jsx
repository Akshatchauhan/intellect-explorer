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

  return (
    <PageTransition>
      {/* 1. CONTAINER: Reduced side padding to px-4 on mobile for more space */}
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-5xl mx-auto pb-40 relative z-10">
        
        {/* === HEADER SECTION === */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-[10px] md:text-xs text-blue-400 tracking-widest uppercase mb-4 block">
              Neural Logs / Level 2
            </span>
            {/* 2. TITLE SCALING: Reduced to text-4xl on mobile to fit 'Manifesto' */}
            <h1 className="font-serif text-4xl md:text-8xl text-white leading-none">
              The <span className="italic text-zinc-500">Manifesto.</span>
            </h1>
          </div>

          {/* 3. FILTER SCROLL FIX */}
          {/* We wrap the 'Pill' in a scrolling div, rather than making the Pill itself scroll. */}
          {/* This preserves the rounded borders and glass effect intact. */}
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
                  // 4. CARD PADDING: Reduced to p-5 on mobile
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
                      {/* 5. TEXT BREAKING: Added 'break-words' and reduced size to text-2xl */}
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
          
          {filteredPosts.length === 0 && (
             <div className="py-20 text-center font-mono text-xs text-zinc-600 tracking-widest">
                [NO_LOGS_FOUND_IN_THIS_SECTOR]
             </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
};

export default Journal;