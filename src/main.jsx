import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 1. You imported it (Good)
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Now we wrap the entire App with it (The Fix) */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)