import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { AudioProvider } from './Context/AudioContext';

// Always-on shell components — loaded eagerly
import BackgroundAudio from './components/BackgroundAudio';
import Navbar from './components/Navbar';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import Logo from './components/Logo';
import ScrollToTop from './components/ScrollToTop';
import NoiseOverlay from './components/NoiseOverlay';
import AnalyticsTracker from './components/AnalyticsTracker';

// Page routes — lazy loaded so each route gets its own chunk
const Home        = lazy(() => import('./pages/Home'));
const Portfolio   = lazy(() => import('./pages/Portfolio'));
const ProjectView = lazy(() => import('./pages/ProjectView'));
const Journal     = lazy(() => import('./pages/Journal'));
const PostView    = lazy(() => import('./pages/PostView'));
const Contact     = lazy(() => import('./pages/Contact'));

function App() {

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <Router>
      <AudioProvider>

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
        <CustomCursor />

        <div className="relative min-h-screen select-none text-white overflow-x-hidden">

          <Logo />

          <div className="relative z-10">
            {/* Suspense sits outside AnimatePresence so lazy loading doesn't interfere
                with exit animations — the background provides visual continuity. */}
            <Suspense fallback={null}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/"             element={<Home />} />
                  <Route path="/portfolio"    element={<Portfolio />} />
                  <Route path="/portfolio/:id" element={<ProjectView />} />
                  <Route path="/journal"      element={<Journal />} />
                  <Route path="/journal/:id"  element={<PostView />} />
                  <Route path="/contact"      element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </div>

        </div>

      </AudioProvider>
    </Router>
  );
}

export default App;
