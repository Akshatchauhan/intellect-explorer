import React from 'react';
import { motion } from 'framer-motion';

const Pulse = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Orb 1: The Deep Blue (Top Left) */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.6, 0.3], // Increased opacity significantly
          x: [0, 50, 0],            // Drifts slightly right
          y: [0, 30, 0]             // Drifts slightly down
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen"
      />

      {/* Orb 2: The Violet Echo (Bottom Right) */}
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],     // Opposite scaling to Orb 1
          opacity: [0.5, 0.2, 0.5], // Opposite breathing
          x: [0, -50, 0], 
          y: [0, -50, 0] 
        }}
        transition={{ 
          duration: 12, // Different timing to create "randomness"
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-900/30 rounded-full blur-[120px] mix-blend-screen"
      />

    </div>
  );
};

export default Pulse;