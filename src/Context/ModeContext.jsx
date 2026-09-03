import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// The "mode" is the interpretive lens the visitor picks on the homepage
// (cognitive / interface). It drives the cursor treatment and the Home
// reality layer. Two contexts so consumers only subscribe to what they need:
// - useModeState()   → reads currentMode (re-renders on change)
// - useModeActions() → gets a stable setter ref (never re-renders on change)

const ModeStateContext = createContext({ currentMode: 'default' });

const ModeActionsContext = createContext({ setMode: () => {} });

export const useModeState   = () => useContext(ModeStateContext);
export const useModeActions = () => useContext(ModeActionsContext);

export const ModeProvider = ({ children }) => {
  const [currentMode, setCurrentMode] = useState('default');

  // Stable action ref — created once, never recreated
  const setMode = useCallback((mode) => setCurrentMode(mode || 'default'), []);

  const state   = useMemo(() => ({ currentMode }), [currentMode]);
  const actions = useMemo(() => ({ setMode }), [setMode]);

  return (
    <ModeStateContext.Provider value={state}>
      <ModeActionsContext.Provider value={actions}>
        {children}
      </ModeActionsContext.Provider>
    </ModeStateContext.Provider>
  );
};
