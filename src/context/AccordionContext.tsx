import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AccordionState = {
  activeToolAccordion: string | null;
  activeSolutionAccordion: string | null;
};

type OnlineState = {
  isOnline: boolean;
};

type AccordionContextType = AccordionState & OnlineState & {
  setActiveToolAccordion: (id: string | null) => void;
  setActiveSolutionAccordion: (id: string | null) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

export const AccordionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Accordion state
  const [accordionState, setAccordionState] = useState<AccordionState>({
    activeToolAccordion: null,
    activeSolutionAccordion: null
  });

  // Online/Offline state
  const [onlineState, setOnlineState] = useState<OnlineState>({
    isOnline: navigator.onLine,
  });

  // Online/Offline effect
  useEffect(() => {
    const handleOnline = () => {
      setOnlineState({ isOnline: true });
    };

    const handleOffline = () => {
      setOnlineState({
        isOnline: false
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const value = useMemo(() => ({
    ...accordionState,
    ...onlineState,
    setActiveToolAccordion: (id: string | null) => 
      setAccordionState(prev => ({ ...prev, activeToolAccordion: id })),
    setActiveSolutionAccordion: (id: string | null) => 
      setAccordionState(prev => ({ ...prev, activeSolutionAccordion: id }))
  }), [accordionState, onlineState]);

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('useAccordionContext must be used within AccordionProvider');
  }
  return context;
};