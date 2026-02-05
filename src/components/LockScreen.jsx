import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, ShieldAlert, X } from 'lucide-react';

const LockScreen = ({ onUnlock, correctPassword, onClose }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === correctPassword) {
      onUnlock();
    } else {
      setError(true);
      setInput(''); // Clear input on error for effect
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      
      {/* 1. BACKDROP: Heavy blur to focus attention */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
        onClick={onClose} // Allow clicking background to close
      />

      {/* 2. THE GLASS CARD */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        // THEME MATCH: Using the same obsidian glass logic as the Navbar
        className="relative w-full max-w-sm overflow-hidden bg-black/60 border border-white/10 rounded-none shadow-2xl backdrop-blur-2xl"
        style={{
          boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 20px 50px -10px rgba(0, 0, 0, 0.8)' 
        }}
      >
        
        {/* DECORATIVE: Top "Laser" Line (Red for Security) */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-600 hover:text-zinc-200 transition-colors z-20"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="p-8 sm:p-10 text-center relative z-10">
          
          {/* ICON: Glowing Red Lock */}
          <div className="mx-auto w-14 h-14 mb-6 flex items-center justify-center rounded-full bg-red-500/5 border border-red-500/20 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)] text-red-500/80">
            <Lock size={22} strokeWidth={1.5} />
          </div>

          {/* HEADINGS */}
          <h2 className="text-xl font-medium text-white mb-2 tracking-wide font-serif italic">
            Restricted Access
          </h2>
          <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase mb-8 leading-relaxed">
            This dossier is classified.<br/>Enter clearance code.
          </p>

          {/* INPUT FORM */}
          <form onSubmit={handleSubmit} className="relative group">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="PASSCODE"
              className="w-full bg-zinc-900/40 border border-zinc-800 group-hover:border-zinc-700 focus:border-red-500/30 text-center text-white font-mono text-sm tracking-[0.3em] py-3 rounded-none outline-none transition-all placeholder:text-zinc-800 placeholder:tracking-widest"
              autoFocus
            />
            
            {/* Submit Arrow (Hidden until user types) */}
            <AnimatePresence>
              {input.length > 0 && (
                <motion.button 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-white transition-colors"
                >
                  <ArrowRight size={14} />
                </motion.button>
              )}
            </AnimatePresence>
          </form>

          {/* ERROR MESSAGE: Glitch effect */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 text-red-500 text-[10px] font-mono font-bold tracking-widest uppercase"
              >
                <ShieldAlert size={12} />
                <span>Access Denied</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
};

export default LockScreen;