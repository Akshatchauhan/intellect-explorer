import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, FileText, ArrowUpRight, Download, MapPin, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const ResumeModal = ({ onClose }) => {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('resume-modal', { detail: true }));
    return () => window.dispatchEvent(new CustomEvent('resume-modal', { detail: false }));
  }, []);

  return (
  <>
    {/* Backdrop */}
    <motion.div
      className="fixed inset-0 z-[199] bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    />

    {/* Slide-up Panel */}
    <motion.div
      className="fixed inset-x-0 bottom-0 z-[200] h-[96vh] bg-zinc-950 rounded-t-2xl overflow-hidden"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 35, stiffness: 300 }}
    >
      {/* Floating controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <a
          href="/Akshat_Chauhan_Resume.pdf"
          download="Akshat_Chauhan_Resume.pdf"
          onClick={e => e.stopPropagation()}
          className="p-2 bg-zinc-900/80 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-300"
          title="Download"
        >
          <Download size={14} />
        </a>
        <button
          onClick={onClose}
          className="p-2 bg-zinc-900/80 border border-white/10 rounded-full text-zinc-400 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-300"
          title="Close"
        >
          <X size={14} />
        </button>
      </div>

      {/* PDF — full panel, no browser toolbar */}
      <iframe
        src="/Akshat_Chauhan_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
        className="w-full h-full"
        title="Capability Dossier — Akshat Chauhan"
      />
    </motion.div>
  </>
  );
};

const Contact = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <PageTransition>
      {/* CONTAINER */}
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-4xl mx-auto pb-20 relative z-10 flex flex-col justify-between">

        <div>
          {/* === HEADER SECTION === */}
          <div className="mb-16 md:mb-24">
            <span className="font-mono text-[10px] md:text-xs text-blue-400 tracking-widest uppercase mb-4 block">
              Transmission / Level 3
            </span>
            <h1 className="font-serif text-5xl md:text-8xl text-white leading-none">
              The <span className="italic text-zinc-500">Uplink.</span>
            </h1>
          </div>

          {/* === CONTROL GRID === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            {/* 1. CAPABILITY DOSSIER (RESUME) */}
            <motion.div
              onClick={() => setIsResumeOpen(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="col-span-1 md:col-span-2 group relative p-6 md:p-8 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/50 rounded-sm hover:border-white/10 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="relative z-10 flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-sm text-zinc-400 group-hover:text-blue-400 transition-colors">
                    <FileText size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-zinc-200 group-hover:text-white transition-colors mb-2">
                      Capability Dossier
                    </h3>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                      <span>Format: PDF</span>
                      <span className="hidden md:inline text-zinc-800">|</span>
                      <span>Classified 2026</span>
                      <span className="hidden md:inline text-zinc-800">|</span>
                      <span className="text-emerald-500/80">Clearance Granted</span>
                    </div>
                  </div>
                </div>

                <div className="p-2 border border-white/10 rounded-full text-zinc-500 group-hover:text-white group-hover:border-white transition-all duration-500">
                  <Download size={18} />
                </div>
              </div>

              {/* Background Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </motion.div>

            {/* 2. EMAIL */}
            <motion.a
              href="mailto:info@intellectexplorer.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group relative p-6 md:p-8 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/50 rounded-sm hover:border-white/10 transition-all duration-500 flex flex-col justify-between min-h-[200px]"
            >
              <div className="flex justify-between items-start">
                <Mail size={24} className="text-zinc-500 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>

              <div>
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-2 block group-hover:text-blue-400 transition-colors">
                  Official Channel
                </span>
                <h3 className="text-lg md:text-xl text-zinc-300 group-hover:text-white font-light break-all">
                  info@intellectexplorer.com
                </h3>
              </div>
            </motion.a>

            {/* 3. LINKEDIN */}
            <motion.a
              href="https://www.linkedin.com/in/akshat-chauhan-55a963247/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group relative p-6 md:p-8 border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/50 rounded-sm hover:border-white/10 transition-all duration-500 flex flex-col justify-between min-h-[200px]"
            >
              <div className="flex justify-between items-start">
                <Linkedin size={24} className="text-zinc-500 group-hover:text-white transition-colors" strokeWidth={1.5} />
                <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
              </div>

              <div>
                <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-2 block group-hover:text-blue-400 transition-colors">
                  Professional Network
                </span>
                <h3 className="text-xl md:text-2xl text-zinc-300 group-hover:text-white font-light">
                  LinkedIn Profile
                </h3>
              </div>
            </motion.a>

          </div>
        </div>

        {/* === BOTTOM: COPYRIGHT & LOCATION === */}
        <div className="mt-32 md:mt-40 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">

          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/5 rounded-full text-zinc-400">
              <MapPin size={14} />
            </div>
            <div>
              <span className="block font-serif text-zinc-200">New Delhi, India</span>
              <span className="block font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-1">
                28.6139° N, 77.2090° E
              </span>
            </div>
          </div>

          <div className="text-left md:text-right">
            <div className="flex items-baseline gap-1 md:justify-end">
              <span className="font-serif text-lg text-zinc-300">Intellect</span>
              <span className="font-sans font-bold text-lg text-white tracking-tight">Explorer</span>
              <sup className="text-[10px] text-zinc-500 font-mono">TM</sup>
            </div>
            <div className="mt-2 font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
              <span>© 2026 Akshat Chauhan.</span>
              <span className="mx-2 text-zinc-800">|</span>
              <span>All Rights Reserved.</span>
            </div>
          </div>

        </div>

      </div>

      {/* === RESUME MODAL === */}
      <AnimatePresence>
        {isResumeOpen && <ResumeModal onClose={() => setIsResumeOpen(false)} />}
      </AnimatePresence>

    </PageTransition>
  );
};

export default Contact;
