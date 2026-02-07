import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    
    // THE "GHOST" STARTER
    const attemptPlay = () => {
      if (audio && !hasInteracted) {
        // 1. Set volume low for a "Soft Entry"
        audio.volume = 0.05; 
        
        // 2. Try to play
        audio.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
            
            // 3. Fade In smoothly to 50% volume
            let vol = 0.05;
            const fadeInterval = setInterval(() => {
              if (vol < 0.5) {
                vol += 0.02; // Slow fade
                audio.volume = vol;
              } else {
                clearInterval(fadeInterval);
              }
            }, 100);
            
            // Clean up listeners since we are playing now
            removeListeners();
          })
          .catch((error) => {
            // Auto-play was blocked. We wait for interaction.
            console.log("Autoplay waiting for interaction...");
          });
      }
    };

    const removeListeners = () => {
      window.removeEventListener('click', attemptPlay);
      window.removeEventListener('keydown', attemptPlay);
      window.removeEventListener('scroll', attemptPlay);
      window.removeEventListener('touchstart', attemptPlay);
    };

    // 1. Try immediately (Works if user has visited before)
    attemptPlay();

    // 2. If blocked, attach listeners to EVERYTHING
    // The moment they touch the site, music starts.
    window.addEventListener('click', attemptPlay);
    window.addEventListener('keydown', attemptPlay);
    window.addEventListener('scroll', attemptPlay);
    window.addEventListener('touchstart', attemptPlay);

    return () => {
      removeListeners();
    };
  }, [hasInteracted]);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        loop 
        src="/ambience.mp3" 
        preload="auto"
      />

      <motion.button
        // --- UPDATED POSITIONING CLASSES ---
        // Mobile: bottom-24 (clear navbar), right-4 (tight to edge)
        // Desktop (md): bottom-8, right-8 (original spot)
        // Z-Index: z-[100] (force above everything)
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[100] flex items-center gap-3 group"
        
        onClick={toggleAudio}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-xs font-mono tracking-widest text-zinc-500 uppercase hidden md:block" // Hide text on mobile to save space
            >
              {isPlaying ? 'Now Playing' : 'Muted'}
            </motion.span>
          )}
        </AnimatePresence>

        <div className={`
          relative flex items-center justify-center w-10 h-10 rounded-full 
          border border-white/10 backdrop-blur-md transition-all duration-500
          ${isPlaying ? 'bg-white/5 border-white/20' : 'bg-transparent'}
        `}>
          {isPlaying ? (
            <Volume2 size={16} className="text-zinc-200" />
          ) : (
            <VolumeX size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
          )}

          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20" />
          )}
        </div>
      </motion.button>
    </>
  );
};

export default BackgroundAudio;