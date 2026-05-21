import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getPosts } from '../utils/content';
import PageTransition from '../components/PageTransition';

const PostView = () => {
  const { id } = useParams();
  const posts = getPosts();
  const post = posts.find(p => p.id === id);

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.description, url: window.location.href });
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono text-xs tracking-widest">
      [LOG_MISSING]: DATA_CORRUPTED
    </div>
  );

  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} — The Manifesto</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={`https://intellectexplorer.com/journal/${post.id}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
      </Helmet>

      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-3xl mx-auto pb-40 relative z-10">

        {/* 1. BACK BUTTON */}
        <Link to="/journal">
          <motion.div 
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 md:mb-12 cursor-pointer transition-colors group"
          >
            <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
            {/* UPDATED TEXT & FONT */}
            <span className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase">
              Return to <span className="font-serif normal-case tracking-normal font-normal">the </span><span className="font-serif italic normal-case tracking-normal font-normal">Manifesto</span>
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
            <span className="font-mono text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">
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
          prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed prose-p:tracking-wide
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-blue-500 prose-blockquote:bg-zinc-900/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:text-zinc-300 prose-blockquote:not-italic prose-blockquote:font-serif
          prose-code:text-blue-300 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-sm prose-img:border prose-img:border-white/10"
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* 4. POST FOOTER */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col gap-6">
          {/* Row 1: category + share */}
          <div className="flex items-center justify-between">
            <Link to={`/journal?category=${post.category}`}>
              <span className="px-4 py-2 text-xs font-mono font-bold tracking-widest text-blue-400 border border-blue-400/20 rounded-sm uppercase bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400/40 transition-all duration-300 cursor-pointer">
                {post.category}
              </span>
            </Link>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors duration-300"
            >
              {copied
                ? <Check size={13} strokeWidth={1.5} className="text-blue-400" />
                : <Share2 size={13} strokeWidth={1.5} />
              }
              <span className="font-mono text-xs uppercase tracking-widest">
                {copied ? 'Copied' : 'Share'}
              </span>
            </button>
          </div>

          {/* Row 2: return link */}
          <Link to="/journal">
            <span className="font-mono text-sm tracking-widest uppercase text-zinc-500 hover:text-white transition-colors duration-500 underline underline-offset-4 decoration-zinc-700 hover:decoration-white">
              Return to <span className="font-serif italic normal-case tracking-normal font-normal">the Manifesto</span>
            </span>
          </Link>
        </div>

      </div>
    </PageTransition>
  );
};

export default PostView;