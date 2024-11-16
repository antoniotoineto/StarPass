import React, { createContext, useContext, useState } from 'react';

interface PinContextProps {
  pin: string;
  setPin: (pin: string) => void;
}

const PinContext = createContext<PinContextProps | undefined>(undefined);

export const PinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pin, setPin] = useState('');

  return (
    <PinContext.Provider value={{ pin, setPin }}>
      {children}
    </PinContext.Provider>
  );
};

export const usePin = () => {
  const context = useContext(PinContext);
  if (!context) {
    throw new Error('usePin must be used within a PinProvider');
  }
  return context;
};
