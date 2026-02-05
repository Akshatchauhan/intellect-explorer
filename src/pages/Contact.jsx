import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, FileText, ArrowUpRight, Download } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  return (
    <PageTransition>
      {/* CONTAINER */}
      <div className="min-h-screen pt-28 md:pt-32 px-4 md:px-6 max-w-4xl mx-auto pb-40 relative z-10">
        
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
          <motion.a 
            href="/resume.pdf" 
            target="_blank"
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
                    <span className="text-emerald-500/80">Available</span>
                  </div>
                </div>
              </div>
              
              <div className="p-2 border border-white/10 rounded-full text-zinc-500 group-hover:text-white group-hover:border-white transition-all duration-500">
                <Download size={18} />
              </div>
            </div>

            {/* Background Scanline Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.a>


          {/* 2. EMAIL (Official Channel) */}
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
               {/* Label changed from "Direct Signal" to "Official Channel" */}
               <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-2 block group-hover:text-blue-400 transition-colors">
                 Official Channel
               </span>
               <h3 className="text-lg md:text-xl text-zinc-300 group-hover:text-white font-light break-all">
                 info@intellectexplorer.com
               </h3>
            </div>
          </motion.a>


          {/* 3. LINKEDIN (Professional Network) */}
          <motion.a 
            href="https://www.linkedin.com/in/akshat-chauhan-55a963247/"
            target="_blank"
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
               {/* Label changed from "Neural Network" to "Professional Network" */}
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
    </PageTransition>
  );
};

export default Contact;