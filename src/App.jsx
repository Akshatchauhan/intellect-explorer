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
import { Helmet } from 'react-helmet-async';

function App() {
  return (
    // 2. The One Router to Rule Them All
    <Router>
      
      {/* 3. Utilities (Must be inside Router to work) */}
      <AnalyticsTracker />
      <ScrollToTop />
<Helmet>
        {/* 1. The Standard Identity */}
        <title>Intellect Explorer | Akshat Chauhan</title>
        <meta name="description" content="The digital portfolio and psychological journal of Akshat Chauhan. Exploring the intersection of UX design, cognitive science, and human behavior." />
        <meta name="keywords" content="UX Design, Psychology, React, Frontend Developer, New Delhi, Portfolio" />
        <meta name="author" content="Akshat Chauhan" />

        {/* 2. Open Graph (For LinkedIn/Discord/iMessage previews) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Intellect Explorer | Akshat Chauhan" />
        <meta property="og:description" content="Decoding the architecture of the human mind through design." />
        <meta property="og:image" content="https://intellectexplorer.com/og-image.jpg" /> {/* We will make this image later */}
        <meta property="og:url" content="https://intellectexplorer.com/" />
        
        {/* 3. Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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