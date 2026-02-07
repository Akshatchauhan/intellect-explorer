import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Initialize GA4 with your specific ID
    // We check if it's already initialized to prevent double-firing
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize("G-XT766XK71J");
      window.GA_INITIALIZED = true;
    }

    // 2. Send Page View
    // This runs every time the route (URL) changes
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
    
  }, [location]);

  return null; // This component is invisible
};

export default AnalyticsTracker;