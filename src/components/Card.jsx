import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -5 }}
    // RESTORED: rounded-3xl (Corners), bg-glass (Transparency), backdrop-blur-xl (Blur)
    className={`relative overflow-hidden rounded-3xl border border-glass-border bg-glass backdrop-blur-xl p-8 transition-colors hover:bg-white/5 ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;