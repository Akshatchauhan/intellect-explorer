import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Activity } from 'lucide-react';
import { useAudio } from '../Context/AudioContext'; 

// --- CONFIGURATION ---
const TRACKS = {
  default:    "/audio/theme-default.mp3",    
  cognitive:  "/audio/theme-cognitive.mp3",  
  behavioral: "/audio/theme-behavioral.mp3", 
  interface:  "/audio/theme-interface.mp3",  
  strategy:   "/audio/theme-strategy.mp3",   
};

// --- THEME STYLING ---
const THEME_STYLES = {
  default: {
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
    icon: "text-emerald-400",
    glow: "border-emerald-500/30"
  },
  cognitive: {
    border: "border-indigo-500/50",
    bg: "bg-indigo-500/10",
    icon: "text-indigo-400",
    glow: "border-indigo-500/30"
  },
  behavioral: {
    border: "border-red-500/50",
    bg: "bg-red-500/10",
    icon: "text-red-500",
    glow: "border-red-500/30"
  },
  interface: {
    border: "border-emerald-400/50", 
    bg: "bg-emerald-400/10",
    icon: "text-emerald-400",
    glow: "border-emerald-400/30"
  },
  strategy: {
    border: "border-white/20",
    bg: "bg-white/10",
    icon: "text-white",
    glow: "border-white/30"
  }
};

const BackgroundAudio = () => {
  const { currentMood, isMuted, setIsMuted } = useAudio();
  
  const audioRefA = useRef(null);
  const audioRefB = useRef(null);
  const activeTrackRef = useRef('A'); 
  
  // FIX: Track persistence so music doesn't reset to 0:00
  const trackTimers = useRef({}); 
  const prevMoodRef = useRef('default');

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get current style
  const activeStyle = THEME_STYLES[currentMood] || THEME_STYLES.default;

  // --- 1. GHOST TRIGGER ---
  useEffect(() => {
    const attemptPlay = () => {
      if (hasInteracted) return;

      const activeAudio = activeTrackRef.current === 'A' ? audioRefA.current : audioRefB.current;
      if (!activeAudio.src) activeAudio.src = TRACKS[currentMood] || TRACKS.default;

      activeAudio.volume = 0.5;
      activeAudio.play()
        .then(() => {
          setHasInteracted(true);
          setIsMuted(false);
        })
        .catch(() => console.log("Waiting for interaction..."));
    };

    ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => 
      window.addEventListener(event, attemptPlay, { once: true })
    );
  }, []);

  // --- 2. MOOD & MUTE LOGIC (With Time Persistence) ---
  useEffect(() => {
    if (!hasInteracted) return;

    const newSrc = TRACKS[currentMood] || TRACKS.default;
    const incoming = activeTrackRef.current === 'A' ? audioRefB.current : audioRefA.current;
    const outgoing = activeTrackRef.current === 'A' ? audioRefA.current : audioRefB.current;

    // A. SAVE TIME of the outgoing track
    if (outgoing.src && prevMoodRef.current) {
        trackTimers.current[prevMoodRef.current] = outgoing.currentTime;
    }
    prevMoodRef.current = currentMood; // Update history

    // B. PREPARE INCOMING track
    const fullPath = window.location.origin + newSrc;
    if (incoming.src !== fullPath && !incoming.src.endsWith(newSrc)) {
       incoming.src = newSrc;
       // FIX: RESTORE TIME
       incoming.currentTime = trackTimers.current[currentMood] || 0;
    }

    // C. HANDLE MUTE
    if (isMuted) {
      outgoing.pause();
      incoming.pause();
      // Ensure we still track time even if paused
      trackTimers.current[currentMood] = incoming.currentTime;
      return;
    }

    // D. PLAY & CROSSFADE
    incoming.volume = 0;
    incoming.play().catch(e => console.error("Play error:", e));

    let steps = 0;
    const fade = setInterval(() => {
      steps++;
      const progress = steps / 20;
      incoming.volume = progress * 0.5;
      outgoing.volume = Math.max(0, (1 - progress) * 0.5);

      if (steps >= 20) {
        clearInterval(fade);
        outgoing.pause();
        activeTrackRef.current = activeTrackRef.current === 'A' ? 'B' : 'A';
      }
    }, 100);

    return () => clearInterval(fade);
  }, [currentMood, isMuted, hasInteracted]);

  // --- 3. UI TOGGLE ---
  const handleToggle = (e) => {
    e.stopPropagation();
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsMuted(false);
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRefA} loop preload="metadata" />
      <audio ref={audioRefB} loop preload="metadata" />

      <motion.button
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[9999] flex items-center gap-3 group cursor-pointer"
        onClick={handleToggle}
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
              className="text-xs font-mono tracking-widest text-zinc-500 uppercase hidden md:block"
            >
              {isMuted ? 'System Muted' : 'Audio Active'}
            </motion.span>
          )}
        </AnimatePresence>

        <div className={`
          relative flex items-center justify-center w-10 h-10 rounded-full 
          border backdrop-blur-md transition-all duration-500
          ${!isMuted 
             ? `${activeStyle.bg} ${activeStyle.border}` 
             : 'bg-zinc-900/50 border-white/10'
           }
        `}>
          {!isMuted ? (
            <Activity size={16} className={`${activeStyle.icon} animate-pulse transition-colors duration-500`} />
          ) : (
            <VolumeX size={16} className="text-zinc-500" />
          )}

          {!isMuted && (
            <span className={`absolute inset-0 rounded-full border ${activeStyle.glow} animate-ping opacity-20 transition-colors duration-500`} />
          )}
        </div>
      </motion.button>
    </>
  );
};

export default BackgroundAudio;