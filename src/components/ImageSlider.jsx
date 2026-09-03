import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

const ImageSlider = ({ before, after }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = clientX - left;
    const percentage = Math.min(Math.max((x / width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
    return () => {
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchend', stopDragging);
    };
  }, []);

  return (
    <div className="my-12">
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] md:aspect-video rounded-sm overflow-hidden border border-white/10 select-none cursor-ew-resize bg-zinc-900 group"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); handleMove(e.touches[0].clientX); }}
      >
        {/* BEFORE IMAGE (Bottom Layer - Old Site) */}
        <div className="absolute inset-0">
          <img src={before} alt="Old Design" className="w-full h-full object-cover object-top opacity-70 grayscale-[0.8]" />
          <div className="absolute top-4 right-4 md:left-4 md:right-auto bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full">
             <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Legacy</span>
          </div>
        </div>

        {/* AFTER IMAGE (Top Layer - Clipped - New Site) */}
        <div 
          className="absolute inset-0 z-10 overflow-hidden shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5)]"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={after} alt="New Design" className="w-full h-full object-cover object-top" />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 rounded-full">
             <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">Current System</span>
          </div>
        </div>

        {/* DRAGGER LINE */}
        <motion.div 
          className="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
          animate={{ scaleX: isDragging || isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* HANDLE */}
          <motion.div 
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg border-2 border-zinc-900"
            animate={{ scale: isDragging ? 1.2 : isHovered ? 1.1 : 1 }}
          >
            <GripVertical size={16} strokeWidth={2} />
          </motion.div>
        </motion.div>
      </div>
      <p className="text-center font-mono text-[10px] text-zinc-500 tracking-widest uppercase mt-4">
        Interactive Visual Comparison — Drag to Inspect
      </p>
    </div>
  );
};

export default ImageSlider;
