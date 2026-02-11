import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { AudioProvider } from './Context/AudioContext'; 

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
import AnalyticsTracker from './components/AnalyticsTracker'; 

function App() {

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault(); 
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <Router>
      {/* FIX: OPENING TAG HERE (No "/>") */}
      <AudioProvider>
        
        {/* Everything inside here can now "hear" the audio context */}
        <AnalyticsTracker />
        <ScrollToTop />
        
        <Helmet>
          <title>Intellect Explorer | Akshat Chauhan</title>
          <meta name="description" content="The digital portfolio and psychological journal of Akshat Chauhan." />
          <meta name="keywords" content="UX Design, Psychology, React, Frontend Developer, New Delhi, Portfolio" />
          <meta name="author" content="Akshat Chauhan" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Intellect Explorer | Akshat Chauhan" />
          <meta property="og:description" content="Decoding the architecture of the human mind through design." />
          <meta property="og:image" content="https://intellectexplorer.com/og-image.jpg" />
          <meta property="og:url" content="https://intellectexplorer.com/" />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
        
        <Background />
        <NoiseOverlay />
        <BackgroundAudio />
        <Navbar />

        <div className="relative min-h-screen select-none text-white overflow-x-hidden">
          
          <Logo />

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

      {/* FIX: CLOSING TAG HERE */}
      </AudioProvider> 
    </Router>
  );
}

export default App;