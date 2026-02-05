import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Imports
import BackgroundAudio from './components/BackgroundAudio';
import Navbar from './components/Navbar';
import Background from './components/Background'; // <--- The Unified Engine
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Journal from './pages/Journal';
import PostView from './pages/PostView';
import ProjectView from './pages/ProjectView';
import Logo from './components/Logo';
import ScrollToTop from './components/ScrollToTop';
import Contact from './pages/Contact';
import NoiseOverlay from './components/NoiseOverlay';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Background />
      <NoiseOverlay />
      <BackgroundAudio />
      <Navbar />
      {/* Removed "bg-black" from here because the Background component 
         now handles the base layer.
      */}
      <div className="relative min-h-screen selection:bg-blue-500/30 text-white overflow-x-hidden">
        
        {/* LAYER 0: THE PERSISTENT WORLD */}
        {/* This sits behind everything and never unmounts */}
        
        
        {/* LAYER 5: BRANDING */}
        <Logo />

        {/* LAYER 10: CONTENT */}
        <div className="relative z-10">
          {/* mode="wait" ensures the old page fades out before the new one fades in */}
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