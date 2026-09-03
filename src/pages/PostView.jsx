import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getPosts } from '../utils/content';
import PageTransition from '../components/PageTransition';

const PostView = () => {
  const { id } = useParams();
  
  // 1. Retrieve data
  const posts = getPosts();
  const post = posts.find(p => p.id === id);

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono text-xs tracking-widest">
      [SYSTEM_ERROR]: SIGNAL_LOST
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-2xl mx-auto pb-40 relative z-10">

        {/* 1. BACK BUTTON */}
        <Link to="/manifesto">
          <motion.div 
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-16 md:mb-24 cursor-pointer transition-colors group"
          >
            <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">
              Return to <span className="font-serif normal-case tracking-normal font-normal">the </span><span className="font-serif italic normal-case tracking-normal font-normal">Manifesto</span>
            </span>
          </motion.div>
        </Link>

        {/* 2. HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          {/* Metadata */}
          <div className="flex items-center gap-4 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em] mb-8">
            <time dateTime={post.date}>{post.date}</time>
            {post.category && (
              <>
                <span className="text-zinc-700">/</span>
                <span>{post.category}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl md:text-6xl text-white font-medium mb-8 leading-tight break-words tracking-tight">
            {post.title}
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 font-serif italic font-light leading-relaxed mb-12">
            {post.description}
          </p>
        </motion.header>

        {/* 3. MDX CONTENT */}
        <article className="prose prose-invert lg:prose-lg max-w-none
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-zinc-200 prose-headings:mt-16 prose-headings:mb-8
          prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed prose-p:tracking-wide prose-p:mb-8
          prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-a:decoration-zinc-700 hover:prose-a:decoration-white transition-colors
          prose-blockquote:border-none prose-blockquote:pl-0 prose-blockquote:py-4 prose-blockquote:text-zinc-300 prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-xl md:prose-blockquote:text-2xl prose-blockquote:leading-relaxed
          prose-code:text-zinc-300 prose-code:bg-zinc-900/50 prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-none prose-img:my-16"
        >
          <post.Content />
        </article>

        {/* 4. FOOTER */}
        <div className="mt-32 pt-16 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Signature */}
            <div className="font-mono text-xs text-zinc-500 tracking-widest">
              END OF TRANSMISSION
            </div>
            {/* Return link */}
            <Link to="/manifesto">
              <span className="font-mono text-sm tracking-widest uppercase text-zinc-500 hover:text-white transition-colors duration-500 underline underline-offset-4 decoration-zinc-700 hover:decoration-white">
                Return to <span className="font-serif italic normal-case tracking-normal font-normal">the Manifesto</span>
              </span>
            </Link>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default PostView;
