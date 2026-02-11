import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext({
  currentMood: 'default',
  setMood: () => {},
  volume: 0.5,
  setVolume: () => {},
  isMuted: true,
  setIsMuted: () => {}
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  // The "Mood" of the site. 
  // Options: 'default', 'cognitive', 'behavioral', 'interface', 'strategy'
  const [currentMood, setCurrentMood] = useState('default');
  
  // Volume Control (0.0 to 1.0)
  const [volume, setVolume] = useState(0.5);

  // Global Mute Toggle
  const [isMuted, setIsMuted] = useState(true); // Start muted (browser policy)

  const setMood = (mood) => {
    setCurrentMood(mood || 'default');
  };

  return (
    <AudioContext.Provider value={{ 
      currentMood, 
      setMood, 
      volume, 
      setVolume, 
      isMuted, 
      setIsMuted 
    }}>
      {children}
    </AudioContext.Provider>
  );
};