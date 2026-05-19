import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Two contexts so consumers only subscribe to what they need:
// - useAudioState()   → reads currentMood / isMuted / volume (re-renders on value change)
// - useAudioActions() → gets stable setter refs (never re-renders due to state change)
// - useAudio()        → backward-compat: combines both (safe to use anywhere)

const AudioStateContext = createContext({
  currentMood: 'default',
  isMuted: true,
  volume: 0.5,
});

const AudioActionsContext = createContext({
  setMood: () => {},
  setIsMuted: () => {},
  setVolume: () => {},
});

export const useAudioState   = () => useContext(AudioStateContext);
export const useAudioActions = () => useContext(AudioActionsContext);
export const useAudio        = () => ({ ...useAudioState(), ...useAudioActions() });

export const AudioProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState('default');
  const [volume,      setVolume]      = useState(0.5);
  const [isMuted,     setIsMuted]     = useState(true);

  // Stable action refs — created once, never recreated
  const setMood      = useCallback((mood) => setCurrentMood(mood || 'default'), []);
  const setIsMutedCb = useCallback((v) => setIsMuted(v), []);
  const setVolumeCb  = useCallback((v) => setVolume(v), []);

  // State object only changes when values change
  const state   = useMemo(
    () => ({ currentMood, isMuted, volume }),
    [currentMood, isMuted, volume]
  );

  // Actions object is permanently stable (callbacks never change)
  const actions = useMemo(
    () => ({ setMood, setIsMuted: setIsMutedCb, setVolume: setVolumeCb }),
    [setMood, setIsMutedCb, setVolumeCb]
  );

  return (
    <AudioStateContext.Provider value={state}>
      <AudioActionsContext.Provider value={actions}>
        {children}
      </AudioActionsContext.Provider>
    </AudioStateContext.Provider>
  );
};
