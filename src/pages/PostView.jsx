import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getPosts } from '../utils/content';
import PageTransition from '../components/PageTransition';

const PostView = () => {
  const { id } = useParams();
  const posts = getPosts();
  const post = posts.find(p => p.id === id);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono text-xs tracking-widest">
      [LOG_MISSING]: DATA_CORRUPTED
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-3xl mx-auto pb-40 relative z-10">
        
        {/* 1. BACK BUTTON */}
        <Link to="/journal">
          <motion.div 
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 md:mb-12 cursor-pointer transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {/* UPDATED TEXT & FONT */}
            <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">
              Return to the Manifesto
            </span>
          </motion.div>
        </Link>

        {/* 2. HEADER INFO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-white/10 pb-12"
        >
          {/* Metadata Line */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest text-blue-400 uppercase">
              {post.category}
            </span>
            <span className="w-px h-3 bg-zinc-800" />
            <span className="font-mono text-[10px] md:text-xs text-zinc-600 uppercase tracking-widest">
              {post.date}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-6xl text-white font-medium leading-tight break-words">
            {post.title}
          </h1>
        </motion.div>

        {/* 3. MARKDOWN RENDERER */}
        <article className="prose prose-invert lg:prose-lg max-w-none 
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-zinc-200
          prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-blue-500 prose-blockquote:bg-zinc-900/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:text-zinc-300 prose-blockquote:not-italic prose-blockquote:font-serif
          prose-code:text-blue-300 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-sm prose-img:border prose-img:border-white/10"
        >
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </article>

      </div>
    </PageTransition>
  );
};

export default PostView;