import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Defer init past the critical render path — runs after first paint
    const timer = setTimeout(() => {
      if (!window.GA_INITIALIZED) {
        ReactGA.initialize('G-XT766XK71J');
        window.GA_INITIALIZED = true;
      }
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
      });
    }, 200);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
};

export default AnalyticsTracker;
