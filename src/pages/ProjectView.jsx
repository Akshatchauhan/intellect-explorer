import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getProjects } from '../utils/content';
import LockScreen from '../components/LockScreen';
import PageTransition from '../components/PageTransition';

const ProjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Retrieve data
  const projects = getProjects(); 
  const project = projects.find(p => p.id === id); 

  // 2. Lock Screen Logic
  const storageKey = `access_${id}`;
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (!project) return false;
    if (!project.password) return true; // No password = auto unlock
    return sessionStorage.getItem(storageKey) === 'true';
  });

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center text-zinc-500 font-mono text-xs tracking-widest">
      [SYSTEM_ERROR]: PROJECT_NOT_FOUND
    </div>
  );

  const handleUnlock = () => {
    sessionStorage.setItem(storageKey, 'true');
    setIsUnlocked(true);
  };

  // --- THE GATEKEEPER ---
  if (!isUnlocked) {
    return (
      <LockScreen 
        correctPassword={project.password} 
        onUnlock={handleUnlock}
        onClose={() => navigate('/portfolio')}
      />
    );
  }

  // --- NORMAL CONTENT ---
  return (
    <PageTransition>
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-3xl mx-auto pb-40 relative z-10">
        
        {/* 1. BACK BUTTON */}
        <Link to="/portfolio">
          <motion.div 
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-8 md:mb-12 cursor-pointer transition-colors group"
          >
            <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">
              Return to <span className="font-serif normal-case tracking-normal font-normal">the </span><span className="font-serif italic normal-case tracking-normal font-normal">Archive</span>
            </span>
          </motion.div>
        </Link>

        {/* 2. HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Title */}
          <h1 className="font-serif text-4xl md:text-6xl text-white font-medium mb-6 leading-tight break-words">
            {project.title}
          </h1>

          {/* Tech Stack Tags */}
          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span key={tech} className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest text-blue-400 border border-blue-400/20 rounded-sm uppercase bg-blue-500/5">
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="border-b border-white/10 mb-8" />

          {/* Subtitle / Description */}
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8 tracking-wide">
            {project.description || project.subtitle}
          </p>

          {/* Hero Image (NEW) */}
          {project.image && (
             <div className="w-full aspect-video rounded-sm overflow-hidden border border-white/10 mb-8 bg-zinc-900">
               <img 
                 src={project.image} 
                 alt={project.title} 
                 className="w-full h-full object-cover opacity-90"
               />
             </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {(project.link || project.liveUrl) && (
              <a
                href={project.link || project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/60 text-white px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                <ExternalLink size={14} strokeWidth={1.5} />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Launch</span>
              </a>
            )}

            {(project.repo || project.githubUrl) && (
              <a
                href={project.repo || project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/[0.12] text-zinc-400 px-6 py-3 rounded-sm hover:border-white/30 hover:text-white transition-all duration-300"
              >
                <Github size={14} strokeWidth={1.5} />
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase">Code</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* 3. MARKDOWN CONTENT */}
        <article className="prose prose-invert lg:prose-lg max-w-none
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-zinc-200
          prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed prose-p:tracking-wide
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-l-blue-500 prose-blockquote:bg-zinc-900/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:text-zinc-300 prose-blockquote:not-italic prose-blockquote:font-serif
          prose-code:text-blue-300 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-sm prose-img:border prose-img:border-white/10"
        >
          <ReactMarkdown>
            {project.content}
          </ReactMarkdown>
        </article>

        {/* 4. BOTTOM NAVIGATION */}
        <div className="mt-24 flex justify-center">
          <Link to="/portfolio">
            <span className="font-mono text-xs tracking-widest uppercase text-zinc-500 hover:text-white transition-colors duration-500 underline underline-offset-4 decoration-zinc-700 hover:decoration-white">
              Return to <span className="font-serif italic normal-case tracking-normal font-normal">the Archive</span>
            </span>
          </Link>
        </div>

      </div>
    </PageTransition>
  );
};

export default ProjectView;