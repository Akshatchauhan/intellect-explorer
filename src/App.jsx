import React from 'react';
// 1. Unified Router Import (Switched to BrowserRouter for clean URLs)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Imports
import BackgroundAudio from './components/BackgroundAudio';
import Navbar from './components/Navbar';
import Background from './components/Background';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Journal from './pages/Journal';
import PostView from './pages/PostView';
import ProjectView from './pages/ProjectView';
import Logo from './components/Logo';
import ScrollToTop from './components/ScrollToTop';
import Contact from './pages/Contact';
import NoiseOverlay from './components/NoiseOverlay';
import AnalyticsTracker from './components/AnalyticsTracker'; // <--- Kept this

function App() {
  return (
    // 2. The One Router to Rule Them All
    <Router>
      
      {/* 3. Utilities (Must be inside Router to work) */}
      <AnalyticsTracker />
      <ScrollToTop />

      {/* 4. Persistent World Layers */}
      <Background />
      <NoiseOverlay />
      <BackgroundAudio />
      <Navbar />

      <div className="relative min-h-screen selection:bg-blue-500/30 text-white overflow-x-hidden">
        
        {/* Branding Layer */}
        <Logo />

        {/* Content Layer */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<ProjectView />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/journal/:id" element={<PostView />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </div>

      </div>
    </Router>
  );
}

export default App;