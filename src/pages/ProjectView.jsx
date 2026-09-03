import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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
        onClose={() => navigate('/archive')}
      />
    );
  }

  // --- NORMAL CONTENT ---
  return (
    <PageTransition>
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-2xl mx-auto pb-40 relative z-10">
        
        {/* 1. BACK BUTTON */}
        <Link to="/archive">
          <motion.div 
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-16 md:mb-24 cursor-pointer transition-colors group"
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
          className="mb-20"
        >
          {/* Title */}
          <h1 className="font-serif text-5xl md:text-7xl text-white font-medium mb-8 leading-tight break-words tracking-tight">
            {project.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-xl md:text-2xl text-zinc-400 font-serif italic font-light leading-relaxed mb-12">
            {project.description || project.subtitle}
          </p>

          {/* Minimal Meta Data */}
          <div className="flex flex-col gap-4 text-xs font-mono tracking-widest uppercase text-zinc-600 mb-16">
            {project.tech && project.tech.length > 0 && (
              <div>
                <span className="text-zinc-400">Architecture:</span> {project.tech.join(', ')}
              </div>
            )}
            
            {(project.link || project.liveUrl) && (
              <div>
                <span className="text-zinc-400">Live:</span>{' '}
                <a href={project.link || project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-4 decoration-zinc-700 hover:decoration-white transition-colors">
                  View Deployment
                </a>
              </div>
            )}
          </div>

          {/* Unbounded Hero Image */}
          {project.image && (
             <div className="w-full mb-16">
               <img 
                 src={project.image} 
                 alt={project.title} 
                 className="w-full h-auto object-cover opacity-90"
               />
             </div>
          )}
        </motion.div>

        {/* 3. MDX CONTENT */}
        <article className="prose prose-invert lg:prose-lg max-w-none
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-zinc-200 prose-headings:mt-16 prose-headings:mb-8
          prose-p:text-zinc-400 prose-p:font-light prose-p:leading-relaxed prose-p:tracking-wide prose-p:mb-8
          prose-a:text-white prose-a:underline prose-a:underline-offset-4 prose-a:decoration-zinc-700 hover:prose-a:decoration-white transition-colors
          prose-blockquote:border-none prose-blockquote:pl-0 prose-blockquote:py-4 prose-blockquote:text-zinc-300 prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-xl md:prose-blockquote:text-2xl prose-blockquote:leading-relaxed
          prose-code:text-zinc-300 prose-code:bg-zinc-900/50 prose-code:px-1 prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-none prose-img:my-16"
        >
          <project.Content />
        </article>

        {/* 4. BOTTOM NAVIGATION */}
        <div className="mt-32 pt-16 border-t border-white/5 flex justify-center">
          <Link to="/archive">
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
