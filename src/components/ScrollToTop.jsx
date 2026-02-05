import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  // 1. INITIALIZE LENIS (The "Engine")
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // "Expensive" easing
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // The Animation Loop (Required for Lenis to work)
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Cleanup when component unmounts
    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. HANDLE ROUTE CHANGES (The "Reset")
  useEffect(() => {
    if (lenisRef.current) {
      // "immediate: true" forces it to snap instantly (no slow scroll up)
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      // Fallback if Lenis isn't ready yet
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null; // Still invisible, just logic!
};

export default ScrollToTop;